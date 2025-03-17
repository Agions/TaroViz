import { useEffect } from 'react';

interface UseChartEventProps {
  chartRef: React.MutableRefObject<any>;
  onEvents?: Record<string, (params: any) => void>;
}

export function useChartEvent({
  chartRef,
  onEvents
}: UseChartEventProps) {
  // 绑定事件
  useEffect(() => {
    if (!chartRef.current || !onEvents) return;

    // 清除旧的事件绑定
    const instance = chartRef.current;
    const zr = instance.getZr && instance.getZr();

    if (zr) {
      // 清除所有事件
      zr.off('click');
      zr.off('mousemove');
      zr.off('mouseout');
    }

    // 绑定新的事件
    Object.keys(onEvents).forEach(eventName => {
      const handler = onEvents[eventName];
      if (typeof handler === 'function') {
        instance.on(eventName, handler);
      }
    });

    // 清理函数
    return () => {
      if (instance && !instance.isDisposed()) {
        // 解绑所有事件
        Object.keys(onEvents).forEach(eventName => {
          const handler = onEvents[eventName];
          if (typeof handler === 'function') {
            instance.off(eventName, handler);
          }
        });
      }
    };
  }, [chartRef, onEvents]);
}
