/**
 * TaroViz 适配器类型定义
 * 
 * 这个文件不再重新定义已在 @taroviz/core 中定义的接口，
 * 而是重新导出它们并扩展一些特定于适配器包的类型。
 */
import { CSSProperties, ReactNode } from 'react';
import { 
  Adapter as CoreAdapter, 
  AdapterOptions as CoreAdapterOptions,
  H5AdapterOptions as CoreH5AdapterOptions,
  WeappAdapterOptions as CoreWeappAdapterOptions
} from '@taroviz/core/types';

// 重新导出核心类型
export type Adapter = CoreAdapter;
export type AdapterOptions = CoreAdapterOptions;
export type H5AdapterOptions = CoreH5AdapterOptions;
export type WeappAdapterOptions = CoreWeappAdapterOptions & {
  // 确保 component 属性是必需的
  component: any;
};

/**
 * 基础适配器配置
 */
export interface BaseAdapterConfig {
  /**
   * 图表宽度
   */
  width?: number | string;
  
  /**
   * 图表高度
   */
  height?: number | string;
  
  /**
   * 图表主题
   */
  theme?: string | object;
  
  /**
   * 是否自动调整大小
   */
  autoResize?: boolean;
  
  /**
   * 画布ID
   */
  canvasId?: string;
  
  /**
   * 容器引用
   */
  containerRef?: any;
  
  /**
   * 图表选项
   */
  option?: any;

  /**
   * 渲染器类型
   */
  renderer?: 'canvas' | 'svg';
  
  /**
   * 样式对象
   */
  style?: CSSProperties;

  /**
   * CSS类名
   */
  className?: string;

  /**
   * 初始化回调
   */
  onInit?: (instance: any) => void;

  /**
   * 准备完成回调
   */
  onReady?: (instance: any) => void;

  // 允许其他属性
  [key: string]: any;
}

/**
 * 适配器工厂
 */
export interface AdapterFactory {
  /**
   * 创建适配器实例
   */
  create: (options: AdapterOptions) => Adapter;
} 