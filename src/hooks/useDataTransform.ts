/**
 * useDataTransform - 数据转换 Hook
 * 提供便捷的数据转换功能，将原始数据转换为 ECharts 配置
 */
import { useMemo } from 'react';
import type { EChartsOption } from 'echarts';
import {
  DataItem,
  DataSource,
  AggregationType,
  TimePeriod,
  TransformMapping,
  transformLineOrBar as utilsTransformLineOrBar,
  transformPie as utilsTransformPie,
  transformScatter as utilsTransformScatter,
  transformRadar as utilsTransformRadar,
  transformHeatmap as utilsTransformHeatmap,
  groupByTime,
  aggregateValues,
} from './utils/dataTransformUtils';

// Re-export types for external use
export type { DataItem, DataSource, AggregationType, TimePeriod, TransformMapping };

// ============================================================================
// 类型定义
// ============================================================================

/** 映射配置 */
export interface MappingConfig {
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
}

/** 转换选项 */
export interface TransformOptions {
  /** 数据源 */
  data: DataSource;
  /** 图表类型 */
  chartType: 'line' | 'bar' | 'pie' | 'scatter' | 'radar' | 'heatmap';
  /** 映射配置 */
  mapping?: MappingConfig;
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
    switch (chartType) {
      case 'line':
      case 'bar':
        return utilsTransformLineOrBar(data, chartType, mapping, extraConfig);

      case 'pie':
        return utilsTransformPie(data, mapping, extraConfig);

      case 'scatter':
        return utilsTransformScatter(data, mapping, extraConfig);

      case 'radar':
        return utilsTransformRadar(data, mapping, extraConfig);

      case 'heatmap':
        return utilsTransformHeatmap(data, mapping, extraConfig);

      default:
        return {};
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
          return aggregateValues(items, valueField, aggregation, fillMissing);
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
        aggregateValues(groupedData[date] || [], valueField, aggregation, fillMissing)
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
// 导出
// ============================================================================

export const useTransform = useDataTransform;

export default {
  useDataTransform,
  useTableTransform,
  useTimeSeriesTransform,
};
