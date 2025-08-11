import LandingIntro from '@/components/common/landing/LandingIntro';
import Footer from '@/components/common/layout/Footer';
import Header from '@/components/common/layout/Header';
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
        </div>
    );
};

export default Layout;
