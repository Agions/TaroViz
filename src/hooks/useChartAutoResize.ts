/**
 * useChartAutoResize - 图表自适应 Hook
 * 监听容器尺寸变化并自动调整图表大小
 */
import { useEffect, useRef } from 'react';
import type { ChartInstance } from './types';

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
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

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
