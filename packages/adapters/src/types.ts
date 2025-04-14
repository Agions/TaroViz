/**
 * TaroViz 适配器类型定义
 */
import { PlatformType, Adapter } from '@agions/taroviz-core';
import { CSSProperties } from 'react';

export { PlatformType, Adapter };

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
  alipayOptions?: {
    /**
     * 是否启用离屏渲染
     */
    enableOffscreenRendering?: boolean;
  };
}

/**
 * 百度小程序适配器选项
 */
export interface SwanAdapterOptions extends AdapterOptions {
  /**
   * 百度智能小程序特有选项
   */
  swanOptions?: {
    /**
     * 是否启用复杂交互
     */
    enableComplexInteraction?: boolean;
  };
}

/**
 * 鸿蒙OS适配器选项
 */
export interface HarmonyAdapterOptions extends AdapterOptions {
  /**
   * 鸿蒙特有选项
   */
  harmonyOptions?: {
    /**
     * 是否启用硬件加速
     */
    enableHardwareAcceleration?: boolean;
  };
}

/**
 * 钉钉小程序适配器选项
 */
export interface DDAdapterOptions extends AdapterOptions {
  /**
   * 钉钉特有选项
   */
  ddOptions?: {
    /**
     * 是否启用企业级功能
     */
    enableEnterpriseFeatures?: boolean;
  };
}

/**
 * 企业微信小程序适配器选项
 */
export interface QYWXAdapterOptions extends AdapterOptions {
  /**
   * 企业微信特有选项
   */
  qywxOptions?: {
    /**
     * 是否启用企业级功能
     */
    enableEnterpriseFeatures?: boolean;
  };
}

/**
 * 飞书小程序适配器选项
 */
export interface LarkAdapterOptions extends AdapterOptions {
  /**
   * 飞书特有选项
   */
  larkOptions?: {
    /**
     * 是否启用协作功能
     */
    enableCollaboration?: boolean;
  };
}
