import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { applyThemeClass } from '@/utils';
import { useEscapeToCloseModal } from '@/hooks/useEscapeToCloseModal';
import { X } from 'lucide-react';
import { THEMES } from '@/data';
import { SELECTED_THEME_STORAGE_KEY } from '@/constants';

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
                {/* Modal-header */}
                <div className='mb-3 flex items-start justify-between'>
                    <h2 className='font-title text-xl font-bold text-foreground'>Theme Selector</h2>
                    <span className='text-xs text-muted'>ESC to close</span>
                </div>
                {/* theme select buttons */}
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
                {/* Modal-footer */}
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

/**
 * ThemeSelectorModal
 *
 * 기능:
 * - 블로그/웹앱의 테마를 선택할 수 있는 모달 UI
 * - 선택한 테마를 `localStorage`에 저장하고 즉시 적용
 * - ESC 키 또는 Close 버튼으로 모달 닫기
 *
 * 동작 방식:
 * 1. 초기 렌더 시 `SELECTED_THEME_STORAGE_KEY` 값(localStorage) 확인 후 `currentTheme` 상태 초기화
 * 2. `THEMES` 배열을 기반으로 테마 목록을 버튼 형태로 렌더링
 * 3. 테마 버튼 클릭 시:
 *    - `currentTheme` 상태 갱신
 *    - `localStorage`에 선택 테마 저장
 *    - `applyThemeClass(theme)`로 HTML 루트에 테마 클래스 적용
 *    - `theme-change` 커스텀 이벤트 발생 (다른 컴포넌트에서 테마 변경 감지 가능)
 * 4. `useEscapeToCloseModal` 훅을 사용하여 ESC 입력 시 모달 닫기
 *
 * UI 특징:
 * - 화면 중앙에 배치된 반투명 배경의 모달
 * - 상단 왼쪽에 닫기(X) 버튼, 오른쪽 상단에 ESC 안내 문구
 * - 테마 목록은 색상과 아이콘으로 구분
 * - 현재 선택된 테마 버튼에는 `ring-primary` 하이라이트 효과 적용
 * - 반응형 레이아웃: 기본 2열, xl 이상에서 3열
 */
