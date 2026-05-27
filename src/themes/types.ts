/**
 * TaroViz 主题系统 - 类型定义
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
