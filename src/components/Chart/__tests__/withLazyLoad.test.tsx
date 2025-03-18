import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { withLazyLoad } from '../withLazyLoad'
import { Chart } from '../index'

const LazyChart = withLazyLoad(Chart)

// 添加 mock 类型声明
declare global {
  interface Window {
    IntersectionObserver: jest.Mock;
  }
}

describe('withLazyLoad HOC', () => {
  const mockOption :any = {
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

  beforeEach(() => {
    // 模拟 IntersectionObserver
    const mockIntersectionObserver = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    })
    window.IntersectionObserver = mockIntersectionObserver
  })

  it('renders placeholder before intersection', () => {
    render(<LazyChart option={mockOption} />)
    expect(screen.getByTestId('chart-container')).not.toBeInTheDocument()
  })

  it('renders chart after intersection', () => {
    render(<LazyChart option={mockOption} />)

    // 模拟 intersection 事件
    act(() => {
      const observer = window.IntersectionObserver.mock.instances[0]
      const [callback] = observer.observe.mock.calls[0]
      callback([{ isIntersecting: true }])
    })

    expect(screen.getByTestId('chart-container')).toBeInTheDocument()
  })

  it('respects custom threshold and rootMargin', () => {
    render(
      <LazyChart
        option={mockOption as any}
        threshold={0.5}
        rootMargin="100px"
      />
    )

    const observer = window.IntersectionObserver.mock.instances[0]
    expect(observer.observe).toHaveBeenCalledWith(
      expect.any(Element),
      {
        threshold: 0.5,
        rootMargin: '100px'
      }
    )
  })
})
