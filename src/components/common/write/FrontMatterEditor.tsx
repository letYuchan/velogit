import { usePostWriteStore } from '@/store/usePostWriteStore';
import { useState, type ChangeEvent, type KeyboardEvent } from 'react';

interface FrontMatterEditorProps {
  setStep: React.Dispatch<React.SetStateAction<'meta' | 'content'>>;
}

const FrontMatterEditor = ({ setStep }: FrontMatterEditorProps) => {
  const { title, date, tags, summary, thumbnail, category, setField } = usePostWriteStore();
  const [tagsInput, setTagsInput] = useState(tags.join(', '));

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const validKeys = ['title', 'date', 'tags', 'summary', 'thumbnail', 'category'] as const;

    type MetaKeysExceptOfTags = (typeof validKeys)[number];

    if (validKeys.includes(name as MetaKeysExceptOfTags)) {
      setField(name as MetaKeysExceptOfTags, value);
    }
  };

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
    setField('tags', []);
  };

  const goToContentEditStep = () => {
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
          className='w-full border-l-8 border-primary bg-white px-3 py-2 text-3xl text-foreground focus:outline-none'
        />

        <input
          type='date'
          name='date'
          value={date}
          onChange={handleOnChange}
          className='placeholder:text-muted-foreground w-full rounded-md border border-border bg-white px-3 py-2 text-base text-foreground shadow-sm transition duration-150 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
        />

        <div className='flex flex-wrap justify-start gap-2'>
          <input
            type='text'
            name='tags'
            value={tagsInput}
            onChange={e => setTagsInput(e.target.value)}
            onKeyDown={handleOnKeyDown}
            placeholder='Enter tags, separated by commas or Enter'
            className='placeholder:text-muted-foreground w-[70%] rounded-md border border-border bg-white px-3 py-2 text-base text-foreground shadow-sm transition duration-150 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
          />
          <button
            onClick={initTags}
            className='border-priamry grow rounded-md border bg-primary text-xl font-semibold text-white hover:bg-blue-700'
          >
            Init
          </button>
        </div>
        {tags ? (
          <div className='flex flex-wrap justify-start gap-2'>
            {tags.map(tag => (
              <span className='rounded-md bg-primary-bg px-2 py-1 text-sm font-semibold text-primary'>
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
          className='placeholder:text-muted-foreground w-full rounded-md border border-border bg-white px-3 py-2 text-base text-foreground transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
        ></textarea>

        <input
          type='text'
          name='thumbnail'
          value={thumbnail}
          onChange={handleOnChange}
          placeholder='Thumbnail image path (e.g., images/thumbnail.png)'
          className='placeholder:text-muted-foreground w-full rounded-md border border-border bg-white px-3 py-2 text-base text-foreground transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
        />

        <input
          type='text'
          name='category'
          value={category}
          onChange={handleOnChange}
          placeholder='Enter category'
          className='placeholder:text-muted-foreground w-full rounded-md border border-border bg-white px-3 py-2 text-base text-foreground transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
        />
      </div>
      <button
        onClick={goToContentEditStep}
        className='flex justify-center rounded-2xl border border-primary bg-primary px-3 py-1 font-title text-lg font-semibold text-white hover:bg-blue-700'
      >
        Next
      </button>
    </section>
  );
};

export default FrontMatterEditor;
