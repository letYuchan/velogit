import ContentEditorToolbar from '@/components/common/write/ContentEditorToolbar';
import { POST_KEY } from '@/constants/draft.constants';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContentEditor = () => {
    const [isContentInvalid, setIsContentInvalid] = useState(false);
    const { content, setField, buildMarkdown, title, date, category } = usePostWriteStore();
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

    const navigate = useNavigate();

    const savePostToLocal = () => {
        if (!confirm('Do you want to save post for publish?')) return;

        if (!title || !date || !category) {
            alert('Invalid access: missing frontmatter');
            navigate('/');
            return;
        }

        const contentInvalid = content.trim() === '';
        setIsContentInvalid(contentInvalid);

        if (contentInvalid) {
            alert('Content is required field, so please fill it.');
            return;
        }

        try {
            const markdown = buildMarkdown();
            localStorage.setItem(POST_KEY, JSON.stringify(markdown));
            alert('Post saved to localStorage successfully.');
        } catch (e) {
            alert(`Failed to save so try again. Error: ${e}`);
        }
    };

    return (
        <section className='flex w-full flex-1 flex-col justify-between gap-4 bg-background p-4 sm:w-1/2'>
            <div className='flex flex-col gap-2'>
                <ContentEditorToolbar textareaRef={textareaRef} />
                <textarea
                    ref={textareaRef}
                    id='markdown-content'
                    name='content'
                    placeholder='Write content here...'
                    value={content}
                    onChange={handleContentChange}
                    onKeyDown={handleTextareaTabKey}
                    className={clsx(
                        'min-h-[400px] w-full resize-y rounded-md border-l-8 bg-background p-4 text-base leading-relaxed text-foreground transition-colors duration-200 ease-in-out focus:outline-none',
                        isContentInvalid // 이건 적절한 boolean으로 조건 처리 필요
                            ? 'border-error placeholder:text-error'
                            : 'border-primary',
                    )}
                />
            </div>

            <button
                onClick={savePostToLocal}
                className='flex justify-center rounded-md border border-primary bg-primary px-3 py-1 text-xl font-semibold text-white hover:bg-blue-700 active:bg-blue-700'
            >
                Publish
            </button>
        </section>
    );
};

export default ContentEditor;
