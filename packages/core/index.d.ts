/**
 * TaroViz Core 类型定义
 */

// 导出类型定义
export * from './src/types';

// 导出工具函数
export * from './src/utils';

// 导出核心组件
export { default as BaseChart } from './src/components/BaseChart';

/**
 * 库信息
 */
export const name: string;
export const version: string; 