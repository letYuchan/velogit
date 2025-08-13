import { useState } from 'react';
import { useEscapeToCloseModal } from '@/hooks/useEscapeToCloseModal';
import { useArrowIndexNavigation } from '@/hooks/useArrowIndexNavigation';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { helpGuideMetaDataList } from '@/data';

interface HelpModalProps {
    setIsHelpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HelpModal = ({ setIsHelpModalOpen }: HelpModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSections = helpGuideMetaDataList.length;

    useEscapeToCloseModal(() => setIsHelpModalOpen(false));

    useArrowIndexNavigation({
        total: totalSections,
        currentIndex,
        setCurrentIndex,
        loop: true,
    });

    const handleCloseModal = () => setIsHelpModalOpen(false);

    const { title, images, descriptions } = helpGuideMetaDataList[currentIndex];

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            <button onClick={handleCloseModal} className='absolute left-4 top-4'>
                <X size={32} className='text-main hover:text-primary' />
            </button>
            <div className='w-full max-w-3xl rounded-2xl bg-background p-6 shadow-xl'>
                {/* Modal-header */}
                <div className='mb-3 flex items-start justify-between'>
                    <h2 className='font-title text-xl font-bold text-foreground'>
                        {title} ({currentIndex + 1}/{totalSections})
                    </h2>
                    <span className='self-end text-xs text-muted'>ESC / ← → Move</span>
                </div>
                {/* Desc about velogit system (Img + Text) */}
                <div className='flex flex-col items-center gap-6'>
                    <div className='flex flex-wrap justify-center gap-4'>
                        {images.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt={`${title}-img-${idx}`}
                                className='h-60 w-60 rounded-lg border border-border bg-background-second object-contain object-center shadow transition-transform ease-in-out hover:scale-110 active:scale-110'
                            />
                        ))}
                    </div>
                    <div className='flex max-w-2xl flex-col gap-2 text-center'>
                        {descriptions.map((desc, idx) => (
                            <p key={idx} className='text-muted'>
                                {desc}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Help sections pagination */}
                <div className='mt-6 flex justify-center gap-2'>
                    {helpGuideMetaDataList.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={clsx(
                                'h-3 w-3 rounded-full border hover:bg-primary-light',
                                idx === currentIndex
                                    ? 'border-primary bg-primary'
                                    : 'border-border bg-background-second',
                            )}
                            title={`${idx + 1}번 섹션 보기`}
                        />
                    ))}
                </div>

                {/* Modal-footer */}
                <div className='mt-4 text-center'>
                    <button
                        className='h-9 w-full rounded-md border border-border bg-backgroundDark px-3 py-1 text-sm text-foreground hover:bg-backgroundDark/70 active:bg-backgroundDark/70'
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HelpModal;
