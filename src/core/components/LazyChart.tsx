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

// 统一的图表类型到懒加载组件映射
const LAZY_CHART_MODULES: Record<string, () => Promise<{ default: ComponentType<Record<string, unknown>> }>> = {
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

export const LAZY_CHART_TYPES = Object.keys(LAZY_CHART_MODULES);

/**
 * 默认加载状态组件（使用 CSS 变量，与 ThemeManager 对齐）
 */
const DefaultLoadingFallback: React.FC<{ text?: string }> = ({ text = '加载中...' }) => (
  <div
    role="status"
    aria-label={text}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      minHeight: '200px',
      backgroundColor: 'var(--tv-bg-color-secondary, #f5f5f5)',
      borderRadius: 'var(--tv-border-radius, 8px)',
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--tv-primary-color, #1890ff)',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'taroviz-spin 1s linear infinite',
          margin: '0 auto 12px',
        }}
        aria-hidden="true"
      />
      <style>
        {`
          @keyframes taroviz-spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <span style={{ color: 'var(--tv-text-color-secondary, #666)', fontSize: 'var(--tv-font-size, 14px)' }}>
        {text}
      </span>
    </div>
  </div>
);

/**
 * 懒加载图表包装组件
 */
export function withLazyLoad<P extends object>(
  ChartComponent: ComponentType<P>,
  loadingFallback?: ComponentType<{ text?: string }>
): ComponentType<
  Omit<P, 'loadingText' | 'fallback'> & { loadingText?: string; fallback?: React.ReactNode }
> {
  const LazyWrapper: React.FC<
    Omit<P, 'loadingText' | 'fallback'> & { loadingText?: string; fallback?: React.ReactNode }
  > = ({ loadingText, fallback, ...props }) => {
    const LoadingComponent = loadingFallback || DefaultLoadingFallback;
    return (
      <Suspense fallback={<LoadingComponent text={loadingText} />}>
        {fallback ? (
          <React.Fragment>
            {fallback}
            <ChartComponent {...(props as P)} />
          </React.Fragment>
        ) : (
          <ChartComponent {...(props as P)} />
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
 * @param silent - 如果为 true，错误不会被打印到控制台（保持旧行为兼容）
 * @returns Promise that resolves when loaded, rejects on error
 */
export function preloadChart(chartType: string, silent = true): Promise<void> {
  const loader = LAZY_CHART_MODULES[chartType];
  if (!loader) {
    if (silent) return Promise.resolve();
    return Promise.reject(new Error(`Unknown chart type: ${chartType}`));
  }
  return loader()
    .then(() => undefined)
    .catch((e) => {
      if (!silent) console.error('[TaroViz] Failed to preload chart:', chartType, e);
    });
}

/**
 * 预加载所有图表组件
 */
export function preloadAllCharts(): Promise<void[]> {
  return Promise.all(LAZY_CHART_TYPES.map((type) => preloadChart(type)));
}

/**
 * 创建懒加载图表映射
 * 用于动态导入图表
 */
export function createLazyChart(chartType: string): ComponentType<Record<string, unknown>> | null {
  const lazyCharts: Record<string, ComponentType<Record<string, unknown>>> = {
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
  get(chartType: string): ComponentType<Record<string, unknown>> | null {
    return createLazyChart(chartType);
  },

  preload(chartType: string, silent = true): Promise<void> {
    return preloadChart(chartType, silent);
  },

  preloadAll(): Promise<void[]> {
    return preloadAllCharts();
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
