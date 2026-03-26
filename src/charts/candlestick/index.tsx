/**
 * K线图/股票图组件
 * 用于展示股票、外汇等金融数据的开盘、收盘、最高、最低价格
 */
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { CandlestickChartProps } from '../types';

/**
 * K线图组件
 */
const CandlestickChart: React.FC<CandlestickChartProps> = (props) => (
  <BaseChartWrapper {...props} chartType="candlestick-chart" />
);

export default CandlestickChart;
