import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import clsx from 'clsx';

const LandingWaveIntro = () => {
    const [isDismissed, setIsDismissed] = useState(false);
    const [isGone, setIsGone] = useState(false);
    const controls = useAnimation();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo({ top: 10, behavior: 'smooth' });
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

    const handleDismiss = () => {
        setIsDismissed(true);
    };

    if (isGone) return null;

    return (
        <motion.div
            ref={containerRef}
            className={clsx(
                'fixed left-0 top-0 z-40 h-screen w-screen overflow-hidden',
                'bg-gradient-to-b from-primary-deep to-primary text-main',
            )}
            initial={{ y: 0 }}
            animate={controls}
        >
            <div className='relative flex h-full w-full items-center justify-center'>
                {/* Wave background animation */}
                <motion.div
                    className='absolute left-0 top-0 h-full w-full bg-cover bg-center opacity-70'
                    style={{
                        backgroundImage: "url('/velogit/images/wave.png')",
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

                    <motion.p
                        className='mt-4 text-xl text-main/80'
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                    >
                        Click the button below to begin ↓
                    </motion.p>

                    <motion.button
                        onClick={handleDismiss}
                        className='mt-10 rounded-full bg-main px-6 py-3 text-lg font-bold text-primary shadow-lg transition-all hover:bg-primary-light hover:text-primary-deep active:scale-95'
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 0.8 }}
                    >
                        Get Started
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default LandingWaveIntro;
