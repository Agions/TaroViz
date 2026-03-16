/**
 * 柱状图组件
 */
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { BarChartProps } from '../types';

import '@/core/echarts';

/**
 * 柱状图组件
 */
const BarChart: React.FC<BarChartProps> = (props) => (
  <BaseChartWrapper {...props} chartType="bar-chart" />
);

export default BarChart;
