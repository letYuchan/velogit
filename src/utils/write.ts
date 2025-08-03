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
        newValue = before + insert + after;
        const offset = insert.indexOf('code goes here');
        newSelectionStart = before.length + offset;
        newSelectionEnd = newSelectionStart + 'code goes here'.length;
    } else if (marker === 'link') {
        const url = prompt('Enter the URL:', 'https://');
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
        const url = prompt('Enter image URL:', '/velogit/images/');
        if (url === null) return;
        newValue = before + `<img src="${url}" width="600" height="400" alt="image" />` + after;
        newSelectionStart = before.length + newValue.indexOf('alt="image"') + 5;
        newSelectionEnd = newSelectionStart + 5;
    } else if (marker === 'video') {
        const url = prompt('Enter video URL:', '/velogit/videos/');
        if (url === null) return;
        newValue =
            before + `<video src="${url}" width="720" height="480" controls></video>` + after;
        newSelectionStart = before.length + newValue.indexOf(url);
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
        newSelectionStart = before.length + summaryIndex;
        newSelectionEnd = newSelectionStart + 'Summary'.length;
    } else if (marker === 'file') {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '*/*';

        input.onchange = () => {
            const file = input.files?.[0];
            if (!file) return;

            const fileName = file.name;
            const encodedName = encodeURIComponent(fileName);
            const filePath = `/velogit/uploads/${encodedName}`;
            const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);

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

            const markdown = `[${icon} ${fileName} (${fileSizeMB}MB)](${filePath})`;

            const result = before + markdown + after;
            textarea.value = result;
            textarea.selectionStart = textarea.selectionEnd = before.length + markdown.length;
            textarea.focus();
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
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

        const tableMarkdown = `| ${headerRow} |\n| ${separator} |\n${dataRows
            .map(row => `| ${row} |`)
            .join('\n')}`;

        newValue = before + tableMarkdown + '\n' + after;
        newSelectionStart = before.length;
        newSelectionEnd = before.length + tableMarkdown.length;
    } else {
        const lines = value.split('\n');
        const cursorLineIndex = value.substring(0, selectionStart).split('\n').length - 1;
        const line = lines[cursorLineIndex];
        const isAlreadyInserted = marker && line.startsWith(marker);

        lines[cursorLineIndex] = isAlreadyInserted ? line.replace(marker, '') : marker + line;
        newValue = lines.join('\n');

        const delta = marker ? (isAlreadyInserted ? -marker.length : marker.length) : 0;
        newSelectionStart = selectionStart + delta;
        newSelectionEnd = selectionEnd + delta;
    }

    textarea.value = newValue;
    textarea.selectionStart = newSelectionStart;
    textarea.selectionEnd = newSelectionEnd;
    textarea.focus();
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
};
