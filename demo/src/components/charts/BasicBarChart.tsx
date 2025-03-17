import React from 'react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import ReactECharts from 'echarts-for-react';

// 注册必要的组件
echarts.use([GridComponent, TooltipComponent, TitleComponent, LegendComponent, BarChart, CanvasRenderer]);

const BasicBarChart: React.FC = () => {
  // 图表配置
  const option = {
    title: {
      text: '月度销售数据'
    },
    tooltip: {},
    legend: {
      data: ['销售额']
    },
    xAxis: {
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {},
    series: [
      {
        name: '销售额',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
        itemStyle: {
          color: '#1890ff'
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};

export default BasicBarChart;
