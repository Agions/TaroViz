/**
 * Data Transform Utilities
 * 数据转换工具函数
 */
import type { EChartsOption } from 'echarts';

// ============================================================================
// 类型定义
// ============================================================================

/** 原始数据条目 */
export interface DataItem {
  name?: string;
  value?: number | number[];
  [key: string]: unknown;
}

/** 数据源 */
export interface DataSource {
  categories?: (string | number)[];
  series?: DataItem[];
  rows?: Record<string, unknown>[];
  columns?: string[];
}

/** 聚合方式 */
export type AggregationType = 'sum' | 'average' | 'max' | 'min' | 'count' | 'first' | 'last';

/** 时间周期 */
export type TimePeriod = 'day' | 'week' | 'month' | 'quarter' | 'year';

/** 映射配置 */
export interface TransformMapping {
  xField?: string;
  yField?: string;
  seriesField?: string;
  sizeField?: string;
  colorField?: string;
  nameField?: string;
  valueField?: string;
}

// ============================================================================
// 转换函数
// ============================================================================

export function transformLineOrBar(
  data: DataSource,
  chartType: 'line' | 'bar',
  mapping: TransformMapping,
  extraConfig: Partial<EChartsOption>
): EChartsOption {
  const { xField = 'name', yField = 'value', seriesField } = mapping || {};

  const categories = data.categories || data.rows?.map((r) => String(r[xField])) || [];
  const seriesData = data.series || data.rows || [];

  if (seriesField) {
    const groups = new Map<string, DataItem[]>();
    seriesData.forEach((item) => {
      const key = String((item as Record<string, unknown>)[seriesField] || 'default');
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(item);
    });
    const series = Array.from(groups.entries()).map(([name, items]) => ({
      name,
      type: chartType,
      data: items.map((item) => (item as Record<string, unknown>)[yField] ?? 0),
    }));
    return {
      xAxis: { type: 'category', data: categories },
      yAxis: { type: 'value' },
      series,
      ...extraConfig,
    };
  }

  const series = [
    {
      type: chartType as 'line' | 'bar',
      data: seriesData.map((item) => (item as Record<string, unknown>)[yField] ?? 0),
    },
  ];

  return {
    xAxis: { type: 'category', data: categories },
    yAxis: { type: 'value' },
    series,
    ...extraConfig,
  };
}

export function transformPie(
  data: DataSource,
  mapping: TransformMapping,
  extraConfig: Partial<EChartsOption>
): EChartsOption {
  const { nameField = 'name', valueField = 'value' } = mapping || {};

  const seriesData: Array<{ name: string; value: number }> = (data.series || data.rows || []).map(
    (item) => ({
      name: String((item as Record<string, unknown>)[nameField] || ''),
      value: Number((item as Record<string, unknown>)[valueField]) || 0,
    })
  );

  return {
    series: [{ type: 'pie', radius: '60%', data: seriesData }],
    ...extraConfig,
  };
}

export function transformScatter(
  data: DataSource,
  mapping: TransformMapping,
  extraConfig: Partial<EChartsOption>
): EChartsOption {
  const { xField = 'x', yField = 'y', sizeField } = mapping || {};

  const seriesData = (data.series || data.rows || []).map((item) => {
    const record = item as Record<string, unknown>;
    const point: (number | string)[] = [Number(record[xField]) || 0, Number(record[yField]) || 0];
    if (sizeField) point.push(Number(record[sizeField]) || 1);
    return point;
  });

  return {
    xAxis: { type: 'value', scale: true },
    yAxis: { type: 'value', scale: true },
    series: [{ type: 'scatter', data: seriesData }],
    ...extraConfig,
  };
}

export function transformRadar(
  data: DataSource,
  mapping: TransformMapping,
  extraConfig: Partial<EChartsOption>
): EChartsOption {
  const { nameField = 'name', valueField = 'value' } = mapping || {};

  const indicators = (data.series || data.rows || []).map((item) => {
    const record = item as Record<string, unknown>;
    return {
      name: String(record[nameField] || ''),
      max: Math.max(Number(record[valueField]) || 100, 100),
    };
  });

  const values = (data.series || data.rows || []).map(
    (item) => Number((item as Record<string, unknown>)[valueField]) || 0
  );

  return {
    radar: { indicator: indicators },
    series: [{ type: 'radar', data: [{ value: values }] }],
    ...extraConfig,
  };
}

export function transformHeatmap(
  data: DataSource,
  mapping: TransformMapping,
  extraConfig: Partial<EChartsOption>
): EChartsOption {
  const { xField = 'x', yField = 'y', valueField = 'value' } = mapping || {};

  const xCategories = [
    ...new Set(
      (data.series || data.rows || []).map((d) => String((d as Record<string, unknown>)[xField]))
    ),
  ];
  const yCategories = [
    ...new Set(
      (data.series || data.rows || []).map((d) => String((d as Record<string, unknown>)[yField]))
    ),
  ];

  const seriesData = (data.series || data.rows || []).map((item) => {
    const record = item as Record<string, unknown>;
    const xIndex = xCategories.indexOf(String(record[xField]));
    const yIndex = yCategories.indexOf(String(record[yField]));
    return [xIndex, yIndex, Number(record[valueField]) || 0];
  });

  return {
    xAxis: { type: 'category', data: xCategories },
    yAxis: { type: 'category', data: yCategories },
    visualMap: { min: 0, calculable: true },
    series: [{ type: 'heatmap', data: seriesData }],
    ...extraConfig,
  };
}

export function groupByTime(
  data: DataItem[],
  dateField: string,
  period: TimePeriod
): Record<string, DataItem[]> {
  return data.reduce(
    (acc, item) => {
      const date = new Date(String((item as Record<string, unknown>)[dateField]));
      let key: string;

      switch (period) {
        case 'day':
          key = date.toISOString().split('T')[0];
          break;
        case 'week': {
          const week = getWeekNumber(date);
          key = `${date.getFullYear()}-W${week}`;
          break;
        }
        case 'month':
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
        case 'quarter':
          key = `${date.getFullYear()}-Q${Math.ceil((date.getMonth() + 1) / 3)}`;
          break;
        case 'year':
          key = String(date.getFullYear());
          break;
        default:
          key = date.toISOString().split('T')[0];
      }

      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, DataItem[]>
  );
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function aggregateValues(
  items: DataItem[],
  field: string,
  method: AggregationType,
  fillMissing?: 'zero' | 'forward' | 'interpolate'
): number {
  if (items.length === 0) {
    if (fillMissing === 'zero') return 0;
    return NaN;
  }

  const values = items.map((item) => Number((item as Record<string, unknown>)[field]) || 0);

  switch (method) {
    case 'sum': {
      let sum = 0;
      for (let i = 0; i < values.length; i++) sum += values[i];
      return sum;
    }
    case 'average': {
      if (values.length === 0) return 0;
      let sum = 0;
      for (let i = 0; i < values.length; i++) sum += values[i];
      return sum / values.length;
    }
    case 'max': {
      let max = values[0];
      for (let i = 1; i < values.length; i++) if (values[i] > max) max = values[i];
      return max;
    }
    case 'min': {
      let min = values[0];
      for (let i = 1; i < values.length; i++) if (values[i] < min) min = values[i];
      return min;
    }
    case 'count':
      return values.length;
    case 'first':
      return values[0];
    case 'last':
      return values[values.length - 1];
    default:
      return values[0];
  }
}
