import { useEffect } from 'react';

/**
 * Hook: Keyboard-based index navigation (Arrow/Home/End/PageUp/PageDown).
 * Keeps a current index within [0, total-1] and updates it on key presses.
 *
 * @param options - Configuration for navigation behavior
 *   - enabled: Enable/disable the keyboard navigation entirely
 *   - total: Total number of items (upper bound for index)
 *   - currentIndex: The current active index
 *   - setCurrentIndex: Setter to update the active index
 *   - loop: Wrap around when moving past first/last (cyclic navigation)
 *   - ignoreWhenTyping: Ignore shortcuts while typing in inputs/textarea/contentEditable
 *   - preventDefault: Prevent default browser behavior for handled keys
 *   - withHomeEnd: Enable Home (go to 0) and End (go to total-1)
 *   - withPageKeys: Enable PageUp/PageDown jumps
 *   - pageStep: Step size for PageUp/PageDown
 */
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
    /**
     * Guard: If `total` shrinks and currentIndex is now out of bounds,
     * clamp it back into the valid range.
     */
    useEffect(() => {
        if (currentIndex > 0 && currentIndex >= total) {
            setCurrentIndex(() => Math.max(0, total - 1));
        }
    }, [total, currentIndex, setCurrentIndex]);

    /**
     * Keyboard listener: updates index on navigation keys.
     */
    useEffect(() => {
        if (!enabled || total <= 0) return;

        const moveIndexOnKey = (e: KeyboardEvent) => {
            // Optionally ignore when the user is typing in form fields or contentEditable
            if (ignoreWhenTyping) {
                const targetedElement = e.target as HTMLElement | null;
                const tag = targetedElement?.tagName.toLowerCase();
                if (tag === 'input' || tag === 'textarea' || targetedElement?.isContentEditable) {
                    return;
                }
            }

            let handled = false;

            // Clamp to [0, total-1] or wrap around if `loop` is enabled
            const clamp = (n: number) =>
                loop ? (n + total) % total : Math.min(total - 1, Math.max(0, n));

            switch (e.key) {
                // Single-step backward
                case 'ArrowLeft':
                case 'ArrowUp':
                    setCurrentIndex(i => clamp(i - 1));
                    handled = true;
                    break;

                // Single-step forward
                case 'ArrowRight':
                case 'ArrowDown':
                    setCurrentIndex(i => clamp(i + 1));
                    handled = true;
                    break;

                // Jump to first
                case 'Home':
                    if (withHomeEnd) {
                        setCurrentIndex(() => 0);
                        handled = true;
                    }
                    break;

                // Jump to last
                case 'End':
                    if (withHomeEnd) {
                        setCurrentIndex(() => total - 1);
                        handled = true;
                    }
                    break;

                // Multi-step backward
                case 'PageUp':
                    if (withPageKeys) {
                        setCurrentIndex(i => clamp(i - pageStep));
                        handled = true;
                    }
                    break;

                // Multi-step forward
                case 'PageDown':
                    if (withPageKeys) {
                        setCurrentIndex(i => clamp(i + pageStep));
                        handled = true;
                    }
                    break;
            }

            // Prevent native scrolling, caret moves, etc., if we handled the key
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
