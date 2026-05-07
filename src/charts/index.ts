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

// ===== 特殊图表（自定义实现）=====

/** 热力图 - 使用自定义实现 */
export { default as HeatmapChart } from './heatmap';

/** 平行坐标图 - 使用自定义实现 */
export { default as ParallelChart } from './parallel';

/** 箱线图 - 使用自定义实现 */
export { default as BoxplotChart } from './boxplot';

/** 树图 - 使用自定义实现 */
export { default as TreeChart } from './tree';

/** 雷达图 - 使用自定义实现 */
export { default as RadarChartCustom } from './radar';

// ===== 类型导出 =====

export type {
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
  BoxplotChartProps,
  ParallelChartProps,
} from './types';
