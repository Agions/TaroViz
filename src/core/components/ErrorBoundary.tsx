/**
 * TaroViz Error Boundary
 * 图表组件错误边界，用于捕获子组件错误并显示备用 UI
 */
import React, { Component, ReactNode } from 'react'

// ============================================================================
// 类型定义
// ============================================================================

/** 错误边界属性 */
export interface ErrorBoundaryProps {
  /** 子组件 */
  children: ReactNode
  /** 错误回调 */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  /** 错误时显示的备用 UI */
  fallback?: ReactNode
  /** 是否显示错误详情 */
  showDetails?: boolean
  /** 重试回调 */
  onRetry?: () => void
}

/** 错误边界状态 */
export interface ErrorBoundaryState {
  /** 是否发生错误 */
  hasError: boolean
  /** 错误对象 */
  error: Error | null
  /** 错误信息 */
  errorInfo: React.ErrorInfo | null
}

// ============================================================================
// Error Boundary 组件
// ============================================================================

/**
 * 图表错误边界组件
 * 用于捕获图表渲染过程中的错误，并显示友好的备用 UI
 * 
 * @example
 * ```tsx
 * import { ChartErrorBoundary } from '@agions/taroviz'
 * 
 * function App() {
 *   return (
 *     <ChartErrorBoundary
 *       onError={(error) => console.error(error)}
 *       onRetry={() => console.log('Retrying...')}
 *     >
 *       <LineChart data={data} />
 *     </ChartErrorBoundary>
 *   )
 * }
 * ```
 */
export class ChartErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const { onError } = this.props
    
    console.error('Chart Error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    if (onError) {
      onError(error, errorInfo)
    }
  }

  handleRetry = (): void => {
    const { onRetry } = this.props
    
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })

    if (onRetry) {
      onRetry()
    }
  }

  render(): ReactNode {
    const { children, fallback, showDetails = false, onRetry } = this.props
    const { hasError, error, errorInfo } = this.state

    if (hasError) {
      // 如果提供了自定义 fallback，使用它
      if (fallback) {
        return fallback
      }

      // 默认错误 UI
      return (
        <div style={styles.container}>
          <div style={styles.errorBox}>
            <div style={styles.icon}>⚠️</div>
            <div style={styles.title}>图表渲染出错</div>
            
            {showDetails && error && (
              <div style={styles.errorMessage}>
                {error.message || '未知错误'}
              </div>
            )}
            
            {(onRetry || showDetails) && (
              <div style={styles.actions}>
                {onRetry && (
                  <button style={styles.retryButton} onClick={this.handleRetry}>
                    🔄 重试
                  </button>
                )}
                {showDetails && errorInfo && (
                  <details style={styles.details}>
                    <summary style={styles.summary}>查看详情</summary>
                    <pre style={styles.pre}>
                      {error?.stack || errorInfo.componentStack || '无详细信息'}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </div>
        </div>
      )
    }

    return children
  }
}

// ============================================================================
// 懒加载组件
// ============================================================================

/** 懒加载属性 */
export interface LazyChartProps {
  /** 加载时的占位内容 */
  loading?: ReactNode
  /** 懒加载的图表组件 */
  children: ReactNode
  /** 加载延迟 (ms)，默认 200 */
  delay?: number
}

/**
 * 图表懒加载组件
 * 用于延迟加载图表组件，优化首屏渲染性能
 * 
 * @example
 * ```tsx
 * import { LazyChart } from '@agions/taroviz'
 * 
 * function App() {
 *   return (
 *     <LazyChart loading={<div>加载中...</div>}>
 *       <LineChart data={data} />
 *     </LazyChart>
 *   )
 * }
 * ```
 */
export function LazyChart({ children, loading = null, delay = 200 }: LazyChartProps) {
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (!show) {
    return (
      <div style={styles.lazyContainer}>
        {loading || (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <span>加载图表中...</span>
          </div>
        )}
      </div>
    )
  }

  return <>{children}</>
}

// ============================================================================
// 图表 Suspense
// ============================================================================

/**
 * 图表加载状态组件
 * 用于在图表数据加载过程中显示加载动画
 * 
 * @example
 * ```tsx
 * import { ChartSkeleton } from '@agions/taroviz'
 * 
 * function App() {
 *   return (
 *     <ChartSkeleton type="line" />
 *   )
 * }
 * ```
 */
export interface ChartSkeletonProps {
  /** 图表类型 */
  type?: 'line' | 'bar' | 'pie' | 'radar' | 'gauge'
  /** 宽度 */
  width?: string | number
  /** 高度 */
  height?: string | number
}

/**
 * 图表骨架屏组件
 * 在图表加载时显示占位动画
 */
export function ChartSkeleton({ 
  type = 'line', 
  width = '100%', 
  height = 400 
}: ChartSkeletonProps) {
  const containerStyle: React.CSSProperties = {
    width,
    height,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px'
  }

  const renderSkeleton = () => {
    switch (type) {
      case 'line':
      case 'bar':
        return (
          <div style={styles.skeletonChart}>
            <div style={styles.skeletonBars}>
              {[40, 65, 45, 80, 55, 70].map((h, i) => (
                <div 
                  key={i} 
                  style={{
                    ...styles.skeletonBar,
                    height: `${h}%`,
                    animationDelay: `${i * 0.1}s`
                  }} 
                />
              ))}
            </div>
          </div>
        )
      case 'pie':
        return (
          <div style={styles.skeletonChart}>
            <div style={styles.skeletonPie}></div>
          </div>
        )
      case 'radar':
        return (
          <div style={styles.skeletonChart}>
            <div style={styles.skeletonRadar}></div>
          </div>
        )
      case 'gauge':
        return (
          <div style={styles.skeletonChart}>
            <div style={styles.skeletonGauge}></div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div style={containerStyle}>
      <div style={styles.skeletonTitle}></div>
      {renderSkeleton()}
    </div>
  )
}

// ============================================================================
// 样式
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    padding: '20px'
  },
  errorBox: {
    textAlign: 'center',
    padding: '24px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    maxWidth: '400px'
  },
  icon: {
    fontSize: '32px',
    marginBottom: '8px'
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#dc2626',
    marginBottom: '8px'
  },
  errorMessage: {
    fontSize: '14px',
    color: '#991b1b',
    marginBottom: '16px',
    padding: '8px',
    background: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '4px'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'center'
  },
  retryButton: {
    padding: '8px 16px',
    background: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  details: {
    textAlign: 'left',
    width: '100%'
  },
  summary: {
    cursor: 'pointer',
    color: '#666',
    fontSize: '13px',
    marginBottom: '8px'
  },
  pre: {
    fontSize: '12px',
    background: '#1a1a1a',
    color: '#e0e0e0',
    padding: '12px',
    borderRadius: '4px',
    overflow: 'auto',
    maxHeight: '200px'
  },
  lazyContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px'
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    color: '#666'
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #e0e0e0',
    borderTopColor: '#2d8a8a',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  skeletonChart: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  skeletonBars: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '12px',
    height: '100%',
    width: '100%'
  },
  skeletonBar: {
    flex: 1,
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '4px 4px 0 0'
  },
  skeletonTitle: {
    width: '40%',
    height: '20px',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '4px'
  },
  skeletonPie: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite'
  },
  skeletonRadar: {
    width: '150px',
    height: '150px',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
  },
  skeletonGauge: {
    width: '200px',
    height: '100px',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '100px 100px 0 0'
  }
}

// ============================================================================
// 导出
// ============================================================================

export default {
  ChartErrorBoundary,
  LazyChart,
  ChartSkeleton
}
