/**
 * ScatterChart组件
 */
import React, { memo } from 'react';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { ScatterChartProps } from '../types';
import '@/core/echarts';

const ScatterChart: React.FC<ScatterChartProps> = memo((props) => (
  <BaseChartWrapper {...props} chartType="scatter-chart" />
));
ScatterChart.displayName = 'ScatterChart';

export default ScatterChart;
