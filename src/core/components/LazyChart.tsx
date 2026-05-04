/**
 * TaroViz 懒加载图表组件
 * 用于按需加载图表，减少首屏体积
 */
import React, { Suspense, lazy, ComponentType } from 'react';
import type { BaseChartProps } from '../../charts/types';

/**
 * 图表类型到懒加载组件的映射
 * 统一定义，避免重复
 */
const LAZY_CHART_REGISTRY: Record<string, ComponentType<BaseChartProps>> = {};

/**
 * 创建懒加载组件
 */
function createLazyComponent(name: string): ComponentType<BaseChartProps> {
  if (!LAZY_CHART_REGISTRY[name]) {
    LAZY_CHART_REGISTRY[name] = lazy(() =>
      import('../../charts').then((m) => ({
        default: m[name as keyof typeof m] as ComponentType<BaseChartProps>,
      }))
    );
  }
  return LAZY_CHART_REGISTRY[name];
}

// 预创建常用图表的懒加载组件
export const LazyLineChart = createLazyComponent('LineChart');
export const LazyBarChart = createLazyComponent('BarChart');
export const LazyPieChart = createLazyComponent('PieChart');
export const LazyScatterChart = createLazyComponent('ScatterChart');
export const LazyRadarChart = createLazyComponent('RadarChart');
export const LazyHeatmapChart = createLazyComponent('HeatmapChart');
export const LazyGaugeChart = createLazyComponent('GaugeChart');
export const LazyFunnelChart = createLazyComponent('FunnelChart');
export const LazyTreeMapChart = createLazyComponent('TreeMapChart');
export const LazySunburstChart = createLazyComponent('SunburstChart');
export const LazySankeyChart = createLazyComponent('SankeyChart');

/**
 * 图表类型到懒加载模块的映射
 * 用于预加载功能
 */
const LAZY_CHART_MODULES: Record<
  string,
  () => Promise<{ default: ComponentType<BaseChartProps> }>
> = {
  line: () => import('../../charts').then((m) => ({ default: m.LineChart })),
  bar: () => import('../../charts').then((m) => ({ default: m.BarChart })),
  pie: () => import('../../charts').then((m) => ({ default: m.PieChart })),
  scatter: () => import('../../charts').then((m) => ({ default: m.ScatterChart })),
  radar: () => import('../../charts').then((m) => ({ default: m.RadarChart })),
  heatmap: () => import('../../charts').then((m) => ({ default: m.HeatmapChart })),
  gauge: () => import('../../charts').then((m) => ({ default: m.GaugeChart })),
  funnel: () => import('../../charts').then((m) => ({ default: m.FunnelChart })),
  treemap: () => import('../../charts').then((m) => ({ default: m.TreeMapChart })),
  sunburst: () => import('../../charts').then((m) => ({ default: m.SunburstChart })),
  sankey: () => import('../../charts').then((m) => ({ default: m.SankeyChart })),
};

export const LAZY_CHART_TYPES = Object.keys(LAZY_CHART_MODULES);

/**
 * 默认加载状态组件（使用 CSS 变量，与 ThemeManager 对齐）
 * 包含完整的无障碍支持
 */
const DefaultLoadingFallback: React.FC<{ text?: string }> = ({ text = '加载中...' }) => (
  <div
    role="status"
    aria-label={text}
    aria-busy="true"
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
      {/*
        视觉隐藏文本，屏幕阅读器可读取加载状态
        避免干扰视觉布局
      */}
      <span
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {text}
      </span>
      <span
        style={{
          color: 'var(--tv-text-color-secondary, #666)',
          fontSize: 'var(--tv-font-size, 14px)',
        }}
      >
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
export function createLazyChart(chartType: string): ComponentType<BaseChartProps> | null {
  const chartName = `${chartType.charAt(0).toUpperCase() + chartType.slice(1)}Chart`;
  return LAZY_CHART_REGISTRY[chartName] || null;
}

/**
 * 懒加载图表注册表
 * 用于按名称动态获取懒加载图表组件
 */
export const LazyChartRegistry = {
  get(chartType: string): ComponentType<BaseChartProps> | null {
    return createLazyChart(chartType);
  },

  preload(chartType: string, silent = true): Promise<void> {
    return preloadChart(chartType, silent);
  },

  preloadAll(): Promise<void[]> {
    return preloadAllCharts();
  },
};
