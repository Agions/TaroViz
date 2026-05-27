/**
 * useChartInit - 图表初始化 Hook
 * 负责初始化 ECharts 图表实例
 */
import { useState, useEffect, useRef } from 'react';
import { getAdapter } from '../adapters';
import type { ChartInstance, ChartConfig } from './types';

/**
 * 使用图表 Hook
 * @param chartRef 图表容器的引用
 * @param config 图表配置
 * @returns [图表实例, 设置实例函数, 是否已初始化]
 */
export function useChart(
  chartRef: React.RefObject<HTMLElement>,
  config?: ChartConfig
): [ChartInstance | null, React.Dispatch<React.SetStateAction<ChartInstance | null>>, boolean] {
  const [instance, setInstance] = useState<ChartInstance | null>(null);
  const [initialized, setInitialized] = useState(false);
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    if (!chartRef.current || instance) {
      return;
    }

    const initAdapter = async () => {
      try {
        const adapter = await getAdapter(configRef.current || {});
        const chartInstance = adapter as unknown as ChartInstance;
        setInstance(chartInstance);
        setInitialized(true);
      } catch (error) {
        console.error('Failed to initialize chart:', error);
      }
    };

    initAdapter();

    return () => {
      if (instance) {
        try {
          const inst = instance as ChartInstance;
          if (!inst.isDisposed?.()) {
            inst.dispose();
          }
        } catch (e) {
          console.warn('Failed to dispose chart instance:', e);
        }
        setInstance(null);
        setInitialized(false);
      }
    };
  }, [chartRef]);

  return [instance, setInstance, initialized];
}
