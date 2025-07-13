import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // 또는 'media'

    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // 배경 & 텍스트 계열
                background: '#ffffff', // 페이지 기본 배경
                backgroundDark: '#808080', // 진한 배경
                foreground: '#111111', // 기본 텍스트
                muted: '#666666', // 설명 텍스트
                border: '#e5e7eb', // 테두리 (gray-200)
                borderSemiDark: '#9ca3af', // 약간 진한 테두리(gray-400)
                borderDark: '#6b7280', // 진한 테두리 (gray-500)
                // 강조색 계열
                primary: '#2563eb', // 버튼, 링크 등 강조색 (blue-600)
                'primary-bg': '#eff6ff', // 강조 배경 (blue-50)
                highlight: '#fef3c7', // 형광펜/강조용 노랑

                // 추가로 필요할 수 있는 계열
                error: '#dc2626', // 빨간색 에러 (red-600)
                success: '#16a34a', // 초록색 성공 (green-600)
            },
            fontFamily: {
                sans: ['Pretendard', 'sans-serif'], // 본문
                title: ['SUIT', 'sans-serif'], // 제목, UI 강조
            },
        },
    },
    plugins: [typography],
};
