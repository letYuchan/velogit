/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github-dark.css';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { useParams } from 'react-router-dom';

import { extractTextFromReactChildren, generateHeadingId } from '@/utils/post';
import PostPageHeader from '@/components/post/PostPageHeader';

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
            'div',
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
            div: ['className', 'style'],
            '*': ['className', 'data-language', 'style'],
        },
    };

    return (
        <article className='mx-auto mb-6 w-full max-w-3xl border-b-2 border-b-primary px-4 py-4'>
            {/* Post Header(Content summary) */}
            <PostPageHeader
                title={parsedFrontMatter.title}
                date={parsedFrontMatter.date}
                tags={parsedFrontMatter.tags}
                category={parsedFrontMatter.category}
            />
            {/* contents */}
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[
                    rehypeHighlight,
                    rehypeSlug,
                    rehypeRaw,
                    [rehypeSanitize, customSchema],
                ]}
                // 마크다운 렌더링시 html 요소 스타일링 지정
                components={{
                    h1: ({ node, ...props }) => (
                        <h1
                            id={generateHeadingId(props.children)}
                            className='relative mb-8 mt-12 whitespace-pre-wrap break-words text-4xl font-extrabold tracking-tight text-foreground transition-all duration-200 ease-in-out after:absolute after:bottom-[-8px] after:left-0 after:h-1 after:w-16 after:bg-gradient-to-r after:from-primary after:to-highlight hover:tracking-wider active:tracking-wider'
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
                    hr: ({ node, ...props }) => (
                        <hr className='my-8 border-t-2 border-dashed border-border' {...props} />
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
                    li: ({ node, ...props }) => <li className='break-words' {...props} />,
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
                    table: ({ node, ...props }) => (
                        <table
                            className='my-6 w-full table-auto border-collapse overflow-hidden rounded-md border border-border text-sm shadow-sm'
                            {...props}
                        />
                    ),
                    thead: ({ node, ...props }) => (
                        <thead className='bg-primary-deep font-bold text-main' {...props} />
                    ),
                    tbody: ({ node, ...props }) => <tbody className='bg-background' {...props} />,
                    tr: ({ node, ...props }) => (
                        <tr
                            className='transition-colors duration-150 even:bg-muted/20 hover:bg-muted/30'
                            {...props}
                        />
                    ),
                    td: ({ node, ...props }) => (
                        <td
                            className='whitespace-pre-wrap break-words break-all border border-border px-4 py-2 text-foreground'
                            {...props}
                        />
                    ),
                    th: ({ node, ...props }) => (
                        <th
                            className='whitespace-pre-wrap break-words break-all border border-border px-4 py-2 text-center font-semibold text-main'
                            {...props}
                        />
                    ),
                }}
                children={content}
            />
            {/* React에서 페이지 로드 후 특정 요소로 부드럽게 스크롤 이동시키는 스크립트 */}
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

/**
 * MarkdownRenderer
 * --------------------------
 * 기능:
 * - FrontMatter(제목/날짜/태그/카테고리) 헤더 표시
 * - 마크다운(content)을 React 컴포넌트로 렌더링
 * - 코드 하이라이트/표/체크박스/줄바꿈 등 GFM 지원
 * - HTML(이미지/비디오 등) 허용 + sanitize(보안) 적용
 * - 코드 블록 복사 버튼 제공
 * - URL 해시(#...)가 있을 때 대상 헤딩으로 부드럽게 스크롤
 *
 * 주요 상태(state):
 * - copiedIndex: number | null → 코드 블록 복사 상태 관리(복사됨 표시)
 *
 * 주요 로직:
 * - remark 플러그인:
 *   - remarkGfm: GitHub Flavored Markdown(테이블/체크박스 등) 지원
 *   - remarkBreaks: 마크다운 내 개행을 <br>로 처리
 * - rehype 플러그인:
 *   - rehypeHighlight: 코드 하이라이트
 *   - rehypeSlug: 헤딩에 id 자동 부여
 *   - rehypeRaw: HTML 문자열을 실제 요소로 파싱(※ sanitize 필수)
 *   - rehypeSanitize(customSchema): 허용 태그/속성 화이트리스트로 보안 강화
 * - customSchema:
 *   - defaultSchema를 확장하여 video/source/mark/kbd/br/code/pre/img/div 등 허용
 *   - 각 태그별 허용 속성(src/controls/className/style 등)과 '*' 공통 속성(className/data-language/style) 지정
 * - 컴포넌트 오버라이드(components):
 *   - h1~h4, p, ul/ol/li, blockquote, table 계열 등 Tailwind 기반 스타일링
 *   - a: 업로드 경로(/velogit/uploads/...)면 fetch → blob → 다운로드 처리
 *   - code:
 *     - 인라인/블록 코드 구분
 *     - 블록 코드에 복사 버튼 제공(클립보드로 내용 복사, 1.5초간 "Copied!" 표시)
 *   - img/video/details/summary/kbd/mark 등 추가 요소 스타일링
 * - 스크롤 이동:
 *   - 스크립트 주입으로 로드 후 300ms 뒤 location.hash의 id로 scrollIntoView({ behavior: 'smooth' })
 *
 * UI 요소:
 * - 상단: PostPageHeader (title/date/tags/category)
 * - 본문: ReactMarkdown 렌더링 영역
 * - 코드 블록: 우상단 Copy 버튼(hover 시 표시), 복사 피드백
 *
 * 보안/접근성:
 * - rehypeRaw 사용 시 rehypeSanitize 필수로 적용하여 XSS 방지
 * - 링크는 외부로 열 때 target="_blank" + rel="noopener noreferrer" 설정
 * - 이미지/비디오에 alt/controls 등 적절한 속성 부여
 *
 * 확장 포인트:
 * - customSchema에 허용 태그/속성 추가 가능
 * - components에서 요소별 커스텀 렌더러 확장 가능
 * - 코드 복사 UI/문구/지속시간 조정 가능
 */
