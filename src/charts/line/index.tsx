/**
 * 折线图组件
 */
import { LineChart as LineChartComponent } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { LineChartProps } from '../types';

// 注册必要的组件
echarts.use([LineChartComponent, GridComponent, TooltipComponent, TitleComponent, LegendComponent]);

/**
 * 折线图组件
 */
const LineChart: React.FC<LineChartProps> = props => (
  <BaseChartWrapper {...props} chartType="line-chart" />
);

export default LineChart;
