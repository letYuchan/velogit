// src/theme/muiTheme.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        custom: {
            background: string;
            backgroundSecond: string;
            foreground: string;
            muted: string;
            border: string;
        };
    }
    interface PaletteOptions {
        custom?: {
            background?: string;
            backgroundSecond?: string;
            foreground?: string;
            muted?: string;
            border?: string;
        };
    }
}
