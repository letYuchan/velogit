import MarkdownRenderer from '@/components/test/MarkdownRenderer';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContentPreview = () => {
    const { category, content, date, reset, setField, summary, tags, thumbnail, title } =
        usePostWriteStore();

    const [isRequiredInputsFilled, setIsRequiredInputsFilled] = useState(true);

    const parsedFrontMatter: ParsedFrontMatterType = {
        title: title,
        date: date,
        tags: tags,
        category: category,
    };

    return (
        <section className='flex w-full flex-1 flex-col justify-between gap-4 border-r border-border bg-gray-100 p-4 sm:w-1/2'>
            <MarkdownRenderer content={content} parsedFrontMatter={parsedFrontMatter} />
        </section>
    );
};

export default ContentPreview;
