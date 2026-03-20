/**
 * Sunburst 旭日图组件
 * 用于展示带有层级结构的数据，以同心圆的形式展示
 */
import React, { memo } from 'react';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { SunburstChartProps } from '../types';

/**
 * Sunburst 旭日图组件
 */
const SunburstChart: React.FC<SunburstChartProps> = memo((props) => (
  <BaseChartWrapper {...props} chartType="sunburst-chart" />
));

SunburstChart.displayName = 'SunburstChart';

export default SunburstChart;
