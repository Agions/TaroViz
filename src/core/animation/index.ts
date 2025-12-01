/**
 * TaroViz 动画系统入口文件
 */

// 导出类型定义
export * from './types';

// 导出动画管理器
export { AnimationManager } from './AnimationManager';

// 导出工具函数
export {
  createAnimationConfig,
  getAnimationPreset,
  generateEChartsAnimationConfig,
} from './AnimationManager';

// 导出默认动画管理器实例
import { AnimationManager } from './AnimationManager';
export const animationManager = AnimationManager.getInstance();
