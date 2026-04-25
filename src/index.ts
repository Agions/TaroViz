/**
 * TaroViz - 基于 Taro 和 ECharts 的多端图表组件库
 * @version 1.11.1
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

// 扩展图表组件
export { default as TreeMapChart } from './charts/treemap';
export { default as SunburstChart } from './charts/sunburst';
export { default as SankeyChart } from './charts/sankey';

// 新增图表组件
export { default as GraphChart } from './charts/graph';
export { default as CandlestickChart } from './charts/candlestick';
export { default as WordCloudChart } from './charts/wordcloud';

// v1.6.0 新增图表组件
export { default as BoxplotChart } from './charts/boxplot';
export { default as ParallelChart } from './charts/parallel';

// v1.7.0 新增组件
export { DataFilter, type DataFilterProps, type FilterField, type FilterValues } from './components/DataFilter';
export {
  createDrillDown,
  canDrillDown,
  buildHierarchy,
  createRegionDrillDown,
  createCategoryDrillDown,
  type DrillDownConfig,
  type DrillDownSource,
  type DrillDownReturn,
  type DrillDownEventParams,
  type DrillUpEventParams,
} from './core/utils/drillDown';

// v1.7.0 新增图表组件
export { default as LiquidChart } from './charts/liquid';
export { default as TreeChart } from './charts/tree';

// 适配器
export { getAdapter, detectPlatform, getEnv } from './adapters';
export { default as H5Adapter } from './adapters/h5';
export { default as WeappAdapter } from './adapters/weapp';

// 主题系统
export type { BuiltinTheme, ThemeOptions } from './themes';
export {
  defaultTheme,
  darkTheme,
  getTheme,
  registerTheme,
  switchTheme,
  getRegisteredThemes,
  getThemeByName,
  getLightThemes,
  getDarkThemes,
  getThemesByTag,
} from './themes';

// 主题管理器
export {
  themeManager,
  PRESET_THEMES,
  type ThemeConfig,
  type ThemeVariables,
  type PresetThemeName,
} from './core/themes/ThemeManager';

// 编辑器
export { ThemeEditor } from './editor';
export { default as EnhancedThemeEditor } from './editor/EnhancedThemeEditor';
export type { EnhancedThemeEditorProps, ThemeExportOptions } from './editor/EnhancedThemeEditor';

// 错误边界组件
export {
  ErrorBoundary,
  withErrorBoundary,
  type ErrorBoundaryProps,
} from './core/components/ErrorBoundary';

// 懒加载组件
export {
  withLazyLoad,
  preloadChart,
  preloadAllCharts,
  createLazyChart,
  LazyChartRegistry,
} from './core/components/LazyChart';

// 标注系统
export {
  useAnnotation,
  convertAnnotationToMarkLine,
  convertAnnotationToMarkArea,
  convertAnnotationToScatter,
  AnnotationPresets,
  createCompositeAnnotation,
  type AnnotationProps,
  type AnnotationType,
  type MarkLineConfig,
  type MarkAreaConfig,
  type ScatterAnnotationConfig,
} from './core/components/Annotation';

// 导出工具
export {
  exportChart,
  type ExportImageOptions,
  type ExportSVGOptions,
  type ExportPDFOptions,
  type BatchExportOptions,
  type ExportResult,
} from './core/utils/export/ExportUtils';

// Hooks
export {
  useChart,
  useOption,
  useResize,
  useEvents,
  useLoading,
  useChartTheme,
  useChartData,
  useResponsive,
  useThemeSwitcher,
  useDataPolling,
  useFullscreen,
  useExport,
  useChartTools,
  useDataTransform,
  useTableTransform,
  useTimeSeriesTransform,
  // v1.7.0 新增 Hooks
  useDataZoom,
  useChartConnect,
  useChartDownload,
} from './hooks';

/**
 * 库信息
 */
export const name = 'taroviz';
export const version = '1.7.0';
