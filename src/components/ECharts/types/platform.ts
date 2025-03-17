import React from 'react';
import { ThemeType } from './common';

/**
 * 平台特定类型定义
 */
// 移除冲突的导入
// import { AdapterOptions } from './props';

/**
 * 平台适配器接口
 * 定义每个平台适配器必须实现的方法
 */
export interface Adapter {
  /**
   * 初始化图表
   */
  init(): any;

  /**
   * 获取ECharts实例
   */
  getInstance(): any;

  /**
   * 设置图表配置项
   */
  setOption(option: any, opts?: any): void;

  /**
   * 获取图表宽度
   */
  getWidth(): number;

  /**
   * 获取图表高度
   */
  getHeight(): number;

  /**
   * 获取DOM元素
   */
  getDom(): HTMLElement | null;

  /**
   * 调整图表大小
   */
  resize(opts?: any): void;

  /**
   * 触发图表行为
   */
  dispatchAction(payload: any): void;

  /**
   * 转换为DataURL
   */
  convertToDataURL(opts?: object): string | Promise<string | undefined> | undefined;

  /**
   * 清空图表
   */
  clear(): void;

  /**
   * 获取DataURL
   */
  getDataURL(opts?: object): string | Promise<string | undefined> | undefined;

  /**
   * 绑定事件
   */
  on(eventName: string, handler: Function, context?: object): void;

  /**
   * 解绑事件
   */
  off(eventName: string, handler?: Function): void;

  /**
   * 显示加载动画
   */
  showLoading(opts?: object): void;

  /**
   * 隐藏加载动画
   */
  hideLoading(): void;

  /**
   * 销毁实例
   */
  dispose(): void;

  /**
   * 渲染图表
   */
  render(): React.ReactNode;
}

/**
 * H5适配器选项
 */
export interface H5AdapterOptions extends AdapterOptions {
  /**
   * 容器引用
   */
  containerRef: React.RefObject<any>;

  /**
   * 画布ID
   */
  canvasId?: string;

  /**
   * 宽度
   */
  width?: string | number;

  /**
   * 高度
   */
  height?: string | number;

  /**
   * 初始化回调
   */
  onInit?: (instance: any) => void;

  /**
   * H5特定选项
   */
  h5Options?: {
    /**
     * 主题
     */
    theme?: ThemeType;

    /**
     * 事件处理器
     */
    onEvents?: Record<string, Function>;
  };
}

/**
 * 小程序适配器选项基类
 */
export interface MiniAppAdapterOptions extends AdapterOptions {
  /**
   * 是否使用2D上下文
   */
  useContext2d?: boolean;

  /**
   * Canvas类型
   */
  canvasType?: '2d' | '2d-native';
}

/**
 * 微信小程序适配器选项
 */
export interface WeappAdapterOptions extends MiniAppAdapterOptions {
  /**
   * 画布ID
   */
  canvasId: string;

  /**
   * 宽度
   */
  width?: string | number;

  /**
   * 高度
   */
  height?: string | number;

  /**
   * 画布引用
   */
  canvasRef: React.RefObject<any>;

  /**
   * 图表配置
   */
  option?: any;

  /**
   * 是否开启高清适配
   */
  enableHDCanvas?: boolean;

  /**
   * 初始化回调
   */
  onInit?: (instance: any) => void;
}

/**
 * 支付宝小程序适配器选项
 */
export interface AlipayAdapterOptions extends MiniAppAdapterOptions {
  /**
   * 画布ID
   */
  canvasId: string;

  /**
   * 宽度
   */
  width?: string | number;

  /**
   * 高度
   */
  height?: string | number;

  /**
   * 容器引用
   */
  containerRef?: React.RefObject<any>;

  /**
   * 画布引用
   */
  canvasRef?: React.RefObject<any>;

  /**
   * 图表配置
   */
  option?: any;

  /**
   * 初始化回调
   */
  onInit?: (instance: any) => void;

  /**
   * 支付宝特有参数
   */
  alipayOptions?: Record<string, any>;
}

/**
 * 鸿蒙OS适配器选项
 */
export interface HarmonyAdapterOptions extends MiniAppAdapterOptions {
  /**
   * 画布ID
   */
  canvasId: string;

  /**
   * 宽度
   */
  width?: string | number;

  /**
   * 高度
   */
  height?: string | number;

  /**
   * 容器引用
   */
  containerRef?: React.RefObject<any>;

  /**
   * 画布引用
   */
  canvasRef?: React.RefObject<any>;

  /**
   * 图表配置
   */
  option?: any;

  /**
   * 初始化回调
   */
  onInit?: (instance: any) => void;

  /**
   * 鸿蒙特有参数
   */
  harmonyOptions?: Record<string, any>;
}

/**
 * 适配器基础选项
 */
export interface AdapterOptions {
  /**
   * 主题
   */
  theme?: ThemeType;

  /**
   * 渲染器类型
   */
  renderer?: 'canvas' | 'svg';

  /**
   * 设备像素比
   */
  devicePixelRatio?: number;

  /**
   * 是否禁用触摸事件
   */
  disableTouch?: boolean;

  /**
   * 事件处理器
   */
  onEvents?: Record<string, Function>;
}

/**
 * DataURL选项
 */
export interface DataURLOption {
  [key: string]: any;
}
