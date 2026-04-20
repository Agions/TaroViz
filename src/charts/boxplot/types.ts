/**
 * 箱线图类型定义
 */
import type { EChartsType, ECElementEvent } from 'echarts';
import type { LoadingOptions } from '../types';

export type BoxplotChartProps = {
  option?: BoxplotOption;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  onEvents?: Record<string, (params: ECElementEvent) => void>;
  loading?: boolean;
  loadingOption?: LoadingOptions;
  theme?: string;
  onChartReady?: (chart: EChartsType) => void;
  opts?: {
    devicePixelRatio?: number;
    renderer?: 'canvas' | 'svg';
    useDirtyRect?: boolean;
  };
};

export interface BoxplotOption {
  title?: unknown;
  legend?: unknown;
  grid?: unknown;
  xAxis?: unknown;
  yAxis?: unknown;
  tooltip?: unknown;
  series: BoxplotSeriesItem[];
  dataset?: unknown;
  color?: string[];
  backgroundColor?: unknown;
  textStyle?: unknown;
  [key: string]: unknown;
}

export interface BoxplotSeriesItem {
  type: 'boxplot';
  name?: string;
  data?: unknown[];
  itemStyle?: unknown;
  emphasis?: unknown;
  dimensions?: string[];
  encode?: Record<string, number | string>;
  [key: string]: unknown;
}
