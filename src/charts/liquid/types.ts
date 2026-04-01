/**
 * 水球图类型定义
 * ECharts 没有内置水球图，使用 echarts-liquidfill 库实现
 */
import type React from 'react';
import type { EChartsOption } from 'echarts';

// ============================================================================
// 水球图配置类型
// ============================================================================

/** 水球图系列数据项 */
export interface LiquidSeriesDataItem {
  /** 数据值，范围 [0, 1] */
  value: number;
  /** 数据项名称 */
  name?: string;
  /** 图形样式 */
  itemStyle?: Record<string, unknown>;
  /** 标签配置 */
  label?: Record<string, unknown>;
  /** 强调状态 */
  emphasis?: Record<string, unknown>;
}

/** 水球图形状类型 */
export type LiquidShape = 'circle' | 'rect' | 'roundRect';

/** 水球图系列配置 */
export interface LiquidSeries {
  /** 系列类型 */
  type?: 'liquidFill';
  /** 系列名称 */
  name?: string;
  /** 数据数组 */
  data?: (number | LiquidSeriesDataItem)[];
  /** 图形形状 */
  shape?: LiquidShape;
  /** 振幅 (相对于半径的比例) */
  amplitude?: number;
  /** 波长 (相对于画布宽度) */
  waveLength?: number | string;
  /** 相位偏移 */
  phase?: number;
  /** 周期时间 (ms) */
  period?: number;
  /** 波的个数 */
  waveCount?: number;
  /** 是否禁用动画 */
  animationDisabled?: boolean;
  /** 动画时长 */
  animationDuration?: number;
  /** 动画缓动函数 */
  animationEasing?: string;
  /** 动画延迟 */
  animationDelay?: number | ((idx: number) => number);
  /** 颜色数组 */
  color?: string[];
  /** 背景色 */
  backgroundColor?: string;
  /** 图形内标签 */
  label?: Record<string, unknown>;
  /** 图形样式 */
  itemStyle?: Record<string, unknown>;
  /** emphasis状态 */
  emphasis?: Record<string, unknown>;
  /** 浪的样式 */
  waveStyle?: Record<string, unknown>;
}

/** 水球图选项配置 */
export interface LiquidOption extends Omit<EChartsOption, 'series'> {
  series?: LiquidSeries[];
}

// ============================================================================
// 组件 Props
// ============================================================================

/**
 * 水球图组件属性
 */
export interface LiquidChartProps {
  /** 图表配置项 (EChartsOption) */
  option?: LiquidOption;
  /** 宽度 */
  width?: string | number;
  /** 高度 */
  height?: string | number;
  /** 水球数据数组，每个值代表一个波纹，范围 [0, 1] */
  waveData?: number[];
  /** 图形形状 */
  shape?: LiquidShape;
  /** 振幅 (相对于半径的比例) */
  amplitude?: number;
  /** 波长 (相对于画布宽度) */
  waveLength?: number | string;
  /** 相位偏移 */
  phase?: number;
  /** 周期时间 (ms) */
  period?: number;
  /** 背景色 */
  backgroundColor?: string;
  /** 颜色数组 */
  color?: string[];
  /** 是否显示标签 */
  showLabel?: boolean;
  /** 标签格式化 */
  labelFormatter?: (value: number) => string;
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
