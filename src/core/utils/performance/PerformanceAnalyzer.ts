/**
 * TaroViz 性能分析工具核心实现
 */

import {
  PerformanceMetricType,
  PerformanceMetric,
  PerformanceAnalysisConfig,
  PerformanceAnalysisResult,
  PerformanceEventType,
  PerformanceEventHandler,
  PerformanceEventData,
  PerformanceReportConfig,
} from './types';

/**
 * 性能分析器类
 * 负责监控、采集和分析图表性能数据
 */
export class PerformanceAnalyzer {
  private static instance: PerformanceAnalyzer | null = null;
  // Per-chart isolated instances
  private static instances: Map<string, PerformanceAnalyzer> = new Map();
  private config: PerformanceAnalysisConfig;
  private metrics: Map<PerformanceMetricType, PerformanceMetric[]> = new Map();
  private eventHandlers: Map<PerformanceEventType, PerformanceEventHandler[]> = new Map();
  private isMonitoring: boolean = false;
  private startTime: number = 0;
  private sampleIntervalId: NodeJS.Timeout | null = null;
  private frameRateHistory: number[] = [];
  private lastFrameTime: number = 0;

  /**
   * 私有构造函数，使用单例模式
   */
  private constructor(config: PerformanceAnalysisConfig = {}) {
    this.config = {
      enabled: true,
      metrics: ['initTime', 'renderTime', 'updateTime', 'dataSize', 'frameRate'],
      sampleInterval: 1000,
      maxSamples: 100,
      realTime: true,
      autoStart: false,
      ...config,
    };

    // 初始化指标存储
    this.config.metrics?.forEach((metricType) => {
      this.metrics.set(metricType, []);
    });

    // 自动开始监控
    if (this.config.autoStart) {
      this.start();
    }
  }

  /**
   * 获取实例
   * - 传入 chartId 时：每个 chartId 获得独立实例（指标隔离）
   * - 不传 chartId 时：全局单例（向后兼容）
   */
  public static getInstance(config?: PerformanceAnalysisConfig): PerformanceAnalyzer {
    if (config?.chartId) {
      if (!PerformanceAnalyzer.instances.has(config.chartId)) {
        PerformanceAnalyzer.instances.set(config.chartId, new PerformanceAnalyzer(config));
      }
      return PerformanceAnalyzer.instances.get(config.chartId)!;
    }
    // Legacy: global singleton
    if (!PerformanceAnalyzer.instance) {
      PerformanceAnalyzer.instance = new PerformanceAnalyzer(config);
    }
    return PerformanceAnalyzer.instance;
  }

  /**
   * 重置单例实例
   */
  public static resetInstance(): void {
    if (PerformanceAnalyzer.instance) {
      PerformanceAnalyzer.instance.stop();
      PerformanceAnalyzer.instance = null;
    }
  }

  /**
   * 重置所有图表实例（用于测试/清理）
   */
  public static resetAllInstances(): void {
    PerformanceAnalyzer.resetInstance();
    PerformanceAnalyzer.instances.forEach((analyzer) => analyzer.stop());
    PerformanceAnalyzer.instances.clear();
  }

  /**
   * 注册事件处理器
   */
  public on(eventType: PerformanceEventType, handler: PerformanceEventHandler): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, []);
    }
    this.eventHandlers.get(eventType)?.push(handler);
  }

  /**
   * 移除事件处理器
   */
  public off(eventType: PerformanceEventType, handler: PerformanceEventHandler): void {
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  /**
   * 触发事件
   */
  private emit(eventType: PerformanceEventType.MONITORING_START): void;
  private emit(eventType: PerformanceEventType.MONITORING_END): void;
  private emit(eventType: PerformanceEventType.METRIC_UPDATE, data: PerformanceMetric): void;
  private emit(
    eventType: PerformanceEventType.ANALYSIS_COMPLETE,
    data: PerformanceAnalysisResult
  ): void;
  private emit(
    eventType: PerformanceEventType,
    data?: PerformanceMetric | PerformanceAnalysisResult
  ): void {
    const handlers = this.eventHandlers.get(eventType);
    const eventData: PerformanceEventData =
      data === undefined
        ? {
            type: eventType as
              | PerformanceEventType.MONITORING_START
              | PerformanceEventType.MONITORING_END,
          }
        : eventType === PerformanceEventType.METRIC_UPDATE
          ? { type: eventType, data: data as PerformanceMetric }
          : { type: eventType, data: data as PerformanceAnalysisResult };
    handlers?.forEach((handler) => {
      try {
        handler(eventData);
      } catch (error) {
        console.error('Error in performance event handler:', error);
      }
    });
  }

  /**
   * 开始性能监控
   */
  public start(): void {
    if (this.isMonitoring || !this.config.enabled) {
      return;
    }

    this.isMonitoring = true;
    this.startTime = Date.now();
    this.lastFrameTime = performance.now();

    // 启动采样定时器
    if (this.config.sampleInterval && this.config.realTime) {
      this.sampleIntervalId = setInterval(() => {
        this.sampleMetrics();
      }, this.config.sampleInterval);
    }

    // 监听帧率
    this.startFrameRateMonitoring();

    this.emit(PerformanceEventType.MONITORING_START);
  }

  /**
   * 停止性能监控
   */
  public stop(): void {
    if (!this.isMonitoring) {
      return;
    }

    this.isMonitoring = false;

    // 清除采样定时器
    if (this.sampleIntervalId) {
      clearInterval(this.sampleIntervalId);
      this.sampleIntervalId = null;
    }

    // 停止帧率监控
    this.stopFrameRateMonitoring();

    this.emit(PerformanceEventType.MONITORING_END);
  }

  /**
   * 释放资源
   * 完全清理性能分析器，包括单例实例
   */
  public dispose(): void {
    this.stop();
    this.metrics.clear();
    this.eventHandlers.clear();
    this.frameRateHistory = [];

    // 如果是当前单例，清除单例引用
    if (PerformanceAnalyzer.instance === this) {
      PerformanceAnalyzer.instance = null;
    }
  }

  /**
   * RAF 动画帧 ID，用于取消
   */
  private rafId: number | null = null;

  /**
   * 开始帧率监控
   */
  private startFrameRateMonitoring(): void {
    const updateFrameRate = () => {
      if (!this.isMonitoring) {
        return;
      }

      const currentTime = performance.now();
      const deltaTime = currentTime - this.lastFrameTime;
      const frameRate = deltaTime > 0 ? Math.round(1000 / deltaTime) : 0;

      // 使用 config.maxSamples 限制历史记录长度
      const maxSamples = this.config.maxSamples ?? 100;
      if (this.frameRateHistory.length >= maxSamples) {
        this.frameRateHistory.shift();
      }
      this.frameRateHistory.push(frameRate);

      this.lastFrameTime = currentTime;
      this.rafId = requestAnimationFrame(updateFrameRate);
    };

    this.rafId = requestAnimationFrame(updateFrameRate);
  }

  /**
   * 停止帧率监控
   */
  private stopFrameRateMonitoring(): void {
    // 取消 RAF 循环，防止继续运行
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.frameRateHistory = [];
  }

  /**
   * 采样性能指标
   */
  private sampleMetrics(): void {
    if (!this.isMonitoring) {
      return;
    }

    // 采样帧率
    if (this.config.metrics?.includes('frameRate') && this.frameRateHistory.length > 0) {
      const avgFrameRate =
        this.frameRateHistory.reduce((sum, fr) => sum + fr, 0) / this.frameRateHistory.length;
      this.recordMetric('frameRate', avgFrameRate, 'FPS');
    }

    // 采样内存使用（如果支持）
    if (
      this.config.metrics?.includes('memoryUsage') &&
      typeof (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory !==
        'undefined'
    ) {
      const memory = (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory;
      const memoryUsage = ((memory?.usedJSHeapSize ?? 0) / (1024 * 1024)).toFixed(2);
      this.recordMetric('memoryUsage', parseFloat(memoryUsage), 'MB');
    }
  }

  /**
   * 记录性能指标
   */
  public recordMetric(
    type: PerformanceMetricType,
    value: number,
    unit: string,
    description?: string
  ): void {
    if (!this.config.enabled || !this.config.metrics?.includes(type)) {
      return;
    }

    const metric: PerformanceMetric = {
      type,
      value,
      unit,
      timestamp: Date.now(),
      description,
    };

    // 获取当前指标列表
    const metrics = this.metrics.get(type) || [];

    // 添加新指标
    metrics.push(metric);

    // 限制指标数量
    if (this.config.maxSamples && metrics.length > this.config.maxSamples) {
      metrics.shift();
    }

    // 更新指标存储
    this.metrics.set(type, metrics);

    // 触发指标更新事件
    this.emit(PerformanceEventType.METRIC_UPDATE, metric);
  }

  /**
   * 记录初始化时间
   */
  public recordInitTime(duration: number): void {
    this.recordMetric('initTime', duration, 'ms', '图表初始化耗时');
  }

  /**
   * 记录渲染时间
   */
  public recordRenderTime(duration: number): void {
    this.recordMetric('renderTime', duration, 'ms', '图表渲染耗时');
  }

  /**
   * 记录更新时间
   */
  public recordUpdateTime(duration: number): void {
    this.recordMetric('updateTime', duration, 'ms', '图表更新耗时');
  }

  /**
   * 记录数据大小
   */
  public recordDataSize(data: unknown): void {
    try {
      const dataSize = new Blob([JSON.stringify(data)]).size / 1024;
      this.recordMetric('dataSize', dataSize, 'KB', '图表数据大小');
    } catch (error) {
      console.error('Failed to calculate data size:', error);
    }
  }

  /**
   * 分析性能数据
   */
  public analyze(): PerformanceAnalysisResult {
    const averages: Record<PerformanceMetricType, number> = {} as Record<
      PerformanceMetricType,
      number
    >;
    const maxValues: Record<PerformanceMetricType, number> = {} as Record<
      PerformanceMetricType,
      number
    >;
    const minValues: Record<PerformanceMetricType, number> = {} as Record<
      PerformanceMetricType,
      number
    >;
    const trends: Record<PerformanceMetricType, PerformanceMetric[]> = {} as Record<
      PerformanceMetricType,
      PerformanceMetric[]
    >;

    let totalSamples = 0;
    let score = 100;
    const suggestions: string[] = [];

    // 计算各项指标的统计数据
    this.metrics.forEach((metricList, metricType) => {
      if (metricList.length === 0) {
        return;
      }

      totalSamples += metricList.length;
      trends[metricType] = [...metricList];

      // 计算平均值
      const sum = metricList.reduce((acc, metric) => acc + metric.value, 0);
      averages[metricType] = parseFloat((sum / metricList.length).toFixed(2));

      // 计算最大值
      maxValues[metricType] = Math.max(...metricList.map((metric) => metric.value));

      // 计算最小值
      minValues[metricType] = Math.min(...metricList.map((metric) => metric.value));
    });

    // 计算性能评分和建议
    if (averages.renderTime !== undefined && averages.renderTime > 100) {
      score -= 20;
      suggestions.push('渲染时间过长，建议优化数据处理或减少图表复杂度');
    }

    if (averages.updateTime !== undefined && averages.updateTime > 50) {
      score -= 15;
      suggestions.push('更新时间过长，建议优化数据更新逻辑');
    }

    if (averages.frameRate !== undefined && averages.frameRate < 30) {
      score -= 25;
      suggestions.push('帧率过低，建议减少动画效果或优化渲染逻辑');
    }

    if (averages.dataSize !== undefined && averages.dataSize > 100) {
      score -= 10;
      suggestions.push('数据量过大，建议进行数据压缩或分页处理');
    }

    // 确保评分在0-100之间
    score = Math.max(0, Math.min(100, score));

    const result: PerformanceAnalysisResult = {
      averages,
      maxValues,
      minValues,
      trends,
      score,
      suggestions,
      totalSamples,
      duration: Date.now() - this.startTime,
    };

    // 触发分析完成事件
    this.emit(PerformanceEventType.ANALYSIS_COMPLETE, result);

    return result;
  }

  /**
   * 生成性能报告
   */
  public generateReport(config: PerformanceReportConfig = {}): string | object {
    const analysisResult = this.analyze();
    const reportConfig = {
      format: 'json' as const,
      includeCharts: false,
      includeSuggestions: true,
      includeDetailedData: false,
      ...config,
    };

    switch (reportConfig.format) {
      case 'json':
        return this.generateJsonReport(analysisResult, reportConfig);
      case 'csv':
        return this.generateCsvReport(analysisResult, reportConfig);
      case 'html':
        return this.generateHtmlReport(analysisResult, reportConfig);
      default:
        return this.generateJsonReport(analysisResult, reportConfig);
    }
  }

  /**
   * 生成 JSON 格式报告
   */
  private generateJsonReport(
    result: PerformanceAnalysisResult,
    _config: PerformanceReportConfig
  ): Record<string, unknown> {
    const report: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      duration: result.duration,
      score: result.score,
      totalSamples: result.totalSamples,
    };

    if (_config.includeSuggestions) {
      report.suggestions = result.suggestions;
    }

    if (_config.includeDetailedData) {
      report.averages = result.averages;
      report.maxValues = result.maxValues;
      report.minValues = result.minValues;
      report.trends = result.trends;
    }

    return report;
  }

  /**
   * 生成 CSV 格式报告
   */
  private generateCsvReport(
    result: PerformanceAnalysisResult,
    _config: PerformanceReportConfig
  ): string {
    let csv = 'Metric,Type,Value,Unit\n';

    // 添加平均值
    Object.entries(result.averages).forEach(([metric, value]) => {
      csv += `${metric},Average,${value},ms\n`;
    });

    // 添加最大值
    Object.entries(result.maxValues).forEach(([metric, value]) => {
      csv += `${metric},Max,${value},ms\n`;
    });

    // 添加最小值
    Object.entries(result.minValues).forEach(([metric, value]) => {
      csv += `${metric},Min,${value},ms\n`;
    });

    return csv;
  }

  /**
   * 生成 HTML 格式报告
   */
  private generateHtmlReport(
    result: PerformanceAnalysisResult,
    config: PerformanceReportConfig
  ): string {
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>TaroViz 性能报告</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .report-header { background: #f0f0f0; padding: 20px; border-radius: 8px; }
          .score { font-size: 48px; font-weight: bold; color: #4CAF50; }
          .metric-section { margin: 20px 0; }
          .metric-table { border-collapse: collapse; width: 100%; }
          .metric-table th, .metric-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .metric-table th { background-color: #f2f2f2; }
          .suggestions { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="report-header">
          <h1>TaroViz 性能报告</h1>
          <p>生成时间: ${new Date().toISOString()}</p>
          <p>监控时长: ${Math.round(result.duration / 1000)} 秒</p>
          <div class="score">${result.score} / 100</div>
        </div>
    `;

    // 添加指标数据
    html += `
      <div class="metric-section">
        <h2>性能指标</h2>
        <table class="metric-table">
          <tr>
            <th>指标</th>
            <th>平均值</th>
            <th>最大值</th>
            <th>最小值</th>
          </tr>`;

    Object.entries(result.averages).forEach(([metric, average]) => {
      const max = result.maxValues[metric as PerformanceMetricType];
      const min = result.minValues[metric as PerformanceMetricType];
      html += `
          <tr>
            <td>${metric}</td>
            <td>${average} ms</td>
            <td>${max} ms</td>
            <td>${min} ms</td>
          </tr>`;
    });

    html += `
        </table>
      </div>`;

    // 添加建议
    if (config.includeSuggestions && result.suggestions.length > 0) {
      html += `
      <div class="suggestions">
        <h2>性能建议</h2>
        <ul>`;
      result.suggestions.forEach((suggestion) => {
        html += `
          <li>${suggestion}</li>`;
      });
      html += `
        </ul>
      </div>`;
    }

    html += `
      </body>
      </html>`;
    return html;
  }

  /**
   * 获取当前监控状态
   */
  public getIsMonitoring(): boolean {
    return this.isMonitoring;
  }

  /**
   * 获取当前配置
   */
  public getConfig(): PerformanceAnalysisConfig {
    return { ...this.config };
  }

  /**
   * 更新配置
   */
  public updateConfig(config: Partial<PerformanceAnalysisConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * 获取特定类型的指标数据
   */
  public getMetricsByType(type: PerformanceMetricType): PerformanceMetric[] {
    return this.metrics.get(type) || [];
  }

  /**
   * 清空所有指标数据
   */
  public clearMetrics(): void {
    this.metrics.clear();
    this.frameRateHistory = [];
    this.startTime = Date.now();
  }

  /**
   * 获取性能评分
   */
  public getScore(): number {
    return this.analyze().score;
  }
}
