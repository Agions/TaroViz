/**
 * 主题配置模块
 */

// 默认主题配置
const defaultThemes = {
  light: {},
  dark: {}
};

// 主题注册表
let registeredThemes = {...defaultThemes};

/**
 * 配置或注册自定义主题
 * @param themeName 主题名称
 * @param config 主题配置
 */
export function configTheme(themeName: string, config: Record<string, any>): void {
  registeredThemes[themeName] = config;
}

/**
 * 获取主题配置
 * @param themeName 主题名称
 * @returns 主题配置
 */
export function getTheme(themeName: string): Record<string, any> {
  return registeredThemes[themeName] || registeredThemes.light;
} 