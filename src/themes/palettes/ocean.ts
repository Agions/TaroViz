import type { ThemeOptions } from '../types';

/** Ocean 海洋主题 */
export const oceanTheme: ThemeOptions = {
  theme: 'ocean',
  name: 'Ocean',
  description: '深邃海洋蓝，宁静清新',
  type: 'light',
  mode: 'light',
  darkMode: false,
  tags: ['ocean', 'blue', 'calm', 'light'],
  colors: [
    '#0077b6',
    '#00b4d8',
    '#90e0ef',
    '#caf0f8',
    '#03045e',
    '#023e8a',
    '#0096c7',
    '#48cae4',
    '#ade8f4',
  ],
  backgroundColor: '#f0f8ff',
  backgroundGradient: {
    start: '#e0f2fe',
    end: '#bae6fd',
    angle: 180,
  },
  textColor: '#1e3a5f',
  textColorSecondary: '#4a6fa5',
  borderColor: '#cce7f5',
  dividerColor: '#e1f0f9',
  fontFamily: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif',
  effects: {
    gradients: true,
    shadows: true,
    shadowColor: 'rgba(0, 119, 182, 0.15)',
  },
};
