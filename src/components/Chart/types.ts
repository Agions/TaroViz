import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'

export interface ChartProps {
  option: EChartsOption
  className?: string
  style?: React.CSSProperties
  onInit?: (chart: echarts.ECharts) => void
  onResize?: (chart: echarts.ECharts) => void
  loading?: boolean
  loadingOption?: {
    text?: string
    color?: string
    textColor?: string
    maskColor?: string
    zlevel?: number
    fontSize?: number
    showSpinner?: boolean
    spinnerRadius?: number
    lineWidth?: number
    fontWeight?: string
    fontStyle?: string
    fontFamily?: string
  }
  dataZoom?: boolean
  maxDataPoints?: number
  [key: string]: any
}
