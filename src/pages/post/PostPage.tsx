import MarkdownRenderer from '@/components/common/MarkdownRenderer';
import ArrowUpButton from '@/components/common/post/ArrowUpButton';
import EditButton from '@/components/common/post/EditButton';
import RelatedPostsByCategory from '@/components/common/post/RelatedPostsByCategory';
import ShareButton from '@/components/common/post/ShareButton';
import TableOfContentsBar from '@/components/common/post/TableOfContentsBar';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UtterancesComments from '@/components/common/post/UtterancesComments';
import { buildTocTree } from '@/utils/post';
import { posts } from '@/utils';
import CategoryListSideBar from '@/components/common/post/CategoryListSideBar';

const PostPage = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1150);
    const [tableOfContentsTree, setTableOfContentsTree] = useState<TableOfContentsItemType[]>([]);
    const { slug } = useParams();

    const isLocalhost = window.location.hostname === 'localhost';

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
                <aside className='fixed left-8 top-1/2 z-50 flex translate-y-1/2 transform flex-col gap-2 rounded-full bg-backgroundDark shadow-md'>
                    <div className='group flex size-14 items-center justify-center rounded-full border border-border bg-background-second backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-background hover:shadow-lg'>
                        <ShareButton />
                    </div>
                    {isLocalhost && (
                        <div className='group flex size-14 items-center justify-center rounded-full border border-border bg-background-second backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-background hover:shadow-lg'>
                            <EditButton slug={slug ?? ''} />
                        </div>
                    )}
                </aside>
            ) : (
                <aside className='fixed bottom-40 left-4 z-50 flex flex-col gap-2 rounded-full bg-backgroundDark opacity-60 shadow-md'>
                    <div className='group flex size-10 items-center justify-center rounded-full border border-border bg-background-second backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-background hover:shadow-lg'>
                        <ShareButton />
                    </div>
                    {isLocalhost && (
                        <div className='group flex size-10 items-center justify-center rounded-full border border-border bg-background-second backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-background hover:shadow-lg'>
                            <EditButton slug={slug ?? ''} />
                        </div>
                    )}
                </aside>
            )}

            <UtterancesComments />
            <CategoryListSideBar />
            <ArrowUpButton />
            <TableOfContentsBar tableOfContentsTree={tableOfContentsTree} />
            <RelatedPostsByCategory currentSlug={slug ?? ''} category={post!.category} />
        </main>
    );
};

export default PostPage;
