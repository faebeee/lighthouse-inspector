import { PaletteMode } from "@mui/material";

export const REPORTS_FOLDER = '_reports';
export const REPORTFILE_PROJECT_DELIMITER = '::';
export const REPORTFILE_DATE_FORMAT = 'yyyy-MM-dd-hhmmss';
export const DATE_FORMAT = 'yyyy-MM-dd hh:mm:ss';

const THEME_LIGHT = {
    logo: '/lighthouse_logo_dark.png',
    mode: 'light' as PaletteMode,
    primary: '#6594EA',
    secondary: '#9699D5',
    background: '#F7F7FB',
    cardBackground: '#FCFDFD',
}

const THEME_DARK = {
    logo: '/lighthouse_logo.png',
    mode: 'dark' as PaletteMode,
    primary: '#3BDD85',
    secondary: '#d7c4a0',
    background: '#0F1013',
    cardBackground: 'rgba(52,55,70,0.41)',
}

export const THEME = process.env.NEXT_PUBLIC_THEME_MODE === 'light' ? THEME_LIGHT : THEME_DARK;

export const COLOR = {
    PERFORMANCE: '#C1DAE7',
    ACCESSIBILITY: '#F9C0D8',
    BEST_PRACTICE: '#C8C9EF',
    SEO: '#E7C2CC',
    PWA: '#807984',
}
