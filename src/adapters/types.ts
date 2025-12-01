/**
 * TaroViz 适配器类型定义
 */
import { CSSProperties } from 'react';

import { PlatformType, Adapter as CoreAdapter } from '../core';

export type Adapter = CoreAdapter;
export { PlatformType };

/**
 * 基础适配器选项
 */
export interface AdapterOptions {
  /**
   * 画布ID
   */
  canvasId?: string;

  /**
   * 宽度
   */
  width?: number | string;

  /**
   * 高度
   */
  height?: number | string;

  /**
   * 主题
   */
  theme?: string | object;

  /**
   * 初始化回调
   */
  onInit?: (instance: any) => void;

  /**
   * 图表选项
   */
  option?: any;

  /**
   * 样式
   */
  style?: CSSProperties;

  /**
   * 是否自动调整大小
   */
  autoResize?: boolean;

  /**
   * 设备像素比
   */
  devicePixelRatio?: number;

  /**
   * 渲染器类型
   */
  renderer?: 'canvas' | 'svg';

  /**
   * CSS类名
   */
  className?: string;

  /**
   * 容器引用
   */
  containerRef?: any;

  /**
   * 额外的平台特定选项
   */
  [key: string]: any;
}

/**
 * H5适配器选项
 */
export interface H5AdapterOptions extends AdapterOptions {
  /**
   * 容器引用
   */
  containerRef?: any;
}

/**
 * 微信小程序适配器选项
 */
export interface WeappAdapterOptions extends AdapterOptions {
  /**
   * 微信小程序组件实例
   */
  component?: any;
}

/**
 * 支付宝小程序适配器选项
 */
export interface AlipayAdapterOptions extends AdapterOptions {
  /**
   * 支付宝小程序特有属性
   */
}

/**
 * 百度小程序适配器选项
 */
export interface SwanAdapterOptions extends AdapterOptions {
  /**
   * 百度小程序特有属性
   */
}

/**
 * 鸿蒙OS适配器选项
 */
export interface HarmonyAdapterOptions extends AdapterOptions {
  /**
   * HarmonyOS特有属性
   */
}

/**
 * 钉钉小程序适配器选项
 */
export interface DDAdapterOptions extends AdapterOptions {
  /**
   * 钉钉小程序特有属性
   */
}

/**
 * 企业微信小程序适配器选项
 */
export interface QywxAdapterOptions extends AdapterOptions {
  /**
   * 企业微信小程序特有属性
   */
}

/**
 * 飞书小程序适配器选项
 */
export interface LarkAdapterOptions extends AdapterOptions {
  /**
   * 飞书小程序特有属性
   */
}

/**
 * 小程序通用适配器选项
 */
export interface MiniAppAdapterOptions extends AdapterOptions {
  /**
   * 小程序特有属性
   */
}
