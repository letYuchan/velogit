import { useState, useEffect } from 'react';
import { MdArrowUpward } from 'react-icons/md';

const ArrowUpButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const updateButtonVisibilityOnScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            const isScrolledEnough = scrollY > 300;
            const isAtBottom = windowHeight + scrollY >= docHeight - 10;

            setShowButton(isScrolledEnough && !isAtBottom);
        };

        window.addEventListener('scroll', updateButtonVisibilityOnScroll);
        updateButtonVisibilityOnScroll();

        return () => window.removeEventListener('scroll', updateButtonVisibilityOnScroll);
    }, []);

    return (
        <>
            {showButton && (
                <button
                    className='fixed bottom-6 right-6 z-50 rounded-full bg-primary p-2 text-main shadow-md transition hover:bg-primary-deep active:bg-primary-deep sm:p-3'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label='Scroll to top'
                >
                    <MdArrowUpward className='text-xl sm:text-2xl' />
                </button>
            )}
        </>
    );
};

export default ArrowUpButton;

/**
 * ArrowUpButton
 * -------------
 * 기능:
 * - 화면 하단 우측에 "위로 가기" 버튼 표시
 * - 스크롤 위치에 따라 버튼 표시/숨김 제어
 * - 버튼 클릭 시 페이지 상단으로 부드럽게 스크롤 이동
 *
 * 상태(state):
 * - showButton: boolean → 버튼 표시 여부
 *
 * useEffect 동작:
 * 1) scroll 이벤트 리스너 등록
 * 2) 스크롤 시 다음 조건으로 showButton 갱신:
 *    - scrollY > 300px → 충분히 아래로 스크롤된 경우
 *    - 현재 문서 하단(오차 10px 이내)에 도달하면 숨김
 * 3) 컴포넌트 언마운트 시 이벤트 리스너 제거
 *
 * UI 구성:
 * - 조건부 렌더링(showButton이 true일 때만 표시)
 * - 고정 위치: 화면 우측 하단(fixed bottom-6 right-6)
 * - 원형 버튼: 배경색 primary, hover/active 시 진한 색상
 * - 아이콘: MdArrowUpward (크기 반응형: sm:text-2xl)
 *
 * 동작 흐름:
 * 1) 페이지 스크롤 감지 → 표시 조건 충족 시 버튼 노출
 * 2) 버튼 클릭 시 window.scrollTo로 상단 스무스 이동
 */
