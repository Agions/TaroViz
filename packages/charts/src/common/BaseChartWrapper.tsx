import React, { useEffect, useRef, useMemo } from 'react';
import { View } from '@tarojs/components';
import * as echarts from 'echarts/core';
import { getAdapter } from '@taroviz/adapters';
import { uuid } from '@taroviz/core';
import { BaseChartProps } from '../types';
import { processAdapterConfig, safeRenderAdapter } from '../utils';

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
  chartType = 'chart'
}) => {
  const chartId = useRef<string>(`${chartType}-${uuid()}`);
  const chartInstance = useRef<echarts.ECharts | null>(null);
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
      option
    });
  }, [width, height, theme, autoResize, renderer, option, chartType]);
  
  // 处理图表初始化
  useEffect(() => {
    const initConfig = processAdapterConfig({
      ...adapterConfig,
      onInit: (instance: echarts.ECharts) => {
        chartInstance.current = instance;
        
        // 绑定事件
        if (onEvents) {
          Object.keys(onEvents).forEach((eventName) => {
            instance.on(eventName, onEvents[eventName]);
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
      }
    });
    
    // 获取适配器并初始化
    const adapter = getAdapter(initConfig);
    adapter.init();
    
    // 组件卸载时清理
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
  }, [adapterConfig, onChartInit, onChartReady, onEvents]);
  
  // 更新配置
  useEffect(() => {
    if (chartInstance.current) {
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
    ...style
  };
  
  // 使用带有处理的适配器配置创建适配器实例
  const adapter = getAdapter(adapterConfig);
  
  return (
    <View 
      className={`taroviz-${chartType} ${className}`}
      style={mergedStyle}
      ref={containerRef as React.RefObject<HTMLDivElement>}
    >
      {/* 安全地渲染适配器 */}
      {safeRenderAdapter(adapter)}
    </View>
  );
};

export default BaseChartWrapper; 