import React from 'react';
import * as echarts from 'echarts/core';
import { LineChart as LineChartComponent } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components';
import { LineChartProps } from '../types';
import BaseChartWrapper from '../common/BaseChartWrapper';

// 注册必要的组件
echarts.use([
  LineChartComponent,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
]);

/**
 * 折线图组件
 */
const LineChart: React.FC<LineChartProps> = (props) => (
  <BaseChartWrapper {...props} chartType="line-chart" />
);

export default LineChart;

 