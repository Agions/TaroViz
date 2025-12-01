/**
 * TaroViz 动画系统核心类型定义
 */

/**
 * 动画缓动函数类型
 */
export type AnimationEasing =
  | 'linear'
  | 'quadraticIn'
  | 'quadraticOut'
  | 'quadraticInOut'
  | 'cubicIn'
  | 'cubicOut'
  | 'cubicInOut'
  | 'quarticIn'
  | 'quarticOut'
  | 'quarticInOut'
  | 'quinticIn'
  | 'quinticOut'
  | 'quinticInOut'
  | 'sinusoidalIn'
  | 'sinusoidalOut'
  | 'sinusoidalInOut'
  | 'exponentialIn'
  | 'exponentialOut'
  | 'exponentialInOut'
  | 'circularIn'
  | 'circularOut'
  | 'circularInOut'
  | 'elasticIn'
  | 'elasticOut'
  | 'elasticInOut'
  | 'backIn'
  | 'backOut'
  | 'backInOut'
  | 'bounceIn'
  | 'bounceOut'
  | 'bounceInOut';

/**
 * 动画类型
 */
export type AnimationType = 'appear' | 'update' | 'disappear' | 'emphasis' | 'all';

/**
 * 动画配置接口
 */
export interface AnimationConfig {
  /**
   * 是否启用动画
   */
  enabled?: boolean;

  /**
   * 动画时长（毫秒）
   */
  duration?: number;

  /**
   * 动画缓动函数
   */
  easing?: AnimationEasing;

  /**
   * 初始动画时长（毫秒）
   */
  appearDuration?: number;

  /**
   * 初始动画缓动函数
   */
  appearEasing?: AnimationEasing;

  /**
   * 更新动画时长（毫秒）
   */
  updateDuration?: number;

  /**
   * 更新动画缓动函数
   */
  updateEasing?: AnimationEasing;

  /**
   * 消失动画时长（毫秒）
   */
  disappearDuration?: number;

  /**
   * 消失动画缓动函数
   */
  disappearEasing?: AnimationEasing;

  /**
   * 动画延迟（毫秒）
   */
  delay?: number;

  /**
   * 动画重复次数
   */
  repeat?: number;

  /**
   * 是否反向播放动画
   */
  reverse?: boolean;

  /**
   * 动画阈值
   * 当数据项数量超过此值时，自动关闭动画以提升性能
   */
  threshold?: number;

  /**
   * 是否启用渐进式动画
   */
  progressive?: boolean;

  /**
   * 渐进式动画的步长
   */
  progressiveStep?: number;
}

/**
 * 动画预设配置
 */
export interface AnimationPreset {
  /**
   * 预设名称
   */
  name: string;

  /**
   * 预设描述
   */
  description?: string;

  /**
   * 预设动画配置
   */
  config: AnimationConfig;

  /**
   * 适用的图表类型
   */
  chartTypes?: string[];
}

/**
 * 动画模板配置
 */
export interface AnimationTemplate {
  /**
   * 模板名称
   */
  name: string;

  /**
   * 模板描述
   */
  description?: string;

  /**
   * 模板动画配置
   */
  config: AnimationConfig;

  /**
   * 模板适用的场景
   */
  scenarios?: string[];
}

/**
 * 动画管理器配置
 */
export interface AnimationManagerConfig {
  /**
   * 默认动画配置
   */
  defaultConfig?: AnimationConfig;

  /**
   * 性能优化配置
   */
  performance?: {
    /**
     * 是否启用性能监控
     */
    monitor?: boolean;

    /**
     * 帧率限制
     */
    frameRate?: number;

    /**
     * 是否启用硬件加速
     */
    hardwareAcceleration?: boolean;
  };
}

/**
 * 动画事件类型
 */
export enum AnimationEventType {
  /**
   * 动画开始事件
   */
  ANIMATION_START = 'animationStart',

  /**
   * 动画更新事件
   */
  ANIMATION_UPDATE = 'animationUpdate',

  /**
   * 动画结束事件
   */
  ANIMATION_END = 'animationEnd',

  /**
   * 动画取消事件
   */
  ANIMATION_CANCEL = 'animationCancel',

  /**
   * 动画重复事件
   */
  ANIMATION_REPEAT = 'animationRepeat',
}

/**
 * 动画事件回调类型
 */
export type AnimationEventHandler = (event: {
  type: AnimationEventType;
  animationType: AnimationType;
  chartId?: string;
  seriesIndex?: number;
  dataIndex?: number;
  timestamp: number;
  duration: number;
}) => void;
