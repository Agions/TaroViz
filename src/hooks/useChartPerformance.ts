/**
 * useChartPerformance - 图表性能相关 Hooks
 * 提供数据轮询等功能
 */
import { useState, useEffect, useCallback, useRef } from 'react';

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

    // retryCount < 0 表示不重试，直接一次请求
    if (retryCount < 0) {
      try {
        const result = await fetchFn();
        if (!currentAbort.cancelled) {
          setData(result);
          setLoading(false);
        }
      } catch (e) {
        if (!currentAbort.cancelled) {
          setError(e as Error);
          setLoading(false);
        }
      }
      return;
    }

    // retryCount >= 0：循环重试
    while (retries > 0 && !currentAbort.cancelled) {
      try {
        const result = await fetchFn();
        if (!currentAbort.cancelled) {
          setData(result);
          setLoading(false);
        }
        return;
      } catch (e) {
        retries--;
        if (retries <= 0 || currentAbort.cancelled) {
          if (!currentAbort.cancelled) {
            setError(e as Error);
          }
          setLoading(false);
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
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
