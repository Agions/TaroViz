import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ChartTypeSelector from '../index'
import { getChartTypesByCategory } from '../../Chart/chartTypes'

describe('ChartTypeSelector', () => {
  const mockOnSelect = jest.fn()

  beforeEach(() => {
    mockOnSelect.mockClear()
  })

  it('renders all chart categories', () => {
    render(<ChartTypeSelector onSelect={mockOnSelect} />)

    expect(screen.getByText('基础图表')).toBeInTheDocument()
    expect(screen.getByText('统计图表')).toBeInTheDocument()
    expect(screen.getByText('关系图表')).toBeInTheDocument()
    expect(screen.getByText('层级图表')).toBeInTheDocument()
    expect(screen.getByText('地理图表')).toBeInTheDocument()
    expect(screen.getByText('特殊图表')).toBeInTheDocument()
  })

  it('renders chart types within each category', () => {
    render(<ChartTypeSelector onSelect={mockOnSelect} />)

    // 基础图表
    expect(screen.getByText('折线图')).toBeInTheDocument()
    expect(screen.getByText('柱状图')).toBeInTheDocument()
    expect(screen.getByText('饼图')).toBeInTheDocument()
    expect(screen.getByText('面积图')).toBeInTheDocument()
    expect(screen.getByText('堆叠柱状图')).toBeInTheDocument()
    expect(screen.getByText('环形图')).toBeInTheDocument()

    // 统计图表
    expect(screen.getByText('散点图')).toBeInTheDocument()
    expect(screen.getByText('雷达图')).toBeInTheDocument()
    expect(screen.getByText('箱线图')).toBeInTheDocument()
    expect(screen.getByText('K线图')).toBeInTheDocument()

    // 关系图表
    expect(screen.getByText('关系图')).toBeInTheDocument()
    expect(screen.getByText('桑基图')).toBeInTheDocument()
    expect(screen.getByText('和弦图')).toBeInTheDocument()

    // 层级图表
    expect(screen.getByText('树图')).toBeInTheDocument()
    expect(screen.getByText('矩形树图')).toBeInTheDocument()
    expect(screen.getByText('旭日图')).toBeInTheDocument()

    // 地理图表
    expect(screen.getByText('地图')).toBeInTheDocument()
    expect(screen.getByText('热力图')).toBeInTheDocument()
    expect(screen.getByText('线图')).toBeInTheDocument()

    // 特殊图表
    expect(screen.getByText('仪表盘')).toBeInTheDocument()
    expect(screen.getByText('水球图')).toBeInTheDocument()
    expect(screen.getByText('词云图')).toBeInTheDocument()
  })

  it('calls onSelect when a chart type is clicked', () => {
    render(<ChartTypeSelector onSelect={mockOnSelect} />)

    const lineChartItem = screen.getByText('折线图')
    fireEvent.click(lineChartItem)

    expect(mockOnSelect).toHaveBeenCalledWith(expect.objectContaining({
      name: '折线图',
      type: 'line'
    }))
  })

  it('applies selected class to the selected chart type', () => {
    render(<ChartTypeSelector onSelect={mockOnSelect} selectedType="line" />)

    const lineChartItem = screen.getByText('折线图').closest('.chart-type-item')
    expect(lineChartItem).toHaveClass('selected')
  })

  it('displays chart type descriptions', () => {
    render(<ChartTypeSelector onSelect={mockOnSelect} />)

    // 基础图表描述
    expect(screen.getByText('用于展示数据随时间或类别的变化趋势')).toBeInTheDocument()
    expect(screen.getByText('用于展示不同类别的数值对比')).toBeInTheDocument()
    expect(screen.getByText('用于展示整体中各部分的占比')).toBeInTheDocument()

    // 统计图表描述
    expect(screen.getByText('用于展示两个变量之间的关系')).toBeInTheDocument()
    expect(screen.getByText('用于展示多维度的数据对比')).toBeInTheDocument()

    // 关系图表描述
    expect(screen.getByText('用于展示节点之间的关系')).toBeInTheDocument()
    expect(screen.getByText('用于展示数据流向和数量关系')).toBeInTheDocument()

    // 层级图表描述
    expect(screen.getByText('用于展示层级结构数据')).toBeInTheDocument()
    expect(screen.getByText('用于展示层级数据的占比关系')).toBeInTheDocument()

    // 地理图表描述
    expect(screen.getByText('用于展示地理数据')).toBeInTheDocument()
    expect(screen.getByText('用于展示地理数据的密度分布')).toBeInTheDocument()

    // 特殊图表描述
    expect(screen.getByText('用于展示进度或完成度')).toBeInTheDocument()
    expect(screen.getByText('用于展示百分比数据，具有动态效果')).toBeInTheDocument()
  })
})
