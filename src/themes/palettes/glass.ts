import type { ThemeOptions } from '../types';

/** Glass 玻璃态主题 */
export const glassTheme: ThemeOptions = {
  theme: 'glass',
  name: 'Glass',
  description: '现代玻璃态设计，半透明质感',
  type: 'light',
  mode: 'light',
  darkMode: false,
  tags: ['glass', 'modern', 'minimal', 'light'],
  colors: [
    '#667eea',
    '#764ba2',
    '#f093fb',
    '#f5576c',
    '#4facfe',
    '#00f2fe',
    '#43e97b',
    '#38f9d7',
    '#fa709a',
  ],
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backgroundGradient: {
    start: '#f5f7fa',
    end: '#c3cfe2',
    angle: 135,
  },
  textColor: '#2d3748',
  textColorSecondary: '#718096',
  borderColor: 'rgba(255, 255, 255, 0.5)',
  dividerColor: 'rgba(255, 255, 255, 0.3)',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  effects: {
    glassmorphism: true,
    blur: 10,
    shadows: true,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 'large',
  },
  chart: {
    tooltip: {
      textColor: '#2d3748',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 12,
    },
  },
};
