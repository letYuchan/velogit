from __future__ import annotations
from flask import Flask, request, jsonify
from flask_cors import CORS
import difflib
import os
import time
from typing import List

import kss
import torch
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer


app = Flask(__name__)
CORS(app)

# -------------------------
# 환경 변수 / 상수
# -------------------------
MODEL_NAME = os.getenv("MODEL_NAME", "Soyoung97/gec_kr")
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
MAX_INPUT_CHARS = int(os.getenv("MAX_INPUT_CHARS", "8000"))  # 요청 본문 최대 길이
MAX_NEW_TOKENS = int(os.getenv("MAX_NEW_TOKENS", "128"))     # 생성 상한
NUM_BEAMS = int(os.getenv("NUM_BEAMS", "4"))

# -------------------------
# 모델 로드 (프로세스 1회)
# -------------------------
print(f"[INFO] Loading model: {MODEL_NAME} on {DEVICE}")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME).to(DEVICE).eval()

# 간단 워밍업(짧은 더미 입력으로 그래프/캐시 준비)
try:
    _inputs = tokenizer("워밍업", return_tensors="pt").to(DEVICE)
    with torch.no_grad():
        _ = model.generate(**_inputs, max_new_tokens=8)
    del _inputs
    print("[INFO] Warmup done")
except Exception as e:
    print(f"[WARN] Warmup failed: {e}")


# -------------------------
# 보조 함수
# -------------------------
def split_sentences(text: str) -> List[str]:
    paragraphs = [p for p in text.split("\n") if p.strip()]
    sents: List[str] = []
    for p in paragraphs:
        sents.extend(kss.split_sentences(p))
    return sents or [text]


def correct_one(text: str) -> str:
    """한 문장 교정."""
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512).to(DEVICE)
    with torch.no_grad():
        output = model.generate(
            **inputs,
            max_new_tokens=MAX_NEW_TOKENS,
            num_beams=NUM_BEAMS,
            temperature=0.7,
            repetition_penalty=1.1,
        )
    corrected = tokenizer.decode(output[0], skip_special_tokens=True)
    return corrected.strip()


def merge_sentences(original: str, revised_sents: List[str]) -> str:
    """
    원문 줄바꿈 보존이 필요하면 여기서 커스터마이즈.
    현재는 단순 join.
    """
    return " ".join(revised_sents)


def build_changes(original: str, corrected: str):
    sm = difflib.SequenceMatcher(None, original, corrected)
    changes = []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            continue
        changes.append(
            {
                "from": original[i1:i2],
                "to": corrected[j1:j2],
                "offset": i1,
                "length": i2 - i1,
            }
        )
    return changes


# -------------------------
# API
# -------------------------
@app.get("/health")
def health():
    """프로세스 살아 있음(L4/L7 헬스체크 용)."""
    return "ok", 200


@app.get("/ready")
def ready():
    """모델 로드/토크나이저 준비 여부 체크."""
    ok = model is not None and tokenizer is not None
    return jsonify({"ready": bool(ok), "model": MODEL_NAME, "device": DEVICE}), 200 if ok else 503


@app.post("/api/check")
def check():
    data = request.get_json(silent=True) or {}
    content = (data.get("content") or "").strip()

    if not content:
        return jsonify({"error": "No content provided"}), 400

    if len(content) > MAX_INPUT_CHARS:
        return jsonify(
            {
                "error": "Input too long",
                "limit": MAX_INPUT_CHARS,
                "received": len(content),
            }
        ), 413  
    t0 = time.time()
    try:
        sents = split_sentences(content)
        revised_sents = [correct_one(s) for s in sents]
        corrected_full = merge_sentences(content, revised_sents)

        sentence_pairs = [{"origin": s, "revised": r} for s, r in zip(sents, revised_sents)]
        dt_ms = int((time.time() - t0) * 1000)

        return (
            jsonify(
                {
                    "original": content,
                    "corrected": corrected_full,
                    "time": dt_ms,
                    "model": {"name": MODEL_NAME, "device": DEVICE},
                    "sentences": sentence_pairs,
                    "changes": build_changes(content, corrected_full),
                }
            ),
            200,
        )

    except Exception as e:
        return (
            jsonify(
                {
                    "original": content,
                    "corrected": content,
                    "time": 0,
                    "model": {"name": MODEL_NAME, "device": DEVICE},
                    "sentences": [],
                    "changes": [],
                    "error": str(e),
                }
            ),
            500,
        )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000, debug=False)