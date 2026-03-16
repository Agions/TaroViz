/**
 * 漏斗图组件
 */
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { FunnelChartProps } from '../types';

import '@/core/echarts';

/**
 * 漏斗图组件
 */
const FunnelChart: React.FC<FunnelChartProps> = (props) => (
  <BaseChartWrapper {...props} chartType="funnel-chart" />
);

export default FunnelChart;
