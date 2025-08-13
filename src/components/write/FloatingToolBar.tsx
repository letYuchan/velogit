import { useEffect, useRef, useState } from 'react';
import { insertMarkdownSyntax } from '@/utils/write';
import { TOOL_ITEMS } from '@/data/write.constants';

interface FloatingToolbarProps {
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const FloatingToolbar = ({ textareaRef }: FloatingToolbarProps) => {
    const [position, setPosition] = useState({ top: -9999, left: -9999 });
    const wrapperRef = useRef<HTMLDivElement>(null);

    const updatePosition = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const { selectionStart, value, scrollTop: innerScrollTop } = textarea;
        const rect = textarea.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        const textBeforeCursor = value.slice(0, selectionStart);
        const lines = textBeforeCursor.split('\n');
        const currentLine = lines.length - 1;
        const currentColumn = lines[lines.length - 1]?.length || 0;

        const lineHeight = 24;
        const charWidth = 8;
        const verticalOffset = 36;
        const horizontalOffset = 4;

        const top =
            rect.top +
            scrollTop -
            innerScrollTop +
            currentLine * lineHeight +
            lineHeight +
            verticalOffset;

        const left = rect.left + scrollLeft + currentColumn * charWidth + horizontalOffset;

        setPosition({ top, left });
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.addEventListener('focus', updatePosition);
        textarea.addEventListener('click', updatePosition);
        textarea.addEventListener('keyup', updatePosition);
        textarea.addEventListener('input', updatePosition);
        textarea.addEventListener('scroll', updatePosition);
        textarea.addEventListener('blur', () =>
            setTimeout(() => setPosition({ top: -9999, left: -9999 }), 200),
        );

        return () => {
            textarea.removeEventListener('focus', updatePosition);
            textarea.removeEventListener('click', updatePosition);
            textarea.removeEventListener('keyup', updatePosition);
            textarea.removeEventListener('input', updatePosition);
            textarea.removeEventListener('scroll', updatePosition);
            textarea.removeEventListener('blur', () => setPosition({ top: -9999, left: -9999 }));
        };
    }, [textareaRef]);

    return (
        <div
            ref={wrapperRef}
            className='absolute z-50 grid-cols-10 gap-2 rounded-xl border border-border bg-background/70 p-2 shadow-md backdrop-blur-sm sm:grid'
            style={{
                top: position.top,
                left: position.left,
                transition: 'top 0.1s ease, left 0.1s ease',
            }}
        >
            {TOOL_ITEMS.map(({ name, icon: Icon, label, insert, marker }) => (
                <button
                    key={name}
                    type='button'
                    title={label}
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => {
                        const textarea = textareaRef.current;
                        if (!textarea) return;
                        insertMarkdownSyntax(textarea, name, insert, marker);
                    }}
                    className='flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-sm text-muted transition-colors duration-200 hover:bg-primary-light active:bg-primary-light'
                >
                    <Icon size={16} />
                </button>
            ))}
        </div>
    );
};

export default FloatingToolbar;

/**
 * FloatingToolbar
 * ---------------
 * 기능:
 * - 마크다운 편집기의 커서 위치 근처에 떠 있는 툴바를 표시
 * - TOOL_ITEMS 기반 마크다운 구문 삽입 버튼 제공
 * - 커서 위치 및 스크롤, 클릭, 키 입력에 따라 위치를 동적으로 업데이트
 *
 * props (FloatingToolbarProps):
 * - textareaRef: React.RefObject<HTMLTextAreaElement | null>
 *   → 마크다운을 입력하는 textarea DOM 참조
 *
 * 로컬 상태:
 * - position: { top: number; left: number }
 *   → 툴바의 화면 상 좌표 (기본값: 화면 밖으로 숨김)
 *
 * refs:
 * - wrapperRef: HTMLDivElement → 툴바 컨테이너 참조
 *
 * 주요 함수:
 * - updatePosition():
 *   1) textarea의 selectionStart 기준으로 커서 앞의 문자열을 추출
 *   2) 줄 수와 현재 열(column) 위치 계산
 *   3) lineHeight, charWidth, 오프셋 값을 사용해 툴바의 top/left 좌표 계산
 *   4) setPosition으로 위치 상태 업데이트
 *
 * useEffect:
 * - textarea에 다음 이벤트 리스너 등록:
 *   - focus, click, keyup, input, scroll → updatePosition 실행
 *   - blur → 200ms 후 툴바 숨김 처리
 * - 컴포넌트 언마운트 시 모든 이벤트 리스너 제거
 *
 * UI 구성:
 * - <div> 툴바 컨테이너:
 *   - 위치: absolute, top/left는 position 상태로 제어
 *   - 스타일: border, 배경 투명도(bg-background/70), 그림자, backdrop blur
 *   - 그리드 레이아웃(sm 이상에서 grid-cols-10)
 * - 툴 버튼:
 *   - TOOL_ITEMS.map으로 렌더링
 *   - 클릭 시 insertMarkdownSyntax() 실행해 textarea에 마크다운 구문 삽입
 *   - 마우스 다운 시 focus 손실 방지(e.preventDefault)
 *   - hover/active 시 배경색(primary-light)로 변경
 *
 * 동작 흐름:
 * 1) 사용자가 textarea에 포커스/입력/클릭/스크롤 시 updatePosition 호출
 * 2) 커서 위치 근처로 툴바 이동
 * 3) blur 시 툴바 숨김(top/left를 화면 밖으로 이동)
 * 4) 버튼 클릭 시 해당 마크다운 구문 삽입
 */
