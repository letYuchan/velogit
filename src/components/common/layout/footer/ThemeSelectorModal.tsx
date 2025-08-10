import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { SELECTED_THEME_STORAGE_KEY } from '@/constants/theme.constants';
import { applyThemeClass } from '@/utils';
import { useEscapeToCloseModal } from '@/hooks/useEscapeToCloseModal';
import { THEMES } from '@/data/themeComponents';
import { X } from 'lucide-react';

interface ThemeSelectorModal {
    setIsThemeSelectorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ThemeSelectorModal = ({ setIsThemeSelectorModalOpen }: ThemeSelectorModal) => {
    const [currentTheme, setCurrentTheme] = useState<string>('default');

    useEscapeToCloseModal(() => setIsThemeSelectorModalOpen(false));

    const handleCloseModal = () => {
        setIsThemeSelectorModalOpen(false);
    };

    const handleThemeChange = (theme: string) => {
        setCurrentTheme(theme);
        localStorage.setItem('theme', theme);
        applyThemeClass(theme);
        window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }));
    };

    useEffect(() => {
        const saved = localStorage.getItem(SELECTED_THEME_STORAGE_KEY);
        if (saved) {
            setCurrentTheme(saved);
        }
    }, []);

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            <button onClick={handleCloseModal} className='absolute left-4 top-4'>
                <X size={32} className='text-main hover:text-primary' />
            </button>
            <div className='w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl'>
                <div className='mb-3 flex items-start justify-between'>
                    <h2 className='font-title text-xl font-bold text-foreground'>Theme Selector</h2>
                    <span className='text-xs text-muted'>ESC to close</span>
                </div>
                <div className='grid grid-cols-2 gap-2 xl:grid-cols-3'>
                    {THEMES.map(({ id, name, icon, color }) => (
                        <button
                            key={id}
                            onClick={() => handleThemeChange(id)}
                            title={name}
                            className={clsx(
                                'group flex flex-col items-center justify-center rounded-md border border-border px-3 py-2 text-xs sm:flex-row sm:gap-2 sm:px-4 sm:py-2 sm:text-sm',
                                currentTheme === id
                                    ? 'ring-2 ring-primary ring-offset-2'
                                    : 'opacity-80 hover:opacity-100',
                                color,
                            )}
                        >
                            <span className='text-white sm:inline'>{icon}</span>
                            <span className='hidden truncate font-semibold text-white sm:inline'>
                                {name}
                            </span>
                        </button>
                    ))}
                </div>
                <div className='mt-6 flex w-full flex-nowrap items-center justify-between gap-2'>
                    <button
                        className='h-8 w-full rounded-md border border-borderDark bg-backgroundDark px-3 py-1 text-sm text-foreground hover:bg-backgroundDark/70 active:bg-backgroundDark/70'
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThemeSelectorModal;
