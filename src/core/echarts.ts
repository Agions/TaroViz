/**
 * ECharts 组件注册中心
 * 统一管理所有图表组件的注册，避免重复注册
 */
import * as echarts from 'echarts/core';

// 图表类型
import { PieChart } from 'echarts/charts';
import { LineChart } from 'echarts/charts';
import { BarChart } from 'echarts/charts';
import { GaugeChart } from 'echarts/charts';
import { ScatterChart } from 'echarts/charts';
import { RadarChart } from 'echarts/charts';
import { HeatmapChart } from 'echarts/charts';
import { FunnelChart } from 'echarts/charts';

// 组件
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  VisualMapComponent,
} from 'echarts/components';

// 渲染器
import { CanvasRenderer } from 'echarts/renderers';

// 注册渲染器
echarts.use(CanvasRenderer);

// 注册所有图表类型
const chartTypes = [
  PieChart,
  LineChart,
  BarChart,
  GaugeChart,
  ScatterChart,
  RadarChart,
  HeatmapChart,
  FunnelChart,
];

// 注册所有组件
const components = [
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  VisualMapComponent,
];

// 统一注册
echarts.use([...chartTypes, ...components]);

export default echarts;
