import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Chart } from '../index'

describe('Chart Component', () => {
  const mockOption:any = {
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

  it('renders without crashing', () => {
    render(<Chart option={mockOption} />)
    expect(screen.getByTestId('chart-container')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-chart'
    render(<Chart option={mockOption} className={customClass} />)
    expect(screen.getByTestId('chart-container')).toHaveClass(customClass)
  })

  it('applies custom style', () => {
    const customStyle = { width: '100%', height: '300px' }
    render(<Chart option={mockOption} style={customStyle} />)
    const container = screen.getByTestId('chart-container')
    expect(container).toHaveStyle(customStyle)
  })

  it('handles loading state', () => {
    render(<Chart option={mockOption} loading={true} />)
    // 这里需要模拟 echarts 的 showLoading 方法
  })

  it('limits data points when dataZoom is enabled', () => {
    const largeDataOption = {
      ...mockOption,
      series: [{
        data: Array.from({ length: 2000 }, (_, i) => i),
        type: 'line'
      }]
    }

    render(<Chart option={largeDataOption} />)
    // 这里需要验证数据点是否被限制
  })

  it('adds dataZoom components when enabled', () => {
    render(<Chart option={mockOption} />)
    // 这里需要验证 dataZoom 组件是否被添加
  })

  it('handles resize events', () => {
    render(<Chart option={mockOption} />)
    // 这里需要模拟窗口大小变化事件
  })
})
