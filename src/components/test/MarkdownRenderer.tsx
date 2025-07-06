import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import rehypeSlug from 'rehype-slug';
import PostPageHeader from '@/components/common/post/PostPageHeader';

interface MarkdownRendererProps {
  parsedFrontMatter: ParsedFrontMatterType;
  content: string;
}

const MarkdownRenderer = ({ parsedFrontMatter, content }: MarkdownRendererProps) => {
  return (
    <div className='prose prose-lg prose-zinc mx-auto max-w-3xl px-4 py-10 dark:prose-invert'>
      <PostPageHeader
        title={parsedFrontMatter.title}
        date={parsedFrontMatter.date}
        tags={parsedFrontMatter.tags}
        category={parsedFrontMatter.category}
      />
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
        components={{
          h1: props => (
            <h1
              className='mb-6 border-b border-border pb-2 font-title text-4xl font-bold text-foreground'
              {...props}
            />
          ),
          h2: props => (
            <h2
              className='mt-8 border-b border-border pb-1 font-title text-3xl font-semibold text-foreground'
              {...props}
            />
          ),
          h3: props => (
            <h3 className='mt-6 font-title text-2xl font-semibold text-foreground' {...props} />
          ),
          p: props => <p className='my-4 text-base leading-relaxed text-foreground' {...props} />,
          ul: props => (
            <ul className='my-4 ml-5 list-inside list-disc text-foreground' {...props} />
          ),
          ol: props => (
            <ol className='my-4 ml-5 list-inside list-decimal text-foreground' {...props} />
          ),
          blockquote: props => (
            <blockquote
              className='border-accent bg-accentVariant my-4 border-l-4 py-2 pl-4 italic text-foreground'
              {...props}
            />
          ),
          a: props => (
            <a
              className='text-primary hover:underline hover:opacity-80'
              target='_blank'
              rel='noopener noreferrer'
              {...props}
            />
          ),
          code: props => (
            <code className='rounded bg-border px-1 py-0.5 text-sm text-foreground' {...props} />
          ),
          pre: props => (
            <pre
              className='my-4 overflow-x-auto rounded-lg bg-[#f5f5f5] p-4 text-sm text-foreground'
              {...props}
            />
          ),
          img: props => (
            <img
              {...props}
              className='mx-auto my-6 max-w-full rounded-lg shadow-md'
              alt={props.alt ?? 'image'}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
