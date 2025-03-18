/**
 * Taro ECharts 类型定义索引
 */

// 重新导出所有类型
export * from './common';
// 避免重复导出相同名称的类型
export type {
  EChartsProps,
  // 其他需要从 props 导出的类型
} from './props';
// 选择性导出平台类型，避免冲突
export type {
  Adapter,
  H5AdapterOptions,
  WeappAdapterOptions,
  AlipayAdapterOptions,
  HarmonyAdapterOptions,
  MiniAppAdapterOptions
} from './platform';
export * from './events';

// 组件引用类型
import { ChartMethods } from './common';

// 使用类型别名，避免重复定义
export type EChartsRef = ChartMethods;
