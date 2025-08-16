import React from 'react';
import { toast } from 'react-toastify';

export const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getFullDateTime = () => {
    return new Date().toISOString(); // ex: '2025-07-20T23:45:13.123Z'
};

export const insertMarkdownSyntax = (
    textarea: HTMLTextAreaElement,
    name: string,
    insert: string,
    marker: string,
    afterApply?: (newValue: string) => void,
) => {
    const { selectionStart, selectionEnd, value } = textarea;
    const before = value.slice(0, selectionStart);
    const after = value.slice(selectionEnd);
    const selectedText = value.substring(selectionStart, selectionEnd);

    let newValue = '';
    let newSelectionStart = selectionStart;
    let newSelectionEnd = selectionEnd;

    const isInline = ['**', '_', '~~'].includes(marker);
    const isBlock = marker === '```';

    if (isInline) {
        const isWrapped = selectedText.startsWith(marker) && selectedText.endsWith(marker);
        if (isWrapped) {
            const unwrapped = selectedText.slice(
                marker.length,
                selectedText.length - marker.length,
            );
            newValue = before + unwrapped + after;
            newSelectionEnd = newSelectionStart + unwrapped.length;
        } else if (selectedText.length > 0) {
            newValue = before + marker + selectedText + marker + after;
            newSelectionEnd = newSelectionStart + selectedText.length + 2 * marker.length;
        } else {
            const defaultText = insert.split(marker).join('');
            newValue = before + marker + defaultText + marker + after;
            newSelectionStart += marker.length;
            newSelectionEnd = newSelectionStart + defaultText.length;
        }
    } else if (isBlock) {
        const selectedIsCodeBlock = /^```[a-z]*\n[\s\S]*?\n```$/.test(selectedText);
        if (selectedIsCodeBlock) {
            const unwrapped = selectedText.replace(/^```[a-z]*\n/, '').replace(/\n```$/, '');
            newValue = before + unwrapped + after;
            newSelectionEnd = newSelectionStart + unwrapped.length;
        } else {
            newValue = before + insert + after;
            const offset = insert.indexOf('code goes here');
            newSelectionStart = before.length + (offset >= 0 ? offset : 0);
            newSelectionEnd =
                offset >= 0 ? newSelectionStart + 'code goes here'.length : newSelectionStart;
        }
    } else if (name === 'dash') {
        newValue = before + '---\n' + after;
        newSelectionStart = newSelectionEnd = before.length + 4;
    } else if (marker === 'link') {
        const url = prompt('Enter the URL:', '');
        if (url === null) return;
        newValue = before + `[text](${url})` + after;
        newSelectionStart = before.length + 1;
        newSelectionEnd = newSelectionStart + 4;
    } else if (marker === 'image-md') {
        const url = prompt('Enter image URL:', '/velogit/images/');
        if (url === null) return;
        newValue = before + `![alt text](${url})` + after;
        newSelectionStart = before.length + 2;
        newSelectionEnd = newSelectionStart + 8;
    } else if (marker === 'image-html') {
        const maxImages = 4;
        const urls: string[] = [];
        for (let i = 0; i < maxImages; i++) {
            const u = prompt(`Enter image URL ${i + 1} (Cancel to stop):`, '/velogit/images/');
            if (!u) break;
            urls.push(u);
        }
        if (urls.length === 0) return;

        const imgTags = urls
            .map(
                u =>
                    `<img src="${u}" width="300" height="200" alt="image" style="object-fit: cover;" />`,
            )
            .join('');

        const layout =
            urls.length === 1
                ? imgTags
                : urls.length === 3
                  ? `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:2px;">
               <img src="${urls[0]}" style="width:100%;object-fit:cover;" />
               <img src="${urls[1]}" style="width:100%;object-fit:cover;" />
               <img src="${urls[2]}" style="width:100%;height:300px;object-fit:cover;grid-column:span 2;" />
             </div>`
                  : `<div style="display:grid;grid-template-columns:repeat(${Math.min(urls.length, 2)},1fr);gap:2px;">
               ${imgTags}
             </div>`;

        newValue = before + layout + after;
        newSelectionStart = before.length + layout.indexOf('alt="image"') + 5;
        newSelectionEnd = newSelectionStart + 5;
    } else if (marker === 'video') {
        const url = prompt('Enter video URL:', '/velogit/videos/');
        if (url === null) return;
        const html = `<video src="${url}" width="720" height="480" controls></video>`;
        newValue = before + html + after;
        newSelectionStart = before.length + html.indexOf(url);
        newSelectionEnd = newSelectionStart + url.length;
    } else if (marker === '<kbd>') {
        newValue = before + `<kbd>text</kbd>` + after;
        newSelectionStart = before.length + 5;
        newSelectionEnd = newSelectionStart + 4;
    } else if (marker === '<mark>') {
        newValue = before + `<mark>text</mark>` + after;
        newSelectionStart = before.length + 6;
        newSelectionEnd = newSelectionStart + 4;
    } else if (marker === 'details') {
        newValue = before + insert + after;
        const summaryIndex = insert.indexOf('Summary');
        newSelectionStart = before.length + (summaryIndex >= 0 ? summaryIndex : 0);
        newSelectionEnd =
            summaryIndex >= 0 ? newSelectionStart + 'Summary'.length : newSelectionStart;
    } else if (marker === 'file') {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '*/*';
        input.onchange = () => {
            const file = input.files?.[0];
            if (!file) return;

            const sub = prompt('Subfolder (optional):', 'your_subDirectory_name');
            const cleanSub = (sub || '').trim().replace(/^\/+|\/+$/g, '');
            const fileName = file.name;
            const encoded = encodeURIComponent(fileName);
            const base = '/velogit/uploads';
            const filePath = cleanSub ? `${base}/${cleanSub}/${encoded}` : `${base}/${encoded}`;
            const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
            const ext = fileName.split('.').pop()?.toLowerCase();
            const iconMap: Record<string, string> = {
                pdf: '📄',
                doc: '📝',
                docx: '📝',
                xls: '📊',
                xlsx: '📊',
                ppt: '📽️',
                pptx: '📽️',
                png: '🖼️',
                jpg: '🖼️',
                jpeg: '🖼️',
                gif: '🖼️',
                zip: '🗜️',
                mp4: '🎞️',
                mp3: '🎵',
            };
            const icon = iconMap[ext ?? ''] ?? '📎';

            const markdown = `[${icon} ${fileName} (${sizeMB}MB)](${filePath})`;
            const next = before + markdown + after;

            textarea.value = next;
            textarea.selectionStart = textarea.selectionEnd = before.length + markdown.length;
            textarea.focus();
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            afterApply?.(next);
        };
        input.click();
        return;
    } else if (marker === 'table') {
        const colInput = prompt('Enter number of columns:', '3');
        const rowInput = prompt('Enter number of rows:', '3');
        const cols = Math.max(parseInt(colInput || '0'), 1);
        const rows = Math.max(parseInt(rowInput || '0'), 1);
        if (isNaN(cols) || isNaN(rows)) return;

        const headerRow = Array(cols)
            .fill('')
            .map((_, i) => `Header ${i + 1}`)
            .join(' | ');
        const separator = Array(cols).fill('---').join(' | ');
        const dataRows = Array(rows)
            .fill('')
            .map(() => Array(cols).fill('Cell').join(' | '));
        const tableMarkdown =
            `| ${headerRow} |\n| ${separator} |\n` + dataRows.map(r => `| ${r} |`).join('\n');

        newValue = before + tableMarkdown + '\n' + after;
        newSelectionStart = before.length;
        newSelectionEnd = before.length + tableMarkdown.length;
    } else {
        const lines = value.split('\n');
        const cursorLineIndex = value.substring(0, selectionStart).split('\n').length - 1;
        const line = lines[cursorLineIndex];
        const isAlready = marker && line.startsWith(marker);
        lines[cursorLineIndex] = isAlready ? line.replace(marker, '') : marker + line;
        newValue = lines.join('\n');

        const delta = marker ? (isAlready ? -marker.length : marker.length) : 0;
        newSelectionStart = selectionStart + delta;
        newSelectionEnd = selectionEnd + delta;
    }

    textarea.value = newValue;
    textarea.selectionStart = newSelectionStart;
    textarea.selectionEnd = newSelectionEnd;
    textarea.focus();
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    afterApply?.(newValue);
};

export const copyCorrectedTextToClipboard = async (correctedText: string, lang: 'Ko' | 'Eng') => {
    try {
        await navigator.clipboard.writeText(correctedText);
        if (lang === 'Ko') {
            toast.success('교정된 텍스트가 복사되었습니다!');
        }

        if (lang === 'Eng') {
            toast.success('Success to copy text!');
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        if (lang === 'Ko') {
            toast.error('교정된 텍스트를 복사하는데 실패했습니다. 잠시 후 다시 시도해주세요.');
        }

        if (lang === 'Eng') {
            toast.error('Failed to copy text. Please try again later.');
        }
    }
};

export const getHighlightedFragments = <T,>(
    text: string,
    items: T[] | undefined,
    focusIndex: number,
    map: MapToHighlight<T>,
    classes: Classes = {},
): React.ReactNode[] => {
    if (!text || !items?.length) return [text];

    const baseCls =
        classes.base ??
        'rounded bg-red-200 px-0.5 text-red-800 underline decoration-red-400 decoration-2';
    const focusCls =
        classes.focus ??
        'rounded bg-red-300 px-0.5 font-bold text-red-900 underline decoration-red-600 decoration-2';

    const mapped = [...items]
        .map(map)
        .filter(m => m && typeof m.offset === 'number' && typeof m.length === 'number')
        .sort((a, b) => a.offset - b.offset);

    const out: React.ReactNode[] = [];
    let last = 0;

    mapped.forEach((m, i) => {
        const { offset, length, tooltip } = m;

        const start = Math.max(0, Math.min(text.length, offset));
        const end = Math.max(start, Math.min(text.length, offset + length));

        if (start > last) out.push(text.slice(last, start));

        const slice = text.slice(start, end);
        const isFocus = i === focusIndex;

        out.push(
            <mark
                key={`hl-${i}-${start}-${end}`}
                className={isFocus ? focusCls : baseCls}
                title={tooltip}
            >
                {slice || '∅'}
            </mark>,
        );

        last = end;
    });

    if (last < text.length) out.push(text.slice(last));
    return out;
};

export const mapLanguageToolMatch: MapToHighlight<Match> = m => ({
    offset: m.offset,
    length: m.length,
    tooltip: m.message,
});

export const mapKoChange: MapToHighlight<KoChange> = c => {
    const op = !c.from && c.to ? 'INSERT' : c.from && !c.to ? 'DELETE' : 'REPLACE';
    return {
        offset: c.offset,
        length: c.length,
        tooltip: `${op} — "${c.from || '∅'}" → "${c.to || '∅'}"`,
    };
};

export const handlePasteImageUrl = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget;
    const plain = e.clipboardData.getData('text/plain')?.trim();
    if (!plain) return false;

    const isImgUrl = /^https?:\/\/[^\s]+?\.(png|jpe?g|gif|webp|svg)(\?[^\s]*)?$/i.test(plain);
    if (!isImgUrl) return false;

    e.preventDefault();

    const asHtml = confirm('Image URL detected.\nOK = HTML <img>, Cancel = Markdown ![]()');

    const snippet = asHtml ? `<img src="${plain}" alt="image" height="300px" width="200px" />` : `![image](${plain})`;

    insertAtCursor(ta, snippet);
    return true;
};

const insertAtCursor = (ta: HTMLTextAreaElement, text: string) => {
    const { selectionStart, selectionEnd, value } = ta;
    const next = value.slice(0, selectionStart) + text + value.slice(selectionEnd);
    ta.value = next;
    const pos = selectionStart + text.length;
    ta.selectionStart = ta.selectionEnd = pos;
    ta.focus();
    ta.dispatchEvent(new Event('input', { bubbles: true }));
};

/*
유틸리티 모음 (Markdown/Clipboard/TOC-Highlight Helpers)

────────────────────────────────────────────────────────
1) getTodayDate()
────────────────────────────────────────────────────────
- 기능: 오늘 날짜를 'YYYY-MM-DD' 포맷 문자열로 반환.
- 입력: 없음
- 출력: string (예: '2025-08-13')
- 비고: 로컬 타임존 기준.

────────────────────────────────────────────────────────
2) getFullDateTime()
────────────────────────────────────────────────────────
- 기능: 현재 시각을 ISO 8601 문자열로 반환.
- 입력: 없음
- 출력: string (예: '2025-07-20T23:45:13.123Z')
- 비고: 항상 UTC(Z) 포맷.

────────────────────────────────────────────────────────
3) insertMarkdownSyntax(textarea, name, insert, marker, afterApply?)
────────────────────────────────────────────────────────
- 기능: textarea의 현재 선택 영역/커서 위치를 기준으로 마크다운/HTML 조각을 삽입하거나 토글.
- 공통 입력:
  - textarea: HTMLTextAreaElement (대상 에디터)
  - name: string        → 일부 툴바 버튼 식별(예: 'dash')
  - insert: string      → 블록 삽입용 템플릿(예: 코드블록/디테일스 등)
  - marker: string      → 토글/삽입 표시자(예: '**', '_', '~~', '```', 'link', 'image-md', 'image-html', 'video', '<kbd>', '<mark>', 'details', 'file', 'table' ...)
  - afterApply?: (newValue: string) => void → 삽입 후 전체 텍스트를 콜백으로 전달
- 주요 분기:
  ① 인라인 토글(**, _, ~~)
    - 선택 영역에 동일 marker가 감싸져 있으면 해제, 아니면 감싸기
    - 선택이 없으면 기본 텍스트를 삽입 후 선택 영역 지정
  ② 코드블록( ``` )
    - 선택 영역이 완전한 코드블록이면 언랩, 아니면 insert 템플릿 삽입
    - 'code goes here' 포커스 위치 선택
  ③ 수평선(dash)
    - '---\n' 삽입
  ④ 링크(link)
    - prompt로 URL 입력 받아 `[text](url)`삽입, 'text' 부분 선택
  ⑤ 이미지(Markdown: image-md)
    - prompt로 URL 입력 받아 `![alt text](url)` 삽입, 'alt text' 선택
  ⑥ 이미지(HTML: image-html)
    - 최대 4개까지 URL 입력받아 1/2/3/4장 레이아웃 자동 구성(Grid)
  ⑦ 비디오(video)
    - `<video src="..." width="720" height="480" controls></video>` 삽입
    - 커서가 URL 부분을 가리키도록 선택
  ⑧ 키보드/마크 태그(<kbd>, <mark>)
    - 각각 `<kbd>text</kbd>`, `<mark>text</mark>` 삽입 후 'text' 선택
  ⑨ details
    - 전달된 insert(예: `<details><summary>Summary</summary>...</details>`) 삽입
    - 'Summary' 텍스트에 커서 맞춤
  ⑩ 파일(file)
    - 파일 선택 input을 열고, 선택 파일 메타(아이콘/크기)로 마크다운 링크 생성
    - 서브폴더 입력 지원: 'test', 'test/more/deep' 등 다단계 가능
      - 경로: /velogit/uploads/[subpath]/encodedFileName
    - 예시 마크다운: `[📄 sample.pdf (1.2MB)](/velogit/uploads/docs/sample.pdf)`
  ⑪ 표(table)
    - prompt로 행/열 수 입력 → GFM 테이블 마크다운 자동 생성
  ⑫ 기본(기타 marker)
    - 현재 줄에 marker 토글(해당 줄 앞에 prefix 붙였다/뗌)
- 공통 처리:
  - 삽입 후 textarea value/selection 갱신, focus, input 이벤트 dispatch로 React onChange 유도
  - afterApply 콜백으로 최신 문자열 전달
- 주의:
  - prompt 기반 UX는 브라우저 환경 전제
  - 업로드/정적 호스팅 경로(/velogit/uploads/...)는 배포 환경에 맞게 관리 필요
  - 서브폴더는 앞뒤 슬래시 정리(중간 슬래시는 유지)

────────────────────────────────────────────────────────
4) copyCorrectedTextToClipboard(correctedText, lang)
────────────────────────────────────────────────────────
- 기능: 교정된 텍스트를 클립보드에 복사하고, 언어별 토스트 메시지 표시.
- 입력:
  - correctedText: string
  - lang: 'Ko' | 'Eng'
- 출력: Promise<void>
- 동작:
  - 성공 시: Ko → '교정된 텍스트가 복사되었습니다!', Eng → 'Success to copy text!'
  - 실패 시: Ko/Eng 각각 에러 토스트

────────────────────────────────────────────────────────
5) getHighlightedFragments(text, items, focusIndex, map, classes?)
────────────────────────────────────────────────────────
- 기능: 범위 정보(offset, length)를 가진 항목 배열을 받아, 원문 문자열을 ReactNode[]로 분해하여 가-highlight된 조각들을 반환.
- 입력:
  - text: 원문 문자열
  - items: 매핑 대상 배열(T[])
  - focusIndex: 포커스할 highlight 인덱스(굵게/강조)
  - map: (item: T) => { offset: number; length: number; tooltip?: string }
  - classes?: { base?: string; focus?: string }
- 출력: React.ReactNode[]
- 동작:
  - items를 map → {offset, length, tooltip}로 정규화 후, 오프셋 순으로 소팅
  - 비하이라이트 구간은 일반 텍스트, 하이라이트 구간은 <mark>로 감싸서 반환
  - focusIndex는 별도 클래스(focus) 적용
- 기본 클래스:
  - base: 'rounded bg-red-200 px-0.5 text-red-800 underline decoration-red-400 decoration-2'
  - focus: 'rounded bg-red-300 px-0.5 font-bold text-red-900 underline decoration-red-600 decoration-2'
- 주의:
  - 오프셋 클램프 처리(문자열 범위 초과 방지)
  - 겹치는 영역이 있을 경우, 전달 순서 기준으로 처리됨

────────────────────────────────────────────────────────
6) mapLanguageToolMatch(match)
────────────────────────────────────────────────────────
- 기능: LanguageTool의 Match를 getHighlightedFragments용 {offset, length, tooltip} 형태로 매핑.
- 입력: match: Match({ offset, length, message, ... })
- 출력: { offset, length, tooltip }

────────────────────────────────────────────────────────
7) mapKoChange(change)
────────────────────────────────────────────────────────
- 기능: 한국어 교정 결과(삽입/삭제/치환)를 하이라이트용 구조로 매핑.
- 입력: change: KoChange({ from, to, offset, length, ... })
- 출력: { offset, length, tooltip }
  - tooltip 예: INSERT/DELETE/REPLACE — "from" → "to"
- 판별:
  - !from && to → INSERT
  - from && !to → DELETE
  - 그 외 → REPLACE
────────────────────────────────────────────────────────
8) handlePasteImageUrl(e)
 ────────────────────────────────────────────────────────
- 기능: 붙여넣기 이벤트에서 이미지 URL을 감지하여 HTML <img> 태그 또는 마크다운 ![]() 문법으로 삽입.
- 입력: e: React.ClipboardEvent<HTMLTextAreaElement> → textarea에서 발생한 paste 이벤트 객체.
- 출력:
  - boolean → true: 이미지 URL 감지 및 삽입 완료, false: 기본 붙여넣기 동작 진행.
- 비고:
  - http(s)로 시작하고 png/jpg/jpeg/gif/webp/svg 확장자로 끝나는 URL(쿼리스트링 허용)을 감지.
  - confirm 창에서 선택:
    - 확인(OK): HTML <img src="..."> 형태로 삽입.
    - 취소(Cancel): 마크다운 ![image](...) 형태로 삽입.
  - URL이 감지되면 기본 붙여넣기 동작을 막음.
*/
