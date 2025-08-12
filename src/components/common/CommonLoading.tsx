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

/**
 * CommonLoading
 *
 * 기능:
 * - 전체 화면을 가리는 로딩 오버레이와 진행률 표시
 * - 3초(기본) 동안 0 → 100%로 선형(progress) 애니메이션
 *
 * 동작 방식:
 * 1) 마운트 시 requestAnimationFrame으로 경과 시간 측정
 * 2) 경과 시간(elapsed)을 3000ms로 나눠 퍼센트 계산 후 setProgress
 * 3) 100% 도달 전까지 매 프레임 갱신, 언마운트 시 rAF 취소/상태 초기화
 *
 * UI 특징:
 * - 반투명 블러 배경(모달 느낌)
 * - MUI LinearProgress(rounded bar) + 퍼센트 텍스트 중앙 정렬
 * - 반응형: 최대 520px, 그 외 90vw
 */
