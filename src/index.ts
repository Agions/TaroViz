/**
 * TaroViz - 基于 Taro 和 ECharts 的多端图表组件库
 * @version 0.5.0
 */

// 命名导出各个子包
import * as CoreAPI from '@agions/core';
import * as AdaptersAPI from '@agions/adapters';
import * as ChartsAPI from '@agions/charts';
import * as ThemesAPI from '@agions/themes';
import * as DataAPI from '@agions/data';
import * as HooksAPI from '@agions/hooks';

// 导入hooks库，用于具名导出
import HooksDefault from '@agions/hooks';

// 便于使用的关键API导出
export { BaseChart } from '@agions/core';
export { getAdapter } from '@agions/adapters';
export { LineChart, BarChart, PieChart, RadarChart } from '@agions/charts';

// 导出所有Hooks，确保能够直接使用
export const { 
  useChart, 
  useOption,
  useResize,
  useEvents,
  useLoading,
  useChartTheme,
  useChartData
} = HooksDefault;

// 命名空间导出
export const Core = CoreAPI;
export const Adapters = AdaptersAPI;
export const Charts = ChartsAPI;
export const Themes = ThemesAPI;
export const Data = DataAPI;
export const Hooks = HooksAPI;

// 默认导出完整的API
export default {
  Core: CoreAPI,
  Adapters: AdaptersAPI,
  Charts: ChartsAPI,
  Themes: ThemesAPI,
  Data: DataAPI,
  Hooks: HooksAPI
}; 