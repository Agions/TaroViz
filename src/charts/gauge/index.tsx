/**
 * 仪表盘组件
 */
import { GaugeChart as GaugeChartComponent } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { GaugeChartProps } from '../types';

// 注册必要的组件
echarts.use([
  GaugeChartComponent,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
]);

/**
 * 仪表盘组件
 */
const GaugeChart: React.FC<GaugeChartProps> = props => (
  <BaseChartWrapper {...props} chartType="gauge-chart" />
);

export default GaugeChart;
