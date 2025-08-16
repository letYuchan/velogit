import { usePostWriteStore } from '@/store/usePostWriteStore';
import clsx from 'clsx';
import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { toast } from 'react-toastify';

interface FrontMatterEditorProps {
    setStep: React.Dispatch<React.SetStateAction<'meta' | 'content'>>;
    mode: 'write' | 'edit';
    editablePost: PostData | undefined;
}

const FrontMatterEditor = ({ setStep, mode, editablePost }: FrontMatterEditorProps) => {
    const { title, date, tags, summary, thumbnail, category, setField } = usePostWriteStore();

    const [tagsInput, setTagsInput] = useState(tags.join(', '));
    const [isTitleInvalid, setIsTitleInvalid] = useState(false);
    const [isDateInvalid, setIsDateInvalid] = useState(false);
    const [isCategoryInvalid, setIsCategoryInvalid] = useState(false);
    const isComposingRef = useRef(false);

    const validKeys = ['title', 'date', 'tags', 'summary', 'thumbnail', 'category'] as const;
    type MetaKeysExceptOfTags = (typeof validKeys)[number];

    const handleFrontMatterUpdate = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (validKeys.includes(name as MetaKeysExceptOfTags)) {
            setField(name as MetaKeysExceptOfTags, value);
        }
    };

    const commitTags = (raw: string) => {
        const tagArray = raw
            .split(',')
            .map(t => t.trim())
            .filter(Boolean);

        if (tagArray.length === 0) return;

        const mergedTags = Array.from(new Set([...tags, ...tagArray]));
        setField('tags', mergedTags);
        setTagsInput('');
    };

    const handleAddTagByOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (isComposingRef.current || e.nativeEvent.isComposing) return;
        if (e.key === 'Process') return;

        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            commitTags(tagsInput);
        }
    };

    const handleTagsBlur = () => {
        if (!isComposingRef.current && tagsInput.trim()) {
            commitTags(tagsInput);
        }
    };

    const initTags = () => {
        if (confirm('Do you want to initialize tags?')) {
            setField('tags', []);
            setTagsInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setField(
            'tags',
            tags.filter(t => t !== tagToRemove),
        );
    };

    const goToContentEditStep = () => {
        const titleInvalid = title.trim() === '';
        const dateInvalid = date.trim() === '';
        const categoryInvalid = category.trim() === '';

        setIsTitleInvalid(titleInvalid);
        setIsDateInvalid(dateInvalid);
        setIsCategoryInvalid(categoryInvalid);

        if (titleInvalid || dateInvalid || categoryInvalid) {
            toast.info(
                'Title, date, and category are required fields, so please fill them all out.',
            );
            return;
        }

        if (confirm('Did you enter the metadata correctly?')) {
            setStep('content');
        }
    };

    useEffect(() => {
        if (mode === 'edit' && editablePost) {
            setField('title', editablePost.title);
            setField('date', editablePost.date);
            setField('tags', editablePost.tags);
            setField('summary', editablePost.summary);
            setField('thumbnail', editablePost.thumbnail);
            setField('category', editablePost.category);
            setTagsInput(editablePost.tags.join(', '));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, editablePost]);

    return (
        <section className='flex w-full flex-1 flex-col justify-start gap-4 border-r border-border bg-background p-4 sm:w-1/2'>
            <div className='flex w-full flex-col justify-start gap-4'>
                {/* Title: required */}
                <input
                    type='text'
                    name='title'
                    value={title}
                    onChange={handleFrontMatterUpdate}
                    placeholder='Enter title'
                    className={clsx(
                        'w-full border-l-8 bg-background-second px-3 py-2 text-3xl text-foreground focus:outline-none',
                        isTitleInvalid
                            ? 'border-error transition-colors duration-200 ease-in-out placeholder:text-error'
                            : 'border-primary',
                    )}
                />

                {/* Date: required */}
                <input
                    type='date'
                    name='date'
                    value={date}
                    onChange={handleFrontMatterUpdate}
                    className={clsx(
                        'w-full rounded-md border bg-background-second px-3 py-2 text-base text-foreground shadow-sm transition duration-200 focus:outline-none focus:ring-2',
                        isDateInvalid
                            ? 'border-error transition-colors duration-200 ease-in-out focus:ring-error'
                            : 'border-border focus:border-primary focus:ring-primary',
                    )}
                />

                {/* Tag */}
                <div className='flex flex-wrap justify-start gap-2'>
                    <input
                        type='text'
                        name='tags'
                        value={tagsInput}
                        onChange={e => setTagsInput(e.target.value)}
                        onKeyDown={handleAddTagByOnKeyDown}
                        onCompositionStart={() => (isComposingRef.current = true)}
                        onCompositionEnd={() => (isComposingRef.current = false)}
                        onBlur={handleTagsBlur}
                        placeholder='Enter tags, separated by commas or Enter'
                        className='w-[70%] rounded-md border border-border bg-background-second px-3 py-2 text-base text-foreground shadow-sm transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                    <button
                        onClick={initTags}
                        className='grow rounded-md border border-error bg-error text-xl font-semibold text-main hover:bg-error/70 active:bg-error/70'
                    >
                        Init
                    </button>
                </div>
                {tags.length > 0 && (
                    <div className='flex flex-wrap justify-start gap-2'>
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className='inline-flex h-6 items-center justify-center gap-1 rounded-md bg-primary px-2 py-1 text-sm font-semibold text-main'
                            >
                                #{tag}
                                <button
                                    type='button'
                                    onClick={() => removeTag(tag)}
                                    className='ml-1 rounded px-1 text-main/70 hover:bg-primary-deep hover:text-main active:bg-primary-deep active:text-main'
                                >
                                    x
                                </button>
                            </span>
                        ))}
                    </div>
                )}

                {/* Summary */}
                <textarea
                    name='summary'
                    value={summary}
                    onChange={handleFrontMatterUpdate}
                    placeholder='Enter a brief summary'
                    rows={3}
                    className='w-full rounded-md border border-border bg-background-second px-3 py-2 text-base text-foreground transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
                />

                {/* Thumbnail */}
                <input
                    type='text'
                    name='thumbnail'
                    value={thumbnail}
                    onChange={handleFrontMatterUpdate}
                    placeholder='Thumbnail image path (e.g., images/thumbnail.jpg)'
                    className='w-full rounded-md border border-border bg-background-second px-3 py-2 text-base text-foreground transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
                />

                {/* Category: required */}
                <input
                    type='text'
                    name='category'
                    value={category}
                    onChange={handleFrontMatterUpdate}
                    placeholder='Enter category'
                    className={clsx(
                        'w-full rounded-md border bg-background-second px-3 py-2 text-base text-foreground transition duration-200 focus:outline-none focus:ring-2',
                        isCategoryInvalid
                            ? 'border-error transition-colors duration-200 ease-in-out placeholder:text-error focus:ring-error'
                            : 'border-border focus:border-primary focus:ring-primary',
                    )}
                />
            </div>

            <button
                onClick={goToContentEditStep}
                className='flex justify-center rounded-md border border-primary bg-primary px-3 py-1 text-xl font-semibold text-main hover:bg-primary-deep active:bg-primary-deep'
            >
                Next
            </button>
        </section>
    );
};

export default FrontMatterEditor;
