/**
 * 支持的平台类型
 */
import type { EChartsType, EChartsOption } from 'echarts';
import type { CSSProperties } from 'react';
import type { ChartEventParams } from './common';

export enum PlatformType {
  H5 = 'h5',
  WEAPP = 'weapp',
  ALIPAY = 'alipay',
  SWAN = 'swan',
  TT = 'tt',
  QQ = 'qq',
  JD = 'jd',
  HARMONY = 'harmony',
  DD = 'dd',
  QYWX = 'qywx',
  LARK = 'lark',
  KWAI = 'kwai',
}

export type Platform = `${PlatformType}` | 'web' | 'ks';

/** 图表事件处理器 */
export type EventHandler = (params: ChartEventParams) => void;

/**
 * 适配器通用选项
 */
export interface AdapterOptions {
  platform?: Platform;
  canvasId?: string;
  width?: number | string;
  height?: number | string;
  theme?: string | object;
  autoResize?: boolean;
  devicePixelRatio?: number;
  onInit?: (instance: EChartsType) => void;
  containerRef?: HTMLElement | { current: HTMLElement | null };
  option?: EChartsOption;
  renderer?: 'canvas' | 'svg';
  style?: CSSProperties;
  className?: string;
}

/**
 * H5环境适配器选项
 */
export interface H5AdapterOptions extends AdapterOptions {
  containerRef?: HTMLElement | { current: HTMLElement | null };
  option?: EChartsOption;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  style?: CSSProperties;
  className?: string;
  renderer?: 'canvas' | 'svg';
}

/**
 * 小程序适配器基础选项
 */
export interface MiniAppAdapterOptions extends AdapterOptions {
  componentInstance?: object;
  disableTouch?: boolean;
  renderMode?: '2d' | 'webgl';
  option?: EChartsOption;
  style?: CSSProperties;
}

/**
 * 微信小程序适配器选项
 */
export interface WeappAdapterOptions extends MiniAppAdapterOptions {
  weappOptions?: {
    enableContextMenu?: boolean;
    enableCrossPageTransfer?: boolean;
  };
}

/**
 * 支付宝小程序适配器选项
 */
export interface AlipayAdapterOptions extends MiniAppAdapterOptions {
  alipayOptions?: {
    enableOffscreenRendering?: boolean;
  };
}

/**
 * 百度小程序适配器选项
 */
export interface SwanAdapterOptions extends MiniAppAdapterOptions {
  swanOptions?: {
    enableComplexInteraction?: boolean;
    enablePerformanceOptimization?: boolean;
  };
}

/**
 * 鸿蒙OS适配器选项
 */
export interface HarmonyAdapterOptions extends AdapterOptions {
  harmonyOptions?: {
    enableHardwareAcceleration?: boolean;
  };
}

/**
 * 适配器接口
 */
export interface Adapter {
  init(options?: object): EChartsType;
  getInstance(): EChartsType | null;
  setOption(option: EChartsOption, notMerge?: boolean, lazyUpdate?: boolean): void;
  getWidth(): number;
  getHeight(): number;
  getDom(): HTMLElement | null;
  resize(opts?: object): void;
  dispatchAction(payload: object): void;
  convertToDataURL(opts?: object): string | undefined;
  clear(): void;
  getDataURL(opts?: object): string | undefined;
  on(eventName: string, handler: EventHandler, context?: object): void;
  off(eventName: string, handler?: EventHandler): void;
  showLoading(opts?: object): void;
  hideLoading(): void;
  dispose(): void;
  render?(): JSX.Element | null;
}
