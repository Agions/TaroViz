import React, { useState, useRef } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { Chart } from 'taroviz'
import type { EChartsOption } from 'echarts'
import './InteractiveChart.scss'

const InteractiveChart = () => {
  const chartRef = useRef<any>(null)
  const [selectedDataIndex, setSelectedDataIndex] = useState<number | null>(null)
  const [selectedSeriesIndex, setSelectedSeriesIndex] = useState(0)
  const [actionLogs, setActionLogs] = useState<string[]>([])

  // 图表数据
  const data = [
    {
      name: '北京',
      value: [116.46, 39.92, 340],
      itemStyle: { color: '#5470c6' }
    },
    {
      name: '上海',
      value: [121.48, 31.22, 310],
      itemStyle: { color: '#91cc75' }
    },
    {
      name: '广州',
      value: [113.23, 23.16, 270],
      itemStyle: { color: '#fac858' }
    },
    {
      name: '深圳',
      value: [114.07, 22.62, 250],
      itemStyle: { color: '#ee6666' }
    },
    {
      name: '杭州',
      value: [120.21, 30.25, 230],
      itemStyle: { color: '#73c0de' }
    },
    {
      name: '武汉',
      value: [114.31, 30.59, 210],
      itemStyle: { color: '#3ba272' }
    },
    {
      name: '成都',
      value: [104.06, 30.67, 200],
      itemStyle: { color: '#fc8452' }
    },
    {
      name: '西安',
      value: [108.95, 34.27, 180],
      itemStyle: { color: '#9a60b4' }
    }
  ]

  // 添加操作日志
  const addLog = (message: string) => {
    setActionLogs(prev => [message, ...prev.slice(0, 4)])
  }

  // 图表配置
  const option: EChartsOption = {
    title: {
      text: '中国主要城市数据',
      subtext: '点击数据点查看详情',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const { name, value } = params.data
        return `${name}: ${value[2]} 万人`
      }
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'value',
      name: '经度',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: {
        fontSize: 12
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '纬度',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: {
        fontSize: 12
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        type: 'scatter',
        data: data,
        symbolSize: (dataItem) => {
          return dataItem[2] / 10
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        }
      }
    ]
  }

  // 图表实例初始化回调
  const handleInit = (chart) => {
    chartRef.current = chart

    // 添加点击事件
    chart.on('click', (params) => {
      const dataIndex = params.dataIndex
      setSelectedDataIndex(dataIndex)
      addLog(`点击了 ${params.data.name}`)
    })
  }

  // 高亮选中的城市
  const handleHighlight = () => {
    if (chartRef.current && selectedDataIndex !== null) {
      chartRef.current.dispatchAction({
        type: 'highlight',
        seriesIndex: selectedSeriesIndex,
        dataIndex: selectedDataIndex
      })
      addLog(`高亮了 ${data[selectedDataIndex].name}`)
    }
  }

  // 取消高亮
  const handleDownplay = () => {
    if (chartRef.current && selectedDataIndex !== null) {
      chartRef.current.dispatchAction({
        type: 'downplay',
        seriesIndex: selectedSeriesIndex,
        dataIndex: selectedDataIndex
      })
      addLog(`取消高亮 ${data[selectedDataIndex].name}`)
    }
  }

  // 显示提示框
  const handleShowTip = () => {
    if (chartRef.current && selectedDataIndex !== null) {
      chartRef.current.dispatchAction({
        type: 'showTip',
        seriesIndex: selectedSeriesIndex,
        dataIndex: selectedDataIndex
      })
      addLog(`显示提示框 ${data[selectedDataIndex].name}`)
    }
  }

  // 隐藏提示框
  const handleHideTip = () => {
    if (chartRef.current) {
      chartRef.current.dispatchAction({
        type: 'hideTip'
      })
      addLog('隐藏提示框')
    }
  }

  // 添加标记点
  const handleAddMarkPoint = () => {
    if (chartRef.current && selectedDataIndex !== null) {
      const cityData = data[selectedDataIndex]

      // 获取当前配置
      const currentOption = chartRef.current.getOption()

      // 确保有 markPoint 配置
      if (!currentOption.series[0].markPoint) {
        currentOption.series[0].markPoint = {
          data: []
        }
      }

      // 添加新的标记点
      currentOption.series[0].markPoint.data.push({
        name: cityData.name,
        coord: [cityData.value[0], cityData.value[1]],
        value: cityData.value[2],
        itemStyle: {
          color: '#1890ff'
        },
        label: {
          formatter: '{b}: {c} 万人'
        }
      })

      // 更新图表
      chartRef.current.setOption(currentOption)

      addLog(`添加标记点 ${cityData.name}`)
    }
  }

  // 清除图表
  const handleClear = () => {
    if (chartRef.current) {
      chartRef.current.clear()
      addLog('清除图表')
    }
  }

  // 重新设置配置
  const handleReset = () => {
    if (chartRef.current) {
      chartRef.current.setOption(option, true)
      addLog('重置图表')
    }
  }

  return (
    <View className="interactive-chart">
      <Chart
        option={option}
        height={300}
        onInit={handleInit}
      />

      <View className="control-panel">
        <View className="panel-section">
          <Text className="section-title">当前选中的城市</Text>
          <Text className="selected-city">
            {selectedDataIndex !== null ? data[selectedDataIndex].name : '未选择'}
          </Text>
        </View>

        <View className="panel-section">
          <Text className="section-title">交互操作</Text>
          <View className="button-group">
            <Button
              className="action-button"
              onClick={handleHighlight}
              disabled={selectedDataIndex === null}
            >高亮</Button>
            <Button
              className="action-button"
              onClick={handleDownplay}
              disabled={selectedDataIndex === null}
            >取消高亮</Button>
            <Button
              className="action-button"
              onClick={handleShowTip}
              disabled={selectedDataIndex === null}
            >显示提示框</Button>
            <Button
              className="action-button"
              onClick={handleHideTip}
            >隐藏提示框</Button>
            <Button
              className="action-button"
              onClick={handleAddMarkPoint}
              disabled={selectedDataIndex === null}
            >添加标记点</Button>
            <Button
              className="action-button"
              onClick={handleClear}
            >清除图表</Button>
            <Button
              className="action-button"
              onClick={handleReset}
            >重置图表</Button>
          </View>
        </View>

        <View className="panel-section">
          <Text className="section-title">操作日志</Text>
          <View className="logs">
            {actionLogs.map((log, index) => (
              <View key={index} className="log-item">
                {log}
              </View>
            ))}
          </View>
        </View>

        <View className="panel-section">
          <Text className="section-title">使用说明</Text>
          <View className="description">
            <Text>1. 点击图表上的数据点选择城市</Text>
            <Text>2. 使用交互按钮触发图表动作</Text>
            <Text>3. 查看操作日志了解图表交互过程</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default InteractiveChart
