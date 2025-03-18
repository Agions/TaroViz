/**
 * Harmony平台入口文件
 */
import ECharts from './components/ECharts/harmony';

export default ECharts;
export * from './components/ECharts/utils';
export * from './components/ECharts/types/common';
// 选择性导出平台类型，避免冲突
export type {
  Adapter,
  HarmonyAdapterOptions,
  MiniAppAdapterOptions
} from './components/ECharts/types/platform';
export * from './components/ECharts/types/events';

// 导出主题相关
export * from './components/ECharts/themes';

// 导出特定于鸿蒙OS平台的工具函数
export * from './components/ECharts/utils';
