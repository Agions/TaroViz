/**
 * TaroViz 完整导出包 (@taroviz)
 * 包含所有子包的功能
 */

// 导出核心API
import * as CoreLib from '@taroviz/core';
export const Core = CoreLib;

// 导出适配器API
import * as AdaptersLib from '@taroviz/adapters';
export const Adapters = AdaptersLib;

// 导出图表组件API
import * as ChartsLib from '@taroviz/charts';
export const Charts = ChartsLib;

// 导出主题系统API
import * as ThemesLib from '@taroviz/themes';
export const Themes = ThemesLib;

// 导出数据处理API
import * as DataLib from '@taroviz/data';
export const Data = DataLib;

// 导出Hooks API
import * as HooksLib from '@taroviz/hooks';
export const Hooks = HooksLib;

// 导出便于使用的适配器默认导出
import H5 from '@taroviz/adapters/h5';
import Weapp from '@taroviz/adapters/weapp';
import Alipay from '@taroviz/adapters/alipay';
import Swan from '@taroviz/adapters/swan';
import Harmony from '@taroviz/adapters/harmony';

// 便于使用的适配器导出
export const H5Adapter = H5;
export const WeappAdapter = Weapp;
export const AlipayAdapter = Alipay;
export const SwanAdapter = Swan;
export const HarmonyAdapter = Harmony;

// 导出核心类型（不再从@taroviz/adapters再次导出相同名称的类型）
export {
  BaseChart,
  version as coreVersion
} from '@taroviz/core';

// 导出适配器核心功能
export {
  getAdapter,
  getEnv,
  detectPlatform,
  version as adaptersVersion
} from '@taroviz/adapters';

// 导出常用图表组件
export {
  LineChart,
  BarChart,
  PieChart,
  RadarChart,
  ScatterChart,
  HeatmapChart
} from '@taroviz/charts';

// 导出Hooks功能，通过中间变量避免名称冲突
import HooksDefault from '@taroviz/hooks';
export const {
  useChart,
  useOption,
  useResize,
  useEvents,
  useLoading,
  useChartTheme,
  useChartData
} = HooksDefault;

// 包信息
export const name = '@taroviz';
export const version = '0.5.0';

// 默认导出
export default {
  Core: CoreLib,
  Adapters: AdaptersLib,
  Charts: ChartsLib,
  Themes: ThemesLib,
  Data: DataLib,
  Hooks: HooksLib,
  getAdapter: AdaptersLib.getAdapter,
  H5Adapter,
  WeappAdapter
}; 