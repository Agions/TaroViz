/**
 * TaroViz Core Bundle 类型声明
 * 整合所有分包的类型定义
 */

// 导出核心功能
export * from '@taroviz/core';

// 导出平台适配器
export * from '@taroviz/adapters';

// 导出图表组件
export * from '@taroviz/charts';

// 导出主题系统
export * from '@taroviz/themes';

// 导出数据处理工具
export * from '@taroviz/data';

// 导出 React Hooks
export * from '@taroviz/hooks';

/**
 * 库信息
 */
export const name: string;
export const version: string; 