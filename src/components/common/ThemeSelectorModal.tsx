import { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
    Waves,
    Flower,
    Flame,
    Snowflake,
    MoonStar,
    Contrast,
    Code2,
    PawPrint,
    Dog,
    Stars,
    Orbit,
    TerminalSquare,
    Archive,
    Headphones,
    Leaf,
    Paintbrush,
} from 'lucide-react';
import { SELECTED_THEME_STORAGE_KEY } from '@/constants/theme.constants';
import { applyThemeClass } from '@/utils';

const THEMES = [
    {
        id: 'default',
        name: 'Default',
        icon: <Waves size={16} />,
        color: 'bg-[#2563eb]',
    },
    {
        id: 'sakura',
        name: 'Sakura',
        icon: <Flower size={16} />,
        color: 'bg-pink-300',
    },
    {
        id: 'dragon',
        name: 'Dragon',
        icon: <Flame size={16} />,
        color: 'bg-orange-700',
    },
    {
        id: 'arctic',
        name: 'Arctic',
        icon: <Snowflake size={16} />,
        color: 'bg-sky-400',
    },
    {
        id: 'anime',
        name: 'Anime',
        icon: <Stars size={16} />,
        color: 'bg-purple-400',
    },
    {
        id: 'space',
        name: 'Space',
        icon: <MoonStar size={16} />,
        color: 'bg-indigo-900',
    },
    {
        id: 'mono',
        name: 'Mono',
        icon: <Contrast size={16} />,
        color: 'bg-zinc-800',
    },
    {
        id: 'dev',
        name: 'Dev',
        icon: <Code2 size={16} />,
        color: 'bg-blue-600',
    },
    {
        id: 'cat',
        name: 'Cat',
        icon: <PawPrint size={16} />,
        color: 'bg-pink-400',
    },
    {
        id: 'dog',
        name: 'Dog',
        icon: <Dog size={16} />,
        color: 'bg-lime-500',
    },
    {
        id: 'neonnebula',
        name: 'Neon Nebula',
        icon: <Orbit size={16} />,
        color: 'bg-gradient-to-tr from-[#8f48ff] via-[#ff58a6] to-[#78c8ff]',
    },
    {
        id: 'hacker',
        name: 'Hacker',
        icon: <TerminalSquare size={16} />,
        color: 'bg-green-600',
    },
    {
        id: 'vintage',
        name: 'Vintage',
        icon: <Archive size={16} />,
        color: 'bg-[#d6b88d]',
    },
    {
        id: 'lofi',
        name: 'Lo-fi',
        icon: <Headphones size={16} />,
        color: 'bg-[#d9b8a6]',
    },
    {
        id: 'ghibli',
        name: 'Ghibli',
        icon: <Leaf size={16} />,
        color: 'bg-gradient-to-r from-[#e7dfb0] via-[#d7e8ec] to-[#bcdde6]',
    },
    {
        id: 'custom',
        name: 'Custom',
        icon: <Paintbrush size={16} />,
        color: 'bg-[#d8d5cf]',
    },
];

interface ThemeSelectorModal {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const ThemeSelectorModal = ({ setShowModal }: ThemeSelectorModal) => {
    const [currentTheme, setCurrentTheme] = useState<string>('default');

    useEffect(() => {
        const saved = localStorage.getItem(SELECTED_THEME_STORAGE_KEY);
        if (saved) {
            setCurrentTheme(saved);
        }
    }, []);

    const handleThemeChange = (theme: string) => {
        setCurrentTheme(theme);
        localStorage.setItem('theme', theme);
        applyThemeClass(theme);
        window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }));
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            <div className='w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl'>
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
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThemeSelectorModal;
