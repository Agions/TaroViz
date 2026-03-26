/**
 * useDataTransform - 数据转换 Hook
 * 提供便捷的数据转换功能，将原始数据转换为 ECharts 配置
 */
import { useMemo } from 'react';
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

/** 转换选项 */
export interface TransformOptions {
  /** 数据源 */
  data: DataSource;
  /** 图表类型 */
  chartType: 'line' | 'bar' | 'pie' | 'scatter' | 'radar' | 'heatmap';
  /** 映射配置 */
  mapping?: {
    /** 类别字段 (X轴) */
    xField?: string;
    /** 值字段 (Y轴) */
    yField?: string;
    /** 系列字段 */
    seriesField?: string;
    /** 大小字段 (用于散点图) */
    sizeField?: string;
    /** 颜色字段 */
    colorField?: string;
    /** 名称字段 (用于饼图等) */
    nameField?: string;
    /** 值字段 (用于饼图等) */
    valueField?: string;
  };
  /** 聚合配置 */
  aggregation?: {
    field: string;
    method: AggregationType;
  };
  /** 排序配置 */
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
  /** 过滤配置 */
  filter?: (item: Record<string, unknown>) => boolean;
  /** 转换后的额外配置 */
  extraConfig?: Partial<EChartsOption>;
}

/** 表格数据转换选项 */
export interface TableTransformOptions {
  /** 表格数据 */
  data: Record<string, unknown>[];
  /** 列配置 */
  columns?: Array<{
    field: string;
    label?: string;
    aggregation?: AggregationType;
    color?: string;
  }>;
  /** 是否转置 */
  transpose?: boolean;
  /** 额外配置 */
  extraConfig?: Partial<EChartsOption>;
}

/** 时间序列转换选项 */
export interface TimeSeriesTransformOptions {
  /** 数据 */
  data: DataItem[];
  /** 日期字段 */
  dateField: string;
  /** 值字段 */
  valueField: string;
  /** 分组字段 (可选) */
  groupField?: string;
  /** 周期 */
  period?: TimePeriod;
  /** 聚合方式 */
  aggregation?: AggregationType;
  /** 填充方式 */
  fillMissing?: 'zero' | 'forward' | 'interpolate';
  /** 转换后的额外配置 */
  extraConfig?: Partial<EChartsOption>;
}

// ============================================================================
// 数据转换 Hook
// ============================================================================

/**
 * 使用数据转换
 * @param options 转换选项
 * @returns 转换后的 ECharts 配置
 */
export function useDataTransform(options: TransformOptions): EChartsOption {
  const { data, chartType, mapping = {}, extraConfig = {} } = options;

  return useMemo(() => {
    const baseOption: EChartsOption = {};

    switch (chartType) {
      case 'line':
      case 'bar':
        return transformLineOrBar(data, chartType, mapping, baseOption, extraConfig);

      case 'pie':
        return transformPie(data, mapping, baseOption, extraConfig);

      case 'scatter':
        return transformScatter(data, mapping, baseOption, extraConfig);

      case 'radar':
        return transformRadar(data, mapping, baseOption, extraConfig);

      case 'heatmap':
        return transformHeatmap(data, mapping, baseOption, extraConfig);

      default:
        return baseOption;
    }
  }, [data, chartType, mapping, extraConfig]);
}

/**
 * 使用表格数据转换
 * 将表格数据转换为 ECharts 配置
 */
export function useTableTransform(options: TableTransformOptions): EChartsOption {
  const { data, columns = [], transpose = false, extraConfig = {} } = options;

  return useMemo(() => {
    if (!data || data.length === 0) {
      return {};
    }

    const firstRow = data[0];
    const fields = columns.length > 0 ? columns.map((c) => c.field) : Object.keys(firstRow);

    // Build columns map for O(1) lookup instead of O(n) find
    const columnsMap = new Map(columns.map((c) => [c.field, c]));

    const categories = transpose ? fields : data.map((row) => String(row[fields[0]] || ''));

    // For non-transpose, we skip the first field (it's used for categories)
    const seriesFields = transpose ? fields : fields.slice(1);

    const series = seriesFields.map((fieldName: string | Record<string, unknown>) => {
      const key = typeof fieldName === 'string' ? fieldName : '';
      const colConfig = columnsMap.get(key);
      // values calculation is the same regardless of transpose
      const values = data.map((row) => Number(row[key as keyof typeof row]) || 0);

      return {
        name: colConfig?.label || key,
        type: 'bar' as const,
        data: values,
        itemStyle: colConfig?.color ? { color: colConfig.color } : undefined,
      };
    });

    return {
      xAxis: { type: 'category', data: categories },
      yAxis: { type: 'value' },
      series,
      ...extraConfig,
    };
  }, [data, columns, transpose, extraConfig]);
}

/**
 * 使用时间序列转换
 * 将时间序列数据转换为 ECharts 配置
 */
export function useTimeSeriesTransform(options: TimeSeriesTransformOptions): EChartsOption {
  const {
    data,
    dateField,
    valueField,
    groupField,
    period = 'day',
    aggregation = 'sum',
    fillMissing = 'forward',
    extraConfig = {},
  } = options;

  return useMemo(() => {
    if (!data || data.length === 0) {
      return {};
    }

    // 按时间分组
    const groupedData = groupByTime(data, dateField, period);
    const categories = Object.keys(groupedData).sort();

    if (groupField) {
      // 多系列
      const groups = new Set(data.map((d) => String(d[groupField])));
      const series = Array.from(groups).map((group) => {
        const groupValues = categories.map((date) => {
          const items = groupedData[date]?.filter((d) => String(d[groupField]) === group) || [];
          return aggregateValues(items, valueField, aggregation);
        });
        return { name: group, type: 'line', data: groupValues, smooth: true };
      });
      return {
        xAxis: { type: 'category', data: categories },
        yAxis: { type: 'value' },
        series,
        ...extraConfig,
      };
    } else {
      // 单系列
      const values = categories.map((date) =>
        aggregateValues(groupedData[date] || [], valueField, aggregation)
      );
      return {
        xAxis: { type: 'category', data: categories },
        yAxis: { type: 'value' },
        series: [{ type: 'line', data: values, smooth: true }],
        ...extraConfig,
      };
    }
  }, [data, dateField, valueField, groupField, period, aggregation, fillMissing, extraConfig]);
}

// ============================================================================
// 辅助函数
// ============================================================================

function transformLineOrBar(
  data: DataSource,
  chartType: 'line' | 'bar',
  mapping: TransformOptions['mapping'],
  baseOption: EChartsOption,
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

function transformPie(
  data: DataSource,
  mapping: TransformOptions['mapping'],
  baseOption: EChartsOption,
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

function transformScatter(
  data: DataSource,
  mapping: TransformOptions['mapping'],
  baseOption: EChartsOption,
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

function transformRadar(
  data: DataSource,
  mapping: TransformOptions['mapping'],
  baseOption: EChartsOption,
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

function transformHeatmap(
  data: DataSource,
  mapping: TransformOptions['mapping'],
  baseOption: EChartsOption,
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

function groupByTime(
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

function aggregateValues(items: DataItem[], field: string, method: AggregationType): number {
  if (items.length === 0) return 0;
  const values = items.map((item) => Number((item as Record<string, unknown>)[field]) || 0);

  switch (method) {
    case 'sum': {
      let sum = 0;
      for (let i = 0; i < values.length; i++) {
        sum += values[i];
      }
      return sum;
    }
    case 'average': {
      if (values.length === 0) return 0;
      let sum = 0;
      for (let i = 0; i < values.length; i++) {
        sum += values[i];
      }
      return sum / values.length;
    }
    case 'max': {
      let max = values[0];
      for (let i = 1; i < values.length; i++) {
        if (values[i] > max) max = values[i];
      }
      return max;
    }
    case 'min': {
      let min = values[0];
      for (let i = 1; i < values.length; i++) {
        if (values[i] < min) min = values[i];
      }
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

// ============================================================================
// 导出
// ============================================================================

export const useTransform = useDataTransform;

export default {
  useDataTransform,
  useTableTransform,
  useTimeSeriesTransform,
};
