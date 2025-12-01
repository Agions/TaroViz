/**
 * TaroViz - 基于 Taro 和 ECharts 的多端图表组件库
 * @version 1.1.1
 */

// 核心组件
export type { ChartProps } from './core/components/BaseChart';
export { default as BaseChart } from './core/components/BaseChart';

// 核心类型
export type {
  EChartsType,
  EChartsOption,
  AnimationEasing,
  RendererType,
  ChartEventCallback,
  ChartEventHandlers,
  ThemeType,
  RenderOptimizationConfig,
  Adapter,
  AdapterConfig,
} from './core/types';

// 核心工具函数
export {
  events,
  deepMerge,
  debounce,
  throttle,
  getEnvironment,
  formatNumber,
  getContrastColor,
  uuid,
  shortId,
  prefixedId,
} from './core/utils';

// 图表组件
export { default as LineChart } from './charts/line';
export { default as BarChart } from './charts/bar';
export { default as PieChart } from './charts/pie';
export { default as ScatterChart } from './charts/scatter';
export { default as RadarChart } from './charts/radar';
export { default as HeatmapChart } from './charts/heatmap';
export { default as GaugeChart } from './charts/gauge';
export { default as FunnelChart } from './charts/funnel';

// 适配器
export { getAdapter, detectPlatform, getEnv } from './adapters';
export { default as H5Adapter } from './adapters/h5';
export { default as WeappAdapter } from './adapters/weapp';

// 主题
export type { BuiltinTheme, ThemeOptions } from './themes';
export { defaultTheme, darkTheme, getTheme, registerTheme } from './themes';

// 编辑器
export { ThemeEditor } from './editor';

// Hooks
export {
  useChart,
  useOption,
  useResize,
  useEvents,
  useLoading,
  useChartTheme,
  useChartData,
} from './hooks';

/**
 * 库信息
 */
export const name = 'taroviz';
export const version = '1.1.1';
