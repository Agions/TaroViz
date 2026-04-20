/**
 * GraphChart组件
 */
import React, { memo } from 'react';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { GraphChartProps } from '../types';

const GraphChart: React.FC<GraphChartProps> = memo((props) => (
  <BaseChartWrapper {...props} chartType="graph-chart" />
));
GraphChart.displayName = 'GraphChart';

export default GraphChart;
