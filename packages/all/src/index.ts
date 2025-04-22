/* eslint-disable import/no-unresolved */
/**
 * TaroViz 完整导出包 (@agions/taroviz)
 * 包含所有子包的功能
 *
 * 通过拆分导出方式支持按需加载
 */

// 导出适配器核心功能
export { getAdapter, detectPlatform, version as adaptersVersion } from '@agions/taroviz-adapters';

// 导出核心类型
export { version as coreVersion } from '@agions/taroviz-core';

// 从适配器导出所有适配器
export {
  H5Adapter,
  WeappAdapter,
  AlipayAdapter,
  SwanAdapter,
  HarmonyAdapter,
} from '@agions/taroviz-adapters';

// 导出常用图表组件
export {
  LineChart,
  BarChart,
  PieChart,
  RadarChart,
  ScatterChart,
  HeatmapChart,
  ComboChart,
  FunnelChart,
  GaugeChart,
  TreeChart,
  TreemapChart,
  SunburstChart,
  GraphChart,
  DashboardChart,
  LiquidFillChart,
  WordCloudChart,
} from '@agions/taroviz-charts';

// 导出Hooks功能
export {
  useChart,
  useOption,
  useResize,
  useEvents,
  useLoading,
  useChartTheme,
  useChartData,
} from '@agions/taroviz-hooks';

// 包信息
export const name = '@agions/taroviz';
export const version = '1.1.1';

// 懒加载导入API
export const loadCore = () => import('@agions/taroviz-core');
export const loadAdapters = () => import('@agions/taroviz-adapters');
export const loadCharts = () => import('@agions/taroviz-charts');
export const loadThemes = () => import('@agions/taroviz-themes');
export const loadData = () => import('@agions/taroviz-data');
export const loadHooks = () => import('@agions/taroviz-hooks');
