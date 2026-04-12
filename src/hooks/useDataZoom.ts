/**
 * useDataZoom - 数据缩放 Hook
 * 控制图表的数据缩放区域（dataZoom），支持拖拽和滚轮缩放
 */
import { useRef, useCallback, useEffect } from 'react';
import type { RefObject } from 'react';
import type { ChartInstance, DataZoomType, ZoomRange, EventHandler } from './types';

// ============================================================================
// Hook 实现
// ============================================================================

/**
 * 使用图表数据缩放
 * @param options 配置选项
 * @returns dataZoom 操作接口
 */
export function useDataZoom(options: {
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
} = {}): {
  bindDataZoom: (chartInstance: ChartInstance) => void;
  setZoomRange: (start: number, end: number) => void;
  resetZoom: () => void;
  getZoomRange: () => ZoomRange;
  startValue: RefObject<number | string | Date | undefined>;
  endValue: RefObject<number | string | Date | undefined>;
  bindEvents: (chartInstance: ChartInstance) => void;
} {
  const {
    type = 'inside',
    start = 0,
    end = 100,
    minSpan,
    maxSpan,
    zoomLock = false,
    throttle = 16,
    disabled = false,
    brushSelect = false,
    zoomMode = 'scale',
    resetOnUnmount = false,
    onZoomChange,
  } = options;

  // Refs
  const chartRef = useRef<ChartInstance | null>(null);
  const startValueRef = useRef<number | string | Date | undefined>(undefined);
  const endValueRef = useRef<number | string | Date | undefined>(undefined);
  const isBindingRef = useRef(false);
  const throttledHandlerRef = useRef<EventHandler | null>(null);

  // 节流处理
  const throttledCallback = useCallback(
    <T extends (...args: unknown[]) => void>(fn: T): T => {
      let lastCall = 0;
      return ((...args: unknown[]) => {
        const now = Date.now();
        if (now - lastCall >= throttle) {
          lastCall = now;
          fn(...args);
        }
      }) as T;
    },
    [throttle]
  );

  // 构建 dataZoom 配置
  const buildDataZoomConfig = useCallback(() => {
    const config: Record<string, unknown>[] = [];

    // 内置型 dataZoom
    if (type === 'inside' || zoomMode === 'mix') {
      config.push({
        type: 'inside',
        start,
        end,
        zoomLock,
        disabled,
        zoomOnMouseWheel: true,
        moveOnMouseMove: false,
        moveOnMouseWheel: false,
        preventDefaultMouseMove: true,
      });
    }

    // 滑块型 dataZoom
    if (type === 'slider' || zoomMode === 'mix') {
      config.push({
        type: 'slider',
        start,
        end,
        minSpan,
        maxSpan,
        zoomLock,
        disabled,
        show: true,
        brushSelect,
        throttle,
      });
    }

    return config;
  }, [type, start, end, minSpan, maxSpan, zoomLock, disabled, brushSelect, throttle]);

  // 绑定 dataZoom 到图表
  const bindDataZoom = useCallback(
    (chartInstance: ChartInstance) => {
      if (!chartInstance || isBindingRef.current) return;

      isBindingRef.current = true;
      chartRef.current = chartInstance;

      try {
        // 设置 dataZoom 配置
        const dataZoomConfig = buildDataZoomConfig();
        chartInstance.setOption(
          {
            dataZoom: dataZoomConfig,
          },
          false,
          true
        );
      } catch (e) {
        console.warn('[useDataZoom] Failed to bind dataZoom:', e);
      }

      isBindingRef.current = false;
    },
    [buildDataZoomConfig]
  );

  // 解绑 dataZoom
  const unbindDataZoom = useCallback(
    (chartInstance: ChartInstance) => {
      if (!chartInstance) return;

      try {
        // 通过 dispatchAction 关闭 dataZoom
        chartInstance.dispatchAction?.({
          type: 'dataZoom',
          start: 0,
          end: 100,
        });
      } catch (e) {
        console.warn('[useDataZoom] Failed to unbind dataZoom:', e);
      }
    },
    []
  );

  // 设置缩放范围
  const setZoomRange = useCallback((newStart: number, newEnd: number) => {
    const chart = chartRef.current;
    if (!chart) return;

    const clampedStart = Math.max(0, Math.min(100, newStart));
    const clampedEnd = Math.max(0, Math.min(100, newEnd));

    try {
      chart.dispatchAction?.({
        type: 'dataZoom',
        start: clampedStart,
        end: clampedEnd,
      });
    } catch (e) {
      console.warn('[useDataZoom] Failed to set zoom range:', e);
    }
  }, []);

  // 重置缩放
  const resetZoom = useCallback(() => {
    setZoomRange(start, end);
  }, [setZoomRange, start, end]);

  // 获取当前缩放范围
  const getZoomRange = useCallback((): ZoomRange => {
    const chart = chartRef.current;
    if (!chart) {
      return { start, end };
    }

    try {
      const option = chart.getOption?.();
      const dataZoom = option?.dataZoom as Array<{ type: string; start?: number; end?: number }> | undefined;
      if (Array.isArray(dataZoom) && dataZoom.length > 0) {
        // 优先获取 inside 类型的范围
        const insideZoom = dataZoom.find((dz) => dz.type === 'inside');
        const sliderZoom = dataZoom.find((dz) => dz.type === 'slider');
        const zoom = insideZoom || sliderZoom || dataZoom[0];
        return {
          start: zoom.start ?? start,
          end: zoom.end ?? end,
        };
      }
    } catch (e) {
      console.warn('[useDataZoom] Failed to get zoom range:', e);
    }

    return { start, end };
  }, [start, end]);

  // 绑定事件
  const bindEvents = useCallback(
    (chartInstance: ChartInstance) => {
      if (!chartInstance) return;

      // 创建缩放变化处理器
      const handleZoomChange: EventHandler = (params: unknown) => {
        if (disabled) return;

        const p = params as { start?: number; end?: number } | undefined;
        const { start: newStart, end: newEnd } = p || {};
        if (newStart !== undefined) startValueRef.current = newStart;
        if (newEnd !== undefined) endValueRef.current = newEnd;

        onZoomChange?.({ start: newStart ?? start, end: newEnd ?? end });
      };

      // 使用节流包装
      throttledHandlerRef.current = throttledCallback(handleZoomChange);

      try {
        // 监听 dataZoom 事件
        chartInstance.on('datazoom', throttledHandlerRef.current);
      } catch (e) {
        console.warn('[useDataZoom] Failed to bind events:', e);
      }
    },
    [disabled, onZoomChange, throttledCallback]
  );

  // 解绑事件
  const unbindEvents = useCallback(
    (chartInstance: ChartInstance) => {
      if (!chartInstance || !throttledHandlerRef.current) return;

      try {
        chartInstance.off('datazoom', throttledHandlerRef.current);
      } catch (e) {
        console.warn('[useDataZoom] Failed to unbind events:', e);
      }
    },
    []
  );

  // 清理：组件卸载时
  useEffect(() => {
    return () => {
      const chart = chartRef.current;
      if (chart) {
        if (resetOnUnmount) {
          unbindDataZoom(chart);
        }
        unbindEvents(chart);
      }
    };
  }, [resetOnUnmount, unbindDataZoom, unbindEvents]);

  return {
    bindDataZoom,
    setZoomRange,
    resetZoom,
    getZoomRange,
    startValue: startValueRef,
    endValue: endValueRef,
    bindEvents,
  };
}

// ============================================================================
// 类型导出
// ============================================================================

export type { UseDataZoomOptions, UseDataZoomReturn, DataZoomType, ZoomRange } from './types';

// ============================================================================
// 导出
// ============================================================================

export default useDataZoom;
