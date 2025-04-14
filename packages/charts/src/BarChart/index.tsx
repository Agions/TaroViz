import { BarChart as BarChartComponent } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { BarChartProps } from '../types';

// 注册必要的组件
echarts.use([BarChartComponent, GridComponent, TooltipComponent, TitleComponent, LegendComponent]);

/**
 * 柱状图组件
 */
const BarChart: React.FC<BarChartProps> = (props) => (
  <BaseChartWrapper {...props} chartType="bar-chart" />
);

export default BarChart;
