/**
 * TaroViz 完整导出包 (@agions/taroviz)
 * 包含所有子包的功能
 */

// 导入所有子包
import * as AdaptersLib from '@agions/taroviz-adapters';
import * as ChartsLib from '@agions/taroviz-charts';
import * as CoreLib from '@agions/taroviz-core';
import * as DataLib from '@agions/taroviz-data';
import * as HooksLib from '@agions/taroviz-hooks';
import HooksDefault from '@agions/taroviz-hooks';
import * as ThemesLib from '@agions/taroviz-themes';

// 导出命名空间
export const Core = CoreLib;
export const Adapters = AdaptersLib;
export const Charts = ChartsLib;
export const Themes = ThemesLib;
export const Data = DataLib;
export const Hooks = HooksLib;

// 导出适配器核心功能
export { getAdapter, detectPlatform, version as adaptersVersion } from '@agions/taroviz-adapters';

// 导出核心类型
export { version as coreVersion } from '@agions/taroviz-core';

// 从适配器导出所有适配器
export const { H5Adapter, WeappAdapter, AlipayAdapter, SwanAdapter, HarmonyAdapter } = AdaptersLib;

// 导出常用图表组件
export const { LineChart, BarChart, PieChart, RadarChart, ScatterChart, HeatmapChart } = ChartsLib;

// 导出Hooks功能
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
