/**
 * TaroViz Charts 类型定义
 */

// 导出组件
export { default as LineChart } from './src/LineChart';
export { default as BarChart } from './src/BarChart';
export { default as PieChart } from './src/PieChart';
export { default as ScatterChart } from './src/ScatterChart';
export { default as RadarChart } from './src/RadarChart';
export { default as FunnelChart } from './src/FunnelChart';
export { default as GaugeChart } from './src/GaugeChart';
export { default as HeatmapChart } from './src/HeatmapChart';
export { default as TreeChart } from './src/TreeChart';
export { default as SunburstChart } from './src/SunburstChart';
export { default as SankeyChart } from './src/SankeyChart';
export { default as GraphChart } from './src/GraphChart';

// 导出类型
export * from './src/types';

/**
 * 库信息
 */
export const name: string;
export const version: string; 