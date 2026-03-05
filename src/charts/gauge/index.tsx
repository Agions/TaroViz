/**
 * 仪表盘组件
 */
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { GaugeChartProps } from '../types';

import '@/core/echarts';

/**
 * 仪表盘组件
 */
const GaugeChart: React.FC<GaugeChartProps> = props => (
  <BaseChartWrapper {...props} chartType="gauge-chart" />
);

export default GaugeChart;
