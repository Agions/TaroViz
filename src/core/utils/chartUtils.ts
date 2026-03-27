/**
 * Chart utilities shared between BaseChart and BaseChartWrapper
 */
import type { EChartsOption } from 'echarts';

/**
 * Normalize size value to CSS string
 */
export function normalizeSize(value: number | string | undefined, fallback: string): string {
  if (value === undefined) return fallback;
  return typeof value === 'number' ? `${value}px` : value;
}

/**
 * Calculate total data points in an ECharts option for animation optimization
 */
export function calculateDataLength(option: { series?: unknown } | undefined): number {
  if (!option) return 0;
  let count = 0;
  if (option.series) {
    const series = Array.isArray(option.series) ? option.series : [option.series];
    for (const seriesItem of series as any[]) {
      if (seriesItem.data) {
        if (Array.isArray(seriesItem.data)) {
          count += seriesItem.data.length;
        } else if (typeof seriesItem.data === 'object') {
          count += Object.keys(seriesItem.data).length;
        }
      }
    }
  }
  return count;
}

/**
 * Filter data by filter conditions
 */
export function filterDataByKeys(data: any[], filters: Record<string, any>): any[] {
  if (!filters || Object.keys(filters).length === 0) return data;
  return data.filter((item) => {
    for (const [key, value] of Object.entries(filters)) {
      if (item[key] !== value && !item[key]?.includes?.(value)) return false;
    }
    return true;
  });
}
