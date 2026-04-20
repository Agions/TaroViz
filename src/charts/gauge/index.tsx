/**
 * GaugeChart组件
 */
import React, { memo } from 'react';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { GaugeChartProps } from '../types';
import '@/core/echarts';

const GaugeChart: React.FC<GaugeChartProps> = memo((props) => (
  <BaseChartWrapper {...props} chartType="gauge-chart" />
));
GaugeChart.displayName = 'GaugeChart';

export default GaugeChart;
