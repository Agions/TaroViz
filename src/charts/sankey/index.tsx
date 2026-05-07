/**
 * TaroViz 桑基图组件
 *
 * 基于 ECharts sankey 系列实现桑基图可视化
 */
import * as React from 'react';
import BaseChart from '@/core/components/BaseChart';
import type { BaseChartProps } from '@/charts/types';
import type { SankeyChartProps, SankeyNode, SankeyLink } from './types';

/**
 * 构建桑基图 ECharts option
 */
function buildSankeyOption(props: SankeyChartProps) {
  const { nodes, links, nodeAlign, nodeGap, nodeWidth, orient, optionMerge } = props;

  // 验证数据
  if (!nodes || nodes.length === 0) {
    console.warn('[TaroViz] SankeyChart: nodes is required');
    return null;
  }

  if (!links || links.length === 0) {
    console.warn('[TaroViz] SankeyChart: links is required');
    return null;
  }

  // 构建桑基图 series
  const series = {
    type: 'sankey' as const,
    layout: 'none',
    data: nodes,
    links: links,
    orient: orient || 'horizontal',
    nodeAlign: nodeAlign || 'left',
    nodeGap: nodeGap || 8,
    nodeWidth: nodeWidth || 20,
    label: {
      show: true,
      position: 'right',
    },
    emphasis: {
      focus: 'adjacency',
      lineStyle: {
        width: 4,
      },
    },
  };

  const option: any = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (!params || !params.data) return '';
        return `<b>${params.data.name}</b>`;
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
 * 桑基图组件
 */
const SankeyChart: React.FC<SankeyChartProps> = (props) => {
  const { nodes, ...rest } = props;

  const option = buildSankeyOption(props);

  if (!option) {
    return null;
  }

  return <BaseChart option={option} {...(rest as BaseChartProps)} />;
};

export default SankeyChart;
