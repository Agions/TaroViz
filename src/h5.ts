/**
 * H5 平台特定入口
 */
import ECharts from './components/ECharts/h5';
import type { EChartsProps, EChartsRef } from './components/ECharts/types';

export default ECharts;
export type { EChartsProps, EChartsRef };

// 导出主题相关
export * from './components/ECharts/themes';

// 导出特定于H5平台的工具函数
export * from './components/ECharts/utils';