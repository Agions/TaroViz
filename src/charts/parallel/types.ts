/**
 * 平行坐标图类型定义
 */

import type { EChartsType, ECElementEvent } from 'echarts';
import type { LoadingOptions } from '../types';

export type ParallelChartProps = {
  option?: ParallelOption;
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
  };
};

export interface ParallelOption {
  title?: unknown;
  legend?: unknown;
  parallel?: unknown;
  parallelAxisDefault?: ParallelAxisItem;
  grid?: unknown;
  tooltip?: unknown;
  series: ParallelSeriesItem[];
  dataset?: unknown;
  color?: string[];
  backgroundColor?: unknown;
  textStyle?: unknown;
  [key: string]: unknown;
}

export interface ParallelAxisSetting {
  left?: number | string;
  right?: number | string;
  top?: number | string;
  bottom?: number | string;
  width?: number | string;
  height?: number | string;
  axisExpandable?: boolean;
  axisExpandCenter?: number;
  axisExpandCount?: number;
  axisExpandWidth?: number;
  z?: number;
}

export interface ParallelAxisItem {
  type?: 'value' | 'category';
  name?: string;
  nameLocation?: 'start' | 'middle' | 'center' | 'end';
  nameTextStyle?: unknown;
  nameGap?: number;
  silent?: boolean;
  data?: unknown[];
  dimension?: number;
  parallelIndex?: number;
}

export interface ParallelSeriesItem {
  type: 'parallel';
  name?: string;
  data?: unknown[];
  lineStyle?: unknown;
  emphasis?: unknown;
  smooth?: boolean | number;
  symbol?: string;
  symbolSize?: number;
  itemStyle?: unknown;
  [key: string]: unknown;
}
