import { useEffect } from 'react';

export const useArrowIndexNavigation = ({
    enabled = true,
    total,
    currentIndex,
    setCurrentIndex,
    loop = false,
    ignoreWhenTyping = true,
    preventDefault = true,
    withHomeEnd = true,
    withPageKeys = true,
    pageStep = 5,
}: ArrowIndexNavOptions) => {
    useEffect(() => {
        if (currentIndex > 0 && currentIndex >= total) {
            setCurrentIndex(() => Math.max(0, total - 1));
        }
    }, [total, currentIndex, setCurrentIndex]);

    useEffect(() => {
        if (!enabled || total <= 0) return;

        const moveIndexOnKey = (e: KeyboardEvent) => {
            if (ignoreWhenTyping) {
                const targetedElement = e.target as HTMLElement | null;
                const tag = targetedElement?.tagName.toLowerCase();
                if (tag === 'input' || tag === 'textarea' || targetedElement?.isContentEditable)
                    return;
            }

            let handled = false;

            const clamp = (n: number) =>
                loop ? (n + total) % total : Math.min(total - 1, Math.max(0, n));

            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    setCurrentIndex(i => clamp(i - 1));
                    handled = true;
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                    setCurrentIndex(i => clamp(i + 1));
                    handled = true;
                    break;
                case 'Home':
                    if (withHomeEnd) {
                        setCurrentIndex(() => 0);
                        handled = true;
                    }
                    break;
                case 'End':
                    if (withHomeEnd) {
                        setCurrentIndex(() => total - 1);
                        handled = true;
                    }
                    break;
                case 'PageUp':
                    if (withPageKeys) {
                        setCurrentIndex(i => clamp(i - pageStep));
                        handled = true;
                    }
                    break;
                case 'PageDown':
                    if (withPageKeys) {
                        setCurrentIndex(i => clamp(i + pageStep));
                        handled = true;
                    }
                    break;
            }

            if (handled && preventDefault) e.preventDefault();
        };

        window.addEventListener('keydown', moveIndexOnKey);
        return () => window.removeEventListener('keydown', moveIndexOnKey);
    }, [
        enabled,
        total,
        loop,
        ignoreWhenTyping,
        preventDefault,
        withHomeEnd,
        withPageKeys,
        pageStep,
        setCurrentIndex,
    ]);
};
