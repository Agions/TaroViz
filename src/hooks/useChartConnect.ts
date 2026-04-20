/**
 * useChartConnect - 图表联动 Hook
 * 实现多个图表之间的联动（chartConnect），当一个图表被操作时，其他联动图表同步变化
 */
import { useRef, useCallback, useEffect } from 'react';
import type {
  ChartInstance,
  UseChartConnectOptions,
  UseChartConnectReturn,
  ConnectEventType,
  ChartPointerEventParams,
  ChartSelectEventParams,
  ChartDataZoomEventParams,
  EventHandler,
} from './types';

// ============================================================================
// 导出共享类型（从 types.ts re-export）
// ============================================================================

/** 联动配置选项（从 types.ts 导出） */
export type { UseChartConnectOptions, UseChartConnectReturn } from './types';

// ============================================================================
// 内部类型
// ============================================================================

/** 图表联动项 */
interface ChartConnectItem {
  instance: ChartInstance;
  id: string;
}

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
    events = ['click', 'hover', 'select', 'dataZoom'],
    autoBind = false,
    groupName,
    disabled = false,
    onConnect,
    eventFilter,
  } = options;

  // Refs
  const chartsRef = useRef<Map<string, ChartConnectItem>>(new Map());
  const connectedRef = useRef(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  // 存储事件处理器的映射
  const eventHandlersRef = useRef<Map<string, Map<ConnectEventType, EventHandler>>>(new Map());

  /**
   * 创建联动事件处理器
   */
  const createConnectHandler = useCallback(
    (sourceId: string, eventType: ConnectEventType) => {
      const handler: EventHandler = (params: unknown) => {
        if (disabled) return;

        // 应用事件过滤器
        if (eventFilter && !eventFilter(eventType, params)) {
          return;
        }

        // 分发联动事件到所有其他图表
        dispatchToOthers(sourceId, eventType, params);

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
      return handler;
    },
    [disabled, eventFilter]
  );

  /**
   * 分发事件到其他图表
   */
  const dispatchToOthers = useCallback(
    (sourceId: string, eventType: ConnectEventType, params: unknown) => {
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
    },
    []
  );

  /**
   * 绑定单个图表的联动事件
   */
  const bindChartEvents = useCallback(
    (chartInstance: ChartInstance, chartId: string) => {
      if (!chartInstance) return;

      const handlers = new Map<ConnectEventType, EventHandler>();

      // 为每个事件类型创建并绑定处理器
      events.forEach((eventType) => {
        const handler = createConnectHandler(chartId, eventType);
        handlers.set(eventType, handler);

        try {
          chartInstance.on(eventType, handler);
        } catch (e) {
          console.warn(`[useChartConnect] Failed to bind ${eventType} event:`, e);
        }
      });

      eventHandlersRef.current.set(chartId, handlers);
    },
    [events, createConnectHandler]
  );

  /**
   * 解绑单个图表的联动事件
   */
  const unbindChartEvents = useCallback((chartId: string) => {
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
  }, []);

  /**
   * 绑定图表到联动组
   */
  const connect = useCallback(
    (chartInstance: ChartInstance, chartId?: string) => {
      const id = chartId || `chart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // 检查是否已连接
      if (chartsRef.current.has(id)) {
        console.warn(`[useChartConnect] Chart ${id} is already connected`);
        return;
      }

      // 存储图表实例
      chartsRef.current.set(id, {
        instance: chartInstance,
        id,
      });

      // 绑定事件
      bindChartEvents(chartInstance, id);
      connectedRef.current = true;

      // 如果有 groupName，设置图表组
      if (groupName && 'group' in chartInstance) {
        try {
          (chartInstance as ChartInstance & { group?: string }).group = groupName;
        } catch (e) {
          console.warn('[useChartConnect] Failed to set chart group:', e);
        }
      }
    },
    [bindChartEvents, groupName]
  );

  /**
   * 解除图表联动
   */
  const disconnect = useCallback(
    (chartInstance: ChartInstance, chartId?: string) => {
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
      unbindChartEvents(targetId);

      // 移除图表
      chartsRef.current.delete(targetId);

      // 更新连接状态
      connectedRef.current = chartsRef.current.size > 0;
    },
    [unbindChartEvents]
  );

  /**
   * 触发联动事件
   */
  const dispatchConnect = useCallback(
    (sourceId: string, payload: { eventType: ConnectEventType; params: unknown }) => {
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
    },
    [disabled, dispatchToOthers]
  );

  /**
   * 批量连接图表
   */
  const connectAll = useCallback(
    (charts: Array<{ instance: ChartInstance; id: string }>) => {
      charts.forEach(({ instance, id }) => {
        connect(instance, id);
      });
    },
    [connect]
  );

  /**
   * 批量断开所有图表
   */
  const disconnectAll = useCallback(() => {
    chartsRef.current.forEach((item, id) => {
      unbindChartEvents(id);
    });
    chartsRef.current.clear();
    connectedRef.current = false;
  }, [unbindChartEvents]);

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
  ChartPointerEventParams,
  ChartSelectEventParams,
  ChartDataZoomEventParams,
} from './types';

export default useChartConnect;
