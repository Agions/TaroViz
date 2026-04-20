/**
 * TaroViz Charts 类型定义 - 增强版
 */
import type { CSSProperties, ReactNode } from 'react';
import type { EChartsOption, ECharts } from 'echarts';

// ============================================================================
// 基础类型定义
// ============================================================================

/** 尺寸类型 */
export type SizeValue = number | string | 'auto';

/** 尺寸配置 */
export interface SizeConfig {
  width?: SizeValue;
  height?: SizeValue;
}

/** 主题配置 */
export interface ThemeConfig {
  /** 主题名称 */
  name?: string;
  /** 主题对象 */
  theme?: Record<string, unknown>;
  /** 是否为暗色主题 */
  isDark?: boolean;
}

/** 渲染器类型 */
export type RendererType = 'canvas' | 'svg';

/** 图表加载状态 */
export interface LoadingState {
  /** 是否显示加载 */
  show: boolean;
  /** 加载文本 */
  text?: string;
  /** 加载动画配置 */
  options?: LoadingOptions;
}

/** 加载动画配置 */
export interface LoadingOptions {
  /** 动画效果 */
  effect?: 'spin' | 'circle' | 'rect' | 'triangle' | 'dotted';
  /** 颜色 */
  color?: string;
  /** 背景色 */
  backgroundColor?: string;
  /** 文字颜色 */
  textColor?: string;
  /** 文字大小 */
  textFontSize?: number;
  /** 动画时长 */
  duration?: number;
  /** 遮罩层颜色 */
  maskColor?: string;
  /** 是否显示遮罩 */
  showMask?: boolean;
}

// ============================================================================
// 事件回调类型
// ============================================================================

/** 图表初始化回调 */
export type ChartInitCallback = (chart: ECharts) => void;

/** 图表就绪回调 */
export type ChartReadyCallback = (chart: ECharts) => void;

/** 图表事件回调 */
export type ChartEventCallback<T = unknown> = (params: T) => void;

/** 图表事件映射 */
export interface ChartEvents {
  /** 点击事件 */
  click?: ChartEventCallback;
  /** 双击事件 */
  dblclick?: ChartEventCallback;
  /** 右键菜单事件 */
  contextmenu?: ChartEventCallback;
  /** 鼠标按下事件 */
  mousedown?: ChartEventCallback;
  /** 鼠标释放事件 */
  mouseup?: ChartEventCallback;
  /** 鼠标悬停事件 */
  mouseover?: ChartEventCallback;
  /** 鼠标离开事件 */
  mouseout?: ChartEventCallback;
  /** 数据范围改变事件 */
  datazoom?: ChartEventCallback;
  /** 图例选择变化事件 */
  legendselectchanged?: ChartEventCallback;
  /** 图例悬停事件 */
  legendhoverlink?: ChartEventCallback;
  /** 序列数据项高亮 */
  highlight?: ChartEventCallback;
  /** 序列数据项取消高亮 */
  downplay?: ChartEventCallback;
  /** 工具提示触发事件 */
  showtip?: ChartEventCallback;
  /** 隐藏工具提示事件 */
  hidetip?: ChartEventCallback;
}

// ============================================================================
// 响应式配置
// ============================================================================

/** 响应式断点 */
export interface ResponsiveBreakpoints {
  /** 小屏幕 (< 576px) */
  sm?: Partial<BaseChartProps>;
  /** 中等屏幕 (≥ 576px) */
  md?: Partial<BaseChartProps>;
  /** 大屏幕 (≥ 992px) */
  lg?: Partial<BaseChartProps>;
  /** 超大屏幕 (≥ 1200px) */
  xl?: Partial<BaseChartProps>;
}

/** 响应式配置 */
export interface ResponsiveConfig {
  /** 是否启用响应式 */
  enabled?: boolean;
  /** 断点配置 */
  breakpoints?: ResponsiveBreakpoints;
  /** 切换去抖延迟 (ms) */
  debounceDelay?: number;
}

// ============================================================================
// 数据类型
// ============================================================================

/** 数据系列 */
export interface DataSeries<T = unknown> {
  /** 系列名称 */
  name: string;
  /** 系列数据 */
  data: T[];
  /** 系列类型 */
  type?: string;
  /** 系列样式 */
  style?: Record<string, unknown>;
  /** 是否禁用 */
  disabled?: boolean;
}

/** 图表数据 */
export interface ChartData {
  /** 类别轴数据 (用于折线图、柱状图等) */
  categories?: (string | number)[];
  /** 数据系列 */
  series?: DataSeries[];
  /** 原始数据 (用于饼图、散点图等) */
  values?: unknown[];
}

// ============================================================================
// 动画配置
// ============================================================================

/** 动画配置 */
export interface AnimationConfig {
  /** 是否启用动画 */
  enabled?: boolean;
  /** 动画时长 (ms) */
  duration?: number;
  /** 动画缓动函数 */
  easing?: string;
  /** 动画延迟 (ms) */
  delay?: number;
  /** 是否在渲染时使用动画 */
  animate?: boolean;
  /** 是否在数据更新时使用动画 */
  animateUpdate?: boolean;
}

// ============================================================================
// 基础图表属性
// ============================================================================

/**
 * 图表组件基本属性
 */
export interface BaseChartProps {
  // ---------- 核心配置 ----------

  /**
   * 图表配置项 (EChartsOption)
   * 支持所有 ECharts 配置项
   */
  option?: EChartsOption;

  /**
   * 简化的数据配置
   * 用于快速配置图表数据
   */
  data?: ChartData;

  // ---------- 尺寸配置 ----------

  /**
   * 宽度
   * @default '100%'
   */
  width?: SizeValue;

  /**
   * 高度
   * @default 400
   */
  height?: SizeValue;

  /**
   * 最小宽度
   */
  minWidth?: SizeValue;

  /**
   * 最小高度
   */
  minHeight?: SizeValue;

  /**
   * 最大宽度
   */
  maxWidth?: SizeValue;

  /**
   * 最大高度
   */
  maxHeight?: SizeValue;

  // ---------- 主题配置 ----------

  /**
   * 主题名称或主题对象
   * 可使用内置主题: 'default', 'dark', 'light', 'vintage', 'macarons', 'infographic'
   * 或自定义主题对象
   */
  theme?: string | Record<string, unknown>;

  /**
   * 暗色模式
   * @default false
   */
  darkMode?: boolean;

  // ---------- 样式配置 ----------

  /**
   * 容器样式
   */
  style?: CSSProperties;

  /**
   * 容器类名
   */
  className?: string;

  /**
   * 容器 ID
   */
  id?: string;

  // ---------- 响应式配置 ----------

  /**
   * 是否自动调整大小
   * @default true
   */
  autoResize?: boolean;

  /**
   * 响应式配置
   */
  responsive?: ResponsiveConfig;

  // ---------- 加载状态 ----------

  /**
   * 是否显示加载动画
   * @default false
   */
  loading?: boolean;

  /**
   * 加载动画配置
   */
  loadingOption?: LoadingOptions;

  /**
   * 加载状态文本
   */
  loadingText?: string;

  // ---------- 回调函数 ----------

  /**
   * 图表实例初始化完成回调
   */
  onChartInit?: ChartInitCallback;

  /**
   * 图表渲染完成回调
   */
  onChartReady?: ChartReadyCallback;

  /**
   * 图表事件回调
   */
  onEvents?: ChartEvents;

  /**
   * 错误回调
   */
  onError?: (error: Error) => void;

  // ---------- 渲染配置 ----------

  /**
   * 渲染器类型
   * @default 'canvas'
   */
  renderer?: RendererType;

  /**
   * 设备像素比
   * 默认自动获取
   */
  devicePixelRatio?: number;

  // ---------- 动画配置 ----------

  /**
   * 全局动画配置
   */
  animation?: AnimationConfig;

  // ---------- 标题配置 ----------

  /**
   * 图表标题
   */
  title?: string | { text: string; subtext?: string; [key: string]: unknown };

  /**
   * 是否显示标题
   * @default true
   */
  showTitle?: boolean;

  // ---------- 图例配置 ----------

  /**
   * 是否显示图例
   * @default true
   */
  showLegend?: boolean;

  // ---------- 工具提示配置 ----------

  /**
   * 是否显示工具提示
   * @default true
   */
  showTooltip?: boolean;

  /**
   * 工具提示配置
   */
  tooltip?: Record<string, unknown>;
}

// ============================================================================
// 特定图表类型属性
// ============================================================================

/**
 * 折线图属性
 */
export interface LineChartProps extends BaseChartProps {
  /** 图表类型 */
  type?: 'line' | 'area' | 'stacked' | 'percent';

  /** 是否平滑曲线 */
  smooth?: boolean;

  /** 是否显示面积 */
  showArea?: boolean;

  /** 是否显示数据点 */
  showSymbol?: boolean;

  /** 面积样式 */
  areaStyle?: Record<string, unknown>;

  /** 线条样式 */
  lineStyle?: Record<string, unknown>;

  /** 标记点样式 */
  itemStyle?: Record<string, unknown>;
}

/**
 * 柱状图属性
 */
export interface BarChartProps extends BaseChartProps {
  /** 图表类型 */
  type?: 'bar' | 'stacked' | 'percent' | 'group';

  /** 柱条方向 */
  orientation?: 'vertical' | 'horizontal';

  /** 柱条宽度 */
  barWidth?: number | string;

  /** 柱条最大宽度 */
  barMaxWidth?: number | string;

  /** 柱条最小高度 */
  barMinHeight?: number;

  /** 圆角 */
  borderRadius?: number | number[];
}

/**
 * 饼图属性
 */
export interface PieChartProps extends BaseChartProps {
  /** 饼图类型 */
  type?: 'pie' | 'ring' | 'rose' | 'nightingale';

  /** 饼图半径 */
  radius?: number | string | [number | string, number | string];

  /** 中心点 */
  center?: [number | string, number | string];

  /** 是否显示标签 */
  showLabel?: boolean;

  /** 标签位置 */
  labelPosition?: 'outside' | 'inside' | 'center';

  /** 最小角度 */
  minAngle?: number;
}

/**
 * 散点图属性
 */
export interface ScatterChartProps extends BaseChartProps {
  /** 符号类型 */
  symbol?: string;

  /** 符号大小 */
  symbolSize?: number | ((value: number[]) => number);

  /** 大量数据优化 */
  large?: boolean;

  /** 大数据阈值 */
  largeThreshold?: number;
}

/**
 * 雷达图属性
 */
export interface RadarChartProps extends BaseChartProps {
  /** 雷达图指示器 */
  indicators?: Array<{ name: string; max?: number; color?: string }>;

  /** 雷达图形状 */
  shape?: 'polygon' | 'circle';

  /** 中心点 */
  center?: [number | string, number | string];

  /** 半径 */
  radius?: number | string;
}

/**
 * 漏斗图属性
 */
export interface FunnelChartProps extends BaseChartProps {
  /** 漏斗排序方式 */
  sort?: 'ascending' | 'descending' | 'none';

  /** 漏斗对齐方式 */
  align?: 'left' | 'center' | 'right';

  /** 间隙 */
  gap?: number;

  /** 最小高度 */
  min?: number;

  /** 最大高度 */
  max?: number;
}

/**
 * 仪表盘属性
 */
export interface GaugeChartProps extends BaseChartProps {
  /** 最小值 */
  min?: number;

  /** 最大值 */
  max?: number;

  /** 当前值 */
  value?: number;

  /** 刻度分段数 */
  splitNumber?: number;

  /** 半径 */
  radius?: number | string;

  /** 起始角度 */
  startAngle?: number;

  /** 结束角度 */
  endAngle?: number;

  /** 进度显示 */
  showProgress?: boolean;
}

/**
 * 热力图属性
 */
export interface HeatmapChartProps extends BaseChartProps {
  /** X 轴数据 */
  xAxisData?: (string | number)[];

  /** Y 轴数据 */
  yAxisData?: (string | number)[];

  /** 视觉映射配置 */
  visualMap?: Record<string, unknown>;
}

/**
 * 树图属性
 */
export interface TreeChartProps extends BaseChartProps {
  /** 树方向 */
  orient?: 'orthogonal' | 'radial';

  /** 展开层级 */
  initialTreeDepth?: number;

  /** 节点标签位置 */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';

  /** 是否显示连接线 */
  showLine?: boolean;
}

/**
 * 旭日图属性
 */
export interface SunburstChartProps extends BaseChartProps {
  /** 半径 */
  radius?: number | string | [number | string, number | string];

  /** 起始角度 */
  startAngle?: number;

  /** 最小角度 */
  minAngle?: number;

  /** 层级间隔 */
  levelGap?: number;
}

/**
 * 矩形树图属性
 * 用于展示带有层级结构的数据，通过矩形面积表示数据大小
 */
export interface TreeMapChartProps extends BaseChartProps {
  /** 矩形树图类型 */
  type?: 'treemap' | 'quasitree';

  /** 父节点名称 */
  name?: string;

  /** 数据值 */
  value?: number;

  /** 子节点数据 */
  children?: TreeMapChartProps[];

  /** 是否显示标签 */
  showLabel?: boolean;

  /** 标签位置 */
  labelPosition?: 'inside' | 'top' | 'left' | 'bottom' | 'right';

  /** 标签格式化 */
  labelFormatter?: Record<string, unknown>;

  /** 上限阈值 */
  upperLabel?: Record<string, unknown>;

  /** 视觉映射配置 */
  visualMin?: number;
  visualMax?: number;
  visualRange?: number[];

  /** 节点间隙 */
  gap?: number;

  /** 层级间距 */
  levelGap?: number;

  /** 是否可视化 */
  visual?: boolean;

  /** 是否显示breadcrumb */
  showBreadcrumb?: boolean;

  /** itemStyle配置 */
  itemStyle?: Record<string, unknown>;

  /** emphasis配置 */
  emphasis?: Record<string, unknown>;

  /** 区域样式 */
  areaColor?: string | string[];

  /** 渐变区域颜色 */
  colorSaturation?: number;

  /** 最小扇区角度 */
  minSectorAngle?: number;

  /** 最小叶子节点面积比例 */
  minLeafNodeAreaRatio?: number;

  /** 视口配置 */
  leafDepth?: number;
  drillDown?: boolean;
}

/**
 * 桑基图属性
 * 用于展示数据流向和转移关系
 */
export interface SankeyChartProps extends BaseChartProps {
  /** 桑基图节点数据 */
  nodes?: Array<{
    name: string;
    [key: string]: unknown;
  }>;

  /** 桑基图链接/边数据 */
  links?: Array<{
    source: string | number;
    target: string | number;
    value: number;
    [key: string]: unknown;
  }>;

  /** 节点对齐方式 */
  nodeAlign?: 'left' | 'right' | 'justify' | 'center';

  /** 节点间距 */
  nodeGap?: number;

  /** 节点宽度 */
  nodeWidth?: number;

  /** 节点排序方式 */
  nodeSort?: 'ascending' | 'descending' | 'none' | ((a: unknown, b: unknown) => number);

  /** 边的曲度 */
  linkCurveness?: number;

  /** 边方向 */
  orient?: 'horizontal' | 'vertical';

  /** 是否显示标签 */
  showLabel?: boolean;

  /** 标签配置 */
  label?: Record<string, unknown>;

  /** 节点样式 */
  nodeStyle?: Record<string, unknown>;

  /** 边样式 */
  linkStyle?: Record<string, unknown>;

  /** 强调状态配置 */
  emphasis?: {
    focus?: 'adjacency' | 'ancestor' | 'descendant' | string;
    itemStyle?: Record<string, unknown>;
    lineStyle?: Record<string, unknown>;
  };
}

/**
 * 箱线图属性
 * 用于展示数据的分布情况
 */
export interface BoxplotChartProps extends Omit<BaseChartProps, 'data'> {
  /** 图表类型 */
  type?: 'boxplot';

  /** 数据数组，每个箱子由5个数字组成 [min, Q1, median, Q3, max] */
  data?: number[][];

  /** 数据的维度索引 */
  dimensions?: string[];

  /** 批量数据 */
  batchData?: Array<{
    name: string;
    data: number[][];
  }>;

  /** 柱条宽度 */
  boxWidth?: number | [number, number];

  /** 异常值配置 */
  outlier?: Record<string, unknown>;

  /** 是否平滑 */
  smooth?: boolean;
}

/**
 * K线图/股票图属性
 * 用于展示股票、外汇等金融数据
 */
export interface CandlestickChartProps extends Omit<BaseChartProps, 'data'> {
  /** K线数据数组，每项为 [open, close, lowest, highest] */
  candlestickData?: number[][];

  /** X轴数据 */
  xAxisData?: (string | number)[];

  /** 数据对应的维度名 */
  dimensions?: string[];

  /** 批量数据 */
  batchData?: Array<{
    name: string;
    data: number[][];
  }>;

  /** K线柱条样式 */
  itemStyle?: Record<string, unknown>;

  /** 强调状态 */
  emphasis?: Record<string, unknown>;

  /** 是否平滑曲线 */
  smooth?: boolean;

  /** 是否显示MA线 */
  ma?: Array<{
    period: number;
    color?: string;
  }>;

  /** 是否显示成交量 */
  showVolume?: boolean;

  /** 成交量柱子样式 */
  volumeBar?: Record<string, unknown>;
}

/**
 * 关系图属性
 * 用于展示节点之间的关系
 */
export interface GraphChartProps extends BaseChartProps {
  /** 关系图节点数据 */
  nodes?: Array<{
    id: string | number;
    name: string;
    value?: number | number[];
    category?: number;
    symbol?: string;
    symbolSize?: number | number[];
    [key: string]: unknown;
  }>;

  /** 关系图边/链接数据 */
  links?: Array<{
    source: string | number;
    target: string | number;
    value?: number;
    lineStyle?: Record<string, unknown>;
    [key: string]: unknown;
  }>;

  /** 关系图类型 */
  layout?: 'none' | 'circular' | 'force';

  /** 力导向布局配置 */
  force?: Record<string, unknown>;

  /** 是否启用draggable */
  draggable?: boolean;

  /** 类别数据 */
  categories?: Array<{
    name: string;
    itemStyle?: Record<string, unknown>;
  }>;

  /** 是否显示标签 */
  showLabel?: boolean;

  /** 标签配置 */
  label?: Record<string, unknown>;

  /** 边标签配置 */
  edgeLabel?: Record<string, unknown>;

  /** 箭头配置 */
  arrow?: Record<string, unknown>;

  /** 强调状态 */
  emphasis?: {
    focus?: 'adjacency' | 'ancestor' | 'descendant';
    itemStyle?: Record<string, unknown>;
    lineStyle?: Record<string, unknown>;
  };
}

// ============================================================================
// 组件Slots (用于 React 19+)
// ============================================================================

/** 图表内部插槽 */
export interface ChartSlots {
  /** 标题区域 */
  title?: ReactNode;
  /** 图例区域 */
  legend?: ReactNode;
  /** 工具提示 */
  tooltip?: ReactNode;
  /** 自定义加载 */
  loading?: ReactNode;
  /** 错误提示 */
  error?: ReactNode;
}

// ============================================================================
// 工具类型
// ============================================================================

/** 图表配置构建器选项 */
export interface ChartBuilderOptions<T extends BaseChartProps = BaseChartProps> {
  /** 初始属性 */
  props?: Partial<T>;
  /** 主题 */
  theme?: string;
  /** 是否启用动画 */
  animation?: boolean;
}

// 重新导出 ECharts 类型
export type { EChartsOption, ECharts } from 'echarts';

// EChartsCoreOption 是 ECBasicOption 的别名
export type { ECBasicOption as EChartsCoreOption } from 'echarts/types/dist/shared';

/**
 * 词云图属性
 * 用于展示文本数据的词频分布
 */
export interface WordCloudChartProps extends BaseChartProps {
  /** 词云数据 - 也可以通过 option.series[0].data 传入 */
  wordCloudData?: Array<{
    name: string;
    value: number;
    textStyle?: Record<string, unknown>;
    emphasis?: Record<string, unknown>;
  }>;

  /** 词云形状 */
  shape?: 'circle' | 'cardioid' | 'diamond' | 'triangle' | 'star' | 'pentagon' | 'square';

  /** 字体大小范围 */
  sizeRange?: [number, number];

  /** 词云旋转角度范围 */
  rotationRange?: [number, number];

  /** 旋转步长 */
  rotationStep?: number;

  /** 词云间距 */
  gridSize?: number;

  /** 是否绘制词云轮廓 */
  drawOutOfBound?: boolean;

  /** 文字样式 */
  textStyle?: Record<string, unknown>;

  /** 强调状态 */
  emphasis?: {
    focus?: 'self' | 'adjacency';
    textStyle?: Record<string, unknown>;
  };
}
