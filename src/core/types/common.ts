/**
 * ECharts 类型定义
 */
export type EChartsOption = any;

/**
 * 图表事件监听器
 */
export type ChartEventListener = Record<string, (params: any) => void>;

/**
 * 图表渲染器类型
 */
export type ChartRenderer = 'canvas' | 'svg';

/**
 * DataURL选项
 */
export interface DataURLOption {
  /**
   * 导出的图片类型
   */
  type?: 'png' | 'jpeg';

  /**
   * 设备像素比
   */
  pixelRatio?: number;

  /**
   * 背景色
   */
  backgroundColor?: string;

  /**
   * 排除的组件列表
   */
  excludeComponents?: string[];
}

/**
 * 图表尺寸类型
 */
export interface ChartSize {
  /**
   * 宽度
   */
  width?: number | string;

  /**
   * 高度
   */
  height?: number | string;
}

/**
 * 图表动画设置
 */
export interface ChartAnimation {
  /**
   * 是否启用动画
   */
  enabled?: boolean;

  /**
   * 动画时长
   */
  duration?: number;

  /**
   * 动画缓动效果
   */
  easing?: string;

  /**
   * 初始动画时长
   */
  animationDuration?: number;

  /**
   * 更新动画时长
   */
  animationDurationUpdate?: number;
}

/**
 * 图表主题设置
 */
export interface ChartTheme {
  /**
   * 主题名称或配置
   */
  theme?: string | object;

  /**
   * 背景色
   */
  backgroundColor?: string;

  /**
   * 文本颜色
   */
  textColor?: string;

  /**
   * 轴线颜色
   */
  axisLineColor?: string;

  /**
   * 分割线颜色
   */
  splitLineColor?: string;
}

/**
 * 图表加载状态配置
 */
export interface ChartLoadingOptions {
  /**
   * 加载提示文本
   */
  text?: string;

  /**
   * 加载动画颜色
   */
  color?: string;

  /**
   * 文本颜色
   */
  textColor?: string;

  /**
   * 遮罩颜色
   */
  maskColor?: string;

  /**
   * z层级
   */
  zlevel?: number;

  /**
   * 字体大小
   */
  fontSize?: number;

  /**
   * 是否显示旋转器
   */
  showSpinner?: boolean;

  /**
   * 旋转器半径
   */
  spinnerRadius?: number;

  /**
   * 线宽
   */
  lineWidth?: number;

  /**
   * 字体粗细
   */
  fontWeight?: number | string;

  /**
   * 字体样式
   */
  fontStyle?: string;

  /**
   * 字体族
   */
  fontFamily?: string;
}

/**
 * 图表事件声明
 */
export enum ChartEventType {
  CLICK = 'click',
  MOUSEMOVE = 'mousemove',
  MOUSEUP = 'mouseup',
  MOUSEDOWN = 'mousedown',
  MOUSEOVER = 'mouseover',
  MOUSEOUT = 'mouseout',
  GLOBALOUT = 'globalout',
  LEGENDSELECTED = 'legendselected',
  LEGENDUNSELECTED = 'legendunselected',
  LEGENDSELECTCHANGED = 'legendselectchanged',
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
  FINISHED = 'finished',
  // 自定义事件
  CHART_READY = 'chartReady',
  CHART_RESIZE = 'chartResize',
  CHART_ERROR = 'chartError',
  CHART_DISPOSE = 'chartDispose',
}
