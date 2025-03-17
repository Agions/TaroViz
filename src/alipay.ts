/**
 * 支付宝小程序平台特定入口
 */
import ECharts from './components/ECharts/alipay';
import type { EChartsProps, EChartsRef } from './components/ECharts/types';

export default ECharts;
export type { EChartsProps, EChartsRef };

// 导出主题相关
export * from './components/ECharts/themes';

// 导出特定于支付宝平台的工具函数
export * from './components/ECharts/utils';
