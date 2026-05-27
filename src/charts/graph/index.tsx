/**
 * TaroViz 关系图组件
 *
 * 基于 ECharts graph 系列实现关系图/力导向图可视化
 */
import { createOptionChartComponent } from '@/charts/createOptionChartComponent';
import type { GraphChartProps } from './types';
// 类型 GraphNode、GraphLink 通过下方 export type 导出供外部使用

/**
 * 构建关系图 ECharts option
 */
function buildGraphOption(props: GraphChartProps) {
  const { nodes, links, layout, force, draggable, optionMerge } = props;

  // 验证数据
  if (!nodes || nodes.length === 0) {
    console.warn('[TaroViz] GraphChart: nodes is required');
    return null;
  }

  // 构建关系图 series
  const series: any = {
    type: 'graph' as const,
    layout: layout || 'force',
    data: nodes,
    links: links || [],
    draggable: draggable !== false,
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

  // 添加力导向布局配置
  if (layout === 'force' && force) {
    series.force = force;
  }

  const option: any = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        if (!params || !params.data) return '';
        return `<b>${params.data.name}</b>`;
      },
    },
    legend: {
      data: nodes.map((n) => n.name),
    },
    series,
  };

  // 合并自定义配置
  if (optionMerge) {
    Object.assign(option, optionMerge);
  }

  return option;
}

const GraphChart = createOptionChartComponent<GraphChartProps>('GraphChart', buildGraphOption);

export default GraphChart;
