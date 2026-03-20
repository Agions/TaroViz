/**
 * TreeMap 图表组件
 * 用于展示带有层级结构的数据，通过矩形面积表示数据大小
 */
import React, { memo } from 'react';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { TreeMapChartProps } from '../types';

/**
 * TreeMap 图表组件
 */
const TreeMapChart: React.FC<TreeMapChartProps> = memo((props) => (
  <BaseChartWrapper {...props} chartType="treemap-chart" />
));

TreeMapChart.displayName = 'TreeMapChart';

export default TreeMapChart;
