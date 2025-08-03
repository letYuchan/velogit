import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
    darkMode: 'class',
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    variants: {
        extend: {
            backgroundColor: ['data-cross'],
        },
    },
    theme: {
        extend: {
            colors: {
                background: 'rgb(var(--color-background) / <alpha-value>)',
                'background-second': 'rgb(var(--color-background-second) / <alpha-value>)',
                backgroundDark: 'rgb(var(--color-backgroundDark) / <alpha-value>)',
                main: 'rgb(var(--color-main) / <alpha-value>)',
                foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
                muted: 'rgb(var(--color-muted) / <alpha-value>)',
                border: 'rgb(var(--color-border) / <alpha-value>)',
                borderSemiDark: 'rgb(var(--color-borderSemiDark) / <alpha-value>)',
                borderDark: 'rgb(var(--color-borderDark) / <alpha-value>)',
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                'primary-deep': 'rgb(var(--color-primary-deep) / <alpha-value>)',
                'primary-light': 'rgb(var(--color-primary-light) / <alpha-value>)',
                highlight: 'rgb(var(--color-highlight) / <alpha-value>)',
                error: 'rgb(var(--color-error) / <alpha-value>)',
                success: 'rgb(var(--color-success) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['Pretendard', 'sans-serif'],
                title: ['SUIT', 'sans-serif'],
            },
        },
    },
    plugins: [typography],
};

export default config;
