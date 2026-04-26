/**
 * useAnimation - 图表动画控制 Hook
 * 提供图表动画的播放、暂停、控制等功能
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChartInstance } from './index';

/**
 * 动画状态
 */
export type AnimationStatus = 'playing' | 'paused' | 'stopped';

/**
 * 动画配置选项
 */
export interface UseAnimationOptions {
  /** 动画时长 (ms) */
  duration?: number;
  /** 动画缓动函数 */
  easing?: 'cubicOut' | 'cubicIn' | 'cubicInOut' | 'linear' | 'sinusoidalIn' | 'sinusoidalOut';
  /** 是否禁用动画 */
  disabled?: boolean;
  /** 动画延迟 (ms) */
  delay?: number;
  /** 是否循环 */
  loop?: boolean;
  /** 循环次数 (-1 表示无限) */
  loopCount?: number;
}

/**
 * 动画状态返回值
 */
export interface UseAnimationReturn {
  /** 当前动画状态 */
  status: AnimationStatus;
  /** 当前动画帧 */
  frame: number;
  /** 总帧数 */
  totalFrames: number;
  /** 动画进度 (0-1) */
  progress: number;
  /** 播放动画 */
  play: () => void;
  /** 暂停动画 */
  pause: () => void;
  /** 停止动画并重置 */
  stop: () => void;
  /** 跳转到指定帧 */
  seekTo: (frame: number) => void;
  /** 跳转到指定进度 */
  seekToProgress: (progress: number) => void;
  /** 设置播放速度 */
  setPlaybackSpeed: (speed: number) => void;
  /** 播放速度 */
  playbackSpeed: number;
}

/**
 * 使用图表动画控制
 * @param chartInstance 图表实例
 * @param options 配置选项
 * @returns 动画控制接口
 */
export function useAnimation(
  chartInstance: ChartInstance | null,
  options: UseAnimationOptions = {}
): UseAnimationReturn {
  const {
    duration = 1000,
    easing = 'cubicOut',
    disabled = false,
    delay = 0,
    loop = false,
    loopCount = -1,
  } = options;

  // State
  const [status, setStatus] = useState<AnimationStatus>('stopped');
  const [frame, setFrame] = useState(0);
  const [playbackSpeed, setPlaybackSpeedState] = useState(1);

  // Refs
  const chartRef = useRef<ChartInstance | null>(null);
  chartRef.current = chartInstance;

  // Animation state ref — tracks RAF id, start time, current frame, loop count, paused flag
  const animationRef = useRef<{
    animationId: number | null;
    startTime: number;
    currentFrame: number;
    loopCounter: number;
    isPaused: boolean;
  }>({
    animationId: null,
    startTime: 0,
    currentFrame: 0,
    loopCounter: 0,
    isPaused: false,
  });

  // 缓动函数使用 ref 避免闭包问题
  const easingFunctionsRef = useRef<Record<string, (t: number) => number>>({
    cubicOut: (t) => 1 - Math.pow(1 - t, 3),
    cubicIn: (t) => t * t * t,
    cubicInOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    linear: (t) => t,
    sinusoidalIn: (t) => 1 - Math.cos((t * Math.PI) / 2),
    sinusoidalOut: (t) => Math.sin((t * Math.PI) / 2),
  });

  // 计算总帧数（假设 60fps）
  const totalFrames = Math.ceil((duration / 1000) * 60);

  // 缓动函数注入（供 animate 使用）
  easingFunctionsRef.current = {
    cubicOut: (t) => 1 - Math.pow(1 - t, 3),
    cubicIn: (t) => t * t * t,
    cubicInOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    linear: (t) => t,
    sinusoidalIn: (t) => 1 - Math.cos((t * Math.PI) / 2),
    sinusoidalOut: (t) => Math.sin((t * Math.PI) / 2),
  };

  // 计算当前进度对应的帧
  const calculateFrame = useCallback(
    (progress: number) => {
      return Math.floor(progress * totalFrames);
    },
    [totalFrames]
  );

  // 设置播放速度
  const setPlaybackSpeed = useCallback((speed: number) => {
    setPlaybackSpeedState(Math.max(0.1, Math.min(10, speed)));
  }, []);

  // 动画更新函数
  const animate = useCallback(() => {
    const anim = animationRef.current;
    const chart = chartRef.current;
    if (!chart || anim.isPaused || disabled) return;

    const elapsed = performance.now() - anim.startTime;
    const adjustedDuration = duration / playbackSpeed;
    const effectiveElapsed = anim.isPaused ? 0 : elapsed - delay;

    if (effectiveElapsed < 0) {
      anim.animationId = requestAnimationFrame(animate);
      return;
    }

    // 计算当前进度
    let progress = Math.min(effectiveElapsed / adjustedDuration, 1);
    progress = easingFunctionsRef.current[easing](progress);

    // 计算当前帧
    const currentFrame = calculateFrame(progress);
    anim.currentFrame = currentFrame;

    setFrame(currentFrame);

    // 更新图表配置以反映动画进度
    try {
      if (chart.setOption && !anim.isPaused) {
        chart.setOption({}, false, true);
      }
    } catch (e) {
      console.warn('[useAnimation] Failed to update chart:', e);
    }

    // 检查是否完成
    if (effectiveElapsed >= adjustedDuration) {
      if (loop && (loopCount === -1 || anim.loopCounter < loopCount)) {
        anim.loopCounter++;
        anim.startTime = performance.now();
        anim.isPaused = false;
        setStatus('playing');
      } else {
        setStatus('stopped');
        anim.animationId = null;
        return;
      }
    }

    anim.animationId = requestAnimationFrame(animate);
  }, [duration, delay, loop, loopCount, playbackSpeed, disabled, easing, calculateFrame]);

  // 播放动画
  const playRef = useRef<() => void>(() => {});
  playRef.current = () => {
    const chart = chartRef.current;
    if (!chart || disabled) return;

    const anim = animationRef.current;
    if (status === 'paused') {
      anim.isPaused = false;
      anim.startTime = performance.now() - (anim.currentFrame / totalFrames) * duration;
      setStatus('playing');
    } else {
      anim.startTime = performance.now();
      anim.currentFrame = 0;
      anim.loopCounter = 0;
      anim.isPaused = false;
      setStatus('playing');
    }

    if (anim.animationId === null) {
      anim.animationId = requestAnimationFrame(animate);
    }
  };

  const play = useCallback(() => {
    playRef.current();
  }, []);

  // 暂停动画
  const pause = useCallback(() => {
    const anim = animationRef.current;
    anim.isPaused = true;
    setStatus('paused');
  }, []);

  // 停止动画并重置
  const stop = useCallback(() => {
    const anim = animationRef.current;

    if (anim.animationId !== null) {
      cancelAnimationFrame(anim.animationId);
      anim.animationId = null;
    }

    anim.isPaused = false;
    anim.currentFrame = 0;
    anim.loopCounter = 0;
    setStatus('stopped');
    setFrame(0);
  }, []);

  // 跳转到指定帧
  const seekTo = useCallback(
    (targetFrame: number) => {
      const anim = animationRef.current;
      const chart = chartRef.current;
      if (!chart) return;

      const currentTotalFrames = Math.ceil((duration / 1000) * 60);
      const clampedFrame = Math.max(0, Math.min(currentTotalFrames, targetFrame));
      anim.currentFrame = clampedFrame;
      setFrame(clampedFrame);

      const progress = clampedFrame / currentTotalFrames;
      try {
        if (chart.setOption) {
          chart.setOption({}, false, true);
        }
      } catch (e) {
        console.warn('[useAnimation] Failed to seek:', e);
      }
    },
    [duration]
  );

  // 跳转到指定进度
  const seekToProgress = useCallback(
    (progress: number) => {
      const targetProgress = Math.max(0, Math.min(1, progress));
      const targetFrame = calculateFrame(targetProgress);
      seekTo(targetFrame);
    },
    [calculateFrame, seekTo]
  );

  // 进度
  const progress = totalFrames > 0 ? frame / totalFrames : 0;

  // 清理
  useEffect(() => {
    return () => {
      const anim = animationRef.current;
      if (anim.animationId !== null) {
        cancelAnimationFrame(anim.animationId);
      }
    };
  }, []);

  // 组件卸载时停止动画
  useEffect(() => {
    if (!chartInstance) {
      stop();
    }
  }, [chartInstance, stop]);

  return {
    status,
    frame,
    totalFrames,
    progress,
    play,
    pause,
    stop,
    seekTo,
    seekToProgress,
    setPlaybackSpeed,
    playbackSpeed,
  };
}

/**
 * 渐进式加载动画 Hook
 * 用于大数据的分批次加载动画
 */
export interface UseProgressiveLoadingOptions {
  /** 每批加载的数据量 */
  batchSize?: number;
  /** 批次间隔 (ms) */
  interval?: number;
  /** 是否自动开始 */
  autoStart?: boolean;
  /** 加载完成回调 */
  onBatchLoaded?: (batchIndex: number, totalBatches: number) => void;
  /** 全部加载完成回调 */
  onComplete?: () => void;
}

export interface UseProgressiveLoadingReturn {
  /** 当前批次 */
  currentBatch: number;
  /** 总批次数 */
  totalBatches: number;
  /** 加载进度 */
  progress: number;
  /** 是否正在加载 */
  isLoading: boolean;
  /** 开始加载 */
  start: () => void;
  /** 暂停加载 */
  pause: () => void;
  /** 停止加载 */
  stop: () => void;
  /** 重置 */
  reset: () => void;
}

export function useProgressiveLoading(
  totalCount: number,
  options: UseProgressiveLoadingOptions = {}
): UseProgressiveLoadingReturn {
  const {
    batchSize = 1000,
    interval = 100,
    autoStart = false,
    onBatchLoaded,
    onComplete,
  } = options;

  const totalBatches = Math.ceil(totalCount / batchSize);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const progress = totalBatches > 0 ? currentBatch / totalBatches : 0;

  const start = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);
    setCurrentBatch(0);

    intervalRef.current = window.setInterval(() => {
      setCurrentBatch((prev) => {
        const next = prev + 1;
        onBatchLoaded?.(next, totalBatches);

        if (next >= totalBatches) {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsLoading(false);
          onComplete?.();
          return totalBatches;
        }

        return next;
      });
    }, interval);
  }, [isLoading, interval, totalBatches, onBatchLoaded, onComplete]);

  const pause = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsLoading(false);
  }, []);

  const stop = useCallback(() => {
    pause();
    setCurrentBatch(0);
  }, [pause]);

  const reset = useCallback(() => {
    stop();
  }, [stop]);

  useEffect(() => {
    if (autoStart) {
      start();
    }
  }, [autoStart, start]);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    currentBatch,
    totalBatches,
    progress,
    isLoading,
    start,
    pause,
    stop,
    reset,
  };
}

export default useAnimation;
