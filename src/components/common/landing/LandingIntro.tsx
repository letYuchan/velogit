import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import clsx from 'clsx';
import { landingBackgroundMap } from '@/data';

const LandingIntro = () => {
    const [isDismissed, setIsDismissed] = useState(false);
    const [isGone, setIsGone] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('default');
    const [hasVisitedBefore, setHasVisitedBefore] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const controls = useAnimation();

    const handleStartApp = () => {
        setIsDismissed(true);
    };

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        const theme = saved || 'default';
        setCurrentTheme(theme);
        
        const hasVisited = localStorage.getItem('hasVisitedBefore') === 'true';
        setHasVisitedBefore(hasVisited);
        
        if (!hasVisited) {
            window.scrollTo({ top: 20, behavior: 'smooth' });
        }
    }, []);

    useEffect(() => {
        if (isDismissed) {
            controls
                .start({
                    y: '-100%',
                    transition: { duration: 1.2, ease: 'easeInOut' },
                })
                .then(() => {
                    setIsGone(true);
                    localStorage.setItem('hasVisitedBefore', 'true');
                });
        }
    }, [isDismissed, controls]);

    if (hasVisitedBefore || isGone) return null;

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

                {/* Trigger for starting app */}
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
                        className='mt-10 rounded-full border border-primary bg-primary-deep px-6 py-3 text-lg font-bold text-main shadow-lg hover:bg-primary active:bg-primary'
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

/**
 * LandingIntro
 * --------------------------
 * 기능:
 * - 앱 첫 진입 시 화면 전체를 덮는 인트로 화면
 * - 현재 테마에 맞는 배경 이미지를 표시
 * - "Start" 버튼 클릭 시 위로 슬라이드되며 사라짐
 *
 * 주요 상태(state):
 * - isDismissed: boolean → 사용자가 Start 버튼을 눌러 인트로 화면을 닫으려고 하는 상태
 * - isGone: boolean → 인트로 화면이 완전히 사라져 DOM에서 제거된 상태
 * - currentTheme: string → 현재 적용된 테마 (localStorage에서 로드)
 *
 * 주요 ref:
 * - containerRef: HTMLDivElement → 인트로 전체 컨테이너 참조
 *
 * 주요 로직:
 * - handleStartApp(): Start 버튼 클릭 시 isDismissed를 true로 설정
 * - useEffect #1:
 *   → localStorage에서 theme 값 로드 (없으면 'default')
 *   → 테마 상태 저장
 *   → 페이지를 약간 스크롤 (top: 20) — 일부 브라우저 UI 초기화 목적
 * - useEffect #2:
 *   → isDismissed가 true가 되면 framer-motion 애니메이션 실행
 *   → y축 -100% 슬라이드 후 isGone을 true로 바꿔서 화면에서 제거
 *
 * UI 요소:
 * - 전체 화면 배경 (배경 이미지는 currentTheme에 따라 선택)
 * - 앱 제목 (velo + git)
 * - "Start" 버튼 (인트로 닫기 트리거)
 *
 * 애니메이션:
 * - 배경 이미지: scale 값이 1.1 ↔ 1로 부드럽게 변하는 반복 애니메이션
 * - 제목과 버튼: fade-in + 위로 슬라이드 인
 * - 인트로 종료 시: 위로 슬라이드 아웃
 */
