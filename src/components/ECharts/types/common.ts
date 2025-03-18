/**
 * Taro ECharts 通用类型定义
 */
import { CSSProperties } from 'react';
import { ECBasicOption } from 'echarts/types/dist/shared';

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
  H5 = 'h5',
  WEAPP = 'weapp',
  ALIPAY = 'alipay',
  SWAN = 'swan',
  QQ = 'qq',
  JD = 'jd',
  TT = 'tt',
  DD = 'dd',
  KS = 'ks',
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

/**
 * ECharts组件属性
 */
export interface EChartsProps {
  option: ECBasicOption;
  theme?: string | object;
  width?: number | string;
  height?: number | string;
  loading?: boolean;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  onInit?: (chart: any) => void;
  onRendered?: () => void;
  onError?: (e: Error) => void;
  canvasId?: string;
  style?: CSSProperties;
  className?: string;
}

/**
 * 图表初始化选项
 */
export interface ChartInitOptions {
  canvas: any;
  ctx: any;
  width: number;
  height: number;
  devicePixelRatio: number;
  renderer?: string;
  theme?: string;
}

/**
 * 图表事件类型
 */
export enum ChartEventType {
  CLICK = 'click',
  DBLCLICK = 'dblclick',
  MOUSEOVER = 'mouseover',
  MOUSEOUT = 'mouseout',
  MOUSEMOVE = 'mousemove',
  MOUSEDOWN = 'mousedown',
  MOUSEUP = 'mouseup',
  GLOBALOUT = 'globalout',
  LEGENDSELECTCHANGED = 'legendselectchanged',
  LEGENDSELECTED = 'legendselected',
  LEGENDUNSELECTED = 'legendunselected',
  LEGENDSCROLL = 'legendscroll',
  DATAZOOM = 'datazoom',
  DATARANGESELECTED = 'datarangeselected',
  TIMELINECHANGED = 'timelinechanged',
  TIMELINEPLAYCHANGED = 'timelineplaychanged',
  RESTORE = 'restore',
  DATAVIEWCHANGED = 'dataviewchanged',
  MAGICTYPECHANGED = 'magictypechanged',
  GEOSELECTCHANGED = 'geoselectchanged',
  GEOSELECTED = 'geoselected',
  GEOUNSELECTED = 'geounselected',
  PIESELECTCHANGED = 'pieselectchanged',
  PIESELECTED = 'pieselected',
  PIEUNSELECTED = 'pieunselected',
  MAPSELECTCHANGED = 'mapselectchanged',
  MAPSELECTED = 'mapselected',
  MAPUNSELECTED = 'mapunselected',
  AXISAREASELECTED = 'axisareaselected',
  FOCUSNODEADJACENCY = 'focusnodeadjacency',
  UNFOCUSNODEADJACENCY = 'unfocusnodeadjacency',
  BRUSH = 'brush',
  BRUSHSELECTED = 'brushselected',
  RENDERED = 'rendered',
  FINISHED = 'finished'
}

/**
 * 图表事件监听器
 */
export interface ChartEventListener {
  eventType: ChartEventType | string;
  handler: Function;
}
