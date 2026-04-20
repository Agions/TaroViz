/**
 * BarChart组件
 */
import React, { memo } from 'react';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { BarChartProps } from '../types';
import '@/core/echarts';

const BarChart: React.FC<BarChartProps> = memo((props) => (
  <BaseChartWrapper {...props} chartType="bar-chart" />
));
BarChart.displayName = 'BarChart';

export default BarChart;
