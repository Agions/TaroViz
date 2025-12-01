/**
 * 饼图组件
 */
import { PieChart as PieChartComponent } from 'echarts/charts';
import { TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import React from 'react';

import BaseChartWrapper from '../common/BaseChartWrapper';
import { BaseChartProps } from '../types';

// 注册必要的组件
echarts.use([PieChartComponent, TooltipComponent, TitleComponent, LegendComponent]);

/**
 * 饼图组件
 */
const PieChart: React.FC<BaseChartProps> = props => (
  <BaseChartWrapper {...props} chartType="pie-chart" />
);

export default PieChart;
