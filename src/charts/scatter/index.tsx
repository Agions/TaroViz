/**
 * 散点图组件
 */
import { ScatterChart as ScatterChartComponent } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { ScatterChartProps } from '../types';

// 注册必要的组件
echarts.use([
  ScatterChartComponent,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
]);

/**
 * 散点图组件
 */
const ScatterChart: React.FC<ScatterChartProps> = props => (
  <BaseChartWrapper {...props} chartType="scatter-chart" />
);

export default ScatterChart;
