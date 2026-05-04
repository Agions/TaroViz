/**
 * 图表组件创建辅助函数
 * 为每个图表类型生成带正确 Props 类型的组件
 */

import React, { memo } from 'react';
import type { EChartsOption } from 'echarts';
import BaseChartWrapper from './common/BaseChartWrapper';
import type { BaseChartProps } from './types';

/**
 * 创建标准图表组件
 * @param displayName 组件名称
 * @param chartType ECharts 图表类型
 * @returns 带 displayName 的 memo 组件
 */
export function createChartComponent<P extends BaseChartProps = BaseChartProps>(
  displayName: string,
  chartType: string
): React.FC<P> {
  const Chart: React.FC<P> = memo((props) => (
    <BaseChartWrapper {...(props as unknown as BaseChartProps)} chartType={chartType} />
  ));
  Chart.displayName = displayName;
  return Chart;
}

/**
 * 创建需要 EChartsOption 类型转换的图表组件
 * 用于 boxplot、parallel 等使用自定义 Props 类型但需要转换 option 的图表
 * @param displayName 组件名称
 * @param chartType ECharts 图表类型
 * @returns 带 displayName 的 memo 组件
 */
export function createChartComponentWithOptionCast<P extends Record<string, unknown>>(
  displayName: string,
  chartType: string
): React.FC<P> {
  const Chart: React.FC<P> = memo((props) => (
    <BaseChartWrapper
      {...(props as unknown as BaseChartProps)}
      option={(props as { option?: EChartsOption }).option as EChartsOption}
      chartType={chartType}
    />
  ));
  Chart.displayName = displayName;
  return Chart;
}
