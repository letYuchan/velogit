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
            const fileName = file.name;
            const encoded = encodeURIComponent(fileName);
            const filePath = `/velogit/uploads/${encoded}`;
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
