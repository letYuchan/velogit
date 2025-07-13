import { DRAFT_STORAGE_KEY } from '@/constants/draft.constants';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { useEffect, useState } from 'react';
import { MdArrowBack, MdSave, MdRestore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const LayoutHeaderForWritePage = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
    const [showModal, setShowModal] = useState(false);
    const [savedTempDrafts, setSavedTempDrafts] = useState<TempPost[]>([]);
    const {
        reset,
        setField,
        saveDraftToLocal,
        restoreFastDraftsFromLocal,
        title,
        date,
        tags,
        summary,
        thumbnail,
        category,
        content,
    } = usePostWriteStore();

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
                    className='flex h-6 flex-nowrap items-center gap-1 rounded-2xl border border-border bg-background px-3 py-1 text-lg font-semibold text-foreground transition-all duration-150 ease-in-out hover:bg-gray-100 active:bg-gray-100 sm:h-8 sm:text-xl'
                >
                    <MdArrowBack className='size-6' />
                    {!isMobile && <span className='relative top-0.5'>BACK</span>}
                </button>

                <div className='flex flex-nowrap items-stretch justify-around gap-2'>
                    <button
                        onClick={() => setShowModal(true)}
                        className='flex h-6 flex-nowrap items-center gap-1 rounded-2xl border border-border bg-background px-3 py-1 text-lg font-semibold text-foreground transition-all duration-150 ease-in-out hover:bg-gray-100 active:bg-gray-100 sm:h-8 sm:text-xl'
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
                        className='flex h-6 flex-nowrap items-center gap-1 rounded-2xl border border-primary bg-primary px-3 py-1 text-lg font-semibold text-white transition-all duration-150 ease-in-out hover:bg-blue-700 active:bg-blue-700 sm:h-8 sm:text-xl'
                    >
                        <MdSave className='size-6' />
                        {!isMobile && <span className='relative top-0.5'>SAVE DRAFT</span>}
                    </button>
                </div>
            </header>
            {/* TempDrafts modal */}
            {showModal && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
                    <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-xl'>
                        <h2 className='mb-4 font-title text-xl font-semibold'>Saved Drafts</h2>
                        <ul className='space-y-3'>
                            {savedTempDrafts.length > 0 ? (
                                savedTempDrafts.map(draft => (
                                    <li
                                        key={draft.id}
                                        className='flex flex-col rounded-xl border border-border p-3 hover:bg-gray-100'
                                    >
                                        <div className='mb-1 flex flex-nowrap items-center justify-between gap-1'>
                                            <span className='text-sm font-semibold text-foreground'>
                                                {draft.data.title?.trim() || 'No title'}
                                            </span>
                                            <button
                                                onClick={() => {
                                                    restoreFastDraftsFromLocal();
                                                    setShowModal(false);
                                                }}
                                                className='rounded-xl border border-primary bg-primary px-3 py-1 text-sm text-white hover:bg-blue-700 active:bg-blue-700'
                                            >
                                                Restore
                                            </button>
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
                                className='h-8 rounded-xl bg-muted px-3 py-1 text-sm text-white hover:bg-muted/70 active:bg-muted/70'
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className='active:bg-error-70 h-8 rounded-xl bg-error px-4 py-2 text-sm text-white hover:bg-error/70'
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
                                Init
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LayoutHeaderForWritePage;
