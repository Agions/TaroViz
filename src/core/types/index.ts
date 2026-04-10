// 公共类型
export * from './common';

// 平台类型
export * from './platform';

export * from './chart';

// ECharts相关类型
import type { EChartsType } from 'echarts';

import { ChartOptions } from './chart';
import { ChartEventParams } from './common';

/**
 * TaroViz核心类型定义
 */

export { EChartsType };

// 导出动画相关类型
export * from '../animation';

/**
 * ECharts选项类型定义
 */
export type EChartsOption = ChartOptions;

/**
 * 动画缓动函数类型
 */
export type AnimationEasing =
  | 'linear'
  | 'quadraticIn'
  | 'quadraticOut'
  | 'quadraticInOut'
  | 'cubicIn'
  | 'cubicOut'
  | 'cubicInOut'
  | 'quarticIn'
  | 'quarticOut'
  | 'quarticInOut'
  | 'quinticIn'
  | 'quinticOut'
  | 'quinticInOut'
  | 'sinusoidalIn'
  | 'sinusoidalOut'
  | 'sinusoidalInOut'
  | 'exponentialIn'
  | 'exponentialOut'
  | 'exponentialInOut'
  | 'circularIn'
  | 'circularOut'
  | 'circularInOut'
  | 'elasticIn'
  | 'elasticOut'
  | 'elasticInOut'
  | 'backIn'
  | 'backOut'
  | 'backInOut'
  | 'bounceIn'
  | 'bounceOut'
  | 'bounceInOut';

/**
 * 渲染器类型
 */
export type RendererType = 'canvas' | 'svg';

/**
 * 图表事件回调类型
 */
export type ChartEventCallback = (params: ChartEventParams) => void;

/**
 * 图表事件处理器映射
 */
export interface ChartEventHandlers {
  [key: string]: ChartEventCallback;
}

/**
 * 主题类型
 */
export interface ThemeType {
  color?: string[];
  backgroundColor?: string;
  textStyle?: {
    color?: string;
    fontFamily?: string;
    fontSize?: number;
  };
  title?: {
    textStyle?: {
      color?: string;
      fontFamily?: string;
      fontSize?: number;
      fontWeight?: string | number;
    };
    subtextStyle?: {
      color?: string;
      fontFamily?: string;
      fontSize?: number;
      fontWeight?: string | number;
    };
  };
  legend?: {
    textStyle?: {
      color?: string;
      fontFamily?: string;
      fontSize?: number;
    };
  };
  tooltip?: {
    backgroundColor?: string;
    borderColor?: string;
    textStyle?: {
      color?: string;
      fontFamily?: string;
      fontSize?: number;
    };
  };
  [key: string]: unknown;
}

/**
 * 渲染性能优化配置
 */
export interface RenderOptimizationConfig {
  progressive?: boolean;
  progressiveThreshold?: number;
  lazyUpdate?: boolean;
  animation?: boolean;
  hardwareAcceleration?: boolean;
  frameRate?: number;
}

/**
 * 适配器配置选项
 */
export interface AdapterConfig {
  platformType?: string;
  canvasId?: string;
  theme?: string;
  renderer?: 'canvas' | 'svg';
  devicePixelRatio?: number;
  width?: number;
  height?: number;
  [key: string]: unknown;
}
