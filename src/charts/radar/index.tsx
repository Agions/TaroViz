/**
 * 雷达图组件
 */
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { RadarChartProps } from '../types';

import '@/core/echarts';

/**
 * 雷达图组件
 */
const RadarChart: React.FC<RadarChartProps> = (props) => (
  <BaseChartWrapper {...props} chartType="radar-chart" />
);

export default RadarChart;
