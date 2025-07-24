import MarkdownRenderer from '@/components/common/MarkdownRenderer';
import { usePostWriteStore } from '@/store/usePostWriteStore';

interface ContentPreviewProps {
    mode: 'write' | 'edit';
}

const ContentPreview = ({ mode }: ContentPreviewProps) => {
    const { category, content, date, tags, title } = usePostWriteStore();

    const parsedFrontMatter: ParsedFrontMatterType = {
        title: title,
        date: date,
        tags: tags,
        category: category,
    };

    return (
        <section className='bg-background-second flex w-full flex-1 flex-col justify-between gap-4 border-r border-border p-4 sm:w-1/2'>
            <MarkdownRenderer
                content={
                    mode === 'edit' ? content.replace(/^---\n[\s\S]*?\n---/, '').trim() : content
                }
                parsedFrontMatter={parsedFrontMatter}
            />
        </section>
    );
};

export default ContentPreview;
