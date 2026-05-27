import type { ThemeOptions } from '../types';

/** Retro 复古主题 */
export const retroTheme: ThemeOptions = {
  theme: 'retro',
  name: 'Retro',
  description: '怀旧复古风格，温馨怀旧',
  type: 'light',
  mode: 'light',
  darkMode: false,
  tags: ['retro', 'vintage', 'nostalgic', 'light'],
  colors: [
    '#d63031',
    '#e17055',
    '#fdcb6e',
    '#00b894',
    '#0984e3',
    '#6c5ce7',
    '#e84393',
    '#00cec9',
    '#fab1a0',
  ],
  backgroundColor: '#fdf6e3',
  textColor: '#5c4b37',
  textColorSecondary: '#8b7355',
  borderColor: '#e8dcc8',
  dividerColor: '#f0e8d8',
  fontFamily: '"Courier Prime", "Courier New", monospace',
  effects: {
    shadows: false,
    borderRadius: 'small',
  },
};
