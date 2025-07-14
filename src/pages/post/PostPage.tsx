import ArrowUpButton from '@/components/common/post/ArrowUpButton';
import EditButton from '@/components/common/post/EditButton';
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
                <aside className='bg-backgroundDark fixed left-8 top-1/2 z-50 flex translate-y-1/2 transform flex-col gap-2 rounded-full shadow-md'>
                    <div className='group flex size-14 items-center justify-center rounded-full border border-border bg-white/70 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-lg'>
                        <ShareButton />
                    </div>
                    <div className='group flex size-14 items-center justify-center rounded-full border border-border bg-white/70 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-lg'>
                        <EditButton slug={slug ?? ''} />
                    </div>
                </aside>
            ) : (
                <aside className='bg-backgroundDark fixed bottom-40 left-4 z-50 flex flex-col gap-2 rounded-full opacity-60 shadow-md'>
                    <div className='group flex size-10 items-center justify-center rounded-full border border-border bg-white/70 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-lg'>
                        <ShareButton />
                    </div>
                    <div className='group flex size-10 items-center justify-center rounded-full border border-border bg-white/70 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-lg'>
                        <EditButton slug={slug ?? ''} />
                    </div>
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
