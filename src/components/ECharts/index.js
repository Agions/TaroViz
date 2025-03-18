/**
 * 统一导出ECharts组件
 * 根据不同平台导出不同实现
 */
import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  RadarChart,
  GaugeChart,
  TreeChart,
  TreemapChart,
  GraphChart,
  SankeyChart,
  BoxplotChart,
  CandlestickChart,
  HeatmapChart
} from 'echarts/charts'

import {
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  TitleComponent,
  DataZoomComponent,
  VisualMapComponent,
  GeoComponent
} from 'echarts/components'

import { getAdapter } from './adapters'
import { events, CHART_INSTANCES, debounce } from './utils'

// 注册必须的组件
echarts.use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  RadarChart,
  GaugeChart,
  TreeChart,
  TreemapChart,
  GraphChart,
  SankeyChart,
  BoxplotChart,
  CandlestickChart,
  HeatmapChart,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  TooltipComponent,
  TitleComponent,
  DataZoomComponent,
  VisualMapComponent,
  GeoComponent
])

// 获取适配的组件
const EChartsComponent = getAdapter()

export { echarts }
export default EChartsComponent
