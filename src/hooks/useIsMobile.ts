import { useEffect, useState } from 'react';

export const useIsMobile = (breakpoint = 640) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

    useEffect(() => {
        const updateIsMobileOnResize = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener('resize', updateIsMobileOnResize);
        return () => window.removeEventListener('resize', updateIsMobileOnResize);
    }, [breakpoint]);

    return isMobile;
};
