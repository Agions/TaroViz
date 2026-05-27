import type { ThemeOptions } from '../types';
import { defaultTheme } from './default';

/** Forest 森林绿色 */
export const forestTheme: ThemeOptions = {
  ...defaultTheme,
  theme: 'forest',
  name: 'Forest',
  description: '森林绿色',
  colors: ['#2e7d32', '#388e3c', '#43a047', '#4caf50', '#66bb6a'],
  backgroundColor: '#f1f8e9',
  textColor: '#1b5e20',
};
