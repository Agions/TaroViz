/**
 * TaroViz React Hooks - 增强版
 * 提供与图表相关的 React Hooks
 */
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { getAdapter } from '../adapters';
import { getThemeByName } from '../themes';
import type { EChartsOption } from 'echarts';

// ============================================================================
// 类型定义
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
  [key: string]: any;
}

/** 事件处理器 */
export type EventHandler = (params?: unknown) => void;

/** 加载选项 */
export interface LoadingOptions {
  text?: string;
  color?: string;
  textColor?: string;
  maskColor?: string;
  zlevel?: number;
}

/** 图表配置 */
export interface ChartConfig {
  width?: number | string;
  height?: number | string;
  renderer?: 'canvas' | 'svg';
  theme?: string | Record<string, unknown>;
}

/** 数据转换器 */
export type DataTransformer<T = unknown> = (data: T) => EChartsOption;

/** 响应式断点 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** 断点配置 */
export interface BreakpointConfig {
  width: number;
}

/** 主题切换回调 */
export type ThemeChangeCallback = (theme: string | Record<string, unknown>) => void;

// ============================================================================
// Hooks
// ============================================================================

/**
 * 使用图表 Hook
 * @param chartRef 图表容器的引用
 * @param config 图表配置
 * @returns [图表实例, 设置实例函数, 是否已初始化]
 */
export function useChart(
  chartRef: React.RefObject<HTMLElement>,
  config?: ChartConfig
): [ChartInstance | null, React.Dispatch<React.SetStateAction<ChartInstance | null>>, boolean] {
  const [instance, setInstance] = useState<ChartInstance | null>(null);
  const [initialized, setInitialized] = useState(false);
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    if (!chartRef.current || instance) {
      return;
    }

    const initAdapter = async () => {
      try {
        const adapter = await getAdapter(configRef.current || {});
        const chartInstance = adapter as unknown as ChartInstance;
        setInstance(chartInstance);
        setInitialized(true);
      } catch (error) {
        console.error('Failed to initialize chart:', error);
      }
    };

    initAdapter();

    return () => {
      if (instance) {
        try {
          const inst = instance as any;
          if (!inst.isDisposed?.()) {
            inst.dispose();
          }
        } catch (e) {
          console.warn('Failed to dispose chart instance:', e);
        }
        setInstance(null);
        setInitialized(false);
      }
    };
  }, [chartRef]);

  return [instance, setInstance, initialized];
}

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
 * 图表自适应 Hook
 * @param instance 图表实例
 * @param options 配置选项
 */
export function useResize(
  instance: ChartInstance | null,
  options?: {
    /** 延迟时间 (ms) */
    delay?: number;
    /** 最小宽度 */
    minWidth?: number;
    /** 最小高度 */
    minHeight?: number;
    /** 是否启用 */
    enabled?: boolean;
  }
) {
  const { delay = 300, minWidth, minHeight, enabled = true } = options || {};
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!instance || !enabled) {
      return;
    }

    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        try {
          const dom = instance.getDom?.();
          if (dom) {
            const { clientWidth, clientHeight } = dom;
            if (minWidth && clientWidth < minWidth) return;
            if (minHeight && clientHeight < minHeight) return;
          }
          instance.resize?.();
        } catch (e) {
          console.warn('Failed to resize chart:', e);
        }
      }, delay);
    };

    window.addEventListener('resize', handleResize);

    // 创建一个 ResizeObserver 来监听容器大小变化
    const dom = instance.getDom?.();
    if (dom && typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(handleResize);
      observer.observe(dom);
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', handleResize);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [instance, delay, minWidth, minHeight, enabled]);
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
 * 使用图表主题
 * @param theme 主题名称或配置
 * @param darkMode 是否为暗色模式
 * @returns 处理后的主题
 */
export function useChartTheme(theme: string | Record<string, unknown>, darkMode = false) {
  return useMemo(() => {
    if (typeof theme === 'string') {
      // 如果是字符串，尝试获取内置主题配置
      try {
        const builtinTheme = getThemeByName(theme);
        return builtinTheme || (darkMode ? 'dark' : theme);
      } catch {
        return darkMode ? 'dark' : theme;
      }
    }
    return theme;
  }, [theme, darkMode]);
}

/**
 * 使用图表数据变更
 * @param data 数据源
 * @param transformer 数据转换函数
 * @returns 转换后的图表选项
 */
export function useChartData<T = unknown>(data: T | null, transformer: DataTransformer<T>) {
  return useMemo(() => {
    if (!data) {
      return {};
    }
    return transformer(data);
  }, [data, transformer]);
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
 * 使用主题切换
 * @param initialTheme 初始主题
 * @returns [当前主题, 切换主题函数]
 */
export function useThemeSwitcher(initialTheme = 'default') {
  const [theme, setTheme] = useState<string | Record<string, unknown>>(initialTheme);
  const [isDark, setIsDark] = useState(false);

  const switchTheme = useCallback((newTheme: string | Record<string, unknown>) => {
    setTheme(newTheme);
    if (typeof newTheme === 'string') {
      setIsDark(newTheme === 'dark' || newTheme.includes('dark'));
    }
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark((prev) => !prev);
    setTheme((prev) => (prev === 'dark' ? 'default' : 'dark'));
  }, []);

  return { theme, isDark, switchTheme, toggleDark, setTheme };
}

/**
 * 使用数据轮询
 * @param fetchFn 数据获取函数
 * @param options 配置选项
 * @returns [数据, 加载状态, 错误, 刷新函数]
 */
export function useDataPolling<T>(
  fetchFn: () => Promise<T>,
  options?: {
    /** 轮询间隔 (ms) */
    interval?: number;
    /** 是否自动开始 */
    autoStart?: boolean;
    /** 错误重试次数 */
    retryCount?: number;
    /** 重试延迟 (ms) */
    retryDelay?: number;
  }
) {
  const { interval = 5000, autoStart = false, retryCount = 3, retryDelay = 1000 } = options || {};

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(autoStart);
  const [error, setError] = useState<Error | null>(null);

  // 用于取消进行中的请求
  const abortRef = useRef<{ cancelled: boolean }>({ cancelled: false });

  const fetchData = useCallback(async () => {
    // 取消之前的请求
    abortRef.current.cancelled = true;
    // 创建新的取消标记
    abortRef.current = { cancelled: false };
    const currentAbort = abortRef.current;

    let retries = retryCount;
    setLoading(true);
    setError(null);

    while (retries >= 0 && !currentAbort.cancelled) {
      try {
        const result = await fetchFn();
        if (!currentAbort.cancelled) {
          setData(result);
          setLoading(false);
        }
        return;
      } catch (e) {
        retries--;
        if (retries < 0 || currentAbort.cancelled) {
          if (!currentAbort.cancelled) {
            setError(e as Error);
          }
          setLoading(false);
        } else {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    }
  }, [fetchFn, retryCount, retryDelay]);

  useEffect(() => {
    if (autoStart) {
      fetchData();
    }

    if (interval > 0) {
      const timer = setInterval(fetchData, interval);
      return () => {
        clearInterval(timer);
        abortRef.current.cancelled = true;
      };
    }

    return () => {
      abortRef.current.cancelled = true;
    };
  }, [interval, autoStart, fetchData]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh };
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
  const inst = instance as any;
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
  const inst = instance as any;
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

// ============================================================================
// 导出
// ============================================================================

export const version = '1.4.0';

// 新增数据转换 hooks
export {
  useDataTransform,
  useTableTransform,
  useTimeSeriesTransform,
  useTransform,
} from './useDataTransform';

export default {
  useChart,
  useOption,
  useResize,
  useEvents,
  useLoading,
  useChartTheme,
  useChartData,
  useResponsive,
  useThemeSwitcher,
  useDataPolling,
  useFullscreen,
  useExport,
  useChartTools,
};
