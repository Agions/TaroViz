/**
 * TaroViz 错误边界组件
 * 捕获图表渲染过程中的错误，防止整个应用崩溃
 */
import React, { Component, ErrorInfo, ReactNode } from 'react';

export interface ErrorBoundaryProps {
  /** 子组件 */
  children: ReactNode;
  /** 错误回调 */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** 自定义错误展示 */
  fallback?: (error: Error, reset: () => void) => ReactNode;
  /** 是否显示错误详情 */
  showDetails?: boolean;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * 错误边界组件
 * 用于捕获子组件树中的 JavaScript 错误
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 调用错误回调
    this.props.onError?.(error, errorInfo);

    // 打印错误日志
    console.error('[TaroViz] Chart rendering error:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback, showDetails = false } = this.props;

    if (hasError && error) {
      // 使用自定义 fallback
      if (fallback) {
        return fallback(error, this.handleReset);
      }

      // 默认错误展示（使用 CSS 变量，与 ThemeManager 对齐）
      return (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--tv-border-radius, 16px)',
            backgroundColor: 'var(--tv-bg-color, #fff)',
            border: '1px solid var(--tv-error-color, #ff4d4f)',
            borderRadius: 'var(--tv-border-radius, 8px)',
            color: 'var(--tv-text-color, #333)',
            minHeight: '200px',
            fontFamily: 'var(--tv-font-family, sans-serif)',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }} aria-hidden="true">⚠️</div>
          <h3 style={{ margin: '0 0 12px', color: 'var(--tv-error-color, #ff4d4f)', fontWeight: 700 }}>
            图表渲染失败
          </h3>
          <p style={{ margin: '0 0 16px', color: 'var(--tv-text-color-secondary, #666)', textAlign: 'center', maxWidth: '320px' }}>
            图表在渲染过程中遇到错误，请检查数据配置是否正确
          </p>
          {showDetails && (
            <details
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'var(--tv-bg-color-secondary, #f5f5f5)',
                borderRadius: 'var(--tv-border-radius-small, 4px)',
                fontSize: 'var(--tv-font-size-small, 12px)',
                fontFamily: 'var(--tv-font-family, monospace)',
                overflow: 'auto',
                maxHeight: '150px',
              }}
            >
              <summary style={{ cursor: 'pointer', marginBottom: '8px', fontWeight: 600 }}>错误详情</summary>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {error.message}
                {'\n\n'}
                {error.stack}
              </pre>
            </details>
          )}
          <button
            onClick={this.handleReset}
            style={{
              marginTop: '16px',
              padding: '8px 24px',
              backgroundColor: 'var(--tv-primary-color, #1890ff)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--tv-border-radius-small, 4px)',
              cursor: 'pointer',
              fontSize: 'var(--tv-font-size, 14px)',
              fontWeight: 600,
              transition: 'background-color var(--tv-transition-duration, 0.3s)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--tv-primary-color-hover, #40a9ff)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--tv-primary-color, #1890ff)';
            }}
          >
            重试
          </button>
        </div>
      );
    }

    return children;
  }
}

/**
 * 创建带错误边界的图表组件
 * @param ChartComponent 图表组件
 * @returns 带错误边界的图表组件
 */
export function withErrorBoundary<Props extends object>(
  ChartComponent: React.ComponentType<Props>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
): React.ComponentType<Props> {
  const WrappedChart: React.FC<Props> = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <ChartComponent {...props} />
    </ErrorBoundary>
  );

  const componentName = ChartComponent.displayName || ChartComponent.name;
  WrappedChart.displayName = componentName
    ? `withErrorBoundary(${componentName})`
    : 'withErrorBoundary(WrappedChart)';

  return WrappedChart;
}

export default ErrorBoundary;
