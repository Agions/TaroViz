import type { EChartsOption } from 'echarts';

/**
 * 下钻历史记录项
 */
export interface DrillHistoryItem {
  level: number;
  option: EChartsOption;
  path: string[];
  data?: any;
}

/**
 * 下钻级别定义
 */
export interface DrillDownLevel {
  name: string;
  option?: EChartsOption;
  getOption?: (params: any) => EChartsOption;
}

/**
 * 下钻动作枚举
 */
export enum DrillAction {
  DRILL_DOWN = 'drill_down',
  DRILL_UP = 'drill_up',
  DRILL_TO = 'drill_to'
}

/**
 * 下钻选项
 */
export interface DrillDownOptions {
  // 启用下钻导航
  enableNavigation?: boolean;
  // 启用面包屑导航
  enableBreadcrumb?: boolean;
  // 最大下钻深度，默认不限制
  maxDepth?: number;
  // 下钻标题格式化函数
  titleFormatter?: (path: string[], level: number) => string;
  // 下钻动画持续时间
  animationDuration?: number;
  // 下钻导航样式
  navigationStyle?: Record<string, any>;
}

/**
 * 下钻数据切片选项
 */
export interface DrillSliceOptions {
  // 切片维度索引
  dimensionIndex?: number;
  // 切片维度名称
  dimensionName?: string;
  // 数据过滤函数
  filter?: (data: any[], params: any) => any[];
  // 保留其他系列
  keepOtherSeries?: boolean;
}

/**
 * 下钻管理器
 */
export class DrillDownManager {
  private history: DrillHistoryItem[] = [];
  private options: DrillDownOptions;
  private chartInstance: any;
  private currentLevel = 0;
  private initialOption: EChartsOption;
  private drillContext: {path: string[], params: any} = {path: [], params: {}};
  private levels: DrillDownLevel[];
  private triggerEvent: string;

  /**
   * 创建下钻管理器
   * @param options 下钻配置
   */
  constructor(options: {levels: DrillDownLevel[], triggerEvent?: string}) {
    this.levels = options.levels;
    this.triggerEvent = options.triggerEvent || 'click';
    this.options = {};
    this.initialOption = this.levels[0].option as EChartsOption;
    this.history.push({
      level: 0,
      option: this.initialOption,
      path: []
    });
  }

  /**
   * 绑定图表实例
   * @param chartInstance 图表实例
   */
  bindChart(chartInstance: any): void {
    this.chartInstance = chartInstance;
    // 绑定事件
    this.chartInstance.on(this.triggerEvent, this.handleChartEvent.bind(this));
  }

  /**
   * 处理图表事件
   */
  private handleChartEvent(params: any): void {
    this.drillDown(params);
  }

  /**
   * 解绑图表实例
   */
  unbindChart(): void {
    if (this.chartInstance) {
      this.chartInstance.off(this.triggerEvent);
      this.chartInstance = null;
    }
  }

  /**
   * 执行下钻动作
   */
  drillDown(params: any): void {
    if (params.type === DrillAction.DRILL_UP) {
      this.drillUp();
    } else if (params.type === DrillAction.DRILL_TO) {
      this.drillTo(params.level);
    } else {
      // 默认为向下钻取
      const nextLevel = this.currentLevel + 1;
      if (nextLevel < this.levels.length) {
        const levelDef = this.levels[nextLevel];
        let option;
        
        if (levelDef.option) {
          option = levelDef.option;
        } else if (levelDef.getOption) {
          option = levelDef.getOption(params);
        } else {
          console.error('下钻级别必须提供option或getOption');
          return;
        }
        
        // 更新路径
        const path = [...this.drillContext.path, params.name];
        this.drillContext.path = path;
        
        // 更新级别
        this.currentLevel = nextLevel;
        
        // 设置选项
        this.chartInstance.setOption(option, true);
      }
    }
  }

  /**
   * 向上钻取
   */
  drillUp(): void {
    if (this.currentLevel > 0) {
      this.currentLevel--;
      this.drillContext.path.pop();
      const option = this.getCurrentOption();
      this.chartInstance.setOption(option, true);
    }
  }

  /**
   * 钻取到指定级别
   */
  drillTo(level: number): void {
    if (level >= 0 && level < this.levels.length) {
      this.currentLevel = level;
      this.drillContext.path = this.drillContext.path.slice(0, level);
      const option = this.getCurrentOption();
      this.chartInstance.setOption(option, true);
    }
  }

  /**
   * 重置钻取状态
   */
  reset(): void {
    this.currentLevel = 0;
    this.drillContext.path = [];
    const option = this.getCurrentOption();
    this.chartInstance.setOption(option, true);
  }

  /**
   * 获取当前级别
   */
  getCurrentLevel(): number {
    return this.currentLevel;
  }

  /**
   * 获取当前选项
   */
  getCurrentOption(): EChartsOption {
    const levelDef = this.levels[this.currentLevel];
    if (levelDef.option) {
      return levelDef.option;
    } else if (levelDef.getOption && this.drillContext.path.length > 0) {
      const lastPathItem = this.drillContext.path[this.drillContext.path.length - 1];
      return levelDef.getOption({name: lastPathItem, ...this.drillContext.params});
    }
    return this.initialOption;
  }

  /**
   * 获取钻取上下文
   */
  getDrillContext(): {path: string[], params: any} {
    return this.drillContext;
  }

  /**
   * 更新钻取参数
   */
  updateParams(params: any): void {
    this.drillContext.params = {...this.drillContext.params, ...params};
  }

  /**
   * 获取下钻路径
   */
  getPath(): string[] {
    return this.history[this.currentLevel].path;
  }

  /**
   * 获取下钻历史
   */
  getHistory(): DrillHistoryItem[] {
    return this.history;
  }

  /**
   * 基于切片选项创建下钻选项
   */
  private createSlicedOption(
    currentOption: EChartsOption, 
    params: any, 
    sliceOptions: DrillSliceOptions
  ): EChartsOption {
    const option = JSON.parse(JSON.stringify(currentOption));
    
    // 找到点击的系列
    const seriesIndex = params.seriesIndex;
    if (!option.series || !Array.isArray(option.series)) {
      return option;
    }
    
    const series = option.series[seriesIndex];
    if (!series || !series.data) {
      return option;
    }
    
    // 处理维度索引
    const dimensionIndex = sliceOptions.dimensionIndex ?? 0;
    
    // 获取类别数据
    let categories: string[] = [];
    if (option.xAxis && Array.isArray(option.xAxis)) {
      const xAxis = option.xAxis[0];
      if (xAxis && xAxis.data && Array.isArray(xAxis.data)) {
        categories = xAxis.data as string[];
      }
    } else if (option.xAxis && option.xAxis.data) {
      categories = option.xAxis.data as string[];
    }
    
    // 筛选数据
    let filteredData: any[];
    
    if (sliceOptions.filter) {
      // 使用自定义过滤器
      filteredData = sliceOptions.filter(series.data as any[], params);
    } else {
      // 默认过滤：仅保留点击的类别/值
      const clickedValue = params.name;
      
      if (series.type === 'pie') {
        // 饼图特殊处理
        filteredData = series.data.filter((item: any) => item.name === clickedValue);
      } else {
        // 柱状图、折线图等
        filteredData = (series.data as any[]).filter((item: any, idx: number) => {
          const category = categories[idx] || idx;
          return category === clickedValue;
        });
      }
    }
    
    // 更新选中系列的数据
    series.data = filteredData;
    
    // 处理其他系列
    if (!sliceOptions.keepOtherSeries && Array.isArray(option.series)) {
      option.series = [series];
    }
    
    return option;
  }

  /**
   * 添加导航按钮
   */
  private addNavigationButtons(option: EChartsOption, level: number): void {
    // 确保有 graphic 配置
    if (!option.graphic) {
      option.graphic = [];
    } else if (!Array.isArray(option.graphic)) {
      option.graphic = [option.graphic];
    }
    
    // 添加返回按钮
    option.graphic.push({
      type: 'group',
      left: 10,
      top: 10,
      children: [
        {
          type: 'rect',
          z: 100,
          left: 0,
          top: 0,
          shape: { width: 60, height: 20, r: 4 },
          style: {
            fill: '#337ab7',
            stroke: '#2e6da4',
            lineWidth: 1,
            shadowBlur: 2,
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            shadowColor: 'rgba(0,0,0,0.2)',
            ...this.options.navigationStyle
          },
          onclick: () => this.drillUp()
        },
        {
          type: 'text',
          z: 100,
          left: 'center',
          top: 'middle',
          style: {
            fill: '#fff',
            text: '返回上级',
            font: '12px Microsoft YaHei',
            ...this.options.navigationStyle
          },
          onclick: () => this.drillUp()
        }
      ]
    });
    
    // 添加重置按钮
    if (level > 1) {
      option.graphic.push({
        type: 'group',
        left: 80,
        top: 10,
        children: [
          {
            type: 'rect',
            z: 100,
            left: 0,
            top: 0,
            shape: { width: 40, height: 20, r: 4 },
            style: {
              fill: '#5bc0de',
              stroke: '#46b8da',
              lineWidth: 1,
              shadowBlur: 2,
              shadowOffsetX: 1,
              shadowOffsetY: 1,
              shadowColor: 'rgba(0,0,0,0.2)',
              ...this.options.navigationStyle
            },
            onclick: () => this.reset()
          },
          {
            type: 'text',
            z: 100,
            left: 'center',
            top: 'middle',
            style: {
              fill: '#fff',
              text: '重置',
              font: '12px Microsoft YaHei',
              ...this.options.navigationStyle
            },
            onclick: () => this.reset()
          }
        ]
      });
    }
    
    // 添加面包屑导航
    if (this.options.enableBreadcrumb) {
      const path = this.getPath();
      const breadcrumbText = path.join(' > ');
      
      option.graphic.push({
        type: 'text',
        z: 100,
        left: 10,
        top: 40,
        style: {
          fill: '#333',
          text: breadcrumbText,
          font: '12px Microsoft YaHei',
          ...this.options.navigationStyle
        }
      });
    }
  }
}

/**
 * 为图表创建下钻管理器
 * @param options 下钻选项
 */
export function createDrillDown(options: {levels: DrillDownLevel[], triggerEvent?: string}): DrillDownManager {
  return new DrillDownManager(options);
} 