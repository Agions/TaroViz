/**
 * ECharts setOption 优化工具
 * 提供带性能优化的 setOption 调用
 */

import type { EChartsOption } from 'echarts';

/**
 * 优化后的 setOption 调用
 * @param chartInstance ECharts 实例
 * @param option 图表配置
 * @param notMerge 是否不合并配置，默认 false
 * @param lazyUpdate 是否延迟更新，默认 true（提升性能）
 */
export function setOptionWithOptimization(
  chartInstance:
    | { setOption: (option: EChartsOption, notMerge?: boolean, lazyUpdate?: boolean) => void }
    | null
    | undefined,
  option: EChartsOption,
  notMerge = false,
  lazyUpdate = true
): void {
  if (!chartInstance?.setOption) return;

  // 使用 lazyUpdate = true 减少重绘次数，提升动画性能
  chartInstance.setOption(option, notMerge, lazyUpdate);
}

/**
 * 批量 setOption 调用（用于动画等场景）
 * 合并多次 setOption 调用，减少重绘
 */
export function batchSetOption(
  chartInstance:
    | { setOption: (option: EChartsOption, notMerge?: boolean, lazyUpdate?: boolean) => void }
    | null
    | undefined,
  options: EChartsOption[],
  notMerge = false
): void {
  if (!chartInstance?.setOption || options.length === 0) return;

  // 合并所有配置
  const mergedOption = options.reduce((acc, opt) => {
    if (!acc) return opt;
    // 安全合并 series
    const accSeries = Array.isArray(acc.series) ? acc.series : [];
    const optSeries = Array.isArray(opt.series) ? opt.series : [];
    return {
      ...acc,
      ...opt,
      series: [...accSeries, ...optSeries],
    };
  }, {} as EChartsOption);

  // 一次性调用，使用 lazyUpdate
  chartInstance.setOption(mergedOption, notMerge, true);
}
