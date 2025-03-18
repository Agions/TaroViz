import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Button, Slider } from '@tarojs/components'
import { Chart } from 'taroviz'
import type { EChartsOption } from 'echarts'
import './DynamicDataChart.scss'

// 模拟实时数据源
const createDataPoint = (time = Date.now(), base = 50, variation = 20) => {
  const value = Math.floor(base + Math.random() * variation)
  return { time, value }
}

// 初始数据点数量
const INITIAL_DATA_POINTS = 10
// 最大展示数据点数量
const MAX_DATA_POINTS = 50

const DynamicDataChart = () => {
  const timerRef = useRef<NodeJS.Timeout>()
  const [isRunning, setIsRunning] = useState(false)
  const [dataPoints, setDataPoints] = useState<Array<{ time: number; value: number }>>([])
  const [updateInterval, setUpdateInterval] = useState(1000) // 默认1秒
  const [dataDuration, setDataDuration] = useState(60) // 默认展示60秒的数据

  // 初始化数据
  useEffect(() => {
    const now = Date.now()
    const initialData = Array(INITIAL_DATA_POINTS)
      .fill(0)
      .map((_, i) => {
        const time = now - (INITIAL_DATA_POINTS - i - 1) * 1000
        return createDataPoint(time)
      })
    setDataPoints(initialData)
  }, [])

  // 处理定时更新
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setDataPoints(prevData => {
          const newPoint = createDataPoint()

          // 如果数据超出限制，移除最早的数据点
          const cutTime = newPoint.time - dataDuration * 1000
          const filteredData = prevData.filter(d => d.time > cutTime)

          // 添加新数据点
          const newData = [...filteredData, newPoint]

          // 限制最大数据点数量
          if (newData.length > MAX_DATA_POINTS) {
            return newData.slice(newData.length - MAX_DATA_POINTS)
          }

          return newData
        })
      }, updateInterval)

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
    }
  }, [isRunning, updateInterval, dataDuration])

  // 启动数据更新
  const handleStart = () => {
    setIsRunning(true)
  }

  // 暂停数据更新
  const handlePause = () => {
    setIsRunning(false)
  }

  // 重置数据
  const handleReset = () => {
    setIsRunning(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    const now = Date.now()
    const initialData = Array(INITIAL_DATA_POINTS)
      .fill(0)
      .map((_, i) => {
        const time = now - (INITIAL_DATA_POINTS - i - 1) * 1000
        return createDataPoint(time)
      })
    setDataPoints(initialData)
  }

  // 更新间隔变化
  const handleIntervalChange = (e) => {
    const newInterval = parseInt(e.detail.value)
    setUpdateInterval(newInterval)

    // 如果正在运行，重新启动定时器
    if (isRunning && timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setDataPoints(prevData => {
          const newPoint = createDataPoint()

          // 如果数据超出限制，移除最早的数据点
          const cutTime = newPoint.time - dataDuration * 1000
          const filteredData = prevData.filter(d => d.time > cutTime)

          // 添加新数据点
          const newData = [...filteredData, newPoint]

          // 限制最大数据点数量
          if (newData.length > MAX_DATA_POINTS) {
            return newData.slice(newData.length - MAX_DATA_POINTS)
          }

          return newData
        })
      }, newInterval)
    }
  }

  // 更新数据持续时间
  const handleDurationChange = (e) => {
    setDataDuration(parseInt(e.detail.value))
  }

  // 添加随机波峰
  const handleAddPeak = () => {
    setDataPoints(prevData => {
      const lastPoint = prevData[prevData.length - 1] || { time: Date.now(), value: 50 }
      const peakPoint = {
        time: Date.now(),
        value: Math.floor(lastPoint.value + 30 + Math.random() * 20)
      }

      return [...prevData, peakPoint]
    })
  }

  // 添加随机波谷
  const handleAddValley = () => {
    setDataPoints(prevData => {
      const lastPoint = prevData[prevData.length - 1] || { time: Date.now(), value: 50 }
      const valleyPoint = {
        time: Date.now(),
        value: Math.max(5, Math.floor(lastPoint.value - 30 - Math.random() * 20))
      }

      return [...prevData, valleyPoint]
    })
  }

  // 准备图表数据
  const option: EChartsOption = {
    title: {
      text: '实时数据监控',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const dataPoint = params[0].data
        return `时间: ${new Date(dataPoint[0]).toLocaleTimeString()}<br/>数值: ${dataPoint[1]}`
      },
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      },
      axisLabel: {
        formatter: (value) => {
          const date = new Date(value)
          return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        }
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: true
      }
    },
    series: [
      {
        name: '实时数据',
        type: 'line',
        showSymbol: false,
        data: dataPoints.map(point => [point.time, point.value]),
        lineStyle: {
          width: 2
        },
        areaStyle: {
          opacity: 0.2
        },
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        }
      }
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    visualMap: {
      show: false,
      dimension: 1,
      pieces: [
        {
          lte: 30,
          color: '#ee6666'
        },
        {
          gt: 30,
          lte: 70,
          color: '#91cc75'
        },
        {
          gt: 70,
          color: '#5470c6'
        }
      ]
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      }
    ],
    animationDuration: 300
  }

  return (
    <View className="dynamic-data-chart">
      <Chart
        option={option}
        height={300}
        notMerge={false}
      />

      <View className="control-panel">
        <View className="panel-section">
          <Text className="section-title">数据控制</Text>
          <View className="button-group">
            <Button
              className={`control-button ${isRunning ? 'disabled' : ''}`}
              onClick={handleStart}
              disabled={isRunning}
            >启动</Button>
            <Button
              className={`control-button ${!isRunning ? 'disabled' : ''}`}
              onClick={handlePause}
              disabled={!isRunning}
            >暂停</Button>
            <Button
              className="control-button danger"
              onClick={handleReset}
            >重置</Button>
            <Button
              className="control-button"
              onClick={handleAddPeak}
            >添加峰值</Button>
            <Button
              className="control-button"
              onClick={handleAddValley}
            >添加谷值</Button>
          </View>
        </View>

        <View className="panel-section">
          <Text className="section-title">更新间隔: {updateInterval}ms</Text>
          <Slider
            min={100}
            max={3000}
            step={100}
            blockSize={20}
            activeColor="#1890ff"
            backgroundColor="#e9e9e9"
            value={updateInterval}
            onChange={handleIntervalChange}
          />
        </View>

        <View className="panel-section">
          <Text className="section-title">显示时长: {dataDuration}秒</Text>
          <Slider
            min={10}
            max={120}
            step={5}
            blockSize={20}
            activeColor="#1890ff"
            backgroundColor="#e9e9e9"
            value={dataDuration}
            onChange={handleDurationChange}
          />
        </View>

        <View className="panel-section">
          <Text className="section-title">当前状态</Text>
          <View className="status-info">
            <View className="status-item">
              <Text className="status-label">状态:</Text>
              <Text className={`status-value ${isRunning ? 'running' : 'paused'}`}>
                {isRunning ? '更新中' : '已暂停'}
              </Text>
            </View>
            <View className="status-item">
              <Text className="status-label">数据点:</Text>
              <Text className="status-value">{dataPoints.length}</Text>
            </View>
            <View className="status-item">
              <Text className="status-label">最新值:</Text>
              <Text className="status-value">
                {dataPoints.length > 0 ? dataPoints[dataPoints.length - 1].value : '-'}
              </Text>
            </View>
          </View>
        </View>

        <View className="panel-section">
          <Text className="section-title">使用说明</Text>
          <View className="description">
            <Text>1. 点击"启动"开始实时数据更新</Text>
            <Text>2. 调整更新间隔和显示时长以改变图表行为</Text>
            <Text>3. 使用"添加峰值"和"添加谷值"手动添加异常数据点</Text>
            <Text>4. 图表使用颜色映射来区分不同数据范围</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default DynamicDataChart
