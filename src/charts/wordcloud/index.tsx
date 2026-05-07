/**
 * TaroViz 词云图组件
 *
 * 基于 ECharts wordCloud 系列实现词云可视化
 */
import * as React from 'react';
import BaseChart from '@/core/components/BaseChart';
import type { BaseChartProps } from '@/charts/types';
import type {
  WordCloudChartProps,
  WordCloudDataItem,
} from './types';

/**
 * 构建词云图 ECharts option
 */
function buildWordCloudOption(props: WordCloudChartProps) {
  const {
    wordCloudData,
    shape,
    sizeRange,
    rotationRange,
    rotationStep,
    gridSize,
    drawOutOfBound,
    textStyle,
    optionMerge,
  } = props;

  // 验证数据
  if (!wordCloudData || wordCloudData.length === 0) {
    console.warn('[TaroViz] WordCloudChart: wordCloudData is required');
    return null;
  }

  // 构建词云图 series
  const series = {
    type: 'wordCloud' as const,
    shape: shape || 'circle',
    data: wordCloudData,
    sizeRange: sizeRange || [12, 60],
    rotationRange: rotationRange || [-90, 90],
    rotationStep: rotationStep || 45,
    gridSize: gridSize || 8,
    drawOutOfBound: drawOutOfBound !== false,
    textStyle: {
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      ...textStyle,
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
        return `<b>${params.data.name}</b><br/>词频: ${params.data.value}`;
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
 * 词云图组件
 */
const WordCloudChart: React.FC<WordCloudChartProps> = (props) => {
  const { wordCloudData, ...rest } = props;

  const option = buildWordCloudOption(props);

  if (!option) {
    return null;
  }

  return <BaseChart option={option} {...(rest as BaseChartProps)} />;
};

export default WordCloudChart;
