/**
 * TaroViz 微信小程序版本
 * 为微信小程序环境提供ECharts图表组件
 */
import React, { useEffect, useRef } from 'react';
import { Canvas, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
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
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';
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
  CanvasRenderer,
  SVGRenderer
]);

const ECharts: React.FC<EChartsProps> = (props) => {
  const {
    option,
    style = { height: '300px', width: '100%' },
    className = '',
    canvasId = 'echarts-canvas',
    loading = false
  } = props;

  const chartRef = useRef<any>(null);

  // 处理loading状态
  useEffect(() => {
    if (chartRef.current) {
      if (loading) {
        chartRef.current.showLoading({
          text: '加载中...',
          color: '#5470c6',
          maskColor: 'rgba(255, 255, 255, 0.8)'
        });
      } else {
        chartRef.current.hideLoading();
      }
    }
  }, [loading]);

  useEffect(() => {
    let chart: any = null;
    let isInitialized = false;

    const renderChart = async () => {
      try {
        const canvasNode = await Taro.createSelectorQuery()
          .select(`#${canvasId}`)
          .node()
          .exec();

        const canvas = canvasNode[0].node;
        const ctx = canvas.getContext('2d');

        const pixelRatio = Taro.getSystemInfoSync().pixelRatio;
        canvas.width = canvas._width * pixelRatio;
        canvas.height = canvas._height * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);

        chart = echarts.init(canvas, null, {
          width: canvas._width,
          height: canvas._height,
          renderer: 'canvas'
        });

        chart.setOption(option);
        isInitialized = true;
        chartRef.current = chart;

        // 初始化后检查是否需要显示loading状态
        if (loading) {
          chart.showLoading({
            text: '加载中...',
            color: '#5470c6',
            maskColor: 'rgba(255, 255, 255, 0.8)'
          });
        }

        // 自动适应屏幕
        const resizeListener = () => {
          if (chart && !chart.isDisposed()) {
            chart.resize();
          }
        };
        Taro.eventCenter.on('__taroResize', resizeListener);

        return () => {
          Taro.eventCenter.off('__taroResize', resizeListener);
          if (chart && !chart.isDisposed()) {
            chart.dispose();
          }
        };
      } catch (error) {
        console.error('ECharts初始化失败：', error);
      }
    };

    renderChart();

    return () => {
      if (chart && !chart.isDisposed()) {
        chart.dispose();
      }
    };
  }, [canvasId, option]);

  return (
    <Canvas
      type="2d"
      id={canvasId}
      className={className}
      style={style}
    />
  );
};

export default ECharts;
