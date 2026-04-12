/**
 * TaroViz 图表标注组件
 * 支持在图表上添加标记线、标记区域、散点等标注
 */
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';

/**
 * 标注类型
 */
export type AnnotationType = 'line' | 'area' | 'scatter' | 'rect' | 'image' | 'html';

/**
 * 标记线样式
 */
export interface MarkLineStyle {
  color?: string;
  width?: number;
  type?: 'solid' | 'dashed' | 'dotted';
  opacity?: number;
}

/**
 * 标记区域样式
 */
export interface MarkAreaStyle {
  color?: string;
  opacity?: number;
  borderColor?: string;
  borderWidth?: number;
  borderType?: 'solid' | 'dashed' | 'dotted';
}

/**
 * 标记线数据点 — 支持常规坐标和 ECharts 统计类型
 */
export interface MarkLineDataPoint {
  /** X轴值 */
  xAxis?: string | number;
  /** Y轴值 */
  yAxis?: string | number;
  /** 数据点名称 */
  name?: string;
  /** ECharts 统计/特殊类型（'average' | 'max' | 'min' | 'median'） */
  type?: string;
}

/**
 * 标记线配置
 */
export interface MarkLineConfig {
  /** 标记线数据 */
  data: MarkLineDataPoint[];
  /** 标记线样式 */
  lineStyle?: MarkLineStyle;
  /** 标签配置 */
  label?: {
    show?: boolean;
    position?: 'start' | 'middle' | 'end' | 'insideStartBottom' | 'insideStartTop';
    formatter?: string | ((value: unknown) => string);
    color?: string;
    fontSize?: number;
  };
  /** 是否启用动画 */
  animation?: boolean;
  /** 动画时长 */
  animationDuration?: number;
  /** 精度 */
  precision?: number;
}

/**
 * 标记区域配置
 */
export interface MarkAreaConfig {
  /** 区域数据，每个区域由两个点定义 */
  data: [MarkLineDataPoint, MarkLineDataPoint][];
  /** 区域样式 */
  style?: MarkAreaStyle;
  /** 标签配置 */
  label?: {
    show?: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'inside';
    formatter?: string | ((value: unknown) => string);
    color?: string;
    fontSize?: number;
  };
  /** 是否启用动画 */
  animation?: boolean;
  /** 动画时长 */
  animationDuration?: number;
}

/**
 * 散点标注配置
 */
export interface ScatterAnnotationConfig {
  /** 数据点 */
  data: Array<{
    coord: [number | string, number];
    value?: number;
    name: string;
  }>;
  /** 符号类型 */
  symbol?: string;
  /** 符号大小 */
  symbolSize?: number | [number, number];
  /** 样式 */
  itemStyle?: Record<string, unknown>;
  /** 标签 */
  label?: {
    show?: boolean;
    position?: string;
    formatter?: string | ((value: unknown) => string);
    color?: string;
  };
}

/**
 * 标注组件Props
 */
export interface AnnotationProps {
  /** 标注类型 */
  type: AnnotationType;
  /** 序列索引 */
  seriesIndex?: number;
  /** 标记线配置 */
  markLine?: MarkLineConfig;
  /** 标记区域配置 */
  markArea?: MarkAreaConfig;
  /** 散点标注配置 */
  scatter?: ScatterAnnotationConfig;
  /** 自定义标注数据 */
  customData?: unknown[];
}

/**
 * 将标注配置转换为 ECharts 标注格式
 */
export function convertAnnotationToMarkLine(config: MarkLineConfig): EChartsOption['series'] {
  const { data, lineStyle, label, animation, animationDuration, precision = 2 } = config;

  return [
    {
      type: 'line',
      markLine: {
        symbol: ['circle', 'arrow'],
        silent: true,
        animation: animation !== false,
        animationDuration: animationDuration || 300,
        precision,
        lineStyle: {
          color: lineStyle?.color || '#333',
          width: lineStyle?.width || 2,
          type: lineStyle?.type || 'dashed',
          opacity: lineStyle?.opacity,
        },
        label: {
          show: label?.show !== false,
          position: label?.position || 'end',
          formatter: label?.formatter,
          color: label?.color || '#333',
          fontSize: label?.fontSize || 12,
        },
        data: data.map((item) => ({
          xAxis: item.xAxis,
          yAxis: item.yAxis,
          name: item.name,
        })),
      },
    },
  ];
}

/**
 * 将标注区域配置转换为 ECharts 格式
 */
export function convertAnnotationToMarkArea(config: MarkAreaConfig): EChartsOption['series'] {
  const { data, style, label, animation, animationDuration } = config;

  return [
    {
      type: 'bar',
      markArea: {
        silent: true,
        animation: animation !== false,
        animationDuration: animationDuration || 300,
        itemStyle: {
          color: style?.color || 'rgba(24, 144, 255, 0.1)',
          opacity: style?.opacity || 0.3,
          borderColor: style?.borderColor || 'transparent',
          borderWidth: style?.borderWidth || 0,
          borderType: style?.borderType,
        },
        label: {
          show: label?.show !== false,
          position: label?.position || 'inside',
          formatter: label?.formatter,
          color: label?.color || '#333',
          fontSize: label?.fontSize || 12,
        },
        data: data.map(([start, end]) => [
          { xAxis: start.xAxis, yAxis: start.yAxis },
          { xAxis: end.xAxis, yAxis: end.yAxis },
        ]),
      },
    },
  ];
}

/**
 * 将散点标注配置转换为 ECharts 格式
 */
export function convertAnnotationToScatter(
  config: ScatterAnnotationConfig
): EChartsOption['series'] {
  const { data, symbol, symbolSize, itemStyle, label } = config;

  return [
    {
      type: 'scatter',
      markPoint: {
        symbol,
        symbolSize,
        itemStyle,
        label: {
          show: label?.show !== false,
          position: label?.position || ('top' as const),
          formatter: label?.formatter,
          color: label?.color || '#333',
        },
        data,
      },
    },
  ] as unknown as EChartsOption['series'];
}

/**
 * 标注 Hook
 * 用于生成标注配置
 */
export function useAnnotation(props: AnnotationProps): EChartsOption {
  const { type, markLine, markArea, scatter } = props;

  return useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const series: any[] = [];

    if (type === 'line' && markLine) {
      const markLineResult = convertAnnotationToMarkLine(markLine);
      series.push(...(Array.isArray(markLineResult) ? markLineResult : [markLineResult]));
    }

    if (type === 'area' && markArea) {
      const markAreaResult = convertAnnotationToMarkArea(markArea);
      series.push(...(Array.isArray(markAreaResult) ? markAreaResult : [markAreaResult]));
    }

    if (type === 'scatter' && scatter) {
      const scatterResult = convertAnnotationToScatter(scatter);
      series.push(...(Array.isArray(scatterResult) ? scatterResult : [scatterResult]));
    }

    return { series };
  }, [type, markLine, markArea, scatter]);
}

/**
 * 预定义标注样式
 */
export const AnnotationPresets = {
  /** 平均线 */
  averageLine: (color = '#1890ff'): MarkLineConfig => ({
    data: [{ type: 'average', name: '平均值' }],
    lineStyle: { color, type: 'dashed', width: 2 },
    label: { show: true, position: 'end', color },
  }),

  /** 最大值线 */
  maxLine: (color = '#f5222d'): MarkLineConfig => ({
    data: [{ type: 'max', name: '最大值' }],
    lineStyle: { color, type: 'dashed', width: 2 },
    label: { show: true, position: 'end', color },
  }),

  /** 最小值线 */
  minLine: (color = '#52c41a'): MarkLineConfig => ({
    data: [{ type: 'min', name: '最小值' }],
    lineStyle: { color, type: 'dashed', width: 2 },
    label: { show: true, position: 'end', color },
  }),

  /** 警戒线 */
  thresholdLine: (value: number, color = '#faad14'): MarkLineConfig => ({
    data: [{ yAxis: value, name: '警戒线' }],
    lineStyle: { color, type: 'solid', width: 2 },
    label: { show: true, position: 'start', color },
  }),

  /** 目标区域 */
  targetArea: (min: number, max: number, color = 'rgba(82, 196, 26, 0.1)'): MarkAreaConfig => ({
    data: [[{ yAxis: min }, { yAxis: max }]],
    style: { color, opacity: 0.3 },
    label: { show: true, position: 'inside', color: '#52c41a' },
  }),

  /** 预警区域 */
  warningArea: (min: number, max: number, color = 'rgba(250, 173, 20, 0.1)'): MarkAreaConfig => ({
    data: [[{ yAxis: min }, { yAxis: max }]],
    style: { color, opacity: 0.3 },
    label: { show: true, position: 'inside', color: '#faad14' },
  }),
};

/**
 * 创建组合标注
 */
export function createCompositeAnnotation(
  annotations: Array<{
    type: AnnotationType;
    markLine?: MarkLineConfig;
    markArea?: MarkAreaConfig;
    scatter?: ScatterAnnotationConfig;
  }>
): EChartsOption {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allSeries: any[] = [];

  annotations.forEach((annotation) => {
    if (annotation.type === 'line' && annotation.markLine) {
      const result = convertAnnotationToMarkLine(annotation.markLine);
      allSeries.push(...(Array.isArray(result) ? result : [result]));
    }
    if (annotation.type === 'area' && annotation.markArea) {
      const result = convertAnnotationToMarkArea(annotation.markArea);
      allSeries.push(...(Array.isArray(result) ? result : [result]));
    }
    if (annotation.type === 'scatter' && annotation.scatter) {
      const result = convertAnnotationToScatter(annotation.scatter);
      allSeries.push(...(Array.isArray(result) ? result : [result]));
    }
  });

  return { series: allSeries };
}

export default {
  useAnnotation,
  convertAnnotationToMarkLine,
  convertAnnotationToMarkArea,
  convertAnnotationToScatter,
  AnnotationPresets,
  createCompositeAnnotation,
};
