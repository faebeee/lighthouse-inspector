import { PaletteMode } from "@mui/material";

export const REPORTS_FOLDER = '_reports';
export const REPORTFILE_PROJECT_DELIMITER = '::';
export const REPORTFILE_DATE_FORMAT = 'yyyy-MM-dd-hhmmss';
export const DATE_FORMAT = 'yyyy-MM-dd hh:mm:ss';

const THEME_LIGHT = {
    logo: '/lighthouse_logo_dark.png',
    mode: 'light' as PaletteMode,
    primary: 'rgb(68,97,211)',
    secondary: 'rgb(68,173,211)',
    background: '#F7F7FB',
    cardBackground: '#FCFDFD',
}

const THEME_DARK = {
    logo: '/lighthouse_logo.png',
    mode: 'dark' as PaletteMode,
    primary: 'rgb(87,114,213)',
    secondary: 'rgb(59,175,218)',
    background: '#0F1013',
    cardBackground: 'rgba(52,55,70,0.41)',
}

export const THEME = process.env.NEXT_PUBLIC_THEME_MODE === 'light' ? THEME_LIGHT : THEME_DARK;

export const COLOR = {
    SPEED: 'rgb(114,9,24)',
    PERFORMANCE: 'rgba(68,211,175,0.7)',
    ACCESSIBILITY: 'rgba(68,173,211,0.7)',
    BEST_PRACTICE: 'rgba(68,211,113,0.7)',
    SEO: 'rgba(68,211,70,0.7)',
    PWA: 'rgba(147,211,68,0.7)',
}
