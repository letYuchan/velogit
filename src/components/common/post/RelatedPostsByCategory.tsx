// src/components/post/RelatedPostsByCategory.tsx

import { useState } from 'react';
import { posts } from '@/utils/postList';
import { Link } from 'react-router-dom';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import clsx from 'clsx';

interface Props {
    currentSlug: string;
    category: string;
}

const RelatedPostsByCategory = ({ currentSlug, category }: Props) => {
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
        <section className='my-20 w-full max-w-3xl border-t border-t-primary p-4'>
            {/* Header */}
            <div
                className='mb-4 flex cursor-pointer items-center justify-between'
                onClick={() => setIsOpen(prev => !prev)}
            >
                <h2 className='text-2xl font-bold text-foreground'>
                    More posts in{' '}
                    <span className='rounded-full bg-primary px-3 py-1 font-title font-bold text-white'>
                        {category}
                    </span>
                </h2>
                {isOpen ? (
                    <MdExpandLess className='text-3xl text-foreground' />
                ) : (
                    <MdExpandMore className='text-3xl text-foreground' />
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
                                        <span className='mt-0.5 text-primary transition group-hover:translate-x-1'>
                                            →
                                        </span>
                                        <Link
                                            to={`/post/${post.slug}`}
                                            className='text-base font-semibold text-foreground transition group-hover:text-primary'
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
                    )}
                </>
            )}
        </section>
    );
};

export default RelatedPostsByCategory;
