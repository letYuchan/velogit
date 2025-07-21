/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github-dark.css';
import PostPageHeader from '@/components/common/post/PostPageHeader';

interface MarkdownRendererProps {
    parsedFrontMatter: ParsedFrontMatterType;
    content: string;
}

const MarkdownRenderer = ({ parsedFrontMatter, content }: MarkdownRendererProps) => {
    return (
        <article className='mx-auto mb-6 w-full max-w-3xl border-b-2 border-b-primary px-4 py-4'>
            <PostPageHeader
                title={parsedFrontMatter.title}
                date={parsedFrontMatter.date}
                tags={parsedFrontMatter.tags}
                category={parsedFrontMatter.category}
            />

            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeHighlight, rehypeSlug]}
                components={{
                    h1: ({ node, ...props }) => (
                        <h1
                            className='relative mb-8 mt-12 text-5xl font-extrabold tracking-tight text-foreground transition-all duration-300 ease-in-out after:absolute after:bottom-[-8px] after:left-0 after:h-1 after:w-16 after:bg-gradient-to-r after:from-primary after:to-highlight hover:tracking-wider dark:text-white'
                            {...props}
                        />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2
                            className='mb-6 mt-10 border-l-4 border-primary pl-4 text-3xl font-bold text-foreground transition-colors duration-300 dark:text-zinc-100'
                            {...props}
                        />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3
                            className='mb-3 mt-8 text-2xl font-semibold text-foreground transition duration-300 dark:text-zinc-200'
                            {...props}
                        />
                    ),
                    h4: ({ node, ...props }) => (
                        <h4
                            className='mb-2 mt-6 text-xl font-medium text-foreground dark:text-zinc-300'
                            {...props}
                        />
                    ),
                    p: ({ node, ...props }) => (
                        <p
                            className='mb-5 text-[1.05rem] leading-8 tracking-wide text-foreground transition-opacity duration-300 dark:text-zinc-300'
                            {...props}
                        />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul
                            className='my-5 ml-6 list-disc space-y-2 transition-all duration-300 marker:text-primary'
                            {...props}
                        />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol
                            className='my-5 ml-6 list-decimal space-y-2 marker:text-primary'
                            {...props}
                        />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote
                            className='relative my-8 rounded-md border-l-4 border-primary bg-primary-bg p-4 pl-6 text-[1rem] italic text-muted transition-transform duration-300 hover:scale-[1.01] dark:border-blue-400 dark:bg-backgroundDark dark:text-blue-200'
                            {...props}
                        />
                    ),
                    a: ({ node, ...props }) => (
                        <a
                            className='text-primary underline decoration-dotted underline-offset-4 transition-all duration-300 hover:text-primary hover:decoration-solid dark:text-blue-300'
                            target='_blank'
                            rel='noopener noreferrer'
                            {...props}
                        />
                    ),
                    pre: ({ node, ...props }) => (
                        <pre
                            className='my-6 overflow-x-auto rounded-lg bg-zinc-900 p-5 text-sm text-white shadow-inner'
                            {...props}
                        />
                    ),
                    code: ({ className, children, ...props }) => {
                        const isInline = !className;

                        return isInline ? (
                            <code
                                className='rounded bg-muted/10 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-800 dark:text-pink-300'
                                {...props}
                            >
                                {children}
                            </code>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                    img: ({ node, ...props }) => (
                        <img
                            {...props}
                            className='mx-auto my-10 max-w-[90%] rounded-xl shadow-lg transition duration-300 hover:scale-105'
                            alt={props.alt ?? 'image'}
                        />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
};

export default MarkdownRenderer;
