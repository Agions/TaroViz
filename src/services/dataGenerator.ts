import type { EChartsOption, SeriesOption } from 'echarts'

interface DataGeneratorOptions {
  type: string
  count?: number
  min?: number
  max?: number
  categories?: string[]
}

export const dataGenerator = {
  // 生成随机数据
  generateData(options: DataGeneratorOptions): any[] {
    const {
      type,
      count = 7,
      min = 0,
      max = 100,
      categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    } = options

    switch (type) {
      case 'line':
      case 'bar':
        return Array.from({ length: count }, () => ({
          value: Math.floor(Math.random() * (max - min) + min)
        }))

      case 'pie':
        return Array.from({ length: count }, (_, i) => ({
          name: categories[i],
          value: Math.floor(Math.random() * (max - min) + min)
        }))

      case 'scatter':
        return Array.from({ length: count }, () => ({
          value: [
            Math.floor(Math.random() * (max - min) + min),
            Math.floor(Math.random() * (max - min) + min)
          ]
        }))

      case 'radar':
        return Array.from({ length: count }, () => ({
          value: Array.from({ length: 6 }, () =>
            Math.floor(Math.random() * (max - min) + min)
          )
        }))

      default:
        return []
    }
  },

  // 更新图表数据
  updateChartData(option: EChartsOption): EChartsOption {
    const type = option.series?.[0]?.type
    if (!type) return option

    const newData = this.generateData({
      type,
      count: option.xAxis?.[0]?.data?.length || 7,
      categories: option.xAxis?.[0]?.data as string[]
    })

    return {
      ...option,
      series: (option.series! as SeriesOption[]).map((series, index) =>
        index === 0 ? { ...series, data: newData } : series
      )
    }
  }
}
