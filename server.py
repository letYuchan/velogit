from flask import Flask, request, jsonify
from flask_cors import CORS
import difflib, time, os

import kss

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

app = Flask(__name__)
CORS(app)

# -------------------------
# 모델 로드 (프로세스 1회)
# -------------------------
MODEL_NAME = os.getenv("MODEL_NAME", "Soyoung97/gec_kr")
device = "cuda" if torch.cuda.is_available() else "cpu"

print(f"[INFO] loading model: {MODEL_NAME} on {device}")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
model.to(device)
model.eval()

# -------------------------
# 보조 함수
# -------------------------
def split_sentences(text: str):
    paragraphs = [p for p in text.split("\n") if p.strip()]
    sents = []
    for p in paragraphs:
        sents.extend(kss.split_sentences(p))
    return sents

def correct_one(text: str) -> str:
    """한 문장 교정. 모델 입력/출력 포맷은 모델에 따라 조정하세요."""
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512).to(device)
    with torch.no_grad():
        output = model.generate(
            **inputs,
            max_new_tokens=128,
            num_beams=4,
            temperature=0.7,
            repetition_penalty=1.1,
        )
    corrected = tokenizer.decode(output[0], skip_special_tokens=True)
    return corrected.strip()

def merge_sentences(original: str, revised_sents: list[str]) -> str:
    """
    원문을 문장 단위로 교정해서 합칠 때, 원문과 동일한 줄바꿈 위치를 어느 정도 유지하고 싶으면
    이 부분을 맞춤 구현하세요. 여기서는 단순히 공백으로 join.
    """
    return " ".join(revised_sents)

def build_changes(original: str, corrected: str):
    sm = difflib.SequenceMatcher(None, original, corrected)
    changes = []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            continue
        changes.append({
            "from": original[i1:i2],
            "to": corrected[j1:j2],
            "offset": i1,
            "length": i2 - i1
        })
    return changes

# -------------------------
# API
# -------------------------
@app.post("/api/check")
def check():
    data = request.get_json(silent=True) or {}
    content = data.get("content", "").strip()
    if not content:
        return jsonify({"error": "No content provided"}), 400

    t0 = time.time()
    try:
        sents = split_sentences(content)
        if not sents:
            sents = [content]

        revised_sents = [correct_one(s) for s in sents]
        corrected_full = merge_sentences(content, revised_sents)

        dt_ms = int((time.time() - t0) * 1000)

        sentence_pairs = [
            {"origin": s, "revised": r} for s, r in zip(sents, revised_sents)
        ]

        resp = {
            "original": content,
            "corrected": corrected_full,
            "time": dt_ms,
            "model": {
                "name": MODEL_NAME,
                "device": device,
            },
            "sentences": sentence_pairs,
            "changes": build_changes(content, corrected_full),
        }
        return jsonify(resp), 200

    except Exception as e:
        return jsonify({
            "original": content,
            "corrected": content,
            "time": 0,
            "model": {"name": MODEL_NAME, "device": device},
            "sentences": [],
            "changes": [],
            "error": str(e),
        }), 500

@app.get("/health")
def health():
    return "ok", 200

if __name__ == "__main__":
    # http://127.0.0.1:4000/api/check
    app.run(host="127.0.0.1", port=4000, debug=True)