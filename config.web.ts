import { PaletteMode } from '@mui/material';

export const DATE_FORMAT = "yyyy-MM-dd hh:mm:ss";
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

const THEME_LIGHT = {
    logo: '/lighthouse_logo_dark.png',
    mode: 'light' as PaletteMode,
    primary: 'rgb(13,67,96)',
    secondary: 'rgb(100,97,97)',
    background: '#f5f5f5',
    cardBackground: 'rgba(132,140,140,0.08)'
};


export const THEME = THEME_LIGHT;
export const THEME_NAME = 'light';

export const COLOR = {
    PERFORMANCE: 'rgba(68,211,175,0.7)',
    ACCESSIBILITY: 'rgba(68,173,211,0.7)',
    BEST_PRACTICE: 'rgba(68,211,113,0.7)',
    seo: 'rgba(68,211,70,0.7)',
    pwa: 'rgba(147,211,68,0.7)',
    RESPONSE_TIME: 'rgba(183,181,57,0.9)',
    TTI: 'rgba(30,196,160,0.9)'
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
