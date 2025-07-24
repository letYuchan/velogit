import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggleButton = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        const html = document.documentElement;
        const newTheme = isDark ? 'light' : 'dark';

        html.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
        setIsDark(!isDark);
    };

    return (
        <button
            onClick={toggleTheme}
            title='Toggle theme'
            className='hover:bg-background-second active:background-second flex w-full max-w-20 flex-nowrap items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-sm text-foreground sm:max-w-36'
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            <span className='hidden sm:inline'>{isDark ? 'Light' : 'Dark'} Mode</span>
        </button>
    );
};

export default ThemeToggleButton;
