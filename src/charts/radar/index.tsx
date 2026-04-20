/**
 * RadarChart组件
 */
import React, { memo } from 'react';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { RadarChartProps } from '../types';
import '@/core/echarts';

const RadarChart: React.FC<RadarChartProps> = memo((props) => (
  <BaseChartWrapper {...props} chartType="radar-chart" />
));
RadarChart.displayName = 'RadarChart';

export default RadarChart;
