import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#ffffff', // 페이지 기본 배경
        foreground: '#111111', // 기본 텍스트
        muted: '#666666', // 설명 텍스트
        border: '#e5e7eb', // 테두리 (gray-200)
        highlight: '#fef3c7', // 강조 배경 (노란 형광펜 느낌)
        link: '#2563eb', // 링크용 블루 (blue-600)
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'], // 본문
        title: ['SUIT', 'sans-serif'], // 제목, UI 강조
      },
    },
  },
  plugins: [typography],
};
