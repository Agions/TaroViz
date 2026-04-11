/**
 * TaroViz 动画管理器
 * 负责管理图表动画的配置、预设和执行
 */

import {
  AnimationConfig,
  AnimationPreset,
  AnimationTemplate,
  AnimationManagerConfig,
  AnimationType,
  AnimationEventType,
  AnimationEventHandler,
  AnimationEventData,
  EChartsAnimationConfigResult,
} from './types';

/**
 * Checks the OS/browser prefers-reduced-motion setting.
 * Returns true if the user has requested reduced motion.
 */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Professional animation presets following frontend-design-pro skill guidelines:
 * - Easing: cubic-bezier(0.16, 1, 0.3, 1) ("cubicOut") for natural deceleration
 * - Durations: 100-200ms micro, 300-500ms transitions, never >600ms
 * - NO bounce/elastic — anti-patterns that feel廉价 (cheap)
 */
const DEFAULT_ANIMATION_PRESETS: AnimationPreset[] = [
  {
    name: 'default',
    description: '默认动画配置 — 专业级 (300-500ms, cubicOut)',
    config: {
      enabled: true,
      duration: 400,
      easing: 'cubicOut',
      appearDuration: 450,
      appearEasing: 'cubicOut',
      updateDuration: 300,
      updateEasing: 'cubicOut',
      disappearDuration: 250,
      disappearEasing: 'cubicIn',
      threshold: 1000,
      progressive: true,
      progressiveStep: 500,
    },
  },
  {
    name: 'fast',
    description: '快速动画配置 — 微交互 (150-200ms)',
    config: {
      enabled: true,
      duration: 150,
      easing: 'cubicOut',
      appearDuration: 200,
      appearEasing: 'cubicOut',
      updateDuration: 150,
      updateEasing: 'cubicOut',
      disappearDuration: 100,
      disappearEasing: 'cubicIn',
      threshold: 2000,
      progressive: true,
      progressiveStep: 1000,
    },
  },
  {
    name: 'slow',
    description: '慢速动画配置 — 页面过渡 (500-600ms, capped)',
    config: {
      enabled: true,
      duration: 500,
      easing: 'cubicInOut',
      appearDuration: 600,
      appearEasing: 'cubicInOut',
      updateDuration: 400,
      updateEasing: 'cubicInOut',
      disappearDuration: 300,
      disappearEasing: 'cubicInOut',
      threshold: 500,
      progressive: true,
      progressiveStep: 250,
    },
  },
  // DEPRECATED — bounce is an anti-pattern per frontend-design-pro skill
  {
    name: 'bounce',
    description: '[已废弃] 弹跳动画 — 请使用 default 或 fast',
    config: {
      enabled: false, // disabled by default — anti-pattern
      duration: 0,
      easing: 'cubicOut',
      appearDuration: 0,
      appearEasing: 'cubicOut',
      updateDuration: 0,
      updateEasing: 'cubicOut',
      disappearDuration: 0,
      disappearEasing: 'cubicIn',
      threshold: 500,
      progressive: false,
      progressiveStep: 250,
    },
  },
  // DEPRECATED — elastic is an anti-pattern per frontend-design-pro skill
  {
    name: 'elastic',
    description: '[已废弃] 弹性动画 — 请使用 default 或 fast',
    config: {
      enabled: false, // disabled by default — anti-pattern
      duration: 0,
      easing: 'cubicOut',
      appearDuration: 0,
      appearEasing: 'cubicOut',
      updateDuration: 0,
      updateEasing: 'cubicOut',
      disappearDuration: 0,
      disappearEasing: 'cubicIn',
      threshold: 500,
      progressive: false,
      progressiveStep: 250,
    },
  },
];

/**
 * 动画管理器类
 */
export class AnimationManager {
  private static instance: AnimationManager;
  private presets: Map<string, AnimationPreset> = new Map();
  private templates: Map<string, AnimationTemplate> = new Map();
  private defaultConfig: AnimationConfig;
  private performanceConfig: AnimationManagerConfig['performance'];
  private eventHandlers: Map<string, Set<AnimationEventHandler>> = new Map();

  /**
   * 私有构造函数
   */
  private constructor(config?: AnimationManagerConfig) {
    // 初始化默认配置
    this.defaultConfig = config?.defaultConfig || DEFAULT_ANIMATION_PRESETS[0].config;
    this.performanceConfig = config?.performance || {
      monitor: false,
      frameRate: 60,
      hardwareAcceleration: true,
    };

    // 注册默认预设
    this.registerPresets(DEFAULT_ANIMATION_PRESETS);
  }

  /**
   * 获取动画管理器实例
   */
  public static getInstance(config?: AnimationManagerConfig): AnimationManager {
    if (!AnimationManager.instance) {
      AnimationManager.instance = new AnimationManager(config);
    } else if (config) {
      // 如果传入了新配置，更新配置
      AnimationManager.instance.updateConfig(config);
    }
    return AnimationManager.instance;
  }

  /**
   * 注册动画预设
   */
  public registerPreset(preset: AnimationPreset): void {
    this.presets.set(preset.name, preset);
  }

  /**
   * 批量注册动画预设
   */
  public registerPresets(presets: AnimationPreset[]): void {
    presets.forEach((preset) => this.registerPreset(preset));
  }

  /**
   * 获取动画预设
   */
  public getPreset(name: string): AnimationPreset | undefined {
    return this.presets.get(name);
  }

  /**
   * 获取所有动画预设
   */
  public getAllPresets(): AnimationPreset[] {
    return Array.from(this.presets.values());
  }

  /**
   * 注册动画模板
   */
  public registerTemplate(template: AnimationTemplate): void {
    this.templates.set(template.name, template);
  }

  /**
   * 获取动画模板
   */
  public getTemplate(name: string): AnimationTemplate | undefined {
    return this.templates.get(name);
  }

  /**
   * 获取所有动画模板
   */
  public getAllTemplates(): AnimationTemplate[] {
    return Array.from(this.templates.values());
  }

  /**
   * 设置默认动画配置
   */
  public setDefaultConfig(config: AnimationConfig): void {
    this.defaultConfig = config;
  }

  /**
   * 获取默认动画配置
   */
  public getDefaultConfig(): AnimationConfig {
    return this.defaultConfig;
  }

  /**
   * 根据数据量和动画类型获取优化后的动画配置
   * 尊重 prefers-reduced-motion 无障碍设置
   */
  public getOptimizedConfig(
    config: Partial<AnimationConfig> = {},
    dataLength: number = 0
  ): AnimationConfig {
    // 合并配置：用户配置 > 默认配置
    const mergedConfig: AnimationConfig = {
      ...this.defaultConfig,
      ...config,
    };

    // Respect OS/browser prefers-reduced-motion setting (WCAG)
    if (prefersReducedMotion()) {
      return {
        ...mergedConfig,
        enabled: false,
        duration: 0,
        appearDuration: 0,
        updateDuration: 0,
        disappearDuration: 0,
      };
    }

    // 根据数据量优化动画
    if (mergedConfig.threshold && dataLength > mergedConfig.threshold) {
      mergedConfig.enabled = false;
    }

    return mergedConfig;
  }

  /**
   * 根据动画类型获取对应的动画配置
   */
  public getAnimationConfigByType(
    config: AnimationConfig,
    animationType: AnimationType
  ): {
    duration: number;
    easing: string;
  } {
    switch (animationType) {
      case 'appear':
        return {
          duration: config.appearDuration || config.duration || 1000,
          easing: config.appearEasing || config.easing || 'cubicOut',
        };
      case 'update':
        return {
          duration: config.updateDuration || config.duration || 800,
          easing: config.updateEasing || config.easing || 'cubicOut',
        };
      case 'disappear':
        return {
          duration: config.disappearDuration || config.duration || 600,
          easing: config.disappearEasing || config.easing || 'cubicIn',
        };
      case 'emphasis':
        return {
          duration: config.duration || 300,
          easing: config.easing || 'cubicOut',
        };
      default:
        return {
          duration: config.duration || 1000,
          easing: config.easing || 'cubicOut',
        };
    }
  }

  /**
   * 生成ECharts动画配置
   */
  public generateEChartsAnimationConfig(
    config: Partial<AnimationConfig> = {},
    dataLength: number = 0
  ): EChartsAnimationConfigResult {
    const optimizedConfig = this.getOptimizedConfig(config, dataLength);

    if (!optimizedConfig.enabled) {
      return {
        animation: false,
      };
    }

    return {
      animation: true,
      animationDuration: optimizedConfig.duration,
      animationEasing: optimizedConfig.easing,
      animationDelay: optimizedConfig.delay,
      animationDurationUpdate: optimizedConfig.updateDuration,
      animationEasingUpdate: optimizedConfig.updateEasing,
      animationDelayUpdate: optimizedConfig.delay,
      animationThreshold: optimizedConfig.threshold,
      progressive: optimizedConfig.progressive,
      progressiveThreshold: optimizedConfig.progressiveStep,
      progressiveChunkMode: 'sequential',
    };
  }

  /**
   * 绑定动画事件
   */
  public on(eventType: AnimationEventType, handler: AnimationEventHandler): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, new Set());
    }
    this.eventHandlers.get(eventType)?.add(handler);
  }

  /**
   * 解绑动画事件
   */
  public off(eventType: AnimationEventType, handler?: AnimationEventHandler): void {
    if (!handler) {
      this.eventHandlers.delete(eventType);
      return;
    }
    this.eventHandlers.get(eventType)?.delete(handler);
  }

  /**
   * 触发动画事件
   */
  public emit(eventType: AnimationEventType, data: AnimationEventData): void {
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(data);
        } catch (error) {
          console.error(`Error in animation event handler:`, error);
        }
      });
    }
  }

  /**
   * 更新性能配置
   */
  public updatePerformanceConfig(config: AnimationManagerConfig['performance']): void {
    this.performanceConfig = {
      ...this.performanceConfig,
      ...config,
    };
  }

  /**
   * 更新配置
   */
  public updateConfig(config: AnimationManagerConfig): void {
    if (config.defaultConfig) {
      this.defaultConfig = config.defaultConfig;
    }
    if (config.performance) {
      this.updatePerformanceConfig(config.performance);
    }
  }

  /**
   * 获取性能配置
   */
  public getPerformanceConfig(): AnimationManagerConfig['performance'] {
    return this.performanceConfig;
  }

  /**
   * 重置动画管理器
   */
  public reset(): void {
    this.presets.clear();
    this.templates.clear();
    this.eventHandlers.clear();
    this.registerPresets(DEFAULT_ANIMATION_PRESETS);
  }
}

/**
 * 创建动画配置
 */
export function createAnimationConfig(config: Partial<AnimationConfig> = {}): AnimationConfig {
  const manager = AnimationManager.getInstance();
  return manager.getOptimizedConfig(config);
}

/**
 * 获取动画预设配置
 */
export function getAnimationPreset(name: string): AnimationPreset | undefined {
  const manager = AnimationManager.getInstance();
  return manager.getPreset(name);
}

/**
 * 生成ECharts动画配置
 */
export function generateEChartsAnimationConfig(
  config: Partial<AnimationConfig> = {},
  dataLength: number = 0
): EChartsAnimationConfigResult {
  const manager = AnimationManager.getInstance();
  return manager.generateEChartsAnimationConfig(config, dataLength);
}
