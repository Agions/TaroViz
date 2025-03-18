import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { Chart } from '../Chart'
import { ConfigForm } from './ConfigForm'
import type { EChartsOption } from 'echarts'
import './index.scss'

interface ChartConfigEditorProps {
  option: EChartsOption
  onChange: (option: EChartsOption) => void
  chartType: string
}

export const ChartConfigEditor: React.FC<ChartConfigEditorProps> = ({
  option,
  onChange,
  chartType
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'config'>('preview')

  const handleOptionChange = (newOption: EChartsOption) => {
    onChange(newOption)
  }

  return (
    <View className='chart-config-editor'>
      <View className='editor-tabs'>
        <View
          className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          预览
        </View>
        <View
          className={`tab ${activeTab === 'config' ? 'active' : ''}`}
          onClick={() => setActiveTab('config')}
        >
          配置
        </View>
      </View>

      <View className='editor-content'>
        {activeTab === 'preview' ? (
          <View className='preview-container'>
            <Chart option={option} />
          </View>
        ) : (
          <View className='config-container'>
            <ConfigForm option={option} onChange={handleOptionChange} />
          </View>
        )}
      </View>
    </View>
  )
}
