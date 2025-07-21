import { usePostWriteStore } from '@/store/usePostWriteStore';
import clsx from 'clsx';
import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react';

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

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const validKeys = ['title', 'date', 'tags', 'summary', 'thumbnail', 'category'] as const;

        type MetaKeysExceptOfTags = (typeof validKeys)[number];

        if (validKeys.includes(name as MetaKeysExceptOfTags)) {
            setField(name as MetaKeysExceptOfTags, value);
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
    }, [mode, editablePost]);

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tagArray = tagsInput
                .split(',')
                .map(tag => tag.trim())
                .filter(Boolean);

            setField('tags', [...tags, ...tagArray]);
            setTagsInput('');
        }
    };

    const initTags = () => {
        if (confirm('Do you want to initialize tags?')) setField('tags', []);
    };

    const goToContentEditStep = () => {
        const titleInvalid = title.trim() === '';
        const dateInvalid = date.trim() === '';
        const categoryInvalid = category.trim() === '';

        setIsTitleInvalid(titleInvalid);
        setIsDateInvalid(dateInvalid);
        setIsCategoryInvalid(categoryInvalid);

        if (titleInvalid || dateInvalid || categoryInvalid) {
            alert('Title, date, and category are required fields, so please fill them all out.');
            return;
        }

        if (confirm('Did you enter the metadata correctly?')) {
            setStep('content');
        }
    };

    return (
        <section className='flex w-full flex-1 flex-col justify-between gap-4 border-r border-border bg-background p-4 sm:w-1/2'>
            <div className='flex w-full flex-col justify-start gap-4'>
                <input
                    type='text'
                    name='title'
                    value={title}
                    onChange={handleOnChange}
                    placeholder='Enter title'
                    className={clsx(
                        'w-full border-l-8 bg-background px-3 py-2 text-3xl text-foreground focus:outline-none',
                        isTitleInvalid
                            ? 'border-error transition-colors duration-200 ease-in-out placeholder:text-error'
                            : 'border-primary',
                    )}
                />

                <input
                    type='date'
                    name='date'
                    value={date}
                    onChange={handleOnChange}
                    className={clsx(
                        'w-full rounded-md border bg-background px-3 py-2 text-base text-foreground shadow-sm transition duration-200 focus:outline-none focus:ring-2',
                        isDateInvalid
                            ? 'border-error transition-colors duration-200 ease-in-out focus:ring-error'
                            : 'border-border focus:border-primary focus:ring-primary',
                    )}
                />

                <div className='flex flex-wrap justify-start gap-2'>
                    <input
                        type='text'
                        name='tags'
                        value={tagsInput}
                        onChange={e => setTagsInput(e.target.value)}
                        onKeyDown={handleOnKeyDown}
                        placeholder='Enter tags, separated by commas or Enter'
                        className='w-[70%] rounded-md border border-border bg-background px-3 py-2 text-base text-foreground shadow-sm transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
                    />
                    <button
                        onClick={initTags}
                        className='grow rounded-md border border-error bg-error text-xl font-semibold text-white hover:bg-error/70 active:bg-error/70'
                    >
                        Init
                    </button>
                </div>
                {tags ? (
                    <div className='flex flex-wrap justify-start gap-2'>
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className='rounded-md bg-primary-bg px-2 py-1 text-sm font-semibold text-primary'
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                ) : null}
                <textarea
                    name='summary'
                    value={summary}
                    onChange={handleOnChange}
                    placeholder='Enter a brief summary'
                    rows={3}
                    className='w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
                ></textarea>
                <input
                    type='text'
                    name='thumbnail'
                    value={thumbnail}
                    onChange={handleOnChange}
                    placeholder='Thumbnail image path (e.g., /images/thumbnail.png)'
                    className='w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
                />

                <input
                    type='text'
                    name='category'
                    value={category}
                    onChange={handleOnChange}
                    placeholder='Enter category'
                    className={clsx(
                        'w-full rounded-md border bg-background px-3 py-2 text-base text-foreground transition duration-200 focus:outline-none focus:ring-2',
                        isCategoryInvalid
                            ? 'border-error transition-colors duration-200 ease-in-out placeholder:text-error focus:ring-error'
                            : 'border-border focus:border-primary focus:ring-primary',
                    )}
                />
            </div>
            <button
                onClick={goToContentEditStep}
                className='flex justify-center rounded-md border border-primary bg-primary px-3 py-1 text-xl font-semibold text-white hover:bg-blue-700 active:bg-blue-700'
            >
                Next
            </button>
        </section>
    );
};

export default FrontMatterEditor;
