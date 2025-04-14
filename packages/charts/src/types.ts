/**
 * TaroViz Charts 类型定义
 */
import { EChartsOption } from '@agions/taroviz-core';
import * as echarts from 'echarts/core';

/**
 * 图表组件基本属性
 */
export interface BaseChartProps {
  /**
   * 图表配置项
   */
  option: EChartsOption;

  /**
   * 宽度
   */
  width?: number | string;

  /**
   * 高度
   */
  height?: number | string;

  /**
   * 主题
   */
  theme?: string | object;

  /**
   * 样式
   */
  style?: React.CSSProperties;

  /**
   * 类名
   */
  className?: string;

  /**
   * 是否自动调整大小
   */
  autoResize?: boolean;

  /**
   * 是否显示加载动画
   */
  loading?: boolean;

  /**
   * 加载动画配置
   */
  loadingOption?: object;

  /**
   * 图表实例初始化回调
   */
  onChartInit?: (chart: echarts.ECharts) => void;

  /**
   * 图表准备好的回调
   */
  onChartReady?: (chart: echarts.ECharts) => void;

  /**
   * 渲染器类型
   */
  renderer?: 'canvas' | 'svg';

  /**
   * 事件回调
   */
  onEvents?: Record<string, (params: any) => void>;
}

/**
 * 折线图属性
 */
export interface LineChartProps extends BaseChartProps {
  // 折线图特有属性
}

/**
 * 柱状图属性
 */
export interface BarChartProps extends BaseChartProps {
  // 柱状图特有属性
}

/**
 * 饼图属性
 */
export interface PieChartProps extends BaseChartProps {
  // 饼图特有属性
}

/**
 * 散点图属性
 */
export interface ScatterChartProps extends BaseChartProps {
  // 散点图特有属性
}

/**
 * 雷达图属性
 */
export interface RadarChartProps extends BaseChartProps {
  // 雷达图特有属性
}

/**
 * 漏斗图属性
 */
export interface FunnelChartProps extends BaseChartProps {
  // 漏斗图特有属性
}

/**
 * 仪表盘属性
 */
export interface GaugeChartProps extends BaseChartProps {
  // 仪表盘特有属性
}

/**
 * 热力图属性
 */
export interface HeatmapChartProps extends BaseChartProps {
  // 热力图特有属性
}

/**
 * 树图属性
 */
export interface TreeChartProps extends BaseChartProps {
  // 树图特有属性
}

/**
 * 旭日图属性
 */
export interface SunburstChartProps extends BaseChartProps {
  // 旭日图特有属性
}
