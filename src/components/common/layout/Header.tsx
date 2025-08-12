import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Home, Info, Pencil } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';

const Header = () => {
    const [showHeader, setShowHeader] = useState(true);

    const lastScrollY = useRef(0);

    const navigate = useNavigate();
    const location = useLocation();

    const isMobile = useIsMobile();

    const isActive = (path: string) => location.pathname === path;
    const isLocalhost = window.location.hostname === 'localhost';

    const goToHomePage = () => navigate('/');

    useLayoutEffect(() => {
        lastScrollY.current =
            window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }, []);

    useEffect(() => {
        const toggleWindowScrollForHeaderVisibility = () => {
            const currentY =
                window.scrollY ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0;

            const threshold = 30;

            if (currentY <= 0) {
                setShowHeader(true);
                lastScrollY.current = 0;
                return;
            }

            if (Math.abs(currentY - lastScrollY.current) < threshold) return;

            if (currentY > lastScrollY.current) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener('scroll', toggleWindowScrollForHeaderVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleWindowScrollForHeaderVisibility);
    }, []);

    useEffect(() => {
        requestAnimationFrame(() => {
            lastScrollY.current = window.scrollY;
        });
    }, []);

    return (
        <header
            className={clsx(
                'fixed left-0 top-0 z-50 flex h-16 w-full flex-nowrap justify-between gap-1 overflow-hidden border-b border-border bg-background p-5 shadow-sm transition-all duration-200 ease-in-out sm:h-[70px]',
                showHeader ? 'translate-y-0' : '-translate-y-full',
            )}
        >
            {/* title */}
            <h1
                className='relative bottom-[1px] cursor-pointer font-title text-xl font-bold text-foreground sm:inset-0 sm:text-2xl'
                onClick={goToHomePage}
            >
                velo<span className='text-primary'>git</span>
            </h1>
            {/* links for pages */}
            <div className='flex flex-nowrap items-stretch justify-around gap-4'>
                <Link to='/'>
                    <button
                        className={clsx(
                            'flex flex-nowrap items-center gap-1 text-lg font-semibold transition-all duration-200 ease-in-out hover:scale-110 active:scale-110 sm:text-xl',
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
                            'flex flex-nowrap items-center gap-1 text-lg font-semibold transition-all duration-200 ease-in-out hover:scale-110 active:scale-110 sm:text-xl',
                            isActive('/about') ? 'text-primary' : 'text-foreground',
                        )}
                    >
                        <Info className='size-6' />
                        {!isMobile && <span className='relative top-0.5'>ABOUT</span>}
                    </button>
                </Link>
                {isLocalhost && (
                    <Link to='/write' className='h-6 sm:h-8'>
                        <button className='flex h-full flex-nowrap items-center gap-1 rounded-full border border-primary bg-primary px-3 py-1 text-lg font-semibold text-main transition-all duration-150 ease-in-out hover:bg-primary-deep active:bg-primary-deep sm:text-xl'>
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

/**
 * Header
 *
 * 기능:
 * - 상단 고정 네비게이션 바
 * - 스크롤 방향(아래/위)에 따라 헤더를 숨기거나 표시
 * - 현재 경로에 맞춰 활성 탭 색상 변경
 * - 로컬 환경(localhost)에서만 "WRITE" 버튼 노출
 *
 * 동작 방식:
 * 1) 초기 스크롤 위치를 기록(useLayoutEffect)
 * 2) window.scroll 이벤트를 구독하여 현재 스크롤 위치와 마지막 위치를 비교
 *    - 아래로 크게 스크롤하면 헤더 숨김
 *    - 위로 스크롤하면 헤더 표시
 *    - 미세 움직임(임계값 threshold)일 땐 무시
 * 3) 라우트(pathname)에 따라 활성 상태(isActive) 판단 후 버튼 색상 처리
 * 4) 반응형: 모바일이면 버튼 텍스트를 숨기고 아이콘만 표시(useIsMobile)
 *
 * UI 특징:
 * - 상단 고정(fixed) + border + shadow
 * - 부드러운 슬라이드 애니메이션(translateY)로 표시/숨김
 * - 아이콘 + 텍스트 조합, hover/active 확대 효과
 */
