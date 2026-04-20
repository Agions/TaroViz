/**
 * TaroViz 适配器类型定义
 */
import type { CSSProperties } from 'react';
import type { EChartsOption, EChartsType } from 'echarts';

import { Adapter as CoreAdapter, PlatformType } from '../core';

export type Adapter = CoreAdapter;
export { PlatformType };

/** 容器引用类型 — 支持 DOM 元素或 React ref */
type ContainerRef = HTMLElement | { current: HTMLElement | null };

/**
 * 基础适配器选项
 */
export interface AdapterOptions {
  canvasId?: string;
  width?: number | string;
  height?: number | string;
  theme?: string | object;
  /** 初始化完成回调 */
  onInit?: (instance: EChartsType) => void;
  /** 图表配置 */
  option?: EChartsOption;
  style?: CSSProperties;
  autoResize?: boolean;
  devicePixelRatio?: number;
  renderer?: 'canvas' | 'svg';
  className?: string;
  /** 容器 DOM 引用 */
  containerRef?: ContainerRef;
  /** 额外平台特定选项 */
  [key: string]: unknown;
}

/**
 * H5适配器选项
 */
export interface H5AdapterOptions extends AdapterOptions {
  containerRef?: ContainerRef;
}

/**
 * 微信小程序适配器选项
 */
export interface WeappAdapterOptions extends AdapterOptions {
  /** 微信小程序组件实例 */
  component?: object;
}

/**
 * 支付宝小程序适配器选项
 */
export interface AlipayAdapterOptions extends AdapterOptions {}

/**
 * 百度小程序适配器选项
 */
export interface SwanAdapterOptions extends AdapterOptions {}

/**
 * 鸿蒙OS适配器选项
 */
export interface HarmonyAdapterOptions extends AdapterOptions {}

/**
 * 钉钉小程序适配器选项
 */
export interface DDAdapterOptions extends AdapterOptions {}

/**
 * 抖音小程序适配器选项
 */
export interface TTAdapterOptions extends AdapterOptions {}

/**
 * QQ小程序适配器选项
 */
export interface QQAdapterOptions extends AdapterOptions {}

/**
 * 京东小程序适配器选项
 */
export interface JDAdapterOptions extends AdapterOptions {}

/**
 * 快手小程序适配器选项
 */
export interface KwaiAdapterOptions extends AdapterOptions {}

/**
 * 企业微信小程序适配器选项
 */
export interface QywxAdapterOptions extends AdapterOptions {}

/**
 * 飞书小程序适配器选项
 */
export interface LarkAdapterOptions extends AdapterOptions {}

/**
 * 小程序通用适配器选项
 */
export interface MiniAppAdapterOptions extends AdapterOptions {}
