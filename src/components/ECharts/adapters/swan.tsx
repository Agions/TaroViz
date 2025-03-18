import React, { useEffect, useRef } from 'react'
import { Canvas } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { ECBasicOption } from 'echarts/types/dist/shared'

import { useSize } from '../hooks/useSize'
import { getPixelRatio } from '../utils/common'
import { getChartInstance } from '../utils/chartInstances'
import '../styles/echarts.scss'

interface EChartsProps {
  option: ECBasicOption
  theme?: string | object
  width?: number | string
  height?: number | string
  onInit?: (chart: any) => void
  onRendered?: () => void
  canvasId?: string
  style?: React.CSSProperties
  className?: string
}

const DEFAULT_CANVAS_ID = 'taroviz-swan-canvas'

export const SWANAdapter: React.FC<EChartsProps> = ({
  option,
  theme,
  width = '100%',
  height = '300px',
  onInit,
  onRendered,
  canvasId = DEFAULT_CANVAS_ID,
  style,
  className
}) => {
  const canvasRef = useRef<any>(null)
  const chartRef = useRef<any>(null)
  const { size, containerRef } = useSize()

  useEffect(() => {
    const query = Taro.createSelectorQuery()
    query
      .select(`#${canvasId}`)
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0] || !res[0].node) {
          console.error('百度小程序获取Canvas节点失败')
          return
        }

        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const pixelRatio = getPixelRatio()
        const canvasWidth = res[0].width
        const canvasHeight = res[0].height

        canvas.width = canvasWidth * pixelRatio
        canvas.height = canvasHeight * pixelRatio

        // 注册主题
        if (theme && typeof theme === 'object') {
          const echarts = require('echarts/core')
          echarts.registerTheme('customTheme', theme)
        }

        const chart = getChartInstance({
          canvas,
          ctx,
          width: canvasWidth,
          height: canvasHeight,
          devicePixelRatio: pixelRatio,
          renderer: 'canvas',
          theme: typeof theme === 'object' ? 'customTheme' : theme
        })

        chartRef.current = chart

        if (onInit && typeof onInit === 'function') {
          onInit(chart)
        }

        chart.setOption(option)

        if (onRendered && typeof onRendered === 'function') {
          onRendered()
        }
      })

    return () => {
      if (chartRef.current) {
        chartRef.current.dispose()
        chartRef.current = null
      }
    }
  }, [canvasId, onInit, onRendered, option, theme])

  return (
    <div
      ref={containerRef}
      className={`taroviz-echarts-container ${className || ''}`}
      style={{
        width,
        height,
        ...style
      }}
    >
      <Canvas
        ref={canvasRef}
        type="2d"
        id={canvasId}
        className="taroviz-echarts-canvas"
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  )
}
