/**
 * 热力图组件
 */
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { HeatmapChartProps } from '../types';

import '@/core/echarts';

/**
 * 热力图组件
 */
const HeatmapChart: React.FC<HeatmapChartProps> = (props) => (
  <BaseChartWrapper {...props} chartType="heatmap-chart" />
);

export default HeatmapChart;
