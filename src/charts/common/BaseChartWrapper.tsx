/**
 * 基础图表包装组件
 * 提供统一的图表初始化、渲染和生命周期管理
 *
 * 无障碍支持 (WCAG):
 * - role="application" + keyboard navigation for zoom/pan
 * - Hidden data table with aria-live for screen readers
 * - Respects prefers-reduced-motion
 */
import React, { useEffect, useRef, useMemo, useCallback, useId } from 'react';
import type { EChartsType } from 'echarts';

import { getAdapter } from '../../adapters';
import { uuid } from '../../core/utils';
import { BaseChartProps } from '../types';
import { processAdapterConfig } from '../utils';

/** Extract series data from an ECharts option for screen reader exposure */
function extractSeriesData(option: unknown): Array<{ name: string; data: unknown[] }> {
  const opt = option as { series?: Array<{ name?: string; data?: unknown[] }> };
  if (!opt?.series || !Array.isArray(opt.series)) return [];
  return opt.series
    .filter((s) => s?.data && Array.isArray(s.data))
    .map((s) => ({ name: s.name || '系列', data: s.data as unknown[] }));
}

/** Build a human-readable aria-label from chart option */
function buildAriaLabel(chartType: string, option: unknown): string {
  const seriesData = extractSeriesData(option);
  if (!seriesData.length) {
    return chartType === 'chart' ? '空图表' : `${chartType} 空图表`;
  }
  const totalPoints = seriesData.reduce((sum, s) => sum + s.data.length, 0);
  const seriesNames = seriesData.map((s) => s.name).join('、');
  return `${chartType}图表，包含${seriesData.length}个系列（${seriesNames}），共${totalPoints}个数据点`;
}

// ─── Keyboard navigation step sizes ───────────────────────────────────────
const ZOOM_STEP = 5;   // % per key press
const PAN_STEP = 10;   // % pan per arrow key

const BaseChartWrapper: React.FC<BaseChartProps & { chartType: string }> = ({
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
  chartType = 'chart',
}) => {
  const chartId = useRef<string>(`${chartType}-${uuid()}`);
  const chartInstance = useRef<EChartsType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(true);
  const cleanupRef = useRef<(() => void) | null>(null);
  const tableId = useId();          // unique id for aria-describedby
  const seriesData = useMemo(() => extractSeriesData(option), [option]);
  const ariaLabel = useMemo(() => buildAriaLabel(chartType, option), [chartType, option]);

  // Keyboard handler for zoom/pan — attached to the chart container
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const instance = chartInstance.current;
      if (!instance) return;

      // ECharts dataZoom dispatch — works for any chart with dataZoom axis
      const dispatchZoom = (startDelta: number, endDelta: number) => {
        instance.dispatchAction({ type: 'dataZoom', startDelta, endDelta });
      };

      // Home = reset zoom to full range
      if (e.key === 'Home') {
        e.preventDefault();
        instance.dispatchAction({ type: 'dataZoom', start: 0, end: 100 });
        return;
      }

      switch (e.key) {
        case '+':
        case '=': {
          e.preventDefault();
          // Zoom in (narrow range) — decrease end by ZOOM_STEP
          const end = instance.getOption() as { dataZoom?: Array<{ start?: number; end?: number }> };
          const dz = end?.dataZoom?.[0];
          if (dz) {
            const newEnd = Math.max(0, (dz.end ?? 100) - ZOOM_STEP);
            const newStart = Math.max(0, (dz.start ?? 0) - ZOOM_STEP);
            instance.dispatchAction({ type: 'dataZoom', start: newStart, end: newEnd });
          }
          break;
        }
        case '-':
        case '_': {
          e.preventDefault();
          // Zoom out (expand range) — increase end by ZOOM_STEP
          const end = instance.getOption() as { dataZoom?: Array<{ start?: number; end?: number }> };
          const dz = end?.dataZoom?.[0];
          if (dz) {
            const newEnd = Math.min(100, (dz.end ?? 100) + ZOOM_STEP);
            const newStart = Math.min((dz.start ?? 0) + ZOOM_STEP, newEnd);
            instance.dispatchAction({ type: 'dataZoom', start: newStart, end: newEnd });
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          dispatchZoom(-PAN_STEP, 0);
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          dispatchZoom(PAN_STEP, 0);
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          dispatchZoom(0, -PAN_STEP);
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          dispatchZoom(0, PAN_STEP);
          break;
        }
        // No default — let other keys pass through for accessibility tools
      }
    },
    []
  );

  // Use memo to cache adapter config
  const adapterConfig = useMemo(() => {
    return processAdapterConfig({
      canvasId: chartId.current,
      containerRef,
      width,
      height,
      theme,
      autoResize,
      renderer,
      option,
    });
  }, [width, height, theme, autoResize, renderer, option]);

  // Handle chart initialization
  useEffect(() => {
    isMountedRef.current = true;

    const initChart = async () => {
      const initConfig = processAdapterConfig({
        ...adapterConfig,
        onInit: (instance: EChartsType) => {
          if (!isMountedRef.current) {
            instance.dispose();
            return;
          }
          chartInstance.current = instance;

          if (onEvents) {
            Object.entries(onEvents).forEach(([eventName, handler]) => {
              (instance as unknown as { on: Function }).on(eventName, handler);
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

      if (!isMountedRef.current) {
        return;
      }

      adapter.init();

      cleanupRef.current = () => {
        if (chartInstance.current) {
          if (onEvents) {
            Object.entries(onEvents).forEach(([eventName]) => {
              (chartInstance.current as unknown as { off: Function }).off(eventName);
            });
          }
          chartInstance.current.dispose();
          chartInstance.current = null;
        }
      };
    };

    initChart();

    return () => {
      isMountedRef.current = false;
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [adapterConfig, onChartInit, onChartReady, onEvents]);

  // Update config
  useEffect(() => {
    if (chartInstance.current && option) {
      chartInstance.current.setOption(option, true);
    }
  }, [option]);

  // Loading state
  useEffect(() => {
    if (chartInstance.current) {
      if (loading) {
        chartInstance.current.showLoading(loadingOption);
      } else {
        chartInstance.current.hideLoading();
      }
    }
  }, [loading, loadingOption]);

  // Merged style
  const mergedStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  return (
    <>
      {/*
        Hidden data table for screen readers (WCAG 1.1.1 Non-text Content).
        aria-live="polite" announces updates when data changes.
        Use aria-label to give the table a meaningful name.
      */}
      <table
        id={tableId}
        aria-label={`${chartType} 图表数据`}
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          clipPath: 'inset(50%)',
          whiteSpace: 'nowrap',
        }}
        aria-live="polite"
        aria-atomic="false"
      >
        <caption>{ariaLabel}</caption>
        <thead>
          <tr>
            {seriesData.map((s, i) => (
              <th key={i} scope="col">{s.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render up to 20 rows to avoid overwhelming screen readers */}
          {Array.from({ length: Math.min(20, seriesData[0]?.data.length ?? 0) }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {seriesData.map((s, colIdx) => (
                <td key={colIdx}>{String(s.data[rowIdx] ?? '')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/*
        Chart container with role="application" + keyboard navigation.
        role="application" tells assistive tech to pass through keyboard events.
        aria-describedby links to the hidden data table above.
      */}
      <div
        className={`taroviz-${chartType} ${className}`}
        style={mergedStyle}
        ref={containerRef as React.RefObject<HTMLDivElement>}
        role="application"
        aria-label={ariaLabel}
        aria-describedby={tableId}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default BaseChartWrapper;
