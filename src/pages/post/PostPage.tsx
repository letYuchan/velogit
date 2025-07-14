import ArrowUpButton from '@/components/common/post/ArrowUpButton';
import RelatedPostsByCategory from '@/components/common/post/RelatedPostsByCategory';
import ShareButton from '@/components/common/post/ShareButton';
import TableOfContentsBar from '@/components/common/post/TableOfContentsBar';
import MarkdownRenderer from '@/components/test/MarkdownRenderer';
import { posts } from '@/utils/postList';
import { buildTocTree } from '@/utils/tocTree';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostPage = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1150);
    const [tableOfContentsTree, setTableOfContentsTree] = useState<TableOfContentsItemType[]>([]);
    const { slug } = useParams();

    const post = posts.find(p => p.slug === slug);

    const parsedFrontMatter: ParsedFrontMatterType = {
        title: post!.title,
        date: post!.date,
        tags: post!.tags,
        category: post!.category,
    };

    const mainContent = post!.content.replace(/^---\n[\s\S]*?\n---/, '').trim();

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 1150);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const tocElements = Array.from(document.querySelectorAll('h1, h2'));
            const mappedTocElements: TableOfContentsItemType[] = tocElements
                .filter(
                    element =>
                        (element.tagName === 'H1' || element.tagName === 'H2') &&
                        element.id &&
                        element.id !== 'headerTag',
                )
                .map(element => ({
                    id: element.id ?? '',
                    text: element.textContent ?? '',
                    level: element.tagName === 'H1' ? 1 : 2,
                }));
            const tocTree = buildTocTree(mappedTocElements);
            setTableOfContentsTree(tocTree);
        }, 0);

        return () => clearTimeout(timeout);
    }, [mainContent]);

    return (
        <main className='flex w-full flex-col items-center justify-start'>
            <MarkdownRenderer parsedFrontMatter={parsedFrontMatter} content={mainContent} />
            {isDesktop ? (
                <aside className='fixed left-8 top-1/2 z-50 translate-y-1/2 transform'>
                    <div className='group flex size-14 items-center justify-center rounded-full border border-border bg-white/70 shadow-md backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-lg'>
                        <ShareButton />
                    </div>
                </aside>
            ) : (
                <aside className='flex w-[80%] flex-nowrap items-center justify-center gap-2 border-t border-border py-2'>
                    <p className='text-3xl text-muted'>Share this post</p>
                    <ShareButton />
                </aside>
            )}
            {/* ArrowUP button */}
            <ArrowUpButton />
            {/* sideBar */}
            <TableOfContentsBar tableOfContentsTree={tableOfContentsTree} />
            {/* RelatedPostList */}
            <RelatedPostsByCategory currentSlug={slug ?? ''} category={post!.category} />
        </main>
    );
};

export default PostPage;
