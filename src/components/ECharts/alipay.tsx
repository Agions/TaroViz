/**
 * TaroViz 支付宝小程序版本
 * 为支付宝小程序环境提供ECharts图表组件
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

// 定义查询结果类型
interface CanvasNodeResult {
  node: {
    getContext: (type: string) => any;
    _width: number;
    _height: number;
    width: number;
    height: number;
  };
}

// 扩展echarts模块，使其支持小程序canvas
declare module 'echarts/core' {
  // 扩展init函数接受小程序Canvas节点
  export function init(
    dom: HTMLElement | CanvasNodeResult['node'],
    theme?: string | object,
    opts?: echarts.EChartsInitOpts
  ): echarts.ECharts;
}

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
        // 支付宝小程序canvas获取方式略有不同
        const query = Taro.createSelectorQuery();
        const canvasNode = await new Promise<CanvasNodeResult[]>(resolve => {
          query.select(`#${canvasId}`)
            .node()
            .exec((res) => {
              resolve(res as CanvasNodeResult[]);
            });
        });

        if (!canvasNode || !canvasNode[0] || !canvasNode[0].node) {
          console.error('获取Canvas节点失败');
          return;
        }

        const canvas = canvasNode[0].node;
        const ctx = canvas.getContext('2d');

        const pixelRatio = Taro.getSystemInfoSync().pixelRatio;
        canvas.width = canvas._width * pixelRatio;
        canvas.height = canvas._height * pixelRatio;
        ctx.scale(pixelRatio, pixelRatio);

        // 使用类型断言解决类型兼容性问题
        chart = echarts.init(canvas as unknown as HTMLElement, null, {
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
