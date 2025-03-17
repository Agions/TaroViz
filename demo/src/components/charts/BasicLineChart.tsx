import React from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import ReactECharts from 'echarts-for-react';

// 注册必要的组件
echarts.use([GridComponent, TooltipComponent, TitleComponent, LegendComponent, LineChart, CanvasRenderer]);

const BasicLineChart: React.FC = () => {
  // 图表配置
  const option = {
    title: {
      text: '季度温度变化'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['最高温度', '最低温度']
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    series: [
      {
        name: '最高温度',
        type: 'line',
        data: [3, 5, 10, 15, 22, 28, 32, 30, 25, 18, 12, 5],
        itemStyle: {
          color: '#ff4d4f'
        }
      },
      {
        name: '最低温度',
        type: 'line',
        data: [-2, -1, 2, 5, 12, 18, 22, 20, 15, 8, 2, -1],
        itemStyle: {
          color: '#13c2c2'
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};

export default BasicLineChart;
