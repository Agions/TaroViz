/**
 * 基础图表包装组件
 * 提供统一的图表初始化、渲染和生命周期管理
 */
import React, { useEffect, useRef, useMemo } from 'react';
import type { EChartsType } from 'echarts';

import { getAdapter } from '../../adapters';
import { uuid } from '../../core/utils';
import { BaseChartProps } from '../types';
import { processAdapterConfig } from '../utils';

/**
 * 基础图表包装组件
 * 提供统一的图表初始化、渲染和生命周期管理
 */
const BaseChartWrapper: React.FC<BaseChartProps & { chartType: string }> = ({
  option,
  width = '100%',
  height = '300px',
  theme,
  style = {},
  className = '',
  autoResize = true,
  loading = false,
  loadingOption,
  onChartInit,
  onChartReady,
  renderer = 'canvas',
  onEvents = {},
  chartType = 'chart',
}) => {
  const chartId = useRef<string>(`${chartType}-${uuid()}`);
  const chartInstance = useRef<EChartsType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Track mounted state to prevent cleanup after unmount
  const isMountedRef = useRef(true);
  // Store cleanup fn from async init
  const cleanupRef = useRef<(() => void) | null>(null);

  // Use memo to cache adapter config
  const adapterConfig = useMemo(() => {
    return processAdapterConfig({
      canvasId: chartId.current,
      containerRef,
      width,
      height,
      theme,
      autoResize,
      renderer,
      option,
    });
  }, [width, height, theme, autoResize, renderer, option]);

  // Handle chart initialization
  useEffect(() => {
    isMountedRef.current = true;

    const initChart = async () => {
      const initConfig = processAdapterConfig({
        ...adapterConfig,
        onInit: (instance: EChartsType) => {
          if (!isMountedRef.current) {
            // Already unmounted — dispose immediately
            instance.dispose();
            return;
          }
          chartInstance.current = instance;

          // Bind events
          if (onEvents) {
            Object.entries(onEvents).forEach(([eventName, handler]) => {
              // ECharts event types are dynamic; cast to any to satisfy strict types
              (instance as unknown as { on: Function }).on(eventName, handler);
            });
          }

          if (onChartInit) {
            onChartInit(instance);
          }

          if (onChartReady) {
            onChartReady(instance);
          }
        },
      });

      // Get adapter and init (async dynamic import)
      const adapter = await getAdapter(initConfig);

      if (!isMountedRef.current) {
        // Unmounted while awaiting adapter — dispose
        return;
      }

      adapter.init();

      // Store cleanup fn
      cleanupRef.current = () => {
        if (chartInstance.current) {
          if (onEvents) {
            Object.entries(onEvents).forEach(([eventName]) => {
              (chartInstance.current as unknown as { off: Function }).off(eventName);
            });
          }
          chartInstance.current.dispose();
          chartInstance.current = null;
        }
      };
    };

    initChart();

    // Cleanup on unmount
    return () => {
      isMountedRef.current = false;
      // If async init completed and stored a cleanup fn, run it
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [adapterConfig, onChartInit, onChartReady, onEvents]);

  // Update config
  useEffect(() => {
    if (chartInstance.current && option) {
      chartInstance.current.setOption(option, true);
    }
  }, [option]);

  // Loading state
  useEffect(() => {
    if (chartInstance.current) {
      if (loading) {
        chartInstance.current.showLoading(loadingOption);
      } else {
        chartInstance.current.hideLoading();
      }
    }
  }, [loading, loadingOption]);

  // Merged style
  const mergedStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  return (
    <div
      className={`taroviz-${chartType} ${className}`}
      style={mergedStyle}
      ref={containerRef as React.RefObject<HTMLDivElement>}
      role="img"
      aria-label={chartType === 'chart' ? '图表' : `${chartType} 图表`}
      tabIndex={0}
    />
  );
};

export default BaseChartWrapper;
