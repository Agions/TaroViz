import * as echarts from 'echarts/core'
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  RadarChart,
  MapChart,
  GaugeChart,
  HeatmapChart,
  TreeChart,
  TreemapChart,
  SunburstChart,
  GraphChart,
  BoxplotChart,
  CandlestickChart,
  FunnelChart,
  SankeyChart,
  ParallelChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  DatasetComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  PolarComponent,
  GeoComponent,
  SingleAxisComponent,
  ParallelComponent as ParallelCoordComponent,
  CalendarComponent,
  GraphicComponent,
  AriaComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 注册必要的组件
echarts.use([
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  RadarChart,
  MapChart,
  GaugeChart,
  HeatmapChart,
  TreeChart,
  TreemapChart,
  SunburstChart,
  GraphChart,
  BoxplotChart,
  CandlestickChart,
  FunnelChart,
  SankeyChart,
  ParallelChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  DatasetComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  PolarComponent,
  GeoComponent,
  SingleAxisComponent,
  ParallelCoordComponent,
  CalendarComponent,
  GraphicComponent,
  AriaComponent,
  CanvasRenderer
])

interface ChartInitOptions {
  canvas: any
  ctx: any
  width: number
  height: number
  devicePixelRatio: number
  renderer?: 'canvas' | 'svg'
  theme?: string
}

export const getChartInstance = (options: ChartInitOptions) => {
  const { canvas, ctx, width, height, devicePixelRatio, renderer = 'canvas' as const, theme } = options

  // 初始化ECharts实例
  const chartInstance = echarts.init(canvas, theme, {
    renderer,
    width,
    height,
    devicePixelRatio,
    useCoarsePointer: true,
    pointerSize: 20
  });

  // 设置canvas上下文
  (chartInstance.getZr().painter as any).ctx = ctx

  return chartInstance
}

// 存储图表实例的缓存
const chartInstancesCache = new Map<string, any>()

// 获取或创建图表实例
export const getOrCreateChartInstance = (id: string, options: ChartInitOptions) => {
  if (chartInstancesCache.has(id)) {
    return chartInstancesCache.get(id)
  }

  const instance = getChartInstance(options)
  chartInstancesCache.set(id, instance)
  return instance
}

// 清除图表实例
export const disposeChartInstance = (id: string) => {
  if (chartInstancesCache.has(id)) {
    const instance = chartInstancesCache.get(id)
    instance.dispose()
    chartInstancesCache.delete(id)
  }
}

// 清除所有图表实例
export const disposeAllChartInstances = () => {
  chartInstancesCache.forEach((instance) => {
    instance.dispose()
  })
  chartInstancesCache.clear()
}

// 存储所有创建的图表实例，用于管理和清理
export const CHART_INSTANCES: Record<string, echarts.ECharts> = {};
