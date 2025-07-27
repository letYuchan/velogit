import { usePostWriteStore } from '@/store/usePostWriteStore';
import {
    Bold,
    Italic,
    Quote,
    Code,
    List,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Minus,
    Strikethrough,
    Link2,
    ImagePlus,
    FileImage,
    Video,
    Keyboard,
    Highlighter,
    PanelTopClose,
    FileText,
} from 'lucide-react';
import { useState } from 'react';

interface ContentEditorToolbarProps {
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const ContentEditorToolbar = ({ textareaRef }: ContentEditorToolbarProps) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const { setField } = usePostWriteStore();

    const TOOL_ITEMS = [
        { name: 'h1', icon: Heading1, label: 'H1', insert: '# ', marker: '# ' },
        { name: 'h2', icon: Heading2, label: 'H2', insert: '## ', marker: '## ' },
        { name: 'h3', icon: Heading3, label: 'H3', insert: '### ', marker: '### ' },
        { name: 'h4', icon: Heading4, label: 'H4', insert: '#### ', marker: '#### ' },
        { name: 'bold', icon: Bold, label: 'Bold', insert: '**bold**', marker: '**' },
        { name: 'italic', icon: Italic, label: 'Italic', insert: '_italic_', marker: '_' },
        {
            name: 'strike',
            icon: Strikethrough,
            label: 'Strikethrough',
            insert: '~~strikethrough~~',
            marker: '~~',
        },
        { name: 'quote', icon: Quote, label: 'Quote', insert: '> ', marker: '> ' },
        { name: 'list', icon: List, label: 'List', insert: '- ', marker: '- ' },
        { name: 'dash', icon: Minus, label: '-', insert: '---\n', marker: '' },
        {
            name: 'code',
            icon: Code,
            label: 'Code Block',
            insert: '```js\ncode goes here\n```',
            marker: '```',
        },
        { name: 'link', icon: Link2, label: 'Link', insert: '', marker: 'link' },
        {
            name: 'image-md',
            icon: ImagePlus,
            label: 'Image (Markdown)',
            insert: '',
            marker: 'image-md',
        },
        {
            name: 'image-html',
            icon: FileImage,
            label: 'Image (HTML)',
            insert: '',
            marker: 'image-html',
        },
        { name: 'video', icon: Video, label: 'Video', insert: '', marker: 'video' },
        {
            name: 'kbd',
            icon: Keyboard,
            label: 'Keyboard',
            insert: '<kbd>text</kbd>',
            marker: '<kbd>',
        },
        {
            name: 'mark',
            icon: Highlighter,
            label: 'Highlighter',
            insert: '<mark>text</mark>',
            marker: '<mark>',
        },
        {
            name: 'details',
            icon: PanelTopClose,
            label: 'Details',
            insert: '<details>\n  <summary>Summary</summary>\n  Content\n</details>',
            marker: 'details',
        },
        { name: 'file', icon: FileText, label: 'File', insert: '', marker: 'file' },
    ];

    const handleClick = (name: string, insert: string, marker: string) => {
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
            <div className='flex flex-wrap gap-2'>
                {TOOL_ITEMS.map(({ name, icon: Icon, label, insert, marker }) => (
                    <button
                        key={name}
                        type='button'
                        title={label}
                        onClick={() => handleClick(name, insert, marker)}
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
                className='grow rounded-md border border-error bg-error px-3 py-1 text-xl font-semibold text-main hover:bg-error/70 active:bg-error/70'
            >
                Init
            </button>
        </div>
    );
};

export default ContentEditorToolbar;
