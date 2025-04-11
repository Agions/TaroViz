/**
 * TaroViz 核心组件库
 * 提供基础组件和工具函数
 */

// 类型定义
export * from './types';

// 工具函数
export * from './utils';

// 核心组件
export { default as BaseChart } from './components/BaseChart';

/**
 * 库信息
 */
export const name = 'taroviz';
export const version = '0.5.0'; 