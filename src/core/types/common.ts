/**
 * ECharts 类型定义
 */
export type { EChartsOption } from 'echarts';

/**
 * 图表事件参数类型
 * 使用 ECharts 内的事件参数接口
 */
export interface ChartEventParams {
  componentType?: string;
  seriesType?: string;
  seriesIndex?: number;
  seriesName?: string;
  name?: string;
  dataIndex?: number;
  data?: unknown;
  value?: unknown;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
  target?: unknown;
}

/**
 * 图表事件监听器
 */
export type ChartEventListener = Record<string, (params: ChartEventParams) => void>;

/**
 * 图表渲染器类型
 */
export type ChartRenderer = 'canvas' | 'svg';

/**
 * DataURL选项
 */
export interface DataURLOption {
  type?: 'png' | 'jpeg';
  pixelRatio?: number;
  backgroundColor?: string;
  excludeComponents?: string[];
}

/**
 * 图表尺寸类型
 */
export interface ChartSize {
  width?: number | string;
  height?: number | string;
}

/**
 * 图表动画设置
 */
export interface ChartAnimation {
  enabled?: boolean;
  duration?: number;
  easing?: string;
  animationDuration?: number;
  animationDurationUpdate?: number;
}

/**
 * 图表主题设置
 */
export interface ChartTheme {
  theme?: string | object;
  backgroundColor?: string;
  textColor?: string;
  axisLineColor?: string;
  splitLineColor?: string;
}

/**
 * 图表加载状态配置
 */
export interface ChartLoadingOptions {
  text?: string;
  color?: string;
  textColor?: string;
  maskColor?: string;
  zlevel?: number;
  fontSize?: number;
  showSpinner?: boolean;
  spinnerRadius?: number;
  lineWidth?: number;
  fontWeight?: number | string;
  fontStyle?: string;
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
  CHART_READY = 'chartReady',
  CHART_RESIZE = 'chartResize',
  CHART_ERROR = 'chartError',
  CHART_DISPOSE = 'chartDispose',
}
