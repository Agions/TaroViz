/**
 * TaroViz 懒加载图表组件
 * 用于按需加载图表，减少首屏体积
 */
import React, { Suspense, lazy, ComponentType } from 'react';

// 懒加载各个图表组件
const LazyLineChart = lazy(() => import('../../charts/line'));
const LazyBarChart = lazy(() => import('../../charts/bar'));
const LazyPieChart = lazy(() => import('../../charts/pie'));
const LazyScatterChart = lazy(() => import('../../charts/scatter'));
const LazyRadarChart = lazy(() => import('../../charts/radar'));
const LazyHeatmapChart = lazy(() => import('../../charts/heatmap'));
const LazyGaugeChart = lazy(() => import('../../charts/gauge'));
const LazyFunnelChart = lazy(() => import('../../charts/funnel'));
const LazyTreeMapChart = lazy(() => import('../../charts/treemap'));
const LazySunburstChart = lazy(() => import('../../charts/sunburst'));
const LazySankeyChart = lazy(() => import('../../charts/sankey'));

/**
 * 懒加载图表包装器
 */
interface LazyChartWrapperProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
}

/**
 * 默认加载状态组件
 */
const DefaultLoadingFallback: React.FC<{ text?: string }> = ({ text = '加载中...' }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      minHeight: '200px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid #1890ff',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'taroviz-spin 1s linear infinite',
          margin: '0 auto 12px',
        }}
      />
      <style>
        {`
          @keyframes taroviz-spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <span style={{ color: '#666', fontSize: '14px' }}>{text}</span>
    </div>
  </div>
);

/**
 * 懒加载图表包装组件
 */
export function withLazyLoad<P extends object>(
  ChartComponent: ComponentType<P>,
  loadingFallback?: ComponentType<{ text?: string }>
): ComponentType<P & { loadingText?: string; fallback?: React.ReactNode }> {
  const LazyWrapper: React.FC<P & { loadingText?: string; fallback?: React.ReactNode }> = ({
    loadingText,
    fallback,
    ...props
  }) => {
    const LoadingComponent = loadingFallback || DefaultLoadingFallback;
    return (
      <Suspense fallback={<LoadingComponent text={loadingText} />}>
        {fallback ? (
          <React.Fragment>
            {fallback}
            <ChartComponent {...props} />
          </React.Fragment>
        ) : (
          <ChartComponent {...props} />
        )}
      </Suspense>
    );
  };

  LazyWrapper.displayName = `withLazyLoad(${ChartComponent.displayName || ChartComponent.name || 'Chart'})`;

  return LazyWrapper;
}

/**
 * 预加载图表组件
 * 在需要显示图表之前预先加载
 */
export function preloadChart(chartType: string): void {
  const chartModules: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
    line: () => import('../../charts/line'),
    bar: () => import('../../charts/bar'),
    pie: () => import('../../charts/pie'),
    scatter: () => import('../../charts/scatter'),
    radar: () => import('../../charts/radar'),
    heatmap: () => import('../../charts/heatmap'),
    gauge: () => import('../../charts/gauge'),
    funnel: () => import('../../charts/funnel'),
    treemap: () => import('../../charts/treemap'),
    sunburst: () => import('../../charts/sunburst'),
    sankey: () => import('../../charts/sankey'),
  };

  const loader = chartModules[chartType];
  if (loader) {
    loader().catch(console.error);
  }
}

/**
 * 预加载所有图表组件
 */
export function preloadAllCharts(): void {
  const chartTypes = [
    'line',
    'bar',
    'pie',
    'scatter',
    'radar',
    'heatmap',
    'gauge',
    'funnel',
    'treemap',
    'sunburst',
    'sankey',
  ];

  chartTypes.forEach((type) => preloadChart(type));
}

/**
 * 创建懒加载图表映射
 * 用于动态导入图表
 */
export function createLazyChart(chartType: string): ComponentType<any> | null {
  const lazyCharts: Record<string, ComponentType<any>> = {
    line: LazyLineChart,
    bar: LazyBarChart,
    pie: LazyPieChart,
    scatter: LazyScatterChart,
    radar: LazyRadarChart,
    heatmap: LazyHeatmapChart,
    gauge: LazyGaugeChart,
    funnel: LazyFunnelChart,
    treemap: LazyTreeMapChart,
    sunburst: LazySunburstChart,
    sankey: LazySankeyChart,
  };

  return lazyCharts[chartType] || null;
}

/**
 * 懒加载图表注册表
 * 用于按名称动态获取懒加载图表组件
 */
export const LazyChartRegistry = {
  get(chartType: string): ComponentType<any> | null {
    return createLazyChart(chartType);
  },

  preload(chartType: string): void {
    preloadChart(chartType);
  },

  preloadAll(): void {
    preloadAllCharts();
  },
};

export {
  LazyLineChart,
  LazyBarChart,
  LazyPieChart,
  LazyScatterChart,
  LazyRadarChart,
  LazyHeatmapChart,
  LazyGaugeChart,
  LazyFunnelChart,
  LazyTreeMapChart,
  LazySunburstChart,
  LazySankeyChart,
};
