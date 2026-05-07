/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * useChartConnect 辅助函数
 * 将 useChartConnect 中的逻辑拆分为独立函数，提高代码可维护性
 */

import type {
  ChartInstance,
  ConnectEventType,
  ChartPointerEventParams,
  ChartSelectEventParams,
  ChartDataZoomEventParams,
  EventHandler,
} from './types';

// ============================================================================
// 导出类型
// ============================================================================

export type {
  ConnectEventType,
  ChartPointerEventParams,
  ChartSelectEventParams,
  ChartDataZoomEventParams,
} from './types';

// ============================================================================
// 内部类型
// ============================================================================

/** 图表联动项 */
export interface ChartConnectItem {
  instance: ChartInstance;
  id: string;
}

/** 事件处理器映射 */
export type EventHandlersMap = Map<string, Map<ConnectEventType, EventHandler>>;

// ============================================================================
// 事件处理器创建
// ============================================================================

/**
 * 创建联动事件处理器
 */
export function createConnectHandler(
  sourceId: string,

  eventType: ConnectEventType,
  disabled: boolean,

  eventFilter: ((eventType: ConnectEventType, params: unknown) => boolean) | undefined,
  chartsRef: React.MutableRefObject<Map<string, ChartConnectItem>>,
  optionsRef: React.MutableRefObject<{
    onConnect?: (
      sourceId: string,
      targetId: string,

      payload: { eventType: ConnectEventType; params: unknown }
    ) => void;
  }>
): EventHandler {
  return (params: unknown) => {
    if (disabled) return;

    // 应用事件过滤器
    if (eventFilter && !eventFilter(eventType, params)) {
      return;
    }

    // 分发联动事件到所有其他图表
    dispatchToOthers(sourceId, eventType, params, chartsRef);

    // 触发回调
    const currentOptions = optionsRef.current;
    if (currentOptions.onConnect) {
      chartsRef.current.forEach((item, targetId) => {
        if (targetId !== sourceId) {
          currentOptions.onConnect?.(sourceId, targetId, { eventType, params });
        }
      });
    }
  };
}

/**
 * 分发事件到其他图表
 */
export function dispatchToOthers(
  sourceId: string,

  eventType: ConnectEventType,
  params: unknown,
  chartsRef: React.MutableRefObject<Map<string, ChartConnectItem>>
): void {
  chartsRef.current.forEach((item, targetId) => {
    if (targetId === sourceId) return;

    try {
      switch (eventType) {
        case 'click':
        case 'hover': {
          const p = params as ChartPointerEventParams;
          item.instance.dispatchAction?.({
            type: 'showTip',
            seriesIndex: p.seriesIndex,
            dataIndex: p.dataIndex,
          });
          break;
        }
        case 'select': {
          const p = params as ChartSelectEventParams;
          item.instance.dispatchAction?.({
            type: 'toggleSelect',
            seriesIndex: p.seriesIndex,
            dataIndex: p.dataIndex,
          });
          break;
        }
        case 'dataZoom': {
          const p = params as ChartDataZoomEventParams;
          item.instance.dispatchAction?.({
            type: 'dataZoom',
            start: p.start,
            end: p.end,
            dataZoomIndex: p.dataZoomIndex,
            dataZoomIndexs: p.dataZoomIndexs,
          });
          break;
        }
        default:
          break;
      }
    } catch (e) {
      console.warn(`[useChartConnect] Failed to dispatch ${eventType} to ${targetId}:`, e);
    }
  });
}

// ============================================================================
// 事件绑定管理
// ============================================================================

/**
 * 绑定单个图表的联动事件
 */
export function bindChartEvents(
  chartInstance: ChartInstance,
  chartId: string,
  events: ConnectEventType[],
  createHandler: (chartId: string, eventType: ConnectEventType) => EventHandler,
  eventHandlersRef: React.MutableRefObject<EventHandlersMap>
): void {
  if (!chartInstance) return;

  const handlers = new Map<ConnectEventType, EventHandler>();

  // 为每个事件类型创建并绑定处理器
  events.forEach((eventType) => {
    const handler = createHandler(chartId, eventType);
    handlers.set(eventType, handler);

    try {
      chartInstance.on(eventType, handler);
    } catch (e) {
      console.warn(`[useChartConnect] Failed to bind ${eventType} event:`, e);
    }
  });

  eventHandlersRef.current.set(chartId, handlers);
}

/**
 * 解绑单个图表的联动事件
 */
export function unbindChartEvents(
  chartId: string,
  eventHandlersRef: React.MutableRefObject<EventHandlersMap>,
  chartsRef: React.MutableRefObject<Map<string, ChartConnectItem>>
): void {
  const handlers = eventHandlersRef.current.get(chartId);
  if (!handlers) return;

  const chartItem = chartsRef.current.get(chartId);
  if (!chartItem) return;

  handlers.forEach((handler, eventType) => {
    try {
      chartItem.instance.off(eventType, handler);
    } catch (e) {
      console.warn(`[useChartConnect] Failed to unbind ${eventType} event:`, e);
    }
  });

  eventHandlersRef.current.delete(chartId);
}

// ============================================================================
// 连接管理
// ============================================================================

/**
 * 生成唯一图表 ID
 */
export function generateChartId(): string {
  return `chart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 绑定图表到联动组
 */
export function connectChart(
  chartInstance: ChartInstance,
  chartId: string | undefined,
  groupName: string | undefined,
  chartsRef: React.MutableRefObject<Map<string, ChartConnectItem>>,
  connectedRef: React.MutableRefObject<boolean>,
  eventHandlersRef: React.MutableRefObject<EventHandlersMap>,
  bindEvents: (chartInstance: ChartInstance, chartId: string) => void
): string {
  const id = chartId || generateChartId();

  // 检查是否已连接
  if (chartsRef.current.has(id)) {
    console.warn(`[useChartConnect] Chart ${id} is already connected`);
    return id;
  }

  // 存储图表实例
  chartsRef.current.set(id, {
    instance: chartInstance,
    id,
  });

  // 绑定事件
  bindEvents(chartInstance, id);
  connectedRef.current = true;

  // 如果有 groupName，设置图表组
  if (groupName && 'group' in chartInstance) {
    try {
      (chartInstance as ChartInstance & { group?: string }).group = groupName;
    } catch (e) {
      console.warn('[useChartConnect] Failed to set chart group:', e);
    }
  }

  return id;
}

/**
 * 从联动组移除图表
 */
export function disconnectChart(
  chartInstance: ChartInstance,
  chartId: string | undefined,
  chartsRef: React.MutableRefObject<Map<string, ChartConnectItem>>,
  connectedRef: React.MutableRefObject<boolean>,
  unbindEvents: (chartId: string) => void
): void {
  // 查找图表 ID
  let targetId = chartId;
  if (!targetId) {
    chartsRef.current.forEach((item, id) => {
      if (item.instance === chartInstance) {
        targetId = id;
      }
    });
  }

  if (!targetId || !chartsRef.current.has(targetId)) {
    console.warn(`[useChartConnect] Chart ${targetId} not found in connection group`);
    return;
  }

  // 解绑事件
  unbindEvents(targetId);

  // 移除图表
  chartsRef.current.delete(targetId);

  // 更新连接状态
  connectedRef.current = chartsRef.current.size > 0;
}

/**
 * 批量连接图表
 */
export function connectAllCharts(
  charts: Array<{ instance: ChartInstance; id: string }>,
  connect: (instance: ChartInstance, id?: string) => void
): void {
  charts.forEach(({ instance, id }) => {
    connect(instance, id);
  });
}

/**
 * 批量断开所有图表
 */
export function disconnectAllCharts(
  chartsRef: React.MutableRefObject<Map<string, ChartConnectItem>>,
  connectedRef: React.MutableRefObject<boolean>,
  unbindEvents: (chartId: string) => void
): void {
  chartsRef.current.forEach((item, id) => {
    unbindEvents(id);
  });
  chartsRef.current.clear();
  connectedRef.current = false;
}

/**
 * 触发联动事件
 */
export function dispatchConnectEvent(
  sourceId: string,

  payload: { eventType: ConnectEventType; params: unknown } | undefined,
  disabled: boolean,
  chartsRef: React.MutableRefObject<Map<string, ChartConnectItem>>,
  dispatchToOthers: (sourceId: string, eventType: ConnectEventType, params: unknown) => void
): void {
  if (disabled) return;

  const chartItem = chartsRef.current.get(sourceId);
  if (!chartItem) {
    console.warn(`[useChartConnect] Source chart ${sourceId} not found`);
    return;
  }

  const { eventType, params } = payload || {};
  if (!eventType) {
    console.warn('[useChartConnect] Payload must include eventType');
    return;
  }

  // 分发事件到其他图表
  dispatchToOthers(sourceId, eventType, params);
}
