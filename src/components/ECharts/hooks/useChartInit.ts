import { useEffect } from 'react';
import type { EChartsOption } from '../types';

interface UseChartInitProps {
  chartRef: React.MutableRefObject<any>;
  adapterRef: React.MutableRefObject<any>;
  option: EChartsOption;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  showLoading?: boolean;
  loadingOption?: object;
  onChartReady?: (instance: any) => void;
}

export function useChartInit({
  chartRef,
  adapterRef,
  option,
  notMerge = false,
  lazyUpdate = false,
  showLoading = false,
  loadingOption,
  onChartReady
}: UseChartInitProps) {
  // 初始化图表
  useEffect(() => {
    if (chartRef.current) {
      // 设置图表配置
      adapterRef.current?.setOption(option, notMerge);
      
      // 处理加载状态
      if (showLoading) {
        chartRef.current.showLoading(loadingOption);
      } else {
        chartRef.current.hideLoading();
      }
      
      // 触发图表准备就绪回调
      onChartReady && onChartReady(chartRef.current);
    }
  }, [option, notMerge, lazyUpdate, showLoading, loadingOption, onChartReady]);
} 