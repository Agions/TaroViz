/**
 * PieChart组件
 */
import React, { memo } from 'react';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { BaseChartProps } from '../types';
import '@/core/echarts';

const PieChart: React.FC<BaseChartProps> = memo((props) => (
  <BaseChartWrapper {...props} chartType="pie-chart" />
));
PieChart.displayName = 'PieChart';

export default PieChart;
