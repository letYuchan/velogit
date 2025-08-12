import TempDraftsModal from '@/components/write/TempDraftsModal';
import { useIsMobile } from '@/hooks/useIsMobile';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { useEffect, useState } from 'react';
import { MdArrowBack, MdSave, MdRestore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const LayoutHeaderForWritePage = () => {
    const { reset, saveDraftToLocal, restoreFastDraftsFromLocal } = usePostWriteStore();

    const [isTempDraftsModalOpen, setIsTempDraftsModalOpen] = useState(false);
    const [savedTempDrafts, setSavedTempDrafts] = useState<TempPost[]>([]);

    const navigation = useNavigate();
    const isMobile = useIsMobile();

    const goToBack = () => {
        if (confirm('Are you sure you want to go back to home?')) {
            reset();
            navigation('/');
        }
    };

    useEffect(() => {
        const parsedTempDrafts = restoreFastDraftsFromLocal();
        if (parsedTempDrafts) {
            setSavedTempDrafts(parsedTempDrafts);
        }
    }, []);

    return (
        <>
            <header className='fixed left-0 top-0 z-50 flex h-16 w-full flex-nowrap justify-between gap-1 border-b border-border bg-background p-5 shadow-sm sm:h-[70px]'>
                {/* controller */}
                <button
                    onClick={goToBack}
                    className='flex h-6 flex-nowrap items-center gap-1 rounded-full border border-borderDark bg-background-second px-3 py-1 text-lg font-semibold text-foreground transition-all duration-150 ease-in-out hover:bg-background-second/50 active:bg-background-second/50 sm:h-8 sm:text-xl'
                >
                    <MdArrowBack className='size-6' />
                    {!isMobile && <span className='relative top-0.5'>BACK</span>}
                </button>
                <div className='flex flex-nowrap items-stretch justify-around gap-2'>
                    <button
                        onClick={() => setIsTempDraftsModalOpen(true)}
                        className='flex h-6 flex-nowrap items-center gap-1 rounded-full border border-borderDark bg-background-second px-3 py-1 text-lg font-semibold text-foreground transition-all duration-150 ease-in-out hover:bg-background-second/50 active:bg-background-second/50 sm:h-8 sm:text-xl'
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
            {isTempDraftsModalOpen && (
                <TempDraftsModal
                    savedTempDrafts={savedTempDrafts}
                    setSavedTempDrafts={setSavedTempDrafts}
                    setIsTempDraftsModalOpen={setIsTempDraftsModalOpen}
                />
            )}
        </>
    );
};

export default LayoutHeaderForWritePage;

/**
 * LayoutHeaderForWritePage
 * ------------------------
 * 기능:
 * - 글 작성 페이지 상단 고정 헤더 제공
 * - 홈으로 돌아가기, 임시 저장, 임시 저장 불러오기(복원) 기능 포함
 * - 모바일/데스크톱 환경에 따라 버튼 레이블 노출 여부 변경
 *
 * 전역 상태 (usePostWriteStore):
 * - reset(): 작성 중인 모든 데이터 초기화
 * - saveDraftToLocal(): 현재 작성 내용을 로컬스토리지에 임시 저장
 * - restoreFastDraftsFromLocal(): 로컬스토리지에서 임시 저장된 데이터 즉시 불러오기
 *
 * 로컬 상태:
 * - isTempDraftsModalOpen: boolean → 임시 저장 목록 모달 열림 여부
 * - savedTempDrafts: TempPost[] → 로컬에서 불러온 임시 저장 목록
 *
 * 훅:
 * - useNavigate(): 페이지 이동 제어
 * - useIsMobile(): 현재 뷰포트가 모바일인지 여부
 * - useEffect():
 *   1) 컴포넌트 마운트 시 restoreFastDraftsFromLocal() 실행
 *   2) 로컬에 저장된 임시 초안이 있으면 savedTempDrafts 상태에 반영
 *
 * 주요 함수:
 * - goToBack():
 *   → confirm 창 확인 시 reset() 실행 후 홈('/')으로 이동
 * - SAVE DRAFT 클릭:
 *   1) saveDraftToLocal() 실행
 *   2) restoreFastDraftsFromLocal() 재호출하여 최신 초안을 savedTempDrafts에 즉시 반영
 *
 * UI 구성:
 * 1) 헤더 영역(header):
 *    - fixed 상단 고정, 좌측 BACK 버튼, 우측 RESTORE/SAVE DRAFT 버튼 그룹
 *    - BACK 버튼:
 *      - 아이콘: MdArrowBack
 *      - 모바일: 아이콘만 표시
 *      - 데스크톱: 아이콘 + "BACK" 텍스트
 *    - RESTORE 버튼:
 *      - 아이콘: MdRestore
 *      - 클릭 시 isTempDraftsModalOpen = true
 *    - SAVE DRAFT 버튼:
 *      - 아이콘: MdSave
 *      - 클릭 시 현재 작성 내용 로컬 저장 후 목록 갱신
 *
 * 2) 모달(TempDraftsModal):
 *    - isTempDraftsModalOpen이 true일 때만 렌더링
 *    - props:
 *      - savedTempDrafts: 현재 저장된 임시 초안 목록
 *      - setSavedTempDrafts: 목록 상태 업데이트 함수
 *      - setIsTempDraftsModalOpen: 모달 열림/닫힘 상태 제어
 *
 * 동작 흐름:
 * 1) 페이지 진입 시 로컬 임시 저장 목록 불러오기
 * 2) BACK 클릭 시 작성 데이터 초기화 후 홈으로 이동
 * 3) RESTORE 클릭 시 임시 저장 목록 모달 표시
 * 4) SAVE DRAFT 클릭 시 로컬 저장 및 목록 즉시 갱신
 */
