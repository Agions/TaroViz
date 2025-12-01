/**
 * 雷达图组件
 */
import { RadarChart as RadarChartComponent } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { RadarChartProps } from '../types';

// 注册必要的组件
echarts.use([
  RadarChartComponent,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
]);

/**
 * 雷达图组件
 */
const RadarChart: React.FC<RadarChartProps> = props => (
  <BaseChartWrapper {...props} chartType="radar-chart" />
);

export default RadarChart;
