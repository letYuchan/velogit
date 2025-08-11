import { useEffect, useRef, useState } from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';

const CommonLoading = () => {
    const [progress, setProgress] = useState(0);
    const startRef = useRef<number | null>(null);

    useEffect(() => {
        let frame = 0;
        const tick = (now: number) => {
            if (startRef.current == null) startRef.current = now;
            const elapsed = now - startRef.current;
            const pct = Math.min((elapsed / 3000) * 100, 100);
            setProgress(pct);
            if (pct < 100) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(frame);
            startRef.current = null;
            setProgress(0);
        };
    }, []);

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-md'
            style={{ WebkitBackdropFilter: 'blur(12px)' }}
        >
            <Box
                sx={{
                    width: 'min(520px, 90vw)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                <LinearProgress
                    variant='determinate'
                    value={progress}
                    sx={theme => ({
                        height: 8,
                        borderRadius: 9999,
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.palette.primary.main,
                        },
                        backgroundColor: 'rgba(255,255,255,0.25)',
                    })}
                />
                <Typography
                    variant='body2'
                    sx={theme => ({
                        textAlign: 'center',
                        color: theme.palette.primary.contrastText,
                    })}
                >
                    {`${Math.round(progress)}%`}
                </Typography>
            </Box>
        </div>
    );
};

export default CommonLoading;
