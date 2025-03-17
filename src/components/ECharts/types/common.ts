/**
 * Taro ECharts 通用类型定义
 */
import { CSSProperties } from 'react';

/**
 * ECharts配置类型
 * 允许任何有效的ECharts配置
 */
export type EChartsOption = Record<string, any>;

/**
 * 组件渲染器类型
 */
export type EChartsRenderer = 'canvas' | 'svg';

/**
 * 事件处理函数映射
 */
export type EChartsEventHandlers = Record<string, (params: any) => void>;

/**
 * 加载选项
 */
export interface LoadingOption {
  /**
   * 加载文本
   */
  text?: string;

  /**
   * 加载颜色
   */
  color?: string;

  /**
   * 加载文本颜色
   */
  textColor?: string;

  /**
   * 加载蒙层颜色
   */
  maskColor?: string;

  /**
   * 字体大小
   */
  fontSize?: number;

  /**
   * 是否显示旋转动画
   */
  showSpinner?: boolean;

  /**
   * 旋转器半径
   */
  spinnerRadius?: number;

  /**
   * 旋转器线宽
   */
  lineWidth?: number;
}

/**
 * 转换DataURL的选项
 */
export interface DataURLOption {
  type?: 'png' | 'jpeg';
  pixelRatio?: number;
  backgroundColor?: string;
  excludeComponents?: string[];
}

/**
 * 主题类型
 */
export type ThemeType = string | Record<string, any>;

/**
 * 平台类型枚举
 */
export enum PlatformType {
  WEAPP = 'weapp',
  ALIPAY = 'alipay',
  H5 = 'h5',
  HARMONY = 'harmony'
}

/**
 * 组件公共属性
 */
export interface CommonProps {
  className?: string;
  style?: CSSProperties;
}

/**
 * 图表实例方法
 */
export interface ChartMethods {
  getEchartsInstance(): any;
  setOption(option: EChartsOption, notMerge?: boolean): void;
  resize(): void;
  dispatchAction(payload: any): void;
  convertToDataURL(opts?: DataURLOption): string | undefined;
  clear(): void;
  dispose(): void;
  showLoading(loadingOption?: LoadingOption): void;
  hideLoading(): void;
  getDataURL(opts?: DataURLOption): string | undefined;
}
