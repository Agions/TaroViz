/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * TaroViz 基础图表组件
 * 所有图表组件的基类
 *
 * 该组件提供了图表的基础功能，包括初始化、事件处理、主题设置等
 * 所有具体的图表组件（如折线图、柱状图等）都继承自该组件
 */
import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { deepClone } from '../utils/deepClone';

import { generateEChartsAnimationConfig } from '../animation';
import { EChartsOption, EChartsType, AnimationConfig } from '../types';
import type { DataZoomComponentOption } from 'echarts';
import { registerChart, removeChart, getChart } from '../utils/chartInstances';
import { PerformanceAnalyzer } from '../utils/performance';
import { normalizeSize, calculateDataLength, filterDataByKeys } from '../utils/chartUtils';
import BaseChartWrapper from '../../charts/common/BaseChartWrapper';
import type { BaseChartProps } from '../../charts/types';
import type {
  EChartsMouseEventParams,
  EChartsTooltipEventParams,
  ChartEventParams,
  ChartExportOptions,
  ChartLinkageConfig,
} from '../types/common';
import type { ECElementEvent } from 'echarts';

// ============================================================================
// 接口定义
// ============================================================================

/** 从 core/types 导入共享类型 */
export { ChartEventParams, ChartExportOptions, ChartLinkageConfig } from '../types/common';

// ============================================================================
// ChartProps - 与原有接口保持完全兼容
// ============================================================================

export interface ChartProps {
  chartId?: string;
  option?: EChartsOption;
  animation?: AnimationConfig;
  width?: number | string;
  height?: number | string;
  theme?: string | object;
  autoResize?: boolean;
  direction?: 'ltr' | 'rtl';
  onInit?: (_instance: EChartsType) => void;
  onClick?: (_params: ChartEventParams) => void;
  onDataZoom?: (_params: ChartEventParams) => void;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  virtualScroll?: boolean;
  virtualScrollPageSize?: number;
  virtualScrollPreloadSize?: number;
  enablePerformanceMonitoring?: boolean;
  onPerformance?: (data: {
    renderTime: number;
    initTime: number;
    updateTime: number;
    dataSize: number;
  }) => void;
  enableZoom?: boolean;
  onZoom?: (data: { start: number; end: number; _dataZoomIndex: number }) => void;
  enableDataFiltering?: boolean;
  _filters?: Record<string, string | number | boolean | string[] | null>;
  onDataFiltered?: (_filteredData: unknown[], _filters: Record<string, unknown>) => void;
  enableLegendInteraction?: boolean;
  legendInteractionMode?: 'single' | 'multiple' | 'all';
  onLegendSelect?: (_params: { name: string; selected: Record<string, boolean> }) => void;
  onLegendUnselect?: (_params: { name: string; selected: Record<string, boolean> }) => void;
  onLegendSelectAll?: (_params: { selected: Record<string, boolean> }) => void;
  onLegendInverseSelect?: (_params: { selected: Record<string, boolean> }) => void;
  enableCustomTooltip?: boolean;
  customTooltipContent?: (
    _params: EChartsMouseEventParams | EChartsMouseEventParams[]
  ) => React.ReactNode;
  customTooltipStyle?: React.CSSProperties;
  onTooltipShow?: (_params: EChartsTooltipEventParams) => void;
  onTooltipHide?: (_params: EChartsTooltipEventParams) => void;
  onExport?: (_dataURL: string, options: ChartExportOptions) => void;
  linkageConfig?: ChartLinkageConfig;
  onDataUpdate?: (
    oldOption: EChartsOption | undefined,
    newOption: EChartsOption | undefined
  ) => void;
  _dataUpdateOptions?: { enabled?: boolean; deepCompare?: boolean; debounceDelay?: number };
}

// ============================================================================
// BaseChart 组件
// ============================================================================

const BaseChart: React.FC<ChartProps> = (props) => {
  const {
    chartId,
    option,
    animation,
    width = '100%',
    height = '300px',
    theme,
    autoResize = true,
    direction = 'ltr',
    onInit,
    onClick,
    onDataZoom,
    style,
    className,
    children: _children,
    virtualScroll = false,
    virtualScrollPageSize = 100,
    virtualScrollPreloadSize = 50,
    enablePerformanceMonitoring = false,
    onPerformance,
    enableZoom: _enableZoom = false,
    onZoom,
    enableDataFiltering = false,
    _filters = {},
    onDataFiltered,
    enableLegendInteraction = false,
    legendInteractionMode = 'single',
    onLegendSelect,
    onLegendUnselect,
    onLegendSelectAll: _onLegendSelectAll,
    onLegendInverseSelect: _onLegendInverseSelect,
    enableCustomTooltip = false,
    customTooltipContent,
    customTooltipStyle,
    onTooltipShow,
    onTooltipHide,
    onExport: _onExport,
    linkageConfig = {},
    onDataUpdate,
    _dataUpdateOptions = {},
  } = props;

  // Refs
  const chartInstanceRef = useRef<EChartsType | null>(null);
  const performanceRef = useRef({
    initStartTime: 0,
    initEndTime: 0,
    renderStartTime: 0,
    renderEndTime: 0,
    updateStartTime: 0,
    updateEndTime: 0,
  });
  const virtualScrollRef = useRef({
    currentPage: 0,
    totalPages: 1,
    totalDataCount: 0,
    isScrolling: false,
  });
  const oldOptionRef = useRef<EChartsOption | undefined>(option);
  const adapterRef = useRef<unknown>(null);
  const performanceAnalyzerRef = useRef<PerformanceAnalyzer | null>(null);

  // Wrapper option that applies virtual scroll + _data filtering
  const wrappedOption = useMemo(() => {
    if (!option) return undefined;
    let processed: Record<string, unknown> = { ...option };

    // Apply _data filtering
    if (enableDataFiltering && _filters && Object.keys(_filters).length > 0) {
      processed = deepClone(processed);
      if (processed.series && Array.isArray(processed.series)) {
        processed.series = (processed.series as unknown[]).map((s: unknown) => {
          const seriesItem = s as { _data?: unknown[]; [key: string]: unknown };
          if (seriesItem._data && Array.isArray(seriesItem._data)) {
            const filtered = filterDataByKeys(seriesItem._data, _filters);
            if (onDataFiltered) onDataFiltered(filtered, _filters);
            if (virtualScroll) {
              virtualScrollRef.current.totalDataCount = filtered.length;
              virtualScrollRef.current.totalPages = Math.ceil(
                filtered.length / virtualScrollPageSize
              );
              const start = virtualScrollRef.current.currentPage * virtualScrollPageSize;
              const end = Math.min(
                start + virtualScrollPageSize + virtualScrollPreloadSize,
                filtered.length
              );
              return { ...seriesItem, _data: filtered.slice(start, end) };
            }
            return { ...seriesItem, _data: filtered };
          }
          return seriesItem;
        });
      }
    }

    // Inject _dataZoom when enableZoom is true (keyboard-accessible zoom)
    if (_enableZoom) {
      processed = deepClone(processed);
      // Avoid duplicate _dataZoom entries
      const existingDzArr = Array.isArray(processed._dataZoom)
        ? (processed._dataZoom as DataZoomComponentOption[])
        : processed._dataZoom
          ? [processed._dataZoom as DataZoomComponentOption]
          : [];
      if (!existingDzArr.some((dz) => dz?.type === 'inside')) {
        processed._dataZoom = [
          ...(existingDzArr || []),
          // Inside (mouse wheel + keyboard) — wired to keyboard nav in BaseChartWrapper
          { type: 'inside', start: 0, end: 100, zoomOnMouseWheel: true, moveOnMouseMove: false },
        ];
      }
    }

    // Apply animation config
    const _dataLength = calculateDataLength(processed);
    const animConfig = generateEChartsAnimationConfig(animation, _dataLength);
    return { ...processed, ...animConfig } as EChartsOption;
  }, [
    option,
    animation,
    _enableZoom,
    enableDataFiltering,
    _filters,
    virtualScroll,
    virtualScrollPageSize,
    virtualScrollPreloadSize,
    onDataFiltered,
  ]);

  // Internal chartInit that wraps the user's callback
  const handleChartInit = useCallback(
    (_instance: EChartsType) => {
      chartInstanceRef.current = _instance;
      adapterRef.current = _instance as unknown;

      // Performance monitoring init
      if (enablePerformanceMonitoring) {
        performanceAnalyzerRef.current = PerformanceAnalyzer.getInstance({
          chartId,
          enabled: true,
          metrics: ['initTime', 'renderTime', 'updateTime', 'dataSize', 'frameRate'],
          sampleInterval: 1000,
          maxSamples: 100,
          realTime: true,
          autoStart: true,
        });
      }
      performanceRef.current.initStartTime = Date.now();

      // Register for linkage
      if (chartId) registerChart(chartId, _instance);

      // Setup internal event handlers for linkage + virtual scroll
      if (_instance) {
        // Click linkage
        if (linkageConfig.enableClickLinkage && chartId && linkageConfig.linkedChartIds) {
          _instance.on('click', (_params: ECElementEvent) => {
            linkageConfig.linkedChartIds!.forEach((lid) => {
              const linked = getChart(lid);
              if (linked) linked.dispatchAction({ type: 'highlight', name: _params.name });
            });
          });
        }

        // Zoom + zoom linkage + virtual scroll page update
        _instance.on('_datazoom', (_params: unknown) => {
          const p = _params as {
            start?: number;
            end?: number;
            _dataZoomIndex?: number;
            batch?: Array<{ start?: number; end?: number; _dataZoomIndex?: number }>;
          };
          if (onZoom)
            onZoom({
              start: p.start || 0,
              end: p.end || 100,
              _dataZoomIndex: p._dataZoomIndex || 0,
            });
          if (virtualScroll && !virtualScrollRef.current.isScrolling) {
            virtualScrollRef.current.isScrolling = true;
            const newPage = Math.floor(
              ((p.start || 0) / 100) * virtualScrollRef.current.totalPages
            );
            if (newPage !== virtualScrollRef.current.currentPage) {
              virtualScrollRef.current.currentPage = newPage;
              // Trigger re-render via option update
            }
            setTimeout(() => {
              virtualScrollRef.current.isScrolling = false;
            }, 100);
          }
          if (linkageConfig.enableZoomLinkage && chartId && linkageConfig.linkedChartIds) {
            linkageConfig.linkedChartIds!.forEach((lid) => {
              const linked = getChart(lid);
              if (linked)
                linked.dispatchAction({
                  type: '_dataZoom',
                  start: p.start,
                  end: p.end,
                  _dataZoomIndex: p._dataZoomIndex,
                });
            });
          }
        });

        // Legend interaction
        if (enableLegendInteraction) {
          _instance.on('legendselectchanged', (_params: unknown) => {
            const p = _params as { name?: string; selected: Record<string, boolean> };
            const { name, selected } = p;
            if (linkageConfig.enableLegendLinkage && chartId && linkageConfig.linkedChartIds) {
              linkageConfig.linkedChartIds!.forEach((lid) => {
                const linked = getChart(lid);
                if (linked) linked.setOption({ legend: { selected } });
              });
            }
            if (legendInteractionMode === 'single') {
              const newSelected: Record<string, boolean> = {};
              Object.keys(selected).forEach((k) => {
                newSelected[k] = k === name;
              });
              _instance.setOption({ legend: { selected: newSelected } });
              if (name !== undefined) onLegendSelect?.({ name, selected: newSelected });
            } else {
              if (name !== undefined && selected[name]) onLegendSelect?.({ name, selected });
              else if (name !== undefined) onLegendUnselect?.({ name, selected });
            }
          });
        }

        // Custom tooltip
        if (enableCustomTooltip && customTooltipContent) {
          _instance.on('tooltipshow', (_params: unknown) =>
            onTooltipShow?.(_params as EChartsTooltipEventParams)
          );
          _instance.on('tooltiphide', (_params: unknown) =>
            onTooltipHide?.(_params as EChartsTooltipEventParams)
          );
          _instance.setOption({
            tooltip: {
              formatter: (_params: unknown) =>
                String(customTooltipContent(_params as EChartsMouseEventParams)),
              ...(customTooltipStyle && {
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                textStyle: {},
              }),
            },
          });
        }
      }

      onInit?.(_instance);
      performanceRef.current.initEndTime = Date.now();
    },
    [
      chartId,
      enablePerformanceMonitoring,
      onInit,
      linkageConfig,
      virtualScroll,
      onZoom,
      enableLegendInteraction,
      legendInteractionMode,
      onLegendSelect,
      onLegendUnselect,
      enableCustomTooltip,
      customTooltipContent,
      customTooltipStyle,
      onTooltipShow,
      onTooltipHide,
      wrappedOption,
      width,
      height,
    ]
  );

  // Update performance record
  useEffect(() => {
    if (chartInstanceRef.current && onPerformance) {
      const p = performanceRef.current;
      onPerformance({
        renderTime: p.renderEndTime - p.renderStartTime,
        initTime: p.initEndTime - p.initStartTime,
        updateTime: p.updateEndTime - p.updateStartTime,
        dataSize: estimateDataSize(option),
      });
    }
  }, [option, onPerformance]);

  // Data update callback — supports debounce
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!onDataUpdate || _dataUpdateOptions?.enabled === false) return;

    const delay = _dataUpdateOptions?.debounceDelay ?? 0;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (delay > 0) {
      debounceTimerRef.current = setTimeout(() => {
        const oldOpt = oldOptionRef.current;
        if (oldOpt !== option) {
          onDataUpdate(oldOpt, option);
          oldOptionRef.current = option;
        }
      }, delay);
    } else {
      const oldOpt = oldOptionRef.current;
      if (oldOpt !== option) {
        onDataUpdate(oldOpt, option);
        oldOptionRef.current = option;
      }
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
    };
  }, [option, onDataUpdate, _dataUpdateOptions]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartId) removeChart(chartId);
      if (performanceAnalyzerRef.current) {
        performanceAnalyzerRef.current.dispose();
        performanceAnalyzerRef.current = null;
      }
      if (adapterRef.current) (adapterRef.current as EChartsType).dispose();
    };
  }, [chartId]);

  const mergedStyle = {
    ...normalizeSizeObject(width, height, direction, style),
  };

  const wrapperProps: BaseChartProps & { chartType: string } = {
    option: wrappedOption as unknown as Record<string, unknown>,
    width,
    height,
    theme: typeof theme === 'string' ? theme : (theme as Record<string, unknown>),
    autoResize,
    loading: false,
    onChartInit: handleChartInit,
    renderer: 'canvas',
    onEvents: {},
    chartType: 'base',
    style: mergedStyle,
    className,
  };

  return (
    <>
      <BaseChartWrapper {...wrapperProps} />
    </>
  );
};

/**
 * Lightweight estimation of option data size without expensive JSON.stringify.
 * Counts approximate character length by summing string values and array lengths.
 */
function estimateDataSize(option: unknown): number {
  if (option == null) return 0;
  if (typeof option === 'string') return option.length;
  if (typeof option !== 'object') return 8; // number/boolean approximation

  let size = 0;
  const obj = option as Record<string, unknown>;
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    size += key.length + 1; // key + colon
    const val = obj[key];
    if (typeof val === 'string') {
      size += val.length + 2; // quotes
    } else if (Array.isArray(val)) {
      size += val.length * 4; // rough per-element estimate
    } else if (typeof val === 'object' && val !== null) {
      size += estimateDataSize(val);
    } else {
      size += 8; // number/boolean
    }
  }
  return size;
}

function normalizeSizeObject(
  width: number | string,
  height: number | string,
  direction: 'ltr' | 'rtl',
  style?: React.CSSProperties
): React.CSSProperties {
  return {
    width: normalizeSize(width, '100%'),
    height: normalizeSize(height, '300px'),
    direction,
    ...style,
  };
}

export default BaseChart;
