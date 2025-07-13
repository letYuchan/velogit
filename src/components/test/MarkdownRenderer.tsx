/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github-dark.css'; // 블랙 계열로 변경

import PostPageHeader from '@/components/common/post/PostPageHeader';

interface MarkdownRendererProps {
    parsedFrontMatter: ParsedFrontMatterType;
    content: string;
}

const MarkdownRenderer = ({ parsedFrontMatter, content }: MarkdownRendererProps) => {
    return (
        <article className='prose prose-zinc mx-auto max-w-3xl px-6 py-12 dark:prose-invert'>
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
                            className='mb-4 mt-8 font-title text-4xl font-bold text-foreground'
                            {...props}
                        />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2
                            className='mb-3 mt-6 font-title text-3xl font-semibold text-foreground'
                            {...props}
                        />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3
                            className='mb-2 mt-5 font-title text-2xl font-semibold text-foreground'
                            {...props}
                        />
                    ),
                    h4: ({ node, ...props }) => (
                        <h4
                            className='mb-1 mt-4 font-title text-xl font-medium text-foreground'
                            {...props}
                        />
                    ),
                    p: ({ node, ...props }) => {
                        const lineCount = String(props.children).split(/\n/g).length;

                        return (
                            <p
                                className={`whitespace-pre-wrap text-base leading-[1.75] text-foreground ${
                                    lineCount > 1 ? 'mb-4' : 'mb-1'
                                }`}
                                {...props}
                            />
                        );
                    },
                    ul: ({ node, ...props }) => (
                        <ul className='my-4 ml-6 list-disc space-y-1 text-foreground' {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol
                            className='my-4 ml-6 list-decimal space-y-1 text-foreground'
                            {...props}
                        />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote
                            className='my-6 border-l-4 border-primary bg-muted/40 py-2 pl-4 italic text-muted'
                            {...props}
                        />
                    ),
                    a: ({ node, ...props }) => (
                        <a
                            className='text-primary underline transition hover:opacity-80'
                            target='_blank'
                            rel='noopener noreferrer'
                            {...props}
                        />
                    ),
                    code: ({ node, ...props }) => <code {...props} />,
                    pre: ({ node, ...props }) => (
                        <pre
                            className='my-6 overflow-x-auto rounded-md bg-black p-4 text-sm text-white shadow'
                            {...props}
                        />
                    ),
                    img: ({ node, ...props }) => (
                        <img
                            {...props}
                            className='mx-auto my-8 max-w-full rounded-md shadow-md'
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
