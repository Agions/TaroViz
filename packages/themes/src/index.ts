/**
 * TaroViz 主题系统
 * 提供图表主题配置和自定义主题功能
 */

/**
 * 内置主题类型
 */
export type BuiltinTheme =
  | 'default'
  | 'light'
  | 'dark'
  | 'vintage'
  | 'macarons'
  | 'roma'
  | 'shine'
  | 'infographic'
  | 'westeros';

/**
 * 主题配置选项
 */
export interface ThemeOptions {
  /**
   * 主题类型
   */
  theme?: BuiltinTheme | Record<string, any>;

  /**
   * 是否启用深色模式
   */
  darkMode?: boolean;

  /**
   * 颜色列表
   */
  colors?: string[];

  /**
   * 背景色
   */
  backgroundColor?: string;

  /**
   * 文本颜色
   */
  textColor?: string;

  /**
   * 字体
   */
  fontFamily?: string;
}

/**
 * 默认主题配置
 */
export const defaultTheme: ThemeOptions = {
  theme: 'default',
  darkMode: false,
  colors: [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc',
  ],
  backgroundColor: 'transparent',
  textColor: '#333',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

/**
 * 深色主题配置
 */
export const darkTheme: ThemeOptions = {
  theme: 'dark',
  darkMode: true,
  colors: [
    '#4992ff',
    '#7cffb2',
    '#fddd60',
    '#ff6e76',
    '#58d9f9',
    '#05c091',
    '#ff9f7f',
    '#8d48e3',
    '#dd79ff',
  ],
  backgroundColor: '#0f1117',
  textColor: '#e1e1e1',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

/**
 * 获取主题配置
 * @param options 自定义选项
 * @returns 合并后的主题配置
 */
export function getTheme(options?: Partial<ThemeOptions>): ThemeOptions {
  if (!options) {
    return defaultTheme;
  }

  const baseTheme = options.darkMode ? darkTheme : defaultTheme;
  return { ...baseTheme, ...options };
}

/**
 * 注册自定义主题
 * @param name 主题名称
 * @param theme 主题配置
 */
export function registerTheme(name: string, theme: Record<string, any>): void {
  // 这里实际会调用echarts的registerTheme方法
  // 但为了避免直接依赖，保持模块独立性，这里先做个占位
  console.log(`Theme ${name} registered`);
}

export default {
  defaultTheme,
  darkTheme,
  getTheme,
  registerTheme,
};
