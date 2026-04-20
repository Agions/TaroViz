/**
 * 图表初始化 Hook
 * 负责图表的创建、适配器获取和生命周期管理
 */
import { useEffect, useRef } from 'react';
import { getAdapter } from '../../../adapters';
import type { Adapter } from '../../../adapters/types';
import type { EChartsOption } from 'echarts';

export interface UseChartInitOptions {
  width?: number | string;
  height?: number | string;
  theme?: string | object;
  option?: EChartsOption;
  onInit?: (instance: unknown) => void;
  direction?: 'ltr' | 'rtl';
}

export interface UseChartInitResult {
  adapterRef: React.MutableRefObject<Adapter | null>;
  chartRef: React.RefObject<HTMLDivElement | null>;
  isReady: boolean;
}

export function useChartInit(
  containerRef: React.RefObject<HTMLDivElement | null>,
  options: UseChartInitOptions
): UseChartInitResult {
  const adapterRef = useRef<Adapter | null>(null);
  const isReadyRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    let adapter: Adapter | null = null;

    const initChart = async () => {
      try {
        adapter = await getAdapter({
          width: options.width,
          height: options.height,
          theme: options.theme,
          option: options.option,
          onInit: options.onInit,
          containerRef,
          direction: options.direction,
        });

        if (!mounted) return;
        if (!adapter) return;

        adapterRef.current = adapter;
        isReadyRef.current = true;
        adapter.init();
      } catch (error) {
        console.error('[TaroViz] Failed to initialize chart:', error);
      }
    };

    initChart();

    return () => {
      mounted = false;
      if (adapter) {
        adapter.dispose();
        adapterRef.current = null;
        isReadyRef.current = false;
      }
    };
  }, []); // 一次性初始化

  return {
    adapterRef,
    chartRef: containerRef,
    get isReady() {
      return isReadyRef.current;
    },
  };
}
