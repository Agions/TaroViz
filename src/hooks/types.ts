/**
 * Hooks 共享类型定义
 */
import type { EChartsOption } from 'echarts';

// ============================================================================
// 事件参数类型
// ============================================================================

/** click/hover 事件参数 */
export interface ChartPointerEventParams {
  seriesIndex?: number;
  dataIndex?: number;
  name?: string | number;
  value?: unknown;
  [key: string]: unknown;
}

/** select 事件参数 */
export interface ChartSelectEventParams {
  seriesIndex?: number;
  dataIndex?: number;
  [key: string]: unknown;
}

/** dataZoom 事件参数 */
export interface ChartDataZoomEventParams {
  start?: number;
  end?: number;
  dataZoomIndex?: number;
  dataZoomIndexs?: number[];
  [key: string]: unknown;
}

/** 事件处理器 */
export type EventHandler = (params?: unknown) => void;

// ============================================================================
// useChartConnect 类型
// ============================================================================

/** 联动事件类型 */
export type ConnectEventType = 'click' | 'hover' | 'select' | 'dataZoom';

/** 联动事件参数（联合类型） */
export type ConnectEventParams =
  | ({ eventType: 'click' } & ChartPointerEventParams)
  | ({ eventType: 'hover' } & ChartPointerEventParams)
  | ({ eventType: 'select' } & ChartSelectEventParams)
  | ({ eventType: 'dataZoom' } & ChartDataZoomEventParams);

/** 联动配置选项 */
export interface UseChartConnectOptions {
  chartIds?: string[];
  events?: ConnectEventType[];
  autoBind?: boolean;
  groupName?: string;
  disabled?: boolean;
  onConnect?: (
    sourceId: string,
    targetId: string,
    payload: { eventType: ConnectEventType; params: unknown }
  ) => void;
  eventFilter?: (event: string, params: unknown) => boolean;
}

/** 联动返回值 */
export interface UseChartConnectReturn {
  connect: (chartInstance: ChartInstance, chartId?: string) => void;
  disconnect: (chartInstance: ChartInstance, chartId?: string) => void;
  dispatchConnect: (
    sourceId: string,
    payload: {
      eventType: ConnectEventType;
      params: ChartPointerEventParams | ChartSelectEventParams | ChartDataZoomEventParams;
    }
  ) => void;
  connectAll: (charts: Array<{ instance: ChartInstance; id: string }>) => void;
  disconnectAll: () => void;
  isConnected: boolean;
}

// ============================================================================
// useDataZoom 类型
// ============================================================================

/** dataZoom 类型 */
export type DataZoomType = 'inside' | 'slider';

/** dataZoom 配置选项 */
export interface UseDataZoomOptions {
  type?: DataZoomType;
  start?: number;
  end?: number;
  minSpan?: number;
  maxSpan?: number;
  zoomLock?: boolean;
  throttle?: number;
  disabled?: boolean;
  brushSelect?: boolean;
  zoomMode?: 'scale' | 'mix';
  resetOnUnmount?: boolean;
  onZoomChange?: (range: { start: number; end: number }) => void;
}

/** 缩放范围 */
export interface ZoomRange {
  start: number;
  end: number;
}

/** dataZoom 返回值 */
export interface UseDataZoomReturn {
  bindDataZoom: (chartInstance: ChartInstance) => void;
  setZoomRange: (start: number, end: number) => void;
  resetZoom: () => void;
  getZoomRange: () => ZoomRange;
  startValue: import('react').RefObject<number | string | Date | undefined>;
  endValue: import('react').RefObject<number | string | Date | undefined>;
  bindEvents: (chartInstance: ChartInstance) => void;
  onZoomChange?: (range: ZoomRange) => void;
}

// ============================================================================
// ChartInstance
// ============================================================================

/** 图表实例类型 */
export interface ChartInstance {
  setOption: (option: EChartsOption, notMerge?: boolean, lazyUpdate?: boolean) => void;
  getOption: () => EChartsOption;
  resize: (option?: { width?: number | string; height?: number | string }) => void;
  on: (event: string, handler: EventHandler) => void;
  off: (event: string, handler?: EventHandler) => void;
  showLoading: (opts?: LoadingOptions) => void;
  hideLoading: () => void;
  dispose: () => void;
  isDisposed: () => boolean;
  getWidth: () => number;
  getHeight: () => number;
  getDom: () => HTMLElement;
  getDataURL?: (options?: {
    type?: string;
    pixelRatio?: number;
    backgroundColor?: string;
  }) => string;
  getSvgData?: () => string;
  getCompressedDataURL?: (options?: { seriesIndex?: number; dimension?: number }) => string;
  clear?: () => void;
  dispatchAction?: (action: { type: string; [key: string]: unknown }) => void;
  group?: string;
  [key: string]: unknown;
}

/** 加载选项 */
export interface LoadingOptions {
  text?: string;
  color?: string;
  textColor?: string;
  maskColor?: string;
  zlevel?: number;
}
