/**
 * 箱线图类型定义
 */

export type BoxplotChartProps = {
  option?: BoxplotOption;
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
    useDirtyRect?: boolean;
  };
};

export interface BoxplotOption {
  title?: any;
  legend?: any;
  grid?: any;
  xAxis?: any;
  yAxis?: any;
  tooltip?: any;
  series: BoxplotSeriesItem[];
  dataset?: any;
  color?: string[];
  backgroundColor?: any;
  textStyle?: any;
  [key: string]: any;
}

export interface BoxplotSeriesItem {
  type: 'boxplot';
  name?: string;
  data?: any[];
  itemStyle?: any;
  emphasis?: any;
  dimensions?: string[];
  encode?: any;
}
