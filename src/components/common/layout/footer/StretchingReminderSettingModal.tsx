import { STRETCHING_SEC_OPTIONS, POPUP_MIN_OPTIONS } from '@/constants/stretching.constants';
import { useEscapeToCloseModal } from '@/hooks/useEscapeToCloseModal';
import { useStretchingReminderStore } from '@/store/useStretchingReminderStore';
import clsx from 'clsx';
import { X } from 'lucide-react';

interface StretchingReminderSettingModalProps {
    setIsStretchingReminderSettingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const StretchingReminderSettingModal = ({
    setIsStretchingReminderSettingModalOpen,
}: StretchingReminderSettingModalProps) => {
    const { setStretchingDuration, setPopupInterval, enabled, toggleEnabled } =
        useStretchingReminderStore();

    useEscapeToCloseModal(() => setIsStretchingReminderSettingModalOpen(false));

    const handleCloseModal = () => setIsStretchingReminderSettingModalOpen(false);

    const stretchingDurationMs = useStretchingReminderStore(s => s.stretchingDuration);
    const popupIntervalMs = useStretchingReminderStore(s => s.popupInterval);

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            <button onClick={handleCloseModal} className='absolute left-4 top-4'>
                <X size={32} className='text-main hover:text-primary' />
            </button>

            <div className='w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl'>
                <div className='mb-3 flex items-start justify-between'>
                    <h2 className='font-title text-xl font-bold text-foreground'>
                        Stretching Setting
                    </h2>
                    <span className='text-xs text-muted'>ESC to close</span>
                </div>

                <section className='mb-10 flex flex-col gap-1'>
                    <h3 className='text-lg text-muted'>Select stretching duration</h3>
                    <div className='flex w-full flex-wrap justify-center gap-4'>
                        {STRETCHING_SEC_OPTIONS.map(sec => {
                            const isActive = stretchingDurationMs === sec * 1000;
                            return (
                                <button
                                    key={sec}
                                    type='button'
                                    className={clsx(
                                        'text-md w-20 rounded-md border px-3 py-1',
                                        isActive
                                            ? 'border-primary bg-primary font-semibold text-main hover:bg-primary active:bg-primary'
                                            : 'border-border bg-background text-foreground hover:bg-primary-light active:bg-primary-light',
                                    )}
                                    onClick={() => setStretchingDuration(sec)}
                                >
                                    {sec}sec
                                </button>
                            );
                        })}
                    </div>
                </section>

                <section className='flex flex-col gap-1'>
                    <h3 className='text-lg text-muted'>Select reminder interval</h3>
                    <div className='flex w-full flex-wrap justify-center gap-4'>
                        {POPUP_MIN_OPTIONS.map(min => {
                            const isActive = popupIntervalMs === min * 60 * 1000; // ms 비교
                            return (
                                <button
                                    key={min}
                                    type='button'
                                    className={clsx(
                                        'text-md w-20 rounded-md border px-3 py-1',
                                        isActive
                                            ? 'border-primary bg-primary text-main hover:bg-primary active:bg-primary'
                                            : 'border-border bg-background text-foreground hover:bg-primary-light active:bg-primary-light',
                                    )}
                                    onClick={() => setPopupInterval(min)}
                                >
                                    {min}min
                                </button>
                            );
                        })}
                    </div>
                </section>

                <div className='mt-6 flex w-full items-center justify-between gap-2'>
                    <button
                        className='h-8 w-20 rounded-md border border-borderDark bg-backgroundDark px-3 py-1 text-sm text-foreground hover:bg-backgroundDark/70 active:bg-backgroundDark/70'
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                    <button
                        className='h-8 w-20 rounded-md border border-primary bg-primary px-3 py-1 text-sm text-main hover:bg-primary-deep active:bg-primary-deep'
                        onClick={toggleEnabled}
                    >
                        {enabled ? 'On' : 'Off'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StretchingReminderSettingModal;
