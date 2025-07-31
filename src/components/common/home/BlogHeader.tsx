import GrowthStatusModal from '@/components/common/home/GrowthStatusModal';
import { SELECTED_THEME_STORAGE_KEY } from '@/constants/theme.constants';
import { headerBackgroundMap, backgroundPositionMap } from '@/data/themeImgPathData';
import { useEffect, useState } from 'react';
import { FiTrendingUp } from 'react-icons/fi';

const BlogHeader = () => {
    const [currentTheme, setCurrentTheme] = useState('default');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const updateTheme = (e?: Event) => {
            const theme =
                (e instanceof CustomEvent && typeof e.detail === 'string' && e.detail) ||
                localStorage.getItem(SELECTED_THEME_STORAGE_KEY) ||
                'default';
            setCurrentTheme(theme);
        };

        updateTheme();

        window.addEventListener('theme-change', updateTheme);

        return () => {
            window.removeEventListener('theme-change', updateTheme);
        };
    }, []);

    const bgImage = headerBackgroundMap[currentTheme] || headerBackgroundMap.default;
    const bgPosition = backgroundPositionMap[currentTheme] || 'center';

    return (
        <header
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundPosition: bgPosition,
                backgroundSize: '99%',
            }}
            className='relative flex w-full flex-col items-center justify-center bg-cover px-6 py-12 text-white'
        >
            <div className='absolute inset-0 bg-black/50 backdrop-blur-sm'></div>

            <div className='relative z-10 flex flex-col items-center gap-4 text-center'>
                <img
                    src={`${import.meta.env.BASE_URL}images/test.jpg`}
                    alt='profile'
                    className='h-[120px] w-[120px] rounded-full border-4 border-white shadow-lg'
                />
                <h1 className='font-title text-4xl font-bold tracking-tight text-white'>
                    letYuchan's Velog
                </h1>
                <p className='text-lg font-medium text-white/80'>프론트엔드 성장 블로그</p>
                <button onClick={() => setShowModal(true)}>
                    <FiTrendingUp size={32} />
                </button>
            </div>
            {showModal && <GrowthStatusModal showModal={showModal} setShowModal={setShowModal} />}
        </header>
    );
};

export default BlogHeader;
