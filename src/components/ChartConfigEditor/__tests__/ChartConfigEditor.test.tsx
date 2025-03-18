import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ChartConfigEditor } from '../index'

describe('ChartConfigEditor Component', () => {
  const mockOption:any = {
    title: {
      text: '测试图表'
    },
    tooltip: {
      show: true
    },
    legend: {
      show: true
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150],
      type: 'line'
    }]
  }

  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('renders preview and config tabs', () => {
    render(
      <ChartConfigEditor
        option={mockOption}
        onChange={mockOnChange}
        chartType="line"
      />
    )

    expect(screen.getByText('预览')).toBeInTheDocument()
    expect(screen.getByText('配置')).toBeInTheDocument()
  })

  it('switches between preview and config tabs', () => {
    render(
      <ChartConfigEditor
        option={mockOption}
        onChange={mockOnChange}
        chartType="line"
      />
    )

    const configTab = screen.getByText('配置')
    fireEvent.click(configTab)
    expect(screen.getByText('标题设置')).toBeInTheDocument()

    const previewTab = screen.getByText('预览')
    fireEvent.click(previewTab)
    expect(screen.queryByText('标题设置')).not.toBeInTheDocument()
  })

  it('updates chart title when input changes', () => {
    render(
      <ChartConfigEditor
        option={mockOption}
        onChange={mockOnChange}
        chartType="line"
      />
    )

    // 切换到配置标签
    fireEvent.click(screen.getByText('配置'))

    // 修改标题
    const titleInput = screen.getByPlaceholderText('请输入标题')
    fireEvent.change(titleInput, { target: { value: '新标题' } })

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockOption,
      title: {
        ...mockOption.title,
        text: '新标题'
      }
    })
  })

  it('toggles tooltip visibility', () => {
    render(
      <ChartConfigEditor
        option={mockOption}
        onChange={mockOnChange}
        chartType="line"
      />
    )

    // 切换到配置标签
    fireEvent.click(screen.getByText('配置'))

    // 切换提示框显示
    const tooltipSwitch = screen.getByText('显示提示框').nextElementSibling
    fireEvent.click(tooltipSwitch as any)

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockOption,
      tooltip: {
        ...mockOption.tooltip,
        show: false
      }
    })
  })

  it('toggles legend visibility', () => {
    render(
      <ChartConfigEditor
        option={mockOption}
        onChange={mockOnChange}
        chartType="line"
      />
    )

    // 切换到配置标签
    fireEvent.click(screen.getByText('配置'))

    // 切换图例显示
    const legendSwitch = screen.getByText('显示图例').nextElementSibling
    fireEvent.click(legendSwitch as any)

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockOption,
      legend: {
        ...mockOption.legend,
        show: false
      }
    })
  })
})
