import type { ThemeOptions } from '../types';

/** Neon 霓虹主题 */
export const neonTheme: ThemeOptions = {
  theme: 'neon',
  name: 'Neon',
  description: '赛博朋克霓虹风格，炫酷吸睛',
  type: 'dark',
  mode: 'dark',
  darkMode: true,
  tags: ['neon', 'cyberpunk', 'colorful', 'dark'],
  colors: [
    '#00fff5',
    '#ff00ff',
    '#ffff00',
    '#00ff00',
    '#ff6b6b',
    '#4ecdc4',
    '#ffe66d',
    '#95e1d3',
    '#f38181',
  ],
  backgroundColor: '#0d0d1a',
  textColor: '#ffffff',
  textColorSecondary: '#b0b0b0',
  borderColor: '#1a1a2e',
  dividerColor: '#1a1a2e',
  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
  effects: {
    shadows: true,
    shadowColor: 'rgba(0, 255, 245, 0.3)',
    gradients: true,
  },
  chart: {
    tooltip: {
      textColor: '#ffffff',
      backgroundColor: 'rgba(13, 13, 26, 0.95)',
      borderColor: '#00fff5',
      borderRadius: 4,
      shadowColor: 'rgba(0, 255, 245, 0.3)',
    },
  },
};
