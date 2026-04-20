import type { EChartsType } from 'echarts';

/**
 * 全局图表实例存储
 */
export const CHART_INSTANCES: Record<string, EChartsType> = {};

/**
 * 注册图表实例
 * @param id 图表ID
 * @param instance 图表实例
 */
export function registerChart(id: string, instance: EChartsType): void {
  // 如果已存在同名ID，先释放旧实例防止内存泄漏
  if (CHART_INSTANCES[id]) {
    try {
      console.warn(
        `[TaroViz] Chart instance '${id}' already exists, replacing and disposing old instance`
      );
      CHART_INSTANCES[id].dispose();
    } catch (e) {
      console.warn(`Failed to dispose old chart instance: ${id}`, e);
    }
  }
  CHART_INSTANCES[id] = instance;
}

/**
 * 获取图表实例
 * @param id 图表ID
 * @returns 图表实例
 */
export function getChart(id: string): EChartsType | undefined {
  return CHART_INSTANCES[id];
}

/**
 * 移除图表实例
 * @param id 图表ID
 */
export function removeChart(id: string): void {
  if (CHART_INSTANCES[id]) {
    try {
      CHART_INSTANCES[id].dispose();
    } catch (e) {
      console.warn(`Failed to dispose chart on removal: ${id}`, e);
    }
    delete CHART_INSTANCES[id];
  }
}

/**
 * 获取所有图表实例
 * @returns 所有图表实例的浅拷贝
 */
export function getAllCharts(): Record<string, EChartsType> {
  return { ...CHART_INSTANCES };
}

/**
 * 清空所有图表实例
 */
export function clearAllCharts(): void {
  Object.keys(CHART_INSTANCES).forEach((id) => {
    try {
      CHART_INSTANCES[id].dispose();
    } catch (e) {
      console.warn(`Failed to dispose chart: ${id}`, e);
    }
    delete CHART_INSTANCES[id];
  });
}

/**
 * 调整所有图表实例大小
 */
export function resizeAllCharts(): void {
  Object.keys(CHART_INSTANCES).forEach((id) => {
    try {
      CHART_INSTANCES[id].resize();
    } catch (e) {
      console.warn(`Failed to resize chart: ${id}`, e);
    }
  });
}
