import type { EChartsOption } from 'echarts'
import type { EChartsLoadingOption } from 'echarts'

export interface ChartProps {
  option: EChartsOption
  className?: string
  style?: React.CSSProperties
  onInit?: (chart: echarts.ECharts) => void
  onResize?: (chart: echarts.ECharts) => void
  loading?: boolean
  loadingOption?: EChartsLoadingOption
  dataZoom?: boolean
  maxDataPoints?: number
  [key: string]: any
}
