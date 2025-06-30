import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex h-screen w-full shrink-0 flex-col flex-nowrap justify-start'>
      <Header />
      <main className='mt-16 flex-1 bg-gray-100 sm:mt-[70px]'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
