/**
 * 图表组件创建辅助函数
 * 为每个图表类型生成带正确 Props 类型的组件
 */

import React, { memo } from 'react';
import type { EChartsOption } from 'echarts';
import BaseChartWrapper from './common/BaseChartWrapper';
import type { BaseChartProps } from './types';

/**
 * 创建图表组件
 * @param displayName 组件名称
 * @param chartType ECharts 图表类型
 * @param needOptionCast 是否需要 option 类型转换（用于 boxplot、parallel 等）
 * @returns 带 displayName 的 memo 组件
 */
export function createChartComponent<P extends BaseChartProps = BaseChartProps>(
  displayName: string,
  chartType: string,
  needOptionCast = false
): React.FC<P> {
  const Chart: React.FC<P> = memo((props) => (
    <BaseChartWrapper
      {...(props as unknown as BaseChartProps)}
      option={
        needOptionCast
          ? ((props as { option?: EChartsOption }).option as EChartsOption)
          : (props as unknown as BaseChartProps).option
      }
      chartType={chartType}
    />
  ));
  Chart.displayName = displayName;
  return Chart;
}
