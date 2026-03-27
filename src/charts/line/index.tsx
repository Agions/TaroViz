/**
 * 折线图组件
 */
import React, { memo } from 'react';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { LineChartProps } from '../types';

import '@/core/echarts';

const LineChart: React.FC<LineChartProps> = memo((props) => (
  <BaseChartWrapper {...props} chartType="line-chart" />
));
LineChart.displayName = 'LineChart';

export default LineChart;
