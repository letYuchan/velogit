import ContentEditorToolbar from '@/components/common/write/ContentEditorToolbar';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import type { ChangeEvent } from 'react';
import { useRef } from 'react';

const ContentEditor = () => {
    const { content, setField } = usePostWriteStore();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setField('content', e.target.value);
    };

    const handleTextareaTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key !== 'Tab') return;

        e.preventDefault();
        const tab = '  ';
        const textarea = e.currentTarget;
        const { selectionStart, selectionEnd, value } = textarea;

        const newValue = value.slice(0, selectionStart) + tab + value.slice(selectionEnd);
        textarea.value = newValue;

        textarea.selectionStart = textarea.selectionEnd = selectionStart + tab.length;

        const event = new Event('input', { bubbles: true });
        textarea.dispatchEvent(event);
    };

    return (
        <section className='flex w-full flex-1 flex-col justify-between gap-4 bg-background p-4 sm:w-1/2'>
            <div className='flex flex-col gap-2'>
                <ContentEditorToolbar textareaRef={textareaRef} />
                <textarea
                    ref={textareaRef}
                    id='markdown-content'
                    name='content'
                    placeholder='Write your blog content here...'
                    value={content}
                    onChange={handleContentChange}
                    onKeyDown={handleTextareaTabKey}
                    className='placeholder:text-muted-foreground min-h-[400px] w-full resize-y rounded-md border border-border bg-white p-4 text-base leading-relaxed transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
                />
            </div>

            <button className='flex justify-center rounded-2xl border border-primary bg-primary px-3 py-1 font-title text-lg font-semibold text-white hover:bg-blue-700'>
                Save
            </button>
        </section>
    );
};

export default ContentEditor;
