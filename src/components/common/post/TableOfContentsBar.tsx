import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface TableOfContentsBarProps {
    tableOfContentsTree: TableOfContentsItemType[];
}

const TableOfContentsBar = ({ tableOfContentsTree }: TableOfContentsBarProps) => {
    const [hasValidItems, setHasValidItems] = useState(false);
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const isValid = tableOfContentsTree.some(item => item.id.trim() && item.text.trim());
        setHasValidItems(isValid);
    }, [tableOfContentsTree]);

    useEffect(() => {
        const flatList = tableOfContentsTree.flatMap(h1 => [h1, ...(h1.children || [])]);
        if (flatList.length === 0) return;

        const observer = new IntersectionObserver(
            entries => {
                const visible = entries
                    .filter(entry => entry.isIntersecting)
                    .map(entry => ({
                        id: entry.target.id,
                        ratio: entry.intersectionRatio,
                        top: entry.boundingClientRect.top,
                    }));

                if (visible.length > 0) {
                    const mostVisible = visible.reduce((a, b) => (a.ratio > b.ratio ? a : b));
                    setActiveId(mostVisible.id);
                } else {
                    const above = entries.filter(entry => entry.boundingClientRect.top < 0);
                    if (above.length > 0) {
                        const nearestAbove = above.reduce((a, b) =>
                            Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top)
                                ? a
                                : b,
                        );
                        setActiveId(nearestAbove.target.id);
                    }
                }
            },
            {
                rootMargin: '-80px 0px -60% 0px',
                threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
            },
        );

        flatList.forEach(item => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [tableOfContentsTree]);

    useEffect(() => {
        const handleFallbackScroll = () => {
            const flat = tableOfContentsTree.flatMap(h1 => [h1, ...(h1.children || [])]);
            const scrollPos = window.scrollY + 90;
            let currentId = '';

            for (let i = 0; i < flat.length; i++) {
                const el = document.getElementById(flat[i].id);
                if (el && el.offsetTop <= scrollPos) {
                    currentId = flat[i].id;
                }
            }

            if (currentId) setActiveId(currentId);
        };

        window.addEventListener('scroll', handleFallbackScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleFallbackScroll);
    }, [tableOfContentsTree]);

    useEffect(() => {
        const handleScrollToBottom = () => {
            const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
            if (atBottom && tableOfContentsTree.length > 0) {
                const flat = tableOfContentsTree.flatMap(h1 => [h1, ...(h1.children || [])]);
                const lastItem = flat[flat.length - 1];
                if (lastItem?.id) {
                    setActiveId(lastItem.id);
                }
            }
        };

        window.addEventListener('scroll', handleScrollToBottom);
        return () => window.removeEventListener('scroll', handleScrollToBottom);
    }, [tableOfContentsTree]);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash) {
                const id = hash.substring(1);
                setTimeout(() => setActiveId(id), 300);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const moveToTargetHeading = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            history.replaceState(null, '', `#${id}`);
            setActiveId(id);
        }
    };

    if (!hasValidItems) return null;

    return (
        <aside className='fixed right-8 top-20 hidden w-60 translate-y-1/2 transform flex-col items-start justify-between overflow-hidden rounded-xl bg-background px-2 py-4 shadow-md xl:flex'>
            <h1 className='mb-4 self-center font-title text-xl font-bold text-foreground'>
                On this page
            </h1>
            <ul className='ml-4 flex w-full flex-col flex-nowrap items-start justify-around gap-2 border-l border-border pl-4 font-semibold text-muted'>
                {tableOfContentsTree.map(h1 => (
                    <li key={h1.id} className='w-full'>
                        <a
                            href='#'
                            onClick={e => {
                                e.preventDefault();
                                moveToTargetHeading(h1.id);
                            }}
                            className={clsx(
                                'inline-block w-full transform text-left text-sm transition-all duration-300 hover:scale-110 hover:text-primary active:scale-110 active:text-primary',
                                activeId === h1.id && 'text-md scale-110 font-bold text-primary',
                            )}
                        >
                            {h1.text}
                        </a>
                        {h1.children && (
                            <ul>
                                {h1.children.map(h2 => (
                                    <li key={h2.id} className='w-full'>
                                        <a
                                            href='#'
                                            onClick={e => {
                                                e.preventDefault();
                                                moveToTargetHeading(h2.id);
                                            }}
                                            className={clsx(
                                                'relative left-2 inline-block w-full transform text-left text-xs transition-all duration-300 hover:scale-110 hover:text-primary active:scale-110 active:text-primary',
                                                activeId === h2.id &&
                                                    'scale-110 text-sm font-bold text-primary',
                                            )}
                                        >
                                            • {h2.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default TableOfContentsBar;
