/**
 * 性能监控 Hook
 * 负责图表性能数据的收集和上报
 */
import { useRef, useCallback } from 'react';
import { PerformanceAnalyzer } from '../../utils/performance';
import type { EChartsOption } from 'echarts';

export interface PerformanceData {
  renderTime: number;
  initTime: number;
  updateTime: number;
  dataSize: number;
}

export interface UsePerformanceOptions {
  enabled?: boolean;
  onPerformance?: (data: PerformanceData) => void;
}

export function usePerformance(options: UsePerformanceOptions = {}) {
  const { enabled = false, onPerformance } = options;

  const analyzerRef = useRef<PerformanceAnalyzer | null>(null);
  const perfRef = useRef({
    initStartTime: 0,
    initEndTime: 0,
    renderStartTime: 0,
    renderEndTime: 0,
    updateStartTime: 0,
    updateEndTime: 0,
    dataSize: 0,
  });

  /**
   * 初始化性能分析器
   */
  const initAnalyzer = useCallback(() => {
    if (!enabled) return;

    if (!analyzerRef.current) {
      analyzerRef.current = PerformanceAnalyzer.getInstance({
        enabled: true,
        metrics: ['initTime', 'renderTime', 'updateTime', 'dataSize', 'frameRate'],
        sampleInterval: 1000,
        maxSamples: 100,
        realTime: true,
        autoStart: true,
      });
    }
  }, [enabled]);

  /**
   * 记录性能数据
   */
  const recordPerformance = useCallback(
    (type: 'init' | 'render' | 'update', _data?: unknown) => {
      const now = Date.now();
      const perf = perfRef.current;
      const _dataSize = 0; // 可通过参数传入

      switch (type) {
        case 'init':
          if (!perf.initStartTime) {
            perf.initStartTime = now;
          } else {
            perf.initEndTime = now;
            const initTime = perf.initEndTime - perf.initStartTime;

            if (analyzerRef.current) {
              analyzerRef.current.recordInitTime(initTime);
            }

            onPerformance?.({
              renderTime: 0,
              initTime,
              updateTime: 0,
              dataSize: perf.dataSize,
            });
          }
          break;

        case 'render':
          if (!perf.renderStartTime) {
            perf.renderStartTime = now;
          } else {
            perf.renderEndTime = now;
            const renderTime = perf.renderEndTime - perf.renderStartTime;

            if (analyzerRef.current) {
              analyzerRef.current.recordRenderTime(renderTime);
            }

            onPerformance?.({
              renderTime,
              initTime: perf.initEndTime - perf.initStartTime,
              updateTime: 0,
              dataSize: perf.dataSize,
            });
          }
          break;

        case 'update':
          if (!perf.updateStartTime) {
            perf.updateStartTime = now;
          } else {
            perf.updateEndTime = now;
            const updateTime = perf.updateEndTime - perf.updateStartTime;

            if (analyzerRef.current) {
              analyzerRef.current.recordUpdateTime(updateTime);
            }

            onPerformance?.({
              renderTime: 0,
              initTime: 0,
              updateTime,
              dataSize: perf.dataSize,
            });
          }
          break;
      }
    },
    [onPerformance]
  );

  /**
   * 计算数据大小
   */
  const calculateDataSize = useCallback((option?: EChartsOption): number => {
    if (!option) return 0;
    try {
      return JSON.stringify(option).length;
    } catch {
      return 0;
    }
  }, []);

  /**
   * 更新数据大小
   */
  const updateDataSize = useCallback(
    (option?: EChartsOption) => {
      perfRef.current.dataSize = calculateDataSize(option);
      if (analyzerRef.current && option) {
        analyzerRef.current.recordDataSize(option);
      }
    },
    [calculateDataSize]
  );

  /**
   * 获取性能分析器实例
   */
  const getAnalyzer = useCallback(() => {
    return analyzerRef.current;
  }, []);

  /**
   * 清理性能监控
   */
  const dispose = useCallback(() => {
    if (analyzerRef.current) {
      analyzerRef.current.dispose();
      analyzerRef.current = null;
    }
    perfRef.current = {
      initStartTime: 0,
      initEndTime: 0,
      renderStartTime: 0,
      renderEndTime: 0,
      updateStartTime: 0,
      updateEndTime: 0,
      dataSize: 0,
    };
  }, []);

  return {
    initAnalyzer,
    recordPerformance,
    calculateDataSize,
    updateDataSize,
    getAnalyzer,
    dispose,
  };
}
