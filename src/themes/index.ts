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
  | 'westeros'
  | 'walden'
  | 'chalk'
  | 'purple-passion'
  | 'blue-green'
  | 'golden'
  | 'forest';

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

  /**
   * 主题名称
   */
  name?: string;

  /**
   * 主题描述
   */
  description?: string;

  /**
   * 主题作者
   */
  author?: string;

  /**
   * 主题版本
   */
  version?: string;

  /**
   * 主题类型
   */
  type?: 'light' | 'dark' | 'auto';

  /**
   * 图表特定配置
   */
  chart?: {
    /**
     * 图例配置
     */
    legend?: {
      textColor?: string;
      backgroundColor?: string;
      borderColor?: string;
    };

    /**
     * 坐标轴配置
     */
    axis?: {
      textColor?: string;
      lineColor?: string;
      tickColor?: string;
      splitLineColor?: string;
    };

    /**
     * 提示框配置
     */
    tooltip?: {
      textColor?: string;
      backgroundColor?: string;
      borderColor?: string;
    };

    /**
     * 标题配置
     */
    title?: {
      textColor?: string;
      subTextColor?: string;
    };
  };
}

/**
 * 主题注册表
 */
const themeRegistry = new Map<string, ThemeOptions>();

/**
 * 默认主题配置
 */
export const defaultTheme: ThemeOptions = {
  theme: 'default',
  name: 'default',
  description: '默认主题',
  type: 'light',
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
  name: 'dark',
  description: '深色主题',
  type: 'dark',
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
 * Walden 主题配置
 */
export const waldenTheme: ThemeOptions = {
  theme: 'walden',
  darkMode: false,
  colors: [
    '#0a437a',
    '#3a84c4',
    '#22a783',
    '#48b591',
    '#7fcdbb',
    '#c9e4ca',
    '#eef7d5',
    '#fdf0d5',
    '#fbb573',
    '#f89540',
  ],
  backgroundColor: '#f0f8f5',
  textColor: '#2c5042',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

/**
 * Chalk 主题配置
 */
export const chalkTheme: ThemeOptions = {
  theme: 'chalk',
  darkMode: false,
  colors: [
    '#2e8de5',
    '#f0805a',
    '#5ab1ef',
    '#91d5ff',
    '#faad14',
    '#fadb14',
    '#52c41a',
    '#13c2c2',
    '#722ed1',
    '#eb2f96',
  ],
  backgroundColor: '#ffffff',
  textColor: '#000000',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

/**
 * Purple Passion 主题配置
 */
export const purplePassionTheme: ThemeOptions = {
  theme: 'purple-passion',
  darkMode: false,
  colors: [
    '#9c27b0',
    '#e91e63',
    '#ff5722',
    '#ff9800',
    '#ffc107',
    '#8bc34a',
    '#4caf50',
    '#009688',
    '#00bcd4',
    '#2196f3',
  ],
  backgroundColor: '#f5f5f5',
  textColor: '#333333',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

/**
 * Blue Green 主题配置
 */
export const blueGreenTheme: ThemeOptions = {
  theme: 'blue-green',
  darkMode: false,
  colors: [
    '#00838f',
    '#00acc1',
    '#03a9f4',
    '#29b6f6',
    '#4fc3f7',
    '#81d4fa',
    '#b3e5fc',
    '#e1f5fe',
    '#80deea',
    '#4dd0e1',
  ],
  backgroundColor: '#e0f7fa',
  textColor: '#006064',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

/**
 * Golden 主题配置
 */
export const goldenTheme: ThemeOptions = {
  theme: 'golden',
  darkMode: false,
  colors: [
    '#ffd700',
    '#ffed4e',
    '#f9a825',
    '#ffc107',
    '#ffb300',
    '#ffa000',
    '#ff8f00',
    '#ff6f00',
    '#ff5722',
    '#e64a19',
  ],
  backgroundColor: '#fff8e1',
  textColor: '#ff6f00',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

/**
 * Forest 主题配置
 */
export const forestTheme: ThemeOptions = {
  theme: 'forest',
  darkMode: false,
  colors: [
    '#2e7d32',
    '#388e3c',
    '#43a047',
    '#4caf50',
    '#66bb6a',
    '#81c784',
    '#a5d6a7',
    '#c8e6c9',
    '#e8f5e8',
    '#f1f8e9',
  ],
  backgroundColor: '#f1f8e9',
  textColor: '#1b5e20',
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

  // 如果提供了主题名称，尝试从注册表中获取
  let baseTheme: ThemeOptions;
  if (options.theme && typeof options.theme === 'string') {
    const registeredTheme = themeRegistry.get(options.theme);
    if (registeredTheme) {
      baseTheme = registeredTheme;
    } else {
      // 如果主题不存在，使用默认主题
      baseTheme = options.darkMode ? darkTheme : defaultTheme;
    }
  } else {
    // 如果没有提供主题名称，使用默认主题或深色主题
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
  // 注册主题到主题注册表
  themeRegistry.set(name, {
    ...theme,
    name,
  });
  console.log(`Registering theme: ${name}`);
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
  console.log(`Theme unregistered: ${name}`);
}

/**
 * 动态切换主题
 * @param theme 主题名称或主题配置
 * @param callback 切换完成后的回调函数
 */
export function switchTheme(theme: string | ThemeOptions, callback?: () => void): ThemeOptions {
  let themeConfig: ThemeOptions;

  if (typeof theme === 'string') {
    // 如果是主题名称，从注册表中获取
    const registeredTheme = themeRegistry.get(theme);
    if (registeredTheme) {
      themeConfig = registeredTheme;
    } else {
      // 如果主题不存在，使用默认主题
      themeConfig = defaultTheme;
    }
  } else {
    // 如果是主题配置，直接使用
    themeConfig = theme;
    // 如果主题配置包含名称，注册到注册表
    if (theme.name) {
      registerTheme(theme.name, theme);
    }
  }

  // 触发主题切换事件
  const event = new CustomEvent('themeChange', {
    detail: themeConfig,
  });

  // 检查是否在浏览器环境中
  if (typeof window !== 'undefined') {
    window.dispatchEvent(event);
  }

  // 调用回调函数
  if (callback) {
    callback();
  }

  return themeConfig;
}

// 注册内置主题
themeRegistry.set('default', defaultTheme);
themeRegistry.set('dark', darkTheme);
themeRegistry.set('walden', waldenTheme);
themeRegistry.set('chalk', chalkTheme);
themeRegistry.set('purple-passion', purplePassionTheme);
themeRegistry.set('blue-green', blueGreenTheme);
themeRegistry.set('golden', goldenTheme);
themeRegistry.set('forest', forestTheme);

export default {
  defaultTheme,
  darkTheme,
  waldenTheme,
  chalkTheme,
  purplePassionTheme,
  blueGreenTheme,
  goldenTheme,
  forestTheme,
  getTheme,
  registerTheme,
  getRegisteredThemes,
  getThemeByName,
  unregisterTheme,
  switchTheme,
};
