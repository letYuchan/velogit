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
} from 'lucide-react';
import { useState } from 'react';

interface ContentEditorToolbarProps {
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const ContentEditorToolbar = ({ textareaRef }: ContentEditorToolbarProps) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);

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
        { name: 'dash', icon: Minus, label: '-', insert: '---\n', marker: '---\n' },
        { name: 'code', icon: Code, label: 'Code Block', insert: '```js\n\n```', marker: '```' },
    ];

    const handleClick = (name: string, insert: string, marker: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const { selectionStart, selectionEnd, value } = textarea;
        const selectedText = value.substring(selectionStart, selectionEnd);
        const before = value.slice(0, selectionStart);
        const after = value.slice(selectionEnd);

        const isInline = ['**', '_', '~~', '`'].includes(marker);
        const isBlock = marker === '```';

        let newValue = '';
        let newSelectionStart = selectionStart;
        let newSelectionEnd = selectionEnd;

        if (isInline) {
            const isWrapped = selectedText.startsWith(marker) && selectedText.endsWith(marker);

            if (isWrapped) {
                const unwrapped = selectedText.slice(
                    marker.length,
                    selectedText.length - marker.length,
                );
                newValue = before + unwrapped + after;
                newSelectionStart = selectionStart;
                newSelectionEnd = selectionEnd - 2 * marker.length;
            } else if (selectedText.length > 0) {
                newValue = before + marker + selectedText + marker + after;
                newSelectionStart = selectionStart;
                newSelectionEnd = selectionEnd + 2 * marker.length;
            } else {
                const defaultText = insert.split(marker).join('');
                newValue = before + marker + defaultText + marker + after;
                newSelectionStart = selectionStart + marker.length;
                newSelectionEnd = selectionStart + marker.length + defaultText.length;
            }
        } else if (isBlock) {
            const blockRegex = /^```[a-z]*\n[\s\S]*?\n```$/;
            const selectedIsCodeBlock = blockRegex.test(selectedText);

            if (selectedIsCodeBlock) {
                const unwrapped = selectedText.replace(/^```[a-z]*\n/, '').replace(/\n```$/, '');
                newValue = before + unwrapped + after;
                newSelectionStart = selectionStart;
                newSelectionEnd = selectionStart + unwrapped.length;
            } else if (selectedText.length > 0) {
                newValue = before + '```js\n' + selectedText + '\n```' + after;
                newSelectionStart = selectionStart;
                newSelectionEnd = selectionStart + selectedText.length + 7; // keep cursor inside block
            } else {
                newValue = before + '```js\n\n```' + after;
                newSelectionStart = selectionStart + 7;
                newSelectionEnd = newSelectionStart;
            }
        } else {
            const lines = value.split('\n');
            const cursorLineIndex = value.substring(0, selectionStart).split('\n').length - 1;
            const line = lines[cursorLineIndex];
            const isAlreadyInserted = line.startsWith(marker);

            lines[cursorLineIndex] = isAlreadyInserted ? line.replace(marker, '') : marker + line;

            newValue = lines.join('\n');

            const delta = isAlreadyInserted ? -marker.length : marker.length;
            newSelectionStart = selectionStart + delta;
            newSelectionEnd = selectionEnd + delta;
        }

        textarea.value = newValue;
        textarea.selectionStart = newSelectionStart;
        textarea.selectionEnd = newSelectionEnd;
        textarea.focus();

        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        setActiveItem(prev => (prev === name ? null : name));
    };

    return (
        <div className='flex flex-wrap gap-2 border-b border-border pb-2'>
            {TOOL_ITEMS.map(({ name, icon: Icon, label, insert, marker }) => (
                <button
                    key={name}
                    type='button'
                    title={label}
                    onClick={() => handleClick(name, insert, marker)}
                    className={`flex items-center gap-1 rounded-md border px-2 py-1 text-sm transition-colors duration-200 hover:bg-blue-200 ${
                        activeItem === name ? 'bg-primary text-white' : 'bg-background text-muted'
                    }`}
                >
                    <Icon size={16} />
                </button>
            ))}
        </div>
    );
};

export default ContentEditorToolbar;
