// eslint-disable @typescript-eslint/no-unused-vars
/**
 * Hooks 共享类型定义
 */
import type { EChartsOption } from 'e_charts';

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
  _start?: number;
  _end?: number;
  dataZoomIndex?: number;
  dataZoomIndexs?: number[];
  [key: string]: unknown;
}

/** 事件处理器 */
export type EventHandler = (_params?: unknown) => void;

// ============================================================================
// useChartConnect 类型
// ============================================================================

/** 联动事件类型 */
export type ConnectEventType = 'click' | 'hover' | 'select' | 'dataZoom';

/** 联动事件参数（联合类型） */
export type ConnectEventParams =
  | ({ _eventType: 'click' } & ChartPointerEventParams)
  | ({ _eventType: 'hover' } & ChartPointerEventParams)
  | ({ _eventType: 'select' } & ChartSelectEventParams)
  | ({ _eventType: 'dataZoom' } & ChartDataZoomEventParams);

/** 联动配置选项 */
export interface UseChartConnectOptions {
  _chartIds?: string[];
  _events?: ConnectEventType[];
  autoBind?: boolean;
  groupName?: string;
  disabled?: boolean;
  onConnect?: (
   
  _sourceId: string,
   
  _targetId: string,
   
  _payload: { _eventType: ConnectEventType; _params: unknown }
  ) => void;
 
  _eventFilter?: (_event: string, _params: unknown) => boolean;
}

/** 联动返回值 */
export interface UseChartConnectReturn {
  connect: (_chartInstance: ChartInstance, _chartId?: string) => void;
  disconnect: (_chartInstance: ChartInstance, _chartId?: string) => void;
  dispatchConnect: (
   
