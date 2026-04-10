/**
 * TaroViz 基础图表组件
 * 所有图表组件的基类
 *
 * 该组件提供了图表的基础功能，包括初始化、事件处理、主题设置等
 * 所有具体的图表组件（如折线图、柱状图等）都继承自该组件
 */
import React, { useEffect, useRef, useMemo, useCallback } from 'react';

import { generateEChartsAnimationConfig } from '../animation';
import { EChartsOption, EChartsType, AnimationConfig } from '../types';
import { registerChart, removeChart, getChart } from '../utils/chartInstances';
import { DebugPanel, DebugPanelOptions, updateDebugInfo } from '../utils/debug';
import { PerformanceAnalyzer } from '../utils/performance';
import { normalizeSize, calculateDataLength, filterDataByKeys } from '../utils/chartUtils';
import BaseChartWrapper from '../../charts/common/BaseChartWrapper';
import type { BaseChartProps } from '../../charts/types';

// ============================================================================
// 接口定义
// ============================================================================

/** 图表事件参数类型 */
export interface ChartEventParams {
  [key: string]: any;
}

/** 图表导出选项 */
export interface ChartExportOptions {
  type?: 'png' | 'jpeg' | 'svg';
  filename?: string;
  pixelRatio?: number;
  backgroundColor?: string;
}

/** 图表联动配置 */
export interface ChartLinkageConfig {
  linkedChartIds?: string[];
  enableClickLinkage?: boolean;
  enableZoomLinkage?: boolean;
  enableLegendLinkage?: boolean;
  enableFilterLinkage?: boolean;
}

// ============================================================================
// ChartProps - 与原有接口保持完全兼容
// ============================================================================

export interface ChartProps {
  chartId?: string;
  option?: EChartsOption;
  animation?: AnimationConfig;
  debug?: boolean | DebugPanelOptions;
  width?: number | string;
  height?: number | string;
  theme?: string | object;
  autoResize?: boolean;
  direction?: 'ltr' | 'rtl';
  onInit?: (instance: EChartsType) => void;
  onClick?: (params: ChartEventParams) => void;
  onDataZoom?: (params: ChartEventParams) => void;
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
  onZoom?: (data: { start: number; end: number; dataZoomIndex: number }) => void;
  enableDataFiltering?: boolean;
  filters?: Record<string, any>;
  onDataFiltered?: (filteredData: any[], filters: Record<string, any>) => void;
  enableLegendInteraction?: boolean;
  legendInteractionMode?: 'single' | 'multiple' | 'all';
  onLegendSelect?: (params: { name: string; selected: Record<string, boolean> }) => void;
  onLegendUnselect?: (params: { name: string; selected: Record<string, boolean> }) => void;
  onLegendSelectAll?: (params: { selected: Record<string, boolean> }) => void;
  onLegendInverseSelect?: (params: { selected: Record<string, boolean> }) => void;
  enableCustomTooltip?: boolean;
  customTooltipContent?: (params: any) => React.ReactNode;
  customTooltipStyle?: React.CSSProperties;
  onTooltipShow?: (params: any) => void;
  onTooltipHide?: (params: any) => void;
  onExport?: (dataURL: string, options: ChartExportOptions) => void;
  linkageConfig?: ChartLinkageConfig;
  onDataUpdate?: (
    oldOption: EChartsOption | undefined,
    newOption: EChartsOption | undefined
  ) => void;
  dataUpdateOptions?: { enabled?: boolean; deepCompare?: boolean; debounceDelay?: number };
}

// ============================================================================
// BaseChart 组件
// ============================================================================

const BaseChart: React.FC<ChartProps> = (props) => {
  const {
    chartId,
    option,
    animation,
    debug,
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
    filters = {},
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
    dataUpdateOptions = {},
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
  const debugConfigRef = useRef<DebugPanelOptions | null>(null);
  const performanceAnalyzerRef = useRef<PerformanceAnalyzer | null>(null);

  // Debug config
  const debugConfig = useMemo(() => {
    if (!debug) return null;
    return typeof debug === 'boolean'
      ? { enabled: debug, autoExpand: false }
      : { enabled: true, ...debug };
  }, [debug]);

  // Wrapper option that applies virtual scroll + data filtering
  const wrappedOption = useMemo(() => {
    if (!option) return undefined;
    let processed = { ...option };

    // Apply data filtering
    if (enableDataFiltering && filters && Object.keys(filters).length > 0) {
      processed = JSON.parse(JSON.stringify(processed));
      if (processed.series && Array.isArray(processed.series)) {
        processed.series = processed.series.map((s: any) => {
          if (s.data && Array.isArray(s.data)) {
            const filtered = filterDataByKeys(s.data, filters);
            if (onDataFiltered) onDataFiltered(filtered, filters);
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
              return { ...s, data: filtered.slice(start, end) };
            }
            return { ...s, data: filtered };
          }
          return s;
        });
      }
    }

    // Apply animation config
    const dataLength = calculateDataLength(processed);
    const animConfig = generateEChartsAnimationConfig(animation, dataLength);
    return { ...processed, ...animConfig } as EChartsOption;
  }, [
    option,
    animation,
    enableDataFiltering,
    filters,
    virtualScroll,
    virtualScrollPageSize,
    virtualScrollPreloadSize,
    onDataFiltered,
  ]);

  // Internal chartInit that wraps the user's callback
  const handleChartInit = useCallback(
    (instance: EChartsType) => {
      chartInstanceRef.current = instance;
      adapterRef.current = instance as unknown;

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
      if (chartId) registerChart(chartId, instance);

      // Setup internal event handlers for linkage + virtual scroll
      if (instance) {
        // Click linkage
        if (linkageConfig.enableClickLinkage && chartId && linkageConfig.linkedChartIds) {
          instance.on('click', (params: any) => {
            linkageConfig.linkedChartIds!.forEach((lid) => {
              const linked = getChart(lid);
              if (linked) linked.dispatchAction({ type: 'highlight', name: params.name });
            });
          });
        }

        // Zoom + zoom linkage + virtual scroll page update
        instance.on('datazoom', (params: any) => {
          if (onZoom)
            onZoom({
              start: params.start || 0,
              end: params.end || 100,
              dataZoomIndex: params.dataZoomIndex || 0,
            });
          if (virtualScroll && !virtualScrollRef.current.isScrolling) {
            virtualScrollRef.current.isScrolling = true;
            const newPage = Math.floor(
              ((params.start || 0) / 100) * virtualScrollRef.current.totalPages
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
                  type: 'dataZoom',
                  start: params.start,
                  end: params.end,
                  dataZoomIndex: params.dataZoomIndex,
                });
            });
          }
        });

        // Legend interaction
        if (enableLegendInteraction) {
          instance.on('legendselectchanged', (params: any) => {
            const { name, selected } = params;
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
              instance.setOption({ legend: { selected: newSelected } });
              onLegendSelect?.({ name, selected: newSelected });
            } else {
              if (selected[name]) onLegendSelect?.({ name, selected });
              else onLegendUnselect?.({ name, selected });
            }
          });
        }

        // Custom tooltip
        if (enableCustomTooltip && customTooltipContent) {
          instance.on('tooltipshow', (params: any) => onTooltipShow?.(params));
          instance.on('tooltiphide', (params: any) => onTooltipHide?.(params));
          instance.setOption({
            tooltip: {
              formatter: (params: any) => String(customTooltipContent(params)),
              ...(customTooltipStyle && {
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                textStyle: {},
              }),
            },
          });
        }
      }

      // Update debug panel
      if (debugConfigRef.current?.enabled) {
        updateDebugInfo({
          instance: {
            id: chartId,
            type: 'ECharts',
            renderer: 'canvas',
            width: typeof width === 'number' ? width : undefined,
            height: typeof height === 'number' ? height : undefined,
            platform: 'web',
          },
          config: wrappedOption,
          data: {
            series: Array.isArray(wrappedOption?.series) ? wrappedOption.series : [],
            totalDataCount: calculateDataLength(wrappedOption),
            currentDataCount: calculateDataLength(wrappedOption),
          },
          performance: {
            initTime: 0,
            renderTime: 0,
            dataSize: JSON.stringify(wrappedOption).length,
          },
        });
      }

      onInit?.(instance);
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
        dataSize: JSON.stringify(option).length,
      });
    }
  }, [option, onPerformance]);

  // Data update callback — supports debounce
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!onDataUpdate || dataUpdateOptions?.enabled === false) return;

    const delay = dataUpdateOptions?.debounceDelay ?? 0;

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
  }, [option, onDataUpdate, dataUpdateOptions]);

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
    option: wrappedOption as any,
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
      {debugConfig?.enabled && (
        <DebugPanel
          options={debugConfig}
          debugInfo={{
            instance: {
              id: chartId,
              type: 'ECharts',
              renderer: 'canvas',
              width: typeof width === 'number' ? width : undefined,
              height: typeof height === 'number' ? height : undefined,
              platform: 'web',
            },
            config: option,
            data: {
              series: Array.isArray(option?.series) ? option.series : [],
              totalDataCount: calculateDataLength(option),
              currentDataCount: calculateDataLength(option),
            },
            performance: {
              initTime: performanceRef.current.initEndTime - performanceRef.current.initStartTime,
              renderTime:
                performanceRef.current.renderEndTime - performanceRef.current.renderStartTime,
              updateTime: 0,
              dataSize: JSON.stringify(option).length,
            },
          }}
        />
      )}
    </>
  );
};

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
