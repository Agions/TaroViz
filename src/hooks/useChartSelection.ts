/**
 * useChartSelection - 图表数据点选择/高亮 Hook
 * 支持单个/批量选择、反选、清除选择，配合 ECharts select 事件
 *
 * 特性：
 * - 支持按 seriesIndex + dataIndex 选择
 * - 支持按 dataIndex 跨系列批量选择
 * - 支持反选（invertSelection）
 * - 支持多选模式（multi）
 * - 自动绑定图表 select/unselect 事件
 */
import { useEffect, useRef, useCallback, useState } from 'react';
import type { ChartInstance } from './index';

// ============================================================================
// 类型定义
// ============================================================================

/** 单个数据点的选择键 */
export interface DataPointKey {
  seriesIndex: number;
  dataIndex: number;
}

/** 选择模式 */
export type SelectionMode = 'single' | 'multiple';

/** 选择事件参数 */
export interface SelectionEvent {
  /** 被选中的数据点 */
  selected: DataPointKey[];
  /** 取消选择的数据点 */
  unselected: DataPointKey[];
}

/** 选择配置选项 */
export interface UseChartSelectionOptions {
  /** 选择模式：'single' 单选，'multiple' 多选，默认 'multiple' */
  mode?: SelectionMode;
  /** 是否在组件卸载时清除所有选择，默认 true */
  clearOnUnmount?: boolean;
  /** 是否启用 Ctrl+Click 多选，默认 true */
  enableCtrlMultiSelect?: boolean;
  /** 是否启用 Shift+Click 范围选择，默认 true */
  enableShiftRangeSelect?: boolean;
  /** 选择变化时的回调 */
  onSelectionChange?: (event: SelectionEvent) => void;
}

/** 选择返回值 */
export interface UseChartSelectionReturn {
  /** 当前选中的数据点 */
  selectedPoints: DataPointKey[];
  /** 是否存在选中 */
  hasSelection: boolean;
  /** 选中数量 */
  selectionCount: number;
  /** 选中指定数据点 */
  select: (key: DataPointKey) => void;
  /** 取消选中指定数据点 */
  deselect: (key: DataPointKey) => void;
  /** 批量选中 */
  selectMultiple: (keys: DataPointKey[]) => void;
  /** 批量取消选中 */
  deselectMultiple: (keys: DataPointKey[]) => void;
  /** 切换选中状态 */
  toggle: (key: DataPointKey) => void;
  /** 反选 */
  invertSelection: (seriesIndex: number, dataIndices: number[]) => void;
  /** 全选指定系列 */
  selectAll: (seriesIndex: number, dataIndices: number[]) => void;
  /** 清除所有选择 */
  clearSelection: () => void;
  /** 判断某点是否被选中 */
  isSelected: (key: DataPointKey) => boolean;
}

// ============================================================================
// 工具函数
// ============================================================================

/** 生成唯一键字符串 */
function keyToString(key: DataPointKey): string {
  return `${key.seriesIndex}:${key.dataIndex}`;
}

function stringToKey(str: string): DataPointKey {
  const [seriesIndex, dataIndex] = str.split(':').map(Number);
  return { seriesIndex, dataIndex };
}

// ============================================================================
// Hook 实现
// ============================================================================

/**
 * 使用图表数据点选择功能
 * @param chartInstance 图表实例
 * @param options 配置选项
 * @returns 选择控制接口
 */
export function useChartSelection(
  chartInstance: ChartInstance | null,
  options: UseChartSelectionOptions = {}
): UseChartSelectionReturn {
  const {
    mode = 'multiple',
    clearOnUnmount = true,
    enableCtrlMultiSelect = true,
    enableShiftRangeSelect = true,
    onSelectionChange,
  } = options;

  // 选中点集合（字符串键）
  const [selectedPoints, setSelectedPoints] = useState<DataPointKey[]>([]);

  // Chart instance ref
  const chartRef = useRef<ChartInstance | null>(null);
  chartRef.current = chartInstance;

  // 当前模式 ref（用于事件处理）
  const modeRef = useRef(mode);
  modeRef.current = mode;

  // 绑定图表 select/unselect 事件
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || !chart.on) return;

    chart.on('selectchanged', (params: unknown) => {
      // 当图表内部选择变化时同步状态
      const p = params as {
        isFromClick?: boolean;
        selected?: Record<string, boolean>;
        notSelected?: Record<string, boolean>;
      };
      if (p.isFromClick) {
        // 用户点击了图例，清除所有数据点选择
        setSelectedPoints([]);
        onSelectionChange?.({ selected: [], unselected: [] });
      }
    });

    return () => {
      if (chart.off) {
        chart.off('selectchanged');
      }
    };
  }, [onSelectionChange]);

  // 组件卸载时清除选择
  useEffect(() => {
    return () => {
      if (clearOnUnmount) {
        const chart = chartRef.current;
        if (chart?.dispatchAction) {
          // 清除所有系列的选择状态
          chart.dispatchAction({ type: 'unselect' });
        }
      }
    };
  }, [clearOnUnmount]);

  // ─── 私有方法 ───────────────────────────────────────────────────────────────

  /** 触发选择变化回调 */
  const notifyChange = useCallback(
    (selected: DataPointKey[], unselected: DataPointKey[]) => {
      onSelectionChange?.({ selected, unselected });
    },
    [onSelectionChange]
  );

  /** 执行 ECharts dispatchAction */
  const dispatchSelect = useCallback(
    (key: DataPointKey, select: boolean) => {
      const chart = chartRef.current;
      if (!chart?.dispatchAction) return;
      chart.dispatchAction({
        type: select ? 'select' : 'unselect',
        seriesIndex: key.seriesIndex,
        dataIndex: key.dataIndex,
      });
    },
    []
  );

  // ─── Public API ───────────────────────────────────────────────────────────

  const select = useCallback(
    (key: DataPointKey) => {
      setSelectedPoints((prev) => {
        const str = keyToString(key);
        if (prev.some((p) => keyToString(p) === str)) return prev;
        const next = mode === 'single' ? [key] : [...prev, key];
        notifyChange(next, []);
        return next;
      });
      dispatchSelect(key, true);
    },
    [mode, notifyChange, dispatchSelect]
  );

  const deselect = useCallback(
    (key: DataPointKey) => {
      setSelectedPoints((prev) => {
        const str = keyToString(key);
        const removed = prev.filter((p) => keyToString(p) !== str);
        notifyChange([], removed);
        return removed;
      });
      dispatchSelect(key, false);
    },
    [notifyChange, dispatchSelect]
  );

  const toggle = useCallback(
    (key: DataPointKey) => {
      const str = keyToString(key);
      if (selectedPoints.some((p) => keyToString(p) === str)) {
        deselect(key);
      } else {
        select(key);
      }
    },
    [selectedPoints, select, deselect]
  );

  const selectMultiple = useCallback(
    (keys: DataPointKey[]) => {
      setSelectedPoints((prev) => {
        const newPoints = mode === 'single' ? keys : [...prev, ...keys.filter(
          (k) => !prev.some((p) => keyToString(p) === keyToString(k))
        )];
        notifyChange(newPoints, []);
        return newPoints;
      });
      keys.forEach((key) => dispatchSelect(key, true));
    },
    [mode, notifyChange, dispatchSelect]
  );

  const deselectMultiple = useCallback(
    (keys: DataPointKey[]) => {
      setSelectedPoints((prev) => {
        const keySet = new Set(keys.map(keyToString));
        const removed = prev.filter((p) => keySet.has(keyToString(p)));
        const remaining = prev.filter((p) => !keySet.has(keyToString(p)));
        notifyChange([], removed);
        return remaining;
      });
      keys.forEach((key) => dispatchSelect(key, false));
    },
    [notifyChange, dispatchSelect]
  );

  const invertSelection = useCallback(
    (seriesIndex: number, dataIndices: number[]) => {
      setSelectedPoints((prev) => {
        const selectedSet = new Set(prev.filter((p) => p.seriesIndex === seriesIndex).map((p) => p.dataIndex));
        const toSelect: DataPointKey[] = [];
        const toDeselect: DataPointKey[] = [];

        dataIndices.forEach((dataIndex) => {
          const key = { seriesIndex, dataIndex };
          const str = keyToString(key);
          if (selectedSet.has(dataIndex)) {
            toDeselect.push(key);
          } else {
            toSelect.push(key);
          }
        });

        toDeselect.forEach((k) => dispatchSelect(k, false));
        toSelect.forEach((k) => dispatchSelect(k, true));

        const newSelected = prev.filter(
          (p) => !(p.seriesIndex === seriesIndex && selectedSet.has(p.dataIndex))
        ).concat(toSelect);

        notifyChange(toSelect, toDeselect);
        return newSelected;
      });
    },
    [notifyChange, dispatchSelect]
  );

  const selectAll = useCallback(
    (seriesIndex: number, dataIndices: number[]) => {
      const keys = dataIndices.map((dataIndex) => ({ seriesIndex, dataIndex }));
      setSelectedPoints((prev) => {
        const newPoints = mode === 'single' ? keys : [...prev, ...keys.filter(
          (k) => !prev.some((p) => keyToString(p) === keyToString(k))
        )];
        notifyChange(newPoints, []);
        return newPoints;
      });
      keys.forEach((key) => dispatchSelect(key, true));
    },
    [mode, notifyChange, dispatchSelect]
  );

  const clearSelection = useCallback(() => {
    const chart = chartRef.current;
    if (chart?.dispatchAction) {
      chart.dispatchAction({ type: 'unselect' });
    }
    const prev = selectedPoints;
    setSelectedPoints([]);
    notifyChange([], prev);
  }, [selectedPoints, notifyChange]);

  const isSelected = useCallback(
    (key: DataPointKey) => {
      const str = keyToString(key);
      return selectedPoints.some((p) => keyToString(p) === str);
    },
    [selectedPoints]
  );

  return {
    selectedPoints,
    hasSelection: selectedPoints.length > 0,
    selectionCount: selectedPoints.length,
    select,
    deselect,
    selectMultiple,
    deselectMultiple,
    toggle,
    invertSelection,
    selectAll,
    clearSelection,
    isSelected,
  };
}

export default useChartSelection;
