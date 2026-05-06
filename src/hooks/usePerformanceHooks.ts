/**
 * 性能优化 Hooks
 * 提供防抖、节流等性能优化 Hook
 */

import { useCallback, useRef, useEffect, useState } from 'react';

/**
 * 防抖 Hook
 * @param callback 要防抖的回调
 * @param delay 延迟时间 (ms)
 * @returns 防抖后的回调（包含 cancel 方法）
 */
export function useDebounce<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
} {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 更新 callback 引用
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
        timeoutRef.current = null;
      }, delay);
    },
    [delay]
  );

  // 添加 cancel 方法
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // 添加 flush 方法
  const flush = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    callbackRef.current(...args);
  }, []);

  // 将 cancel 和 flush 附加到回调函数上
  Object.assign(debouncedCallback, { cancel, flush });

  return debouncedCallback as never;
}

/**
 * 节流 Hook
 * @param callback 要节流的回调
 * @param limit 最小时间间隔 (ms)
 * @param options 节流选项
 * @returns 节流后的回调
 */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  limit: number,
  options?: {
    leading?: boolean;
    trailing?: boolean;
  }
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback);
  const lastCallTimeRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastArgsRef = useRef<Parameters<T> | null>(null);
  const lastThisRef = useRef<unknown>(null);

  const { leading = true, trailing = true } = options ?? {};

  // 更新 callback 引用
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // 清理
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const elapsed = now - lastCallTimeRef.current;

      // 保存调用上下文和参数
      lastArgsRef.current = args;
      lastThisRef.current = args.length > 0 ? args[0] : null;

      if (elapsed >= limit) {
        // 超过限制，立即执行
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        lastCallTimeRef.current = now;
        callbackRef.current(...args);
        lastArgsRef.current = null;
        lastThisRef.current = null;
      } else if (trailing && !timeoutRef.current) {
        // 在节流窗口结束时执行最后一次调用
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null;
          lastCallTimeRef.current = Date.now();
          if (lastArgsRef.current && lastThisRef.current !== null) {
            callbackRef.current(...lastArgsRef.current);
          }
          lastArgsRef.current = null;
          lastThisRef.current = null;
        }, limit - elapsed);
      }
    },
    [limit, leading, trailing]
  );

  return throttledCallback;
}

/**
 * 请求动画帧 Hook
 * 用于优化动画性能
 */
export function useAnimationFrame(callback: (time: number) => void, enabled = true): void {
  const callbackRef = useRef(callback);
  const animationFrameRef = useRef<number | null>(null);

  // 更新 callback 引用
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const loop = (time: number) => {
      callbackRef.current(time);
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled]);
}

/**
 * 窗口大小防抖 Hook
 * 用于优化窗口 resize 事件处理
 */
export function useWindowSizeDebounce(delay = 150) {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const handleResize = useDebounce(() => {
    if (typeof window !== 'undefined') {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, delay);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, [handleResize]);

  return size;
}

/**
 * 滚动位置防抖 Hook
 * 用于优化滚动事件处理
 */
export function useScrollPositionDebounce(delay = 150, targetElement?: HTMLElement | Window) {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleScroll = useDebounce(() => {
    const element = targetElement || window;
    if (element === window) {
      setScrollPosition({
        x: window.scrollX ?? (window as unknown as { pageXOffset: number }).pageXOffset,
        y: window.scrollY ?? (window as unknown as { pageYOffset: number }).pageYOffset,
      });
    } else if (element) {
      setScrollPosition({
        x: (element as HTMLElement).scrollLeft,
        y: (element as HTMLElement).scrollTop,
      });
    }
  }, delay);

  useEffect(() => {
    const element = targetElement || window;
    element.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      element.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll, targetElement]);

  return scrollPosition;
}

/**
 * 鼠标位置节流 Hook
 * 用于优化鼠标移动事件处理
 */
export function useMousePositionThrottle(limit = 100) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useThrottle(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      setPosition({ x: e.clientX, y: e.clientY });
    },
    limit
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return position;
}
