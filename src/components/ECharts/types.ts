import { CSSProperties } from 'react';
import { ThemeType } from './types/common';

/**
 * ECharts配置项
 */
export interface EChartsOption {
  [key: string]: any;
}

/**
 * ECharts组件属性
 */
export interface EChartsProps {
  option: EChartsOption;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: CSSProperties;
  theme?: ThemeType;
  canvasId?: string;
  disableTouch?: boolean;
  onEvents?: Record<string, (params: any) => void>;
  onInit?: (instance: any) => void;
  onChartReady?: (instance: any) => void;
  onOptionChanged?: (option: EChartsOption) => void;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  showLoading?: boolean;
  loadingOption?: object;
  renderer?: 'canvas' | 'svg';
  devicePixelRatio?: number;
  onRendered?: () => void;
  onResize?: (width: number, height: number) => void;
  loading?: boolean;
}

/**
 * ECharts组件引用
 */
export interface EChartsRef {
  getEchartsInstance: () => any;
  setOption: (option: EChartsOption, notMerge?: boolean) => void;
  resize: () => void;
  dispatchAction: (payload: any) => void;
  convertToDataURL: (opts?: object) => string | Promise<string | undefined> | undefined;
  clear: () => void;
  dispose: () => void;
  showLoading: (loadingOption?: object) => void;
  hideLoading: () => void;
  getDataURL: (opts?: object) => string | Promise<string | undefined> | undefined;
}

// 从platform.ts导入适配器接口，避免重复定义
export type { Adapter, AdapterOptions } from './types/platform';
