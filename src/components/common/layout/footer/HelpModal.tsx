import { useState } from 'react';
import { useEscapeToCloseModal } from '@/hooks/useEscapeToCloseModal';
import { useArrowIndexNavigation } from '@/hooks/useArrowIndexNavigation';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { helpGuideMetaDataList } from '@/data';
import { useIsMobile } from '@/hooks/useIsMobile';

interface HelpModalProps {
    setIsHelpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HelpModal = ({ setIsHelpModalOpen }: HelpModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lang, setLang] = useState<'ko' | 'en'>('en');
    const totalSections = helpGuideMetaDataList.length;

    useEscapeToCloseModal(() => setIsHelpModalOpen(false));
    useArrowIndexNavigation({
        total: totalSections,
        currentIndex,
        setCurrentIndex,
        loop: true,
    });
    const isMobile = useIsMobile();

    const handleCloseModal = () => setIsHelpModalOpen(false);
    const handleDescriptionsLanguage = (lang: 'ko' | 'en') => setLang(lang);

    const { title, images, descriptions } = helpGuideMetaDataList[currentIndex];

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            {!isMobile && (
                <button onClick={handleCloseModal} className='absolute left-4 top-4'>
                    <X size={32} className='text-main hover:text-primary' />
                </button>
            )}
            <div className='flex h-full max-h-[90vh] w-full max-w-3xl flex-col overflow-y-auto rounded-2xl bg-background p-6 shadow-xl'>
                {/* Modal-header */}
                <div className='mb-3 flex items-start justify-between'>
                    <h2 className='font-title text-xl font-bold text-foreground'>
                        {title[lang]} ({currentIndex + 1}/{totalSections})
                    </h2>

                    {!isMobile && <span className='ml-1 text-xs text-muted'>ESC / ← → Move</span>}
                </div>
                <div className='flex h-full w-full flex-col justify-between'>
                    {/* Contents */}
                    <div className='flex w-full flex-col justify-start'>
                        <div className='mb-4 flex items-center gap-2'>
                            {/*  Language toggle */}
                            <button
                                onClick={() => handleDescriptionsLanguage('ko')}
                                className={clsx(
                                    'rounded border px-2 py-1 text-xs',
                                    lang === 'ko'
                                        ? 'border-primary bg-primary text-main'
                                        : 'border-border bg-background text-foreground hover:bg-primary-light active:bg-primary-light',
                                )}
                            >
                                한
                            </button>
                            <button
                                onClick={() => handleDescriptionsLanguage('en')}
                                className={clsx(
                                    'rounded border px-2 py-1 text-xs',
                                    lang === 'en'
                                        ? 'border-primary bg-primary text-main'
                                        : 'border-border bg-background text-foreground hover:bg-primary-light active:bg-primary-light',
                                )}
                            >
                                EN
                            </button>
                        </div>

                        {/* Desc about velogit system (Img + Text) */}
                        <div className='flex flex-col items-center gap-6'>
                            <div className='flex flex-wrap justify-center gap-4'>
                                {images.map((src, idx) => (
                                    <img
                                        key={idx}
                                        src={src}
                                        alt={`${title[lang]}-img-${idx}`}
                                        className='h-32 w-32 rounded-lg border border-border bg-background-second object-contain object-center shadow transition-transform ease-in-out hover:scale-110 active:scale-110 sm:h-60 sm:w-60'
                                    />
                                ))}
                            </div>
                            <div className='flex w-full max-w-2xl flex-col gap-2 text-center'>
                                {descriptions[lang].map((desc, idx) => (
                                    <p key={idx} className='leading-relaxed text-muted'>
                                        {desc}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='flex w-full flex-col justify-start'>
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
                                className='h-9 w-full rounded-md border border-borderDark bg-backgroundDark px-3 py-1 text-sm text-foreground hover:bg-primary hover:text-main active:bg-primary active:text-main'
                                onClick={handleCloseModal}
                            >
                                {lang === 'ko' ? '닫기' : 'Close'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpModal;
