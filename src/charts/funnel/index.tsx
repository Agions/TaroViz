/**
 * TaroViz 漏斗图组件
 *
 * 基于 ECharts funnel 系列实现漏斗图可视化
 */
import * as React from 'react';
import BaseChart from '@/core/components/BaseChart';
import type { BaseChartProps } from '@/charts/types';
import type { FunnelChartProps } from './types';
// 类型 FunnelDataItem 通过下方 export type 导出供外部使用

/**
 * 构建漏斗图 ECharts option
 */
function buildFunnelOption(props: FunnelChartProps) {
  const { data, sort, align, gap, min, max, optionMerge } = props;

  // 验证数据
  if (!data || data.length === 0) {
    console.warn('[TaroViz] FunnelChart: data is required');
    return null;
  }

  // 构建漏斗图 series
  const series = {
    type: 'funnel' as const,
    data: data,
    sort: sort || 'descending',
    align: align || 'left',
    gap: gap || 2,
    min: min || 0,
    max: max || 100,
    label: {
      show: true,
      position: 'inside',
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
  };

  const option: any = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (!params || !params.data) return '';
        return `<b>${params.data.name}</b><br/>值: ${params.data.value}`;
      },
    },
    series,
  };

  // 合并自定义配置
  if (optionMerge) {
    Object.assign(option, optionMerge);
  }

  return option;
}

/**
 * 漏斗图组件
 */
const FunnelChart: React.FC<FunnelChartProps> = (props) => {
  const { ...rest } = props;

  const option = buildFunnelOption(props);

  if (!option) {
    return null;
  }

  return <BaseChart option={option} {...(rest as BaseChartProps)} />;
};

export default FunnelChart;
