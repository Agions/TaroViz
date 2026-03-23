/**
 * 基础图表包装组件
 * 提供统一的图表初始化、渲染和生命周期管理
 */
import React, { useEffect, useRef, useMemo } from 'react';

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
  const chartInstance = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 使用 useMemo 缓存适配器配置，并处理类型问题
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

  // 处理图表初始化
  useEffect(() => {
    const initChart = async () => {
      const initConfig = processAdapterConfig({
        ...adapterConfig,
        onInit: (instance: any) => {
          chartInstance.current = instance;

          // 绑定事件
          if (onEvents) {
            Object.keys(onEvents).forEach((eventName) => {
              instance.on(eventName, (onEvents as any)[eventName]);
            });
          }

          // 初始化回调
          if (onChartInit) {
            onChartInit(instance);
          }

          // 准备好回调
          if (onChartReady) {
            onChartReady(instance);
          }
        },
      });

      // 获取适配器并初始化（异步动态导入）
      const adapter = await getAdapter(initConfig);
      adapter.init();

      // 返回清理函数
      return () => {
        if (chartInstance.current) {
          // 解绑事件
          if (onEvents) {
            Object.keys(onEvents).forEach((eventName) => {
              chartInstance.current?.off(eventName);
            });
          }
          chartInstance.current.dispose();
          chartInstance.current = null;
        }
      };
    };

    // 执行异步初始化并获取清理函数
    const cleanupPromise = initChart();

    // 返回清理函数
    return () => {
      cleanupPromise.then((cleanup) => cleanup?.());
    };
  }, [adapterConfig, onChartInit, onChartReady, onEvents]);

  // 更新配置
  useEffect(() => {
    if (chartInstance.current && option) {
      chartInstance.current.setOption(option, true);
    }
  }, [option]);

  // 控制加载状态
  useEffect(() => {
    if (chartInstance.current) {
      if (loading) {
        chartInstance.current.showLoading(loadingOption);
      } else {
        chartInstance.current.hideLoading();
      }
    }
  }, [loading, loadingOption]);

  // 自定义样式
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
    />
  );
};

export default BaseChartWrapper;
