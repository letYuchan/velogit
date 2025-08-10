import FloatingToolbar from '@/components/write/FloatingToolBar';
import KoreanSpellCheckModal from '@/components/write/KoreanSpellCheckModal';
import MultilingualSpellCheckModal from '@/components/write/MultilingualSpellCheckContainer';
import { TOOL_ITEMS } from '@/data/toolItems';
import { useIsMobile } from '@/hooks/useIsMobile';
import { usePostWriteStore } from '@/store/usePostWriteStore';
import { insertMarkdownSyntax } from '@/utils/write';
import { useState } from 'react';
import { MdSpellcheck } from 'react-icons/md';

interface ContentEditorToolbarProps {
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const ContentEditorToolbar = ({ textareaRef }: ContentEditorToolbarProps) => {
    const { setField } = usePostWriteStore();

    const [activeItem, setActiveItem] = useState<string | null>(null);
    const [isFloatingToolBarOn, setIsFloatingToolBarOn] = useState(false);
    const [isMultilingualModalOpen, setIsMultilingualModalOpen] = useState(false);
    const [isKoreanModalOpen, setIsKoreanModalOpen] = useState(false);

    const isMobile = useIsMobile();

    const handleClearContent = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        if (confirm('Do you want to clear all content?')) {
            textarea.value = '';
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            setField('content', '');
        }
    };

    return (
        <div className='flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2'>
            {isFloatingToolBarOn && !isMobile && <FloatingToolbar textareaRef={textareaRef} />}
            <div className='flex flex-wrap gap-2'>
                {TOOL_ITEMS.map(({ name, icon: Icon, label, insert, marker }) => (
                    <button
                        key={name}
                        type='button'
                        title={label}
                        onClick={() => {
                            const textarea = textareaRef.current;
                            if (!textarea) return;
                            insertMarkdownSyntax(textarea, name, insert, marker, () => {
                                if (['h1', 'h2', 'h3', 'h4', 'quote', 'list'].includes(name)) {
                                    setActiveItem(prev => (prev === name ? null : name));
                                }
                            });
                        }}
                        className={`flex items-center gap-1 rounded-md border px-2 py-1 text-sm transition-colors duration-200 hover:bg-primary-light active:bg-primary-light ${
                            activeItem === name
                                ? 'border-primary bg-primary text-main hover:border-border hover:text-muted active:border-border active:text-muted'
                                : 'border-border bg-background text-muted'
                        }`}
                    >
                        <Icon size={16} />
                    </button>
                ))}
            </div>
            <div className='flex w-full gap-2'>
                <button
                    onClick={handleClearContent}
                    className='flex-1 rounded-md border border-error bg-error px-3 py-1 text-xl font-semibold text-main hover:bg-error/70 active:bg-error/70'
                >
                    Init
                </button>
                {!isMobile && (
                    <button
                        onClick={() => setIsFloatingToolBarOn(prev => !prev)}
                        className='flex flex-1 justify-center rounded-md border border-primary bg-primary px-3 py-1 text-xl font-semibold text-main hover:bg-primary-deep active:bg-primary-deep'
                    >
                        {isFloatingToolBarOn ? 'Floating Bar: on' : 'Floating Bar: off'}
                    </button>
                )}
            </div>
            <div className='flex w-full gap-2'>
                <button
                    onClick={() => setIsMultilingualModalOpen(true)}
                    className='flex flex-1 justify-center rounded-md border border-primary bg-gradient-to-r from-primary-deep via-primary to-primary-light px-3 py-1 text-xl font-semibold text-main hover:from-primary hover:to-primary-light active:from-primary-deep active:to-primary'
                >
                    {isMobile ? <MdSpellcheck className='text-main' /> : 'Spell Check'}
                </button>
                <button
                    onClick={() => setIsKoreanModalOpen(true)}
                    className='flex flex-1 justify-center rounded-md border border-primary bg-gradient-to-r from-primary-deep via-primary to-primary-light px-3 py-1 text-xl font-semibold text-main hover:from-primary hover:to-primary-light active:from-primary-deep active:to-primary'
                >
                    {isMobile ? '한국어' : '한국어 교정'}
                </button>
            </div>
            {isMultilingualModalOpen && (
                <MultilingualSpellCheckModal
                    setIsMultilingualModalOpen={setIsMultilingualModalOpen}
                />
            )}
            {isKoreanModalOpen && (
                <KoreanSpellCheckModal setIsKoreanModalOpen={setIsKoreanModalOpen} />
            )}
        </div>
    );
};

export default ContentEditorToolbar;
