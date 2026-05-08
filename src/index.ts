/**
 * TaroViz - 基于 Taro 和 ECharts 的多端图表组件库
 * @version 1.7.0
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

// 图表组件（统一从 charts/index.ts 导入）
export {
  // 基础图表
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  RadarChart,
  HeatmapChart,
  FunnelChart,
  // 扩展图表
  TreeMapChart,
  SunburstChart,
  SankeyChart,
  GraphChart,
  WordCloudChart,
  // 特殊图表
  BoxplotChart,
  ParallelChart,
  LiquidChart,
  TreeChart,
  // 版本信息
  version,
  // 类型
  type BaseChartProps,
  type LineChartProps,
  type BarChartProps,
  type PieChartProps,
  type ScatterChartProps,
  type RadarChartProps,
  type FunnelChartProps,
  type HeatmapChartProps,
  type SunburstChartProps,
  type TreeMapChartProps,
  type SankeyChartProps,
  type GraphChartProps,
  type WordCloudChartProps,
  type BoxplotChartProps,
  type ParallelChartProps,
  type LiquidChartProps,
  type TreeChartProps,
} from './charts';

// v1.7.0 新增组件
export {
  DataFilter,
  type DataFilterProps,
  type FilterField,
  type FilterValues,
} from './components/DataFilter';
export {
  createDrillDown,
  type DrillDownConfig,
  type DrillDownSource,
  type DrillDownReturn,
  type DrillDownEventParams,
  type DrillUpEventParams,
} from './core/utils/drillDown';

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
  
  useChartConnect,
  useChartDownload,
} from './hooks';

/**
 * 库信息
 */
export const name = 'taroviz';
