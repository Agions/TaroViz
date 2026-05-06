/**
 * DrillDown 辅助函数
 * 将 createDrillDown 中的逻辑拆分为独立函数，提高代码可维护性
 */

import type { ECharts, EChartsOption, ECElementEvent } from 'echarts';
import type { DrillDownSource, DrillDownConfig } from './drillDown';

// ============================================================================
// 图表配置构建
// ============================================================================

/**
 * 从 DrillDownSource 数组构建 ECharts option
 */
export function buildOptionFromSources(sources: DrillDownSource[]): EChartsOption {
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
}

// ============================================================================
// 下钻配置获取
// ============================================================================

/**
 * 根据层级和触发数据项获取下钻后的图表配置
 */
export function getDrillDownOption(
  level: number,
  dataItem: DrillDownSource | undefined,
  direction: 'down' | 'up' | 'reset',
  sources: DrillDownSource[],
  initialSources: DrillDownSource[] | undefined,
  currentOption: EChartsOption,
  initialOption: Record<string, unknown>
): EChartsOption {
  let targetOption: EChartsOption = {};

  if (direction === 'reset' || level === 0) {
    // 重置或回到第一层：使用初始数据
    if (initialSources) {
      targetOption = buildOptionFromSources(initialSources);
    } else {
      targetOption = {};
    }
  } else if (direction === 'up') {
    // 上钻：从 history 中找到上一层的状态
    if (sources.length > 0 && sources[0].chartOption) {
      targetOption = sources[0].chartOption;
    } else {
      targetOption = buildOptionFromSources(sources);
    }
  } else if (direction === 'down' && dataItem) {
    // 下钻
    if (dataItem.chartOption) {
      // 优先使用自定义 chartOption
      targetOption = dataItem.chartOption;
    } else if (dataItem.children && dataItem.children.length > 0) {
      // 从 children 构建图表 option
      targetOption = buildOptionFromSources(dataItem.children);
    }
  }

  return targetOption;
}

// ============================================================================
// 数据源获取
// ============================================================================

/**
 * 获取当前层级的数据源列表
 */
export function getCurrentLevelSources(
  currentLevel: number,
  initialSources: DrillDownSource[] | undefined,
  history: Array<{ level: number; dataItem: DrillDownSource }>
): DrillDownSource[] {
  if (currentLevel === 0) {
    // 第 0 层：使用 initialSources
    return initialSources ?? [];
  }

  // 其他层级：从 history 中找到上一层点击的数据项的 children
  const lastHistory = history[history.length - 1];
  if (lastHistory && lastHistory.dataItem.children) {
    return lastHistory.dataItem.children;
  }

  return [];
}

// ============================================================================
// 下钻执行
// ============================================================================

/**
 * 检查是否有下钻数据
 */
export function hasDrillDownData(
  dataItem: DrillDownSource | undefined
): dataItem is DrillDownSource {
  if (!dataItem) return false;
  return !!(dataItem.children && dataItem.children.length > 0) || !!dataItem.chartOption;
}

/**
 * 在当前层级数据中查找匹配的数据项
 */
export function findMatchedSource(
  name: string | number,
  value: unknown,
  currentLevelSources: DrillDownSource[],
  initialSources: DrillDownSource[] | undefined,
  currentLevel: number
): DrillDownSource | undefined {
  // 在当前层级的数据中查找匹配项
  let matchedSource = currentLevelSources.find(
    (s) => String(s.name) === String(name) || s.value === value
  );

  // 如果没找到，尝试在 initialSources 中查找
  if (!matchedSource && currentLevel === 0 && initialSources) {
    matchedSource = initialSources.find(
      (s) => String(s.name) === String(name) || s.value === value
    );
  }

  return matchedSource;
}

/**
 * 执行下钻操作
 */
export function executeDrillDown(
  params: ECElementEvent,
  state: {
    chartInstance: ECharts | null;
    config: DrillDownConfig;
    currentLevel: number;
    history: Array<{ level: number; dataItem: DrillDownSource }>;
    currentOption: EChartsOption;
  }
): boolean {
  const { chartInstance, config } = state;
  if (!chartInstance) return false;

  const { name, value } = params;

  // 获取当前层级数据源
  const currentLevelSources = getCurrentLevelSources(
    state.currentLevel,
    config.initialSources,
    state.history
  );

  // 查找匹配项
  const matchedSource = findMatchedSource(
    name,
    value,
    currentLevelSources,
    config.initialSources,
    state.currentLevel
  );

  // 如果没有下钻数据，不执行
  if (!hasDrillDownData(matchedSource)) {
    console.warn('[DrillDown] No drill-down data available for:', name);
    return false;
  }

  // 记录历史
  if (matchedSource) {
    state.history.push({ level: state.currentLevel, dataItem: matchedSource });
  }

  // 更新层级
  state.currentLevel += 1;

  // 获取新的图表配置
  const newOption = getDrillDownOption(
    state.currentLevel,
    matchedSource,
    'down',
    matchedSource.children ?? [],
    config.initialSources,
    state.currentOption,
    {}
  );

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

  return true;
}

// ============================================================================
// 状态管理
// ============================================================================

/**
 * 执行上钻操作
 */
export function executeDrillUp(
  state: {
    chartInstance: ECharts | null;
    currentLevel: number;
    history: Array<{ level: number; dataItem: DrillDownSource }>;
    currentOption: EChartsOption;
    initialOption: Record<string, unknown>;
  },
  config: DrillDownConfig
): boolean {
  const { chartInstance } = state;
  if (!chartInstance || state.currentLevel <= 0) {
    console.warn('[DrillDown] Cannot drill up: already at top level');
    return false;
  }

  const previousLevel = state.currentLevel;

  // 弹出历史
  state.history.pop();

  // 更新层级
  state.currentLevel -= 1;

  // 获取当前层级数据源
  const currentLevelSources = getCurrentLevelSources(
    state.currentLevel,
    config.initialSources,
    state.history
  );

  // 获取新的图表配置
  const newOption = getDrillDownOption(
    state.currentLevel,
    undefined,
    'up',
    currentLevelSources,
    config.initialSources,
    state.currentOption,
    state.initialOption
  );

  // 更新图表
  if (newOption && Object.keys(newOption).length > 0) {
    chartInstance.setOption(newOption, true);
    state.currentOption = newOption;
  } else if (state.currentLevel === 0 && state.initialOption) {
    chartInstance.setOption(state.initialOption as EChartsOption, true);
    state.currentOption = state.initialOption as EChartsOption;
  }

  // 触发回调
  config.onDrillUp?.({
    previousLevel,
    currentLevel: state.currentLevel,
    chartOption: newOption,
  });

  return true;
}

/**
 * 执行重置操作
 */
export function executeReset(
  state: {
    chartInstance: ECharts | null;
    currentLevel: number;
    history: Array<{ level: number; dataItem: DrillDownSource }>;
    currentOption: EChartsOption;
    initialOption: Record<string, unknown>;
  },
  config: DrillDownConfig
): void {
  const { chartInstance } = state;
  if (!chartInstance) return;

  // 清空历史
  state.history = [];
  state.currentLevel = 0;

  // 获取当前层级数据源
  const currentLevelSources = getCurrentLevelSources(
    state.currentLevel,
    config.initialSources,
    state.history
  );

  // 获取初始配置
  const newOption = getDrillDownOption(
    0,
    undefined,
    'reset',
    currentLevelSources,
    config.initialSources,
    state.currentOption,
    state.initialOption
  );

  // 更新图表
  if (newOption && Object.keys(newOption).length > 0) {
    chartInstance.setOption(newOption, true);
    state.currentOption = newOption;
  } else if (state.initialOption && Object.keys(state.initialOption).length > 0) {
    chartInstance.setOption(state.initialOption as EChartsOption, true);
    state.currentOption = state.initialOption as EChartsOption;
  }

  // 触发回调
  config.onReset?.({ level: 0 });
}

/**
 * 执行跳转到指定层级
 */
export function executeDrillTo(
  level: number,
  dataItem: DrillDownSource | undefined,
  state: {
    chartInstance: ECharts | null;
    currentLevel: number;
    history: Array<{ level: number; dataItem: DrillDownSource }>;
    currentOption: EChartsOption;
  },
  config: DrillDownConfig
): void {
  const { chartInstance } = state;
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

  // 获取当前层级数据源
  const currentLevelSources = getCurrentLevelSources(
    state.currentLevel,
    config.initialSources,
    state.history
  );

  const newOption = getDrillDownOption(
    level,
    dataItem,
    level === 0 ? 'reset' : 'down',
    currentLevelSources,
    config.initialSources,
    state.currentOption,
    {}
  );

  if (newOption && Object.keys(newOption).length > 0) {
    chartInstance.setOption(newOption, true);
    state.currentOption = newOption;
  }

  // 触发回调
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
}
