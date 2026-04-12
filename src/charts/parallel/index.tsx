/**
 * 平行坐标图组件
 * 用于展示高维数据各维度之间的关系
 */
import React, { memo } from 'react';
import type { EChartsOption } from 'echarts';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { ParallelChartProps } from './types';

const ParallelChart: React.FC<ParallelChartProps> = memo((props) => (
  <BaseChartWrapper {...props} option={props.option as EChartsOption} chartType="parallel" />
));

ParallelChart.displayName = 'ParallelChart';

export default ParallelChart;

// 导出类型
export type { ParallelChartProps, ParallelOption, ParallelAxisSetting } from './types';
