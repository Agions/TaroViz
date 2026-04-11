/**
 * ECharts 类型定义
 */
export type { EChartsOption } from 'echarts';

/**
 * ECharts 鼠标事件参数类型
 * 基于 ECharts CallbackDataParams，用于 click、mousemove 等鼠标事件
 */
export interface EChartsMouseEventParams {
  componentType: string;
  componentSubType?: string;
  componentIndex?: number;
  seriesType?: string;
  seriesIndex?: number;
  seriesId?: string;
  seriesName?: string;
  name?: string;
  dataIndex?: number;
  data?: unknown;
  dataType?: string;
  value?: unknown;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
  dimensionNames?: string[];
  encode?: Record<string, number[]>;
  marker?: string;
  status?: string;
  dimensionIndex?: number;
  percent?: number;
}

/**
 * ECharts DataZoom 事件参数类型
 */
export interface EChartsDataZoomEventParams {
  type: 'datazoom';
  start?: number;
  end?: number;
  startValue?: number;
  endValue?: number;
  dataZoomIndex?: number;
  batch?: Array<{
    start?: number;
    end?: number;
    startValue?: number;
    endValue?: number;
    dataZoomIndex?: number;
  }>;
}

/**
 * ECharts Legend 事件参数类型
 */
export interface EChartsLegendEventParams {
  type: 'legendselectchanged' | 'legendselected' | 'legendunselected';
  name: string;
  selected: Record<string, boolean>;
}

/**
 * ECharts Tooltip 事件参数类型
 */
export interface EChartsTooltipEventParams {
  type: 'tooltipshow' | 'tooltiphide';
  data?: unknown;
  dataIndex?: number;
  dataType?: string;
  name?: string;
  value?: unknown;
}

/**
 * 图表事件参数类型（向后兼容别名）
 */
export type ChartEventParams = EChartsMouseEventParams;

/**
 * 图表导出选项
 */
export interface ChartExportOptions {
  type?: 'png' | 'jpeg' | 'svg';
  filename?: string;
  pixelRatio?: number;
  backgroundColor?: string;
}

/**
 * 图表联动配置
 */
export interface ChartLinkageConfig {
  linkedChartIds?: string[];
  enableClickLinkage?: boolean;
  enableZoomLinkage?: boolean;
  enableLegendLinkage?: boolean;
  enableFilterLinkage?: boolean;
}

/**
 * ECharts 系列数据基本类型
 */
export interface EChartsSeriesData {
  name?: string;
  type?: string;
  data?: unknown[];
  [key: string]: unknown;
}

/**
 * ECharts 事件参数联合类型
 */
export type EChartsEventParams =
  | EChartsMouseEventParams
  | EChartsDataZoomEventParams
  | EChartsLegendEventParams
  | EChartsTooltipEventParams
  | Record<string, unknown>;

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
