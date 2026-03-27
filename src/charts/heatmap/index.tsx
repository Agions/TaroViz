/**
 * HeatmapChart组件
 */
import React, { memo } from 'react';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { HeatmapChartProps } from '../types';
import '@/core/echarts';

const HeatmapChart: React.FC<HeatmapChartProps> = memo((props) => (
  <BaseChartWrapper {...props} chartType="heatmap-chart" />
));
HeatmapChart.displayName = 'HeatmapChart';

export default HeatmapChart;
