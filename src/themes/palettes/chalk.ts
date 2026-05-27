import type { ThemeOptions } from '../types';
import { defaultTheme } from './default';

/** Chalk 粉笔风格 */
export const chalkTheme: ThemeOptions = {
  ...defaultTheme,
  theme: 'chalk',
  name: 'Chalk',
  description: '粉笔风格',
  colors: ['#2e8de5', '#f0805a', '#5ab1ef', '#91d5ff', '#faad14'],
  backgroundColor: '#ffffff',
  textColor: '#000000',
};
