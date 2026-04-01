/**
 * 水球图组件
 * ECharts 没有内置水球图，使用 echarts-liquidfill 库实现
 */
import React, { memo, useEffect, useRef, useMemo } from 'react';
import { getAdapter } from '../../adapters';
import { uuid } from '../../core/utils';
import { processAdapterConfig } from '../utils';
import { LiquidChartProps } from './types';

/**
 * 水球图组件
 * 使用 echarts-liquidfill 实现
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
    shape = 'circle',
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
  const chartInstance = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const extensionRegistered = useRef<boolean>(false);

  // 构建水球图配置
  const liquidOption = useMemo(() => {
    const baseOption = option || {};

    // 如果用户提供了 option，直接返回
    if (baseOption.series && baseOption.series.length > 0) {
      return baseOption;
    }

    // 构建水球图 series
    const seriesData = waveData.map((value) => {
      const dataItem: Record<string, unknown> = { value };

      if (showLabel && labelFormatter) {
        dataItem.label = {
          formatter: labelFormatter(value),
        };
      }

      return dataItem;
    });

    const seriesConfig: Record<string, unknown> = {
      type: 'liquidFill',
      data: waveData,
      shape,
      backgroundColor,
      color: color || ['#4cabce', '#4cabce'],
      label: showLabel
        ? {
            show: true,
            formatter: labelFormatter
              ? (params: any) => labelFormatter(params.value)
              : '{d}%',
            textStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
          }
        : { show: false },
    };

    // 添加可选参数
    if (amplitude !== undefined) {
      seriesConfig.amplitude = amplitude;
    }
    if (waveLength !== undefined) {
      seriesConfig.waveLength = waveLength;
    }
    if (phase !== undefined) {
      seriesConfig.phase = phase;
    }
    if (period !== undefined) {
      seriesConfig.period = period;
    }

    return {
      ...baseOption,
      series: [seriesConfig],
    };
  }, [option, waveData, shape, backgroundColor, color, showLabel, labelFormatter, amplitude, waveLength, phase, period]);

  // 处理图表初始化
  useEffect(() => {
    let mounted = true;

    const initChart = async (): Promise<(() => void) | undefined> => {
      // 动态导入 echarts-liquidfill 并注册扩展
      if (!extensionRegistered.current) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const liquidfill = require('echarts-liquidfill');
          if (liquidfill && mounted) {
            liquidfill.register && liquidfill.register();
            extensionRegistered.current = true;
          }
        } catch (e) {
          console.warn('[TaroViz] LiquidChart: Failed to load echarts-liquidfill extension', e);
          return undefined;
        }
      }

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
        onInit: (instance: any) => {
          chartInstance.current = instance;

          // 绑定事件
          if (onEvents) {
            Object.keys(onEvents).forEach((eventName) => {
              instance.on(eventName, (onEvents as any)[eventName]);
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
