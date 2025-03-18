/**
 * TaroViz H5 ECharts组件
 */
// 核心polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { useEffect, useRef, useState } from 'react';
import { View } from '@tarojs/components';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart,
  PieChart,
  GaugeChart
} from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { EChartsProps } from './types';

// 注册必要的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  PieChart,
  GaugeChart,
  CanvasRenderer
]);

// 添加类型定义
type EChartsInstance = {
  getEchartsInstance: () => echarts.ECharts;
};

// 同时使用命名导出
export const ECharts: React.FC<EChartsProps> = (props) => {
  const {
    option,
    style = { height: '300px', width: '100%' },
    className = '',
    notMerge = false,
    lazyUpdate = false,
    theme = '',
    onEvents = {},
    loading = false
  } = props;

  const [isClient, setIsClient] = useState(false);
  const chartRef = useRef<ReactEChartsCore | null>(null);

  // 处理加载状态
  useEffect(() => {
    if (chartRef.current && chartRef.current.getEchartsInstance) {
      const instance = chartRef.current.getEchartsInstance();
      if (loading) {
        instance.showLoading({
          text: '加载中...',
          color: '#5470c6',
          maskColor: 'rgba(255, 255, 255, 0.8)'
        });
      } else {
        instance.hideLoading();
      }
    }
  }, [loading]);

  useEffect(function() {
    setIsClient(true);
    console.log('ECharts H5组件已加载');
  }, []);

  if (!isClient) {
    return <View className={className} style={style}>图表加载中...</View>;
  }

  return (
    <ReactEChartsCore
      ref={chartRef}
      echarts={echarts}
      option={option}
      notMerge={notMerge}
      lazyUpdate={lazyUpdate}
      theme={theme}
      onEvents={onEvents}
      style={style}
      className={className}
      opts={{ renderer: 'canvas' }}
    />
  );
};

// 默认导出
export default ECharts;
