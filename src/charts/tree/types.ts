/**
 * 树图类型定义
 * ECharts 内置 tree 类型
 */
import type { EChartsOption } from 'echarts';

// ============================================================================
// 树图数据节点
// ============================================================================

/**
 * 树图数据节点
 */
export interface TreeNode {
  /** 节点名称 */
  name: string;
  /** 节点值 */
  value?: number;
  /** 是否展开 */
  collapsed?: boolean;
  /** 图标 */
  icon?: string;
  /** 图形 */
  symbol?: string;
  /** 图形大小 */
  symbolSize?: number | [number, number];
  /** 标签配置 */
  label?: Record<string, unknown>;
  /** 元素样式 */
  itemStyle?: Record<string, unknown>;
  /** emphasis状态 */
  emphasis?: Record<string, unknown>;
  /** 线条样式 */
  lineStyle?: Record<string, unknown>;
  /** 子节点 */
  children?: TreeNode[];
  /** 其他自定义属性 */
  [key: string]: any;
}

// ============================================================================
// 树图系列配置
// ============================================================================

/** 树图系列配置 */
export interface TreeSeries {
  /** 系列类型 */
  type?: 'tree';
  /** 系列名称 */
  name?: string;
  /** 数据数组 (树的根节点) */
  data?: TreeNode[];
  /** 树的布局: 'orthogonal' | 'radial' */
  layout?: string;
  /** 树的方向: 'horizontal' | 'vertical' */
  orient?: string;
  /** 节点之间的间距 */
  nodeGap?: number;
  /** 节点的宽度 */
  nodeWidth?: number;
  /** 展开层级 */
  initialTreeDepth?: number;
  /** 标签配置 */
  label?: Record<string, unknown>;
  /** 标签位置 */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** 标签对齐 */
  labelAlign?: 'left' | 'right' | 'center';
  /** 标签格式化 */
  labelFormatter?: string | ((value: number, data: TreeNode) => string);
  /** 线条样式 */
  lineStyle?: Record<string, unknown>;
  /** 是否显示连接线 */
  showLine?: boolean;
  /** 连接线的弯曲度 */
  lineCurveness?: number;
  /** 树节点图形 */
  symbol?: string;
  /** 树节点大小 */
  symbolSize?: number | [number, number];
  /** 图形内标签 */
  innerLabel?: Record<string, unknown>;
  /** 元素样式 */
  itemStyle?: Record<string, unknown>;
  /** emphasis状态 */
  emphasis?: Record<string, unknown>;
  /** 聚焦状态 */
  focus?: Record<string, unknown>;
  /** leaves配置 */
  leaves?: Record<string, unknown>;
  /** 动画配置 */
  animation?: boolean;
  /** 动画时长 */
  animationDuration?: number;
  /** 动画缓动函数 */
  animationEasing?: string;
  /** 动画延迟 */
  animationDelay?: number | ((idx: number) => number);
  /** 动画更新时长 */
  animationDurationUpdate?: number;
  /** 动画更新缓动函数 */
  animationEasingUpdate?: string;
}

/** 树图选项配置 */
export interface TreeOption extends Omit<EChartsOption, 'series'> {
  series?: TreeSeries[];
}

// ============================================================================
// 组件 Props
// ============================================================================

/**
 * 树图组件属性
 */
export interface TreeChartProps {
  /** 图表配置项 (EChartsOption) */
  option?: TreeOption;
  /** 宽度 */
  width?: string | number;
  /** 高度 */
  height?: string | number;
  /** 树形数据 */
  treeData?: TreeNode[];
  /** 树的布局: 'orthogonal' (直角树) | 'radial' (辐射树) */
  layout?: 'orthogonal' | 'radial';
  /** 树的方向: 'horizontal' (水平) | 'vertical' (垂直) */
  orient?: 'horizontal' | 'vertical';
  /** 节点之间的间距 */
  nodeGap?: number;
  /** 节点的宽度 */
  nodeWidth?: number;
  /** 展开层级 */
  initialTreeDepth?: number;
  /** 节点图形 */
  symbol?: string;
  /** 节点大小 */
  symbolSize?: number | [number, number];
  /** 是否显示连接线 */
  showLine?: boolean;
  /** 连接线的弯曲度 */
  lineCurveness?: number;
  /** 标签配置 */
  label?: Record<string, unknown>;
  /** 标签位置 */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** 标签对齐 */
  labelAlign?: 'left' | 'right' | 'center';
  /** 线条样式 */
  lineStyle?: Record<string, unknown>;
  /** 元素样式 */
  itemStyle?: Record<string, unknown>;
  /** 主题 */
  theme?: string | Record<string, unknown>;
  /** 样式 */
  style?: React.CSSProperties;
  /** 类名 */
  className?: string;
  /** 是否自动调整大小 */
  autoResize?: boolean;
  /** 渲染器类型 */
  renderer?: 'canvas' | 'svg';
  /** 加载状态 */
  loading?: boolean;
  /** 加载配置 */
  loadingOption?: Record<string, unknown>;
  /** 图表初始化回调 */
  onChartInit?: (chart: any) => void;
  /** 图表就绪回调 */
  onChartReady?: (chart: any) => void;
  /** 事件回调 */
  onEvents?: Record<string, (params: any) => void>;
}
