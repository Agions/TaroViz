import React, { useState, useEffect } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { Chart } from 'taroviz'
import Taro from '@tarojs/taro'
import type { EChartsOption } from 'echarts'
import './ResponsiveLayout.scss'

// 图表布局类型
enum LayoutType {
  SingleColumn = 'singleColumn',
  TwoColumn = 'twoColumn',
  Dashboard = 'dashboard'
}

// 屏幕尺寸类型
enum ScreenSize {
  Small = 'small',    // < 768px
  Medium = 'medium',  // 768px - 1024px
  Large = 'large'     // > 1024px
}

const ResponsiveLayout = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(ScreenSize.Medium)
  const [layout, setLayout] = useState<LayoutType>(LayoutType.SingleColumn)
  const [systemInfo, setSystemInfo] = useState<any>({})

  // 获取屏幕信息并设置布局
  useEffect(() => {
    const getSystemInfo = async () => {
      try {
        const info = await Taro.getSystemInfo()
        setSystemInfo(info)

        const { windowWidth } = info

        if (windowWidth < 768) {
          setScreenSize(ScreenSize.Small)
          setLayout(LayoutType.SingleColumn)
        } else if (windowWidth < 1024) {
          setScreenSize(ScreenSize.Medium)
          setLayout(LayoutType.TwoColumn)
        } else {
          setScreenSize(ScreenSize.Large)
          setLayout(LayoutType.Dashboard)
        }
      } catch (error) {
        console.error('获取系统信息失败', error)
      }
    }

    getSystemInfo()
  }, [])

  // 监听尺寸变化（Taro环境不支持，这里是为了演示）
  useEffect(() => {
    // 此处在实际应用中可以监听窗口尺寸变化
    // 由于小程序环境限制，这里只做示例
    const handleResize = () => {
      // 实际应用中根据屏幕尺寸变化重新计算布局
      console.log('屏幕尺寸变化')
    }

    // 在真实环境中，会监听窗口尺寸变化
    // window.addEventListener('resize', handleResize)
    // return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 手动切换布局
  const changeLayout = (newLayout: LayoutType) => {
    setLayout(newLayout)
  }

  // 各种图表配置
  // 销售数据图表配置
  const salesChartOption: EChartsOption = {
    title: {
      text: '季度销售统计',
      left: 'center',
      textStyle: {
        fontSize: layout === LayoutType.SingleColumn ? 14 : 16
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['销售额', '利润'],
      top: layout === LayoutType.SingleColumn ? 30 : 'bottom',
      orient: layout === LayoutType.SingleColumn ? 'horizontal' : 'horizontal',
      textStyle: {
        fontSize: layout === LayoutType.SingleColumn ? 12 : 14
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: layout === LayoutType.SingleColumn ? 10 : 30,
      top: layout === LayoutType.SingleColumn ? 70 : 60,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['第一季度', '第二季度', '第三季度', '第四季度'],
      axisLabel: {
        rotate: layout === LayoutType.SingleColumn ? 30 : 0,
        fontSize: layout === LayoutType.SingleColumn ? 10 : 12
      }
    },
    yAxis: {
      type: 'value',
      name: '金额 (万元)',
      nameTextStyle: {
        fontSize: layout === LayoutType.SingleColumn ? 10 : 12
      },
      axisLabel: {
        fontSize: layout === LayoutType.SingleColumn ? 10 : 12
      }
    },
    series: [
      {
        name: '销售额',
        type: 'bar',
        data: [120, 200, 150, 180]
      },
      {
        name: '利润',
        type: 'bar',
        data: [60, 90, 70, 95]
      }
    ]
  }

  // 用户数据图表配置
  const userChartOption: EChartsOption = {
    title: {
      text: '用户增长趋势',
      left: 'center',
      textStyle: {
        fontSize: layout === LayoutType.SingleColumn ? 14 : 16
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['新用户', '活跃用户'],
      top: layout === LayoutType.SingleColumn ? 30 : 'bottom',
      orient: 'horizontal',
      textStyle: {
        fontSize: layout === LayoutType.SingleColumn ? 12 : 14
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: layout === LayoutType.SingleColumn ? 10 : 30,
      top: layout === LayoutType.SingleColumn ? 70 : 60,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLabel: {
        fontSize: layout === LayoutType.SingleColumn ? 10 : 12
      }
    },
    yAxis: {
      type: 'value',
      name: '用户数',
      nameTextStyle: {
        fontSize: layout === LayoutType.SingleColumn ? 10 : 12
      },
      axisLabel: {
        fontSize: layout === LayoutType.SingleColumn ? 10 : 12
      }
    },
    series: [
      {
        name: '新用户',
        type: 'line',
        data: [50, 80, 120, 160, 210, 250],
        smooth: true
      },
      {
        name: '活跃用户',
        type: 'line',
        data: [120, 160, 180, 240, 280, 350],
        smooth: true
      }
    ]
  }

  // 区域分布图表配置
  const regionChartOption: EChartsOption = {
    title: {
      text: '区域销售分布',
      left: 'center',
      textStyle: {
        fontSize: layout === LayoutType.SingleColumn ? 14 : 16
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      top: layout === LayoutType.SingleColumn ? 30 : 'bottom',
      textStyle: {
        fontSize: layout === LayoutType.SingleColumn ? 12 : 14
      }
    },
    series: [
      {
        name: '销售区域',
        type: 'pie',
        radius: layout === LayoutType.SingleColumn ? '50%' : '60%',
        center: ['50%', '50%'],
        data: [
          { value: 335, name: '华东' },
          { value: 310, name: '华北' },
          { value: 234, name: '华南' },
          { value: 135, name: '西部' },
          { value: 148, name: '东北' }
        ],
        label: {
          fontSize: layout === LayoutType.SingleColumn ? 10 : 12
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  // 产品数据图表配置
  const productChartOption: EChartsOption = {
    title: {
      text: '产品销售排行',
      left: 'center',
      textStyle: {
        fontSize: layout === LayoutType.SingleColumn ? 14 : 16
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: layout === LayoutType.SingleColumn ? 10 : 30,
      top: layout === LayoutType.SingleColumn ? 40 : 50,
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        fontSize: layout === LayoutType.SingleColumn ? 10 : 12
      }
    },
    yAxis: {
      type: 'category',
      data: ['产品A', '产品B', '产品C', '产品D', '产品E'],
      axisLabel: {
        fontSize: layout === LayoutType.SingleColumn ? 10 : 12
      }
    },
    series: [
      {
        name: '销售量',
        type: 'bar',
        data: [320, 280, 250, 190, 150]
      }
    ]
  }

  // 获取图表容器样式
  const getChartContainerStyle = () => {
    switch (layout) {
      case LayoutType.SingleColumn:
        return 'single-column'
      case LayoutType.TwoColumn:
        return 'two-column'
      case LayoutType.Dashboard:
        return 'dashboard'
      default:
        return 'single-column'
    }
  }

  // 获取图表高度
  const getChartHeight = () => {
    switch (layout) {
      case LayoutType.SingleColumn:
        return 300
      case LayoutType.TwoColumn:
        return 350
      case LayoutType.Dashboard:
        return 300
      default:
        return 300
    }
  }

  return (
    <View className="responsive-layout">
      <View className="layout-info">
        <Text className="info-title">当前布局信息</Text>
        <View className="info-item">
          <Text className="info-label">屏幕尺寸:</Text>
          <Text className="info-value">{screenSize}</Text>
        </View>
        <View className="info-item">
          <Text className="info-label">屏幕宽度:</Text>
          <Text className="info-value">{systemInfo.windowWidth || '-'} px</Text>
        </View>
        <View className="info-item">
          <Text className="info-label">当前布局:</Text>
          <Text className="info-value">{layout}</Text>
        </View>
      </View>

      <View className="layout-switcher">
        <Text className="switcher-title">手动切换布局</Text>
        <View className="button-group">
          <Button
            className={`layout-button ${layout === LayoutType.SingleColumn ? 'active' : ''}`}
            onClick={() => changeLayout(LayoutType.SingleColumn)}
          >
            单列
          </Button>
          <Button
            className={`layout-button ${layout === LayoutType.TwoColumn ? 'active' : ''}`}
            onClick={() => changeLayout(LayoutType.TwoColumn)}
          >
            双列
          </Button>
          <Button
            className={`layout-button ${layout === LayoutType.Dashboard ? 'active' : ''}`}
            onClick={() => changeLayout(LayoutType.Dashboard)}
          >
            仪表盘
          </Button>
        </View>
      </View>

      <View className={`charts-container ${getChartContainerStyle()}`}>
        <View className="chart-wrapper">
          <Chart
            option={salesChartOption}
            height={getChartHeight()}
          />
        </View>

        <View className="chart-wrapper">
          <Chart
            option={userChartOption}
            height={getChartHeight()}
          />
        </View>

        <View className="chart-wrapper">
          <Chart
            option={regionChartOption}
            height={getChartHeight()}
          />
        </View>

        <View className="chart-wrapper">
          <Chart
            option={productChartOption}
            height={getChartHeight()}
          />
        </View>
      </View>

      <View className="responsive-tips">
        <Text className="tips-title">响应式设计说明</Text>
        <View className="tips-content">
          <Text>1. 单列布局：适用于小屏设备，每个图表单独占据一行</Text>
          <Text>2. 双列布局：适用于中等屏幕，图表以2列网格排列</Text>
          <Text>3. 仪表盘布局：适用于大屏设备，优化图表尺寸和位置</Text>
          <Text>4. 每种布局下，图表的字体大小、间距和图例位置会自动调整</Text>
          <Text>5. 在真实应用中，布局会根据屏幕尺寸自动切换</Text>
        </View>
      </View>
    </View>
  )
}

export default ResponsiveLayout
