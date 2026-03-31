/**
 * 平行坐标图类型定义
 */

export type ParallelChartProps = {
  option?: ParallelOption;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  onEvents?: Record<string, (params: any) => void>;
  loading?: boolean;
  loadingOption?: any;
  theme?: string;
  onChartReady?: (chart: any) => void;
  opts?: {
    devicePixelRatio?: number;
    renderer?: 'canvas' | 'svg';
  };
};

export interface ParallelOption {
  title?: any;
  legend?: any;
  parallel?: ParallelAxisSetting;
  parallelAxisDefault?: ParallelAxisItem;
  grid?: any;
  tooltip?: any;
  series: ParallelSeriesItem[];
  dataset?: any;
  color?: string[];
  backgroundColor?: any;
  textStyle?: any;
  [key: string]: any;
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
  nameTextStyle?: any;
  nameGap?: number;
  silent?: boolean;
  data?: any[];
  dimension?: number;
  parallelIndex?: number;
}

export interface ParallelSeriesItem {
  type: 'parallel';
  name?: string;
  data?: any[];
  lineStyle?: any;
  emphasis?: any;
  smooth?: boolean | number;
  symbol?: string;
  symbolSize?: number;
  itemStyle?: any;
}
