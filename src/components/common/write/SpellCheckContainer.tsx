import { validLanguageToolCodes } from '@/data/validLanguageToolCodes';
import { useGetAllAvailableLanguages, useSpellCheckMutation } from '@/services/spellCheck.queries';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { Globe, Copy, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface SpellCheckModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SpellCheckModal = ({ setShowModal }: SpellCheckModalProps) => {
    const { content: globalContent } = usePostWriteStore();
    const { data, refetch } = useGetAllAvailableLanguages();
    const { mutateAsync } = useSpellCheckMutation();

    const [selectedLanguage, setSelectedLanguage] = useState('auto');
    const [spellMatches, setSpellMatches] = useState<Match[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [customText, setCustomText] = useState('');

    const inputText = customText || globalContent;

    const getHighlightedText = (text: string, matches: Match[]) => {
        if (!matches.length) return [text];
        const sorted = [...matches].sort((a, b) => a.offset - b.offset);
        const fragments: React.ReactNode[] = [];
        let lastIndex = 0;

        sorted.forEach(({ offset, length, message }, idx) => {
            if (offset > lastIndex) fragments.push(text.slice(lastIndex, offset));
            const errorText = text.slice(offset, offset + length);
            fragments.push(
                <mark
                    key={`highlight-${idx}`}
                    className='bg-red-200 font-bold text-red-800 underline decoration-red-400 decoration-2'
                    title={message}
                >
                    {errorText}
                </mark>,
            );
            lastIndex = offset + length;
        });
        if (lastIndex < text.length) fragments.push(text.slice(lastIndex));
        return fragments;
    };

    const getCorrectedText = () => {
        if (!spellMatches.length) return inputText;
        const sorted = [...spellMatches].sort((a, b) => a.offset - b.offset);
        let result = '';
        let lastIndex = 0;
        for (const match of sorted) {
            const { offset, length, replacements } = match;
            result += inputText.slice(lastIndex, offset);
            result += replacements[0]?.value || inputText.slice(offset, offset + length);
            lastIndex = offset + length;
        }
        result += inputText.slice(lastIndex);
        return result;
    };

    const handleCopyCorrectedText = () => {
        navigator.clipboard.writeText(getCorrectedText());
        alert('Corrected text copied to clipboard!');
    };

    const handleSpellCheck = async () => {
        if (!inputText) return alert('Write content first');
        if (!validLanguageToolCodes.includes(selectedLanguage as LanguageToolCode)) {
            alert('Invalid language. Please select a valid one');
            await refetch();
            return;
        }

        const result = await mutateAsync({
            text: inputText,
            language: selectedLanguage as LanguageToolCode,
        });
        setSpellMatches(result.matches ?? []);
        setCurrentIndex(0);
    };

    const currentMatch = spellMatches[currentIndex];

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            <div className='w-full max-w-6xl rounded-2xl bg-background p-6 shadow-xl'>
                <h2 className='mb-4 font-title text-xl font-semibold text-foreground'>
                    AI Spell Check by{' '}
                    <a
                        href='https://languagetool.org/'
                        className='text-primary underline decoration-dotted hover:decoration-solid'
                    >
                        LanguageTool
                    </a>
                </h2>

                {/* Language & Check */}
                <div className='mb-4 flex flex-wrap items-center gap-4'>
                    <div className='relative inline-block w-48'>
                        <select
                            value={selectedLanguage}
                            onChange={e => setSelectedLanguage(e.target.value)}
                            className='w-full appearance-none rounded-md border border-border bg-background px-4 py-2 pr-10 text-base text-foreground'
                        >
                            <option value='auto'>Auto</option>
                            {data?.map(({ name, longCode }) => (
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
                        onClick={handleSpellCheck}
                        className='rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/80'
                    >
                        Check
                    </button>

                    {spellMatches.length > 0 && (
                        <button
                            onClick={handleCopyCorrectedText}
                            className='flex items-center gap-1 rounded-md border border-border bg-backgroundDark px-3 py-2 text-sm text-foreground hover:bg-backgroundDark/70'
                        >
                            <Copy size={16} /> Copy corrected text
                        </button>
                    )}
                </div>

                {/* Custom input field */}
                <textarea
                    placeholder='You can write or paste text here for spell check...'
                    value={customText}
                    onChange={e => setCustomText(e.target.value)}
                    className='mb-6 h-32 w-full resize-none rounded-md border border-border bg-backgroundDark p-4 text-sm text-foreground focus:outline-none'
                />

                {/* Highlighted & Corrected */}
                <div className='mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2'>
                    <div className='whitespace-pre-wrap rounded-md border border-border bg-backgroundDark p-4 text-foreground'>
                        {getHighlightedText(inputText, spellMatches)}
                    </div>
                    <div className='whitespace-pre-wrap rounded-md border border-border bg-backgroundDark p-4 text-foreground'>
                        {getCorrectedText()}
                    </div>
                </div>

                {/* Suggestion card */}
                <div className='flex items-center justify-between gap-4'>
                    <button
                        disabled={currentIndex === 0}
                        onClick={() => setCurrentIndex(i => i - 1)}
                        className='text-sm disabled:opacity-30'
                    >
                        <ChevronLeft className='text-foreground' />
                    </button>
                    <AnimatePresence mode='wait'>
                        {currentMatch && (
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className='flex-1 rounded-md border border-yellow-500 bg-yellow-100 p-4 text-yellow-900 shadow-sm'
                            >
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
                                        {currentMatch.replacements.slice(0, 6).map((r, i) => (
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
                        )}
                    </AnimatePresence>
                    <button
                        disabled={currentIndex === spellMatches.length - 1}
                        onClick={() => setCurrentIndex(i => i + 1)}
                        className='text-sm disabled:opacity-30'
                    >
                        <ChevronRight className='text-foreground' />
                    </button>
                </div>

                <div className='mt-6 text-right'>
                    <button
                        onClick={() => setShowModal(false)}
                        className='sm:text-md rounded-md border border-primary bg-primary px-4 py-1.5 text-sm text-main shadow transition-all hover:bg-primary-deep hover:shadow-md'
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpellCheckModal;
