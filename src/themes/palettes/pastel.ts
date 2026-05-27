import type { ThemeOptions } from '../types';

/** Pastel 粉彩主题 */
export const pastelTheme: ThemeOptions = {
  theme: 'pastel',
  name: 'Pastel',
  description: '柔和粉彩配色，温馨舒适',
  type: 'light',
  mode: 'light',
  darkMode: false,
  tags: ['pastel', 'soft', 'gentle', 'light'],
  colors: [
    '#ffb3ba',
    '#ffdfba',
    '#ffffba',
    '#baffc9',
    '#bae1ff',
    '#f0b3ff',
    '#b3fff0',
    '#ffb3d9',
    '#d9ffb3',
  ],
  backgroundColor: '#fff9f5',
  textColor: '#5d5d5d',
  textColorSecondary: '#8a8a8a',
  borderColor: '#f0e6e0',
  dividerColor: '#f5f0eb',
  fontFamily: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif',
  chart: {
    tooltip: {
      textColor: '#5d5d5d',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#f0e6e0',
      borderRadius: 8,
    },
  },
};
