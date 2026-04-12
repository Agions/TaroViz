/**
 * DrillDown - 数据下钻工具
 * 支持点击图表数据项时，自动下钻到更细粒度的数据视图
 */
import type { ECharts, EChartsOption, ECElementEvent } from 'echarts';

// ============================================================================
// 类型定义
// ============================================================================

/**
 * 下钻数据源
 * 描述一个可下钻的数据节点
 */
export interface DrillDownSource {
  /** 节点名称（用于显示和匹配） */
  name: string | number;
  /** 节点值 */
  value: string | number;
  /** 子级数据（点击后显示） */
  children?: DrillDownSource[];
  /** 点击后执行的图表 option 更新（可选，优先级高于 children） */
  chartOption?: EChartsOption;
  /** 额外数据元 */
  meta?: Record<string, unknown>;
}

/**
 * 下钻配置
 */
export interface DrillDownConfig {
  /** 下钻的维度 key */
  dimension: string;
  /** 下钻层级数据源（key 为维度值，value 为该维度下的下钻数据） */
  sources: Record<string, DrillDownSource[]>;
  /** 初始层级数据（不经过 dimension 匹配的直接数据） */
  initialSources?: DrillDownSource[];
  /** 当前层级 */
  currentLevel?: number;
  /** 是否自动绑定点击事件 */
  autoBind?: boolean;
  /** 下钻回调 */
  onDrillDown?: (params: DrillDownEventParams) => void;
  /** 上钻回调 */
  onDrillUp?: (params: DrillUpEventParams) => void;
  /** 重置回调 */
  onReset?: (params: { level: number }) => void;
}

/**
 * 下钻事件参数
 */
export interface DrillDownEventParams {
  /** 当前层级 */
  level: number;
  /** 点击的数据项名称 */
  name: string | number;
  /** 点击的数据项值 */
  value: unknown;
  /** 下钻后的数据源 */
  sources: DrillDownSource[];
  /** 下钻后的图表配置 */
  chartOption: EChartsOption;
  /** 原始 ECharts click params */
  rawParams: Record<string, unknown>;
}

/**
 * 上钻事件参数
 */
export interface DrillUpEventParams {
  /** 之前所在的层级 */
  previousLevel: number;
  /** 当前层级（上钻后） */
  currentLevel: number;
  /** 上钻后的图表配置 */
  chartOption: EChartsOption;
}

/**
 * DrillDown 返回接口
 */
export interface DrillDownReturn {
  /**
   * 初始化下钻功能
   * @param chartInstance ECharts 实例
   * @param config 下钻配置
   */
  init: (chartInstance: ECharts, config: DrillDownConfig) => void;
  /**
   * 返回上一层
   */
  drillUp: () => void;
  /**
   * 重置到第一层
   */
  reset: () => void;
  /**
   * 获取当前层级
   * @returns 当前层级序号（从 0 开始）
   */
  getCurrentLevel: () => number;
  /**
   * 绑定图表点击事件
   * @param chartInstance ECharts 实例
   */
  bindClick: (chartInstance: ECharts) => void;
  /**
   * 解绑图表点击事件
   * @param chartInstance ECharts 实例
   */
  unbindClick: (chartInstance: ECharts) => void;
  /**
   * 手动触发下钻到指定层级
   * @param level 目标层级
   * @param dataItem 可选，指定的数据项
   */
  drillTo: (level: number, dataItem?: DrillDownSource) => void;
  /**
   * 获取层级历史记录
   * @returns 层级历史（数组，每个元素为进入该层级时的点击数据项）
   */
  getHistory: () => Array<{ level: number; dataItem: DrillDownSource }>;
  /**
   * 检查是否可以上钻
   * @returns 是否可以上钻
   */
  canDrillUp: () => boolean;
  /**
   * 销毁下钻实例，清理所有事件绑定
   */
  dispose: () => void;
}

// ============================================================================
// 内部状态
// ============================================================================

interface DrillDownState {
  /** 图表实例 */
  chartInstance: ECharts | null;
  /** 当前配置 */
  config: DrillDownConfig;
  /** 当前层级 */
  currentLevel: number;
  /** 层级历史 */
  history: Array<{ level: number; dataItem: DrillDownSource }>;
  /** 当前图表 option */
  currentOption: EChartsOption;
  /** 初始 option（用于重置） */
  initialOption: Record<string, unknown>;
  /** 是否已初始化 */
  initialized: boolean;
  /** 事件处理器引用（用于解绑） */
  clickHandler: ((params: ECElementEvent) => void) | null;
}

// ============================================================================
// 默认配置
// ============================================================================

const DEFAULT_CONFIG: Partial<DrillDownConfig> = {
  autoBind: true,
  currentLevel: 0,
};

// ============================================================================
// 创建下钻工具函数
// ============================================================================

/**
 * 创建下钻工具
 *
 * @example
 * ```typescript
 * const drillDown = createDrillDown({
 *   dimension: 'category',
 *   sources: {
 *     '电子产品': [
 *       { name: '手机', value: 100, children: [...] },
 *       { name: '电脑', value: 80, children: [...] },
 *     ],
 *     '服装': [...]
 *   },
 *   onDrillDown: (params) => console.log('下钻到:', params.name),
 * });
 *
 * drillDown.init(chartInstance);
 * ```
 *
 * @param initialConfig 初始下钻配置
 * @returns DrillDownReturn
 */
export function createDrillDown(initialConfig?: Partial<DrillDownConfig>): DrillDownReturn {
  // 内部状态
  const state: DrillDownState = {
    chartInstance: null,
    config: { ...DEFAULT_CONFIG, ...initialConfig } as DrillDownConfig,
    currentLevel: 0,
    history: [],
    currentOption: {},
    initialOption: {},
    initialized: false,
    clickHandler: null,
  };

  // ============================================================
  // 内部方法
  // ============================================================

  /**
   * 根据层级和触发数据项获取下钻后的图表配置
   */
  const getDrillDownOption = (
    level: number,
    dataItem: DrillDownSource | undefined,
    direction: 'down' | 'up' | 'reset'
  ): EChartsOption => {
    const { config } = state;
    let targetSources: DrillDownSource[] = [];
    let targetOption: EChartsOption = {};

    if (direction === 'reset' || level === 0) {
      // 重置或回到第一层：使用初始数据
      if (config.initialSources) {
        targetSources = config.initialSources;
        // 从 initialSources 构建图表 option
        targetOption = buildOptionFromSources(targetSources);
      } else {
        // 如果没有 initialSources，返回空 option，让用户重新 setOption
        targetOption = {};
      }
    } else if (direction === 'up') {
      // 上钻：从 history 中找到上一层的状态
      const prevHistory = state.history[level - 1];
      if (prevHistory && prevHistory.dataItem.chartOption) {
        targetOption = prevHistory.dataItem.chartOption;
      } else {
        // 尝试从 children 构建
        targetSources = prevHistory?.dataItem.children ?? [];
        targetOption = buildOptionFromSources(targetSources);
      }
    } else if (direction === 'down' && dataItem) {
      // 下钻
      if (dataItem.chartOption) {
        // 优先使用自定义 chartOption
        targetOption = dataItem.chartOption;
      } else if (dataItem.children && dataItem.children.length > 0) {
        // 从 children 构建图表 option
        targetSources = dataItem.children;
        targetOption = buildOptionFromSources(targetSources);
      }
    }

    return targetOption;
  };

  /**
   * 从 DrillDownSource 数组构建 ECharts option
   */
  const buildOptionFromSources = (sources: DrillDownSource[]): EChartsOption => {
    if (!sources || sources.length === 0) return {};

    const names = sources.map((s) => s.name);
    const values = sources.map((s) => s.value);

    return {
      xAxis: {
        type: 'category',
        data: names,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'bar',
          data: values,
        },
      ],
    };
  };

  /**
   * 检查是否有下钻数据
   */
  const hasDrillDownData = (dataItem: DrillDownSource | undefined): boolean => {
    if (!dataItem) return false;
    return !!(dataItem.children && dataItem.children.length > 0) || !!dataItem.chartOption;
  };

  /**
   * 执行下钻
   */
  const executeDrillDown = (params: ECElementEvent) => {
    const { config, chartInstance } = state;
    if (!chartInstance) return;

    const { name, value } = params;

    // 在当前层级的数据中查找匹配项
    let matchedSource: DrillDownSource | undefined;

    // 尝试从 history 中获取当前层级的数据源
    const currentLevelSources = getCurrentLevelSources();
    matchedSource = currentLevelSources.find(
      (s) => String(s.name) === String(name) || s.value === value
    );

    // 如果没找到，尝试在 initialSources 中查找
    if (!matchedSource && state.currentLevel === 0 && config.initialSources) {
      matchedSource = config.initialSources.find(
        (s) => String(s.name) === String(name) || s.value === value
      );
    }

    // 如果是最后一级（不能再下钻）或者找不到匹配项，不执行下钻
    if (!hasDrillDownData(matchedSource)) {
      console.warn('[DrillDown] No drill-down data available for:', name);
      return;
    }

    // 记录历史
    if (matchedSource) {
      state.history.push({ level: state.currentLevel, dataItem: matchedSource });
    }

    // 更新层级
    state.currentLevel += 1;

    // 获取新的图表配置
    const newOption = getDrillDownOption(state.currentLevel, matchedSource, 'down');

    // 更新图表
    if (newOption && Object.keys(newOption).length > 0) {
      chartInstance.setOption(newOption, true);
      state.currentOption = newOption;
    }

    // 触发回调
    config.onDrillDown?.({
      level: state.currentLevel,
      name: matchedSource?.name ?? (name as string | number),
      value: matchedSource?.value ?? value,
      sources: matchedSource?.children ?? [],
      chartOption: newOption,
      rawParams: params as unknown as Record<string, unknown>,
    });
  };

  /**
   * 获取当前层级的数据源列表
   */
  const getCurrentLevelSources = (): DrillDownSource[] => {
    const { config } = state;

    if (state.currentLevel === 0) {
      // 第 0 层：使用 initialSources 或从 dimension 匹配
      if (config.initialSources) {
        return config.initialSources;
      }
      return [];
    }

    // 其他层级：从 history 中找到上一层点击的数据项的 children
    const lastHistory = state.history[state.history.length - 1];
    if (lastHistory && lastHistory.dataItem.children) {
      return lastHistory.dataItem.children;
    }

    return [];
  };

  // ============================================================
  // 实例方法
  // ============================================================

  const init = (chartInstance: ECharts, config: DrillDownConfig): void => {
    if (!chartInstance) {
      console.error('[DrillDown] Invalid chart instance');
      return;
    }

    state.chartInstance = chartInstance;
    state.config = { ...DEFAULT_CONFIG, ...config } as DrillDownConfig;
    state.currentLevel = config.currentLevel ?? 0;
    state.initialized = true;

    // 保存初始 option
    try {
      state.initialOption = chartInstance.getOption() || {};
    } catch {
      state.initialOption = {};
    }

    // 绑定点击事件
    if (state.config.autoBind) {
      bindClick(chartInstance);
    }
  };

  const drillUp = (): void => {
    const { config, chartInstance } = state;
    if (!chartInstance || state.currentLevel <= 0) {
      console.warn('[DrillDown] Cannot drill up: already at top level');
      return;
    }

    const previousLevel = state.currentLevel;

    // 弹出历史
    state.history.pop();

    // 更新层级
    state.currentLevel -= 1;

    // 获取新的图表配置
    const newOption = getDrillDownOption(state.currentLevel, undefined, 'up');

    // 更新图表
    if (newOption && Object.keys(newOption).length > 0) {
      chartInstance.setOption(newOption, true);
      state.currentOption = newOption;
    } else if (state.currentLevel === 0 && state.initialOption) {
      chartInstance.setOption(state.initialOption, true);
      state.currentOption = state.initialOption;
    }

    // 触发回调
    config.onDrillUp?.({
      previousLevel,
      currentLevel: state.currentLevel,
      chartOption: newOption,
    });
  };

  const reset = (): void => {
    const { config, chartInstance } = state;
    if (!chartInstance) return;

    const previousLevel = state.currentLevel;

    // 清空历史
    state.history = [];
    state.currentLevel = 0;

    // 获取初始配置
    const newOption = getDrillDownOption(0, undefined, 'reset');

    // 更新图表
    if (newOption && Object.keys(newOption).length > 0) {
      chartInstance.setOption(newOption, true);
      state.currentOption = newOption;
    } else if (state.initialOption && Object.keys(state.initialOption).length > 0) {
      chartInstance.setOption(state.initialOption, true);
      state.currentOption = state.initialOption;
    }

    // 触发回调
    config.onReset?.({ level: 0 });
  };

  const getCurrentLevel = (): number => state.currentLevel;

  const bindClick = (chartInstance: ECharts): void => {
    const instance = chartInstance || state.chartInstance;
    if (!instance) {
      console.error('[DrillDown] No chart instance to bind');
      return;
    }

    // 解绑旧的
    if (state.clickHandler) {
      unbindClick(instance);
    }

    // 创建新的点击处理器
    state.clickHandler = (params: ECElementEvent) => {
      executeDrillDown(params);
    };

    instance.on('click', state.clickHandler);
  };

  const unbindClick = (chartInstance: ECharts): void => {
    const instance = chartInstance || state.chartInstance;
    if (!instance || !state.clickHandler) return;

    instance.off('click', state.clickHandler);
    state.clickHandler = null;
  };

  const drillTo = (level: number, dataItem?: DrillDownSource): void => {
    const { chartInstance, config } = state;
    if (!chartInstance) return;

    if (level < 0 || level > state.history.length) {
      console.warn('[DrillDown] Invalid drill level:', level);
      return;
    }

    const previousLevel = state.currentLevel;
    state.currentLevel = level;

    if (level === state.history.length) {
      // 下钻
      if (dataItem) {
        state.history.push({ level: level - 1, dataItem });
      }
    } else if (level < state.history.length) {
      // 上钻或跳转：调整 history
      state.history = state.history.slice(0, level);
    } else {
      // level === 0, reset
      state.history = [];
    }

    const newOption = getDrillDownOption(level, dataItem, level === 0 ? 'reset' : 'down');

    if (newOption && Object.keys(newOption).length > 0) {
      chartInstance.setOption(newOption, true);
      state.currentOption = newOption;
    }

    if (level > previousLevel) {
      config.onDrillDown?.({
        level,
        name: dataItem?.name ?? '',
        value: dataItem?.value ?? 0,
        sources: dataItem?.children ?? [],
        chartOption: newOption,
        rawParams: {},
      });
    } else if (level < previousLevel) {
      config.onDrillUp?.({
        previousLevel,
        currentLevel: level,
        chartOption: newOption,
      });
    } else {
      config.onReset?.({ level: 0 });
    }
  };

  const getHistory = (): Array<{ level: number; dataItem: DrillDownSource }> => {
    return [...state.history];
  };

  const canDrillUp = (): boolean => {
    return state.currentLevel > 0;
  };

  const dispose = (): void => {
    if (state.chartInstance && state.clickHandler) {
      unbindClick(state.chartInstance);
    }
    state.chartInstance = null;
    state.config = {} as DrillDownConfig;
    state.history = [];
    state.currentLevel = 0;
    state.initialized = false;
  };

  // ============================================================
  // 返回公开接口
  // ============================================================

  return {
    init,
    drillUp,
    reset,
    getCurrentLevel,
    bindClick,
    unbindClick,
    drillTo,
    getHistory,
    canDrillUp,
    dispose,
  };
}

// ============================================================================
// 辅助函数
// ============================================================================

/**
 * 判断 DrillDownSource 是否有下钻能力
 */
export function canDrillDown(source: DrillDownSource): boolean {
  return !!(source.children && source.children.length > 0) || !!source.chartOption;
}

/**
 * 从扁平数据构建层级结构（辅助函数）
 */
export function buildHierarchy(
  data: Array<{ [key: string]: unknown }>,
  dimensionKey: string,
  valueKey: string,
  childrenKey: string = 'children'
): DrillDownSource[] {
  const sourceMap: Record<string, DrillDownSource[]> = {};

  data.forEach((item) => {
    const dimValue = String(item[dimensionKey]);
    if (!sourceMap[dimValue]) {
      sourceMap[dimValue] = [];
    }
    sourceMap[dimValue].push({
      name: item[dimensionKey] as string | number,
      value: item[valueKey] as string | number,
      children: item[childrenKey]
        ? buildHierarchy(item[childrenKey] as Array<{ [key: string]: unknown }>, dimensionKey, valueKey, childrenKey)
        : undefined,
    });
  });

  return Object.values(sourceMap).flat();
}

/**
 * 创建典型的地区下钻示例配置
 */
export function createRegionDrillDown(
  regionData: Record<string, DrillDownSource[]>
): DrillDownConfig {
  return {
    dimension: 'region',
    sources: regionData,
  };
}

/**
 * 创建典型的分类下钻示例配置
 */
export function createCategoryDrillDown(
  categoryData: Record<string, DrillDownSource[]>
): DrillDownConfig {
  return {
    dimension: 'category',
    sources: categoryData,
  };
}
