// src/hooks/useConfirmOnBack.ts
import { useEffect, useRef } from 'react';
/**
 * Hook: Confirm on browser Back / Refresh / Tab close.
 *
 * This hook intercepts the browser "back" action (popstate)
 * and shows a confirmation dialog before allowing navigation away.
 * It can also optionally guard against refresh and tab close.
 *
 * Implementation:
 * - Uses a "sentinel" pushState: pushes a duplicate entry of the current page
 *   into history. When the user presses Back, the browser pops the sentinel first,
 *   and `popstate` fires, giving us a chance to confirm.
 * - If the user cancels, we push another sentinel so they remain on the same page.
 * - If the user confirms, we disable the guard and allow the real back navigation.
 *
 * Notes:
 * - Some browsers (e.g. iOS Safari) do not display custom text on `beforeunload`,
 *   they only show a generic native warning.
 * - If you also want to block in-app navigation (like React Router links),
 *   combine this hook with router-level navigation blockers.
 *
 * @param options - configuration
 *   - when: enable/disable condition
 *   - message: confirm dialog text
 *   - askOnce: if true, ask only once
 *   - guardBeforeUnload: also guard refresh/tab close
 *
 * @example
 * useConfirmOnBack({
 *   when: isDirty,
 *   message: "Are you sure you want to leave? Unsaved changes may be lost.",
 *   askOnce: false,
 *   guardBeforeUnload: true,
 * });
 */
export const useConfirmOnBack = ({
    when,
    message = 'Are you sure you want to leave? Unsaved changes may be lost.',
    askOnce = false,
    guardBeforeUnload = true,
}: ConfirmOnBackOptions) => {
    const enabledRef = useRef(when);
    const askedOnceRef = useRef(false);
    const pushedSentinelRef = useRef(false);
    const ignoreNextRef = useRef(false);

    useEffect(() => {
        enabledRef.current = when;
    }, [when]);

    useEffect(() => {
        if (!when) return;

        // 1) Push sentinel into history once to trap the Back action
        if (!pushedSentinelRef.current) {
            try {
                history.pushState({ __velogit_block__: Date.now() }, '', location.href);
                pushedSentinelRef.current = true;
            } catch {
                // pushState can fail in some environments, but it's not fatal
            }
        }

        // 2) Guard refresh / tab close
        const onBeforeUnload = (e: BeforeUnloadEvent) => {
            if (!enabledRef.current || !guardBeforeUnload) return;
            if (askOnce && askedOnceRef.current) return;
            e.preventDefault();
            e.returnValue = ''; // Required in some browsers
            return '';
        };

        // 3) Guard browser Back (popstate)
        const onPopState = () => {
            if (!enabledRef.current) return;

            // Skip once if we already confirmed and allowed real back navigation
            if (ignoreNextRef.current) {
                ignoreNextRef.current = false;
                return;
            }

            if (askOnce && askedOnceRef.current) {
                return; // already confirmed once
            }

            const ok = window.confirm(message);

            if (ok) {
                if (askOnce) askedOnceRef.current = true;
                enabledRef.current = false;
                ignoreNextRef.current = true;
                history.back(); // allow real back
            } else {
                // Cancelled → push sentinel again to keep user on the page
                try {
                    history.pushState({ __velogit_block__: Date.now() }, '', location.href);
                } catch (e) {
                    console.log('Error message:', e);
                }
            }
        };

        window.addEventListener('beforeunload', onBeforeUnload);
        window.addEventListener('popstate', onPopState);

        return () => {
            window.removeEventListener('beforeunload', onBeforeUnload);
            window.removeEventListener('popstate', onPopState);
        };
    }, [when, message, askOnce, guardBeforeUnload]);
};
