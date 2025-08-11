import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { HiChevronDown, HiSortAscending, HiSortDescending } from 'react-icons/hi';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { posts } from '@/utils';
import { categories, categoryCountMap } from '@/utils/home';
import BlogHeader from '@/components/home/BlogHeader';
import PostCard from '@/components/home/PostCard';

const HomePage = () => {
    const { reset } = usePostWriteStore();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTag, setSelectedTag] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const viewportWidth = window.innerWidth;

    const postsPerPage = viewportWidth <= 640 ? 5 : 9;

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
        return matchesCategory && matchesTag;
    });

    const uniqueTags = Array.from(new Set(posts.flatMap(post => post.tags ?? [])));

    useEffect(() => {
        reset();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    const handleSelectedCategory = (category: string) => setSelectedCategory(category);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const sortedPosts = [...filteredPosts].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const currentPosts = sortedPosts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    return (
        <main
            aria-label='Velogit blog homepage with category and post list'
            className='flex w-full flex-col items-center justify-start gap-5'
        >
            <BlogHeader />
            {/* Tob bar */}
            <div className='mt-4 flex w-full flex-nowrap justify-between px-4 sm:px-10 xl:px-36 2xl:px-64'>
                <div className='flex flex-col flex-nowrap justify-start gap-2'>
                    {/* category section */}
                    <section
                        aria-label='categories section'
                        className='flex flex-wrap items-center justify-start gap-2'
                    >
                        {/* all button */}
                        <button
                            onClick={() => handleSelectedCategory('all')}
                            className={clsx(
                                'rounded-full border px-3 py-1 font-title text-lg font-bold transition-transform ease-in-out hover:scale-110 active:scale-110 sm:text-xl',
                                selectedCategory === 'all'
                                    ? 'border-primary bg-primary text-main'
                                    : 'border-border bg-background text-foreground hover:bg-primary-light active:bg-primary-light',
                            )}
                        >
                            ALL {posts.length}
                        </button>
                        {/* other category button */}
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => handleSelectedCategory(category)}
                                className={clsx(
                                    'rounded-full border bg-background px-3 py-1 font-title text-lg font-bold transition-transform ease-in-out hover:scale-110 active:scale-110 sm:text-xl',
                                    selectedCategory === category
                                        ? 'border-primary bg-primary text-main'
                                        : 'border-border bg-background text-foreground hover:bg-primary-light active:bg-primary-light',
                                )}
                            >
                                {category.toUpperCase()} {categoryCountMap[category] ?? 0}
                            </button>
                        ))}
                    </section>
                    {/* searcher by tags */}
                    <section className='relative inline-block w-48'>
                        <select
                            value={selectedTag}
                            onChange={e => setSelectedTag(e.target.value)}
                            className='w-full appearance-none rounded-md border border-border bg-background px-4 py-2 pr-10 text-base text-foreground transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary'
                        >
                            <option
                                value='all'
                                className='line-clamp-1 whitespace-pre-wrap break-words'
                            >
                                🌐 All Tags
                            </option>
                            {uniqueTags.map(tag => (
                                <option
                                    className='line-clamp-1 whitespace-pre-wrap break-words'
                                    key={tag}
                                    value={tag}
                                >
                                    🏷️ #{tag || 'No Tag'}
                                </option>
                            ))}
                        </select>
                        <div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted'>
                            <HiChevronDown className='h-5 w-5' />
                        </div>
                    </section>
                </div>

                {/* sort section */}
                <section aria-label='sort section' className='flexjustify-start'>
                    <button
                        onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                        className='text-sm text-primary hover:opacity-70 active:opacity-70'
                    >
                        {sortOrder === 'asc' ? (
                            <HiSortAscending className='size-10' />
                        ) : (
                            <HiSortDescending className='size-10' />
                        )}
                    </button>
                </section>
            </div>
            {/* posts section */}
            <section aria-label='post list section' className='w-full'>
                <ul
                    className='grid w-full grid-cols-1 gap-6 px-4 py-4 sm:grid-cols-2 sm:px-10 xl:grid-cols-3 xl:px-36 2xl:grid-cols-5 2xl:px-64'
                    style={{ gridAutoRows: '1fr' }}
                >
                    {currentPosts.map(post => (
                        <li key={post.slug}>
                            <PostCard post={post} />
                        </li>
                    ))}
                </ul>
            </section>
            {/* pagenation */}
            {totalPages > 1 && (
                <div className='mb-6 mt-6 flex justify-center gap-3 text-sm text-muted'>
                    <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className='flex h-full flex-nowrap items-center gap-1 rounded-full border border-primary bg-primary px-3 py-1 text-lg font-semibold text-main transition-all duration-150 ease-in-out hover:bg-primary-deep active:bg-primary-deep disabled:opacity-50 disabled:hover:bg-primary sm:text-xl'
                    >
                        ⬅ Prev
                    </button>
                    <span className='text-foreground'>
                        Page {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => (p + 1 <= totalPages ? p + 1 : p))}
                        disabled={currentPage === totalPages}
                        className='flex h-full flex-nowrap items-center gap-1 rounded-full border border-primary bg-primary px-3 py-1 text-lg font-semibold text-main transition-all duration-150 ease-in-out hover:bg-primary-deep active:bg-primary-deep disabled:opacity-50 disabled:hover:bg-primary sm:text-xl'
                    >
                        Next ➡
                    </button>
                </div>
            )}
        </main>
    );
};

export default HomePage;
