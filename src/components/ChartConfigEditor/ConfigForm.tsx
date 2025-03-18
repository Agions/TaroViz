import React from 'react'
import { View, Text, Input, Switch, Slider, ColorPicker, Select } from '@tarojs/components'
import type { EChartsOption } from 'echarts'
import './ConfigForm.scss'

interface ConfigFormProps {
  option: EChartsOption
  onChange: (option: EChartsOption) => void
}

export const ConfigForm: React.FC<ConfigFormProps> = ({
  option,
  onChange
}) => {
  const handleTitleChange = (e: any) => {
    onChange({
      ...option,
      title: {
        ...option.title,
        text: e.detail.value
      }
    })
  }

  const handleTooltipChange = (e: any) => {
    onChange({
      ...option,
      tooltip: {
        ...option.tooltip,
        show: e.detail.value
      }
    })
  }

  const handleLegendChange = (e: any) => {
    onChange({
      ...option,
      legend: {
        ...option.legend,
        show: e.detail.value
      }
    })
  }

  const handleXAxisTypeChange = (e: any) => {
    onChange({
      ...option,
      xAxis: {
        ...option.xAxis,
        type: e.detail.value
      }
    })
  }

  const handleYAxisTypeChange = (e: any) => {
    onChange({
      ...option,
      yAxis: {
        ...option.yAxis,
        type: e.detail.value
      }
    })
  }

  const handleSeriesNameChange = (e: any) => {
    onChange({
      ...option,
      series: option.series.map((series, index) =>
        index === 0 ? { ...series, name: e.detail.value } : series
      )
    })
  }

  const handleColorChange = (color: string) => {
    onChange({
      ...option,
      series: option.series.map((series, index) =>
        index === 0 ? { ...series, itemStyle: { color } } : series
      )
    })
  }

  const handleLineWidthChange = (value: number) => {
    onChange({
      ...option,
      series: option.series.map((series, index) =>
        index === 0 ? { ...series, lineStyle: { width: value } } : series
      )
    })
  }

  const handleAnimationChange = (e: any) => {
    onChange({
      ...option,
      series: option.series.map((series, index) =>
        index === 0 ? { ...series, animation: e.detail.value } : series
      )
    })
  }

  const handleAnimationDurationChange = (value: number) => {
    onChange({
      ...option,
      series: option.series.map((series, index) =>
        index === 0 ? { ...series, animationDuration: value } : series
      )
    })
  }

  return (
    <View className='config-form'>
      <View className='form-section'>
        <Text className='section-title'>标题设置</Text>
        <View className='form-item'>
          <Text className='label'>标题文本</Text>
          <Input
            className='input'
            value={option.title?.text || ''}
            onInput={handleTitleChange}
            placeholder='请输入标题'
          />
        </View>
      </View>

      <View className='form-section'>
        <Text className='section-title'>交互设置</Text>
        <View className='form-item'>
          <Text className='label'>显示提示框</Text>
          <Switch
            checked={option.tooltip?.show !== false}
            onChange={handleTooltipChange}
          />
        </View>
        <View className='form-item'>
          <Text className='label'>显示图例</Text>
          <Switch
            checked={option.legend?.show !== false}
            onChange={handleLegendChange}
          />
        </View>
      </View>

      <View className='form-section'>
        <Text className='section-title'>坐标轴设置</Text>
        <View className='form-item'>
          <Text className='label'>X轴类型</Text>
          <Select
            className='select'
            value={option.xAxis?.type || 'category'}
            onChange={handleXAxisTypeChange}
          >
            <option value='category'>类目轴</option>
            <option value='value'>数值轴</option>
            <option value='time'>时间轴</option>
            <option value='log'>对数轴</option>
          </Select>
        </View>
        <View className='form-item'>
          <Text className='label'>Y轴类型</Text>
          <Select
            className='select'
            value={option.yAxis?.type || 'value'}
            onChange={handleYAxisTypeChange}
          >
            <option value='value'>数值轴</option>
            <option value='category'>类目轴</option>
            <option value='time'>时间轴</option>
            <option value='log'>对数轴</option>
          </Select>
        </View>
      </View>

      <View className='form-section'>
        <Text className='section-title'>系列数据设置</Text>
        <View className='form-item'>
          <Text className='label'>系列名称</Text>
          <Input
            className='input'
            value={option.series?.[0]?.name || ''}
            onInput={handleSeriesNameChange}
            placeholder='请输入系列名称'
          />
        </View>
      </View>

      <View className='form-section'>
        <Text className='section-title'>样式设置</Text>
        <View className='form-item'>
          <Text className='label'>线条颜色</Text>
          <ColorPicker
            className='color-picker'
            value={option.series?.[0]?.itemStyle?.color || '#1890ff'}
            onChange={handleColorChange}
          />
        </View>
        <View className='form-item'>
          <Text className='label'>线条宽度</Text>
          <Slider
            className='slider'
            min={1}
            max={10}
            value={option.series?.[0]?.lineStyle?.width || 2}
            onChange={handleLineWidthChange}
          />
        </View>
      </View>

      <View className='form-section'>
        <Text className='section-title'>动画设置</Text>
        <View className='form-item'>
          <Text className='label'>启用动画</Text>
          <Switch
            checked={option.series?.[0]?.animation !== false}
            onChange={handleAnimationChange}
          />
        </View>
        <View className='form-item'>
          <Text className='label'>动画时长(ms)</Text>
          <Slider
            className='slider'
            min={0}
            max={2000}
            step={100}
            value={option.series?.[0]?.animationDuration || 1000}
            onChange={handleAnimationDurationChange}
          />
        </View>
      </View>
    </View>
  )
}
