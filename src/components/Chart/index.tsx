import React, { useRef, useEffect, useState, useCallback } from 'react'
import { View } from '@tarojs/components'
import type { EChartsOption } from 'echarts'
import { getAdapter } from '../ECharts/adapters'
import { registerEvents, dispatchAction } from './eventHandlers'
import { ChartEventListener } from '../ECharts/types/common'
import './index.scss'

// 获取适配器
const EChartsComponent = getAdapter()

interface ChartProps {
  option: EChartsOption
  theme?: string | object
  width?: number | string
  height?: number | string
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
    fontWeight?: number | string
    fontStyle?: string
    fontFamily?: string
  }
  notMerge?: boolean
  lazyUpdate?: boolean
  autoResize?: boolean
  style?: React.CSSProperties
  className?: string
  onInit?: (chart: any) => void
  onRendered?: () => void
  onError?: (e: Error) => void
  onEvents?: ChartEventListener[]
  onlyRenderOnResize?: boolean // 仅在尺寸变化时重新渲染
  showLoading?: boolean // 是否显示加载动画
  showNoDataMask?: boolean // 当无数据时显示遮罩
  noDataText?: string // 无数据时显示的文本
  throttleRender?: number // 渲染节流时间(ms)
  canvasId?: string // 自定义canvas id
  customConfig?: { // 自定义配置
    tooltipFormatter?: (params: any) => string // 提示框格式化函数
    legendFormatter?: (name: string) => string // 图例格式化函数
    axisLabelFormatter?: (value: any, index: number) => string // 轴标签格式化函数
    animationDuration?: number // 动画时长
    colorPalette?: string[] // 自定义颜色
    responsiveGrid?: boolean // 自适应网格
    fontFamily?: string // 全局字体
    symbolSize?: number // 标记大小
    titlePosition?: 'center' | 'left' | 'right' // 标题位置
    tooltipTrigger?: 'item' | 'axis' | 'none' // 提示触发方式
    background?: string // 背景色
    enableDataZoom?: boolean // 启用数据区域缩放
    rotateLongLabels?: boolean // 旋转长标签
    locale?: string // 国际化语言
  }
}

export const Chart: React.FC<ChartProps> = ({
  option,
  theme,
  width = '100%',
  height = '300px',
  loading = false,
  loadingOption,
  notMerge = false,
  lazyUpdate = false,
  autoResize = true,
  style = {},
  className = '',
  onInit,
  onRendered,
  onError,
  onEvents,
  onlyRenderOnResize = false,
  showLoading = false,
  showNoDataMask = true,
  noDataText = '暂无数据',
  throttleRender = 100,
  canvasId,
  customConfig
}) => {
  const chartRef = useRef<any>(null)
  const chartInstanceRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(loading || showLoading)
  const [hasData, setHasData] = useState(true)

  // 应用自定义配置
  const getProcessedOption = useCallback((opt: EChartsOption): EChartsOption => {
    if (!customConfig) return opt

    const newOption: EChartsOption = JSON.parse(JSON.stringify(opt))

    // 应用自定义配置
    if (customConfig.tooltipFormatter && newOption.tooltip) {
      newOption.tooltip.formatter = customConfig.tooltipFormatter
    }

    if (customConfig.legendFormatter && newOption.legend) {
      newOption.legend.formatter = customConfig.legendFormatter
    }

    if (customConfig.axisLabelFormatter) {
      // 应用到x轴
      if (newOption.xAxis) {
        const axisArray = Array.isArray(newOption.xAxis) ? newOption.xAxis : [newOption.xAxis]
        axisArray.forEach(axis => {
          if (axis && axis.axisLabel) {
            axis.axisLabel.formatter = customConfig.axisLabelFormatter
          }
        })
      }
      // 应用到y轴
      if (newOption.yAxis) {
        const axisArray = Array.isArray(newOption.yAxis) ? newOption.yAxis : [newOption.yAxis]
        axisArray.forEach(axis => {
          if (axis && axis.axisLabel) {
            axis.axisLabel.formatter = customConfig.axisLabelFormatter
          }
        })
      }
    }

    // 应用动画时长
    if (customConfig.animationDuration !== undefined) {
      newOption.animationDuration = customConfig.animationDuration
    }

    // 应用自定义颜色
    if (customConfig.colorPalette && Array.isArray(customConfig.colorPalette)) {
      newOption.color = customConfig.colorPalette
    }

    // 应用自适应网格
    if (customConfig.responsiveGrid && newOption.grid) {
      newOption.grid = {
        ...newOption.grid,
        containLabel: true,
        left: '3%',
        right: '4%',
        bottom: '3%'
      }
    }

    // 应用全局字体
    if (customConfig.fontFamily) {
      newOption.textStyle = {
        ...newOption.textStyle,
        fontFamily: customConfig.fontFamily
      }
    }

    // 应用标记大小
    if (customConfig.symbolSize !== undefined && newOption.series) {
      const series = Array.isArray(newOption.series) ? newOption.series : [newOption.series]
      series.forEach(s => {
        if (s && (s.type === 'scatter' || s.type === 'line')) {
          s.symbolSize = customConfig.symbolSize
        }
      })
    }

    // 应用标题位置
    if (customConfig.titlePosition && newOption.title) {
      newOption.title.left = customConfig.titlePosition
    }

    // 应用提示触发方式
    if (customConfig.tooltipTrigger && newOption.tooltip) {
      newOption.tooltip.trigger = customConfig.tooltipTrigger
    }

    // 应用背景色
    if (customConfig.background) {
      newOption.backgroundColor = customConfig.background
    }

    // 应用数据区域缩放
    if (customConfig.enableDataZoom && !newOption.dataZoom) {
      newOption.dataZoom = [
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          start: 0,
          end: 100
        }
      ]
    }

    // 应用长标签旋转
    if (customConfig.rotateLongLabels && newOption.xAxis) {
      const axisArray = Array.isArray(newOption.xAxis) ? newOption.xAxis : [newOption.xAxis]
      axisArray.forEach(axis => {
        if (axis && axis.axisLabel) {
          axis.axisLabel.rotate = 45
        }
      })
    }

    // 应用国际化语言
    if (customConfig.locale) {
      newOption.locale = customConfig.locale
    }

    return newOption
  }, [customConfig])

  // 检查图表是否有数据
  const checkHasData = useCallback((opt: EChartsOption): boolean => {
    if (!opt || !opt.series) return false

    const series = Array.isArray(opt.series) ? opt.series : [opt.series]
    return series.some(s => {
      if (!s || !s.data) return false
      return Array.isArray(s.data) ? s.data.length > 0 : !!s.data
    })
  }, [])

  // 初始化图表
  const handleInit = useCallback((chart: any) => {
    if (!chart) return

    chartInstanceRef.current = chart

    // 应用处理后的配置
    const processedOption = getProcessedOption(option)

    // 检查是否有数据
    const hasDataValue = checkHasData(processedOption)
    setHasData(hasDataValue)

    // 设置配置
    try {
      chart.setOption(processedOption, notMerge, lazyUpdate)

      // 注册事件
      if (onEvents && onEvents.length > 0) {
        registerEvents(chart, onEvents)
      }

      // 设置加载状态
      if (loading || showLoading) {
        chart.showLoading(loadingOption)
      } else {
        chart.hideLoading()
      }

      // 初始化回调
      if (onInit && typeof onInit === 'function') {
        onInit(chart)
      }

      // 渲染完成回调
      if (onRendered && typeof onRendered === 'function') {
        onRendered()
      }
    } catch (e) {
      if (onError && typeof onError === 'function') {
        onError(e as Error)
      } else {
        console.error('图表渲染错误:', e)
      }
    }
  }, [option, notMerge, lazyUpdate, loading, showLoading, loadingOption, onInit, onRendered, onError, onEvents, getProcessedOption, checkHasData])

  // 加载状态变化
  useEffect(() => {
    if (!chartInstanceRef.current) return

    setIsLoading(loading || showLoading)

    if (loading || showLoading) {
      chartInstanceRef.current.showLoading(loadingOption)
    } else {
      chartInstanceRef.current.hideLoading()
    }
  }, [loading, showLoading, loadingOption])

  // 监听配置变化
  useEffect(() => {
    if (!chartInstanceRef.current) return

    // 应用处理后的配置
    const processedOption = getProcessedOption(option)

    // 检查是否有数据
    const hasDataValue = checkHasData(processedOption)
    setHasData(hasDataValue)

    // 设置配置
    chartInstanceRef.current.setOption(processedOption, notMerge, lazyUpdate)
  }, [option, notMerge, lazyUpdate, getProcessedOption, checkHasData])

  return (
    <View
      className={`taroviz-chart-container ${className}`}
      style={{
        width,
        height,
        ...style
      }}
    >
      <EChartsComponent
        ref={chartRef}
        option={option}
        theme={theme}
        width={width}
        height={height}
        onInit={handleInit}
        canvasId={canvasId}
      />

      {isLoading && (
        <View className="taroviz-chart-loading">
          <View className="loading-spinner"></View>
          <View className="loading-text">{loadingOption?.text || '加载中...'}</View>
        </View>
      )}

      {!isLoading && showNoDataMask && !hasData && (
        <View className="taroviz-chart-no-data">
          {noDataText}
        </View>
      )}
    </View>
  )
}
