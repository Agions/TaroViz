import type { ThemeOptions } from '../types';

/** Elegant 雅致主题 */
export const elegantTheme: ThemeOptions = {
  theme: 'elegant',
  name: 'Elegant',
  description: '低调雅致风格，精致品味',
  type: 'light',
  mode: 'light',
  darkMode: false,
  tags: ['elegant', 'minimal', 'sophisticated', 'light'],
  colors: [
    '#2c3e50',
    '#34495e',
    '#7f8c8d',
    '#95a5a6',
    '#bdc3c7',
    '#ecf0f1',
    '#1abc9c',
    '#16a085',
    '#3498db',
  ],
  backgroundColor: '#fafafa',
  textColor: '#2c3e50',
  textColorSecondary: '#7f8c8d',
  borderColor: '#e8e8e8',
  dividerColor: '#f0f0f0',
  fontFamily: '"Playfair Display", Georgia, serif',
  effects: {
    shadows: true,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 'medium',
  },
};
