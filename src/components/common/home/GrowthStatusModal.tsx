import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    getDragonEvolutionGifByLevel,
    getTopThreeCategories,
    getUserBlogLevel,
} from '@/utils/home';
import { posts } from '@/utils';

interface GrowthStatusModalProps {
    setIsGrowthStatusModalOepn: React.Dispatch<React.SetStateAction<boolean>>;
}

const GrowthStatusModal = ({ setIsGrowthStatusModalOepn }: GrowthStatusModalProps) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [currentEvolutionGifPath, setCurrentEvolutionGifPath] = useState('images/egg.gif');

    useEffect(() => {
        const level = getUserBlogLevel(posts.length);
        const gifPath = getDragonEvolutionGifByLevel(level) ?? 'images/egg.gif';
        setCurrentEvolutionGifPath(gifPath);
    }, [posts.length]);

    useEffect(() => {
        const closeModal = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsGrowthStatusModalOepn(false);
        };
        window.addEventListener('keydown', closeModal);
        return () => window.removeEventListener('keydown', closeModal);
    }, []);

    const handleCloseModal = () => setIsGrowthStatusModalOepn(false);

    const postsPerPage = 30;
    const sortedPosts = [...posts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const currentPagePosts = sortedPosts.slice(
        currentPage * postsPerPage,
        (currentPage + 1) * postsPerPage,
    );

    return createPortal(
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            <button
                onClick={() => setIsGrowthStatusModalOepn(false)}
                className='absolute left-4 top-4'
            >
                <X size={32} className='text-main hover:text-primary' />
            </button>
            <div className='relative w-full max-w-lg rounded-2xl bg-gradient-to-br from-background via-background-second to-backgroundDark p-4 shadow-2xl ring-1 ring-border/30 backdrop-blur-md'>
                {/* Title */}
                <h2 className='mb-4 text-center font-title text-xl font-bold tracking-wide text-primary'>
                    🚀 My Growth Status
                </h2>
                <p className='text-right text-xs text-muted'>ESC to close</p>

                {/* Level Info */}
                <div className='flex flex-col items-center space-y-2 rounded-xl border border-border bg-backgroundDark/50 p-3'>
                    <p className='text-base font-medium text-muted'>Current Level</p>
                    <div className='text-2xl font-bold text-primary drop-shadow-md'>
                        LV. {getUserBlogLevel(posts.length)}
                    </div>
                    <div></div>
                    <p className='text-sm text-foreground'>
                        Total Posts: <span className='font-semibold'>{posts.length}</span>
                    </p>
                    <img
                        src={`${import.meta.env.BASE_URL + currentEvolutionGifPath}`}
                        alt='evolution character'
                        className='mt-1 h-20 w-20 rounded-full shadow-md ring-2 ring-primary-light'
                    />
                </div>

                {/* Top 3 Categories */}
                <div className='mt-4 w-full rounded-md border border-border bg-background-second p-3 shadow-sm'>
                    <p className='mb-2 text-center text-base font-semibold text-foreground'>
                        🏷 Top 3 Categories
                    </p>
                    <ul className='space-y-1 text-center text-sm'>
                        {getTopThreeCategories(posts).map(([category, count], idx) => (
                            <li
                                key={category}
                                className={`${
                                    idx === 0 ? 'font-bold text-primary' : 'text-foreground'
                                }`}
                            >
                                <span className={idx === 0 ? 'text-base' : 'text-muted'}>
                                    {idx + 1}.
                                </span>
                                <span className={idx === 0 ? 'ml-1 underline' : 'ml-1'}>
                                    {category}
                                </span>
                                <span className='ml-1 text-muted'>({count}회)</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Monthly Activity */}
                <div className='mt-4 w-full rounded-md border border-border bg-background-second p-3 shadow-sm'>
                    <p className='mb-2 text-center text-base font-semibold text-foreground'>
                        📊 Activity Grid
                    </p>
                    <div className='mx-auto grid w-fit grid-cols-6 gap-1'>
                        {currentPagePosts.map(post => (
                            <div
                                key={post.slug}
                                className='h-3.5 w-3.5 rounded-sm bg-primary/70 transition hover:bg-primary/90'
                            />
                        ))}
                        {Array.from({ length: postsPerPage - currentPagePosts.length }).map(
                            (_, idx) => (
                                <div
                                    key={`empty-${idx}`}
                                    className='h-3.5 w-3.5 rounded-sm bg-border'
                                />
                            ),
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className='mb-6 mt-6 flex justify-center gap-3 text-sm text-muted'>
                            <button
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className='sm:text-md flex h-full flex-nowrap items-center gap-1 rounded-full border border-primary bg-primary px-3 py-1 text-sm font-semibold text-main transition-all duration-150 ease-in-out hover:bg-primary-deep active:bg-primary-deep disabled:opacity-50 disabled:hover:bg-primary'
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
                                className='sm:text-md flex h-full flex-nowrap items-center gap-1 rounded-full border border-primary bg-primary px-3 py-1 text-sm font-semibold text-main transition-all duration-150 ease-in-out hover:bg-primary-deep active:bg-primary-deep disabled:opacity-50 disabled:hover:bg-primary'
                            >
                                Next ➡
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Close Button */}
                <div className='mt-5 flex justify-center'>
                    <button
                        className='h-8 w-full rounded-md border border-borderDark bg-backgroundDark px-3 py-1 text-sm text-foreground hover:bg-backgroundDark/70 active:bg-backgroundDark/70'
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default GrowthStatusModal;
