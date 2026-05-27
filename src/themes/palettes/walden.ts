import type { ThemeOptions } from '../types';
import { defaultTheme } from './default';

/** Walden 清新自然风格 */
export const waldenTheme: ThemeOptions = {
  ...defaultTheme,
  theme: 'walden',
  name: 'Walden',
  description: '清新自然风格',
  colors: ['#0a437a', '#3a84c4', '#22a783', '#48b591', '#7fcdbb', '#c9e4ca'],
  backgroundColor: '#f0f8f5',
  textColor: '#2c5042',
};
