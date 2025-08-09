import { DRAFT_STORAGE_KEY } from '@/constants/draft.constants';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface TempDraftsModalProps {
    savedTempDrafts: TempPost[];
    setSavedTempDrafts: React.Dispatch<React.SetStateAction<TempPost[]>>;
    setIsTempDraftsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TempDraftsModal = ({
    savedTempDrafts,
    setSavedTempDrafts,
    setIsTempDraftsModalOpen,
}: TempDraftsModalProps) => {
    const { restoreFastDraftsFromLocal, setField } = usePostWriteStore();

    useEffect(() => {
        const closeModal = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsTempDraftsModalOpen(false);
        };
        window.addEventListener('keydown', closeModal);
        return () => window.removeEventListener('keydown', closeModal);
    }, []);

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
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            <button
                onClick={() => setIsTempDraftsModalOpen(false)}
                className='absolute left-4 top-4'
            >
                <X size={32} className='text-main hover:text-primary' />
            </button>
            <div className='w-full max-w-md rounded-2xl bg-background p-6 shadow-xl'>
                <h2 className='mb-4 font-title text-xl font-semibold text-foreground'>
                    Saved Drafts
                </h2>
                <p className='text-right text-xs text-muted'>ESC to close</p>

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
                                                setField('title', draft.data.title);
                                                setField('date', draft.data.date);
                                                setField('tags', draft.data.tags);
                                                setField('summary', draft.data.summary);
                                                setField('thumbnail', draft.data.thumbnail);
                                                setField('category', draft.data.category);
                                                setField('content', draft.data.content);
                                                setIsTempDraftsModalOpen(false);
                                            }}
                                            className='rounded-md border border-primary bg-primary px-3 py-1 text-sm text-main hover:bg-primary-deep active:bg-primary-deep'
                                        >
                                            Restore
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm('Do you want to remove Temp-Draft?'))
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
                        onClick={() => setIsTempDraftsModalOpen(false)}
                    >
                        Close
                    </button>
                    <button
                        className='h-8 w-20 rounded-md border border-error bg-error px-3 py-1 text-sm text-main hover:bg-error/70 active:bg-error/70'
                        onClick={async () => {
                            await localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify([]));
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
    );
};

export default TempDraftsModal;
