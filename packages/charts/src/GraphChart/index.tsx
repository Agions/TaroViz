import { getAdapter } from '@agions/taroviz-adapters';
import { EChartsOption, uuid } from '@agions/taroviz-core';
import { View } from '@tarojs/components';
import { GraphChart as GraphChartComponent } from 'echarts/charts';
import {
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import React, { useEffect, useRef } from 'react';

import { safeRenderAdapter } from '../utils';

// 注册必要的组件
echarts.use([
  GraphChartComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
]);

export interface GraphChartProps {
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
  theme?: string | object;

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
  onChartInit?: (chart: any) => void;

  /**
   * 图表准备好的回调
   */
  onChartReady?: (chart: any) => void;

  /**
   * 渲染器类型
   */
  renderer?: 'canvas' | 'svg';

  /**
   * 事件回调
   */
  onEvents?: Record<string, (params: any) => void>;
}

/**
 * 关系图组件
 */
const GraphChart: React.FC<GraphChartProps> = ({
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
}) => {
  const chartId = useRef<string>(`graph-chart-${uuid()}`);
  const chartInstance = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 处理图表初始化
  useEffect(() => {
    // 获取适配器
    const adapter = getAdapter({
      width,
      height,
      theme,
      autoResize,
      canvasId: chartId.current,
      containerRef,
      option,
      renderer,
      onInit: instance => {
        chartInstance.current = instance;

        // 绑定事件
        if (onEvents) {
          Object.keys(onEvents).forEach(eventName => {
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
      },
    });

    // 初始化
    adapter.init();

    // 组件卸载时清理
    return () => {
      if (chartInstance.current) {
        // 解绑事件
        if (onEvents) {
          Object.keys(onEvents).forEach(eventName => {
            chartInstance.current.off(eventName);
          });
        }
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, []);

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
    ...style,
  };

  // 渲染适配器
  const adapter = getAdapter({
    width,
    height,
    theme,
    autoResize,
    canvasId: chartId.current,
    containerRef,
  });

  return (
    <View
      className={`taroviz-graph-chart ${className}`}
      style={mergedStyle}
      ref={containerRef as any}
    >
      {safeRenderAdapter(adapter)}
    </View>
  );
};

export default GraphChart;
