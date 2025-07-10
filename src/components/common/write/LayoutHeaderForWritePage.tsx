import { usePostWriteStore } from '@/store/usePostWriteStore';
import { useEffect, useState } from 'react';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const LayoutHeaderForWritePage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const { reset } = usePostWriteStore();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSavePost = () => {
    if (confirm('Do you want to create a new post?')) alert('Succefully save');
  };

  const navigation = useNavigate();

  const goToBack = () => {
    if (confirm('Do you want to go to home?')) {
      reset();
      navigation('/');
    }
  };

  return (
    <header className='fixed left-0 top-0 z-50 flex h-16 w-full flex-nowrap justify-between gap-1 overflow-hidden border-b border-border bg-background p-5 shadow-sm md:h-[70px]'>
      {isMobile ? (
        <button
          onClick={goToBack}
          className='font-title font-semibold text-foreground active:text-primary'
        >
          <MdArrowBack className='text-xl' />
        </button>
      ) : (
        <button
          onClick={goToBack}
          className='flex justify-center rounded-2xl border border-foreground bg-background px-3 py-1 hover:bg-gray-300'
        >
          <span className='relative bottom-[5px] font-title text-lg font-semibold text-foreground md:bottom-0.5 md:text-xl'>
            Back
          </span>
        </button>
      )}
      {isMobile ? (
        <button
          onClick={handleSavePost}
          className='font-title font-semibold text-foreground active:text-primary'
        >
          <MdSave className='text-xl' />
        </button>
      ) : (
        <button
          onClick={handleSavePost}
          className='flex justify-center rounded-2xl border border-primary bg-primary px-3 py-1 hover:bg-blue-700'
        >
          <span className='relative bottom-[5px] font-title text-lg font-semibold text-white md:bottom-0.5 md:text-xl'>
            Save
          </span>
        </button>
      )}
    </header>
  );
};

export default LayoutHeaderForWritePage;
