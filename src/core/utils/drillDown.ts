/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * DrillDown - 数据下钻工具
 * 支持点击图表数据项时，自动下钻到更细粒度的数据视图
 *
 * @refactor 已拆分为多个辅助函数，详见 drillDownHelpers.ts
 */
import type { ECharts, EChartsOption, ECElementEvent } from 'echarts';
import {
  buildOptionFromSources,
  getDrillDownOption,
  getCurrentLevelSources,
  hasDrillDownData,
  findMatchedSource,
  executeDrillDown,
  executeDrillUp,
  executeReset,
  executeDrillTo,
} from './drillDownHelpers';

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
    executeDrillUp(state, state.config);
  };

  const reset = (): void => {
    executeReset(state, state.config);
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
      executeDrillDown(params, state);
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
    executeDrillTo(level, dataItem, state, state.config);
  };

  const getHistory = (): Array<{ level: number; dataItem: DrillDownSource }> => {
    return [...state.history];
  };

  const canDrillUp = (): boolean => state.currentLevel > 0;

  const dispose = (): void => {
    if (state.chartInstance && state.clickHandler) {
      state.chartInstance.off('click', state.clickHandler);
    }
    state.chartInstance = null;
    state.clickHandler = null;
    state.history = [];
    state.currentLevel = 0;
    state.initialized = false;
  };

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
// 导出
// ============================================================================
