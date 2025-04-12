/**
 * TaroViz React Hooks
 * 提供与图表相关的React Hooks
 */
import { getAdapter } from '@taroviz/adapters';
import { useState, useEffect, useRef, useMemo } from 'react';

// 通用图表配置类型
interface ChartOptions {
  [key: string]: any;
}

// 通用图表实例类型
interface ChartInstance {
  setOption: (option: any, notMerge?: boolean) => void;
  resize: () => void;
  on: (event: string, handler: Function) => void;
  off: (event: string, handler?: Function) => void;
  showLoading: (opts?: any) => void;
  hideLoading: () => void;
  dispose: () => void;
  [key: string]: any;
}

/**
 * 使用图表Hook
 * @param chartRef 图表容器的引用
 * @returns [图表实例, setInstance]
 */
export function useChart(chartRef: React.RefObject<HTMLElement>) {
  const [instance, setInstance] = useState<ChartInstance | null>(null);

  useEffect(() => {
    if (chartRef.current && !instance) {
      // 使用默认配置初始化适配器
      const adapter = getAdapter({});

      // 注意：Adapter接口可能没有直接定义setComponent方法
      // 但多数适配器实现中都有这个方法，我们可以通过类型断言使用
      if (typeof (adapter as any).setComponent === 'function') {
        (adapter as any).setComponent(chartRef.current);
      }

      // 初始化并保存实例
      const chartInstance = adapter as unknown as ChartInstance;
      setInstance(chartInstance);
    }

    return () => {
      if (instance) {
        try {
          instance.dispose();
        } catch (e) {
          console.warn('Failed to dispose chart instance:', e);
        }
      }
    };
  }, [chartRef, instance]);

  return [instance, setInstance] as const;
}

/**
 * 设置图表选项Hook
 * @param instance 图表实例
 * @param option 图表选项
 * @param deps 依赖数组
 */
export function useOption(instance: ChartInstance | null, option: ChartOptions, deps: any[] = []) {
  useEffect(() => {
    if (instance && option) {
      try {
        instance.setOption(option);
      } catch (e) {
        console.warn('Failed to set chart option:', e);
      }
    }
  }, [instance, option, ...deps]);
}

/**
 * 图表自适应Hook
 * @param instance 图表实例
 */
export function useResize(instance: ChartInstance | null) {
  useEffect(() => {
    if (!instance) {
      return;
    }

    const handleResize = () => {
      try {
        instance.resize();
      } catch (e) {
        console.warn('Failed to resize chart:', e);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [instance]);
}

/**
 * 图表事件Hook
 * @param instance 图表实例
 * @param events 事件对象
 */
export function useEvents(instance: ChartInstance | null, events: Record<string, Function>) {
  useEffect(() => {
    if (!instance) {
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
 * 图表加载状态Hook
 * @param instance 图表实例
 * @param loading 是否加载中
 */
export function useLoading(instance: ChartInstance | null, loading: boolean) {
  useEffect(() => {
    if (!instance) {
      return;
    }

    try {
      if (loading) {
        instance.showLoading();
      } else {
        instance.hideLoading();
      }
    } catch (e) {
      console.warn('Failed to set chart loading state:', e);
    }
  }, [instance, loading]);
}

/**
 * 使用图表主题
 * @param theme 主题名称或配置
 * @param darkMode 是否为暗黑模式
 * @returns 处理后的主题
 */
export function useChartTheme(theme: string | Record<string, any>, darkMode = false) {
  return useMemo(() => {
    if (typeof theme === 'string') {
      return darkMode ? 'dark' : theme;
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
export function useChartData<T = any>(data: T[], transformer: (data: T[]) => ChartOptions) {
  return useMemo(() => {
    if (!data || data.length === 0) {
      return { series: [] };
    }

    return transformer(data);
  }, [data, transformer]);
}

// 导出版本号
export const version = '0.5.0';

// 导出所有hooks到默认导出对象
const hooks = {
  useChart,
  useOption,
  useResize,
  useEvents,
  useLoading,
  useChartTheme,
  useChartData,
};

// 为了同时支持具名导入和默认导入
export default hooks;
