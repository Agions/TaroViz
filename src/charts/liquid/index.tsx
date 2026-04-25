/**
 * 水球图组件
 *
 * 使用 ECharts 5.x 自定义系列实现水球图功能，
 * 不依赖有 zrender 兼容性问题的 echarts-liquidfill。
 */
import React, { memo, useEffect, useRef, useMemo } from 'react';
import type {
  EChartsType,
  ECElementEvent,
  EChartsOption,
  CustomSeriesRenderItem,
  CustomSeriesRenderItemReturn,
} from 'echarts';
import { getAdapter } from '../../adapters';
import { uuid } from '../../core/utils';
import { processAdapterConfig } from '../utils';
import { LiquidChartProps } from './types';

/** 包装容器的最大半径（px），用于归一化半径 */
const MAX_RADIUS = 100;

/**
 * 解析百分比字符串为像素值
 */
function parsePercentToPx(percent: string | undefined, base: number): number {
  if (percent == null) return base;
  if (typeof percent === 'number') return base * (percent / MAX_RADIUS);
  if (typeof percent === 'string' && percent.endsWith('%')) {
    return (parseFloat(percent) / 100) * base;
  }
  return parseFloat(percent) || base;
}

/**
 * 水球图配置构建函数
 * 返回 ECharts custom series 配置
 */
function buildLiquidOption(props: {
  waveData: number[];
  shape: string;
  amplitude: number | undefined;
  waveLength: number | string | undefined;
  phase: number | undefined;
  period: number | undefined;
  backgroundColor: string;
  colors: string[];
  showLabel: boolean;
  labelFormatter: ((value: number) => string) | undefined;
}): { series: Record<string, unknown>[] } {
  const {
    waveData,
    shape: _shape,
    amplitude,
    waveLength,
    phase,
    period: _period,
    backgroundColor,
    colors,
    showLabel,
    labelFormatter,
  } = props;

  const actualPhase = phase ?? 0;
  const actualAmplitude = amplitude ?? 8; // 相对于 MAX_RADIUS 的比例

  // buildLiquidRenderItem - 使用闭包捕获配置
  const renderItem: CustomSeriesRenderItem = (
    _params,
    api,
  ) => {
    const width = api.getWidth();
    const height = api.getHeight();
    const size = Math.min(width, height);
    const centerX = width / 2;
    const centerY = height / 2;
    const baseRadius = size / 2 * 0.8;

    const ampPx = baseRadius * (actualAmplitude / MAX_RADIUS);

    let wlPx: number;
    if (waveLength === undefined) {
      wlPx = baseRadius * 0.8;
    } else if (typeof waveLength === 'string') {
      wlPx = parsePercentToPx(waveLength, size);
    } else {
      wlPx = waveLength;
    }

    const itemWidth = width;
    const itemHeight = height;

    // 背景圆
    const bgCircle = {
      type: 'circle',
      shape: { cx: centerX, cy: centerY, r: baseRadius },
      style: {
        fill: backgroundColor !== 'transparent' ? backgroundColor : '#e3f7ff',
        stroke: '#294d99',
        lineWidth: 8,
        shadowBlur: 20,
        shadowColor: 'rgba(0,0,0,0.25)',
      },
      z2: 0,
    };

    // 波浪多边形
    const waveElements = waveData.map((value, idx) => {
      if (value < 0 || value > 1) {
        return {
          type: 'polygon',
          shape: {
            points: [
              [centerX - baseRadius, centerY],
              [centerX + baseRadius, centerY],
              [centerX + baseRadius, centerY + baseRadius],
              [centerX - baseRadius, centerY + baseRadius],
            ],
          },
          style: { fill: colors[idx % colors.length], opacity: 0 },
          z2: 2 + idx,
        };
      }

      const waterLevel = centerY + baseRadius - value * baseRadius * 2;
      const color = colors[idx % colors.length];

      // 生成波浪点
      const curves = Math.max(Math.ceil((2 * baseRadius) / wlPx * 4) * 2, 8);
      const phaseOffset = (idx * Math.PI) / 4 + actualPhase;

      const points: [number, number][] = [];
      const numPoints = curves * 4;
      for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * Math.PI * 2 + phaseOffset;
        const xPos = (i / numPoints) * (baseRadius * 2 + wlPx) - wlPx / 2;
        const yOffset = Math.sin(t) * ampPx;
        // 只保留圆内的点
        if (Math.abs(xPos) <= baseRadius) {
          points.push([centerX + xPos, waterLevel + yOffset]);
        }
      }

      // 确保至少有两个点
      if (points.length < 2) {
        points.length = 0;
        points.push([centerX - baseRadius, waterLevel]);
        points.push([centerX + baseRadius, waterLevel]);
      }

      // 闭合路径
      const lastPoint = points[points.length - 1];
      const closedPoints: [number, number][] = [
        ...points,
        [lastPoint[0], centerY + baseRadius],
        [points[0][0], centerY + baseRadius],
      ];

      return {
        type: 'polygon',
        shape: { points: closedPoints },
        style: {
          fill: color,
          opacity: 0.95,
          shadowBlur: 50,
          shadowColor: 'rgba(0,0,0,0.4)',
        },
        z2: 2 + idx,
      };
    });

    // 标签
    const labelChildren = showLabel
      ? [
          {
            type: 'text' as const,
            style: {
              text: labelFormatter
                ? labelFormatter(waveData[0] ?? 0)
                : `${Math.round((waveData[0] ?? 0) * 100)}%`,
              x: centerX,
              y: centerY,
              textAlign: 'center' as const,
              textVerticalAlign: 'middle' as const,
              fontSize: Math.max(baseRadius * 0.3, 16),
              fontWeight: 'bold',
              fill: '#294d99',
            },
            z2: 10,
          },
        ]
      : [];

    const groupChildren = [bgCircle, ...waveElements, ...labelChildren];

    return {
      type: 'group',
      width: itemWidth,
      height: itemHeight,
      children: groupChildren,
    } as CustomSeriesRenderItemReturn;
  };

  const customSeries = {
    type: 'custom' as const,
    renderItem,
    data: waveData.map((value) => ({ value })),
    animation: false,
  };

  return {
    series: [customSeries],
  };
}

/**
 * 水球图组件
 */
const LiquidChart: React.FC<LiquidChartProps> = memo((props) => {
  const {
    option,
    width = '100%',
    height = '300px',
    theme,
    style = {},
    className = '',
    autoResize = true,
    loading = false,
    loadingOption,
    onChartInit,
    onChartReady,
    renderer = 'canvas',
    onEvents = {},
    waveData = [0.6],
    shape,
    amplitude,
    waveLength,
    phase,
    period,
    backgroundColor = 'transparent',
    color,
    showLabel = true,
    labelFormatter,
  } = props;

  const chartId = useRef<string>(`liquid-${uuid()}`);
  const chartInstance = useRef<EChartsType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 构建 ECharts 配置
  const liquidOption = useMemo((): EChartsOption => {
    const baseOption = (option || {}) as EChartsOption;

    // 如果用户提供了 series 配置，直接返回
    if (baseOption.series && Array.isArray(baseOption.series) && baseOption.series.length > 0) {
      return baseOption;
    }

    const colors = color || ['#4cabce', '#4cabce'];

    const customConfig = buildLiquidOption({
      waveData,
      shape: shape ?? 'circle',
      amplitude,
      waveLength,
      phase,
      period,
      backgroundColor,
      colors,
      showLabel,
      labelFormatter,
    });

    return {
      ...baseOption,
      series: customConfig.series as EChartsOption['series'],
    };
  }, [option, waveData, shape, amplitude, waveLength, phase, period, backgroundColor, color, showLabel, labelFormatter]);

  // 处理图表初始化
  useEffect(() => {
    let mounted = true;

    const initChart = async (): Promise<(() => void) | undefined> => {
      if (!mounted || !containerRef.current) return undefined;

      const initConfig = processAdapterConfig({
        canvasId: chartId.current,
        containerRef,
        width,
        height,
        theme,
        autoResize,
        renderer,
        option: liquidOption,
        onInit: (instance: EChartsType) => {
          chartInstance.current = instance;

          // 绑定事件
          if (onEvents) {
            Object.entries(onEvents).forEach(([eventName, handler]) => {
              (instance as unknown as { on: (e: string, h: (ev: ECElementEvent) => void) => void }).on(
                eventName,
                handler,
              );
            });
          }

          if (onChartInit) {
            onChartInit(instance);
          }

          if (onChartReady) {
            onChartReady(instance);
          }
        },
      });

      const adapter = await getAdapter(initConfig);
      adapter.init();

      return () => {
        if (chartInstance.current) {
          if (onEvents) {
            Object.keys(onEvents).forEach((eventName) => {
              chartInstance.current?.off(eventName);
            });
          }
          chartInstance.current.dispose();
          chartInstance.current = null;
        }
      };
    };

    let cleanupFn: (() => void) | undefined;
    initChart().then((cleanup) => {
      cleanupFn = cleanup;
    });

    return () => {
      mounted = false;
      cleanupFn?.();
    };
  }, [liquidOption, width, height, theme, autoResize, renderer, onChartInit, onChartReady, onEvents]);

  // 更新配置
  useEffect(() => {
    if (chartInstance.current && liquidOption) {
      chartInstance.current.setOption(liquidOption, true);
    }
  }, [liquidOption]);

  // 控制加载状态
  useEffect(() => {
    if (chartInstance.current) {
      if (loading) {
        chartInstance.current.showLoading(loadingOption);
      } else {
        chartInstance.current.hideLoading();
      }
    }
  }, [loading, loadingOption]);

  // 自定义样式
  const mergedStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  return (
    <div
      className={`taroviz-liquid ${className}`}
      style={mergedStyle}
      ref={containerRef as React.RefObject<HTMLDivElement>}
    />
  );
});

LiquidChart.displayName = 'LiquidChart';

export default LiquidChart;

// 导出类型
export type { LiquidChartProps, LiquidOption, LiquidShape, LiquidSeries, LiquidSeriesDataItem } from './types';
