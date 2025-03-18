import React from 'react';

export interface EChartsProps {
  option: any;
  style?: React.CSSProperties;
  className?: string;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  theme?: string | object;
  onEvents?: Record<string, Function>;
}

export const ECharts: React.FC<EChartsProps>;

export default ECharts;
