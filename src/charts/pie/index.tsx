/**
 * 饼图组件
 */
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { BaseChartProps } from '../types';

// 导入统一注册的 echarts
import '@/core/echarts';

/**
 * 饼图组件
 */
const PieChart: React.FC<BaseChartProps> = (props) => (
  <BaseChartWrapper {...props} chartType="pie-chart" />
);

export default PieChart;
