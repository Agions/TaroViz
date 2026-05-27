/**
 * TaroViz 主题系统 - 扩展版
 * 提供图表主题配置和自定义主题功能
 */

// 类型定义
export type {
  BuiltinTheme,
  ThemeMode,
  ThemeGradient,
  ThemeEffects,
  ThemeOptions,
  ChartThemeConfig,
  LegendThemeConfig,
  AxisThemeConfig,
  TooltipThemeConfig,
  TitleThemeConfig,
  GridThemeConfig,
  DataZoomThemeConfig,
  TimelineThemeConfig,
} from './types';

// 内置主题色板
export { defaultTheme } from './palettes/default';
export { darkTheme } from './palettes/dark';
export { neonTheme } from './palettes/neon';
export { glassTheme } from './palettes/glass';
export { pastelTheme } from './palettes/pastel';
export { sunsetTheme } from './palettes/sunset';
export { oceanTheme } from './palettes/ocean';
export { cyberTheme } from './palettes/cyber';
export { retroTheme } from './palettes/retro';
export { elegantTheme } from './palettes/elegant';

// 主题管理函数
export {
  getTheme,
  registerTheme,
  getRegisteredThemes,
  getThemeByName,
  unregisterTheme,
  resetThemeRegistry,
  switchTheme,
  getThemesByTag,
  getLightThemes,
  getDarkThemes,
} from './registry';

// Auto theme hook
export { useAutoTheme } from './useAutoTheme';
export type { UseAutoThemeOptions } from './useAutoTheme';
