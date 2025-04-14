// 公共类型
export * from './common';

// 平台类型
export * from './platform';

export * from './chart';

// ECharts相关类型
import * as echarts from 'echarts/core';

import { ChartOptions } from './chart';

/**
 * TaroViz核心类型定义
 */

/**
 * ECharts类型定义
 */
export type EChartsType = echarts.ECharts;

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
export type ChartEventCallback = (params: any) => void;

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
  [key: string]: any;
}

/**
 * 渲染性能优化配置
 */
export interface RenderOptimizationConfig {
  /**
   * 是否开启渐进式渲染
   */
  progressive?: boolean;

  /**
   * 渐进式渲染的阈值
   */
  progressiveThreshold?: number;

  /**
   * 是否启用懒更新
   */
  lazyUpdate?: boolean;

  /**
   * 是否启用动画
   */
  animation?: boolean;

  /**
   * 是否启用硬件加速
   */
  hardwareAcceleration?: boolean;

  /**
   * 帧率限制
   */
  frameRate?: number;
}

/**
 * 适配器接口定义
 */
export interface Adapter {
  /**
   * 初始化图表
   */
  init(options?: any): EChartsType;

  /**
   * 设置图表配置
   */
  setOption(option: any, notMerge?: boolean): void;

  /**
   * 获取图表实例
   */
  getInstance(): EChartsType | null;

  /**
   * 设置组件实例
   */
  setComponent?(component: any): void;

  /**
   * 绑定事件
   */
  on(eventName: string, handler: (params: any) => void): void;

  /**
   * 解绑事件
   */
  off(eventName: string, handler?: (params: any) => void): void;

  /**
   * 调整图表大小
   */
  resize(): void;

  /**
   * 显示加载中
   */
  showLoading(options?: any): void;

  /**
   * 隐藏加载中
   */
  hideLoading(): void;

  /**
   * 清空图表
   */
  clear(): void;

  /**
   * 销毁图表
   */
  dispose(): void;

  /**
   * 获取DataURL
   */
  getDataURL?(opts?: any): string | undefined;

  /**
   * 转换为DataURL
   */
  convertToDataURL?(opts?: any): string | undefined;

  /**
   * 渲染图表
   */
  render(): JSX.Element;
}

/**
 * 适配器配置选项
 */
export interface AdapterConfig {
  /**
   * 平台类型
   */
  platformType?: string;

  /**
   * 目标canvas元素ID
   */
  canvasId?: string;

  /**
   * 图表主题
   */
  theme?: string;

  /**
   * 渲染器类型
   */
  renderer?: 'canvas' | 'svg';

  /**
   * 设备像素比
   */
  devicePixelRatio?: number;

  /**
   * 宽度
   */
  width?: number;

  /**
   * 高度
   */
  height?: number;

  /**
   * 额外选项
   */
  [key: string]: any;
}
