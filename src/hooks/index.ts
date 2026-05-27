/**
 * TaroViz React Hooks
 * 此文件为纯 re-export 入口，各 Hook 实现在独立文件中。
 */

// Types
export type {
  ChartConfig,
  DataTransformer,
  Breakpoint,
  BreakpointConfig,
  ThemeChangeCallback,
  ChartInstance,
  EventHandler,
  LoadingOptions,
} from './types';

// Core hooks
export { useChart } from './useChartInit';
export {
  useOption,
  useEvents,
  useLoading,
  useResponsive,
  useFullscreen,
  useExport,
  useChartTools,
} from './useChartOptions';
export { useResize } from './useChartAutoResize';
export { useChartTheme, useThemeSwitcher } from './useChartTheme';
export { useDataPolling } from './useChartPerformance';
export {
  useChartData,
  useDataTransform,
  useTableTransform,
  useTimeSeriesTransform,
  useTransform,
} from './useDataTransform';

// v1.7.0 hooks
export {
  useChartConnect,
  type UseChartConnectOptions,
  type UseChartConnectReturn,
  type ConnectEventType,
} from './useChartConnect';
export {
  useChartDownload,
  type UseChartDownloadOptions,
  type UseChartDownloadReturn,
  type DownloadFormat,
  type DownloadImageOptions,
  type DownloadDataOptions,
} from './useChartDownload';
export {
  generateFilename,
  downloadBlob,
  downloadDataUrl,
  csvToBlob,
  jsonToBlob,
  convertToCSV,
  convertToJSON,
  createPdfFromImage,
} from './utils/chartDownloadUtils';
export type {
  DataItem,
  DataSource,
  AggregationType,
  TimePeriod,
  TransformMapping,
} from './utils/dataTransformUtils';
export {
  transformLineOrBar,
  transformPie,
  transformScatter,
  transformRadar,
  transformHeatmap,
  groupByTime,
  aggregateValues,
} from './utils/dataTransformUtils';
export {
  useChartHistory,
  type UseChartHistoryOptions,
  type UseChartHistoryReturn,
} from './useChartHistory';
export {
  useChartSelection,
  type UseChartSelectionOptions,
  type UseChartSelectionReturn,
  type DataPointKey,
  type SelectionMode,
  type SelectionEvent,
} from './useChartSelection';

// Version
export { VERSION as version } from '../core/version';

// Default export for backward compatibility
import { useChart } from './useChartInit';
import {
  useOption,
  useEvents,
  useLoading,
  useResponsive,
  useFullscreen,
  useExport,
  useChartTools,
} from './useChartOptions';
import { useResize } from './useChartAutoResize';
import { useChartTheme, useThemeSwitcher } from './useChartTheme';
import { useDataPolling } from './useChartPerformance';
import { useChartConnect } from './useChartConnect';
import { useChartDownload } from './useChartDownload';
import { useChartHistory } from './useChartHistory';
import { useChartSelection } from './useChartSelection';

export default {
  useChart,
  useOption,
  useResize,
  useEvents,
  useLoading,
  useChartTheme,
  useResponsive,
  useThemeSwitcher,
  useDataPolling,
  useFullscreen,
  useExport,
  useChartTools,
  useChartConnect,
  useChartDownload,
  useChartHistory,
  useChartSelection,
};
