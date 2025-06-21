import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography(theme) {
        return {
          dark: {
            css: {
              color: theme('colors.gray.200'),
              a: { color: theme('colors.blue.400') },
              strong: { color: theme('colors.gray.100') },
              h1: { color: theme('colors.gray.100') },
              h2: { color: theme('colors.gray.100') },
              h3: { color: theme('colors.gray.100') },
              code: { color: theme('colors.gray.100') },
              blockquote: {
                color: theme('colors.gray.100'),
                borderLeftColor: theme('colors.gray.700'),
              },
            },
          },
        };
      },
    },
  },
  plugins: [typography],
};
