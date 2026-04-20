/**
 * FunnelChart组件
 */
import React, { memo } from 'react';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { FunnelChartProps } from '../types';
import '@/core/echarts';

const FunnelChart: React.FC<FunnelChartProps> = memo((props) => (
  <BaseChartWrapper {...props} chartType="funnel-chart" />
));
FunnelChart.displayName = 'FunnelChart';

export default FunnelChart;
