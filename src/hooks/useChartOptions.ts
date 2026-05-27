/**
 * useChartOptions - 图表选项与工具相关 Hooks
 * 提供图表选项设置、事件绑定、加载状态、响应式配置、全屏、导出、工具等
 */
import { useState, useEffect, useMemo, useCallback } from 'react';
import type { EChartsOption } from 'echarts';
import type { ChartInstance, EventHandler, LoadingOptions, Breakpoint } from './types';

/**
 * 设置图表选项 Hook
 * @param instance 图表实例
 * @param option 图表选项
 * @param options 配置选项
 */
export function useOption(
  instance: ChartInstance | null,
  option: EChartsOption | null,
  options?: {
    /** 是否不合并 */
    notMerge?: boolean;
    /** 是否延迟更新 */
    lazyUpdate?: boolean;
    /** 是否在数据变化时替换 */
    replaceMerge?: string[];
    /** 依赖数组 */
    deps?: unknown[];
  }
) {
  const { notMerge = false, lazyUpdate = false, replaceMerge, deps = [] } = options || {};

  useEffect(() => {
    if (instance && option) {
      try {
        instance.setOption(option, notMerge, lazyUpdate);
      } catch (e) {
        console.warn('Failed to set chart option:', e);
      }
    }
  }, [instance, option, notMerge, lazyUpdate, replaceMerge, ...deps]);
}

/**
 * 图表事件 Hook
 * @param instance 图表实例
 * @param events 事件对象
 */
export function useEvents(instance: ChartInstance | null, events: Record<string, EventHandler>) {
  useEffect(() => {
    if (!instance || !events) {
      return;
    }

    const eventEntries = Object.entries(events);

    // 绑定事件
    eventEntries.forEach(([eventName, handler]) => {
      try {
        instance.on(eventName, handler);
      } catch (e) {
        console.warn(`Failed to bind event ${eventName}:`, e);
      }
    });

    // 清理事件
    return () => {
      eventEntries.forEach(([eventName, handler]) => {
        try {
          instance.off(eventName, handler);
        } catch (e) {
          console.warn(`Failed to unbind event ${eventName}:`, e);
        }
      });
    };
  }, [instance, events]);
}

/**
 * 图表加载状态 Hook
 * @param instance 图表实例
 * @param loading 是否加载中
 * @param options 加载选项
 */
export function useLoading(
  instance: ChartInstance | null,
  loading: boolean,
  options?: LoadingOptions
) {
  useEffect(() => {
    if (!instance) {
      return;
    }

    try {
      if (loading) {
        instance.showLoading(options);
      } else {
        instance.hideLoading();
      }
    } catch (e) {
      console.warn('Failed to set chart loading state:', e);
    }
  }, [instance, loading, options]);
}

/**
 * 使用响应式图表配置
 * @param config 响应式配置
 * @returns 当前断点和配置
 */
export function useResponsive(config?: {
  /** 断点配置 */
  breakpoints?: Record<Breakpoint, number>;
  /** 默认断点 */
  defaultBreakpoint?: Breakpoint;
}) {
  const { breakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 }, defaultBreakpoint = 'md' } =
    config || {};

  const [breakpoint, setBreakpoint] = useState<Breakpoint>(defaultBreakpoint);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowSize({ width, height: window.innerHeight });

      // 确定当前断点
      let current: Breakpoint = 'xs';
      if (width >= breakpoints.xl) current = 'xl';
      else if (width >= breakpoints.lg) current = 'lg';
      else if (width >= breakpoints.md) current = 'md';
      else if (width >= breakpoints.sm) current = 'sm';

      setBreakpoint(current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints]);

  return { breakpoint, windowSize };
}

/**
 * 使用图表全屏
 * @param chartRef 图表容器引用
 * @returns [是否全屏, 进入/退出全屏函数]
 */
export function useFullscreen(chartRef: React.RefObject<HTMLElement>) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggle = useCallback(() => {
    if (!chartRef.current) return;

    if (!isFullscreen) {
      if (chartRef.current.requestFullscreen) {
        chartRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, [chartRef, isFullscreen]);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  return { isFullscreen, toggle };
}

/**
 * 使用图表导出
 * @param instance 图表实例
 * @returns 导出函数
 */
export function useExport(instance: ChartInstance | null) {
  const inst = instance as ChartInstance;
  const exportImage = useCallback(
    (options?: { type?: 'png' | 'jpeg'; pixelRatio?: number; backgroundColor?: string }) => {
      if (!inst) return null;
      const { type = 'png', pixelRatio = 2, backgroundColor } = options || {};
      return inst.getDataURL?.({ type, pixelRatio, backgroundColor });
    },
    [inst]
  );

  const exportSVG = useCallback(() => {
    if (!inst) return null;
    return inst.getSvgData?.();
  }, [inst]);

  const exportCSV = useCallback(
    (options?: { seriesIndex?: number; dimension?: number }) => {
      if (!inst) return null;
      return inst.getCompressedDataURL?.(options);
    },
    [inst]
  );

  return { exportImage, exportSVG, exportCSV };
}

/**
 * 使用图表工具
 * @param instance 图表实例
 * @returns 工具函数
 */
export function useChartTools(instance: ChartInstance | null) {
  const inst = instance as ChartInstance;
  const getInstance = useCallback(() => instance, [instance]);

  const clear = useCallback(() => {
    inst?.clear?.();
  }, [inst]);

  const repaint = useCallback(() => {
    inst?.resize?.();
  }, [inst]);

  const dispatchAction = useCallback(
    (action: { type: string; [key: string]: unknown }) => {
      inst?.dispatchAction?.(action);
    },
    [inst]
  );

  const showTip = useCallback(
    (seriesIndex?: number, dataIndex?: number) => {
      inst?.dispatchAction?.({ type: 'showTip', seriesIndex, dataIndex });
    },
    [inst]
  );

  const hideTip = useCallback(() => {
    inst?.dispatchAction?.({ type: 'hideTip' });
  }, [inst]);

  const zoom = useCallback(
    (start?: number, end?: number) => {
      inst?.dispatchAction?.({
        type: 'dataZoom',
        start: start ?? 0,
        end: end ?? 100,
      });
    },
    [inst]
  );

  return { getInstance, clear, repaint, dispatchAction, showTip, hideTip, zoom };
}
