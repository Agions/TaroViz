/**
 * 图表事件 Hook
 * 负责图表事件的绑定、解绑和联动
 */
import { useEffect, useRef } from 'react';
import type { Adapter } from '../../../adapters/types';
import { getChart } from '../../utils/chartInstances';

export interface ChartEventHandlers {
  onClick?: (params: unknown) => void;
  onDataZoom?: (params: unknown) => void;
  onZoom?: (data: { start: number; end: number; dataZoomIndex: number }) => void;
  onLegendSelect?: (params: { name: string; selected: Record<string, boolean> }) => void;
  onLegendUnselect?: (params: { name: string; selected: Record<string, boolean> }) => void;
  onTooltipShow?: (params: unknown) => void;
  onTooltipHide?: (params: unknown) => void;
}

export interface ChartLinkageConfig {
  linkedChartIds?: string[];
  enableClickLinkage?: boolean;
  enableZoomLinkage?: boolean;
  enableLegendLinkage?: boolean;
}

export interface UseChartEventsOptions extends ChartEventHandlers {
  chartId?: string;
  linkageConfig?: ChartLinkageConfig;
}

export function useChartEvents(
  adapterRef: React.MutableRefObject<Adapter | null>,
  options: UseChartEventsOptions
) {
  const handlersRef = useRef(options);
  handlersRef.current = options;

  useEffect(() => {
    const adapter = adapterRef.current;
    if (!adapter) return;

    const instance = adapter.getInstance();
    if (!instance) return;

    const { chartId, linkageConfig = {} } = handlersRef.current;

    // Click 事件
    if (handlersRef.current.onClick) {
      instance.on('click', handlersRef.current.onClick);

      // 点击联动
      if (linkageConfig.enableClickLinkage && chartId && linkageConfig.linkedChartIds) {
        linkageConfig.linkedChartIds.forEach((linkedChartId) => {
          const linkedChart = getChart(linkedChartId);
          if (linkedChart) {
            linkedChart.dispatchAction({ type: 'highlight', name: '' });
          }
        });
      }
    }

    // DataZoom 事件
    if (handlersRef.current.onDataZoom || handlersRef.current.onZoom) {
      instance.on('datazoom', (params: unknown) => {
        handlersRef.current.onDataZoom?.(params);

        if (handlersRef.current.onZoom) {
          const p = params as { start?: number; end?: number; dataZoomIndex?: number };
          handlersRef.current.onZoom({
            start: p.start || 0,
            end: p.end || 100,
            dataZoomIndex: p.dataZoomIndex || 0,
          });
        }

        // 缩放联动
        if (linkageConfig.enableZoomLinkage && chartId && linkageConfig.linkedChartIds) {
          linkageConfig.linkedChartIds.forEach((linkedChartId) => {
            const linkedChart = getChart(linkedChartId);
            if (linkedChart) {
              const p = params as { start?: number; end?: number; dataZoomIndex?: number };
              linkedChart.dispatchAction({
                type: 'dataZoom',
                start: p.start,
                end: p.end,
                dataZoomIndex: p.dataZoomIndex,
              });
            }
          });
        }
      });
    }

    // Legend 事件
    if (handlersRef.current.onLegendSelect || handlersRef.current.onLegendUnselect) {
      instance.on('legendselectchanged', (params: unknown) => {
        const p = params as { name: string; selected: Record<string, boolean> };

        // Legend 联动
        if (linkageConfig.enableLegendLinkage && chartId && linkageConfig.linkedChartIds) {
          linkageConfig.linkedChartIds.forEach((linkedChartId) => {
            const linkedChart = getChart(linkedChartId);
            if (linkedChart) {
              linkedChart.setOption({ legend: { selected: p.selected } });
            }
          });
        }

        if (p.selected[p.name]) {
          handlersRef.current.onLegendSelect?.(p);
        } else {
          handlersRef.current.onLegendUnselect?.(p);
        }
      });
    }

    // Tooltip 事件
    if (handlersRef.current.onTooltipShow) {
      instance.on('tooltipshow', handlersRef.current.onTooltipShow);
    }
    if (handlersRef.current.onTooltipHide) {
      instance.on('tooltiphide', handlersRef.current.onTooltipHide);
    }

    return () => {
      if (handlersRef.current.onClick) {
        instance.off('click', handlersRef.current.onClick);
      }
      if (handlersRef.current.onDataZoom || handlersRef.current.onZoom) {
        instance.off('datazoom');
      }
      if (handlersRef.current.onLegendSelect || handlersRef.current.onLegendUnselect) {
        instance.off('legendselectchanged');
      }
      if (handlersRef.current.onTooltipShow) {
        instance.off('tooltipshow');
      }
      if (handlersRef.current.onTooltipHide) {
        instance.off('tooltiphide');
      }
    };
  }, [adapterRef]);
}
