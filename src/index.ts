/**
 * Taro ECharts 组件
 *
 * 这是一个多端兼容的 ECharts 组件，支持以下平台：
 * - H5
 * - 微信小程序
 * - 支付宝小程序
 * - React Native
 * - 鸿蒙OS
 *
 * 使用方法：
 * ```tsx
 * import ECharts from 'tarojs-echarts';
 *
 * // 在组件中使用
 * <ECharts
 *   option={option}
 *   width="100%"
 *   height="300px"
 *   theme="light"
 *   onChartReady={(chart) => {}}
 * />
 * ```
 */

import Taro from '@tarojs/taro';
import React from 'react';

declare const TARO_ENV: 'weapp' | 'alipay' | 'h5' | 'harmony';

let ECharts;

if (process.env.TARO_ENV === 'weapp') {
  ECharts = require('./components/ECharts/weapp').default;
} else if (process.env.TARO_ENV === 'alipay') {
  ECharts = require('./components/ECharts/alipay').default;
} else if (process.env.TARO_ENV === 'harmony') {
  ECharts = require('./components/ECharts/harmony').default;
} else {
  ECharts = require('./components/ECharts/h5').default;
}

export default ECharts;

// 导出工具函数
export * from './components/ECharts/utils';

// 导出类型定义
export * from './components/ECharts/types/common';
// 选择性导出平台类型，避免冲突
export type {
  Adapter,
  AdapterOptions,
  H5AdapterOptions,
  WeappAdapterOptions,
  AlipayAdapterOptions,
  HarmonyAdapterOptions,
  MiniAppAdapterOptions
} from './components/ECharts/types/platform';
export * from './components/ECharts/types/events';

// 导出基础组件
export { Chart } from './components/Chart';
export type { ChartInstance } from './components/Chart/index';

// 导出联动功能
export { 
  createLinkage, 
  getLinkage, 
  removeLinkage,
  getAllLinkages
} from './linkage';
export { withLinkage } from './linkage/withLinkage';
export type { 
  LinkageOptions, 
  LinkageInstance, 
  LinkageEvent, 
  ChartLinkConfig,
  ChartLinkageProps 
} from './linkage/types';

// 导出下钻功能
export { 
  createDrillDown,
  DrillDownManager
} from './drilldown';
export type {
  DrillHistoryItem,
  DrillDownOptions,
  DrillSliceOptions
} from './drilldown';

// 导出数据导出功能
export {
  exportChart,
  exportCSV
} from './export';
export type { ExportOptions } from './export';

// 导出性能优化功能
export { 
  optimizeChartOption 
} from './optimization/largeDataHandler';
export type { DataProcessingOptions } from './optimization/largeDataHandler';

// 导出布局系统
export {
  configResponsive,
  addResponsiveRule,
  clearResponsiveRules,
  applyResponsiveRules,
  autoResponsiveLayout
} from './layout/responsiveLayout';
export type {
  BreakPoint,
  ResponsiveRule
} from './layout/responsiveLayout';

// 导出主题配置
export { configTheme, getTheme } from './themes';

// 导出适配器
export { getAdapter } from './components/ECharts/adapters';

// 导出专用图表组件
import { withLinkage } from './linkage/withLinkage';
import { Chart } from './components/Chart';

// 创建不同类型的图表组件
export const LineChart = withLinkage(Chart) as any;
export const BarChart = withLinkage(Chart) as any;
export const PieChart = withLinkage(Chart) as any;
export const ScatterChart = withLinkage(Chart) as any;
export const RadarChart = withLinkage(Chart) as any;
export const MapChart = withLinkage(Chart) as any;
export const TreeChart = withLinkage(Chart) as any;
export const TreemapChart = withLinkage(Chart) as any;
export const SunburstChart = withLinkage(Chart) as any;
export const GaugeChart = withLinkage(Chart) as any;
export const FunnelChart = withLinkage(Chart) as any;
export const HeatmapChart = withLinkage(Chart) as any;
export const BoxplotChart = withLinkage(Chart) as any;
export const CandlestickChart = withLinkage(Chart) as any;
export const SankeyChart = withLinkage(Chart) as any;
export const GraphChart = withLinkage(Chart) as any;
export const LiquidChart = withLinkage(Chart) as any;
export const WordCloudChart = withLinkage(Chart) as any;
export const ParallelChart = withLinkage(Chart) as any;
export const ThemeRiverChart = withLinkage(Chart) as any;

// 导出工具函数
export * from './utils/uuid';

// 版本信息
export const VERSION = '0.4.0';
