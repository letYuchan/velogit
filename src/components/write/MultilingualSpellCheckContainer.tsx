import {
    useGetAllAvailableLanguagesQuery,
    useMultilingualSpellCheckMutation,
} from '@/services/spellCheck.queries';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { Globe, Copy, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEscapeToCloseModal } from '@/hooks/useEscapeToCloseModal';
import { useArrowIndexNavigation } from '@/hooks/useArrowIndexNavigation';
import {
    copyCorrectedTextToClipboard,
    getHighlightedFragments,
    mapLanguageToolMatch,
} from '@/utils/write';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { validLanguageToolCodes } from '@/data/write';
import { useIsMobile } from '@/hooks/useIsMobile';

interface MultilingualSpellCheckModalProps {
    setIsMultilingualModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MultilingualSpellCheckModal = ({
    setIsMultilingualModalOpen,
}: MultilingualSpellCheckModalProps) => {
    const { content: globalContent } = usePostWriteStore();

    const [selectedLanguage, setSelectedLanguage] = useState('auto');
    const [customText, setCustomText] = useState('');
    const [spellMatches, setSpellMatches] = useState<Match[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [snapshotText, setSnapshotText] = useState<string>('');

    const { data: languageList, refetch } = useGetAllAvailableLanguagesQuery();
    const { mutateAsync: multilingualSpellCheck, isPending } = useMultilingualSpellCheckMutation();

    const liveInput = customText || globalContent;
    const total = spellMatches.length;
    const currentMatch = total > 0 ? spellMatches[currentIndex] : undefined;

    const isMobile = useIsMobile();
    useEscapeToCloseModal(() => setIsMultilingualModalOpen(false));
    useArrowIndexNavigation({
        enabled: true,
        total,
        currentIndex,
        setCurrentIndex,
        loop: false,
    });

    const correctedText = useMemo(() => {
        if (!spellMatches.length || !snapshotText) return snapshotText;
        const sorted = [...spellMatches].sort((a, b) => a.offset - b.offset);
        let out = '';
        let last = 0;
        for (const m of sorted) {
            const { offset, length, replacements } = m;
            out += snapshotText.slice(last, offset);
            out += replacements?.[0]?.value ?? snapshotText.slice(offset, offset + length);
            last = offset + length;
        }
        out += snapshotText.slice(last);
        return out;
    }, [snapshotText, spellMatches]);

    const handleCloseModal = () => {
        setIsMultilingualModalOpen(false);
    };

    const handleMultilingualSpellCheck = async () => {
        const base = liveInput.trim();
        if (!base) return toast.info('Write content first');

        if (!validLanguageToolCodes.includes(selectedLanguage as LanguageToolCode)) {
            alert('Invalid language. Please select a valid one');
            await refetch();
            return;
        }

        setSnapshotText(base);
        const result = await multilingualSpellCheck({
            text: base,
            language: selectedLanguage as LanguageToolCode,
        });

        setSpellMatches(result.matches ?? []);
        setCurrentIndex(0);
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            {!isMobile && (
                <button onClick={handleCloseModal} className='absolute left-4 top-4'>
                    <X size={32} className='text-main hover:text-primary' />
                </button>
            )}
            <div className='w-full max-w-6xl rounded-2xl bg-background p-6 shadow-xl'>
                {/* Modal-header */}
                <div className='mb-3 flex items-start justify-between'>
                    <h2 className='font-title text-xl font-bold text-foreground'>AI Spell Check</h2>
                    <div className='flex flex-col gap-1'>
                        <a
                            href='https://languagetool.org/'
                            className='text-sm text-muted underline decoration-dotted hover:text-primary hover:decoration-solid'
                        >
                            LanguageTool
                        </a>
                        <span className='self-end text-xs text-muted'>ESC to close</span>
                    </div>
                </div>
                {/* Language & Check */}
                <div className='mb-4 flex flex-wrap items-center gap-4'>
                    <div className='relative inline-block w-48'>
                        <select
                            value={selectedLanguage}
                            onChange={e => setSelectedLanguage(e.target.value)}
                            className='w-full appearance-none rounded-md border border-border bg-background px-4 py-2 pr-10 text-base text-foreground'
                        >
                            <option value='auto'>Auto</option>
                            {languageList?.map(({ name, longCode }) => (
                                <option key={longCode} value={longCode}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted'>
                            <Globe />
                        </div>
                    </div>

                    <button
                        onClick={handleMultilingualSpellCheck}
                        className='flex items-center justify-center rounded-md bg-primary px-4 py-2 text-main hover:bg-primary/80 disabled:opacity-50'
                        disabled={isPending}
                    >
                        {isPending ? (
                            <CircularProgress
                                size={16}
                                sx={theme => ({ color: theme.palette.primary.contrastText })}
                            />
                        ) : (
                            'check'
                        )}
                    </button>

                    {spellMatches.length > 0 && (
                        <>
                            <button
                                onClick={() => copyCorrectedTextToClipboard(correctedText, 'Eng')}
                                className='flex items-center gap-1 rounded-md border border-border bg-backgroundDark px-3 py-2 text-sm text-foreground hover:bg-backgroundDark/70'
                            >
                                <Copy size={16} /> Copy corrected text
                            </button>
                            <span className='text-sm text-muted'>
                                {currentIndex + 1}/{total}
                            </span>
                        </>
                    )}
                </div>

                {/* Custom input field (검사 전용 입력) */}
                <textarea
                    placeholder='You can write or paste text here for spell check...'
                    value={customText}
                    onChange={e => setCustomText(e.target.value)}
                    className='mb-6 h-32 w-full resize-none rounded-md border border-border bg-background-second p-4 text-sm text-foreground focus:outline-none'
                />

                {/* Highlighted (snapshot) & Corrected (snapshot) */}
                <div className='mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2'>
                    <div className='max-h-[260px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-background-second p-4 text-foreground'>
                        {snapshotText
                            ? getHighlightedFragments(
                                  snapshotText,
                                  spellMatches,
                                  currentIndex,
                                  mapLanguageToolMatch,
                              )
                            : liveInput || 'Waiting for input…'}
                    </div>
                    <div className='max-h-[260px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-background-second p-4 text-foreground'>
                        {snapshotText ? correctedText : 'The corrected result will appear here.'}
                    </div>
                </div>

                {/* Suggestion card with index nav */}
                <div className='flex items-center justify-between gap-4'>
                    <button
                        disabled={currentIndex === 0}
                        onClick={() => setCurrentIndex(i => i - 1)}
                        className='text-sm disabled:opacity-30'
                        aria-label='Previous suggestion'
                    >
                        <ChevronLeft className='text-foreground' />
                    </button>

                    <AnimatePresence mode='wait'>
                        {currentMatch ? (
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className='flex-1 rounded-md border border-yellow-500 bg-yellow-100 p-4 text-yellow-900 shadow-sm'
                            >
                                <div className='mb-1 text-xs opacity-70'>
                                    {currentIndex + 1} / {total}
                                </div>
                                <div className='mb-2 font-semibold'>⚠️ {currentMatch.message}</div>
                                {currentMatch.sentence && (
                                    <div className='mb-2 text-slate-800'>
                                        <span className='bg-yellow-50 p-1 font-mono'>
                                            {currentMatch.sentence}
                                        </span>
                                    </div>
                                )}
                                {currentMatch.replacements?.length > 0 && (
                                    <div className='flex flex-wrap gap-2 text-blue-700'>
                                        Suggestions:
                                        {currentMatch.replacements.slice(0, 8).map((r, i) => (
                                            <span
                                                key={i}
                                                className='rounded bg-blue-100 px-2 py-1 text-xs'
                                            >
                                                {r.value}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <p className='text-md text-muted'>No result</p>
                        )}
                    </AnimatePresence>

                    <button
                        disabled={currentIndex === total - 1 || total === 0}
                        onClick={() => setCurrentIndex(i => i + 1)}
                        className='text-sm disabled:opacity-30'
                        aria-label='Next suggestion'
                    >
                        <ChevronRight className='text-foreground' />
                    </button>
                </div>

                <div className='mt-6 text-right'>
                    <button
                        onClick={handleCloseModal}
                        className='h-9 w-20 rounded-md border border-borderDark bg-backgroundDark px-3 py-1 text-sm text-foreground hover:bg-primary hover:text-main active:bg-primary active:text-main'
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MultilingualSpellCheckModal;

/**
 * MultilingualSpellCheckModal
 * ---------------------------
 * 기능:
 * - 여러 언어에 대한 맞춤법/문법 검사 기능 제공 (LanguageTool API 기반)
 * - 입력 또는 에디터 내용을 검사하고, 원문과 교정문 비교 표시
 * - 제안(Suggestion) 목록을 Prev/Next로 탐색 가능
 *
 * props (MultilingualSpellCheckModalProps):
 * - setIsMultilingualModalOpen: React.Dispatch<React.SetStateAction<boolean>>
 *   → 모달 열림/닫힘 상태 제어
 *
 * 전역 상태 (usePostWriteStore):
 * - content: string → 현재 작성 중인 에디터 내용 (customText 미입력 시 사용)
 *
 * 로컬 상태:
 * - selectedLanguage: string → 검사 대상 언어 코드 (기본값 'auto')
 * - customText: string → 검사 대상 사용자 입력 텍스트
 * - spellMatches: Match[] → LanguageTool API에서 반환한 문법/맞춤법 오류 목록
 * - currentIndex: number → 현재 선택된 오류 항목 인덱스
 * - snapshotText: string → 검사 시점의 원문 저장
 *
 * 훅:
 * - useGetAllAvailableLanguagesQuery(): 지원 가능한 언어 목록 조회
 * - useMultilingualSpellCheckMutation(): 맞춤법 검사 API 호출 mutation
 * - useEscapeToCloseModal(): ESC 키로 모달 닫기
 * - useArrowIndexNavigation(): 방향키로 오류 항목 탐색 가능
 *
 * 파생 값:
 * - liveInput: string → customText || globalContent
 * - total: number → 오류 항목 개수
 * - currentMatch: Match | undefined → 현재 선택된 오류 항목
 * - correctedText: string → 오류 항목을 교정한 전체 문장
 *   - spellMatches를 offset 기준으로 정렬 후 교정어(replacements[0])로 대체
 *
 * 주요 함수:
 * - handleCloseModal(): 모달 닫기
 * - handleMultilingualSpellCheck():
 *   1) liveInput 유효성 검사
 *   2) 선택한 언어 코드 유효성 검사(validLanguageToolCodes)
 *   3) snapshotText 설정
 *   4) API 호출 후 spellMatches와 currentIndex 상태 업데이트
 *
 * UI 구성:
 * 1) 헤더:
 *    - 타이틀 "AI Spell Check"
 *    - 모델 정보(LanguageTool 링크)
 *    - ESC 안내
 *
 * 2) 언어 선택 + 검사 버튼:
 *    - select 박스: 'auto' + languageList의 longCode/이름 표시
 *    - 검사 버튼: handleMultilingualSpellCheck 실행 (로딩 시 CircularProgress)
 *    - 교정문 복사 버튼: copyCorrectedTextToClipboard(correctedText, 'Eng')
 *    - 현재 인덱스/전체 개수 표시
 *
 * 3) 사용자 입력 영역:
 *    - textarea: customText 입력
 *    - 미입력 시 globalContent 사용
 *
 * 4) 원문 vs 교정문 비교:
 *    - 좌측: snapshotText + 오류 항목 하이라이트 표시(getHighlightedFragments)
 *    - 우측: correctedText
 *    - 스크롤 가능
 *
 * 5) 오류 항목 카드:
 *    - Prev/Next 버튼: currentIndex 변경
 *    - AnimatePresence + motion으로 전환 애니메이션
 *    - 현재 항목 메시지, 오류 문장, 제안(replacements) 표시
 *
 * 6) Close 버튼:
 *    - handleCloseModal 실행
 *
 * 동작 흐름:
 * 1) 검사 버튼 클릭 → API 요청
 * 2) 응답으로 받은 오류 목록과 교정문 반영
 * 3) Prev/Next 버튼 또는 방향키로 오류 탐색
 * 4) 교정문 복사 버튼으로 전체 교정문 클립보드 복사 가능
 */
