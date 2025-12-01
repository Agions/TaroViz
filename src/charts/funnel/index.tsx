/**
 * 漏斗图组件
 */
import { FunnelChart as FunnelChartComponent } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { FunnelChartProps } from '../types';

// 注册必要的组件
echarts.use([
  FunnelChartComponent,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
]);

/**
 * 漏斗图组件
 */
const FunnelChart: React.FC<FunnelChartProps> = props => (
  <BaseChartWrapper {...props} chartType="funnel-chart" />
);

export default FunnelChart;
