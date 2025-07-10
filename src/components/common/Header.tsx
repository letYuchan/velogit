import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';

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
        setShowHeader(false); // 아래로 스크롤하면 숨김
      } else {
        setShowHeader(true); // 위로 스크롤하면 보여줌
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
        'fixed left-0 top-0 z-50 flex h-16 w-full flex-nowrap justify-between gap-1 overflow-hidden border-b border-border bg-background p-5 shadow-sm transition-all duration-200 ease-in-out md:h-[70px]',
        showHeader ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <img
        src='/images/logo.png'
        alt='siteLogo'
        onClick={goToHomePage}
        className='relative -top-11 size-28 cursor-pointer items-stretch sm:-top-10'
      />
      <div className='flex flex-nowrap items-stretch justify-around gap-4'>
        <Link
          to='/'
          className={clsx(
            'flex justify-center transition-all duration-300 ease-in-out',
            isActive('/') && 'border-b-2 border-black',
          )}
        >
          <button className='font-title text-lg font-semibold text-foreground transition-transform ease-in-out hover:scale-110 sm:text-xl'>
            HOME
          </button>
        </Link>
        <Link
          to='/about'
          className={clsx(
            'flex justify-center transition-all duration-300 ease-in-out',
            isActive('/about') && 'border-b-2 border-black',
          )}
        >
          <button className='font-title text-lg font-semibold text-foreground transition-transform ease-in-out hover:scale-110 sm:text-xl'>
            ABOUT
          </button>
        </Link>
        {!isActive('/write') && (
          <Link to='/write'>
            {isMobile ? (
              <button className='font-title font-semibold text-foreground active:text-primary'>
                <FiEdit className='text-xl' />
              </button>
            ) : (
              <button className='relative bottom-1.5 flex rounded-2xl bg-primary px-3 py-1 font-title text-xl font-semibold text-white hover:bg-blue-700'>
                <span className='relative top-0.5'>Write</span>
              </button>
            )}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
