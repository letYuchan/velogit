import ContentEditorToolbar from '@/components/common/write/ContentEditorToolbar';
import { POST_KEY } from '@/constants/draft.constants';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface ContentEditorProps {
    setStep: React.Dispatch<React.SetStateAction<'meta' | 'content'>>;
    mode: 'write' | 'edit';
    editablePost: PostData | undefined;
}

const ContentEditor = ({ setStep, mode, editablePost }: ContentEditorProps) => {
    const [isContentInvalid, setIsContentInvalid] = useState(false);
    const { content, setField, buildMarkdown, title, date, category, reset } = usePostWriteStore();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (mode === 'edit' && editablePost) {
            const parsedContent = editablePost.content.replace(/^---\n[\s\S]*?\n---/, '').trim();
            setField('content', parsedContent);
        }
    }, [mode, editablePost]);

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

    const exportPostAsJson = () => {
        if (!confirm('Do you want to export the post for publishing?')) return;

        if (!title || !date || !category) {
            alert('Invalid frontmatter (title/date/category)');
            reset();
            setStep('meta');
            if (mode === 'write') {
                navigate('/write');
            }

            if (mode === 'edit') {
                navigate('/edit');
            }
            return;
        }

        const contentInvalid = content.trim() === '';
        setIsContentInvalid(contentInvalid);
        if (contentInvalid) {
            alert('Content is required.');
            return;
        }

        const markdown = buildMarkdown();

        const defaultFileName = mode === 'edit' && editablePost ? editablePost.slug : 'post-sample';

        const inputFileName = prompt('Enter filename to export (without .json):', defaultFileName);
        if (!inputFileName || !inputFileName.trim()) {
            alert('Invalid file name. Export cancelled.');
            return;
        }

        const sanitizedName = inputFileName.trim().replace(/\s+/g, '-');
        const fileName = `${sanitizedName}.json`;

        const blob = new Blob([JSON.stringify({ [POST_KEY]: markdown }, null, 2)], {
            type: 'application/json',
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);

        const isEdit = mode === 'edit';
        const scriptToRun = isEdit ? 'autoEdit.ts' : 'autoPublish.ts';
        const cmd = isEdit
            ? `npx tsx scripts/${scriptToRun} ${sanitizedName} ${editablePost?.slug}`
            : `npx tsx scripts/${scriptToRun} ${sanitizedName}`;

        navigator.clipboard
            .writeText(cmd)
            .then(() => {
                alert(
                    `Post JSON exported as "${fileName}"\nTerminal command copied!\n\nNow open your terminal and run:\n${cmd}`,
                );
                navigate('/');
            })
            .catch(() => {
                alert(
                    `Post JSON exported as "${fileName}"\nCould not copy command. Please run manually:\n${cmd}`,
                );
            });
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
                        isContentInvalid ? 'border-error placeholder:text-error' : 'border-primary',
                    )}
                />
            </div>

            <button
                onClick={exportPostAsJson}
                className='text-main hover:bg-primary-deep active:bg-primary-deep flex justify-center rounded-md border border-primary bg-primary px-3 py-1 text-xl font-semibold'
            >
                {mode === 'edit' ? 'Edit' : 'Publish'}
            </button>
        </section>
    );
};

export default ContentEditor;
