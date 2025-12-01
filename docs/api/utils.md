# 工具函数

TaroViz 提供了一系列实用工具函数，用于简化图表开发和管理。

## 1. 主题管理

### registerTheme

注册自定义主题。

#### 导入

```typescript
import { registerTheme } from '@agions/taroviz';
```

#### 类型定义

```typescript
function registerTheme(name: string, theme: object): void;
```

#### 参数

| 参数名 | 类型   | 描述         |
| ------ | ------ | ------------ |
| name   | string | 主题名称     |
| theme  | object | 主题配置对象 |

#### 示例

```typescript
registerTheme('custom-theme', {
  color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
  backgroundColor: '#f5f5f5',
  textStyle: {
    color: '#333',
  },
  title: {
    textStyle: {
      color: '#222',
      fontWeight: 'bold',
    },
  },
});
```

### getTheme

获取指定主题。

#### 导入

```typescript
import { getTheme } from '@agions/taroviz';
```

#### 类型定义

```typescript
function getTheme(name: string): object | undefined;
```

#### 参数

| 参数名 | 类型   | 描述     |
| ------ | ------ | -------- |
| name   | string | 主题名称 |

#### 返回值

| 类型      | 描述           |
| --------- | -------------- |
| object    | 主题配置对象   |
| undefined | 如果主题不存在 |

#### 示例

```typescript
const theme = getTheme('default');
console.log('默认主题:', theme);
```

### getAllThemes

获取所有注册的主题。

#### 导入

```typescript
import { getAllThemes } from '@agions/taroviz';
```

#### 类型定义

```typescript
function getAllThemes(): string[];
```

#### 返回值

| 类型     | 描述         |
| -------- | ------------ |
| string[] | 主题名称数组 |

#### 示例

```typescript
const themes = getAllThemes();
console.log('所有主题:', themes);
```

## 2. 平台适配

### registerAdapter

注册自定义平台适配器。

#### 导入

```typescript
import { registerAdapter } from '@agions/taroviz';
```

#### 类型定义

```typescript
interface Adapter {
  init(options: any): any;
  render(chart: any, option: any): void;
  resize(chart: any, width: number, height: number): void;
  destroy(chart: any): void;
  getInstance(chart: any): any;
  setOption(chart: any, option: any, notMerge?: boolean, lazyUpdate?: boolean): void;
  getOption(chart: any): any;
  on(chart: any, eventName: string, handler: (params: any) => void): void;
  off(chart: any, eventName: string, handler: (params: any) => void): void;
}

function registerAdapter(name: string, adapter: typeof Adapter | Adapter): void;
```

#### 参数

| 参数名  | 类型           | 描述           |
| ------- | -------------- | -------------- |
| name    | string         | 适配器名称     |
| adapter | typeof Adapter | 适配器类或实例 |

#### 示例

```typescript
class CustomAdapter {
  init(options: any) {
    // 初始化逻辑
    return {};
  }

  render(chart: any, option: any) {
    // 渲染逻辑
  }

  resize(chart: any, width: number, height: number) {
    // 调整大小逻辑
  }

  destroy(chart: any) {
    // 销毁逻辑
  }

  getInstance(chart: any) {
    // 获取实例逻辑
    return chart;
  }

  setOption(chart: any, option: any, notMerge?: boolean, lazyUpdate?: boolean) {
    // 设置配置逻辑
  }

  getOption(chart: any) {
    // 获取配置逻辑
    return {};
  }

  on(chart: any, eventName: string, handler: (params: any) => void) {
    // 绑定事件逻辑
  }

  off(chart: any, eventName: string, handler: (params: any) => void) {
    // 解绑事件逻辑
  }
}

registerAdapter('custom', CustomAdapter);
```

### getAdapter

获取指定平台的适配器。

#### 导入

```typescript
import { getAdapter } from '@agions/taroviz';
```

#### 类型定义

```typescript
function getAdapter(name: string): Adapter | undefined;
```

#### 参数

| 参数名 | 类型   | 描述       |
| ------ | ------ | ---------- |
| name   | string | 适配器名称 |

#### 返回值

| 类型      | 描述             |
| --------- | ---------------- |
| Adapter   | 适配器实例       |
| undefined | 如果适配器不存在 |

#### 示例

```typescript
const adapter = getAdapter('weapp');
console.log('微信小程序适配器:', adapter);
```

### detectPlatform

检测当前运行平台。

#### 导入

```typescript
import { detectPlatform } from '@agions/taroviz';
```

#### 类型定义

```typescript
function detectPlatform(): string;
```

#### 返回值

| 类型   | 描述         |
| ------ | ------------ |
| string | 当前平台名称 |

#### 示例

```typescript
const platform = detectPlatform();
console.log('当前平台:', platform);
```

## 3. 图表实例管理

### registerChart

注册图表实例。

#### 导入

```typescript
import { registerChart } from '@agions/taroviz';
```

#### 类型定义

```typescript
function registerChart(chartId: string, chartInstance: any): void;
```

#### 参数

| 参数名        | 类型   | 描述     |
| ------------- | ------ | -------- |
| chartId       | string | 图表ID   |
| chartInstance | any    | 图表实例 |

#### 示例

```typescript
const chart = echarts.init(dom);
registerChart('chart-1', chart);
```

### getChart

获取图表实例。

#### 导入

```typescript
import { getChart } from '@agions/taroviz';
```

#### 类型定义

```typescript
function getChart(chartId: string): any | undefined;
```

#### 参数

| 参数名  | 类型   | 描述   |
| ------- | ------ | ------ |
| chartId | string | 图表ID |

#### 返回值

| 类型      | 描述           |
| --------- | -------------- |
| any       | 图表实例       |
| undefined | 如果图表不存在 |

#### 示例

```typescript
const chart = getChart('chart-1');
if (chart) {
  chart.resize();
}
```

### removeChart

移除图表实例。

#### 导入

```typescript
import { removeChart } from '@agions/taroviz';
```

#### 类型定义

```typescript
function removeChart(chartId: string): void;
```

#### 参数

| 参数名  | 类型   | 描述   |
| ------- | ------ | ------ |
| chartId | string | 图表ID |

#### 示例

```typescript
removeChart('chart-1');
```

### getAllCharts

获取所有注册的图表实例。

#### 导入

```typescript
import { getAllCharts } from '@agions/taroviz';
```

#### 类型定义

```typescript
function getAllCharts(): Record<string, any>;
```

#### 返回值

| 类型                | 描述             |
| ------------------- | ---------------- |
| Record<string, any> | 图表实例映射对象 |

#### 示例

```typescript
const charts = getAllCharts();
console.log('所有图表实例:', charts);
```

## 4. 配置生成

### generateChartConfig

生成图表配置。

#### 导入

```typescript
import { generateChartConfig } from '@agions/taroviz';
```

#### 类型定义

```typescript
interface ConfigGeneratorOptions {
  /**
   * 图表类型
   */
  type: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 副标题
   */
  subtitle?: string;
  /**
   * 数据
   */
  data?: any;
  /**
   * X轴数据
   */
  xAxisData?: any[];
  /**
   * Y轴数据
   */
  yAxisData?: any[];
  /**
   * 系列配置
   */
  seriesConfig?: any;
  /**
   * 主题
   */
  theme?: string | object;
  /**
   * 是否响应式
   */
  responsive?: boolean;
  /**
   * 其他配置
   */
  [key: string]: any;
}

function generateChartConfig(options: ConfigGeneratorOptions): any;
```

#### 参数

| 参数名  | 类型   | 描述         |
| ------- | ------ | ------------ |
| options | object | 配置生成选项 |

#### 返回值

| 类型   | 描述         |
| ------ | ------------ |
| object | 图表配置对象 |

#### 示例

```typescript
const config = generateChartConfig({
  type: 'line',
  title: '销售趋势',
  data: [120, 200, 150, 80, 70, 110, 130],
  xAxisData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
});
console.log('生成的配置:', config);
```

## 5. 代码生成

### generateCodeExample

生成代码示例。

#### 导入

```typescript
import { generateCodeExample } from '@agions/taroviz';
```

#### 类型定义

```typescript
interface CodeGeneratorOptions {
  /**
   * 框架类型
   */
  framework: 'react' | 'vue' | 'vanilla';
  /**
   * 图表类型
   */
  chartType: string;
  /**
   * 图表配置
   */
  option: any;
  /**
   * 是否使用TypeScript
   */
  useTypeScript?: boolean;
  /**
   * 组件名称
   */
  componentName?: string;
  /**
   * 图表ID
   */
  chartId?: string;
  /**
   * 是否包含样式
   */
  includeStyles?: boolean;
  /**
   * 是否包含数据
   */
  includeData?: boolean;
  /**
   * 是否包含注释
   */
  includeComments?: boolean;
}

function generateCodeExample(options: CodeGeneratorOptions): string;
```

#### 参数

| 参数名  | 类型   | 描述         |
| ------- | ------ | ------------ |
| options | object | 代码生成选项 |

#### 返回值

| 类型   | 描述       |
| ------ | ---------- |
| string | 生成的代码 |

#### 示例

```typescript
const code = generateCodeExample({
  framework: 'react',
  chartType: 'line',
  option: {
    title: { text: '折线图示例' },
    series: [{ data: [120, 200, 150, 80, 70, 110, 130] }],
  },
  useTypeScript: true,
  componentName: 'LineChartExample',
  includeComments: true,
});
console.log('生成的代码:', code);
```

## 6. 性能分析

### PerformanceAnalyzer

性能分析工具类。

#### 导入

```typescript
import { PerformanceAnalyzer } from '@agions/taroviz';
```

#### 类型定义

```typescript
class PerformanceAnalyzer {
  /**
   * 获取单例实例
   */
  static getInstance(): PerformanceAnalyzer;

  /**
   * 开始监控
   */
  start(): void;

  /**
   * 停止监控
   */
  stop(): void;

  /**
   * 记录性能数据
   */
  record(type: string, data: any): void;

  /**
   * 获取性能指标
   */
  getMetrics(): any;

  /**
   * 生成报告
   */
  generateReport(): any;

  /**
   * 重置数据
   */
  reset(): void;

  /**
   * 设置监控选项
   */
  setOptions(options: any): void;
}
```

#### 示例

```typescript
const analyzer = PerformanceAnalyzer.getInstance();
analyzer.start();
// 执行一些操作
analyzer.stop();
const report = analyzer.generateReport();
console.log('性能报告:', report);
```

## 7. 工具函数

### uuid

生成唯一ID。

#### 导入

```typescript
import { uuid } from '@agions/taroviz';
```

#### 类型定义

```typescript
function uuid(): string;
```

#### 返回值

| 类型   | 描述   |
| ------ | ------ |
| string | 唯一ID |

#### 示例

```typescript
const id = uuid();
console.log('生成的ID:', id);
```

### deepMerge

深度合并对象。

#### 导入

```typescript
import { deepMerge } from '@agions/taroviz';
```

#### 类型定义

```typescript
function deepMerge<T extends object>(target: T, ...sources: any[]): T;
```

#### 参数

| 参数名  | 类型   | 描述     |
| ------- | ------ | -------- |
| target  | object | 目标对象 |
| sources | object | 源对象   |

#### 返回值

| 类型   | 描述         |
| ------ | ------------ |
| object | 合并后的对象 |

#### 示例

```typescript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };
const merged = deepMerge(obj1, obj2);
console.log('合并后的对象:', merged);
```

### throttle

节流函数。

#### 导入

```typescript
import { throttle } from '@agions/taroviz';
```

#### 类型定义

```typescript
function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void;
```

#### 参数

| 参数名 | 类型     | 描述         |
| ------ | -------- | ------------ |
| func   | function | 要节流的函数 |
| wait   | number   | 等待时间     |

#### 返回值

| 类型     | 描述         |
| -------- | ------------ |
| function | 节流后的函数 |

#### 示例

```typescript
const throttledFunction = throttle(() => {
  console.log('节流函数执行');
}, 1000);
```

### debounce

防抖函数。

#### 导入

```typescript
import { debounce } from '@agions/taroviz';
```

#### 类型定义

```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void;
```

#### 参数

| 参数名    | 类型     | 描述         |
| --------- | -------- | ------------ |
| func      | function | 要防抖的函数 |
| wait      | number   | 等待时间     |
| immediate | boolean  | 是否立即执行 |

#### 返回值

| 类型     | 描述         |
| -------- | ------------ |
| function | 防抖后的函数 |

#### 示例

```typescript
const debouncedFunction = debounce(() => {
  console.log('防抖函数执行');
}, 1000);
```

### formatNumber

格式化数字。

#### 导入

```typescript
import { formatNumber } from '@agions/taroviz';
```

#### 类型定义

```typescript
function formatNumber(
  num: number,
  options?: {
    /**
     * 小数位数
     */
    decimalPlaces?: number;
    /**
     * 是否使用千分位分隔符
     */
    useThousandSeparator?: boolean;
    /**
     * 前缀
     */
    prefix?: string;
    /**
     * 后缀
     */
    suffix?: string;
  }
): string;
```

#### 参数

| 参数名  | 类型   | 描述           |
| ------- | ------ | -------------- |
| num     | number | 要格式化的数字 |
| options | object | 格式化选项     |

#### 返回值

| 类型   | 描述           |
| ------ | -------------- |
| string | 格式化后的数字 |

#### 示例

```typescript
const formatted = formatNumber(12345.6789, {
  decimalPlaces: 2,
  useThousandSeparator: true,
  prefix: '$',
});
console.log('格式化后的数字:', formatted);
```

## 8. 常量

### Platform

平台常量。

#### 导入

```typescript
import { Platform } from '@agions/taroviz';
```

#### 类型定义

```typescript
const Platform: {
  WEAPP: 'weapp';
  ALIPAY: 'alipay';
  SWAN: 'swan';
  TT: 'tt';
  H5: 'h5';
  RN: 'rn';
  HARMONY: 'harmony';
};
```

#### 示例

```typescript
console.log(Platform.WEAPP); // 'weapp'
console.log(Platform.ALIPAY); // 'alipay'
console.log(Platform.SWAN); // 'swan'
console.log(Platform.TT); // 'tt'
console.log(Platform.H5); // 'h5'
console.log(Platform.RN); // 'rn'
console.log(Platform.HARMONY); // 'harmony'
```

### version

版本常量。

#### 导入

```typescript
import { version } from '@agions/taroviz';
```

#### 类型定义

```typescript
const version: string;
```

#### 示例

```typescript
console.log('TaroViz 版本:', version);
```
