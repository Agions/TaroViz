/**
 * TaroViz 图表组件集合
 */

// 导出基础图表组件
export { default as LineChart } from './line';
export { default as BarChart } from './bar';
export { default as PieChart } from './pie';
export { default as ScatterChart } from './scatter';
export { default as RadarChart } from './radar';
export { default as HeatmapChart } from './heatmap';
export { default as GaugeChart } from './gauge';
export { default as FunnelChart } from './funnel';

// 导出扩展图表组件
export { default as TreeMapChart } from './treemap';
export { default as SunburstChart } from './sunburst';
export { default as SankeyChart } from './sankey';

// 导出新增图表组件
export { default as GraphChart } from './graph';
export { default as CandlestickChart } from './candlestick';
export { default as WordCloudChart } from './wordcloud';

// 导出 v1.6.0 新增图表组件
export { default as BoxplotChart } from './boxplot';
export { default as ParallelChart } from './parallel';

// 导出类型定义
export * from './types';

/**
 * 版本信息
 */
export const version = '1.6.0';
