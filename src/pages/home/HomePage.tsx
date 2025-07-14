import { posts } from '@/utils/postList';
import BlogHeader from '@/components/common/home/BlogHeader';
import PostCard from '@/components/common/home/PostCard';
import { useEffect, useState } from 'react';
import { categories } from '@/utils/categories';
import clsx from 'clsx';
import { categoryCountMap } from '@/utils/categoryCount';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';

const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const viewportWidth = window.innerWidth;

    const postsPerPage = viewportWidth <= 640 ? 5 : 8;

    const filteredPosts =
        selectedCategory === 'all'
            ? posts
            : posts.filter(post => post.category === selectedCategory);

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
                {/* category section */}
                <section
                    aria-label='categories section'
                    className='flex flex-wrap items-center justify-start gap-2'
                >
                    {/* all button */}
                    <button
                        onClick={() => handleSelectedCategory('all')}
                        className={clsx(
                            'rounded-full border px-3 py-1 font-title text-lg font-bold transition-transform ease-in-out hover:scale-110 sm:text-xl',
                            selectedCategory === 'all'
                                ? 'border-primary bg-primary text-white'
                                : 'border-border bg-background text-foreground hover:bg-primary-bg',
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
                                'rounded-full border bg-background px-3 py-1 font-title text-lg font-bold transition-transform ease-in-out hover:scale-110 sm:text-xl',
                                selectedCategory === category
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-border bg-background text-foreground hover:bg-primary-bg',
                            )}
                        >
                            {category.toUpperCase()} {categoryCountMap[category] ?? 0}
                        </button>
                    ))}
                </section>
                {/* sort section */}
                <section aria-label='sort section' className='flex items-center justify-center'>
                    <button
                        onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                        className='text-sm text-primary underline hover:opacity-70'
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
            <nav aria-label='post pagination' className='mb-4'>
                <ul className='mt-6 flex justify-center gap-2 pb-4'>
                    {Array.from({ length: totalPages }, (_, idx) => (
                        <li key={idx}>
                            <button
                                onClick={() => setCurrentPage(idx + 1)}
                                className={clsx(
                                    'rounded-md border px-3 py-1 transition-colors',
                                    currentPage === idx + 1
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-border bg-background text-foreground hover:bg-primary-bg',
                                )}
                            >
                                {idx + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </main>
    );
};

export default HomePage;
