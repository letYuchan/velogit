import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import clsx from 'clsx';
import { landingBackgroundMap } from '@/data/themeImgPathData';

const LandingIntro = () => {
    const [isDismissed, setIsDismissed] = useState(false);
    const [isGone, setIsGone] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('default');
    const containerRef = useRef<HTMLDivElement>(null);

    const controls = useAnimation();

    const handleStartApp = () => {
        setIsDismissed(true);
    };

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        const theme = saved || 'default';
        setCurrentTheme(theme);
        window.scrollTo({ top: 20, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (isDismissed) {
            controls
                .start({
                    y: '-100%',
                    transition: { duration: 1.2, ease: 'easeInOut' },
                })
                .then(() => setIsGone(true));
        }
    }, [isDismissed, controls]);

    if (isGone) return null;

    const bgImage = landingBackgroundMap[currentTheme] || landingBackgroundMap.default;

    return (
        <motion.div
            ref={containerRef}
            className={clsx(
                'fixed left-0 top-0 z-50 h-screen w-screen overflow-hidden',
                'bg-gradient-to-b from-primary-deep to-primary text-main',
            )}
            initial={{ y: 0 }}
            animate={controls}
        >
            <div className='relative flex h-full w-full items-center justify-center'>
                {/* Background image */}
                <motion.div
                    className='absolute left-0 top-0 h-full w-full bg-cover opacity-70'
                    style={{
                        backgroundImage: `url('${bgImage}')`,
                        backgroundPosition: ['sakura', 'anime', 'cat'].includes(currentTheme)
                            ? 'center 80%'
                            : 'center',
                    }}
                    initial={{ scale: 1.1 }}
                    animate={{
                        scale: [1.1, 1, 1.1],
                        transition: { duration: 5, repeat: Infinity },
                    }}
                />

                {/* Content */}
                <div className='relative z-10 text-center'>
                    <motion.h1
                        className='font-title text-5xl font-extrabold tracking-widest text-main drop-shadow-xl sm:text-6xl'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        velo<span className='text-primary'>git</span>
                    </motion.h1>

                    <motion.button
                        onClick={handleStartApp}
                        className='mt-10 rounded-full border border-primary bg-primary-deep px-6 py-3 text-lg font-bold text-main shadow-lg transition-transform hover:scale-105 hover:bg-primary active:scale-95'
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >
                        Start
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default LandingIntro;
