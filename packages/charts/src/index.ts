/**
 * TaroViz 图表组件集合
 */

// 导出基础图表组件
export { default as LineChart } from './LineChart';
export { default as BarChart } from './BarChart';
export { default as PieChart } from './PieChart';
export { default as ScatterChart } from './ScatterChart';
export { default as RadarChart } from './RadarChart';
export { default as FunnelChart } from './FunnelChart';
export { default as GaugeChart } from './GaugeChart';
export { default as TreeChart } from './TreeChart';
export { default as TreemapChart } from './TreemapChart';
export { default as SunburstChart } from './SunburstChart';
export { default as HeatmapChart } from './HeatmapChart';
export { default as GraphChart } from './GraphChart';

// 导出组合图表组件
export { default as ComboChart } from './ComboChart';
export { default as DashboardChart } from './DashboardChart';

// 导出特殊图表组件
export { default as LiquidFillChart } from './LiquidFillChart';
export { default as WordCloudChart } from './WordCloudChart';

// 导出图表工厂函数
export { createChart } from './factory';

/**
 * 版本信息
 */
export const version = '0.5.0'; 