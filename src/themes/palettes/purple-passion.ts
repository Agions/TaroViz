import type { ThemeOptions } from '../types';
import { defaultTheme } from './default';

/** Purple Passion 紫色浪漫 */
export const purplePassionTheme: ThemeOptions = {
  ...defaultTheme,
  theme: 'purple-passion',
  name: 'Purple Passion',
  description: '紫色浪漫',
  colors: ['#9c27b0', '#e91e63', '#ff5722', '#ff9800', '#ffc107'],
  backgroundColor: '#f5f5f5',
  textColor: '#333333',
};
