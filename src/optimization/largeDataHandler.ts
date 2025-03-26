import type { EChartsOption } from 'echarts';

/**
 * 大数据处理选项
 */
export interface DataProcessingOptions {
  // 数据降采样阈值，超过该值时会自动降采样
  samplingThreshold?: number;
  // 降采样算法，'lttb'(默认)、'average'、'max'、'min'、'sum'、'first'
  samplingMethod?: 'lttb' | 'average' | 'max' | 'min' | 'sum' | 'first';
  // 兼容旧版API - 采样策略
  samplingStrategy?: 'lttb' | 'avg-max' | 'precision';
  // 降采样后保留的点数
  targetPoints?: number;
  // 渐进渲染批次大小
  progressiveThreshold?: number;
  // 渐进渲染批次间隔(ms)
  progressiveChunkSize?: number;
  // 是否使用异步渲染
  useAsyncRendering?: boolean;
  // 视图窗口外数据是否精简
  simplifyOutOfView?: boolean;
  // 事件节流延迟(ms)
  throttleDelay?: number;
  // 是否使用脏矩形优化
  useDirtyRect?: boolean;
  // 缓存优化
  enableCache?: boolean;
  // 缓存失效时间(ms)
  cacheExpiration?: number;
  // 排除的图表类型
  excludeChartTypes?: string[];
}

/**
 * 缓存项
 */
interface CacheItem {
  data: any;
  timestamp: number;
}

// 数据处理缓存
const dataCache = new Map<string, CacheItem>();

/**
 * 优化图表配置，用于处理大数据量场景
 * @param options 图表配置选项
 * @param processingOptions 优化处理选项
 * @returns 优化后的图表配置
 */
export function optimizeChartOption(
  options: EChartsOption,
  processingOptions: DataProcessingOptions = {}
): EChartsOption {
  const {
    samplingThreshold = 5000,
    samplingMethod = 'lttb',
    samplingStrategy,
    targetPoints = 1000,
    progressiveThreshold = 10000,
    progressiveChunkSize = 500,
    useAsyncRendering = true,
    simplifyOutOfView = true,
    throttleDelay = 100,
    useDirtyRect = true,
    enableCache = true,
    cacheExpiration = 60000, // 默认1分钟
    excludeChartTypes = []
  } = processingOptions;

  // 处理兼容旧版API - 从samplingStrategy映射到samplingMethod
  let actualSamplingMethod = samplingMethod;
  if (samplingStrategy) {
    actualSamplingMethod = samplingStrategy === 'avg-max' ? 'average' :
                       samplingStrategy === 'precision' ? 'first' :
                       samplingStrategy; // 'lttb'直接使用
  }

  // 创建选项副本
  const newOptions = JSON.parse(JSON.stringify(options));

  // 设置全局配置
  if (useAsyncRendering) {
    (newOptions as any).progressive = useAsyncRendering;
  }

  if (useDirtyRect) {
    (newOptions as any).renderer = 'canvas';
    (newOptions as any).useDirtyRect = true;
  }

  // 如果没有数据系列，直接返回
  if (!newOptions.series) {
    return newOptions;
  }

  // 获取数据系列
  const series = Array.isArray(newOptions.series) ? newOptions.series : [newOptions.series];

  // 处理每个系列
  for (let i = 0; i < series.length; i++) {
    const seriesItem = series[i];
    
    // 跳过无数据的系列或排除的图表类型
    if (!seriesItem.data || !Array.isArray(seriesItem.data) || 
        (seriesItem.type && excludeChartTypes.includes(seriesItem.type as string))) {
      continue;
    }
    
    // 获取数据长度
    const dataLength = seriesItem.data.length;
    
    // 缓存键
    const cacheKey = enableCache ? generateCacheKey(seriesItem, processingOptions) : '';
    
    // 检查缓存
    if (enableCache && dataCache.has(cacheKey)) {
      const cached = dataCache.get(cacheKey) as CacheItem;
      
      // 检查缓存是否过期
      if (Date.now() - cached.timestamp < cacheExpiration) {
        seriesItem.data = cached.data;
        continue;
      } else {
        // 移除过期缓存
        dataCache.delete(cacheKey);
      }
    }
    
    // 判断数据量大小，应用不同的优化策略
    if (dataLength > samplingThreshold) {
      // 数据降采样
      seriesItem.data = sampleData(seriesItem.data, actualSamplingMethod, targetPoints);
      
      // 添加到缓存
      if (enableCache) {
        dataCache.set(cacheKey, {
          data: seriesItem.data,
          timestamp: Date.now()
        });
      }
    }
    
    // 添加渐进式渲染
    if (dataLength > progressiveThreshold) {
      seriesItem.progressive = progressiveChunkSize;
      seriesItem.progressiveThreshold = progressiveThreshold;
      seriesItem.progressiveChunkMode = 'sequential';
      seriesItem.animation = false; // 大数据禁用动画
    }
    
    // 折线图特定优化
    if (seriesItem.type === 'line') {
      // 对于大数据集，关闭标记
      if (dataLength > samplingThreshold) {
        seriesItem.showSymbol = false;
        seriesItem.sampling = actualSamplingMethod;
      }
      
      // 使用像素级线条，提升渲染性能
      seriesItem.lineStyle = {
        ...(seriesItem.lineStyle || {}),
        width: 1
      };
    }
    
    // 对于大数据集的散点图，使用更小的标记
    if (seriesItem.type === 'scatter' && dataLength > samplingThreshold) {
      seriesItem.symbolSize = 3;
    }
  }

  // 添加数据缩放组件以提高交互性能
  if (simplifyOutOfView && !newOptions.dataZoom) {
    newOptions.dataZoom = [
      {
        type: 'inside',
        throttle: throttleDelay,
        start: 0,
        end: 100
      }
    ];
  } else if (newOptions.dataZoom) {
    // 如果已存在数据缩放，添加节流属性
    const dataZoom = Array.isArray(newOptions.dataZoom) ? newOptions.dataZoom : [newOptions.dataZoom];
    dataZoom.forEach(item => {
      item.throttle = throttleDelay;
    });
  }

  return newOptions;
}

/**
 * 生成缓存键
 */
function generateCacheKey(series: any, options: DataProcessingOptions): string {
  // 使用数据特征和处理选项作为缓存键
  const dataFeature = Array.isArray(series.data) ? `${series.type}-${series.data.length}` : '';
  const optionsKey = JSON.stringify({
    samplingMethod: options.samplingMethod,
    targetPoints: options.targetPoints
  });
  
  return `${dataFeature}-${optionsKey}`;
}

/**
 * 数据采样处理
 * @param data 原始数据
 * @param method 采样方法
 * @param targetPoints 目标点数
 * @returns 采样后的数据
 */
function sampleData(data: any[], method: string, targetPoints: number): any[] {
  if (data.length <= targetPoints) {
    return data;
  }
  
  // 根据方法选择采样算法
  switch (method) {
    case 'lttb':
      return lttbSampling(data, targetPoints);
    case 'average':
      return averageSampling(data, targetPoints);
    case 'max':
      return maxSampling(data, targetPoints);
    case 'min':
      return minSampling(data, targetPoints);
    case 'sum':
      return sumSampling(data, targetPoints);
    case 'first':
      return firstSampling(data, targetPoints);
    default:
      return lttbSampling(data, targetPoints);
  }
}

/**
 * 最大三角形面积法降采样(LTTB)
 * 保留视觉特征最显著的点
 */
function lttbSampling(data: any[], targetPoints: number): any[] {
  // 如果不是足够多的点，直接返回
  if (data.length <= targetPoints) {
    return data;
  }
  
  // 第一个和最后一个点总是保留
  const sampled = [data[0]];
  
  // 计算每个bucket的点数
  const bucketSize = (data.length - 2) / (targetPoints - 2);
  
  // 处理除第一个和最后一个点外的所有数据
  for (let i = 0; i < targetPoints - 2; i++) {
    // 找出最佳点
    const avgRangeStart = Math.floor((i + 0) * bucketSize) + 1;
    const avgRangeEnd = Math.floor((i + 1) * bucketSize) + 1;
    const avgRangeLength = avgRangeEnd - avgRangeStart;
    
    // 获取下一个区域的平均值作为右锚点
    let avgX = 0, avgY = 0;
    for (let j = avgRangeStart; j < avgRangeEnd; j++) {
      const point = data[j];
      avgX += getX(point, j);
      avgY += getY(point);
    }
    avgX /= avgRangeLength;
    avgY /= avgRangeLength;
    
    // 找出与基准线形成的三角形面积最大的点
    let maxArea = -1;
    let maxAreaPoint = null;
    
    const pointAX = getX(sampled[sampled.length - 1], sampled.length - 1);
    const pointAY = getY(sampled[sampled.length - 1]);
    
    const rangeOffs = Math.floor((i + 0) * bucketSize) + 1;
    const rangeTo = Math.floor((i + 1) * bucketSize) + 1;
    
    for (let j = rangeOffs; j < rangeTo; j++) {
      const pointCX = getX(data[j], j);
      const pointCY = getY(data[j]);
      
      // 计算三角形面积
      const area = Math.abs(
        (pointAX - avgX) * (pointCY - pointAY) -
        (pointAX - pointCX) * (avgY - pointAY)
      ) / 2;
      
      if (area > maxArea) {
        maxArea = area;
        maxAreaPoint = data[j];
      }
    }
    
    sampled.push(maxAreaPoint as never);
  }
  
  // 添加最后一个点
  sampled.push(data[data.length - 1]);
  
  return sampled;
}

/**
 * 平均值采样
 */
function averageSampling(data: any[], targetPoints: number): any[] {
  if (data.length <= targetPoints) {
    return data;
  }
  
  const result: any[] = [];
  const bucketSize = data.length / targetPoints;
  
  for (let i = 0; i < targetPoints; i++) {
    const startIdx = Math.floor(i * bucketSize);
    const endIdx = Math.min(Math.floor((i + 1) * bucketSize), data.length);
    
    let sum = 0;
    let count = 0;
    
    for (let j = startIdx; j < endIdx; j++) {
      sum += getY(data[j]);
      count++;
    }
    
    const avgValue = count > 0 ? sum / count : 0;
    
    // 使用中间点的x值和平均y值
    const midIdx = Math.floor((startIdx + endIdx) / 2);
    const midPoint = data[midIdx];
    
    // 创建一个新点，保留x值，使用平均y值
    const newPoint = typeof midPoint === 'object'
      ? { ...midPoint, value: avgValue }
      : avgValue;
    
    result.push(newPoint);
  }
  
  return result;
}

/**
 * 最大值采样
 */
function maxSampling(data: any[], targetPoints: number): any[] {
  if (data.length <= targetPoints) {
    return data;
  }
  
  const result: any[] = [];
  const bucketSize = data.length / targetPoints;
  
  for (let i = 0; i < targetPoints; i++) {
    const startIdx = Math.floor(i * bucketSize);
    const endIdx = Math.min(Math.floor((i + 1) * bucketSize), data.length);
    
    let maxValue = -Infinity;
    let maxIdx = startIdx;
    
    for (let j = startIdx; j < endIdx; j++) {
      const value = getY(data[j]);
      if (value > maxValue) {
        maxValue = value;
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
function minSampling(data: any[], targetPoints: number): any[] {
  if (data.length <= targetPoints) {
    return data;
  }
  
  const result: any[] = [];
  const bucketSize = data.length / targetPoints;
  
  for (let i = 0; i < targetPoints; i++) {
    const startIdx = Math.floor(i * bucketSize);
    const endIdx = Math.min(Math.floor((i + 1) * bucketSize), data.length);
    
    let minValue = Infinity;
    let minIdx = startIdx;
    
    for (let j = startIdx; j < endIdx; j++) {
      const value = getY(data[j]);
      if (value < minValue) {
        minValue = value;
        minIdx = j;
      }
    }
    
    result.push(data[minIdx]);
  }
  
  return result;
}

/**
 * 求和采样
 */
function sumSampling(data: any[], targetPoints: number): any[] {
  if (data.length <= targetPoints) {
    return data;
  }
  
  const result: any[] = [];
  const bucketSize = data.length / targetPoints;
  
  for (let i = 0; i < targetPoints; i++) {
    const startIdx = Math.floor(i * bucketSize);
    const endIdx = Math.min(Math.floor((i + 1) * bucketSize), data.length);
    
    let sum = 0;
    
    for (let j = startIdx; j < endIdx; j++) {
      sum += getY(data[j]);
    }
    
    // 使用中间点的x值和总和y值
    const midIdx = Math.floor((startIdx + endIdx) / 2);
    const midPoint = data[midIdx];
    
    // 创建一个新点，保留x值，使用总和y值
    const newPoint = typeof midPoint === 'object'
      ? { ...midPoint, value: sum }
      : sum;
    
    result.push(newPoint);
  }
  
  return result;
}

/**
 * 首值采样
 */
function firstSampling(data: any[], targetPoints: number): any[] {
  if (data.length <= targetPoints) {
    return data;
  }
  
  const result: any[] = [];
  const bucketSize = data.length / targetPoints;
  
  for (let i = 0; i < targetPoints; i++) {
    const idx = Math.min(Math.floor(i * bucketSize), data.length - 1);
    result.push(data[idx]);
  }
  
  return result;
}

/**
 * 获取数据点的X值
 */
function getX(point: any, index: number): number {
  if (point === null || point === undefined) {
    return index;
  }
  
  if (Array.isArray(point)) {
    return point[0];
  }
  
  if (typeof point === 'object') {
    if (point.x !== undefined) {
      return point.x;
    }
    if (point[0] !== undefined) {
      return point[0];
    }
  }
  
  return index;
}

/**
 * 获取数据点的Y值
 */
function getY(point: any): number {
  if (point === null || point === undefined) {
    return 0;
  }
  
  if (typeof point === 'number') {
    return point;
  }
  
  if (Array.isArray(point)) {
    return point[1];
  }
  
  if (typeof point === 'object') {
    if (point.y !== undefined) {
      return point.y;
    }
    if (point.value !== undefined) {
      return point.value;
    }
    if (point[1] !== undefined) {
      return point[1];
    }
  }
  
  return 0;
} 