import { useEffect } from 'react';
import Taro from '@tarojs/taro';

interface UseChartResizeProps {
  chartRef: React.MutableRefObject<any>;
  adapterRef: React.MutableRefObject<any>;
  width: string | number;
  height: string | number;
}

export function useChartResize({
  chartRef,
  adapterRef,
  width,
  height
}: UseChartResizeProps) {
  // 监听尺寸变化
  useEffect(() => {
    if (!chartRef.current) return;

    // 调整图表尺寸
    adapterRef.current?.resize();

    // 监听窗口尺寸变化
    const handleResize = () => {
      adapterRef.current?.resize();
    };

    // 根据环境选择不同的监听方式
    if (process.env.TARO_ENV === 'h5') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    } else {
      // 小程序环境
      Taro.onWindowResize(handleResize);
      return () => {
        Taro.offWindowResize(handleResize);
      };
    }
  }, [chartRef, adapterRef, width, height]);
}
