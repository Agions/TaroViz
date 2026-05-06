/**
 * 性能优化工具
 * 提供防抖、节流等性能优化函数
 */

/**
 * ECharts 性能配置接口
 */
export interface EChartsPerformanceConfig {
  /** 渐进式渲染阈值 */
  progressive?: number;
  /** 大系列优化 */
  large?: boolean;
  /** 渲染模式 */
  renderMode?: 'auto' | 'canvas' | 'svg';
  /** 增量渲染 */
  incremental?: boolean;
  /** 是否使用 WebGL 渲染器（大数据量推荐） */
  useWebGL?: boolean;
}

/**
 * ECharts 渲染优化配置
 * 用于提升大数据量图表的渲染性能
 */
export const ECHARTS_PERFORMANCE_CONFIG = {
  // 开启渐进式渲染
  progressive: 1000,
  // 开启大系列优化
  large: true,
  // 开启渲染优化
  renderMode: 'auto',
  // 开启增量渲染
  incremental: false,
} as const satisfies EChartsPerformanceConfig;

/**
 * 防抖函数
 * @param fn 要防抖的函数
 * @param delay 延迟时间 (ms)
 * @returns 防抖后的函数（包含 cancel 方法）
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
} {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
      timeoutId = null;
    }, delay);
  };

  /** 取消待执行的函数调用 */
  debounced.cancel = function () {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  /** 立即执行待执行的函数调用 */
  debounced.flush = function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    fn.apply(this, args);
  };

  return debounced;
}

/**
 * 节流函数
 * @param fn 要节流的函数
 * @param limit 最小时间间隔 (ms)
 * @param options 节流选项
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number,
  options?: {
    /** 是否在节流开始时执行（leading） */
    leading?: boolean;
    /** 是否在节流结束时执行（trailing） */
    trailing?: boolean;
  }
): (...args: Parameters<T>) => void {
  const { leading = true, trailing = true } = options ?? {};

  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastCallTime = 0;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: unknown = null;

  const shouldInvokeLeading = leading && !lastCallTime;
  const shouldInvokeTrailing = trailing;

  const invokeFunc = (time: number) => {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = null;
    lastCallTime = time;
    return args ? fn.apply(thisArg, args) : undefined;
  };

  const remaining = limit - (Date.now() - lastCallTime);

  const wrapped = function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    const elapsed = now - lastCallTime;

    // 保存调用上下文和参数
    lastArgs = args;
    lastThis = this;

    // 判断是否应该执行
    if (elapsed >= limit) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCallTime = now;
      return fn.apply(this, args);
    }

    // 处理 trailing edge
    if (!timeoutId && shouldInvokeTrailing) {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        if (lastArgs) {
          const result = fn.apply(lastThis, lastArgs);
          lastArgs = lastThis = null;
          return result;
        }
      }, remaining);
    }

    return undefined;
  };

  return wrapped;
}

/**
 * 获取 ECharts 性能优化配置
 * @param dataCount 数据量
 * @param seriesCount 系列数量（可选）
 * @returns ECharts 配置片段
 */
export function getPerformanceConfig(
  dataCount: number,
  seriesCount: number = 1
): EChartsPerformanceConfig {
  const config: EChartsPerformanceConfig = {};

  if (dataCount > 10000) {
    // 超大数量：使用 WebGL 渲染器 + 渐进式渲染
    config.useWebGL = true;
    config.progressive = Math.max(1000, Math.floor(dataCount / 20));
    config.large = true;
  } else if (dataCount > 1000) {
    // 大数据量：开启渐进式渲染
    config.progressive = Math.max(400, Math.floor(dataCount / 10));
    config.large = true;
  } else if (dataCount > 500) {
    // 中等数据量：开启部分优化
    config.progressive = 400;
  }

  // 多系列优化
  if (seriesCount > 5) {
    config.renderMode = 'canvas'; // Canvas 渲染多系列更快
  }

  return config;
}

/**
 * 图表类型枚举
 */
export type ChartType =
  | 'line'
  | 'bar'
  | 'pie'
  | 'scatter'
  | 'map'
  | 'heatmap'
  | 'graph'
  | 'treemap'
  | 'sunburst'
  | 'custom';

/**
 * 计算图表渲染预估时间
 * @param dataCount 数据量
 * @param seriesCount 系列数量
 * @param chartType 图表类型（可选）
 * @returns 预估渲染时间 (ms)
 */
export function estimateRenderTime(
  dataCount: number,
  seriesCount: number,
  chartType: ChartType = 'line'
): number {
  // 基础渲染时间
  const baseTime = 50;

  // 数据量系数（不同图表类型渲染复杂度不同）
  const chartComplexity: Record<ChartType, number> = {
    line: 0.01,
    bar: 0.015,
    pie: 0.008,
    scatter: 0.02,
    map: 0.05,
    heatmap: 0.03,
    graph: 0.04,
    treemap: 0.025,
    sunburst: 0.02,
    custom: 0.03,
  };

  const dataTime = dataCount * chartComplexity[chartType];
  const seriesTime = seriesCount * 20;

  // 添加一些随机波动（模拟实际场景）
  const variance = Math.random() * 0.1 - 0.05; // ±5%

  return Math.round((baseTime + dataTime + seriesTime) * (1 + variance));
}

/**
 * 批量更新防抖函数
 * 用于同时管理多个防抖函数
 */
export class DebounceManager {
  private debounces = new Map<string, { cancel: () => void; flush: () => void }>();

  /**
   * 注册防抖函数
   */
  register<T extends (...args: unknown[]) => unknown>(
    key: string,
    fn: T,
    delay: number
  ): ReturnType<typeof debounce<T>> {
    const debounced = debounce(fn, delay);
    this.debounces.set(key, {
      cancel: debounced.cancel,
      flush: debounced.flush,
    });
    return debounced;
  }

  /**
   * 取消指定防抖函数
   */
  cancel(key: string): void {
    const debounced = this.debounces.get(key);
    if (debounced) {
      debounced.cancel();
    }
  }

  /**
   * 取消所有防抖函数
   */
  cancelAll(): void {
    for (const debounced of this.debounces.values()) {
      debounced.cancel();
    }
  }

  /**
   * 刷新指定防抖函数
   */
  flush<T extends (...args: unknown[]) => unknown>(
    key: string,
    ...args: Parameters<T>
  ): ReturnType<T> {
    const debounced = this.debounces.get(key);
    if (debounced) {
      // 从注册时保存的引用调用 flush
      // 注意：这里需要原始引用，所以返回 undefined
      debounced.flush();
      return undefined as never;
    }
    return undefined as never;
  }

  /**
   * 清理管理器
   */
  destroy(): void {
    this.cancelAll();
    this.debounces.clear();
  }
}
