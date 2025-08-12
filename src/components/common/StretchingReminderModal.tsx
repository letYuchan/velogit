import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useStretchingReminderStore } from '@/store/useStretchingReminderStore';
import { stretchingTips } from '@/data/stretchingData';
import { formatTime } from '@/utils';

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
            <button onClick={handleCloseModal} className='absolute left-4 top-4'>
                <X size={32} className='text-main hover:text-primary' />
            </button>

            <div className='w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl'>
                <div className='mb-3 flex items-center justify-between'>
                    <h2 className='font-title text-xl font-bold text-foreground'>
                        Stretching Time
                    </h2>
                    <span className='text-sm text-muted'>{formatTime(remaining)}</span>
                </div>

                <img
                    src={`${import.meta.env.BASE_URL}images/stretching.png`}
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
