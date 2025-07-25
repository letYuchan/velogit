// src/components/post/RelatedPostsByCategory.tsx

import { useState } from 'react';
import { posts } from '@/utils/postList';
import { Link } from 'react-router-dom';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import clsx from 'clsx';

interface RelatedPostsByCategoryProps {
    currentSlug: string;
    category: string;
}

const RelatedPostsByCategory = ({ currentSlug, category }: RelatedPostsByCategoryProps) => {
    const sortedRelatedPosts = posts
        .filter(post => post.category === category && post.slug !== currentSlug)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const postsPerPage = 5;
    const totalPages = Math.ceil(sortedRelatedPosts.length / postsPerPage);

    const [isOpen, setIsOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = sortedRelatedPosts.slice(indexOfFirst, indexOfLast);

    return (
        <section className='my-20 w-full max-w-3xl p-4'>
            {/* header */}
            <div
                className='mb-4 flex cursor-pointer items-center justify-between border-t border-t-primary py-4'
                onClick={() => setIsOpen(prev => !prev)}
            >
                <h2 className='text-xl font-bold text-foreground sm:text-2xl'>
                    More posts in
                    <span className='text-main relative left-2 rounded-full bg-primary px-3 py-1 font-title font-bold'>
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
                        <nav aria-label='related post pagination' className='mt-6'>
                            <ul className='flex justify-center gap-2'>
                                {Array.from({ length: totalPages }, (_, idx) => (
                                    <li key={idx}>
                                        <button
                                            onClick={() => setCurrentPage(idx + 1)}
                                            className={clsx(
                                                'rounded-md border px-3 py-1 transition-colors',
                                                currentPage === idx + 1
                                                    ? 'text-main border-primary bg-primary'
                                                    : 'hover:bg-primary-light active:bg-primary-light border-border bg-background text-foreground',
                                            )}
                                        >
                                            {idx + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </>
            )}
        </section>
    );
};

export default RelatedPostsByCategory;
