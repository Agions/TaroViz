/**
 * TaroViz 图表配置生成器类型定义
 */

import { EChartsOption } from '../../types';

/**
 * 图表类型
 */
export type ChartType =
  | 'line'
  | 'bar'
  | 'pie'
  | 'scatter'
  | 'radar'
  | 'heatmap'
  | 'gauge'
  | 'funnel'
  | 'tree'
  | 'treemap'
  | 'sunburst'
  | 'boxplot'
  | 'candlestick'
  | 'effectScatter'
  | 'lines'
  | 'graph'
  | 'sankey'
  | 'parallel'
  | 'liquid'
  | 'map'
  | 'wordCloud'
  | 'custom';

/**
 * 数据系列类型
 */
export type SeriesType =
  | 'line'
  | 'bar'
  | 'pie'
  | 'scatter'
  | 'radar'
  | 'heatmap'
  | 'gauge'
  | 'funnel'
  | 'tree'
  | 'treemap'
  | 'sunburst'
  | 'boxplot'
  | 'candlestick'
  | 'effectScatter'
  | 'lines'
  | 'graph'
  | 'sankey'
  | 'parallel'
  | 'liquid'
  | 'map'
  | 'wordCloud'
  | 'custom';

/**
 * 坐标轴类型
 */
export type AxisType = 'category' | 'value' | 'time' | 'log';

/**
 * 数据项类型
 */
export interface DataItem {
  /**
   * 数据名称
   */
  name?: string;
  /**
   * 数据值
   */
  value: number | number[];
  /**
   * 数据标签
   */
  label?: string;
  /**
   * 数据颜色
   */
  color?: string;
  /**
   * 其他自定义属性
   */
  [key: string]: any;
}

/**
 * 系列配置
 */
export interface SeriesConfig {
  /**
   * 系列名称
   */
  name?: string;
  /**
   * 系列类型
   */
  type: SeriesType;
  /**
   * 系列数据
   */
  data: DataItem[];
  /**
   * X轴索引
   */
  xAxisIndex?: number;
  /**
   * Y轴索引
   */
  yAxisIndex?: number;
  /**
   * 是否显示图例
   */
  showInLegend?: boolean;
  /**
   * 系列样式配置
   */
  style?: {
    /**
     * 颜色
     */
    color?: string;
    /**
     * 宽度
     */
    width?: number;
    /**
     * 高度
     */
    height?: number;
    /**
     * 其他样式属性
     */
    [key: string]: any;
  };
  /**
   * 其他自定义属性
   */
  [key: string]: any;
}

/**
 * 坐标轴配置
 */
export interface AxisConfig {
  /**
   * 坐标轴类型
   */
  type: AxisType;
  /**
   * 坐标轴名称
   */
  name?: string;
  /**
   * 坐标轴数据
   */
  data?: string[];
  /**
   * 是否显示坐标轴
   */
  show?: boolean;
  /**
   * 坐标轴位置
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * 其他自定义属性
   */
  [key: string]: any;
}

/**
 * 图例配置
 */
export interface LegendConfig {
  /**
   * 是否显示图例
   */
  show?: boolean;
  /**
   * 图例位置
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * 图例类型
   */
  type?: 'plain' | 'scroll';
  /**
   * 其他自定义属性
   */
  [key: string]: any;
}

/**
 * 提示框配置
 */
export interface TooltipConfig {
  /**
   * 是否显示提示框
   */
  show?: boolean;
  /**
   * 提示框触发方式
   */
  trigger?: 'item' | 'axis' | 'none';
  /**
   * 提示框格式化函数
   */
  formatter?: string | ((params: any) => string);
  /**
   * 其他自定义属性
   */
  [key: string]: any;
}

/**
 * 工具箱配置
 */
export interface ToolboxConfig {
  /**
   * 是否显示工具箱
   */
  show?: boolean;
  /**
   * 工具箱功能
   */
  feature?: {
    /**
     * 保存图片
     */
    saveAsImage?: boolean | object;
    /**
     * 数据视图
     */
    dataView?: boolean | object;
    /**
     * 数据缩放
     */
    dataZoom?: boolean | object;
    /**
     * 重置
     */
    restore?: boolean | object;
    /**
     * 切换图表类型
     */
    magicType?: boolean | object;
    /**
     * 数据筛选
     */
    dataFilter?: boolean | object;
  };
  /**
   * 其他自定义属性
   */
  [key: string]: any;
}

/**
 * 数据缩放配置
 */
export interface DataZoomConfig {
  /**
   * 是否显示数据缩放
   */
  show?: boolean;
  /**
   * 数据缩放类型
   */
  type?: 'inside' | 'slider';
  /**
   * 数据缩放起始位置
   */
  start?: number;
  /**
   * 数据缩放结束位置
   */
  end?: number;
  /**
   * 其他自定义属性
   */
  [key: string]: any;
}

/**
 * 图表配置生成器选项
 */
export interface ConfigGeneratorOptions {
  /**
   * 图表类型
   */
  chartType: ChartType;
  /**
   * 图表标题
   */
  title?: string | { text: string; subtext?: string };
  /**
   * 图表副标题
   */
  subtitle?: string;
  /**
   * 系列配置
   */
  series: SeriesConfig[];
  /**
   * X轴配置
   */
  xAxis?: AxisConfig | AxisConfig[];
  /**
   * Y轴配置
   */
  yAxis?: AxisConfig | AxisConfig[];
  /**
   * 图例配置
   */
  legend?: LegendConfig;
  /**
   * 提示框配置
   */
  tooltip?: TooltipConfig;
  /**
   * 工具箱配置
   */
  toolbox?: ToolboxConfig;
  /**
   * 数据缩放配置
   */
  dataZoom?: DataZoomConfig | DataZoomConfig[];
  /**
   * 图表主题
   */
  theme?: string;
  /**
   * 图表宽度
   */
  width?: number | string;
  /**
   * 图表高度
   */
  height?: number | string;
  /**
   * 是否响应式
   */
  responsive?: boolean;
  /**
   * 其他自定义属性
   */
  [key: string]: any;
}

/**
 * 图表配置模板
 */
export interface ChartConfigTemplate {
  /**
   * 模板名称
   */
  name: string;
  /**
   * 模板描述
   */
  description: string;
  /**
   * 模板适用的图表类型
   */
  chartTypes: ChartType[];
  /**
   * 模板配置
   */
  config: Partial<ConfigGeneratorOptions>;
  /**
   * 模板缩略图
   */
  thumbnail?: string;
}

/**
 * 配置生成器结果
 */
export interface ConfigGeneratorResult {
  /**
   * 生成的ECharts配置
   */
  option: EChartsOption;
  /**
   * 生成配置的元数据
   */
  metadata: {
    /**
     * 图表类型
     */
    chartType: ChartType;
    /**
     * 系列数量
     */
    seriesCount: number;
    /**
     * 数据项数量
     */
    dataItemCount: number;
    /**
     * 生成时间
     */
    generatedAt: number;
  };
}

/**
 * 配置生成器事件类型
 */
export enum ConfigGeneratorEventType {
  /**
   * 配置生成开始事件
   */
  GENERATE_START = 'configGenerateStart',
  /**
   * 配置生成完成事件
   */
  GENERATE_COMPLETE = 'configGenerateComplete',
  /**
   * 配置生成失败事件
   */
  GENERATE_ERROR = 'configGenerateError',
  /**
   * 模板应用事件
   */
  TEMPLATE_APPLY = 'templateApply',
  /**
   * 配置预览事件
   */
  CONFIG_PREVIEW = 'configPreview',
}

/**
 * 配置生成器事件处理器
 */
export type ConfigGeneratorEventHandler = (event: {
  type: ConfigGeneratorEventType;
  data?: any;
}) => void;
