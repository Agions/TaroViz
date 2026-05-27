import type { ThemeOptions } from '../types';
import { defaultTheme } from './default';

/** Blue Green 蓝绿清新 */
export const blueGreenTheme: ThemeOptions = {
  ...defaultTheme,
  theme: 'blue-green',
  name: 'Blue Green',
  description: '蓝绿清新',
  colors: ['#00838f', '#00acc1', '#03a9f4', '#29b6f6', '#4fc3f7'],
  backgroundColor: '#e0f7fa',
  textColor: '#006064',
};
