import React, { useState } from 'react'
import { View, Button, Picker } from '@tarojs/components'
import { Chart } from 'taroviz'

// 示例数据
const data = {
  categories: ['一月', '二月', '三月', '四月', '五月', '六月'],
  series: [
    {
      name: '销售额',
      data: [5000, 7800, 4090, 6780, 9800, 8908]
    },
    {
      name: '利润',
      data: [2300, 3700, 1900, 3670, 5800, 4560]
    }
  ]
}

// 颜色主题
const colorThemes = {
  default: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
  ocean: ['#1F77B4', '#AEC7E8', '#FF7F0E', '#FFBB78', '#2CA02C'],
  forest: ['#2E8B57', '#3CB371', '#90EE90', '#006400', '#228B22'],
  warm: ['#FF6347', '#FF7F50', '#FFA07A', '#FF4500', '#FF8C00'],
  cool: ['#4682B4', '#B0C4DE', '#ADD8E6', '#87CEEB', '#00BFFF']
}

// 字体设置
const fontOptions = [
  { name: '默认字体', value: '' },
  { name: '黑体', value: 'SimHei, sans-serif' },
  { name: '宋体', value: 'SimSun, serif' },
  { name: '微软雅黑', value: 'Microsoft YaHei, sans-serif' },
  { name: '苹方', value: 'PingFang SC, sans-serif' }
]

const CustomChartConfig = () => {
  // 设置状态
  const [colorTheme, setColorTheme] = useState('default')
  const [fontFamily, setFontFamily] = useState('')
  const [enableDataZoom, setEnableDataZoom] = useState(false)
  const [responsiveGrid, setResponsiveGrid] = useState(true)
  const [rotateLongLabels, setRotateLongLabels] = useState(false)
  const [symbolSize, setSymbolSize] = useState(6)
  const [tooltipTrigger, setTooltipTrigger] = useState<'item' | 'axis'>('axis')
  const [background, setBackground] = useState('')

  // 基础图表配置
  const option = {
    title: {
      text: '自定义配置示例',
      subtext: '展示 TaroViz 自定义配置功能'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: data.series.map(item => item.name)
    },
    xAxis: {
      type: 'category',
      data: data.categories
    },
    yAxis: {
      type: 'value',
      name: '金额 (元)'
    },
    series: data.series.map(item => ({
      name: item.name,
      type: 'line',
      data: item.data
    }))
  }

  // 提示框格式化函数
  const tooltipFormatter = (params) => {
    let res = `<div style="font-weight:bold;margin-bottom:5px;">${params[0].name}</div>`
    params.forEach(param => {
      res += `<div style="display:flex;align-items:center;margin:3px 0;">
        <span style="display:inline-block;width:10px;height:10px;background:${param.color};margin-right:5px;border-radius:50%;"></span>
        <span style="margin-right:10px;">${param.seriesName}:</span>
        <span style="font-weight:bold;">${param.value} 元</span>
      </div>`
    })
    return res
  }

  // 轴标签格式化函数
  const axisLabelFormatter = (value) => {
    if (typeof value === 'number') {
      return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value
    }
    return value
  }

  return (
    <View className="custom-chart-example">
      <View className="control-panel">
        <View className="control-group">
          <View className="group-title">颜色主题</View>
          <View className="color-themes">
            {Object.keys(colorThemes).map(theme => (
              <View
                key={theme}
                className={`color-theme-item ${theme === colorTheme ? 'active' : ''}`}
                onClick={() => setColorTheme(theme)}
              >
                <View className="theme-colors">
                  {colorThemes[theme].slice(0, 3).map((color, index) => (
                    <View key={index} className="color-dot" style={{ backgroundColor: color }} />
                  ))}
                </View>
                <View className="theme-name">{theme}</View>
              </View>
            ))}
          </View>
        </View>

        <View className="control-group">
          <View className="group-title">字体设置</View>
          <Picker
            mode="selector"
            range={fontOptions.map(item => item.name)}
            onChange={(e) => setFontFamily(fontOptions[parseInt(e.detail.value)].value)}
          >
            <View className="picker-value">
              {fontFamily ? fontOptions.find(f => f.value === fontFamily)?.name : '默认字体'}
            </View>
          </Picker>
        </View>

        <View className="control-group">
          <View className="group-title">标记大小</View>
          <View className="symbol-sizes">
            {[4, 6, 8, 10].map(size => (
              <View
                key={size}
                className={`symbol-size-item ${size === symbolSize ? 'active' : ''}`}
                onClick={() => setSymbolSize(size)}
              >
                <View className="symbol-dot" style={{ width: size*2, height: size*2 }} />
                <View className="size-value">{size}px</View>
              </View>
            ))}
          </View>
        </View>

        <View className="control-group switches">
          <Button
            className={`switch-button ${enableDataZoom ? 'active' : ''}`}
            onClick={() => setEnableDataZoom(!enableDataZoom)}
          >
            {enableDataZoom ? '禁用缩放' : '启用缩放'}
          </Button>

          <Button
            className={`switch-button ${responsiveGrid ? 'active' : ''}`}
            onClick={() => setResponsiveGrid(!responsiveGrid)}
          >
            {responsiveGrid ? '固定网格' : '响应式网格'}
          </Button>

          <Button
            className={`switch-button ${rotateLongLabels ? 'active' : ''}`}
            onClick={() => setRotateLongLabels(!rotateLongLabels)}
          >
            {rotateLongLabels ? '水平标签' : '旋转标签'}
          </Button>

          <Button
            className={`switch-button ${tooltipTrigger === 'item' ? 'active' : ''}`}
            onClick={() => setTooltipTrigger(tooltipTrigger === 'axis' ? 'item' : 'axis')}
          >
            提示: {tooltipTrigger === 'axis' ? '坐标轴' : '数据项'}
          </Button>

          <Button
            className={`switch-button ${background ? 'active' : ''}`}
            onClick={() => setBackground(background ? '' : '#f5f7fa')}
          >
            {background ? '默认背景' : '灰色背景'}
          </Button>
        </View>
      </View>

      <Chart
        option={option}
        height={350}
        customConfig={{
          tooltipFormatter,
          axisLabelFormatter,
          colorPalette: colorThemes[colorTheme],
          fontFamily,
          symbolSize,
          responsiveGrid,
          enableDataZoom,
          rotateLongLabels,
          tooltipTrigger,
          background,
          animationDuration: 800
        }}
      />

      <View className="code-preview">
        <View className="preview-title">当前配置代码</View>
        <View className="code-block">
          {`<Chart
  option={option}
  height={350}
  customConfig={{
    tooltipFormatter: (params) => { /* 自定义格式化函数 */ },
    axisLabelFormatter: (value) => { /* 坐标轴标签格式化 */ },
    colorPalette: ${JSON.stringify(colorThemes[colorTheme])},
    ${fontFamily ? `fontFamily: '${fontFamily}',` : ''}
    symbolSize: ${symbolSize},
    responsiveGrid: ${responsiveGrid},
    enableDataZoom: ${enableDataZoom},
    rotateLongLabels: ${rotateLongLabels},
    tooltipTrigger: '${tooltipTrigger}',
    ${background ? `background: '${background}',` : ''}
    animationDuration: 800
  }}
/>`}
        </View>
      </View>
    </View>
  )
}

export default CustomChartConfig
