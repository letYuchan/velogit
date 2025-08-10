import { useEffect, useState } from 'react';

export const useIsDesktop = (breakpoint = 1150) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > breakpoint);

    useEffect(() => {
        const updateIsDesktopOnResize = () => setIsDesktop(window.innerWidth > breakpoint);
        window.addEventListener('resize', updateIsDesktopOnResize);
        return () => window.removeEventListener('resize', updateIsDesktopOnResize);
    }, [breakpoint]);

    return isDesktop;
};
