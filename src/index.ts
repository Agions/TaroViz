/**
 * Taro ECharts 组件
 *
 * 这是一个多端兼容的 ECharts 组件，支持以下平台：
 * - H5
 * - 微信小程序
 * - 支付宝小程序
 * - React Native
 * - 鸿蒙OS
 *
 * 使用方法：
 * ```tsx
 * import ECharts from 'tarojs-echarts';
 *
 * // 在组件中使用
 * <ECharts
 *   option={option}
 *   width="100%"
 *   height="300px"
 *   theme="light"
 *   onChartReady={(chart) => {}}
 * />
 * ```
 */

import { PlatformType } from './components/ECharts/types/common';

// 根据当前环境导出对应的组件
let ECharts;

if (process.env.TARO_ENV === PlatformType.WEAPP) {
  ECharts = require('./components/ECharts/weapp').default;
} else if (process.env.TARO_ENV === PlatformType.ALIPAY) {
  ECharts = require('./components/ECharts/alipay').default;
} else if (process.env.TARO_ENV === PlatformType.HARMONY) {
  ECharts = require('./components/ECharts/harmony').default;
} else {
  // 默认导出H5组件
  ECharts = require('./components/ECharts/h5').default;
}

export { ECharts };
export default ECharts;

// 导出工具函数
export * from './components/ECharts/utils';

// 导出类型定义
export * from './components/ECharts/types/common';
// 选择性导出平台类型，避免冲突
export {
  Adapter,
  AdapterOptions,
  H5AdapterOptions,
  WeappAdapterOptions,
  AlipayAdapterOptions,
  HarmonyAdapterOptions,
  MiniAppAdapterOptions
} from './components/ECharts/types/platform';
export * from './components/ECharts/types/events';
