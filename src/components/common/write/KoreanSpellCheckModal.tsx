import { useKoreanSpellCheckMutation } from '@/services/spellCheck.queries';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { AnimatePresence, motion } from 'framer-motion';
import { Copy, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';

interface KoreanSpellCheckModalProps {
    setIsKoreanModalOpen: (open: boolean) => void;
}

const KoreanSpellCheckModal = ({ setIsKoreanModalOpen }: KoreanSpellCheckModalProps) => {
    const { content: globalContent } = usePostWriteStore();
    const { mutateAsync: koreanSpellCheck, isPending } = useKoreanSpellCheckMutation();

    const [customText, setCustomText] = useState('');
    const liveInput = customText || globalContent;

    const [snapshotText, setSnapshotText] = useState('');
    const [result, setResult] = useState<KoreanSpellCheckResponse | null>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const changes = (result?.changes ?? []) as KoChange[];
    const total = changes.length;
    const current = total ? changes[currentIndex] : undefined;

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (!total) return;
            if (e.key === 'ArrowLeft' && currentIndex > 0) setCurrentIndex(i => i - 1);
            if (e.key === 'ArrowRight' && currentIndex < total - 1) setCurrentIndex(i => i + 1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [currentIndex, total]);

    useEffect(() => {
        const closeModal = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsKoreanModalOpen(false);
        };
        window.addEventListener('keydown', closeModal);
        return () => window.removeEventListener('keydown', closeModal);
    }, []);

    useEffect(() => {
        if (currentIndex > 0 && currentIndex >= total) {
            setCurrentIndex(Math.max(0, total - 1));
        }
    }, [total, currentIndex]);

    const correctedText = useMemo(() => {
        if (!result) return '';
        return result.corrected ?? '';
    }, [result]);

    const inferOp = (c: KoChange): 'insert' | 'delete' | 'replace' => {
        if (!c.from && c.to) return 'insert';
        if (c.from && !c.to) return 'delete';
        return 'replace';
    };

    const getHighlightedText = (
        text: string,
        changes: KoChange[],
        focusIndex: number,
    ): ReactNode[] => {
        if (!text || !changes?.length) return [text];

        const sorted = [...changes].sort((a, b) => a.offset - b.offset);
        const frags: ReactNode[] = [];
        let last = 0;

        sorted.forEach((c, i) => {
            const { offset, length } = c;
            if (offset > last) frags.push(text.slice(last, offset));

            const slice = text.slice(offset, offset + length);
            const isFocus = i === focusIndex;

            frags.push(
                <mark
                    key={`hl-${i}`}
                    className={
                        isFocus
                            ? 'rounded bg-red-300 px-0.5 font-bold text-red-900 underline decoration-red-600 decoration-2'
                            : 'rounded bg-red-200 px-0.5 text-red-800 underline decoration-red-400 decoration-2'
                    }
                    title={`${inferOp(c).toUpperCase()} — "${c.from || '∅'}" → "${c.to || '∅'}"`}
                >
                    {slice || '∅'}
                </mark>,
            );
            last = offset + length;
        });

        if (last < text.length) frags.push(text.slice(last));
        return frags;
    };

    const handleKoreanSpellCheck = async () => {
        if (!liveInput) return alert('내용을 입력해주세요.');
        const res = await koreanSpellCheck({ content: liveInput });
        setSnapshotText(liveInput);
        setResult(res);
        setCurrentIndex(0);
    };

    const handleCopyCorrectedText = () => {
        if (!correctedText) return;
        navigator.clipboard.writeText(correctedText);
        alert('교정된 텍스트가 복사되었습니다!');
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            <button onClick={() => setIsKoreanModalOpen(false)} className='absolute left-4 top-4'>
                <X size={32} className='text-main hover:text-primary' />
            </button>
            <div className='w-full max-w-6xl rounded-2xl bg-background p-6 shadow-xl'>
                <div className='mb-2 flex items-center justify-between'>
                    <h2 className='font-title text-xl font-semibold text-foreground'>
                        한국어 AI 교정&nbsp;&#40;Beta ver..&#41;
                    </h2>
                    <a
                        href='https://huggingface.co/Soyoung97/gec_kr'
                        className='text-sm text-muted underline decoration-dotted hover:text-primary hover:decoration-solid'
                    >
                        Model - Soyoung97 &#40;gec_kr&#41;
                    </a>
                </div>
                <p className='text-right text-xs text-muted'>ESC to close</p>

                {/* 버튼 영역 */}
                <div className='mb-4 flex flex-wrap items-center gap-4'>
                    <button
                        onClick={handleKoreanSpellCheck}
                        disabled={isPending}
                        className='rounded-md bg-primary px-4 py-2 text-main hover:bg-primary-deep disabled:opacity-50'
                    >
                        {isPending ? '검사중…' : '검사하기'}
                    </button>

                    {correctedText && (
                        <>
                            <button
                                onClick={handleCopyCorrectedText}
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
                    className='mb-6 h-32 w-full resize-none rounded-md border border-border bg-backgroundDark p-4 text-sm text-foreground focus:outline-none'
                />

                {/* 원문(하이라이트) vs 교정문 — 스냅샷 기준 표시 */}
                <div className='mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2'>
                    <div className='max-h-[260px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-backgroundDark p-4 text-foreground'>
                        {result
                            ? getHighlightedText(
                                  snapshotText || result.original,
                                  changes,
                                  currentIndex,
                              )
                            : liveInput || '입력 대기…'}
                    </div>
                    <div className='max-h-[260px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-backgroundDark p-4 text-foreground'>
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
                        onClick={() => setIsKoreanModalOpen(false)}
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
