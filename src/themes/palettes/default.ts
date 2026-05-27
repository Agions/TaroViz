import type { ThemeOptions } from '../types';

/** 默认主题 */
export const defaultTheme: ThemeOptions = {
  theme: 'default',
  name: 'Default',
  description: '简洁现代的默认主题',
  type: 'light',
  mode: 'light',
  darkMode: false,
  tags: ['modern', 'clean', 'default'],
  colors: [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc',
  ],
  backgroundColor: '#ffffff',
  textColor: '#333333',
  textColorSecondary: '#666666',
  borderColor: '#e8e8e8',
  dividerColor: '#f0f0f0',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  chart: {
    legend: {
      textColor: '#333333',
      backgroundColor: 'transparent',
      borderColor: '#e8e8e8',
    },
    axis: {
      textColor: '#666666',
      lineColor: '#e8e8e8',
      tickColor: '#e8e8e8',
      splitLineColor: '#f0f0f0',
    },
    tooltip: {
      textColor: '#333333',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e8e8e8',
      borderRadius: 4,
    },
    title: {
      textColor: '#333333',
      subTextColor: '#666666',
    },
  },
};
