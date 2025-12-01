/**
 * 热力图组件
 */
import { HeatmapChart as HeatmapChartComponent } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { HeatmapChartProps } from '../types';

// 注册必要的组件
echarts.use([
  HeatmapChartComponent,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
]);

/**
 * 热力图组件
 */
const HeatmapChart: React.FC<HeatmapChartProps> = props => (
  <BaseChartWrapper {...props} chartType="heatmap-chart" />
);

export default HeatmapChart;
