import { useEffect, useRef, useState } from 'react';
import { TOOL_ITEMS } from '@/data/toolItems';
import { insertMarkdownSyntax } from '@/utils/write';

interface FloatingToolbarProps {
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const FloatingToolbar = ({ textareaRef }: FloatingToolbarProps) => {
    const [position, setPosition] = useState({ top: -9999, left: -9999 });
    const wrapperRef = useRef<HTMLDivElement>(null);

    const updatePosition = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const { selectionStart, value, scrollTop: innerScrollTop } = textarea;
        const rect = textarea.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        const textBeforeCursor = value.slice(0, selectionStart);
        const lines = textBeforeCursor.split('\n');
        const currentLine = lines.length - 1;
        const currentColumn = lines[lines.length - 1]?.length || 0;

        const lineHeight = 24;
        const charWidth = 8;
        const verticalOffset = 36;
        const horizontalOffset = 4;

        const top =
            rect.top +
            scrollTop -
            innerScrollTop +
            currentLine * lineHeight +
            lineHeight +
            verticalOffset;

        const left = rect.left + scrollLeft + currentColumn * charWidth + horizontalOffset;

        setPosition({ top, left });
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.addEventListener('focus', updatePosition);
        textarea.addEventListener('click', updatePosition);
        textarea.addEventListener('keyup', updatePosition);
        textarea.addEventListener('input', updatePosition);
        textarea.addEventListener('scroll', updatePosition);
        textarea.addEventListener('blur', () =>
            setTimeout(() => setPosition({ top: -9999, left: -9999 }), 200),
        );

        return () => {
            textarea.removeEventListener('focus', updatePosition);
            textarea.removeEventListener('click', updatePosition);
            textarea.removeEventListener('keyup', updatePosition);
            textarea.removeEventListener('input', updatePosition);
            textarea.removeEventListener('scroll', updatePosition);
            textarea.removeEventListener('blur', () => setPosition({ top: -9999, left: -9999 }));
        };
    }, [textareaRef]);

    return (
        <div
            ref={wrapperRef}
            className='absolute z-50 grid grid-cols-10 gap-2 rounded-xl border border-border bg-background/70 p-2 shadow-md backdrop-blur-sm'
            style={{
                top: position.top,
                left: position.left,
                transition: 'top 0.1s ease, left 0.1s ease',
            }}
        >
            {TOOL_ITEMS.map(({ name, icon: Icon, label, insert, marker }) => (
                <button
                    key={name}
                    type='button'
                    title={label}
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => {
                        const textarea = textareaRef.current;
                        if (!textarea) return;
                        insertMarkdownSyntax(textarea, name, insert, marker);
                    }}
                    className='flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-sm text-muted transition-colors duration-200 hover:bg-primary-light active:bg-primary-light'
                >
                    <Icon size={16} />
                </button>
            ))}
        </div>
    );
};

export default FloatingToolbar;
