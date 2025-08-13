import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useStretchingReminderStore } from '@/store/useStretchingReminderStore';
import { formatTime } from '@/utils';
import { stretchingTips } from '@/data/index.constans';

interface StretchingReminderModalProps {
    isStretchingReminderModalOpen: boolean;
    handleCloseModal: () => void;
}

const StretchingReminderModal = ({
    isStretchingReminderModalOpen,
    handleCloseModal,
}: StretchingReminderModalProps) => {
    const durationMs = useStretchingReminderStore(s => s.stretchingDuration);

    const [remaining, setRemaining] = useState(durationMs);
    const startedAtRef = useRef<number>(0);
    const closeTimerRef = useRef<number | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isStretchingReminderModalOpen) return;

        setRemaining(durationMs);
        startedAtRef.current = performance.now();

        closeTimerRef.current = window.setTimeout(() => {
            handleCloseModal();
        }, durationMs);

        const tick = (t: number) => {
            const elapsed = t - startedAtRef.current;
            const rest = Math.max(0, durationMs - elapsed);
            setRemaining(rest);
            if (rest <= 0) {
                handleCloseModal();
                return;
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
                closeTimerRef.current = null;
            }
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, [isStretchingReminderModalOpen, durationMs, handleCloseModal]);

    if (!isStretchingReminderModalOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            {/* Close modal */}
            <button onClick={handleCloseModal} className='absolute left-4 top-4'>
                <X size={32} className='text-main hover:text-primary' />
            </button>
            {/* Modal */}
            <div className='w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl'>
                {/* Modal-header */}
                <div className='mb-3 flex items-center justify-between'>
                    <h2 className='font-title text-xl font-bold text-foreground'>
                        Stretching Time
                    </h2>
                    <span className='text-sm text-muted'>{formatTime(remaining)}</span>
                </div>

                {/* Modal-mainFeature: description */}
                <img
                    src={`${import.meta.env.BASE_URL}images/system/stretching/stretching.png`}
                    className='mx-auto aspect-[4/3] w-[80%] rounded-lg object-contain'
                    alt='Stretching'
                />

                <ol className='mt-4 list-decimal space-y-2 pl-5 text-base font-medium text-foreground'>
                    {stretchingTips.map((tip, idx) => (
                        <li key={idx} className='leading-relaxed'>
                            {tip}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default StretchingReminderModal;

/**
 * StretchingReminderModal
 * -----------------------
 * 기능:
 * - 스트레칭 알림 모달을 화면 중앙에 표시
 * - 지정된 durationMs 동안 카운트다운 표시
 * - 시간이 끝나면 자동으로 닫힘
 *
 * props:
 * - isStretchingReminderModalOpen: boolean → 모달 표시 여부
 * - handleCloseModal: () => void → 모달 닫기 함수
 *
 * 상태(state):
 * - remaining: number → 남은 표시 시간(ms)
 *
 * ref:
 * - startedAtRef: number → 모달이 열린 시점의 시간 (performance.now() 기준)
 * - closeTimerRef: number | null → setTimeout ID (자동 닫기 타이머)
 * - rafRef: number | null → requestAnimationFrame ID (카운트다운 갱신용)
 *
 * useEffect 동작:
 * 1) 모달이 열리면 remaining 초기화
 * 2) closeTimerRef로 durationMs 후 자동 닫기 예약
 * 3) requestAnimationFrame으로 매 프레임마다 경과 시간 계산 → remaining 업데이트
 * 4) 시간이 0 이하가 되면 handleCloseModal 호출
 * 5) 모달이 닫히거나 언마운트 시 타이머와 requestAnimationFrame 정리
 *
 * UI 구성:
 * - 닫기 버튼(X 아이콘)
 * - 제목(Stretching Time) + 남은 시간 표시
 * - 스트레칭 이미지 (images/stretching.png)
 * - 스트레칭 팁 목록(stretchingTips 배열)
 *
 * 동작 흐름:
 * 1) 모달 오픈 → 카운트다운 시작
 * 2) durationMs 동안 실시간 시간 갱신
 * 3) 시간이 다 되면 자동 닫힘
 * 4) 사용자가 X 버튼 클릭 시 즉시 닫힘
 */
