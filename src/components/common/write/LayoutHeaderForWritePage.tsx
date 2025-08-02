import TempDraftsModal from '@/components/common/write/TempDraftsModal';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { useEffect, useState } from 'react';
import { MdArrowBack, MdSave, MdRestore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const LayoutHeaderForWritePage = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
    const [showModal, setShowModal] = useState(false);
    const [savedTempDrafts, setSavedTempDrafts] = useState<TempPost[]>([]);
    const { reset, saveDraftToLocal, restoreFastDraftsFromLocal } = usePostWriteStore();

    const navigation = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const parsedTempDrafts = restoreFastDraftsFromLocal();
        if (parsedTempDrafts) {
            setSavedTempDrafts(parsedTempDrafts);
        }
    }, []);

    useEffect(() => {
        const handleEscKeyForClosingModal = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return;
            console.log('event occur');
            e.preventDefault();
            if (showModal === true && e.key === 'Escape') {
                setShowModal(false);
            }
        };

        window.addEventListener('keydown', handleEscKeyForClosingModal);
        return () => {
            window.removeEventListener('keydown', handleEscKeyForClosingModal);
        };
    }, [showModal]);

    const goToBack = () => {
        if (confirm('Are you sure you want to go back to home?')) {
            reset();
            navigation('/');
        }
    };

    return (
        <>
            <header className='fixed left-0 top-0 z-50 flex h-16 w-full flex-nowrap justify-between gap-1 border-b border-border bg-background p-5 shadow-sm sm:h-[70px]'>
                {/* controller */}
                <button
                    onClick={goToBack}
                    className='flex h-6 flex-nowrap items-center gap-1 rounded-full border border-borderDark bg-background-second px-3 py-1 text-lg font-semibold text-foreground transition-all duration-150 ease-in-out hover:bg-background-second/70 active:bg-background-second/70 sm:h-8 sm:text-xl'
                >
                    <MdArrowBack className='size-6' />
                    {!isMobile && <span className='relative top-0.5'>BACK</span>}
                </button>
                <div className='flex flex-nowrap items-stretch justify-around gap-2'>
                    <button
                        onClick={() => setShowModal(true)}
                        className='flex h-6 flex-nowrap items-center gap-1 rounded-full border border-borderDark bg-background-second px-3 py-1 text-lg font-semibold text-foreground transition-all duration-150 ease-in-out hover:bg-background-second/70 active:bg-background-second/70 sm:h-8 sm:text-xl'
                    >
                        <MdRestore className='size-6' />
                        {!isMobile && <span className='relative top-0.5'>RESTORE</span>}
                    </button>

                    <button
                        onClick={async () => {
                            await saveDraftToLocal();
                            const tempDrafts = await restoreFastDraftsFromLocal(); // 단순히 저장하는것뿐만 아니라 즉각적으로 modal에 최신 저장 draft 반영
                            setSavedTempDrafts(tempDrafts);
                        }}
                        className='flex h-6 flex-nowrap items-center gap-1 rounded-full border border-primary bg-primary px-3 py-1 text-lg font-semibold text-main transition-all duration-150 ease-in-out hover:bg-primary-deep active:bg-primary-deep sm:h-8 sm:text-xl'
                    >
                        <MdSave className='size-6' />
                        {!isMobile && <span className='relative top-0.5'>SAVE DRAFT</span>}
                    </button>
                </div>
            </header>
            {/* TempDrafts modal */}
            {showModal && (
                <TempDraftsModal
                    savedTempDrafts={savedTempDrafts}
                    setSavedTempDrafts={setSavedTempDrafts}
                    setShowModal={setShowModal}
                />
            )}
        </>
    );
};

export default LayoutHeaderForWritePage;
