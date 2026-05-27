/**
 * TaroViz 热力图组件
 *
 * 基于 ECharts heatmap 系列实现二维数据密度可视化
 */
import { createOptionChartComponent } from '@/charts/createOptionChartComponent';
import type { HeatmapChartProps } from './types';
// 类型 HeatmapDataItem、HeatmapAxis 通过下方 export type 导出供外部使用

/**
 * 构建热力图 ECharts option
 */
function buildHeatmapOption(props: HeatmapChartProps) {
  const { xData, yData, data, visualMap, optionMerge } = props;

  // 验证数据
  if (!xData || xData.length === 0) {
    console.warn('[TaroViz] HeatmapChart: xData is required');
    return null;
  }

  if (!yData || yData.length === 0) {
    console.warn('[TaroViz] HeatmapChart: yData is required');
    return null;
  }

  if (!data || data.length === 0) {
    console.warn('[TaroViz] HeatmapChart: data is required');
    return null;
  }

  // 构建热力图 series
  const series = {
    type: 'heatmap' as const,
    data: data.map((item) => [item.x, item.y, item.value]),
    label: {
      show: true,
      formatter: (params: any) => {
        if (!params || params.value?.length !== 3) return '';
        return params.value[2];
      },
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
  };

  // 构建坐标轴
  const xAxis: any = {
    type: 'category',
    data: xData,
    axisLabel: {
      rotate: xData.length > 10 ? 45 : 0,
    },
  };

  const yAxis: any = {
    type: 'category',
    data: yData,
    axisLabel: {
      rotate: yData.length > 10 ? 45 : 0,
    },
  };

  // 构建 visualMap
  const visualMapConfig = visualMap || {
    min: 0,
    max: Math.max(...data.map((d) => d.value)),
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    top: 'bottom',
    text: ['高', '低'],
  };

  const option: any = {
    tooltip: {
      position: 'top',
      formatter: (params: any) => {
        if (!params || !params.data) return '';
        const [x, y, value] = params.data;
        return `<b>${x} × ${y}</b><br/>值: ${value}`;
      },
    },
    xAxis,
    yAxis,
    series,
    visualMap: visualMapConfig,
  };

  // 合并自定义配置
  if (optionMerge) {
    Object.assign(option, optionMerge);
  }

  return option;
}

const HeatmapChart = createOptionChartComponent<HeatmapChartProps>(
  'HeatmapChart',
  buildHeatmapOption
);

export default HeatmapChart;
