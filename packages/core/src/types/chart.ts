/**
 * 图表类型定义
 */
import type { ComposeOption } from 'echarts/core';
import type { 
  BarSeriesOption, 
  LineSeriesOption,
  PieSeriesOption,
  ScatterSeriesOption,
  RadarSeriesOption
} from 'echarts/charts';
import type {
  TitleComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TooltipComponentOption,
  ToolboxComponentOption,
  DataZoomComponentOption
} from 'echarts/components';

/**
 * 渲染优化配置
 */
export interface RenderOptimizationConfig {
  /**
   * 是否启用渐进式渲染
   */
  progressive?: boolean;
  
  /**
   * 渐进式渲染阈值
   */
  progressiveThreshold?: number;
  
  /**
   * 渐进式渲染模式
   */
  progressiveChunkMode?: 'sequential' | 'mod';
  
  /**
   * 是否启用懒更新
   */
  lazyUpdate?: boolean;
  
  /**
   * 动画刷新阈值
   */
  animationThreshold?: number;
}

/**
 * 图表配置项类型
 */
export type ChartOptions = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | ScatterSeriesOption
  | RadarSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | ToolboxComponentOption
  | DataZoomComponentOption
>; 