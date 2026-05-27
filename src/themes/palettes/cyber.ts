import type { ThemeOptions } from '../types';

/** Cyber 赛博主题 */
export const cyberTheme: ThemeOptions = {
  theme: 'cyber',
  name: 'Cyber',
  description: '未来科技感，赛博朋克',
  type: 'dark',
  mode: 'dark',
  darkMode: true,
  tags: ['cyber', 'tech', 'futuristic', 'dark'],
  colors: [
    '#00f5ff',
    '#ff00ff',
    '#00ff00',
    '#ffff00',
    '#ff0080',
    '#8000ff',
    '#00ff80',
    '#ff8000',
    '#0080ff',
  ],
  backgroundColor: '#0a0a12',
  textColor: '#e0e0e0',
  textColorSecondary: '#808090',
  borderColor: '#1a1a2e',
  dividerColor: '#12121e',
  fontFamily: '"Orbitron", "Rajdhani", "JetBrains Mono", monospace',
  effects: {
    shadows: true,
    shadowColor: 'rgba(0, 245, 255, 0.4)',
    gradients: true,
    borderRadius: 'none',
  },
  chart: {
    tooltip: {
      textColor: '#ffffff',
      backgroundColor: 'rgba(10, 10, 18, 0.95)',
      borderColor: '#00f5ff',
      borderRadius: 0,
      shadowColor: 'rgba(0, 245, 255, 0.4)',
    },
  },
};
