import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import LayoutHeaderForWritePage from '@/components/common/write/LayoutHeaderForWritePage';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className='flex h-screen w-full shrink-0 flex-col flex-nowrap justify-start'>
            {isActive('/write') ? <LayoutHeaderForWritePage /> : <Header />}
            <div className='mt-16 flex-1 bg-gray-100 sm:mt-[70px]'>
                <Outlet />
            </div>
            {!isActive('/write') && <Footer />}
        </div>
    );
};

export default Layout;
