/**
 * CandlestickChart组件
 */
import React, { memo } from 'react';
import BaseChartWrapper from '../common/BaseChartWrapper';
import { CandlestickChartProps } from '../types';

const CandlestickChart: React.FC<CandlestickChartProps> = memo((props) => (
  <BaseChartWrapper {...props} chartType="candlestick-chart" />
));
CandlestickChart.displayName = 'CandlestickChart';

export default CandlestickChart;
