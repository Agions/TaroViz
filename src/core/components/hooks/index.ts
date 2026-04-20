/**
 * TaroViz 图表组件 Hooks
 * 提供图表初始化、事件处理、虚拟滚动、性能监控等能力
 */

export { useChartInit } from './useChartInit';
export type { UseChartInitOptions, UseChartInitResult } from './useChartInit';

export { useChartEvents } from './useChartEvents';
export type {
  ChartEventHandlers,
  ChartLinkageConfig,
  UseChartEventsOptions,
} from './useChartEvents';

export { useVirtualScroll } from './useVirtualScroll';
export type { UseVirtualScrollOptions, VirtualScrollState } from './useVirtualScroll';

export { usePerformance } from './usePerformance';
export type { PerformanceData, UsePerformanceOptions } from './usePerformance';
