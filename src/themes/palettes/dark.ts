import type { ThemeOptions } from '../types';

/** 深色主题 */
export const darkTheme: ThemeOptions = {
  theme: 'dark',
  name: 'Dark',
  description: '优雅的深色主题，适合夜间使用',
  type: 'dark',
  mode: 'dark',
  darkMode: true,
  tags: ['dark', 'night', 'modern'],
  colors: [
    '#4992ff',
    '#7cffb2',
    '#fddd60',
    '#ff6e76',
    '#58d9f9',
    '#05c091',
    '#ff9f7f',
    '#8d48e3',
    '#dd79ff',
  ],
  backgroundColor: '#1a1a2e',
  textColor: '#e8e8e8',
  textColorSecondary: '#a0a0a0',
  borderColor: '#2d2d44',
  dividerColor: '#252538',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  chart: {
    legend: {
      textColor: '#e8e8e8',
      backgroundColor: 'transparent',
      borderColor: '#2d2d44',
    },
    axis: {
      textColor: '#a0a0a0',
      lineColor: '#2d2d44',
      tickColor: '#2d2d44',
      splitLineColor: '#252538',
    },
    tooltip: {
      textColor: '#e8e8e8',
      backgroundColor: 'rgba(26, 26, 46, 0.95)',
      borderColor: '#2d2d44',
      borderRadius: 4,
    },
    title: {
      textColor: '#e8e8e8',
      subTextColor: '#a0a0a0',
    },
  },
};
