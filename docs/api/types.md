# 类型定义

TaroViz 提供了完整的 TypeScript 类型定义，以下是主要的类型定义说明。

## 1. 核心组件类型

### BaseChartProps

基础图表组件属性类型。

```typescript
interface BaseChartProps {
  /**
   * 图表唯一标识符
   */
  chartId?: string;
  /**
   * ECharts 配置项
   */
  option: any;
  /**
   * 图表宽度
   */
  width?: number | string;
  /**
   * 图表高度
   */
  height?: number | string;
  /**
   * 图表主题
   */
  theme?: string | object;
  /**
   * 渲染器类型
   */
  renderer?: 'canvas' | 'svg';
  /**
   * 是否自动调整大小
   */
  autoResize?: boolean;
  /**
   * 平台适配器名称
   */
  adapter?: string;
  /**
   * 初始化选项
   */
  initOptions?: any;
  /**
   * 图表容器样式
   */
  style?: React.CSSProperties;
  /**
   * 图表容器类名
   */
  className?: string;
  /**
   * 图表初始化完成事件
   */
  onInit?: () => void;
  /**
   * 图表渲染完成事件
   */
  onRenderComplete?: () => void;
  /**
   * 图表点击事件
   */
  onClick?: (params: any) => void;
  /**
   * 图表双击事件
   */
  onDblClick?: (params: any) => void;
  /**
   * 鼠标按下事件
   */
  onMouseDown?: (params: any) => void;
  /**
   * 鼠标移动事件
   */
  onMouseMove?: (params: any) => void;
  /**
   * 鼠标释放事件
   */
  onMouseUp?: (params: any) => void;
  /**
   * 鼠标悬停事件
   */
  onMouseOver?: (params: any) => void;
  /**
   * 鼠标离开事件
   */
  onMouseOut?: (params: any) => void;
  /**
   * 数据缩放事件
   */
  onDataZoom?: (params: any) => void;
  /**
   * 图例选择变化事件
   */
  onLegendSelectChanged?: (params: any) => void;
  /**
   * 图表销毁事件
   */
  onDestroy?: () => void;
  /**
   * 图表错误事件
   */
  onError?: (error: Error) => void;
  /**
   * 是否启用调试模式
   */
  debug?: boolean;
  /**
   * 调试面板选项
   */
  debugOptions?: DebugPanelOptions;
  /**
   * 是否启用性能监控
   */
  enablePerformance?: boolean;
  /**
   * 性能监控选项
   */
  performanceOptions?: PerformanceAnalyzerOptions;
  /**
   * 自定义工具函数
   */
  utils?: any;
  /**
   * 其他自定义属性
   */
  [key: string]: any;
}
```

### ChartInstance

图表实例类型。

```typescript
type ChartInstance = {
  /**
   * 调整图表大小
   */
  resize: () => void;
  /**
   * 设置图表配置
   */
  setOption: (option: any, notMerge?: boolean, lazyUpdate?: boolean) => void;
  /**
   * 获取图表配置
   */
  getOption: () => any;
  /**
   * 绑定事件
   */
  on: (eventName: string, handler: (params: any) => void) => void;
  /**
   * 解绑事件
   */
  off: (eventName: string, handler?: (params: any) => void) => void;
  /**
   * 销毁图表
   */
  destroy: () => void;
  /**
   * 清除图表
   */
  clear: () => void;
  /**
   * 获取图表宽度
   */
  getWidth: () => number;
  /**
   * 获取图表高度
   */
  getHeight: () => number;
  /**
   * 转换鼠标位置
   */
  convertFromPixel: (finder: any, value: any) => any;
  /**
   * 转换坐标到像素
   */
  convertToPixel: (finder: any, value: any) => any;
  /**
   * 导出图表为图片
   */
  getDataURL: (options?: any) => string;
  /**
   * 导出图表为图片
   */
  getConnectedDataURL: (options?: any) => string;
  /**
   * 导出图表为图片
   */
  getImage: (options?: any) => Promise<HTMLCanvasElement>;
};
```

## 2. 图表组件类型

### LineChartProps

折线图组件属性类型。

```typescript
interface LineChartProps extends BaseChartProps {
  /**
   * 折线图特定配置
   */
  lineConfig?: {
    /**
     * 是否平滑曲线
     */
    smooth?: boolean;
    /**
     * 线条样式
     */
    lineStyle?: any;
    /**
     * 面积样式
     */
    areaStyle?: any;
    /**
     * 点样式
     */
    itemStyle?: any;
    /**
     * 标签样式
     */
    label?: any;
    /**
     * 其他折线图配置
     */
    [key: string]: any;
  };
}
```

### BarChartProps

柱状图组件属性类型。

```typescript
interface BarChartProps extends BaseChartProps {
  /**
   * 柱状图特定配置
   */
  barConfig?: {
    /**
     * 柱子宽度
     */
    barWidth?: number | string;
    /**
     * 柱子最大宽度
     */
    barMaxWidth?: number | string;
    /**
     * 柱子样式
     */
    itemStyle?: any;
    /**
     * 标签样式
     */
    label?: any;
    /**
     * 其他柱状图配置
     */
    [key: string]: any;
  };
}
```

### PieChartProps

饼图组件属性类型。

```typescript
interface PieChartProps extends BaseChartProps {
  /**
   * 饼图特定配置
   */
  pieConfig?: {
    /**
     * 饼图半径
     */
    radius?: number | string | [number | string, number | string];
    /**
     * 饼图中心位置
     */
    center?: [number | string, number | string];
    /**
     * 饼图起始角度
     */
    startAngle?: number;
    /**
     * 饼图结束角度
     */
    endAngle?: number;
    /**
     * 饼图样式
     */
    itemStyle?: any;
    /**
     * 标签样式
     */
    label?: any;
    /**
     * 其他饼图配置
     */
    [key: string]: any;
  };
}
```

### ScatterChartProps

散点图组件属性类型。

```typescript
interface ScatterChartProps extends BaseChartProps {
  /**
   * 散点图特定配置
   */
  scatterConfig?: {
    /**
     * 散点大小
     */
    symbolSize?: number | ((value: any[], params: any) => number);
    /**
     * 散点形状
     */
    symbol?: string;
    /**
     * 散点样式
     */
    itemStyle?: any;
    /**
     * 标签样式
     */
    label?: any;
    /**
     * 其他散点图配置
     */
    [key: string]: any;
  };
}
```

### RadarChartProps

雷达图组件属性类型。

```typescript
interface RadarChartProps extends BaseChartProps {
  /**
   * 雷达图特定配置
   */
  radarConfig?: {
    /**
     * 雷达图半径
     */
    radius?: number | string;
    /**
     * 雷达图中心位置
     */
    center?: [number | string, number | string];
    /**
     * 雷达图指示器
     */
    indicator?: any[];
    /**
     * 雷达图样式
     */
    itemStyle?: any;
    /**
     * 填充样式
     */
    areaStyle?: any;
    /**
     * 线条样式
     */
    lineStyle?: any;
    /**
     * 其他雷达图配置
     */
    [key: string]: any;
  };
}
```

### HeatmapChartProps

热力图组件属性类型。

```typescript
interface HeatmapChartProps extends BaseChartProps {
  /**
   * 热力图特定配置
   */
  heatmapConfig?: {
    /**
     * 热力图样式
     */
    itemStyle?: any;
    /**
     * 热力图标签
     */
    label?: any;
    /**
     * 热力图视觉映射
     */
    visualMap?: any;
    /**
     * 其他热力图配置
     */
    [key: string]: any;
  };
}
```

### GaugeChartProps

仪表盘组件属性类型。

```typescript
interface GaugeChartProps extends BaseChartProps {
  /**
   * 仪表盘特定配置
   */
  gaugeConfig?: {
    /**
     * 仪表盘半径
     */
    radius?: number | string;
    /**
     * 仪表盘中心位置
     */
    center?: [number | string, number | string];
    /**
     * 仪表盘起始角度
     */
    startAngle?: number;
    /**
     * 仪表盘结束角度
     */
    endAngle?: number;
    /**
     * 仪表盘指针样式
     */
    pointer?: any;
    /**
     * 仪表盘刻度样式
     */
    axisLine?: any;
    /**
     * 仪表盘标签
     */
    detail?: any;
    /**
     * 其他仪表盘配置
     */
    [key: string]: any;
  };
}
```

### FunnelChartProps

漏斗图组件属性类型。

```typescript
interface FunnelChartProps extends BaseChartProps {
  /**
   * 漏斗图特定配置
   */
  funnelConfig?: {
    /**
     * 漏斗图宽度
     */
    width?: number | string;
    /**
     * 漏斗图高度
     */
    height?: number | string;
    /**
     * 漏斗图中心位置
     */
    center?: [number | string, number | string];
    /**
     * 漏斗图样式
     */
    itemStyle?: any;
    /**
     * 漏斗图标签
     */
    label?: any;
    /**
     * 漏斗图排序
     */
    sort?: 'descending' | 'ascending' | null;
    /**
     * 其他漏斗图配置
     */
    [key: string]: any;
  };
}
```

## 2. Hook 类型

### UseChartOptions

useChart Hook 选项类型。

```typescript
interface UseChartOptions {
  /**
   * 图表ID
   */
  chartId?: string;
  /**
   * 自动初始化图表
   */
  autoInit?: boolean;
  /**
   * 初始化选项
   */
  initOptions?: any;
}
```

### UseChartReturn

useChart Hook 返回值类型。

```typescript
interface UseChartReturn {
  /**
   * 图表实例引用
   */
  chartRef: React.RefObject<any>;
  /**
   * 图表实例
   */
  chartInstance: any;
  /**
   * 图表是否已初始化
   */
  isInitialized: boolean;
  /**
   * 初始化图表
   */
  initChart: () => void;
  /**
   * 销毁图表
   */
  destroyChart: () => void;
  /**
   * 调整图表大小
   */
  resizeChart: () => void;
  /**
   * 设置图表配置
   */
  setChartOption: (option: any, notMerge?: boolean, lazyUpdate?: boolean) => void;
  /**
   * 获取图表配置
   */
  getChartOption: () => any;
}
```

### UseThemeReturn

useTheme Hook 返回值类型。

```typescript
interface UseThemeReturn {
  /**
   * 当前主题
   */
  theme: string | object;
  /**
   * 设置主题
   */
  setTheme: (theme: string | object) => void;
  /**
   * 主题列表
   */
  themes: string[];
  /**
   * 注册自定义主题
   */
  registerTheme: (name: string, theme: object) => void;
}
```

### UseChartDataOptions

useChartData Hook 选项类型。

```typescript
interface UseChartDataOptions {
  /**
   * 初始数据
   */
  initialData?: any;
  /**
   * 数据更新延迟
   */
  updateDelay?: number;
  /**
   * 数据验证函数
   */
  validateData?: (data: any) => boolean;
}
```

### UseChartDataReturn

useChartData Hook 返回值类型。

```typescript
interface UseChartDataReturn {
  /**
   * 当前数据
   */
  data: any;
  /**
   * 更新数据
   */
  updateData: (newData: any) => void;
  /**
   * 数据是否正在更新
   */
  isUpdating: boolean;
  /**
   * 数据更新次数
   */
  updateCount: number;
  /**
   * 重置数据
   */
  resetData: () => void;
}
```

## 3. 适配器类型

### Adapter

平台适配器接口。

```typescript
interface Adapter {
  /**
   * 初始化适配器
   */
  init(options: any): any;
  /**
   * 渲染图表
   */
  render(chart: any, option: any): void;
  /**
   * 调整图表大小
   */
  resize(chart: any, width: number, height: number): void;
  /**
   * 销毁图表
   */
  destroy(chart: any): void;
  /**
   * 获取图表实例
   */
  getInstance(chart: any): any;
  /**
   * 设置图表配置
   */
  setOption(chart: any, option: any, notMerge?: boolean, lazyUpdate?: boolean): void;
  /**
   * 获取图表配置
   */
  getOption(chart: any): any;
  /**
   * 绑定事件
   */
  on(chart: any, eventName: string, handler: (params: any) => void): void;
  /**
   * 解绑事件
   */
  off(chart: any, eventName: string, handler: (params: any) => void): void;
  /**
   * 清除图表
   */
  clear(chart: any): void;
  /**
   * 导出图表
   */
  exportChart(chart: any, options?: any): any;
}
```

### PlatformAdapterOptions

平台适配器选项类型。

```typescript
interface PlatformAdapterOptions {
  /**
   * 画布ID
   */
  canvasId?: string;
  /**
   * 渲染器类型
   */
  renderer?: 'canvas' | 'svg';
  /**
   * 主题
   */
  theme?: string | object;
  /**
   * 初始化选项
   */
  initOptions?: any;
  /**
   * 其他选项
   */
  [key: string]: any;
}
```

### PlatformInfo

平台信息类型。

```typescript
interface PlatformInfo {
  /**
   * 平台名称
   */
  name: string;
  /**
   * 平台版本
   */
  version: string;
  /**
   * 平台环境
   */
  env: string;
  /**
   * 是否为小程序
   */
  isMiniProgram: boolean;
  /**
   * 是否为H5
   */
  isH5: boolean;
  /**
   * 是否为React Native
   */
  isRN: boolean;
  /**
   * 其他平台信息
   */
  [key: string]: any;
}
```

## 4. 主题类型

### Theme

主题类型。

```typescript
interface Theme {
  /**
   * 配色方案
   */
  color?: string[];
  /**
   * 背景色
   */
  backgroundColor?: string;
  /**
   * 文字样式
   */
  textStyle?: {
    color?: string;
    fontSize?: number;
    fontWeight?: string | number;
    fontFamily?: string;
    [key: string]: any;
  };
  /**
   * 标题样式
   */
  title?: {
    textStyle?: {
      color?: string;
      fontSize?: number;
      fontWeight?: string | number;
      fontFamily?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  /**
   * 图例样式
   */
  legend?: {
    textStyle?: {
      color?: string;
      fontSize?: number;
      [key: string]: any;
    };
    [key: string]: any;
  };
  /**
   * 网格样式
   */
  grid?: {
    lineStyle?: {
      color?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  /**
   * 坐标轴样式
   */
  axisLine?: {
    lineStyle?: {
      color?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  /**
   * 坐标轴标签样式
   */
  axisLabel?: {
    color?: string;
    fontSize?: number;
    [key: string]: any;
  };
  /**
   * 坐标轴刻度样式
   */
  axisTick?: {
    lineStyle?: {
      color?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  /**
   * 分割线样式
   */
  splitLine?: {
    lineStyle?: {
      color?: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  /**
   * 提示框样式
   */
  tooltip?: {
    backgroundColor?: string;
    borderColor?: string;
    textStyle?: {
      color?: string;
      fontSize?: number;
      [key: string]: any;
    };
    [key: string]: any;
  };
  /**
   * 其他主题配置
   */
  [key: string]: any;
}
```

## 5. 性能类型

### PerformanceAnalyzerOptions

性能分析器选项类型。

```typescript
interface PerformanceAnalyzerOptions {
  /**
   * 是否自动开始监控
   */
  autoStart?: boolean;
  /**
   * 监控间隔（毫秒）
   */
  interval?: number;
  /**
   * 监控指标
   */
  metrics?: string[];
  /**
   * 是否记录详细日志
   */
  verbose?: boolean;
  /**
   * 是否启用内存监控
   */
  enableMemoryMonitoring?: boolean;
  /**
   * 是否启用帧率监控
   */
  enableFpsMonitoring?: boolean;
  /**
   * 其他选项
   */
  [key: string]: any;
}
```

### PerformanceMetrics

性能指标类型。

```typescript
interface PerformanceMetrics {
  /**
   * 帧率
   */
  fps: number;
  /**
   * 渲染时间
   */
  renderTime: number;
  /**
   * 内存使用
   */
  memoryUsage: number;
  /**
   * 数据处理时间
   */
  dataProcessTime: number;
  /**
   * 初始化时间
   */
  initTime: number;
  /**
   * 重绘次数
   */
  repaintCount: number;
  /**
   * 最大渲染时间
   */
  maxRenderTime: number;
  /**
   * 平均渲染时间
   */
  avgRenderTime: number;
  /**
   * 最小渲染时间
   */
  minRenderTime: number;
  /**
   * 其他性能指标
   */
  [key: string]: any;
}
```

### PerformanceReport

性能报告类型。

```typescript
interface PerformanceReport {
  /**
   * 报告ID
   */
  id: string;
  /**
   * 生成时间
   */
  timestamp: number;
  /**
   * 性能指标
   */
  metrics: PerformanceMetrics;
  /**
   * 监控时长
   */
  duration: number;
  /**
   * 平台信息
   */
  platform: PlatformInfo;
  /**
   * 浏览器信息
   */
  browser?: {
    name: string;
    version: string;
    userAgent: string;
  };
  /**
   * 设备信息
   */
  device?: {
    type: string;
    width: number;
    height: number;
    pixelRatio: number;
  };
  /**
   * 其他报告信息
   */
  [key: string]: any;
}
```

## 6. 配置类型

### ConfigGeneratorOptions

配置生成器选项类型。

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
   * X轴配置
   */
  xAxisConfig?: any;
  /**
   * Y轴配置
   */
  yAxisConfig?: any;
  /**
   * 图例配置
   */
  legendConfig?: any;
  /**
   * 提示框配置
   */
  tooltipConfig?: any;
  /**
   * 网格配置
   */
  gridConfig?: any;
  /**
   * 其他配置
   */
  [key: string]: any;
}
```

### CodeGeneratorOptions

代码生成器选项类型。

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
  /**
   * 导入类型
   */
  importType?: 'esm' | 'cjs' | 'umd';
  /**
   * 主题类型
   */
  theme?: 'light' | 'dark';
  /**
   * 其他选项
   */
  [key: string]: any;
}
```

## 7. 事件类型

### ChartEventParams

图表事件参数类型。

```typescript
interface ChartEventParams {
  /**
   * 事件名称
   */
  type: string;
  /**
   * 事件数据
   */
  data: any;
  /**
   * 事件目标
   */
  target: any;
  /**
   * 事件时间戳
   */
  timestamp: number;
  /**
   * 其他事件参数
   */
  [key: string]: any;
}
```

### DebugPanelOptions

调试面板选项类型。

```typescript
interface DebugPanelOptions {
  /**
   * 是否自动展开
   */
  autoExpand?: boolean;
  /**
   * 默认选中的标签
   */
  defaultTab?: 'instance' | 'performance' | 'events' | 'options' | 'data';
  /**
   * 面板位置
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /**
   * 面板宽度
   */
  width?: number;
  /**
   * 面板高度
   */
  height?: number;
  /**
   * 是否显示关闭按钮
   */
  showCloseButton?: boolean;
  /**
   * 是否显示最小化按钮
   */
  showMinimizeButton?: boolean;
  /**
   * 其他选项
   */
  [key: string]: any;
}
```

## 8. 工具类型

### DeepPartial

深度部分类型。

```typescript
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
```

### DeepRequired

深度必需类型。

```typescript
type DeepRequired<T> = T extends object
  ? {
      [P in keyof T]-?: DeepRequired<T[P]>;
    }
  : T;
```

### DeepReadonly

深度只读类型。

```typescript
type DeepReadonly<T> = T extends object
  ? {
      readonly [P in keyof T]: DeepReadonly<T[P]>;
    }
  : T;
```

### DeepRecord

深度记录类型。

```typescript
type DeepRecord<K extends string | number | symbol, T> = {
  [P in K]: DeepRecord<K, T> | T;
};
```

### ChartType

图表类型。

```typescript
type ChartType =
  | 'line'
  | 'bar'
  | 'pie'
  | 'scatter'
  | 'radar'
  | 'heatmap'
  | 'gauge'
  | 'funnel'
  | 'map'
  | 'sankey'
  | 'tree'
  | 'treemap'
  | 'graph'
  | 'boxplot'
  | 'candlestick'
  | 'effectScatter'
  | 'lines'
  | 'parallel'
  | 'pictorialBar'
  | 'sunburst'
  | 'themeRiver'
  | 'custom';
```

### FrameworkType

框架类型。

```typescript
type FrameworkType = 'react' | 'vue' | 'vanilla' | 'angular';
```

### ImportType

导入类型。

```typescript
type ImportType = 'esm' | 'cjs' | 'umd';
```

### ThemeType

主题类型。

```typescript
type ThemeType = 'light' | 'dark';
```

## 9. 常量类型

### Platform

平台常量类型。

```typescript
enum Platform {
  WEAPP = 'weapp',
  ALIPAY = 'alipay',
  SWAN = 'swan',
  TT = 'tt',
  H5 = 'h5',
  RN = 'rn',
  HARMONY = 'harmony',
}
```

### PerformanceMetricType

性能指标类型常量。

```typescript
enum PerformanceMetricType {
  FPS = 'fps',
  RENDER_TIME = 'renderTime',
  MEMORY_USAGE = 'memoryUsage',
  DATA_PROCESS_TIME = 'dataProcessTime',
  INIT_TIME = 'initTime',
  REPAINT_COUNT = 'repaintCount',
}
```

### DebugPanelEventType

调试面板事件类型常量。

```typescript
enum DebugPanelEventType {
  PANEL_OPEN = 'debugPanelOpen',
  PANEL_CLOSE = 'debugPanelClose',
  TAB_CHANGE = 'debugPanelTabChange',
  DATA_UPDATE = 'debugPanelDataUpdate',
  OPTION_UPDATE = 'debugPanelOptionUpdate',
}
```

## 10. 错误类型

### ChartInitError

图表初始化错误类型。

```typescript
class ChartInitError extends Error {
  constructor(message: string);
}
```

### AdapterError

适配器错误类型。

```typescript
class AdapterError extends Error {
  constructor(message: string);
}
```

### ThemeError

主题错误类型。

```typescript
class ThemeError extends Error {
  constructor(message: string);
}
```

### ConfigError

配置错误类型。

```typescript
class ConfigError extends Error {
  constructor(message: string);
}
```

### PerformanceError

性能错误类型。

```typescript
class PerformanceError extends Error {
  constructor(message: string);
}
```

## 11. 导出类型

### ExportChartOptions

导出图表选项类型。

```typescript
interface ExportChartOptions {
  /**
   * 导出类型
   */
  type?: 'png' | 'jpeg' | 'svg' | 'pdf';
  /**
   * 导出质量
   */
  quality?: number;
  /**
   * 导出宽度
   */
  width?: number;
  /**
   * 导出高度
   */
  height?: number;
  /**
   * 导出文件名
   */
  filename?: string;
  /**
   * 其他导出选项
   */
  [key: string]: any;
}
```

## 12. 响应式类型

### ResponsiveConfig

响应式配置类型。

```typescript
interface ResponsiveConfig {
  /**
   * 断点配置
   */
  breakpoints?: {
    [key: string]: number;
  };
  /**
   * 根据断点返回不同的配置
   */
  getConfigByBreakpoint?: (breakpoint: string, width: number) => any;
  /**
   * 响应式规则
   */
  rules?: {
    [key: string]: {
      [breakpoint: string]: any;
    };
  };
  /**
   * 其他响应式配置
   */
  [key: string]: any;
}
```

## 13. 联动类型

### LinkageConfig

联动配置类型。

```typescript
interface LinkageConfig {
  /**
   * 联动ID
   */
  id: string;
  /**
   * 联动类型
   */
  type?: 'filter' | 'highlight' | 'sync' | 'custom';
  /**
   * 联动目标
   */
  targets?: string[];
  /**
   * 联动规则
   */
  rules?: any[];
  /**
   * 联动事件
   */
  events?: string[];
  /**
   * 自定义联动处理函数
   */
  handler?: (data: any, source: string, targets: string[]) => void;
  /**
   * 其他联动配置
   */
  [key: string]: any;
}
```

## 14. 数据类型

### ChartData

图表数据类型。

```typescript
interface ChartData {
  /**
   * 数据ID
   */
  id?: string;
  /**
   * 数据名称
   */
  name?: string;
  /**
   * 数据值
   */
  value?: any;
  /**
   * 数据系列
   */
  series?: string;
  /**
   * 数据类别
   */
  category?: string;
  /**
   * 数据标签
   */
  label?: string;
  /**
   * 数据样式
   */
  itemStyle?: any;
  /**
   * 数据标记
   */
  markPoint?: any;
  /**
   * 数据标记线
   */
  markLine?: any;
  /**
   * 数据标记区域
   */
  markArea?: any;
  /**
   * 其他数据属性
   */
  [key: string]: any;
}
```

### DataFilterConfig

数据过滤配置类型。

```typescript
interface DataFilterConfig {
  /**
   * 过滤类型
   */
  type: 'filter' | 'sort' | 'group' | 'aggregate' | 'map' | 'reduce';
  /**
   * 过滤字段
   */
  field?: string;
  /**
   * 过滤值
   */
  value?: any;
  /**
   * 过滤操作符
   */
  operator?:
    | 'eq'
    | 'neq'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'in'
    | 'notIn'
    | 'contains'
    | 'notContains'
    | 'between'
    | 'notBetween';
  /**
   * 排序方向
   */
  order?: 'asc' | 'desc';
  /**
   * 分组字段
   */
  groupBy?: string[];
  /**
   * 聚合函数
   */
  aggregate?:
    | 'sum'
    | 'avg'
    | 'count'
    | 'min'
    | 'max'
    | 'median'
    | 'mode'
    | 'range'
    | 'variance'
    | 'stdDev';
  /**
   * 映射函数
   */
  map?: (value: any) => any;
  /**
   * 归约函数
   */
  reduce?: (accumulator: any, currentValue: any) => any;
  /**
   * 其他过滤配置
   */
  [key: string]: any;
}
```
