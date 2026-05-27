/**
 * usePerformance - 图表性能监控 Hook
 * 提供实时性能指标监控和报告功能
 */
import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * 性能监控配置
 */
export interface UseFpsMonitorOptions {
  /** 是否启用监控 */
  enabled?: boolean;
  /** 采样间隔 (ms) */
  sampleInterval?: number;
  /** 是否显示实时 FPS */
  showFPS?: boolean;
  /** FPS 告警阈值 */
  fpsWarningThreshold?: number;
  /** FPS 严重告警阈值 */
  fpsCriticalThreshold?: number;
  /** 自动启动 */
  autoStart?: boolean;
}

/**
 * 性能指标状态
 */
export interface PerformanceState {
  /** 当前 FPS */
  fps: number;
  /** 平均 FPS */
  avgFps: number;
  /** 最低 FPS */
  minFps: number;
  /** 最高 FPS */
  maxFps: number;
  /** FPS 状态: normal | warning | critical */
  fpsStatus: 'normal' | 'warning' | 'critical';
  /** 帧率历史 */
  fpsHistory: number[];
  /** 是否正在监控 */
  isMonitoring: boolean;
}

/**
 * 性能报告条目
 */
export interface PerformanceReportEntry {
  type: string;
  value: number;
  unit: string;
  timestamp: number;
}

/**
 * 性能监控返回值
 */
export interface UseFpsMonitorReturn {
  /** 性能状态 */
  state: PerformanceState;
  /** 开始监控 */
  start: () => void;
  /** 停止监控 */
  stop: () => void;
  /** 重置统计数据 */
  reset: () => void;
  /** 获取性能报告 */
  getReport: () => PerformanceReportEntry[];
  /** FPS 告警回调 */
  onFpsWarning?: (fps: number) => void;
}

/**
 * 使用图表性能监控
 * @param options 配置选项
 * @returns 性能监控接口
 */
/** @deprecated Use `UseFpsMonitorOptions` instead */
export type UsePerformanceOptions = UseFpsMonitorOptions;

/** @deprecated Use `UseFpsMonitorReturn` instead */
export type UsePerformanceReturn = UseFpsMonitorReturn;

export function useFpsMonitor(options: UseFpsMonitorOptions = {}): UseFpsMonitorReturn {
  const {
    enabled = true,
    sampleInterval = 1000,
    showFPS = true,
    fpsWarningThreshold = 30,
    fpsCriticalThreshold = 15,
    autoStart = true,
  } = options;

  // Refs
  const fpsHistoryRef = useRef<number[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const fpsAccumulatorRef = useRef<{ frames: number; lastTime: number }>({
    frames: 0,
    lastTime: 0,
  });
  const reportHistoryRef = useRef<PerformanceReportEntry[]>([]);

  // State
  const [state, setState] = useState<PerformanceState>({
    fps: 60,
    avgFps: 60,
    minFps: 60,
    maxFps: 60,
    fpsStatus: 'normal',
    fpsHistory: [],
    isMonitoring: false,
  });

  /**
   * 计算 FPS 状态
   */
  const calculateFpsStatus = useCallback(
    (fps: number): 'normal' | 'warning' | 'critical' => {
      if (fps <= fpsCriticalThreshold) return 'critical';
      if (fps <= fpsWarningThreshold) return 'warning';
      return 'normal';
    },
    [fpsWarningThreshold, fpsCriticalThreshold]
  );

  /**
   * 更新 FPS 计算
   */
  const updateFps = useCallback(() => {
    if (!enabled) return;

    const now = performance.now();
    const delta = now - lastFrameTimeRef.current;
    lastFrameTimeRef.current = now;

    // 累积帧数
    fpsAccumulatorRef.current.frames++;

    // 每秒计算一次 FPS
    if (now - fpsAccumulatorRef.current.lastTime >= 1000) {
      const fps = Math.round(
        (fpsAccumulatorRef.current.frames * 1000) / (now - fpsAccumulatorRef.current.lastTime)
      );
      const history = fpsHistoryRef.current;

      // 更新历史
      history.push(fps);
      if (history.length > 60) {
        history.shift();
      }

      // 计算统计数据
      const avgFps = Math.round(history.reduce((a, b) => a + b, 0) / history.length);
      const minFps = Math.min(...history);
      const maxFps = Math.max(...history);

      setState((prev) => ({
        ...prev,
        fps,
        avgFps,
        minFps,
        maxFps,
        fpsStatus: calculateFpsStatus(fps),
        fpsHistory: [...history],
      }));

      // 记录性能报告
      reportHistoryRef.current.push({
        type: 'fps',
        value: fps,
        unit: 'fps',
        timestamp: now,
      });

      // 重置计数器
      fpsAccumulatorRef.current.frames = 0;
      fpsAccumulatorRef.current.lastTime = now;
    }

    // 继续下一帧
    animationFrameRef.current = requestAnimationFrame(updateFps);
  }, [enabled, calculateFpsStatus]);

  /**
   * 开始监控
   */
  const start = useCallback(() => {
    if (!enabled) return;

    // Prevent starting multiple RAF loops
    if (animationFrameRef.current !== null) return;

    // 重置 FPS 计算
    fpsAccumulatorRef.current = { frames: 0, lastTime: performance.now() };
    lastFrameTimeRef.current = performance.now();
    fpsHistoryRef.current = [];
    reportHistoryRef.current = [];

    // 开始 FPS 监控循环
    animationFrameRef.current = requestAnimationFrame(updateFps);

    setState((prev) => ({ ...prev, isMonitoring: true }));
  }, [enabled, updateFps]);

  /**
   * 停止监控
   */
  const stop = useCallback(() => {
    // 停止 FPS 监控
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setState((prev) => ({ ...prev, isMonitoring: false }));
  }, []);

  /**
   * 重置统计数据
   */
  const reset = useCallback(() => {
    fpsHistoryRef.current = [];
    reportHistoryRef.current = [];
    setState((prev) => ({
      ...prev,
      fps: 60,
      avgFps: 60,
      minFps: 60,
      maxFps: 60,
      fpsStatus: 'normal',
      fpsHistory: [],
    }));
  }, []);

  /**
   * 获取性能报告
   */
  const getReport = useCallback((): PerformanceReportEntry[] => {
    return reportHistoryRef.current.slice(-100); // 返回最近 100 条记录
  }, []);

  // 自动启动
  useEffect(() => {
    if (autoStart && enabled) {
      start();
    }

    return () => {
      stop();
    };
  }, [autoStart, enabled, start, stop]);

  return {
    state,
    start,
    stop,
    reset,
    getReport,
  };
}

/**
 * 轻量级 FPS 计数器 Hook
 * 用于实时显示图表 FPS
 */
export function useFpsCounter(): number {
  const [fps, setFps] = useState(60);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    let animationId: number;

    const tick = () => {
      frameCountRef.current++;
      const now = performance.now();
      const elapsed = now - lastTimeRef.current;

      if (elapsed >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / elapsed);
        setFps(currentFps);
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return fps;
}

/** @deprecated Use `useFpsMonitor` instead */
export const usePerformance = useFpsMonitor;
