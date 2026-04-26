/**
 * 树图组件
 * ECharts 内置 tree 类型
 */
import React, { memo, useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { TreeChartProps, TreeSeries } from './types';

/**
 * 树图组件
 */
const TreeChart: React.FC<TreeChartProps> = memo((props) => {
  const {
    option,
    treeData,
    layout = 'orthogonal',
    orient = 'horizontal',
    nodeGap,
    nodeWidth,
    initialTreeDepth,
    symbol,
    symbolSize,
    showLine = true,
    lineCurveness,
    label,
    labelPosition,
    labelAlign,
    lineStyle,
    itemStyle,
    ...restProps
  } = props;

  // 构建树图配置
  const mergedOption = useMemo(() => {
    const baseOption = option || {};

    // 如果用户提供了 series，直接返回
    if (baseOption.series && baseOption.series.length > 0) {
      return baseOption;
    }

    // 构建树图 series
    const seriesConfig: TreeSeries = {
      type: 'tree',
      layout,
      orient,
      data: treeData,
      showLine,
    };

    // 添加可选参数
    if (nodeGap !== undefined) {
      seriesConfig.nodeGap = nodeGap;
    }
    if (nodeWidth !== undefined) {
      seriesConfig.nodeWidth = nodeWidth;
    }
    if (initialTreeDepth !== undefined) {
      seriesConfig.initialTreeDepth = initialTreeDepth;
    }
    if (symbol !== undefined) {
      seriesConfig.symbol = symbol;
    }
    if (symbolSize !== undefined) {
      seriesConfig.symbolSize = symbolSize;
    }
    if (lineCurveness !== undefined) {
      seriesConfig.lineCurveness = lineCurveness;
    }
    if (label !== undefined) {
      seriesConfig.label = label;
    }
    if (labelPosition !== undefined) {
      seriesConfig.labelPosition = labelPosition;
    }
    if (labelAlign !== undefined) {
      seriesConfig.labelAlign = labelAlign;
    }
    if (lineStyle !== undefined) {
      seriesConfig.lineStyle = lineStyle;
    }
    if (itemStyle !== undefined) {
      seriesConfig.itemStyle = itemStyle;
    }

    return {
      ...baseOption,
      series: [seriesConfig],
    };
  }, [
    option,
    treeData,
    layout,
    orient,
    nodeGap,
    nodeWidth,
    initialTreeDepth,
    symbol,
    symbolSize,
    showLine,
    lineCurveness,
    label,
    labelPosition,
    labelAlign,
    lineStyle,
    itemStyle,
  ]);

  return (
    <BaseChartWrapper {...restProps} option={mergedOption as EChartsOption} chartType="tree" />
  );
});

TreeChart.displayName = 'TreeChart';

export default TreeChart;

// 导出类型
export type { TreeChartProps, TreeOption, TreeNode, TreeSeries } from './types';
