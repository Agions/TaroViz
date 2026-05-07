/**
 * TaroViz 图表组件集合
 * 使用工厂函数消除重复代码
 */

import { createChartComponent, createChartComponentWithOptionCast } from './createChartComponent';
import type {
  LineChartProps,
  BarChartProps,
  PieChartProps,
  ScatterChartProps,
  RadarChartProps,
  FunnelChartProps,
  GaugeChartProps,
  HeatmapChartProps,
  SunburstChartProps,
  TreeMapChartProps,
  SankeyChartProps,
  GraphChartProps,
  WordCloudChartProps,
  CandlestickChartProps,
} from './types';
import type { BoxplotChartProps } from './boxplot/types';
import type { ParallelChartProps } from './parallel/types';

// ===== 标准图表（用工厂函数创建）=====

/** 基础图表 */
export const LineChart = createChartComponent<LineChartProps>('LineChart', 'line-chart');
export const BarChart = createChartComponent<BarChartProps>('BarChart', 'bar-chart');
export const PieChart = createChartComponent<PieChartProps>('PieChart', 'pie-chart');
export const ScatterChart = createChartComponent<ScatterChartProps>(
  'ScatterChart',
  'scatter-chart'
);
export const RadarChart = createChartComponent<RadarChartProps>('RadarChart', 'radar-chart');
export const HeatmapChart = createChartComponent<HeatmapChartProps>(
  'HeatmapChart',
  'heatmap-chart'
);
export const GaugeChart = createChartComponent<GaugeChartProps>('GaugeChart', 'gauge-chart');
export const FunnelChart = createChartComponent<FunnelChartProps>('FunnelChart', 'funnel-chart');

/** 扩展图表 */
export const TreeMapChart = createChartComponent<TreeMapChartProps>(
  'TreeMapChart',
  'treemap-chart'
);
export const SunburstChart = createChartComponent<SunburstChartProps>(
  'SunburstChart',
  'sunburst-chart'
);
export const SankeyChart = createChartComponent<SankeyChartProps>('SankeyChart', 'sankey-chart');
export const GraphChart = createChartComponent<GraphChartProps>('GraphChart', 'graph-chart');
export const WordCloudChart = createChartComponent<WordCloudChartProps>(
  'WordCloudChart',
  'wordcloud-chart'
);
export const CandlestickChart = createChartComponent<CandlestickChartProps>(
  'CandlestickChart',
  'candlestick-chart'
);

/** 需要 option 类型转换的图表 */
export const BoxplotChart = createChartComponentWithOptionCast<BoxplotChartProps>(
  'BoxplotChart',
  'boxplot'
);
export const ParallelChart = createChartComponentWithOptionCast<ParallelChartProps>(
  'ParallelChart',
  'parallel'
);

// ===== 特殊图表（保留自定义逻辑）=====

export { default as LiquidChart } from './liquid';
export { default as TreeChart } from './tree';

// ===== 导出类型 =====

export * from './types';
export type { BoxplotChartProps, BoxplotOption, BoxplotSeriesItem } from './boxplot/types';
export type { ParallelChartProps, ParallelOption, ParallelAxisSetting } from './parallel/types';
export type {
  _LiquidChartProps,
  LiquidOption,
  LiquidShape,
  LiquidSeries,
  LiquidSeriesDataItem,
} from './liquid/types';
export type { _TreeChartProps, TreeOption, TreeNode, TreeSeries } from './tree/types';

/** 版本信息 */
export { VERSION as version } from '../core/version';
