/**
 * TaroViz 主题系统 - 扩展版
 * 提供图表主题配置和自定义主题功能
 */

// ============================================================================
// 类型定义
// ============================================================================

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
  | 'forest'
  // 新增主题
  | 'neon'
  | 'glass'
  | 'pastel'
  | 'sunset'
  | 'ocean'
  | 'cyber'
  | 'retro'
  | 'elegant';

/**
 * 主题模式
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * 主题渐变类型
 */
export interface ThemeGradient {
  /** 渐变起始色 */
  start: string;
  /** 渐变结束色 */
  end: string;
  /** 渐变角度 */
  angle?: number;
}

/**
 * 主题效果配置
 */
export interface ThemeEffects {
  /** 是否启用阴影 */
  shadows?: boolean;
  /** 阴影颜色 */
  shadowColor?: string;
  /** 是否启用渐变 */
  gradients?: boolean;
  /** 自定义渐变 */
  customGradients?: ThemeGradient[];
  /** 是否启用玻璃态 */
  glassmorphism?: boolean;
  /** 玻璃态模糊度 */
  blur?: number;
  /** 圆角风格 */
  borderRadius?: 'none' | 'small' | 'medium' | 'large' | 'pill';
}

/**
 * 主题配置选项
 */
export interface ThemeOptions {
  /** 主题名称/键名 */
  theme?: BuiltinTheme | Record<string, unknown>;

  /** 是否启用深色模式 */
  darkMode?: boolean;

  /** 主题模式 */
  mode?: ThemeMode;

  /** 颜色列表 */
  colors?: string[];

  /** 背景色 */
  backgroundColor?: string;

  /** 背景渐变 */
  backgroundGradient?: ThemeGradient;

  /** 文本颜色 */
  textColor?: string;

  /** 次要文本颜色 */
  textColorSecondary?: string;

  /** 边框颜色 */
  borderColor?: string;

  /** 分割线颜色 */
  dividerColor?: string;

  /** 字体 */
  fontFamily?: string;

  /** 标题字体 */
  fontFamilyTitle?: string;

  /** 正文字体 */
  fontFamilyBody?: string;

  /** 主题名称(显示用) */
  name?: string;

  /** 主题描述 */
  description?: string;

  /** 主题作者 */
  author?: string;

  /** 主题版本 */
  version?: string;

  /** 主题类型 */
  type?: ThemeMode;

  /** 主题标签 */
  tags?: string[];

  /** 效果配置 */
  effects?: ThemeEffects;

  /** 图表特定配置 */
  chart?: ChartThemeConfig;
}

/**
 * 图表主题配置
 */
export interface ChartThemeConfig {
  /** 图例配置 */
  legend?: LegendThemeConfig;
  /** 坐标轴配置 */
  axis?: AxisThemeConfig;
  /** 提示框配置 */
  tooltip?: TooltipThemeConfig;
  /** 标题配置 */
  title?: TitleThemeConfig;
  /** 网格配置 */
  grid?: GridThemeConfig;
  /** 数据区域缩放配置 */
  dataZoom?: DataZoomThemeConfig;
  /** 时间线配置 */
  timeline?: TimelineThemeConfig;
}

/** 图例主题配置 */
export interface LegendThemeConfig {
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number | number[];
  padding?: number | number[];
}

/** 坐标轴主题配置 */
export interface AxisThemeConfig {
  textColor?: string;
  lineColor?: string;
  tickColor?: string;
  splitLineColor?: string;
  splitAreaColor?: string;
}

/** 提示框主题配置 */
export interface TooltipThemeConfig {
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  shadowColor?: string;
}

/** 标题主题配置 */
export interface TitleThemeConfig {
  textColor?: string;
  subTextColor?: string;
}

/** 网格主题配置 */
export interface GridThemeConfig {
  backgroundColor?: string;
  borderColor?: string;
}

/** 数据区域缩放主题配置 */
export interface DataZoomThemeConfig {
  backgroundColor?: string;
  fillerColor?: string;
  borderColor?: string;
  textColor?: string;
}

/** 时间线主题配置 */
export interface TimelineThemeConfig {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  lineColor?: string;
  controlColor?: string;
}

// ============================================================================
// 主题注册表
// ============================================================================

const themeRegistry = new Map<string, ThemeOptions>();

// ============================================================================
// 内置主题定义
// ============================================================================

/** 默认主题 */
export const defaultTheme: ThemeOptions = {
  theme: 'default',
  name: 'Default',
  description: '简洁现代的默认主题',
  type: 'light',
  mode: 'light',
  darkMode: false,
  tags: ['modern', 'clean', 'default'],
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
  backgroundColor: '#ffffff',
  textColor: '#333333',
  textColorSecondary: '#666666',
  borderColor: '#e8e8e8',
  dividerColor: '#f0f0f0',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  chart: {
    legend: {
      textColor: '#333333',
      backgroundColor: 'transparent',
      borderColor: '#e8e8e8',
    },
    axis: {
      textColor: '#666666',
      lineColor: '#e8e8e8',
      tickColor: '#e8e8e8',
      splitLineColor: '#f0f0f0',
    },
    tooltip: {
      textColor: '#333333',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e8e8e8',
      borderRadius: 4,
    },
    title: {
      textColor: '#333333',
      subTextColor: '#666666',
    },
  },
};

/** 深色主题 */
export const darkTheme: ThemeOptions = {
  theme: 'dark',
  name: 'Dark',
  description: '优雅的深色主题，适合夜间使用',
  type: 'dark',
  mode: 'dark',
  darkMode: true,
  tags: ['dark', 'night', 'modern'],
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
  backgroundColor: '#1a1a2e',
  textColor: '#e8e8e8',
  textColorSecondary: '#a0a0a0',
  borderColor: '#2d2d44',
  dividerColor: '#252538',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  chart: {
    legend: {
      textColor: '#e8e8e8',
      backgroundColor: 'transparent',
      borderColor: '#2d2d44',
    },
    axis: {
      textColor: '#a0a0a0',
      lineColor: '#2d2d44',
      tickColor: '#2d2d44',
      splitLineColor: '#252538',
    },
    tooltip: {
      textColor: '#e8e8e8',
      backgroundColor: 'rgba(26, 26, 46, 0.95)',
      borderColor: '#2d2d44',
      borderRadius: 4,
    },
    title: {
      textColor: '#e8e8e8',
      subTextColor: '#a0a0a0',
    },
  },
};

/** Neon 霓虹主题 */
export const neonTheme: ThemeOptions = {
  theme: 'neon',
  name: 'Neon',
  description: '赛博朋克霓虹风格，炫酷吸睛',
  type: 'dark',
  mode: 'dark',
  darkMode: true,
  tags: ['neon', 'cyberpunk', 'colorful', 'dark'],
  colors: [
    '#00fff5',
    '#ff00ff',
    '#ffff00',
    '#00ff00',
    '#ff6b6b',
    '#4ecdc4',
    '#ffe66d',
    '#95e1d3',
    '#f38181',
  ],
  backgroundColor: '#0d0d1a',
  textColor: '#ffffff',
  textColorSecondary: '#b0b0b0',
  borderColor: '#1a1a2e',
  dividerColor: '#1a1a2e',
  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
  effects: {
    shadows: true,
    shadowColor: 'rgba(0, 255, 245, 0.3)',
    gradients: true,
  },
  chart: {
    tooltip: {
      textColor: '#ffffff',
      backgroundColor: 'rgba(13, 13, 26, 0.95)',
      borderColor: '#00fff5',
      borderRadius: 4,
      shadowColor: 'rgba(0, 255, 245, 0.3)',
    },
  },
};

/** Glass 玻璃态主题 */
export const glassTheme: ThemeOptions = {
  theme: 'glass',
  name: 'Glass',
  description: '现代玻璃态设计，半透明质感',
  type: 'light',
  mode: 'light',
  darkMode: false,
  tags: ['glass', 'modern', 'minimal', 'light'],
  colors: [
    '#667eea',
    '#764ba2',
    '#f093fb',
    '#f5576c',
    '#4facfe',
    '#00f2fe',
    '#43e97b',
    '#38f9d7',
    '#fa709a',
  ],
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backgroundGradient: {
    start: '#f5f7fa',
    end: '#c3cfe2',
    angle: 135,
  },
  textColor: '#2d3748',
  textColorSecondary: '#718096',
  borderColor: 'rgba(255, 255, 255, 0.5)',
  dividerColor: 'rgba(255, 255, 255, 0.3)',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  effects: {
    glassmorphism: true,
    blur: 10,
    shadows: true,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 'large',
  },
  chart: {
    tooltip: {
      textColor: '#2d3748',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 12,
    },
  },
};

/** Pastel 粉彩主题 */
export const pastelTheme: ThemeOptions = {
  theme: 'pastel',
  name: 'Pastel',
  description: '柔和粉彩配色，温馨舒适',
  type: 'light',
  mode: 'light',
  darkMode: false,
  tags: ['pastel', 'soft', 'gentle', 'light'],
  colors: [
    '#ffb3ba',
    '#ffdfba',
    '#ffffba',
    '#baffc9',
    '#bae1ff',
    '#f0b3ff',
    '#b3fff0',
    '#ffb3d9',
    '#d9ffb3',
  ],
  backgroundColor: '#fff9f5',
  textColor: '#5d5d5d',
  textColorSecondary: '#8a8a8a',
  borderColor: '#f0e6e0',
  dividerColor: '#f5f0eb',
  fontFamily: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif',
  chart: {
    tooltip: {
      textColor: '#5d5d5d',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#f0e6e0',
      borderRadius: 8,
    },
  },
};

/** Sunset 日落主题 */
export const sunsetTheme: ThemeOptions = {
  theme: 'sunset',
  name: 'Sunset',
  description: '温暖日落渐变，夕阳余晖',
  type: 'light',
  mode: 'light',
  darkMode: false,
  tags: ['sunset', 'warm', 'gradient', 'light'],
  colors: [
    '#ff6b6b',
    '#feca57',
    '#ff9ff3',
    '#54a0ff',
    '#5f27cd',
    '#ff9f43',
    '#ee5a24',
    '#009432',
    '#f368e0',
  ],
  backgroundColor: '#fff5f0',
  backgroundGradient: {
    start: '#ffecd2',
    end: '#fcb69f',
    angle: 135,
  },
  textColor: '#4a4a4a',
  textColorSecondary: '#7a7a7a',
  borderColor: '#ffd5c8',
  dividerColor: '#ffebe6',
  fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, sans-serif',
  effects: {
    gradients: true,
    shadows: true,
    shadowColor: 'rgba(255, 107, 107, 0.2)',
    borderRadius: 'medium',
  },
};

/** Ocean 海洋主题 */
export const oceanTheme: ThemeOptions = {
  theme: 'ocean',
  name: 'Ocean',
  description: '深邃海洋蓝，宁静清新',
  type: 'light',
  mode: 'light',
  darkMode: false,
  tags: ['ocean', 'blue', 'calm', 'light'],
  colors: [
    '#0077b6',
    '#00b4d8',
    '#90e0ef',
    '#caf0f8',
    '#03045e',
    '#023e8a',
    '#0096c7',
    '#48cae4',
    '#ade8f4',
  ],
  backgroundColor: '#f0f8ff',
  backgroundGradient: {
    start: '#e0f2fe',
    end: '#bae6fd',
    angle: 180,
  },
  textColor: '#1e3a5f',
  textColorSecondary: '#4a6fa5',
  borderColor: '#cce7f5',
  dividerColor: '#e1f0f9',
  fontFamily: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif',
  effects: {
    gradients: true,
    shadows: true,
    shadowColor: 'rgba(0, 119, 182, 0.15)',
  },
};

/** Cyber 赛博主题 */
export const cyberTheme: ThemeOptions = {
  theme: 'cyber',
  name: 'Cyber',
  description: '未来科技感，赛博朋克',
  type: 'dark',
  mode: 'dark',
  darkMode: true,
  tags: ['cyber', 'tech', 'futuristic', 'dark'],
  colors: [
    '#00f5ff',
    '#ff00ff',
    '#00ff00',
    '#ffff00',
    '#ff0080',
    '#8000ff',
    '#00ff80',
    '#ff8000',
    '#0080ff',
  ],
  backgroundColor: '#0a0a12',
  textColor: '#e0e0e0',
  textColorSecondary: '#808090',
  borderColor: '#1a1a2e',
  dividerColor: '#12121e',
  fontFamily: '"Orbitron", "Rajdhani", "JetBrains Mono", monospace',
  effects: {
    shadows: true,
    shadowColor: 'rgba(0, 245, 255, 0.4)',
    gradients: true,
    borderRadius: 'none',
  },
  chart: {
    tooltip: {
      textColor: '#ffffff',
      backgroundColor: 'rgba(10, 10, 18, 0.95)',
      borderColor: '#00f5ff',
      borderRadius: 0,
      shadowColor: 'rgba(0, 245, 255, 0.4)',
    },
  },
};

/** Retro 复古主题 */
export const retroTheme: ThemeOptions = {
  theme: 'retro',
  name: 'Retro',
  description: '怀旧复古风格，温馨怀旧',
  type: 'light',
  mode: 'light',
  darkMode: false,
  tags: ['retro', 'vintage', 'nostalgic', 'light'],
  colors: [
    '#d63031',
    '#e17055',
    '#fdcb6e',
    '#00b894',
    '#0984e3',
    '#6c5ce7',
    '#e84393',
    '#00cec9',
    '#fab1a0',
  ],
  backgroundColor: '#fdf6e3',
  textColor: '#5c4b37',
  textColorSecondary: '#8b7355',
  borderColor: '#e8dcc8',
  dividerColor: '#f0e8d8',
  fontFamily: '"Courier Prime", "Courier New", monospace',
  effects: {
    shadows: false,
    borderRadius: 'small',
  },
};

/** Elegant 雅致主题 */
export const elegantTheme: ThemeOptions = {
  theme: 'elegant',
  name: 'Elegant',
  description: '低调雅致风格，精致品味',
  type: 'light',
  mode: 'light',
  darkMode: false,
  tags: ['elegant', 'minimal', 'sophisticated', 'light'],
  colors: [
    '#2c3e50',
    '#34495e',
    '#7f8c8d',
    '#95a5a6',
    '#bdc3c7',
    '#ecf0f1',
    '#1abc9c',
    '#16a085',
    '#3498db',
  ],
  backgroundColor: '#fafafa',
  textColor: '#2c3e50',
  textColorSecondary: '#7f8c8d',
  borderColor: '#e8e8e8',
  dividerColor: '#f0f0f0',
  fontFamily: '"Playfair Display", Georgia, serif',
  effects: {
    shadows: true,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 'medium',
  },
};

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

// ============================================================================
// 注册所有内置主题
// ============================================================================

const builtinThemes = {
  default: defaultTheme,
  dark: darkTheme,
  walden: {
    ...defaultTheme,
    theme: 'walden',
    name: 'Walden',
    description: '清新自然风格',
    colors: ['#0a437a', '#3a84c4', '#22a783', '#48b591', '#7fcdbb', '#c9e4ca'],
    backgroundColor: '#f0f8f5',
    textColor: '#2c5042',
  },
  chalk: {
    ...defaultTheme,
    theme: 'chalk',
    name: 'Chalk',
    description: '粉笔风格',
    colors: ['#2e8de5', '#f0805a', '#5ab1ef', '#91d5ff', '#faad14'],
    backgroundColor: '#ffffff',
    textColor: '#000000',
  },
  'purple-passion': {
    ...defaultTheme,
    theme: 'purple-passion',
    name: 'Purple Passion',
    description: '紫色浪漫',
    colors: ['#9c27b0', '#e91e63', '#ff5722', '#ff9800', '#ffc107'],
    backgroundColor: '#f5f5f5',
    textColor: '#333333',
  },
  'blue-green': {
    ...defaultTheme,
    theme: 'blue-green',
    name: 'Blue Green',
    description: '蓝绿清新',
    colors: ['#00838f', '#00acc1', '#03a9f4', '#29b6f6', '#4fc3f7'],
    backgroundColor: '#e0f7fa',
    textColor: '#006064',
  },
  golden: {
    ...defaultTheme,
    theme: 'golden',
    name: 'Golden',
    description: '金色奢华',
    colors: ['#ffd700', '#ffed4e', '#f9a825', '#ffc107', '#ffb300'],
    backgroundColor: '#fff8e1',
    textColor: '#ff6f00',
  },
  forest: {
    ...defaultTheme,
    theme: 'forest',
    name: 'Forest',
    description: '森林绿色',
    colors: ['#2e7d32', '#388e3c', '#43a047', '#4caf50', '#66bb6a'],
    backgroundColor: '#f1f8e9',
    textColor: '#1b5e20',
  },
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
// 导出
// ============================================================================

export default {
  defaultTheme,
  darkTheme,
  neonTheme,
  glassTheme,
  pastelTheme,
  sunsetTheme,
  oceanTheme,
  cyberTheme,
  retroTheme,
  elegantTheme,
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
};

export { useAutoTheme } from './useAutoTheme';
export type { UseAutoThemeOptions } from './useAutoTheme';
