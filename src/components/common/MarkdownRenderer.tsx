/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github-dark.css';
import PostPageHeader from '@/components/common/post/PostPageHeader';
import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { useParams } from 'react-router-dom';

import { extractTextFromReactChildren, generateHeadingId } from '@/utils/post';

interface MarkdownRendererProps {
    parsedFrontMatter: ParsedFrontMatterType;
    content: string;
}

const MarkdownRenderer = ({ parsedFrontMatter, content }: MarkdownRendererProps) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const { slug } = useParams();

    const customSchema = {
        ...defaultSchema,
        tagNames: [
            ...(defaultSchema.tagNames ?? []),
            'video',
            'source',
            'mark',
            'kbd',
            'br',
            'code',
            'pre',
            'img',
        ],
        attributes: {
            ...defaultSchema.attributes,
            video: ['src', 'controls', 'width', 'height', 'poster'],
            source: ['src', 'type'],
            mark: [],
            kbd: [],
            br: [],
            pre: ['className'],
            code: ['className'],
            img: ['src', 'alt', 'width', 'height'],
            '*': ['className', 'data-language'],
        },
    };

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
                rehypePlugins={[
                    rehypeHighlight,
                    rehypeSlug,
                    rehypeRaw,
                    [rehypeSanitize, customSchema],
                ]}
                components={{
                    h1: ({ node, ...props }) => (
                        <h1
                            id={generateHeadingId(props.children)}
                            className='relative mb-8 mt-12 whitespace-pre-wrap break-words text-4xl font-extrabold tracking-tight text-foreground transition-all duration-200 ease-in-out after:absolute after:bottom-[-8px] after:left-0 after:h-1 after:w-16 after:bg-gradient-to-r after:from-primary after:to-highlight hover:tracking-wider'
                            {...props}
                        />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2
                            id={generateHeadingId(props.children)}
                            className='mb-6 mt-10 whitespace-pre-wrap break-words border-l-4 border-primary pl-4 text-3xl font-bold text-foreground'
                            {...props}
                        />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3
                            className='mb-3 mt-8 whitespace-pre-wrap break-words text-2xl font-semibold text-foreground'
                            {...props}
                        />
                    ),
                    h4: ({ node, ...props }) => (
                        <h4
                            className='mb-2 mt-6 whitespace-pre-wrap break-words text-xl font-medium text-foreground'
                            {...props}
                        />
                    ),
                    p: ({ node, ...props }) => (
                        <p
                            className='mb-4 whitespace-pre-wrap break-words text-[1.05rem] leading-[1.4] text-foreground'
                            {...props}
                        />
                    ),
                    br: () => <br style={{ display: 'none' }} />,
                    ul: ({ node, ...props }) => (
                        <ul className='my-5 ml-6 list-disc space-y-2 text-foreground' {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol
                            className='my-5 ml-6 list-decimal space-y-2 text-foreground'
                            {...props}
                        />
                    ),
                    li: ({ node, ...props }) => (
                        <li className='whitespace-pre-wrap break-words' {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote
                            className='relative my-8 whitespace-pre-wrap break-words rounded-md border-l-4 border-primary bg-background p-4 pl-6 text-[1rem] italic text-foreground'
                            {...props}
                        />
                    ),
                    a: ({ node, ...props }) => {
                        const href = props.href ?? '';
                        const isUploadFile = href.startsWith('/velogit/uploads/');

                        const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                            if (!isUploadFile) return;

                            e.preventDefault();

                            fetch(href)
                                .then(res => res.blob())
                                .then(blob => {
                                    const url = window.URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = decodeURIComponent(
                                        href.split('/').pop() ?? 'download',
                                    );
                                    document.body.appendChild(a);
                                    a.click();
                                    a.remove();
                                    window.URL.revokeObjectURL(url);
                                })
                                .catch(err => {
                                    alert('다운로드 실패!');
                                    console.error(err);
                                });
                        };

                        return (
                            <a
                                {...props}
                                onClick={handleClick}
                                className='cursor-pointer text-primary underline decoration-dotted underline-offset-4 transition-all duration-200 hover:text-primary hover:decoration-solid active:text-primary active:decoration-solid'
                                target={isUploadFile ? '_self' : '_blank'}
                                rel='noopener noreferrer'
                            />
                        );
                    },
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
                            className='mx-auto my-8 max-w-full rounded-md shadow-md transition-transform duration-200 ease-in-out hover:scale-105 active:scale-105'
                            alt={props.alt ?? 'image'}
                        />
                    ),
                    video: ({ node, ...props }) => (
                        <video
                            {...props}
                            controls
                            className='mx-auto my-8 max-w-[720px] rounded-md shadow-md ring-1 ring-border'
                        />
                    ),
                    details: ({ node, ...props }) => (
                        <details
                            className='group my-6 rounded-md border border-border bg-background px-5 py-4 text-foreground shadow-sm transition-all duration-200 ease-in-out open:shadow-md'
                            {...props}
                        />
                    ),
                    summary: ({ node, ...props }) => (
                        <summary
                            className='mb-2 cursor-pointer select-none text-lg font-semibold text-primary transition-colors group-open:text-primary-deep'
                            {...props}
                        />
                    ),
                    kbd: ({ node, ...props }) => (
                        <kbd
                            className='rounded-md border border-border bg-muted/10 px-2 py-0.5 font-mono text-sm text-muted shadow-sm'
                            {...props}
                        />
                    ),
                    mark: ({ node, ...props }) => (
                        <mark
                            className='rounded bg-highlight px-1.5 py-0.5 font-semibold text-[#333333] shadow-inner'
                            {...props}
                        />
                    ),
                }}
                children={content}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                setTimeout(() => {
                    const id = decodeURIComponent(location.hash.slice(1));
                    const el = document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            `,
                }}
            />
        </article>
    );
};

export default MarkdownRenderer;
