import { ChartEventType, ChartEventListener } from '../ECharts/types/common'

/**
 * 为图表添加事件监听
 * @param chart 图表实例
 * @param listeners 事件监听器数组
 */
export const registerEvents = (chart: any, listeners: ChartEventListener[]) => {
  if (!chart || !chart.on || !listeners || !Array.isArray(listeners)) {
    return
  }

  // 注册事件
  listeners.forEach(({ eventType, handler }) => {
    if (typeof handler === 'function') {
      chart.on(eventType, handler)
    }
  })

  // 返回解绑函数
  return () => {
    listeners.forEach(({ eventType, handler }) => {
      if (typeof handler === 'function') {
        chart.off(eventType, handler)
      }
    })
  }
}

/**
 * 触发图表事件
 * @param chart 图表实例
 * @param action 事件行为对象
 */
export const dispatchAction = (chart: any, action: any) => {
  if (!chart || !chart.dispatchAction || !action) {
    return
  }

  chart.dispatchAction(action)
}

/**
 * 创建图表缩放事件
 * @param chart 图表实例
 * @param opts 缩放选项
 */
export const zoomAction = (
  chart: any,
  opts: {
    seriesIndex?: number
    dataZoomIndex?: number
    start?: number
    end?: number
    startValue?: number | string
    endValue?: number | string
  }
) => {
  if (!chart) return

  dispatchAction(chart, {
    type: 'dataZoom',
    ...opts
  })
}

/**
 * 创建图表高亮事件
 * @param chart 图表实例
 * @param opts 高亮选项
 */
export const highlightAction = (
  chart: any,
  opts: {
    seriesIndex?: number
    seriesName?: string
    dataIndex?: number
    name?: string
  }
) => {
  if (!chart) return

  dispatchAction(chart, {
    type: 'highlight',
    ...opts
  })
}

/**
 * 创建图表取消高亮事件
 * @param chart 图表实例
 * @param opts 取消高亮选项
 */
export const downplayAction = (
  chart: any,
  opts: {
    seriesIndex?: number
    seriesName?: string
    dataIndex?: number
    name?: string
  }
) => {
  if (!chart) return

  dispatchAction(chart, {
    type: 'downplay',
    ...opts
  })
}

/**
 * 创建图表提示框显示事件
 * @param chart 图表实例
 * @param opts 提示框选项
 */
export const showTipAction = (
  chart: any,
  opts: {
    seriesIndex?: number
    dataIndex?: number
    name?: string
    x?: number | string
    y?: number | string
    position?: [number, number] | 'inside' | 'top' | 'left' | 'right' | 'bottom'
  }
) => {
  if (!chart) return

  dispatchAction(chart, {
    type: 'showTip',
    ...opts
  })
}

/**
 * 创建图表提示框隐藏事件
 * @param chart 图表实例
 */
export const hideTipAction = (chart: any) => {
  if (!chart) return

  dispatchAction(chart, {
    type: 'hideTip'
  })
}

/**
 * 创建图表动态添加图表标记点
 * @param chart 图表实例
 * @param opts 标记点选项
 */
export const addMarkPointAction = (
  chart: any,
  opts: {
    seriesIndex: number
    data: any[]
  }
) => {
  if (!chart || !chart.getModel) return

  const seriesModel = chart.getModel().getSeriesByIndex(opts.seriesIndex)
  if (!seriesModel) return

  const markPointComp = seriesModel.getModel().getComponent('markPoint')
  if (!markPointComp) {
    // 如果没有markPoint组件，更新option添加
    const option = chart.getOption()
    option.series[opts.seriesIndex].markPoint = {
      data: opts.data
    }
    chart.setOption(option)
  } else {
    // 如果已存在markPoint组件，添加新的数据点
    const option = chart.getOption()
    const markPointData = option.series[opts.seriesIndex].markPoint?.data || []
    option.series[opts.seriesIndex].markPoint = {
      data: [...markPointData, ...opts.data]
    }
    chart.setOption(option)
  }
}

/**
 * 创建图表动态添加图表标记线
 * @param chart 图表实例
 * @param opts 标记线选项
 */
export const addMarkLineAction = (
  chart: any,
  opts: {
    seriesIndex: number
    data: any[]
  }
) => {
  if (!chart || !chart.getModel) return

  const seriesModel = chart.getModel().getSeriesByIndex(opts.seriesIndex)
  if (!seriesModel) return

  const markLineComp = seriesModel.getModel().getComponent('markLine')
  if (!markLineComp) {
    // 如果没有markLine组件，更新option添加
    const option = chart.getOption()
    option.series[opts.seriesIndex].markLine = {
      data: opts.data
    }
    chart.setOption(option)
  } else {
    // 如果已存在markLine组件，添加新的数据点
    const option = chart.getOption()
    const markLineData = option.series[opts.seriesIndex].markLine?.data || []
    option.series[opts.seriesIndex].markLine = {
      data: [...markLineData, ...opts.data]
    }
    chart.setOption(option)
  }
}

/**
 * 创建图表刷选区域事件
 * @param chart 图表实例
 * @param opts 刷选选项
 */
export const brushAction = (
  chart: any,
  opts: {
    brushType: 'rect' | 'polygon' | 'lineX' | 'lineY'
    areas?: any[]
  }
) => {
  if (!chart) return

  dispatchAction(chart, {
    type: 'brush',
    ...opts
  })
}

/**
 * 创建切换图例状态事件
 * @param chart 图表实例
 * @param opts 图例选项
 */
export const legendToggleAction = (
  chart: any,
  opts: {
    name: string
  }
) => {
  if (!chart) return

  dispatchAction(chart, {
    type: 'legendToggleSelect',
    ...opts
  })
}

/**
 * 创建地图缩放事件
 * @param chart 图表实例
 * @param opts 地图缩放选项
 */
export const geoZoomAction = (
  chart: any,
  opts: {
    zoom: number
    center: [number, number]
  }
) => {
  if (!chart) return

  dispatchAction(chart, {
    type: 'geoRoam',
    ...opts
  })
}

/**
 * 创建轮播图例页面事件
 * @param chart 图表实例
 * @param opts 轮播图例选项
 */
export const pageLegendAction = (
  chart: any,
  opts: {
    pageIndex: number
  }
) => {
  if (!chart) return

  dispatchAction(chart, {
    type: 'legendScroll',
    ...opts
  })
}

/**
 * 创建还原图表事件
 * @param chart 图表实例
 */
export const restoreAction = (chart: any) => {
  if (!chart) return

  dispatchAction(chart, {
    type: 'restore'
  })
}
