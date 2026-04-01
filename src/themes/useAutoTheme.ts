/**
 * useAutoTheme - 自动跟随系统暗色模式 Hook
 * 当用户操作系统级别的暗色模式时，图表自动切换到对应的主题
 */
import { useEffect, useRef } from 'react';
import { switchTheme } from './index';

/** 自动主题配置选项 */
export interface UseAutoThemeOptions {
  /** 是否启用自动跟随 */
  enabled?: boolean;
  /** 暗色主题名称 */
  darkThemeName?: string;
  /** 亮色主题名称 */
  lightThemeName?: string;
  /** 延迟切换的防抖时间 ms */
  debounceMs?: number;
}

/**
 * 自动跟随系统暗色模式
 * @param options 配置选项
 */
export function useAutoTheme(options?: UseAutoThemeOptions): void {
  const {
    enabled = true,
    darkThemeName = 'dark',
    lightThemeName = 'light',
    debounceMs = 0,
  } = options || {};

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // 清除之前的定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 防抖处理
      timeoutRef.current = setTimeout(() => {
        const isDark = e.matches;
        switchTheme(isDark ? darkThemeName : lightThemeName);
      }, debounceMs);
    };

    // 初始设置
    const isDark = mediaQuery.matches;
    switchTheme(isDark ? darkThemeName : lightThemeName);

    // 监听变化
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, darkThemeName, lightThemeName, debounceMs]);
}
