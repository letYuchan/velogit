import FloatingToolbar from '@/components/common/write/FloatingToolBar';
import { TOOL_ITEMS } from '@/data/toolItems';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { useState } from 'react';

interface ContentEditorToolbarProps {
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const ContentEditorToolbar = ({ textareaRef }: ContentEditorToolbarProps) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [isFloatingToolBarOn, setIsFloatingToolBarOn] = useState(false);
    const { setField } = usePostWriteStore();

    const insertMarkdownSyntax = (name: string, insert: string, marker: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

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
                newSelectionStart = before.length + offset;
                newSelectionEnd = newSelectionStart + 'code goes here'.length;
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
                const url = prompt(
                    `Enter image URL ${i + 1} (Cancel to stop):`,
                    '/velogit/images/',
                );
                if (!url) break;
                urls.push(url);
            }

            if (urls.length === 0) return;

            const imgTags = urls
                .map(
                    url =>
                        `<img src="${url}" width="300" height="200" alt="image" style="object-fit: cover;" />`,
                )
                .join('');

            const layout =
                urls.length === 1
                    ? imgTags
                    : `<div style="display: grid; grid-template-columns: repeat(${Math.min(
                          urls.length,
                          2,
                      )}, 1fr); gap: 8px;">${imgTags}</div>`;

            newValue = before + layout + after;
            newSelectionStart = before.length + layout.indexOf('alt="image"') + 5;
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

        if (['h1', 'h2', 'h3', 'h4', 'quote', 'list'].includes(name)) {
            setActiveItem(prev => (prev === name ? null : name));
        }
    };

    const handleClear = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        if (confirm('Do you want to clear all content?')) {
            textarea.value = '';
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            setField('content', '');
        }
    };

    return (
        <div className='flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2'>
            {isFloatingToolBarOn && <FloatingToolbar textareaRef={textareaRef} />}
            <div className='flex flex-wrap gap-2'>
                {TOOL_ITEMS.map(({ name, icon: Icon, label, insert, marker }) => (
                    <button
                        key={name}
                        type='button'
                        title={label}
                        onClick={() => insertMarkdownSyntax(name, insert, marker)}
                        className={`flex items-center gap-1 rounded-md border px-2 py-1 text-sm transition-colors duration-200 hover:bg-primary-light active:bg-primary-light ${
                            activeItem === name
                                ? 'border-primary bg-primary text-main hover:border-border hover:text-muted active:border-border active:text-muted'
                                : 'border-border bg-background text-muted'
                        }`}
                    >
                        <Icon size={16} />
                    </button>
                ))}
            </div>
            <button
                onClick={handleClear}
                className='flex-1 rounded-md border border-error bg-error px-3 py-1 text-xl font-semibold text-main hover:bg-error/70 active:bg-error/70'
            >
                Init
            </button>
            <button
                onClick={() => setIsFloatingToolBarOn(prev => !prev)}
                className='flex flex-1 justify-center rounded-md border border-primary bg-primary px-3 py-1 text-xl font-semibold text-main hover:bg-primary-deep active:bg-primary-deep'
            >
                {isFloatingToolBarOn ? 'Floating Bar: on' : 'Floating Bar: off'}
            </button>
        </div>
    );
};

export default ContentEditorToolbar;
