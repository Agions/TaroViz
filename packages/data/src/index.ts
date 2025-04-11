/**
 * TaroViz 数据处理工具
 * 提供数据转换、聚合、过滤等功能
 */

/**
 * 数据系列类型
 */
export type SeriesType = 
  | 'line'
  | 'bar'
  | 'pie'
  | 'scatter'
  | 'radar'
  | 'gauge'
  | 'heatmap'
  | 'tree'
  | 'graph';

/**
 * 数据点接口
 */
export interface DataPoint {
  [key: string]: any;
}

/**
 * 数据系列接口
 */
export interface DataSeries {
  /**
   * 系列名称
   */
  name: string;
  
  /**
   * 系列类型
   */
  type: SeriesType;
  
  /**
   * 数据点
   */
  data: DataPoint[];
  
  /**
   * 附加属性
   */
  [key: string]: any;
}

/**
 * 数据集接口
 */
export interface DataSet {
  /**
   * 数据源
   */
  source: DataPoint[];
  
  /**
   * 维度定义
   */
  dimensions?: string[];
  
  /**
   * 系列列表
   */
  series?: DataSeries[];
}

/**
 * 过滤函数类型
 */
export type FilterFunction = (point: DataPoint) => boolean;

/**
 * 映射函数类型
 */
export type MapFunction = (point: DataPoint) => DataPoint;

/**
 * 聚合函数类型
 */
export type AggregateFunction = (data: DataPoint[]) => DataPoint;

/**
 * 过滤数据
 * @param data 原始数据
 * @param filter 过滤函数
 * @returns 过滤后的数据
 */
export function filterData(data: DataPoint[], filter: FilterFunction): DataPoint[] {
  return data.filter(filter);
}

/**
 * 映射数据
 * @param data 原始数据
 * @param mapper 映射函数
 * @returns 映射后的数据
 */
export function mapData(data: DataPoint[], mapper: MapFunction): DataPoint[] {
  return data.map(mapper);
}

/**
 * 聚合数据
 * @param data 原始数据
 * @param key 分组键
 * @param aggregator 聚合函数
 * @returns 聚合后的数据
 */
export function aggregateData(data: DataPoint[], key: string, aggregator: AggregateFunction): DataPoint[] {
  const groups: Record<string, DataPoint[]> = {};
  
  // 分组
  data.forEach(point => {
    const groupKey = String(point[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(point);
  });
  
  // 聚合
  return Object.entries(groups).map(([groupKey, points]) => ({
    [key]: groupKey,
    ...aggregator(points)
  }));
}

/**
 * 转换为系列数据
 * @param data 原始数据
 * @param xField x轴字段
 * @param yField y轴字段
 * @param seriesField 系列字段
 * @param type 图表类型
 * @returns 系列数据
 */
export function transformToSeries(
  data: DataPoint[],
  xField: string,
  yField: string,
  seriesField?: string,
  type: SeriesType = 'line'
): DataSeries[] {
  if (!seriesField) {
    // 单系列
    return [
      {
        name: yField,
        type,
        data: data.map(item => ({
          name: item[xField],
          value: item[yField]
        }))
      }
    ];
  }
  
  // 多系列
  const seriesMap: Record<string, DataPoint[]> = {};
  
  data.forEach(item => {
    const seriesKey = String(item[seriesField]);
    if (!seriesMap[seriesKey]) {
      seriesMap[seriesKey] = [];
    }
    seriesMap[seriesKey].push({
      name: item[xField],
      value: item[yField]
    });
  });
  
  return Object.entries(seriesMap).map(([seriesKey, points]) => ({
    name: seriesKey,
    type,
    data: points
  }));
}

/**
 * 创建数据集
 * @param source 数据源
 * @param dimensions 维度
 * @returns 数据集
 */
export function createDataSet(source: DataPoint[], dimensions?: string[]): DataSet {
  if (!dimensions && source.length > 0) {
    dimensions = Object.keys(source[0]);
  }
  
  return { source, dimensions };
}

/**
 * 数据转换选项
 */
export interface TransformOptions {
  /**
   * X轴字段名
   */
  x: string;
  
  /**
   * Y轴字段名
   */
  y: string;
  
  /**
   * 系列字段名（可选）
   */
  series?: string;
  
  /**
   * 数据分组字段（可选）
   */
  groupBy?: string | string[];
  
  /**
   * 数据排序字段（可选）
   */
  sortBy?: string;
  
  /**
   * 排序方向
   */
  sortDirection?: 'asc' | 'desc';
  
  /**
   * 数据过滤条件
   */
  filter?: (item: any) => boolean;
}

/**
 * 聚合选项
 */
export interface AggregateOptions {
  /**
   * 分组字段
   */
  groupBy: string | string[];
  
  /**
   * 度量字段
   */
  metrics: string | string[];
  
  /**
   * 聚合方法
   */
  aggregation: 'sum' | 'avg' | 'min' | 'max' | 'count';
}

/**
 * 采样选项
 */
export interface SampleOptions {
  /**
   * 采样点数
   */
  count: number;
  
  /**
   * 采样方法
   */
  method?: 'lttb' | 'max' | 'min' | 'average' | 'first' | 'random';
  
  /**
   * X轴字段
   */
  xField?: string;
  
  /**
   * Y轴字段
   */
  yField?: string;
}

/**
 * 将API数据转换为图表数据
 * @param data 原始数据
 * @param options 转换选项
 * @returns 转换后的图表数据
 */
export function transformData(data: any[], options: TransformOptions): any[] | Record<string, any[]> {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }
  
  // 应用过滤
  let filteredData = options.filter ? data.filter(options.filter) : [...data];
  
  // 应用排序
  if (options.sortBy) {
    filteredData.sort((a, b) => {
      const valueA = a[options.sortBy!];
      const valueB = b[options.sortBy!];
      
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return options.sortDirection === 'desc' ? valueB - valueA : valueA - valueB;
      }
      
      const strA = String(valueA);
      const strB = String(valueB);
      
      return options.sortDirection === 'desc' 
        ? strB.localeCompare(strA) 
        : strA.localeCompare(strB);
    });
  }
  
  // 如果需要按系列分组
  if (options.series) {
    // 创建系列映射
    const seriesMap: Record<string, any[]> = {};
    
    // 按系列分组数据
    filteredData.forEach(item => {
      const seriesKey = String(item[options.series!]);
      
      if (!seriesMap[seriesKey]) {
        seriesMap[seriesKey] = [];
      }
      
      seriesMap[seriesKey].push({
        name: item[options.x],
        value: item[options.y]
      });
    });
    
    return seriesMap;
  }
  
  // 如果需要按其他字段分组
  if (options.groupBy) {
    const groupFields = Array.isArray(options.groupBy) 
      ? options.groupBy 
      : [options.groupBy];
    
    // 创建分组映射
    const groupMap: Record<string, any[]> = {};
    
    // 按字段分组数据
    filteredData.forEach(item => {
      const groupKey = groupFields.map(field => String(item[field])).join('-');
      
      if (!groupMap[groupKey]) {
        groupMap[groupKey] = [];
      }
      
      groupMap[groupKey].push({
        name: item[options.x],
        value: item[options.y]
      });
    });
    
    return groupMap;
  }
  
  // 基本转换
  return filteredData.map(item => ({
    name: item[options.x],
    value: item[options.y]
  }));
}

/**
 * 聚合数据
 * @param data 原始数据
 * @param options 聚合选项
 * @returns 聚合后的数据
//  */
// export function aggregateData(data: any[], options: AggregateOptions): any[] {
//   if (!data || !Array.isArray(data) || data.length === 0) {
//     return [];
//   }
  
//   const groupFields = Array.isArray(options.groupBy) 
//     ? options.groupBy 
//     : [options.groupBy];
  
//   const metricFields = Array.isArray(options.metrics) 
//     ? options.metrics 
//     : [options.metrics];
  
//   // 创建分组映射
//   const groupMap: Record<string, any> = {};
  
//   // 按组聚合数据
//   data.forEach(item => {
//     const groupKey = groupFields.map(field => String(item[field])).join('-');
    
//     if (!groupMap[groupKey]) {
//       // 初始化分组
//       const groupItem: Record<string, any> = {};
      
//       // 保存分组字段值
//       groupFields.forEach(field => {
//         groupItem[field] = item[field];
//       });
      
//       // 初始化度量字段
//       metricFields.forEach(field => {
//         groupItem[`${field}_${options.aggregation}`] = {
//           sum: 0,
//           count: 0,
//           min: Number.MAX_VALUE,
//           max: Number.MIN_VALUE,
//           values: []
//         };
//       });
      
//       groupMap[groupKey] = groupItem;
//     }
    
//     // 更新度量值
//     metricFields.forEach(field => {
//       const value = Number(item[field]) || 0;
//       const metric = groupMap[groupKey][`${field}_${options.aggregation}`];
      
//       metric.sum += value;
//       metric.count += 1;
//       metric.min = Math.min(metric.min, value);
//       metric.max = Math.max(metric.max, value);
//       metric.values.push(value);
//     });
//   });
  
//   // 计算最终的聚合值
//   return Object.values(groupMap).map(group => {
//     const result = { ...group };
    
//     metricFields.forEach(field => {
//       const metricKey = `${field}_${options.aggregation}`;
//       const metric = group[metricKey];
      
//       // 根据聚合方法计算最终值
//       switch (options.aggregation) {
//         case 'sum':
//           result[field] = metric.sum;
//           break;
//         case 'avg':
//           result[field] = metric.count > 0 ? metric.sum / metric.count : 0;
//           break;
//         case 'min':
//           result[field] = metric.min !== Number.MAX_VALUE ? metric.min : 0;
//           break;
//         case 'max':
//           result[field] = metric.max !== Number.MIN_VALUE ? metric.max : 0;
//           break;
//         case 'count':
//           result[field] = metric.count;
//           break;
//       }
      
//       // 移除临时数据
//       delete result[metricKey];
//     });
    
//     return result;
//   });
// }

/**
 * 数据采样（降采样）
 * @param data 原始数据
 * @param options 采样选项
 * @returns 采样后的数据
 */
export function sampleData(data: any[], options: SampleOptions): any[] {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return [];
  }
  
  // 如果数据点数小于等于目标采样点数，直接返回原始数据
  if (data.length <= options.count) {
    return [...data];
  }
  
  const xField = options.xField || 'x';
  const yField = options.yField || 'y';
  
  // 根据采样方法进行采样
  switch (options.method) {
    case 'lttb':
      return lttbSample(data, options.count, xField, yField);
    case 'max':
      return maxSample(data, options.count, xField, yField);
    case 'min':
      return minSample(data, options.count, xField, yField);
    case 'average':
      return averageSample(data, options.count, xField, yField);
    case 'first':
      return firstSample(data, options.count);
    case 'random':
      return randomSample(data, options.count);
    default:
      return lttbSample(data, options.count, xField, yField);
  }
}

/**
 * 最大值采样
 */
function maxSample(data: any[], count: number, xField: string, yField: string): any[] {
  // 将数据分成count组
  const bucketSize = Math.ceil(data.length / count);
  const result: any[] = [];
  
  for (let i = 0; i < count; i++) {
    const startIdx = i * bucketSize;
    const endIdx = Math.min(startIdx + bucketSize, data.length);
    
    if (startIdx >= data.length) {
      break;
    }
    
    // 找出每组中y值最大的点
    let maxIdx = startIdx;
    for (let j = startIdx + 1; j < endIdx; j++) {
      if (data[j][yField] > data[maxIdx][yField]) {
        maxIdx = j;
      }
    }
    
    result.push(data[maxIdx]);
  }
  
  return result;
}

/**
 * 最小值采样
 */
function minSample(data: any[], count: number, xField: string, yField: string): any[] {
  // 将数据分成count组
  const bucketSize = Math.ceil(data.length / count);
  const result: any[] = [];
  
  for (let i = 0; i < count; i++) {
    const startIdx = i * bucketSize;
    const endIdx = Math.min(startIdx + bucketSize, data.length);
    
    if (startIdx >= data.length) {
      break;
    }
    
    // 找出每组中y值最小的点
    let minIdx = startIdx;
    for (let j = startIdx + 1; j < endIdx; j++) {
      if (data[j][yField] < data[minIdx][yField]) {
        minIdx = j;
      }
    }
    
    result.push(data[minIdx]);
  }
  
  return result;
}

/**
 * 平均值采样
 */
function averageSample(data: any[], count: number, xField: string, yField: string): any[] {
  // 将数据分成count组
  const bucketSize = Math.ceil(data.length / count);
  const result: any[] = [];
  
  for (let i = 0; i < count; i++) {
    const startIdx = i * bucketSize;
    const endIdx = Math.min(startIdx + bucketSize, data.length);
    
    if (startIdx >= data.length) {
      break;
    }
    
    // 计算每组的平均值
    let sum = 0;
    for (let j = startIdx; j < endIdx; j++) {
      sum += data[j][yField];
    }
    
    const avg = sum / (endIdx - startIdx);
    
    // 构造新的数据点
    const midIdx = Math.floor((startIdx + endIdx) / 2);
    result.push({
      ...data[midIdx],
      [yField]: avg
    });
  }
  
  return result;
}

/**
 * 首点采样
 */
function firstSample(data: any[], count: number): any[] {
  // 将数据分成count组，取每组第一个点
  const bucketSize = Math.ceil(data.length / count);
  const result: any[] = [];
  
  for (let i = 0; i < count; i++) {
    const idx = i * bucketSize;
    
    if (idx >= data.length) {
      break;
    }
    
    result.push(data[idx]);
  }
  
  return result;
}

/**
 * 随机采样
 */
function randomSample(data: any[], count: number): any[] {
  if (count >= data.length) {
    return [...data];
  }
  
  // 随机选择count个点
  const result: any[] = [];
  const indices = new Set<number>();
  
  while (indices.size < count) {
    const randomIdx = Math.floor(Math.random() * data.length);
    if (!indices.has(randomIdx)) {
      indices.add(randomIdx);
      result.push(data[randomIdx]);
    }
  }
  
  // 按原始顺序排序
  return result.sort((a, b) => data.indexOf(a) - data.indexOf(b));
}

/**
 * 最大三角形三桶算法 (LTTB) 采样
 * 这是一种保持数据视觉特征的降采样算法
 */
function lttbSample(data: any[], count: number, xField: string, yField: string): any[] {
  if (count >= data.length) {
    return [...data];
  }
  
  const result: any[] = [];
  // 始终保留第一个点
  result.push(data[0]);
  
  // 每个桶的大小
  const bucketSize = (data.length - 2) / (count - 2);
  
  // 遍历每个桶
  for (let i = 0; i < count - 2; i++) {
    // 当前桶的范围
    const startIdx = Math.floor((i + 0) * bucketSize) + 1;
    const endIdx = Math.floor((i + 1) * bucketSize) + 1;
    
    // 下一个点的位置
    const nextPointIdx = Math.min(Math.floor((i + 2) * bucketSize) + 1, data.length - 1);
    
    // 上一个选中的点
    const prevPoint = result[result.length - 1];
    // 下一个点
    const nextPoint = data[nextPointIdx];
    
    // 计算面积最大的点
    let maxArea = -1;
    let maxAreaIdx = startIdx;
    
    for (let j = startIdx; j < endIdx; j++) {
      // 计算三角形面积
      const area = triangleArea(
        prevPoint[xField], prevPoint[yField],
        data[j][xField], data[j][yField],
        nextPoint[xField], nextPoint[yField]
      );
      
      if (area > maxArea) {
        maxArea = area;
        maxAreaIdx = j;
      }
    }
    
    // 添加面积最大的点
    result.push(data[maxAreaIdx]);
  }
  
  // 始终保留最后一个点
  result.push(data[data.length - 1]);
  
  return result;
}

/**
 * 计算三角形面积
 */
function triangleArea(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): number {
  return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
}

/**
 * 检测数据中的异常值
 * @param data 数据数组
 * @param field 要检查的字段
 * @param method 检测方法
 * @returns 异常值信息
 */
export function detectOutliers(
  data: any[], 
  field: string, 
  method: 'iqr' | 'zscore' = 'iqr'
): { outliers: any[]; indices: number[] } {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return { outliers: [], indices: [] };
  }
  
  // 提取字段值
  const values = data.map(item => Number(item[field])).filter(val => !isNaN(val));
  
  if (values.length === 0) {
    return { outliers: [], indices: [] };
  }
  
  let isOutlier: (val: number) => boolean;
  
  if (method === 'iqr') {
    // IQR方法
    // 排序值
    const sortedValues = [...values].sort((a, b) => a - b);
    const q1Idx = Math.floor(sortedValues.length * 0.25);
    const q3Idx = Math.floor(sortedValues.length * 0.75);
    
    const q1 = sortedValues[q1Idx];
    const q3 = sortedValues[q3Idx];
    const iqr = q3 - q1;
    
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    
    isOutlier = (val: number) => val < lowerBound || val > upperBound;
  } else {
    // Z-Score方法
    // 计算均值和标准差
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / values.length;
    
    const squareDiffs = values.map(val => (val - mean) ** 2);
    const variance = squareDiffs.reduce((a, b) => a + b, 0) / values.length;
    const stdDev = Math.sqrt(variance);
    
    isOutlier = (val: number) => Math.abs((val - mean) / stdDev) > 3;
  }
  
  // 查找异常值
  const outlierIndices: number[] = [];
  
  for (let i = 0; i < data.length; i++) {
    const val = Number(data[i][field]);
    if (!isNaN(val) && isOutlier(val)) {
      outlierIndices.push(i);
    }
  }
  
  // 返回异常值和它们的索引
  return {
    outliers: outlierIndices.map(idx => data[idx]),
    indices: outlierIndices
  };
}

/**
 * 格式化日期
 * @param value 日期值
 * @param format 格式字符串
 * @returns 格式化后的日期字符串
 */
export function formatDate(value: Date | number | string, format: string = 'YYYY-MM-DD'): string {
  const date = new Date(value);
  
  if (isNaN(date.getTime())) {
    return String(value);
  }
  
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  // 替换格式占位符
  return format
    .replace(/YYYY/g, year.toString())
    .replace(/YY/g, (year % 100).toString().padStart(2, '0'))
    .replace(/MM/g, month.toString().padStart(2, '0'))
    .replace(/M/g, month.toString())
    .replace(/DD/g, day.toString().padStart(2, '0'))
    .replace(/D/g, day.toString())
    .replace(/HH/g, hours.toString().padStart(2, '0'))
    .replace(/H/g, hours.toString())
    .replace(/mm/g, minutes.toString().padStart(2, '0'))
    .replace(/m/g, minutes.toString())
    .replace(/ss/g, seconds.toString().padStart(2, '0'))
    .replace(/s/g, seconds.toString());
}


/**
 * 版本信息
 */
export const version = '0.5.0';

export default {
  filterData,
  mapData,
  aggregateData,
  transformToSeries,
  createDataSet
}; 