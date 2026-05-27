/**
 * TaroViz 主题注册表 - 管理主题注册、查询和切换
 */

import type { ThemeOptions } from './types';
import { defaultTheme } from './palettes/default';
import { darkTheme } from './palettes/dark';
import { neonTheme } from './palettes/neon';
import { glassTheme } from './palettes/glass';
import { pastelTheme } from './palettes/pastel';
import { sunsetTheme } from './palettes/sunset';
import { oceanTheme } from './palettes/ocean';
import { cyberTheme } from './palettes/cyber';
import { retroTheme } from './palettes/retro';
import { elegantTheme } from './palettes/elegant';
import { waldenTheme } from './palettes/walden';
import { chalkTheme } from './palettes/chalk';
import { purplePassionTheme } from './palettes/purple-passion';
import { blueGreenTheme } from './palettes/blue-green';
import { goldenTheme } from './palettes/golden';
import { forestTheme } from './palettes/forest';

// ============================================================================
// 主题注册表
// ============================================================================

const themeRegistry = new Map<string, ThemeOptions>();

// ============================================================================
// 内置主题集合
// ============================================================================

const builtinThemes: Record<string, ThemeOptions> = {
  default: defaultTheme,
  dark: darkTheme,
  walden: waldenTheme,
  chalk: chalkTheme,
  'purple-passion': purplePassionTheme,
  'blue-green': blueGreenTheme,
  golden: goldenTheme,
  forest: forestTheme,
  neon: neonTheme,
  glass: glassTheme,
  pastel: pastelTheme,
  sunset: sunsetTheme,
  ocean: oceanTheme,
  cyber: cyberTheme,
  retro: retroTheme,
  elegant: elegantTheme,
};

// 注册所有内置主题
Object.entries(builtinThemes).forEach(([name, theme]) => {
  themeRegistry.set(name, theme as ThemeOptions);
});

// ============================================================================
// 主题管理函数
// ============================================================================

/**
 * 获取主题配置
 * @param options 自定义选项
 * @returns 合并后的主题配置
 */
export function getTheme(options?: Partial<ThemeOptions>): ThemeOptions {
  if (!options) {
    return defaultTheme;
  }

  let baseTheme: ThemeOptions;
  if (options.theme && typeof options.theme === 'string') {
    const registeredTheme = themeRegistry.get(options.theme);
    if (registeredTheme) {
      baseTheme = registeredTheme;
    } else {
      baseTheme = options.darkMode ? darkTheme : defaultTheme;
    }
  } else {
    baseTheme = options.darkMode ? darkTheme : defaultTheme;
  }

  return { ...baseTheme, ...options };
}

/**
 * 注册主题
 * @param name 主题名称
 * @param theme 主题配置
 */
export function registerTheme(name: string, theme: ThemeOptions): void {
  themeRegistry.set(name, { ...theme, name });
}

/**
 * 获取已注册的主题列表
 * @returns 主题列表
 */
export function getRegisteredThemes(): ThemeOptions[] {
  return Array.from(themeRegistry.values());
}

/**
 * 获取指定主题
 * @param name 主题名称
 * @returns 主题配置
 */
export function getThemeByName(name: string): ThemeOptions | undefined {
  return themeRegistry.get(name);
}

/**
 * 删除主题
 * @param name 主题名称
 */
export function unregisterTheme(name: string): void {
  themeRegistry.delete(name);
}

/**
 * 重置主题注册表（清除所有已注册的主题，恢复内置主题）
 * 主要用于测试环境
 */
export function resetThemeRegistry(): void {
  themeRegistry.clear();
  // 重新注册所有内置主题
  Object.entries(builtinThemes).forEach(([name, theme]) => {
    themeRegistry.set(name, theme as ThemeOptions);
  });
}

/**
 * 动态切换主题
 * @param theme 主题名称或主题配置
 * @param callback 切换完成后的回调函数
 * @returns 主题配置
 */
export function switchTheme(theme: string | ThemeOptions, callback?: () => void): ThemeOptions {
  let themeConfig: ThemeOptions;

  if (typeof theme === 'string') {
    const registeredTheme = themeRegistry.get(theme);
    themeConfig = registeredTheme || defaultTheme;
  } else {
    themeConfig = theme;
    if (theme.name) {
      registerTheme(theme.name, theme);
    }
  }

  // 触发主题切换事件
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('themeChange', { detail: themeConfig }));
  }

  callback?.();

  return themeConfig;
}

/**
 * 根据标签获取主题
 * @param tag 标签
 * @returns 主题列表
 */
export function getThemesByTag(tag: string): ThemeOptions[] {
  return getRegisteredThemes().filter((t) => t.tags?.includes(tag));
}

/**
 * 获取浅色主题
 * @returns 浅色主题列表
 */
export function getLightThemes(): ThemeOptions[] {
  return getRegisteredThemes().filter((t) => !t.darkMode);
}

/**
 * 获取深色主题
 * @returns 深色主题列表
 */
export function getDarkThemes(): ThemeOptions[] {
  return getRegisteredThemes().filter((t) => t.darkMode);
}
