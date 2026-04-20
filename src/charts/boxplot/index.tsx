/**
 * 箱线图组件
 * 用于展示数据的分布情况，包括最小值、Q1、中位数、Q3、最大值
 */
import React, { memo } from 'react';
import type { EChartsOption } from 'echarts';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { BoxplotChartProps } from './types';

const BoxplotChart: React.FC<BoxplotChartProps> = memo((props) => (
  <BaseChartWrapper {...props} option={props.option as EChartsOption} chartType="boxplot" />
));

BoxplotChart.displayName = 'BoxplotChart';

export default BoxplotChart;

// 导出类型
export type { BoxplotChartProps, BoxplotOption, BoxplotSeriesItem } from './types';
