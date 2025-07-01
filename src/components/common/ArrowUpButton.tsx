import { useState, useEffect } from 'react';
import { MdArrowUpward } from 'react-icons/md';

const ArrowUpButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowButton(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {showButton && (
        <button
          className='fixed bottom-6 right-6 z-50 rounded-full bg-primary p-3 text-white opacity-70 shadow-md transition hover:bg-blue-700'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label='Scroll to top'
        >
          <MdArrowUpward className='text-2xl' />
        </button>
      )}
    </>
  );
};

export default ArrowUpButton;
