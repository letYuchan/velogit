import { createTheme } from '@mui/material/styles';

// ContentEditor.tsx
export const muiTheme = createTheme({
    palette: {
        primary: {
            main: 'rgb(var(--color-primary))',
            dark: 'rgb(var(--color-primary-deep))',
            light: 'rgb(var(--color-primary-light))',
            contrastText: 'rgb(var(--color-main))',
        },
        error: {
            main: 'rgb(var(--color-error))',
        },
        success: {
            main: 'rgb(var(--color-success))',
        },
        custom: {
            background: 'rgb(var(--color-background))',
            backgroundSecond: 'rgb(var(--color-background-second))',
            foreground: 'rgb(var(--color-foreground))',
            muted: 'rgb(var(--color-muted))',
            border: 'rgb(var(--color-border))',
        },
    },
    typography: {
        fontFamily:
            'SUIT-Variable, Pretendard-Variable, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    },
});
