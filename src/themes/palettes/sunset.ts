import type { ThemeOptions } from '../types';

/** Sunset 日落主题 */
export const sunsetTheme: ThemeOptions = {
  theme: 'sunset',
  name: 'Sunset',
  description: '温暖日落渐变，夕阳余晖',
  type: 'light',
  mode: 'light',
  darkMode: false,
  tags: ['sunset', 'warm', 'gradient', 'light'],
  colors: [
    '#ff6b6b',
    '#feca57',
    '#ff9ff3',
    '#54a0ff',
    '#5f27cd',
    '#ff9f43',
    '#ee5a24',
    '#009432',
    '#f368e0',
  ],
  backgroundColor: '#fff5f0',
  backgroundGradient: {
    start: '#ffecd2',
    end: '#fcb69f',
    angle: 135,
  },
  textColor: '#4a4a4a',
  textColorSecondary: '#7a7a7a',
  borderColor: '#ffd5c8',
  dividerColor: '#ffebe6',
  fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, sans-serif',
  effects: {
    gradients: true,
    shadows: true,
    shadowColor: 'rgba(255, 107, 107, 0.2)',
    borderRadius: 'medium',
  },
};
