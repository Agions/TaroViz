/**
 * 虚拟滚动 Hook
 * 负责大数据集的分页渲染和数据筛选
 */
import { useRef, useCallback } from 'react';
import type { EChartsOption } from 'echarts';

export interface UseVirtualScrollOptions {
  enabled?: boolean;
  pageSize?: number;
  preloadSize?: number;
  filters?: Record<string, unknown>;
}

export interface VirtualScrollState {
  currentPage: number;
  totalPages: number;
  totalDataCount: number;
  startIndex: number;
  endIndex: number;
  isScrolling: boolean;
}

export function useVirtualScroll(options: UseVirtualScrollOptions = {}) {
  const { enabled = false, pageSize = 100, preloadSize = 50 } = options;

  const stateRef = useRef<VirtualScrollState>({
    currentPage: 0,
    totalPages: 1,
    totalDataCount: 0,
    startIndex: 0,
    endIndex: 0,
    isScrolling: false,
  });

  /**
   * 筛选数据
   */
  const filterData = useCallback(
    (data: unknown[], filters: Record<string, unknown> = {}): unknown[] => {
      if (!filters || Object.keys(filters).length === 0) {
        return data;
      }

      return data.filter((item) => {
        const record = item as Record<string, unknown>;
        for (const [key, value] of Object.entries(filters)) {
          if (record[key] !== value && !(record[key] as unknown[])?.includes?.(value)) {
            return false;
          }
        }
        return true;
      });
    },
    []
  );

  /**
   * 处理虚拟滚动
   * 返回处理后的配置和当前页数据范围
   */
  const processVirtualScroll = useCallback(
    (
      originalOption: EChartsOption,
      filters: Record<string, unknown> = {}
    ): { processedOption: EChartsOption; state: VirtualScrollState } => {
      const state = stateRef.current;

      if (!enabled || !originalOption?.series) {
        return { processedOption: originalOption, state };
      }

      // 深拷贝避免修改原始数据
      const processedOption = JSON.parse(JSON.stringify(originalOption)) as EChartsOption;

      (processedOption.series as unknown[]).forEach((seriesItem: unknown, _index: number) => {
        const s = seriesItem as { data?: unknown[] };
        if (!s.data || !Array.isArray(s.data)) return;

        // 应用筛选
        const filteredData = filterData(s.data, filters);

        // 计算分页
        state.totalDataCount = filteredData.length;
        state.totalPages = Math.ceil(filteredData.length / pageSize);

        const startIndex = state.currentPage * pageSize;
        const endIndex = Math.min(startIndex + pageSize + preloadSize, filteredData.length);

        state.startIndex = startIndex;
        state.endIndex = endIndex;

        // 返回当前页数据
        s.data = filteredData.slice(startIndex, endIndex);
      });

      return { processedOption, state };
    },
    [enabled, pageSize, preloadSize, filterData]
  );

  /**
   * 跳转到指定页
   */
  const goToPage = useCallback((page: number) => {
    const state = stateRef.current;
    if (page >= 0 && page < state.totalPages) {
      state.currentPage = page;
    }
  }, []);

  /**
   * 下一页
   */
  const nextPage = useCallback(() => {
    goToPage(stateRef.current.currentPage + 1);
  }, [goToPage]);

  /**
   * 上一页
   */
  const prevPage = useCallback(() => {
    goToPage(stateRef.current.currentPage - 1);
  }, [goToPage]);

  /**
   * 根据滚动位置更新页码
   */
  const updatePageFromScroll = useCallback((scrollPercent: number) => {
    const state = stateRef.current;
    const newPage = Math.floor((scrollPercent / 100) * state.totalPages);
    if (newPage !== state.currentPage && newPage >= 0 && newPage < state.totalPages) {
      state.currentPage = newPage;
      return true; // 页码变化
    }
    return false; // 页码未变化
  }, []);

  /**
   * 设置滚动状态
   */
  const setScrolling = useCallback((scrolling: boolean) => {
    stateRef.current.isScrolling = scrolling;
  }, []);

  return {
    stateRef,
    processVirtualScroll,
    filterData,
    goToPage,
    nextPage,
    prevPage,
    updatePageFromScroll,
    setScrolling,
  };
}
