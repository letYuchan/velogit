import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { posts } from '@/utils';

interface RelatedPostsByCategoryProps {
    currentSlug: string;
    category: string;
}

const RelatedPostsByCategory = ({ currentSlug, category }: RelatedPostsByCategoryProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const sortedRelatedPosts = posts
        .filter(post => post.category === category && post.slug !== currentSlug)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const postsPerPage = 5;
    const totalPages = Math.ceil(sortedRelatedPosts.length / postsPerPage);
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = sortedRelatedPosts.slice(indexOfFirst, indexOfLast);

    return (
        <section className='my-5 w-full max-w-3xl p-4'>
            {/* header */}
            <div
                className='mb-4 flex cursor-pointer items-center justify-between border-t border-t-primary py-4'
                onClick={() => setIsOpen(prev => !prev)}
            >
                <h2 className='text-xl font-bold text-foreground sm:text-2xl'>
                    More posts in
                    <span className='relative left-2 rounded-full bg-primary px-3 py-1 font-title font-bold text-main'>
                        {category}
                    </span>
                </h2>
                {isOpen ? (
                    <MdExpandLess className='text-2xl text-foreground sm:text-3xl' />
                ) : (
                    <MdExpandMore className='text-2xl text-foreground sm:text-3xl' />
                )}
            </div>

            {/* List */}
            {isOpen && (
                <>
                    {currentPosts.length > 0 ? (
                        <ul className='space-y-2'>
                            {currentPosts.map(post => (
                                <li
                                    key={post.slug}
                                    className='group flex items-center justify-between border-b border-border pb-2'
                                >
                                    <div className='flex items-center gap-2'>
                                        <span className='mt-0.5 text-primary transition group-hover:translate-x-1 group-active:translate-x-1'>
                                            →
                                        </span>
                                        <Link
                                            to={`/post/${post.slug}`}
                                            className='text-base font-semibold text-foreground transition group-hover:text-primary group-active:text-primary'
                                        >
                                            {post.title}
                                        </Link>
                                    </div>
                                    <span className='whitespace-nowrap text-sm text-muted'>
                                        {post.date}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='mt-2 text-sm text-muted'>
                            No other posts in this category yet.
                        </p>
                    )}

                    {/* Pagination */}
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
                                onClick={() =>
                                    setCurrentPage(p => (p + 1 <= totalPages ? p + 1 : p))
                                }
                                disabled={currentPage === totalPages}
                                className='flex h-full flex-nowrap items-center gap-1 rounded-full border border-primary bg-primary px-3 py-1 text-lg font-semibold text-main transition-all duration-150 ease-in-out hover:bg-primary-deep active:bg-primary-deep disabled:opacity-50 disabled:hover:bg-primary sm:text-xl'
                            >
                                Next ➡
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default RelatedPostsByCategory;
