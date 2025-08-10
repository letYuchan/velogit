import { flattenToc } from '@/utils/post';
import { useEffect, useState } from 'react';

export const useActiveTocId = (
    tree: TableOfContentsItemType[],
    {
        rootMargin = '-80px 0px -60% 0px',
        thresholds = Array.from({ length: 21 }, (_, i) => i * 0.05),
        enableScrollFallback = true,
        activateLastOnBottom = true,
        syncHash = true,
    }: ActiveTocIdOptions = {},
) => {
    const [activeId, setActiveId] = useState('');
    const flat = flattenToc(tree);

    // IntersectionObserver: pick the most visible heading
    useEffect(() => {
        if (flat.length === 0) return;

        const observer = new IntersectionObserver(
            entries => {
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .map(e => ({
                        id: (e.target as HTMLElement).id,
                        ratio: e.intersectionRatio,
                    }));

                if (visible.length) {
                    const most = visible.reduce((a, b) => (a.ratio > b.ratio ? a : b));
                    setActiveId(most.id);
                    return;
                }

                // Fallback: if nothing is intersecting, prefer the nearest above
                const above = entries.filter(e => e.boundingClientRect.top < 0);
                if (above.length) {
                    const nearest = above.reduce((a, b) =>
                        Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top)
                            ? a
                            : b,
                    );
                    setActiveId((nearest.target as HTMLElement).id);
                }
            },
            { rootMargin, threshold: thresholds },
        );

        flat.forEach(item => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [flat, rootMargin, thresholds]);

    // Scroll fallback: simple position-based activation
    useEffect(() => {
        if (!enableScrollFallback || flat.length === 0) return;

        const onScroll = () => {
            const y = window.scrollY + 90;
            let current = '';
            for (const item of flat) {
                const el = document.getElementById(item.id);
                if (el && el.offsetTop <= y) current = item.id;
            }
            if (current) setActiveId(current);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [enableScrollFallback, flat]);

    // When reaching the very bottom, force-last activation
    useEffect(() => {
        if (!activateLastOnBottom || flat.length === 0) return;

        const onScroll = () => {
            const atBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
            if (atBottom) setActiveId(flat[flat.length - 1].id);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [activateLastOnBottom, flat]);

    // Sync URL hash → state (works well with HashRouter)
    useEffect(() => {
        if (!syncHash) return;
        const onHash = () => {
            const id = window.location.hash.slice(1);
            if (id) setActiveId(id);
        };
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, [syncHash]);

    return activeId;
};
