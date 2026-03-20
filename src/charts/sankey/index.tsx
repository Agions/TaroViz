/**
 * Sankey 桑基图组件
 * 用于展示数据流向和转移关系
 */
import React, { memo } from 'react';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { SankeyChartProps } from '../types';

/**
 * Sankey 桑基图组件
 */
const SankeyChart: React.FC<SankeyChartProps> = memo((props) => (
  <BaseChartWrapper {...props} chartType="sankey-chart" />
));

SankeyChart.displayName = 'SankeyChart';

export default SankeyChart;
