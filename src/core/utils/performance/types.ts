/**
 * TaroViz 性能分析工具类型定义
 */

/**
 * 性能指标类型
 */
export type PerformanceMetricType =
  | 'initTime'
  | 'renderTime'
  | 'updateTime'
  | 'dataSize'
  | 'frameRate'
  | 'memoryUsage'
  | 'cpuUsage';

/**
 * 性能指标数据
 */
export interface PerformanceMetric {
  /**
   * 指标类型
   */
  type: PerformanceMetricType;

  /**
   * 指标值
   */
  value: number;

  /**
   * 指标单位
   */
  unit: string;

  /**
   * 采集时间
   */
  timestamp: number;

  /**
   * 指标描述
   */
  description?: string;
}

/**
 * 性能分析配置
 */
export interface PerformanceAnalysisConfig {
  /**
   * 是否启用性能监控
   */
  enabled?: boolean;

  /**
   * 监控的指标列表
   */
  metrics?: PerformanceMetricType[];

  /**
   * 采样间隔（毫秒）
   */
  sampleInterval?: number;

  /**
   * 最大采样数据点数量
   */
  maxSamples?: number;

  /**
   * 是否启用实时监控
   */
  realTime?: boolean;

  /**
   * 是否自动开始监控
   */
  autoStart?: boolean;
}

/**
 * 性能分析结果
 */
export interface PerformanceAnalysisResult {
  /**
   * 平均指标值
   */
  averages: Record<PerformanceMetricType, number>;

  /**
   * 最大指标值
   */
  maxValues: Record<PerformanceMetricType, number>;

  /**
   * 最小指标值
   */
  minValues: Record<PerformanceMetricType, number>;

  /**
   * 指标趋势数据
   */
  trends: Record<PerformanceMetricType, PerformanceMetric[]>;

  /**
   * 性能评分（0-100）
   */
  score: number;

  /**
   * 性能建议
   */
  suggestions: string[];

  /**
   * 采集的总数据点数量
   */
  totalSamples: number;

  /**
   * 监控持续时间（毫秒）
   */
  duration: number;
}

/**
 * 性能事件类型
 */
export enum PerformanceEventType {
  /**
   * 性能监控开始事件
   */
  MONITORING_START = 'performanceMonitoringStart',

  /**
   * 性能监控结束事件
   */
  MONITORING_END = 'performanceMonitoringEnd',

  /**
   * 性能指标更新事件
   */
  METRIC_UPDATE = 'performanceMetricUpdate',

  /**
   * 性能分析完成事件
   */
  ANALYSIS_COMPLETE = 'performanceAnalysisComplete',
}

/**
 * 性能事件回调类型
 */
export type PerformanceEventHandler = (event: { type: PerformanceEventType; data?: any }) => void;

/**
 * 性能分析报告配置
 */
export interface PerformanceReportConfig {
  /**
   * 报告格式
   */
  format?: 'json' | 'html' | 'csv';

  /**
   * 是否包含图表
   */
  includeCharts?: boolean;

  /**
   * 是否包含建议
   */
  includeSuggestions?: boolean;

  /**
   * 是否包含详细数据
   */
  includeDetailedData?: boolean;
}
