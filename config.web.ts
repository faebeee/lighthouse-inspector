import { PaletteMode } from '@mui/material';

export const DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
export const CACHE_VERY_SHORT = 60; // 1min
export const CACHE_SHORT = 60 * 60; // 1h
export const CACHE_LONG = 60 * 60 * 6; // 6h
export const CACHE_VERY_LONG = 60 * 60 * 24 * 7; // 6h

export const SERVER_RESPONSE_TIME_THRESHOLD = {
    GOOD: 800,
    POOR: 1200
};
export const TIME_TO_INTERACTIVE_THRESHOLD = {
    GOOD: 600,
    POOR: 1200
};

export const CHART_BLUR = "5px";

export const THEME = {
    logo: '/lighthouse_logo.png',
    mode: 'light' as PaletteMode,
    primary: '#6AB187',
    secondary: '#6AB187',
    background: '#f5f5f5',
    cardBackground: 'rgba(132,140,140,0.08)',
    drawerBackground: '#333',

};
export const THEME_NAME = 'light';

export const COLOR = {
    PERFORMANCE: '#7eb0d5',
    ACCESSIBILITY: '#fd7f6f',
    BEST_PRACTICE: '#b2e061',
    seo: '#bd7ebe',
    pwa: '#ffb55a',
    RESPONSE_TIME: '#8bd3c7',
    TTI: '#fdcce5'
};

export const STATUS_COLORS = {
    VERY_GOOD: 'rgb(137,232,8, 1)',
    GOOD: 'rgba(76,175,98,1)',
    MEDIUM: 'rgba(215,196,77,1)',
    BAD: 'rgba(215,130,77,1)',
    POOR: 'rgba(215,77,77,1)'
}

export const SCORE_MAP = {
    90: STATUS_COLORS.VERY_GOOD,
    80: STATUS_COLORS.GOOD,
    60: STATUS_COLORS.MEDIUM,
    40: STATUS_COLORS.BAD,
    0: STATUS_COLORS.POOR,
}

export const AUDIT_HISTORY_CHART_LINES = [
    { label: "performance", color: COLOR.PERFORMANCE },
    { label: "accessibility", color: COLOR.ACCESSIBILITY },
    { label: "bestPractices", color: COLOR.BEST_PRACTICE },
    { label: "seo", color: COLOR.seo },
    { label: "pwa", color: COLOR.pwa }
];

export const SERVER_HISTORY_CHART_LINES = [
    { label: "tti", color: COLOR.TTI },
    { label: "serverResponseTime", color: COLOR.RESPONSE_TIME },
];
