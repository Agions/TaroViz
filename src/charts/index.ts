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

// 导出类型定义
export * from './types';

/**
 * 版本信息
 */
export const version = '1.1.1';
