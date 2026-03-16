/**
 * 折线图组件
 */
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { LineChartProps } from '../types';

import '@/core/echarts';

/**
 * 折线图组件
 */
const LineChart: React.FC<LineChartProps> = (props) => (
  <BaseChartWrapper {...props} chartType="line-chart" />
);

export default LineChart;
