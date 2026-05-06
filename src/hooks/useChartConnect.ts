/**
 * useChartConnect - 图表联动 Hook
 * 实现多个图表之间的联动（chartConnect），当一个图表被操作时，其他联动图表同步变化
 * 
 * @refactor 已拆分为多个辅助函数，详见 chartConnectHelpers.ts
 */
import { useRef, useCallback, useEffect, useMemo } from 'react';
import type {
  ChartInstance,
  UseChartConnectOptions,
  UseChartConnectReturn,
  ConnectEventType,
} from './types';
import {
  createConnectHandler,
  dispatchToOthers,
  bindChartEvents,
  unbindChartEvents,
  connectChart,
  disconnectChart,
  connectAllCharts,
  disconnectAllCharts,
  dispatchConnectEvent,
  type ChartConnectItem,
  type EventHandlersMap,
} from './chartConnectHelpers';

// ============================================================================
// 导出共享类型（从 types.ts re-export）
// ============================================================================

/** 联动配置选项（从 types.ts 导出） */
export type { UseChartConnectOptions, UseChartConnectReturn } from './types';

// ============================================================================
// Hook 实现
// ============================================================================

/**
 * 使用图表联动
 * @param options 配置选项
 * @returns 图表联动操作接口
 */
export function useChartConnect(options: UseChartConnectOptions): UseChartConnectReturn {
  const {
    chartIds = [],
    events = useMemo(() => ['click', 'hover', 'select', 'dataZoom'], []),
    autoBind = false,
    groupName,
    disabled = false,
    onConnect,
    eventFilter,
  } = options;

  // Refs
  // 使用 useMemo 缓存初始值，避免每次渲染都创建新 Map
  const chartsRef = useRef<Map<string, ChartConnectItem>>(
    (() => {
      const initialMap = new Map();
      return initialMap;
    })()
  );
  const connectedRef = useRef(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const eventHandlersRef = useRef<EventHandlersMap>(
    (() => {
      const initialMap = new Map();
      return initialMap;
    })()
  );

  /**
   * 创建联动事件处理器
   */
  const createConnectHandlerCallback = useCallback(
    (sourceId: string, eventType: ConnectEventType) => {
      return createConnectHandler(
        sourceId,
        eventType,
        disabled,
        eventFilter,
        chartsRef,
        optionsRef
      );
    },
    [disabled, eventFilter, chartsRef, optionsRef]
  );

  /**
   * 分发事件到其他图表
   */
  const dispatchToOthersCallback = useCallback(
    (sourceId: string, eventType: ConnectEventType, params: unknown) => {
      dispatchToOthers(sourceId, eventType, params, chartsRef);
    },
    [chartsRef]
  );

  /**
   * 绑定单个图表的联动事件
   */
  const bindChartEventsCallback = useCallback(
    (chartInstance: ChartInstance, chartId: string) => {
      bindChartEvents(
        chartInstance,
        chartId,
        events,
        createConnectHandlerCallback,
        eventHandlersRef
      );
    },
    [events, createConnectHandlerCallback, eventHandlersRef]
  );

  /**
   * 解绑单个图表的联动事件
   */
  const unbindChartEventsCallback = useCallback(
    (chartId: string) => {
      unbindChartEvents(chartId, eventHandlersRef, chartsRef);
    },
    [eventHandlersRef, chartsRef]
  );

  /**
   * 绑定图表到联动组
   */
  const connect = useCallback(
    (chartInstance: ChartInstance, chartId?: string) => {
      connectChart(
        chartInstance,
        chartId,
        groupName,
        chartsRef,
        connectedRef,
        eventHandlersRef,
        bindChartEventsCallback
      );
    },
    [groupName, chartsRef, connectedRef, eventHandlersRef, bindChartEventsCallback]
  );

  /**
   * 解除图表联动
   */
  const disconnect = useCallback(
    (chartInstance: ChartInstance, chartId?: string) => {
      disconnectChart(
        chartInstance,
        chartId,
        chartsRef,
        connectedRef,
        unbindChartEventsCallback
      );
    },
    [chartsRef, connectedRef, unbindChartEventsCallback]
  );

  /**
   * 触发联动事件
   */
  const dispatchConnect = useCallback(
    (sourceId: string, payload: { eventType: ConnectEventType; params: unknown }) => {
      dispatchConnectEvent(
        sourceId,
        payload,
        disabled,
        chartsRef,
        dispatchToOthersCallback
      );
    },
    [disabled, chartsRef, dispatchToOthersCallback]
  );

  /**
   * 批量连接图表
   */
  const connectAll = useCallback(
    (charts: Array<{ instance: ChartInstance; id: string }>) => {
      connectAllCharts(charts, connect);
    },
    [connect]
  );

  /**
   * 批量断开所有图表
   */
  const disconnectAll = useCallback(() => {
    disconnectAllCharts(chartsRef, connectedRef, unbindChartEventsCallback);
  }, [chartsRef, connectedRef, unbindChartEventsCallback]);

  // 自动绑定
  useEffect(() => {
    if (autoBind && chartIds.length > 0) {
      // 自动绑定需要在外部调用 connect 方法
      // 这里只是记录需要绑定的 ID 列表
    }
  }, [autoBind, chartIds]);

  // 清理：组件卸载时断开所有图表
  useEffect(() => {
    return () => {
      disconnectAll();
    };
  }, [disconnectAll]);

  return {
    connect,
    disconnect,
    dispatchConnect,
    connectAll,
    disconnectAll,
    isConnected: connectedRef.current,
  };
}

// ============================================================================
// 导出
// ============================================================================

/** 导出共享事件类型 */
export type {
  ConnectEventType,
  ChartConnectItem,
  EventHandlersMap,
} from './chartConnectHelpers';
