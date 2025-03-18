import React from 'react'
import { View, Text, Button, Textarea } from '@tarojs/components'
import type { EChartsOption } from 'echarts'
import './ConfigIO.scss'

interface ConfigIOProps {
  option: EChartsOption
  onImport: (option: EChartsOption) => void
  onSaveTemplate: (name: string) => void
  onLoadTemplate: (name: string) => void
}

export const ConfigIO: React.FC<ConfigIOProps> = ({
  option,
  onImport,
  onSaveTemplate,
  onLoadTemplate
}) => {
  const [jsonInput, setJsonInput] = React.useState('')
  const [templateName, setTemplateName] = React.useState('')
  const [error, setError] = React.useState('')

  const handleExport = () => {
    const json = JSON.stringify(option, null, 2)
    setJsonInput(json)
  }

  const handleImport = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      onImport(parsed)
      setError('')
    } catch (e) {
      setError('JSON格式错误')
    }
  }

  const handleSaveTemplate = () => {
    if (!templateName) {
      setError('请输入模板名称')
      return
    }
    onSaveTemplate(templateName)
    setError('')
  }

  const handleLoadTemplate = () => {
    if (!templateName) {
      setError('请输入模板名称')
      return
    }
    onLoadTemplate(templateName)
    setError('')
  }

  return (
    <View className='config-io'>
      <View className='io-section'>
        <Text className='section-title'>配置导入导出</Text>
        <View className='json-editor'>
          <Textarea
            className='textarea'
            value={jsonInput}
            onInput={(e) => setJsonInput(e.detail.value)}
            placeholder='请输入JSON格式的配置'
          />
          {error && <Text className='error'>{error}</Text>}
        </View>
        <View className='button-group'>
          <Button className='btn' onClick={handleExport}>
            导出配置
          </Button>
          <Button className='btn' onClick={handleImport}>
            导入配置
          </Button>
        </View>
      </View>

      <View className='io-section'>
        <Text className='section-title'>配置模板</Text>
        <View className='template-input'>
          <Text className='label'>模板名称</Text>
          <Textarea
            className='input'
            value={templateName}
            onInput={(e) => setTemplateName(e.detail.value)}
            placeholder='请输入模板名称'
          />
        </View>
        <View className='button-group'>
          <Button className='btn' onClick={handleSaveTemplate}>
            保存模板
          </Button>
          <Button className='btn' onClick={handleLoadTemplate}>
            加载模板
          </Button>
        </View>
      </View>
    </View>
  )
}
