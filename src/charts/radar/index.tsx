/**
 * TaroViz 雷达图组件
 *
 * 基于 ECharts radar 系列实现多指标对比可视化
 */
import { createOptionChartComponent } from '@/charts/createOptionChartComponent';
import type { RadarChartProps } from './types';
// 类型 RadarIndicator、RadarDataItem 通过下方 export type 导出供外部使用

/**
 * 构建雷达图 ECharts option
 */
function buildRadarOption(props: RadarChartProps) {
  const {
    indicators,
    data,
    startAngle = 90,
    centerCircle = false,
    centerCircleSize = 0,
    areaStyle,
    lineStyle,
    label,
    smooth = false,
    optionMerge,
  } = props;

  // 验证数据
  if (!indicators || indicators.length === 0) {
    console.warn('[TaroViz] RadarChart: indicators is required');
    return null;
  }

  if (!data || data.length === 0) {
    console.warn('[TaroViz] RadarChart: data is required');
    return null;
  }

  // 验证数据维度匹配
  const firstDataItem = data[0];
  if (firstDataItem.value.length !== indicators.length) {
    console.warn(
      `[TaroViz] RadarChart: data value length (${firstDataItem.value.length}) ` +
        `does not match indicators count (${indicators.length})`
    );
  }

  // 构建雷达图 series
  const series = data.map((item, index) => ({
    type: 'radar' as const,
    data: [item],
    symbol: 'circle' as const,
    symbolSize: 6,
    lineStyle: {
      width: lineStyle?.width ?? 2,
      type: lineStyle?.type ?? ('solid' as const),
      color: lineStyle?.color,
    },
    areaStyle: areaStyle
      ? {
          color: areaStyle.color,
          opacity: areaStyle.opacity ?? 0.3,
        }
      : undefined,
    label: label
      ? {
          show: label.show ?? false,
          position: label.position ?? ('outside' as const),
        }
      : undefined,
    itemStyle: {
      color: `rgba(54, 157, 255, ${0.1 + index * 0.1})`,
      borderColor: '#369dff',
      borderWidth: 2,
    },
    emphasis: {
      focus: 'series' as const,
    },
    smooth,
  }));

  // 构建 indicator 配置
  const indicatorConfig = indicators.map((ind) => ({
    name: ind.name,
    max: ind.max,
    min: ind.min ?? 0,
  }));

  const option: any = {
    radar: {
      indicator: indicatorConfig,
      startAngle,
      center: ['50%', '50%'],
      radius: centerCircle ? `${70 - centerCircleSize * 30}%` : '70%',
      centerCircle,
      centerCircleSize,
      splitNumber: 5,
      axisName: {
        color: '#666',
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: ['#eee', '#ddd'],
        },
      },
      splitArea: {
        areaStyle: {
          color: ['#fafafa', '#f5f5f5'],
          opacity: 0.5,
        },
      },
      axisLine: {
        lineStyle: {
          color: '#ccc',
        },
      },
    },
    series,
    legend: {
      data: data.map((d, i) => d.name || `系列 ${i + 1}`),
      top: 30,
    },
    tooltip: {
      trigger: 'item' as const,
      formatter: (params: any) => {
        if (!params || !params.data) return '';
        const seriesName = params.seriesName || '未知系列';
        const dataItem = params.data as { value: number[] };
        const values = dataItem.value.map(
          (v: number, i: number) => `${indicators[i]?.name || 'N/A'}: ${v}`
        );
        return `<b>${seriesName}</b><br/>${values.join('<br/>')}`;
      },
    },
  };

  // 合并自定义配置
  if (optionMerge) {
    Object.assign(option, optionMerge);
  }

  return option;
}

const RadarChart = createOptionChartComponent<RadarChartProps>('RadarChart', buildRadarOption);

export default RadarChart;
