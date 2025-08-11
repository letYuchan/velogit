import { validLanguageToolCodes } from '@/data/validLanguageToolCodes';
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
            <button onClick={handleCloseModal} className='absolute left-4 top-4'>
                <X size={32} className='text-main hover:text-primary' />
            </button>
            <div className='w-full max-w-6xl rounded-2xl bg-background p-6 shadow-xl'>
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
                        className='text-md rounded-md border border-primary bg-primary px-4 py-1.5 text-main shadow transition-all hover:bg-primary-deep hover:shadow-md'
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MultilingualSpellCheckModal;
