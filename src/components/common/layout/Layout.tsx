import LandingIntro from '@/components/common/landing/LandingIntro';
import Footer from '@/components/common/layout/Footer';
import Header from '@/components/common/layout/Header';
import StretchingReminderController from '@/components/common/StretchingReminderController';
import LayoutHeaderForWritePage from '@/components/write/LayoutHeaderForWritePage';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className='flex h-screen w-full shrink-0 flex-col flex-nowrap justify-start'>
            {isActive('/write') ? <LayoutHeaderForWritePage /> : <Header />}
            <div className='mt-16 flex-1 bg-background-second sm:mt-[70px]'>
                <Outlet />
            </div>
            {!isActive('/write') && <Footer />}
            <LandingIntro />
            <ToastContainer autoClose={2000} position='top-center' />
            <StretchingReminderController />
        </div>
    );
};

export default Layout;

/**
 * Layout
 *
 * 기능:
 * - 앱 전역 레이아웃 컨테이너
 * - 라우트에 따라 헤더/푸터를 조건부로 렌더링
 * - 메인 콘텐츠 영역(Outlet)과 전역 오버레이/유틸(인트로, 토스트, 스트레칭 리마인더) 포함
 *
 * 동작 방식:
 * 1) 현재 경로(location.pathname)로 isActive(path) 판단
 *    - '/write' 경로일 땐 글쓰기 전용 헤더(LayoutHeaderForWritePage) 사용, 푸터는 숨김
 *    - 그 외 경로는 일반 헤더(Header)와 푸터(Footer) 사용
 * 2) 콘텐츠 영역은 <Outlet />으로 하위 라우트가 렌더링
 * 3) 전역 오버레이/유틸
 *    - <LandingIntro />: 첫 진입 인트로 오버레이(닫히면 사라짐)
 *    - <ToastContainer />: 전역 토스트 알림 (2초 자동 닫힘, 상단 중앙)
 *    - <StretchingReminderController />: 설정된 간격/지속시간에 따라 스트레칭 모달 자동 표시
 *
 * UI 특징:
 * - 상단 고정 헤더 높이에 맞춰 콘텐츠 상단 여백 제공 (mt-16 / sm:mt-[70px])
 * - 배경 레이어 분리(bg-background-second)로 메인과 구분
 * - 전체 뷰포트 높이 기준의 플렉스 컬럼 레이아웃(h-screen, flex-col)
 */
