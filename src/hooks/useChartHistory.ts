/**
 * useChartHistory - 图表 Undo/Redo Hook
 * 追踪图表配置历史，支持撤销/重做操作和键盘快捷键
 *
 * 特性：
 * - 最多保存 50 条历史记录（可配置）
 * - 自动绑定 Ctrl+Z / Ctrl+Y 键盘快捷键
 * - 支持 ignoreKeys 忽略特定配置字段（如动画、时间戳）
 * - 暴露 canUndo / canRedo 状态
 */
import { useEffect, useRef, useCallback, useState } from 'react';
import type { ChartInstance } from './index';
import type { EChartsOption } from 'echarts';

// ============================================================================
// 类型定义
// ============================================================================

export interface UseChartHistoryOptions {
  /** 最大历史记录数，默认 50 */
  maxHistorySize?: number;
  /** 忽略的顶层配置键（不计入历史），默认 ['animation', 'animationDuration', 'animationEasing', 'animationFrame'] */
  ignoreKeys?: string[];
  /** 是否自动绑定键盘快捷键，默认 true */
  enableKeyboard?: boolean;
  /** 是否在组件卸载时自动清空历史，默认 false */
  clearOnUnmount?: boolean;
}

export interface UseChartHistoryReturn {
  /** 是否可撤销 */
  canUndo: boolean;
  /** 是否可重做 */
  canRedo: boolean;
  /** 当前历史索引 */
  currentIndex: number;
  /** 历史总数 */
  historyCount: number;
  /** 撤销一步 */
  undo: () => void;
  /** 重做一步 */
  redo: () => void;
  /** 跳转到指定历史索引 */
  goTo: (index: number) => void;
  /** 手动推送一条历史记录 */
  push: (option: EChartsOption) => void;
  /** 清空历史记录 */
  clear: () => void;
}

// ============================================================================
// 工具函数
// ============================================================================

/** 深度省略指定键后比较两个配置是否相等 */
function omitAndCompare(
  a: unknown,
  b: unknown,
  ignoreKeys: Set<string>
): boolean {
  if (a === b) return true;
  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
    return a === b;
  }

  const aObj = a as Record<string, unknown>;
  const bObj = b as Record<string, unknown>;
  const aKeys = Object.keys(aObj).filter((k) => !ignoreKeys.has(k));
  const bKeys = Object.keys(bObj).filter((k) => !ignoreKeys.has(k));

  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    if (!bObj.hasOwnProperty(key)) return false;
    if (!omitAndCompare(aObj[key], bObj[key], ignoreKeys)) return false;
  }

  return true;
}

// ============================================================================
// Hook 实现
// ============================================================================

/**
 * 使用图表历史记录（Undo/Redo）
 * @param chartInstance 图表实例
 * @param options 配置选项
 * @returns 历史记录控制接口
 */
export function useChartHistory(
  chartInstance: ChartInstance | null,
  options: UseChartHistoryOptions = {}
): UseChartHistoryReturn {
  const {
    maxHistorySize = 50,
    ignoreKeys = [
      'animation',
      'animationDuration',
      'animationEasing',
      'animationFrame',
    ],
    enableKeyboard = true,
    clearOnUnmount = false,
  } = options;

  // 忽略键集合
  const ignoreKeySet = useRef(new Set<string>(ignoreKeys));

  // 历史栈（每次 setOption 快照）
  const historyStack = useRef<EChartsOption[]>([]);

  // 当前索引
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Chart instance ref
  const chartRef = useRef<ChartInstance | null>(null);
  chartRef.current = chartInstance;

  // 是否正在执行 undo/redo（避免 push 时重复记录）
  const isApplyingRef = useRef(false);

  // Undo/Redo function holders — populated after function declarations via a deferred effect
  const undoHolderRef = useRef<{ fn: (() => void) | null }>({ fn: null });
  const redoHolderRef = useRef<{ fn: (() => void) | null }>({ fn: null });

  // Deferred effect: bind undo/redo to refs once they are in scope
  useEffect(() => {
    undoHolderRef.current.fn = () => undo();
    redoHolderRef.current.fn = () => redo();
  });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const originalSetOption = chart.setOption.bind(chart);

    chart.setOption = (
      option: EChartsOption,
      notMerge?: boolean,
      lazyUpdate?: boolean
    ) => {
      if (isApplyingRef.current) {
        return originalSetOption(option, notMerge, lazyUpdate);
      }

      const stack = historyStack.current;
      const idx = currentIndex;
      const newStack = idx < stack.length - 1 ? stack.slice(0, idx + 1) : [...stack];

      const lastOption = newStack[newStack.length - 1];
      if (lastOption && omitAndCompare(lastOption, option, ignoreKeySet.current)) {
        return originalSetOption(option, notMerge, lazyUpdate);
      }

      newStack.push(option);
      if (newStack.length > maxHistorySize) {
        newStack.shift();
      } else {
        setCurrentIndex(newStack.length - 1);
      }

      historyStack.current = newStack;
      return originalSetOption(option, notMerge, lazyUpdate);
    };

    return () => {
      chart.setOption = originalSetOption;
    };
  }, [chartInstance, currentIndex, maxHistorySize]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.ctrlKey || e.metaKey;
      if (!isMod) return;

      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undoHolderRef.current.fn?.();
      } else if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) {
        e.preventDefault();
        redoHolderRef.current.fn?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboard]);

  // 组件卸载时清空
  useEffect(() => {
    return () => {
      if (clearOnUnmount) {
        historyStack.current = [];
        setCurrentIndex(-1);
      }
    };
  }, [clearOnUnmount]);

  // ─── Public API ───────────────────────────────────────────────────────────

  const undo = useCallback(() => {
    const chart = chartRef.current;
    if (!chart || currentIndex <= 0) return;

    const idx = currentIndex - 1;
    isApplyingRef.current = true;
    chart.setOption(historyStack.current[idx], true, true);
    isApplyingRef.current = false;
    setCurrentIndex(idx);
  }, [currentIndex]);

  const redo = useCallback(() => {
    const chart = chartRef.current;
    if (!chart || currentIndex >= historyStack.current.length - 1) return;

    const idx = currentIndex + 1;
    isApplyingRef.current = true;
    chart.setOption(historyStack.current[idx], true, true);
    isApplyingRef.current = false;
    setCurrentIndex(idx);
  }, [currentIndex]);

  const goTo = useCallback(
    (index: number) => {
      const chart = chartRef.current;
      if (!chart) return;
      if (index < 0 || index >= historyStack.current.length) return;
      if (index === currentIndex) return;

      isApplyingRef.current = true;
      chart.setOption(historyStack.current[index], true, true);
      isApplyingRef.current = false;
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  const push = useCallback((option: EChartsOption) => {
    const stack = historyStack.current;
    const idx = currentIndex;

    const newStack = idx < stack.length - 1 ? stack.slice(0, idx + 1) : [...stack];
    newStack.push(option);
    if (newStack.length > maxHistorySize) newStack.shift();
    historyStack.current = newStack;
    setCurrentIndex(newStack.length - 1);
  }, [currentIndex, maxHistorySize]);

  const clear = useCallback(() => {
    historyStack.current = [];
    setCurrentIndex(-1);
  }, []);

  return {
    canUndo: currentIndex > 0,
    canRedo: currentIndex < historyStack.current.length - 1,
    currentIndex,
    historyCount: historyStack.current.length,
    undo,
    redo,
    goTo,
    push,
    clear,
  };
}

export default useChartHistory;
