/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github-dark.css';
import PostPageHeader from '@/components/common/post/PostPageHeader';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { extractTextFromReactChildren } from '@/utils/extractStringInCodeBlock';

interface MarkdownRendererProps {
    parsedFrontMatter: ParsedFrontMatterType;
    content: string;
}

const MarkdownRenderer = ({ parsedFrontMatter, content }: MarkdownRendererProps) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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
                            className='relative mb-8 mt-12 whitespace-pre-wrap break-words text-5xl font-extrabold tracking-tight text-foreground transition-all duration-200 ease-in-out after:absolute after:bottom-[-8px] after:left-0 after:h-1 after:w-16 after:bg-gradient-to-r after:from-primary after:to-highlight hover:tracking-wider'
                            {...props}
                        />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2
                            className='mb-6 mt-10 whitespace-pre-wrap break-words border-l-4 border-primary pl-4 text-3xl font-bold text-foreground transition-transform duration-200 ease-in-out hover:relative hover:translate-x-10 hover:scale-110 active:relative active:translate-x-10 active:scale-110'
                            {...props}
                        />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3
                            className='mb-3 mt-8 whitespace-pre-wrap break-words text-2xl font-semibold text-foreground transition-transform duration-200 ease-in-out hover:relative hover:translate-x-10 hover:scale-110 active:relative active:translate-x-10 active:scale-110'
                            {...props}
                        />
                    ),
                    h4: ({ node, ...props }) => (
                        <h4
                            className='mb-2 mt-6 whitespace-pre-wrap break-words text-xl font-medium text-foreground transition-transform duration-200 ease-in-out hover:relative hover:translate-x-10 hover:scale-110 active:relative active:translate-x-10 active:scale-110'
                            {...props}
                        />
                    ),
                    p: ({ node, ...props }) => (
                        <p
                            className='mb-5 whitespace-pre-wrap break-words text-[1.05rem] leading-8 tracking-wide text-foreground transition-transform duration-200 ease-in-out hover:relative hover:translate-x-10 hover:scale-110 active:relative active:translate-x-10 active:scale-110'
                            {...props}
                        />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul
                            className='my-5 ml-6 list-disc space-y-2 text-foreground transition-transform duration-200 ease-in-out marker:text-primary hover:relative hover:translate-x-10 hover:scale-110 active:relative active:translate-x-10 active:scale-110'
                            {...props}
                        />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol
                            className='my-5 ml-6 list-decimal space-y-2 text-foreground transition-transform duration-200 ease-in-out marker:text-primary hover:relative hover:translate-x-10 hover:scale-110 active:relative active:translate-x-10 active:scale-110'
                            {...props}
                        />
                    ),
                    li: ({ node, ...props }) => (
                        <li className='whitespace-pre-wrap break-words' {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote
                            className='bg-primary-light relative my-8 whitespace-pre-wrap break-words rounded-md border-l-4 border-primary p-4 pl-6 text-[1rem] italic text-muted transition-transform duration-200 hover:scale-[1.01] active:scale-[1.01]'
                            {...props}
                        />
                    ),
                    a: ({ node, ...props }) => (
                        <a
                            className='text-primary underline decoration-dotted underline-offset-4 transition-all duration-200 hover:text-primary hover:decoration-solid active:text-primary active:decoration-solid'
                            target='_blank'
                            rel='noopener noreferrer'
                            {...props}
                        />
                    ),
                    pre: ({ node, ...props }) => (
                        <pre
                            className='text-main my-6 overflow-x-auto rounded-md border border-border bg-black p-5 text-sm shadow-inner'
                            {...props}
                        />
                    ),
                    code: ({ node, className, children, ...props }) => {
                        const isInline = !className;
                        const codeText = extractTextFromReactChildren(children).trim();

                        if (isInline) {
                            return (
                                <code
                                    className='rounded-md bg-muted/10 px-1.5 py-0.5 text-sm text-primary'
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        }

                        const index = node?.position?.start?.offset ?? Math.random();

                        const handleCopy = () => {
                            navigator.clipboard.writeText(codeText).then(() => {
                                setCopiedIndex(index);
                                setTimeout(() => setCopiedIndex(null), 1500);
                            });
                        };

                        return (
                            <div className='group relative my-4'>
                                <button
                                    onClick={handleCopy}
                                    className='absolute right-2 top-2 hidden items-center gap-1 rounded bg-background px-2 py-1 text-xs text-muted shadow hover:text-foreground group-hover:flex'
                                >
                                    {copiedIndex === index ? (
                                        <>
                                            <Check size={14} />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={14} />
                                            Copy
                                        </>
                                    )}
                                </button>

                                <code
                                    className={`${className} block overflow-x-auto rounded-md p-4`}
                                    {...props}
                                >
                                    {children}
                                </code>
                            </div>
                        );
                    },
                    img: ({ node, ...props }) => (
                        <img
                            {...props}
                            className='mx-auto my-10 max-w-[90%] rounded-xl shadow-lg transition-transform duration-200 hover:scale-105 active:scale-105'
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
