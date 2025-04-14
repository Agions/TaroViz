import { View } from '@tarojs/components';
import * as echarts from 'echarts/core';
import React, { useEffect, useRef, useState } from 'react';

import { EChartsOption, EChartsType, AnimationEasing } from '../types';
import { uuid } from '../utils/uuid';

export interface BaseChartProps {
  /**
   * 图表配置项
   */
  option: EChartsOption;

  /**
   * 宽度
   */
  width?: number | string;

  /**
   * 高度
   */
  height?: number | string;

  /**
   * 主题
   */
  theme?: string;

  /**
   * 样式
   */
  style?: React.CSSProperties;

  /**
   * 类名
   */
  className?: string;

  /**
   * 是否自动调整大小
   */
  autoResize?: boolean;

  /**
   * 是否显示加载动画
   */
  loading?: boolean;

  /**
   * 加载动画配置
   */
  loadingOption?: object;

  /**
   * 图表实例初始化回调
   */
  onChartInit?: (chart: echarts.ECharts) => void;

  /**
   * 图表准备好的回调
   */
  onChartReady?: (chart: echarts.ECharts) => void;

  /**
   * 渲染器类型
   */
  renderer?: 'canvas' | 'svg';

  /**
   * 事件回调
   */
  onEvents?: Record<string, (params: any) => void>;

  /**
   * 图表引用
   */
  chartRef?: React.MutableRefObject<echarts.ECharts | null>;

  /**
   * 渲染模式，用于在SSR环境下控制渲染方式
   */
  renderMode?: 'client' | 'server';

  /**
   * 渲染优先级，用于控制大数据量时的渲染策略
   */
  renderPriority?: 'performance' | 'quality';

  /**
   * 动画配置
   */
  animation?: {
    enabled?: boolean;
    duration?: number;
    easing?: string;
  };
}

/**
 * 基础图表组件
 * 提供统一的图表渲染和生命周期管理
 */
const BaseChart: React.FC<BaseChartProps> = ({
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
  chartRef: externalChartRef,
  renderMode = 'client',
  renderPriority = 'quality',
  animation = { enabled: true, duration: 1000, easing: 'cubicOut' },
}) => {
  const chartId = useRef<string>(`chart-${uuid()}`);
  // 创建可变引用
  const internalChartRef = useRef<echarts.ECharts | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const resizeListenerRef = useRef<(() => void) | null>(null);

  // 处理外部引用和内部引用的同步
  const chartInstance = externalChartRef || internalChartRef;

  // 初始化图表
  useEffect(() => {
    if (renderMode === 'server') {
      return; // 服务端渲染模式下不初始化图表实例
    }

    // 确保容器已挂载
    if (!containerRef.current) {
      return;
    }

    // 创建图表实例
    const chart = echarts.init(containerRef.current, theme, {
      renderer,
      devicePixelRatio: window.devicePixelRatio,
      width: typeof width === 'number' ? width : undefined,
      height: typeof height === 'number' ? height : undefined,
      // 根据渲染优先级设置配置
      ...getRenderOptions(renderPriority),
    });

    // 设置配置项并使用类型安全的转换
    chart.setOption(processOption(option, animation));

    // 保存图表实例引用
    chartInstance.current = chart;

    // 绑定事件
    if (onEvents) {
      Object.keys(onEvents).forEach(eventName => {
        chart.on(eventName, onEvents[eventName]);
      });
    }

    // 初始化回调
    if (onChartInit) {
      onChartInit(chart);
    }

    // 设置图表已准备好的状态
    setIsReady(true);

    // 窗口大小变化时自动调整
    if (autoResize) {
      const resizeListener = debounce(() => {
        if (chart) {
          chart.resize();
        }
      }, 100);

      resizeListenerRef.current = resizeListener;
      window.addEventListener('resize', resizeListener);
    }

    // 组件卸载时的清理
    return () => {
      // 移除事件监听
      if (autoResize && resizeListenerRef.current) {
        window.removeEventListener('resize', resizeListenerRef.current);
        resizeListenerRef.current = null;
      }

      // 解绑自定义事件
      if (chart && onEvents) {
        Object.keys(onEvents).forEach(eventName => {
          chart.off(eventName);
        });
      }

      // 销毁图表实例
      if (chart) {
        chart.dispose();
      }

      // 清空引用
      chartInstance.current = null;
    };
  }, [theme, renderer, renderMode, renderPriority]);

  // 当图表准备好时触发回调
  useEffect(() => {
    if (isReady && chartInstance.current && onChartReady) {
      onChartReady(chartInstance.current);
    }
  }, [isReady, onChartReady]);

  // 更新配置
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.setOption(processOption(option, animation), true);
    }
  }, [option, animation]);

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

  // 服务端渲染模式
  if (renderMode === 'server') {
    return (
      <View id={chartId.current} className={`taroviz-chart ${className}`} style={mergedStyle}>
        <View className="taroviz-chart-placeholder">图表将在客户端渲染</View>
      </View>
    );
  }

  // 客户端渲染模式
  return (
    <View
      id={chartId.current}
      className={`taroviz-chart ${className}`}
      style={mergedStyle}
      ref={containerRef as React.RefObject<HTMLDivElement>}
    />
  );
};

// 根据渲染优先级获取配置项
function getRenderOptions(priority: 'performance' | 'quality'): Record<string, any> {
  if (priority === 'performance') {
    return {
      progressive: 100, // 渐进式渲染
      progressiveThreshold: 1000, // 渐进式渲染阈值
      progressiveChunkMode: 'sequential', // 渐进式渲染块模式
      lazyUpdate: true, // 懒更新
    };
  }
  return {};
}

// 处理配置项，应用动画设置
function processOption(
  option: EChartsOption,
  animationConfig: BaseChartProps['animation']
): EChartsOption {
  if (!animationConfig?.enabled) {
    return {
      ...option,
      animation: false,
    };
  }

  // 创建easing类型安全映射
  const getValidEasing = (easing?: string): AnimationEasing => {
    if (!easing) {
      return 'cubicOut';
    }

    // 检查是否是有效的easing类型
    const validEasings: AnimationEasing[] = [
      'linear',
      'quadraticIn',
      'quadraticOut',
      'quadraticInOut',
      'cubicIn',
      'cubicOut',
      'cubicInOut',
      'quarticIn',
      'quarticOut',
      'quarticInOut',
      'quinticIn',
      'quinticOut',
      'quinticInOut',
      'sinusoidalIn',
      'sinusoidalOut',
      'sinusoidalInOut',
      'exponentialIn',
      'exponentialOut',
      'exponentialInOut',
      'circularIn',
      'circularOut',
      'circularInOut',
      'elasticIn',
      'elasticOut',
      'elasticInOut',
      'backIn',
      'backOut',
      'backInOut',
      'bounceIn',
      'bounceOut',
      'bounceInOut',
    ];

    return validEasings.includes(easing as AnimationEasing)
      ? (easing as AnimationEasing)
      : 'cubicOut';
  };

  return {
    ...option,
    animation: true,
    animationDuration: animationConfig.duration,
    animationEasing: getValidEasing(animationConfig.easing),
  };
}

// 防抖函数
function debounce(fn: Function, delay: number): () => void {
  let timer: number | null = null;
  return function () {
    const context = this;
    const args = arguments;
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      fn.apply(context, args);
      timer = null;
    }, delay);
  };
}

export default BaseChart;
