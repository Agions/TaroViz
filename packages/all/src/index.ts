/**
 * TaroViz 完整导出包 (@agions/taroviz)
 * 包含所有子包的功能
 */

// 导出核心API
import * as CoreLib from '@agions/taroviz-core';
export const Core = CoreLib;

// 导出适配器API
import * as AdaptersLib from '@agions/taroviz-adapters';
export const Adapters = AdaptersLib;

// 导出图表组件API
import * as ChartsLib from '@agions/taroviz-charts';
export const Charts = ChartsLib;

// 导出主题系统API
export const Themes = ThemesLib;

// 导出数据处理API
import * as DataLib from '@agions/taroviz-data';
export const Data = DataLib;

// 导出Hooks API
import * as HooksLib from '@agions/taroviz-hooks';
export const Hooks = HooksLib;

// 导出适配器核心功能
export {
  getAdapter,
  getEnv,
  detectPlatform,
  version as adaptersVersion,
  H5Adapter,
  WeappAdapter,
  AlipayAdapter,
  SwanAdapter,
  HarmonyAdapter,
} from '@agions/taroviz-adapters';

// 导出核心类型
export { BaseChart, version as coreVersion } from '@agions/taroviz-core';

// 导出常用图表组件
export {
  LineChart,
  BarChart,
  PieChart,
  RadarChart,
  ScatterChart,
  HeatmapChart,
} from '@agions/taroviz-charts';

// 导出Hooks功能
import HooksDefault from '@agions/taroviz-hooks';
import * as ThemesLib from '@agions/taroviz-themes';
export const {
  useChart,
  useOption,
  useResize,
  useEvents,
  useLoading,
  useChartTheme,
  useChartData,
} = HooksDefault;

// 包信息
export const name = '@agions/taroviz';
export const version = '1.0.0';

// 默认导出
export default {
  Core: CoreLib,
  Adapters: AdaptersLib,
  Charts: ChartsLib,
  Themes: ThemesLib,
  Data: DataLib,
  Hooks: HooksLib,
  getAdapter: AdaptersLib.getAdapter,
  H5Adapter: AdaptersLib.H5Adapter,
  WeappAdapter: AdaptersLib.WeappAdapter,
  AlipayAdapter: AdaptersLib.AlipayAdapter,
  SwanAdapter: AdaptersLib.SwanAdapter,
  HarmonyAdapter: AdaptersLib.HarmonyAdapter,
};
