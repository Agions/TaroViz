/**
 * 关系图组件
 * 用于展示节点之间的关系，如社交网络、知识图谱等
 */
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { GraphChartProps } from '../types';

/**
 * 关系图组件
 */
const GraphChart: React.FC<GraphChartProps> = (props) => (
  <BaseChartWrapper {...props} chartType="graph-chart" />
);

export default GraphChart;
