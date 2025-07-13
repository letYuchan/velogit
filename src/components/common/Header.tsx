import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { Home, Info, Pencil } from 'lucide-react';

const Header = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    const navigate = useNavigate();
    const goToHomePage = () => navigate('/');

    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            if (currentY > lastScrollY) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
            setLastScrollY(currentY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header
            className={clsx(
                'fixed left-0 top-0 z-50 flex h-16 w-full flex-nowrap justify-between gap-1 overflow-hidden border-b border-border bg-background p-5 shadow-sm transition-all duration-200 ease-in-out sm:h-[70px]',
                showHeader ? 'translate-y-0' : '-translate-y-full',
            )}
        >
            <img
                src='/images/logo.png'
                alt='siteLogo'
                onClick={goToHomePage}
                className='relative -top-11 right-4 size-28 cursor-pointer items-stretch sm:-top-10'
            />
            <div className='flex flex-nowrap items-stretch justify-around gap-4'>
                <Link to='/'>
                    <button
                        className={clsx(
                            'flex flex-nowrap items-center gap-1 text-lg font-semibold transition-all duration-200 ease-in-out hover:scale-110 sm:text-xl',
                            isActive('/') ? 'text-primary' : 'text-foreground',
                        )}
                    >
                        <Home className='size-6' />
                        {!isMobile && <span className='relative top-0.5'>HOME</span>}
                    </button>
                </Link>
                <Link to='/about'>
                    <button
                        className={clsx(
                            'flex flex-nowrap items-center gap-1 text-lg font-semibold transition-all duration-200 ease-in-out hover:scale-110 sm:text-xl',
                            isActive('/about') ? 'text-primary' : 'text-foreground',
                        )}
                    >
                        <Info className='size-6' />
                        {!isMobile && <span className='relative top-0.5'>ABOUT</span>}
                    </button>
                </Link>
                {!isActive('/write') && (
                    <Link to='/write' className='h-6 sm:h-8'>
                        <button className='flex h-full flex-nowrap items-center gap-1 rounded-2xl border border-primary bg-primary px-3 py-1 text-lg font-semibold text-white transition-all duration-150 ease-in-out hover:bg-blue-700 active:bg-blue-700 sm:text-xl'>
                            <Pencil className='size-6' />
                            {!isMobile && <span className='relative top-0.5'>WRITE</span>}
                        </button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
