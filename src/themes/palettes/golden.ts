import type { ThemeOptions } from '../types';
import { defaultTheme } from './default';

/** Golden 金色奢华 */
export const goldenTheme: ThemeOptions = {
  ...defaultTheme,
  theme: 'golden',
  name: 'Golden',
  description: '金色奢华',
  colors: ['#ffd700', '#ffed4e', '#f9a825', '#ffc107', '#ffb300'],
  backgroundColor: '#fff8e1',
  textColor: '#ff6f00',
};
