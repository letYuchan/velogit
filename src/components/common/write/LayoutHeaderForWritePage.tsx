import { DRAFT_STORAGE_KEY } from '@/constants/draft.constants';
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

    const removeDraft = (idx: number) => {
        const existingDraftsJson = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (existingDraftsJson === null) {
            return;
        }
        const parsedExistingDrafts = JSON.parse(existingDraftsJson);
        parsedExistingDrafts.splice(idx, 1);
        const updatedDraftsJson = JSON.stringify(parsedExistingDrafts);
        localStorage.setItem(DRAFT_STORAGE_KEY, updatedDraftsJson);

        const updatedArray = restoreFastDraftsFromLocal();
        setSavedTempDrafts(updatedArray);
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
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
                    <div className='w-full max-w-md rounded-sm bg-background p-6 shadow-xl'>
                        <h2 className='mb-4 font-title text-xl font-semibold text-foreground'>
                            Saved Drafts
                        </h2>
                        <ul className='space-y-3'>
                            {savedTempDrafts.length > 0 ? (
                                savedTempDrafts.map((draft, idx) => (
                                    <li
                                        key={draft.id}
                                        className='flex flex-col rounded-md border border-border p-3 hover:bg-backgroundDark/70 active:bg-backgroundDark/70'
                                    >
                                        <div className='mb-1 flex flex-nowrap items-center justify-between gap-1'>
                                            <span className='text-sm font-semibold text-foreground'>
                                                {draft.data.title?.trim() || 'No title'}
                                            </span>
                                            <div className='flex flex-nowrap gap-1'>
                                                <button
                                                    onClick={() => {
                                                        restoreFastDraftsFromLocal();
                                                        setShowModal(false);
                                                    }}
                                                    className='rounded-md border border-primary bg-primary px-3 py-1 text-sm text-main hover:bg-primary-deep active:bg-primary-deep'
                                                >
                                                    Restore
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        removeDraft(idx);
                                                    }}
                                                    className='rounded-md border border-error bg-error px-3 py-1 text-sm text-main hover:bg-error/70 active:bg-error/70'
                                                >
                                                    Init
                                                </button>
                                            </div>
                                        </div>
                                        <span className='text-xs text-muted'>
                                            {new Date(draft.id).toLocaleString()}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li className='text-sm text-muted'>No drafts available.</li>
                            )}
                        </ul>
                        <div className='mt-6 flex w-full flex-nowrap items-center justify-between gap-2'>
                            <button
                                className='h-8 w-20 rounded-md border border-borderDark bg-backgroundDark px-3 py-1 text-sm text-foreground hover:bg-backgroundDark/70 active:bg-backgroundDark/70'
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className='h-8 w-20 rounded-md border border-error bg-error px-3 py-1 text-sm text-main hover:bg-error/70 active:bg-error/70'
                                onClick={async () => {
                                    await localStorage.setItem(
                                        DRAFT_STORAGE_KEY,
                                        JSON.stringify([]),
                                    );
                                    const emptyArray = await restoreFastDraftsFromLocal();
                                    setSavedTempDrafts(emptyArray);
                                    alert('remove all drafts successfully');
                                }}
                            >
                                ALL init
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LayoutHeaderForWritePage;
