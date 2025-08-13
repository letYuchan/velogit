import { motion, MotionConfig } from 'framer-motion';

const HaloGlow = () => {
    return (
        <MotionConfig reducedMotion='never'>
            <motion.div
                inherit={false}
                className='pointer-events-none absolute -right-20 -top-16 z-10 size-64 rounded-full bg-primary/40 blur-3xl'
                initial={{ opacity: 0.35, scale: 1 }}
                animate={{
                    opacity: [0.35, 1, 0.35],
                    scale: [1, 1.06, 1],
                }}
                transition={{
                    opacity: {
                        duration: 1.8,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatType: 'reverse',
                    },
                    scale: {
                        duration: 1.8,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatType: 'reverse',
                    },
                }}
                style={{ willChange: 'opacity, transform' }}
            />
        </MotionConfig>
    );
};

export default HaloGlow;
