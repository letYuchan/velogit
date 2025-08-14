import { DRAFT_STORAGE_KEY } from '@/constants/write';
import { useEscapeToCloseModal } from '@/hooks/useEscapeToCloseModal';
import { useIsMobile } from '@/hooks/useIsMobile';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { X } from 'lucide-react';

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

    const isMobile = useIsMobile();
    useEscapeToCloseModal(() => setIsTempDraftsModalOpen(false));

    const handleCloseModal = () => {
        setIsTempDraftsModalOpen(false);
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
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            {!isMobile && (
                <button onClick={handleCloseModal} className='absolute left-4 top-4'>
                    <X size={32} className='text-main hover:text-primary' />
                </button>
            )}
            <div className='w-full max-w-md rounded-2xl bg-background p-6 shadow-xl'>
                {/* Modal-header */}
                <div className='mb-3 flex items-start justify-between'>
                    <h2 className='font-title text-xl font-bold text-foreground'>Saved Drafts</h2>
                    {!isMobile && <span className='text-xs text-muted'>ESC to close</span>}
                </div>
                {/* Temp Posts */}
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
                {/* Modal-footer */}
                <div className='mt-6 flex w-full flex-nowrap items-center justify-between gap-2'>
                    <button
                        className='h-9 w-20 rounded-md border border-borderDark bg-backgroundDark px-3 py-1 text-sm text-foreground hover:bg-primary hover:text-main active:bg-primary active:text-main'
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                    <button
                        className='h-9 w-20 rounded-md border border-error bg-error px-3 py-1 text-sm text-main hover:bg-error/70 active:bg-error/70'
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

/**
 * TempDraftsModal
 * -----------------
 * 기능:
 * - 임시 저장된 포스트(Temp Drafts) 목록을 표시하는 모달 UI
 * - 각 Draft 복원(Restore), 개별 삭제(Init), 전체 삭제(ALL init) 가능
 *
 * props (TempDraftsModalProps):
 * - savedTempDrafts: 현재 상태에 저장된 임시 Draft 배열
 * - setSavedTempDrafts: Draft 배열 상태 업데이트 함수
 * - setIsTempDraftsModalOpen: 모달 열림/닫힘 상태 업데이트 함수
 *
 * 사용 훅:
 * - useEscapeToCloseModal: ESC 키 입력 시 모달 닫기
 * - usePostWriteStore: 포스트 작성 전역 상태(Zustand)
 *   - restoreFastDraftsFromLocal(): localStorage에서 Draft 목록 불러오기
 *   - setField(): 특정 필드 값 업데이트
 *
 * 주요 함수:
 * - handleCloseModal():
 *   - 모달 닫기
 *
 * - removeDraft(idx):
 *   - localStorage에서 해당 index의 Draft 제거
 *   - 상태(savedTempDrafts) 갱신
 *
 * 동작 흐름:
 * 1) 모달은 화면 중앙에 표시되며, 배경은 반투명 검은색 오버레이
 * 2) 각 Draft 항목:
 *    - 제목 (없으면 "No title")
 *    - 저장 시간 표시
 *    - Restore 버튼:
 *      - Draft 데이터를 전역 상태(usePostWriteStore)에 복원
 *      - 모달 닫기
 *    - Init 버튼:
 *      - 해당 Draft만 삭제
 * 3) 하단 버튼:
 *    - Close: 모달 닫기
 *    - ALL init: 모든 Draft 삭제
 *
 * 스타일:
 * - TailwindCSS 기반 레이아웃 및 색상
 * - hover/active 시 배경색 변환
 */
