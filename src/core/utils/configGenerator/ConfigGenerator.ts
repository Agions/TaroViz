/**
 * TaroViz 图表配置生成器
 * 用于根据简单配置生成完整的 ECharts 配置
 */

import { EChartsOption } from '../../types';

import {
  ConfigGeneratorOptions,
  ConfigGeneratorResult,
  ChartConfigTemplate,
  ConfigGeneratorEventType,
  ConfigGeneratorEventHandler,
  ChartType,
} from './types';

/**
 * 图表配置生成器类
 */
export class ConfigGenerator {
  private static instance: ConfigGenerator | null = null;
  private eventHandlers: Map<ConfigGeneratorEventType, ConfigGeneratorEventHandler[]> = new Map();
  private templates: Map<string, ChartConfigTemplate> = new Map();

  /**
   * 私有构造函数，使用单例模式
   */
  private constructor() {
    // 初始化内置模板
    this.initBuiltinTemplates();
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): ConfigGenerator {
    if (!ConfigGenerator.instance) {
      ConfigGenerator.instance = new ConfigGenerator();
    }
    return ConfigGenerator.instance;
  }

  /**
   * 注册事件处理器
   */
  public on(eventType: ConfigGeneratorEventType, handler: ConfigGeneratorEventHandler): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, []);
    }
    this.eventHandlers.get(eventType)?.push(handler);
  }

  /**
   * 移除事件处理器
   */
  public off(eventType: ConfigGeneratorEventType, handler: ConfigGeneratorEventHandler): void {
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  /**
   * 初始化内置模板
   */
  private initBuiltinTemplates(): void {
    // 折线图模板
    this.registerTemplate({
      name: 'basicLine',
      description: '基础折线图模板',
      chartTypes: ['line'],
      config: {
        title: {
          text: '折线图示例',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          show: true,
          position: 'top',
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '系列1',
            type: 'line',
            data: [
              { value: 120 },
              { value: 200 },
              { value: 150 },
              { value: 80 },
              { value: 70 },
              { value: 110 },
              { value: 130 },
            ],
            showInLegend: true,
          },
        ],
      },
    });

    // 柱状图模板
    this.registerTemplate({
      name: 'basicBar',
      description: '基础柱状图模板',
      chartTypes: ['bar'],
      config: {
        title: {
          text: '柱状图示例',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          show: true,
          position: 'top',
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '系列1',
            type: 'bar',
            data: [
              { value: 120 },
              { value: 200 },
              { value: 150 },
              { value: 80 },
              { value: 70 },
              { value: 110 },
              { value: 130 },
            ],
            showInLegend: true,
          },
        ],
      },
    });

    // 饼图模板
    this.registerTemplate({
      name: 'basicPie',
      description: '基础饼图模板',
      chartTypes: ['pie'],
      config: {
        title: {
          text: '饼图示例',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          show: true,
          position: 'right',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 400, name: '搜索引擎' },
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 274, name: '联盟广告' },
              { value: 235, name: '视频广告' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
    });

    // 散点图模板
    this.registerTemplate({
      name: 'basicScatter',
      description: '基础散点图模板',
      chartTypes: ['scatter'],
      config: {
        title: {
          text: '散点图示例',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          show: true,
          position: 'top',
        },
        xAxis: {
          type: 'value',
          name: 'X轴',
        },
        yAxis: {
          type: 'value',
          name: 'Y轴',
        },
        series: [
          {
            name: '系列1',
            type: 'scatter',
            data: [
              { value: [10.0, 8.04] },
              { value: [8.0, 6.95] },
              { value: [13.0, 7.58] },
              { value: [9.0, 8.81] },
              { value: [11.0, 8.33] },
              { value: [14.0, 9.96] },
              { value: [6.0, 7.24] },
              { value: [4.0, 4.26] },
              { value: [12.0, 10.84] },
              { value: [7.0, 4.82] },
              { value: [5.0, 5.68] },
            ],
            showInLegend: true,
          },
        ],
      },
    });
  }

  /**
   * 注册模板
   */
  public registerTemplate(template: ChartConfigTemplate): void {
    this.templates.set(template.name, template);
  }

  /**
   * 获取模板
   */
  public getTemplate(name: string): ChartConfigTemplate | undefined {
    return this.templates.get(name);
  }

  /**
   * 获取所有模板
   */
  public getAllTemplates(): ChartConfigTemplate[] {
    return Array.from(this.templates.values());
  }

  /**
   * 根据图表类型获取模板
   */
  public getTemplatesByChartType(chartType: ChartType): ChartConfigTemplate[] {
    return Array.from(this.templates.values()).filter(template =>
      template.chartTypes.includes(chartType)
    );
  }

  /**
   * 删除模板
   */
  public removeTemplate(name: string): void {
    this.templates.delete(name);
  }

  /**
   * 生成图表配置
   */
  public generate(options: ConfigGeneratorOptions): ConfigGeneratorResult {
    try {
      // 触发生成开始事件
      this.emit(ConfigGeneratorEventType.GENERATE_START, options);

      // 应用模板
      const mergedOptions = this.applyTemplate(options);

      // 生成基础配置
      const baseConfig = this.generateBaseConfig(mergedOptions);

      // 生成系列配置
      const seriesConfig = this.generateSeriesConfig(mergedOptions);

      // 生成坐标轴配置
      const axisConfig = this.generateAxisConfig(mergedOptions);

      // 生成交互配置
      const interactionConfig = this.generateInteractionConfig(mergedOptions);

      // 合并所有配置，排除非ECharts配置
      const {
        chartType: _chartType,
        subtitle: _subtitle,
        template: _template,
        responsive: _responsive,
        width: _width,
        height: _height,
        title: _optionsTitle,
        ...echartsOptions
      } = mergedOptions;
      // 使用类型断言确保TypeScript接受生成的配置
      const finalOption = {
        ...baseConfig,
        ...seriesConfig,
        ...axisConfig,
        ...interactionConfig,
        ...echartsOptions,
      } as EChartsOption;

      // 计算数据项数量
      const dataItemCount = mergedOptions.series.reduce((count, series) => {
        return count + series.data.length;
      }, 0);

      const result: ConfigGeneratorResult = {
        option: finalOption,
        metadata: {
          chartType: mergedOptions.chartType,
          seriesCount: mergedOptions.series.length,
          dataItemCount,
          generatedAt: Date.now(),
        },
      };

      // 触发生成完成事件
      this.emit(ConfigGeneratorEventType.GENERATE_COMPLETE, result);

      return result;
    } catch (error) {
      // 触发生成失败事件
      this.emit(ConfigGeneratorEventType.GENERATE_ERROR, { error });
      throw error;
    }
  }

  /**
   * 应用模板
   */
  private applyTemplate(options: ConfigGeneratorOptions): ConfigGeneratorOptions {
    if (!options.template) {
      return options;
    }

    const template = this.getTemplate(options.template);
    if (!template) {
      return options;
    }

    // 触发模板应用事件
    this.emit(ConfigGeneratorEventType.TEMPLATE_APPLY, { template, options });

    // 合并模板配置和用户配置
    return {
      ...template.config,
      ...options,
      series: options.series || template.config.series || [],
      xAxis: options.xAxis || template.config.xAxis,
      yAxis: options.yAxis || template.config.yAxis,
    } as ConfigGeneratorOptions;
  }

  /**
   * 生成基础配置
   */
  private generateBaseConfig(options: ConfigGeneratorOptions): EChartsOption {
    const baseConfig: EChartsOption = {};

    // 添加标题
    if (options.title || options.subtitle) {
      if (typeof options.title === 'string') {
        baseConfig.title = {
          text: options.title,
          subtext: options.subtitle,
        };
      } else if (options.title) {
        baseConfig.title = {
          ...options.title,
          subtext: options.title.subtext || options.subtitle,
        };
      } else if (options.subtitle) {
        baseConfig.title = {
          subtext: options.subtitle,
        };
      }
    }

    // 添加主题
    if (options.theme) {
      baseConfig.theme = options.theme;
    }

    return baseConfig;
  }

  /**
   * 生成系列配置
   */
  private generateSeriesConfig(options: ConfigGeneratorOptions): EChartsOption {
    const series = options.series.map((seriesConfig, index) => {
      // 处理数据，转换为ECharts支持的格式
      const processedData = seriesConfig.data.map(item => {
        if (typeof item.value === 'number') {
          return { name: item.name, value: item.value };
        }
        return item.value;
      });

      // 创建系列配置，避免重复属性
      const baseSeries: any = {
        name: seriesConfig.name || `系列${index + 1}`,
        xAxisIndex: seriesConfig.xAxisIndex,
        yAxisIndex: seriesConfig.yAxisIndex,
        ...seriesConfig,
        data: processedData,
      };

      // 移除不需要的属性
      delete baseSeries.showInLegend;
      delete baseSeries.style;

      return baseSeries;
    });

    return { series };
  }

  /**
   * 生成坐标轴配置
   */
  private generateAxisConfig(options: ConfigGeneratorOptions): EChartsOption {
    const axisConfig: EChartsOption = {};

    // 处理X轴配置
    if (options.xAxis) {
      axisConfig.xAxis = Array.isArray(options.xAxis)
        ? options.xAxis.map(axis => this.normalizeAxisConfig(axis))
        : this.normalizeAxisConfig(options.xAxis);
    } else if (this.needsAxis(options.chartType)) {
      // 为需要坐标轴的图表类型生成默认X轴
      axisConfig.xAxis = this.normalizeAxisConfig({ type: 'category' });
    }

    // 处理Y轴配置
    if (options.yAxis) {
      axisConfig.yAxis = Array.isArray(options.yAxis)
        ? options.yAxis.map(axis => this.normalizeAxisConfig(axis))
        : this.normalizeAxisConfig(options.yAxis);
    } else if (this.needsAxis(options.chartType)) {
      // 为需要坐标轴的图表类型生成默认Y轴
      axisConfig.yAxis = this.normalizeAxisConfig({ type: 'value' });
    }

    return axisConfig;
  }

  /**
   * 标准化坐标轴配置
   */
  private normalizeAxisConfig(axis: any): any {
    return {
      type: 'category',
      show: true,
      ...axis,
    };
  }

  /**
   * 生成交互配置
   */
  private generateInteractionConfig(options: ConfigGeneratorOptions): EChartsOption {
    const interactionConfig: EChartsOption = {};

    // 生成图例配置
    if (options.legend) {
      const showLegend = options.legend.show !== false;
      if (showLegend) {
        interactionConfig.legend = {
          show: true,
          position: 'top',
          type: 'plain',
          ...options.legend,
        };
      }
    }

    // 生成提示框配置
    if (options.tooltip) {
      const showTooltip = options.tooltip.show !== false;
      if (showTooltip) {
        interactionConfig.tooltip = {
          show: true,
          trigger: this.getTooltipTrigger(options.chartType),
          ...options.tooltip,
        };
      }
    }

    // 生成工具箱配置
    if (options.toolbox) {
      interactionConfig.toolbox = {
        show: true,
        feature: {
          saveAsImage: {},
          restore: {},
          ...options.toolbox.feature,
        },
        ...options.toolbox,
      } as any;
    }

    // 生成数据缩放配置
    if (options.dataZoom) {
      interactionConfig.dataZoom = options.dataZoom;
    }

    return interactionConfig;
  }

  /**
   * 获取提示框触发方式
   */
  private getTooltipTrigger(chartType: ChartType): 'item' | 'axis' | 'none' {
    const axisCharts = ['line', 'bar', 'scatter', 'boxplot', 'candlestick', 'parallel'];
    const itemCharts = ['pie', 'gauge', 'funnel', 'sunburst', 'treemap', 'wordCloud'];

    if (axisCharts.includes(chartType)) {
      return 'axis';
    } else if (itemCharts.includes(chartType)) {
      return 'item';
    }

    return 'none';
  }

  /**
   * 判断图表类型是否需要坐标轴
   */
  private needsAxis(chartType: ChartType): boolean {
    const noAxisCharts = ['pie', 'gauge', 'funnel', 'sunburst', 'treemap', 'wordCloud', 'liquid'];
    return !noAxisCharts.includes(chartType);
  }

  /**
   * 预览配置
   */
  public preview(options: ConfigGeneratorOptions): void {
    const result = this.generate(options);
    this.emit(ConfigGeneratorEventType.CONFIG_PREVIEW, result);
  }

  /**
   * 触发事件
   */
  private emit(eventType: ConfigGeneratorEventType, data?: any): void {
    const handlers = this.eventHandlers.get(eventType);
    handlers?.forEach(handler => {
      try {
        handler({ type: eventType, data });
      } catch (error) {
        console.error('Error in config generator event handler:', error);
      }
    });
  }

  /**
   * 重置实例
   */
  public static resetInstance(): void {
    ConfigGenerator.instance = null;
  }
}
