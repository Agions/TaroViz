/**
 * Taro ECharts 组件属性类型定义
 */
import { MutableRefObject, CSSProperties } from 'react';
import { CommonProps, EChartsOption, EChartsRenderer, ThemeType, LoadingOption } from './common';

/**
 * ECharts组件属性
 */
export interface EChartsProps extends CommonProps {
  /**
   * 图表宽度
   */
  width?: string | number;

  /**
   * 图表高度
   */
  height?: string | number;

  /**
   * 图表主题
   */
  theme?: ThemeType;

  /**
   * 图表配置项
   */
  option?: EChartsOption;

  /**
   * Canvas ID
   */
  canvasId?: string;

  /**
   * 是否不合并配置
   */
  notMerge?: boolean;

  /**
   * 是否延迟更新
   */
  lazyUpdate?: boolean;

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
   * 是否显示加载状态
   */
  showLoading?: boolean;

  /**
   * 加载选项
   */
  loadingOption?: LoadingOption;

  /**
   * 初始化回调
   */
  onInit?: (instance: any) => void;

  /**
   * 图表就绪回调
   */
  onChartReady?: (instance: any) => void;

  /**
   * 配置变更回调
   */
  onOptionChanged?: (option: EChartsOption) => void;

  /**
   * 渲染完成回调
   */
  onRendered?: () => void;

  /**
   * 尺寸变化回调
   */
  onResize?: (width: number, height: number) => void;

  /**
   * 事件处理器
   */
  onEvents?: Record<string, Function>;

  /**
   * 自定义样式
   */
  style?: CSSProperties;

  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * ECharts适配器选项
 */
export interface AdapterOptions {
  /**
   * 小程序环境下的Canvas ID
   */
  canvasId: string;

  /**
   * 图表宽度
   */
  width: string | number;

  /**
   * 图表高度
   */
  height: string | number;

  /**
   * 是否禁用触摸事件
   */
  disableTouch: boolean;

  /**
   * 图表主题
   */
  theme?: ThemeType;

  /**
   * 实例初始化回调
   */
  onInit?: (instance: any) => void;

  /**
   * 容器元素Ref
   */
  containerRef: MutableRefObject<any>;

  /**
   * 渲染器类型
   */
  renderer?: EChartsRenderer;

  /**
   * 设备像素比
   */
  devicePixelRatio?: number;
}

/**
 * 适配器选项接口
 */
export interface AdapterProps {
  /**
   * Canvas ID
   */
  canvasId: string;

  /**
   * 宽度
   */
  width: string | number;

  /**
   * 高度
   */
  height: string | number;

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
   * 初始化回调
   */
  onInit?: (instance: any) => void;

  /**
   * 事件处理器
   */
  onEvents?: Record<string, Function>;
}
