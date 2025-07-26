import { useState, useEffect } from 'react';
import { MdArrowUpward } from 'react-icons/md';

const ArrowUpButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            const isScrolledEnough = scrollY > 300;
            const isAtBottom = windowHeight + scrollY >= docHeight - 10;

            setShowButton(isScrolledEnough && !isAtBottom);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // mount 시 한 번 실행

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {showButton && (
                <button
                    className='text-main hover:bg-primary-deep active:bg-primary-deep fixed bottom-6 right-6 z-50 rounded-full bg-primary p-2 shadow-md transition sm:p-3'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label='Scroll to top'
                >
                    <MdArrowUpward className='text-xl sm:text-2xl' />
                </button>
            )}
        </>
    );
};

export default ArrowUpButton;
