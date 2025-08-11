import { useArrowIndexNavigation } from '@/hooks/useArrowIndexNavigation';
import { useEscapeToCloseModal } from '@/hooks/useEscapeToCloseModal';
import { useKoreanSpellCheckMutation } from '@/services/spellCheck.queries';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { copyCorrectedTextToClipboard, getHighlightedFragments, mapKoChange } from '@/utils/write';
import { CircularProgress } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { Copy, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

interface KoreanSpellCheckModalProps {
    setIsKoreanModalOpen: (open: boolean) => void;
}

const KoreanSpellCheckModal = ({ setIsKoreanModalOpen }: KoreanSpellCheckModalProps) => {
    const { content: globalContent } = usePostWriteStore();

    const [customText, setCustomText] = useState('');
    const [snapshotText, setSnapshotText] = useState('');
    const [result, setResult] = useState<KoreanSpellCheckResponse | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const { mutateAsync: koreanSpellCheck, isPending } = useKoreanSpellCheckMutation();

    const liveInput = customText || globalContent;
    const changes = (result?.changes ?? []) as KoChange[];
    const total = changes.length;
    const current = total ? changes[currentIndex] : undefined;

    useArrowIndexNavigation({
        enabled: true,
        total,
        currentIndex,
        setCurrentIndex,
        loop: false,
    });

    useEscapeToCloseModal(() => setIsKoreanModalOpen(false));

    const correctedText = useMemo(() => {
        if (!result) return '';
        return result.corrected ?? '';
    }, [result]);

    const handleCloseModal = () => {
        setIsKoreanModalOpen(false);
    };

    const inferOp = (c: KoChange): 'insert' | 'delete' | 'replace' => {
        if (!c.from && c.to) return 'insert';
        if (c.from && !c.to) return 'delete';
        return 'replace';
    };

    const handleKoreanSpellCheck = async () => {
        if (!liveInput) return toast.info('내용을 입력해주세요.');
        const res = await koreanSpellCheck({ content: liveInput });
        setSnapshotText(liveInput);
        setResult(res);
        setCurrentIndex(0);
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            <button onClick={handleCloseModal} className='absolute left-4 top-4'>
                <X size={32} className='text-main hover:text-primary' />
            </button>
            <div className='w-full max-w-6xl rounded-2xl bg-background p-6 shadow-xl'>
                <div className='mb-3 flex items-start justify-between'>
                    <h2 className='font-title text-xl font-bold text-foreground'>
                        한국어 AI 교정&nbsp;&#40;Beta ver..&#41;
                    </h2>
                    <div className='flex flex-col gap-1'>
                        <a
                            href='https://huggingface.co/Soyoung97/gec_kr'
                            className='text-sm text-muted underline decoration-dotted hover:text-primary hover:decoration-solid'
                        >
                            Model - Soyoung97 &#40;gec_kr&#41;
                        </a>
                        <span className='self-end text-xs text-muted'>ESC to close</span>
                    </div>
                </div>

                {/* 버튼 영역 */}
                <div className='mb-4 flex flex-wrap items-center gap-4'>
                    <button
                        onClick={handleKoreanSpellCheck}
                        disabled={isPending}
                        className='flex items-center justify-center rounded-md bg-primary px-4 py-2 text-main hover:bg-primary-deep disabled:opacity-50'
                    >
                        {isPending ? (
                            <CircularProgress
                                size={16}
                                sx={theme => ({ color: theme.palette.primary.contrastText })}
                            />
                        ) : (
                            '검사하기'
                        )}
                    </button>

                    {correctedText && (
                        <>
                            <button
                                onClick={() => copyCorrectedTextToClipboard(correctedText, 'Ko')}
                                className='flex items-center gap-1 rounded-md border border-border bg-backgroundDark px-3 py-2 text-sm text-foreground hover:bg-backgroundDark/70'
                            >
                                <Copy size={16} />
                                교정문 복사하기
                            </button>
                            <span className='text-sm text-muted'>
                                {total ? `${currentIndex + 1}/${total}` : '0/0'}
                            </span>
                        </>
                    )}

                    {typeof result?.time === 'number' && (
                        <span className='text-sm text-muted'>소요시간: {result.time}ms</span>
                    )}
                </div>

                {/* 입력 */}
                <textarea
                    placeholder='교정할 텍스트를 입력하세요. (미입력 시 에디터 내용 사용)'
                    value={customText}
                    onChange={e => setCustomText(e.target.value)}
                    className='mb-6 h-32 w-full resize-none rounded-md border border-border bg-background-second p-4 text-sm text-foreground focus:outline-none'
                />

                {/* 원문(하이라이트) vs 교정문 — 스냅샷 기준 표시 */}
                <div className='mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2'>
                    <div className='max-h-[260px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-background-second p-4 text-foreground'>
                        {result
                            ? getHighlightedFragments(
                                  snapshotText || result.original,
                                  changes,
                                  currentIndex,
                                  mapKoChange,
                              )
                            : liveInput || '입력 대기…'}
                    </div>
                    <div className='max-h-[260px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-background-second p-4 text-foreground'>
                        {correctedText || '교정 결과가 여기에 표시됩니다.'}
                    </div>
                </div>

                {/* 변경 카드 (prev/next + 애니메이션) */}
                <div className='flex items-center justify-between gap-4'>
                    <button
                        disabled={currentIndex === 0}
                        onClick={() => setCurrentIndex(i => i - 1)}
                        className='text-sm disabled:opacity-30'
                        aria-label='Previous change'
                    >
                        <ChevronLeft className='text-foreground' />
                    </button>

                    <AnimatePresence mode='wait'>
                        {current ? (
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
                                <div className='mb-2 font-semibold'>
                                    ⚠️ {inferOp(current).toUpperCase()}
                                </div>
                                <div className='mb-1 text-slate-800'>
                                    원문:{' '}
                                    <span className='bg-yellow-50 p-1 font-mono'>
                                        {current.from || '∅'}
                                    </span>
                                </div>
                                <div className='mb-1 text-slate-800'>
                                    수정:{' '}
                                    <span className='bg-blue-50 p-1 font-mono'>
                                        {current.to || '∅'}
                                    </span>
                                </div>
                                <div className='text-xs text-slate-800'>
                                    위치: offset {current.offset}, length {current.length}
                                </div>
                            </motion.div>
                        ) : (
                            <p className='text-md text-muted'>No result</p>
                        )}
                    </AnimatePresence>

                    <button
                        disabled={currentIndex === total - 1 || total === 0}
                        onClick={() => setCurrentIndex(i => i + 1)}
                        className='text-sm disabled:opacity-30'
                        aria-label='Next change'
                    >
                        <ChevronRight className='text-foreground' />
                    </button>
                </div>

                <div className='mt-6 text-right'>
                    <button
                        onClick={handleCloseModal}
                        className='text-md rounded-md border border-primary bg-primary px-4 py-1.5 text-main shadow transition-all hover:bg-primary-deep hover:shadow-md'
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KoreanSpellCheckModal;
