import React, { useEffect, useState } from 'react'
import { Chart } from './index'
import type { ChartProps } from './types'

interface LazyLoadProps extends ChartProps {
  threshold?: number
  rootMargin?: string
}

export const withLazyLoad = (WrappedComponent: typeof Chart) => {
  return function LazyLoadChart({
    threshold = 0.1,
    rootMargin = '50px',
    ...props
  }: LazyLoadProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [chartRef, setChartRef] = useState<HTMLDivElement | null>(null)

    useEffect(() => {
      if (!chartRef) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        },
        {
          threshold,
          rootMargin,
        }
      )

      observer.observe(chartRef)

      return () => {
        observer.disconnect()
      }
    }, [chartRef, threshold, rootMargin])

    return (
      <div ref={setChartRef} style={{ minHeight: props.style?.height || '300px' }}>
        {isVisible && <WrappedComponent {...props} />}
      </div>
    )
  }
}
