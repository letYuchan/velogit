import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkmodeToggleButton = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem('dark-mode');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    const toggleDarkmode = () => {
        const html = document.documentElement;
        const newTheme = isDark ? 'light' : 'dark';

        html.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('dark-mode', newTheme);
        setIsDark(!isDark);
    };

    return (
        <button
            onClick={toggleDarkmode}
            title='Toggle Darkmode'
            className='active:background-second flex w-full max-w-20 flex-nowrap items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-sm text-foreground hover:bg-background-second sm:max-w-36'
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            <span className='hidden sm:inline'>{isDark ? 'Light' : 'Dark'} Mode</span>
        </button>
    );
};

export default DarkmodeToggleButton;
