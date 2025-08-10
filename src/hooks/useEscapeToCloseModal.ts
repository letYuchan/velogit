import { useEffect } from 'react';

export const useEscapeToCloseModal = (closeFn: () => void) => {
    useEffect(() => {
        const closeModalOnEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeFn();
        };
        window.addEventListener('keydown', closeModalOnEscape);
        return () => window.removeEventListener('keydown', closeModalOnEscape);
    }, [closeFn]);
};
