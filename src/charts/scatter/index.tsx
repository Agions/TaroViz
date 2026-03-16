/**
 * 散点图组件
 */
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { ScatterChartProps } from '../types';

import '@/core/echarts';

/**
 * 散点图组件
 */
const ScatterChart: React.FC<ScatterChartProps> = (props) => (
  <BaseChartWrapper {...props} chartType="scatter-chart" />
);

export default ScatterChart;
