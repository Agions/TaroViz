import React from 'react'
import { View, Text, Input, Switch, Slider, Picker } from '@tarojs/components'
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
      series: (option.series as any[]).map((series, index) =>
        index === 0 ? { ...series, name: e.detail.value } : series
      )
    })
  }

  const handleColorChange = (color: string) => {
    onChange({
      ...option,
      series:  (option.series as any[]).map((series, index) =>
        index === 0 ? { ...series, itemStyle: { color } } : series
      )
    })
  }

  const handleLineWidthChange = (e: any) => {
    onChange({
      ...option,
      series:  (option.series as any[]).map((series, index) =>
        index === 0 ? { ...series, lineStyle: { width: e.detail.value } } : series
      )
    })
  }

  const handleAnimationChange = (e: any) => {
    onChange({
      ...option,
      series:  (option.series as any[]).map((series, index) =>
        index === 0 ? { ...series, animation: e.detail.value } : series
      )
    })
  }

  const handleAnimationDurationChange = (e: any) => {
    onChange({
      ...option,
      series: (option.series as any[]).map((series, index) =>
        index === 0 ? { ...series, animationDuration: e.detail.value } : series
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
            value={(option.title as any)?.text || ''}
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
            checked={(option.tooltip as any)?.show !== false}
            onChange={handleTooltipChange}
          />
        </View>
        <View className='form-item'>
          <Text className='label'>显示图例</Text>
          <Switch
            checked={(option.legend as any)?.show !== false}
            onChange={handleLegendChange}
          />
        </View>
      </View>

      <View className='form-section'>
        <Text className='section-title'>坐标轴设置</Text>
        <View className='form-item'>
          <Text className='label'>X轴类型</Text>
          <Input
            className='input'
            value={(option.xAxis as any)?.type || 'category'}
            onInput={handleXAxisTypeChange}
            placeholder='请输入X轴类型'
          />
        </View>
        <View className='form-item'>
          <Text className='label'>Y轴类型</Text>
          <Input
            className='input'
            value={(option.yAxis as any)?.type || 'value'}
            onInput={handleYAxisTypeChange}
            placeholder='请输入Y轴类型'
          />
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
          <Picker
            className='picker'
            range={[
              { value: '#1890ff', label: '蓝色' },
              { value: '#52c41a', label: '绿色' },
              { value: '#f5222d', label: '红色' }
            ]}
            range-key='label'
            value={option.series?.[0]?.itemStyle?.color || '#1890ff'}
            onChange={(e) => handleColorChange(e.detail.value as string)}
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
