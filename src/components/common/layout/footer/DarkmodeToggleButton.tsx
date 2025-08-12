import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkmodeToggleButton = () => {
    const [isDark, setIsDark] = useState(false);

    const toggleDarkmode = () => {
        const html = document.documentElement;
        const newTheme = isDark ? 'light' : 'dark';

        html.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('dark-mode', newTheme);
        setIsDark(!isDark);
    };

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

    return (
        <button
            onClick={toggleDarkmode}
            title='Toggle Darkmode'
            className='active:background-second flex w-full max-w-20 flex-nowrap items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-sm text-foreground hover:bg-background-second active:bg-background-second sm:max-w-36'
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            <span className='hidden sm:inline'>{isDark ? 'Light' : 'Dark'} Mode</span>
        </button>
    );
};

export default DarkmodeToggleButton;

/**
 * DarkmodeToggleButton
 *
 * 기능:
 * - 다크 모드/라이트 모드 전환 버튼
 * - 선택한 모드를 localStorage에 저장
 * - OS 시스템 기본 다크 모드 설정 감지하여 초기 모드 결정
 *
 * 동작 방식:
 * 1. 마운트 시 localStorage('dark-mode') 또는 시스템 설정(prefers-color-scheme) 확인
 * 2. HTML <html> 태그에 'dark' 클래스 추가/제거
 * 3. 버튼 클릭 시 모드 토글 및 상태/저장소 동기화
 *
 * UI 특징:
 * - 다크 모드 시 Sun 아이콘 + 'Light Mode' 텍스트
 * - 라이트 모드 시 Moon 아이콘 + 'Dark Mode' 텍스트
 */
