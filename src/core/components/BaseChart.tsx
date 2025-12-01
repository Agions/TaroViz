/**
 * TaroViz 基础图表组件
 * 所有图表组件的基类
 *
 * 该组件提供了图表的基础功能，包括初始化、事件处理、主题设置等
 * 所有具体的图表组件（如折线图、柱状图等）都继承自该组件
 */
import React, { useEffect, useRef } from 'react';

import { getAdapter } from '../../adapters';
import { generateEChartsAnimationConfig } from '../animation';
import { EChartsOption, EChartsType, AnimationConfig } from '../types';
import { registerChart, removeChart, getChart } from '../utils/chartInstances';
import { DebugPanel, DebugPanelOptions, updateDebugInfo } from '../utils/debug';
import { PerformanceAnalyzer } from '../utils/performance';

/**
 * 图表事件参数类型
 *
 * @interface ChartEventParams
 * @description 定义了图表事件回调函数的参数类型
 */
export interface ChartEventParams {
  /**
   * 事件参数的键值对
   */
  [key: string]: any;
}

/**
 * 图表导出选项
 */
export interface ChartExportOptions {
  /**
   * 导出类型
   */
  type?: 'png' | 'jpeg' | 'svg';

  /**
   * 导出文件名
   */
  filename?: string;

  /**
   * 像素比
   */
  pixelRatio?: number;

  /**
   * 背景色
   */
  backgroundColor?: string;
}

/**
 * 图表联动配置
 */
export interface ChartLinkageConfig {
  /**
   * 联动的图表ID列表
   */
  linkedChartIds?: string[];

  /**
   * 是否启用点击联动
   */
  enableClickLinkage?: boolean;

  /**
   * 是否启用缩放联动
   */
  enableZoomLinkage?: boolean;

  /**
   * 是否启用图例联动
   */
  enableLegendLinkage?: boolean;

  /**
   * 是否启用数据筛选联动
   */
  enableFilterLinkage?: boolean;
}

/**
 * 图表组件基础属性
 *
 * @interface ChartProps
 * @description 定义了所有图表组件的基础属性
 */
export interface ChartProps {
  /**
   * 图表ID，用于图表联动和实例管理
   */
  chartId?: string;

  /**
   * 图表配置项
   *
   * @type {EChartsOption}
   * @description 符合 ECharts 规范的图表配置对象
   */
  option?: EChartsOption;

  /**
   * 动画配置
   *
   * @type {AnimationConfig}
   * @description 图表动画配置，支持自定义动画时长、缓动函数等
   */
  animation?: AnimationConfig;

  /**
   * 调试配置
   *
   * @type {boolean | DebugPanelOptions}
   * @description 是否启用调试面板或调试面板配置
   */
  debug?: boolean | DebugPanelOptions;

  /**
   * 图表宽度
   *
   * @type {number | string}
   * @default '100%'
   * @description 图表的宽度，可以是像素值或百分比
   */
  width?: number | string;

  /**
   * 图表高度
   *
   * @type {number | string}
   * @default '300px'
   * @description 图表的高度，可以是像素值或百分比
   */
  height?: number | string;

  /**
   * 图表主题
   *
   * @type {string | object}
   * @description 图表的主题，可以是内置主题名称或自定义主题对象
   */
  theme?: string | object;

  /**
   * 是否自动调整大小
   *
   * @type {boolean}
   * @default true
   * @description 当窗口大小变化时，是否自动调整图表大小
   */
  autoResize?: boolean;

  /**
   * 布局方向
   *
   * @type {'ltr' | 'rtl'}
   * @default 'ltr'
   * @description 图表的布局方向，支持从左到右(ltr)和从右到左(rtl)
   */
  direction?: 'ltr' | 'rtl';

  /**
   * 初始化回调
   *
   * @type {(instance: EChartsType) => void}
   * @description 图表初始化完成后的回调函数，返回 ECharts 实例
   */
  onInit?: (instance: EChartsType) => void;

  /**
   * 图表点击事件
   *
   * @type {(params: ChartEventParams) => void}
   * @description 图表点击事件的回调函数
   */
  onClick?: (params: ChartEventParams) => void;

  /**
   * 图表数据变化事件
   *
   * @type {(params: ChartEventParams) => void}
   * @description 图表数据缩放事件的回调函数
   */
  onDataZoom?: (params: ChartEventParams) => void;

  /**
   * 样式属性
   *
   * @type {React.CSSProperties}
   * @description 图表容器的 CSS 样式
   */
  style?: React.CSSProperties;

  /**
   * CSS类名
   *
   * @type {string}
   * @description 图表容器的 CSS 类名
   */
  className?: string;

  /**
   * 子元素
   *
   * @type {React.ReactNode}
   * @description 图表容器的子元素
   */
  children?: React.ReactNode;

  /**
   * 是否启用虚拟滚动
   *
   * @type {boolean}
   * @default false
   * @description 当数据量较大时，启用虚拟滚动可以提高性能
   */
  virtualScroll?: boolean;

  /**
   * 虚拟滚动的每页数据量
   *
   * @type {number}
   * @default 100
   * @description 每次渲染的数据量
   */
  virtualScrollPageSize?: number;

  /**
   * 虚拟滚动的预加载数量
   *
   * @type {number}
   * @default 50
   * @description 预加载的数据量，用于平滑滚动
   */
  virtualScrollPreloadSize?: number;

  /**
   * 是否启用性能监控
   *
   * @type {boolean}
   * @default false
   * @description 启用后会收集图表渲染性能数据
   */
  enablePerformanceMonitoring?: boolean;

  /**
   * 性能监控回调函数
   *
   * @type {(performanceData: { renderTime: number; initTime: number; updateTime: number; dataSize: number }) => void}
   * @description 当图表渲染、初始化或更新时调用，返回性能数据
   */
  onPerformance?: (performanceData: {
    renderTime: number;
    initTime: number;
    updateTime: number;
    dataSize: number;
  }) => void;

  /**
   * 是否启用图表缩放功能
   *
   * @type {boolean}
   * @default false
   * @description 启用后允许用户通过鼠标滚轮或触摸手势缩放图表
   */
  enableZoom?: boolean;

  /**
   * 缩放事件回调函数
   *
   * @type {(zoomData: { start: number; end: number; dataZoomIndex: number }) => void}
   * @description 当图表缩放时调用，返回缩放数据
   */
  onZoom?: (zoomData: { start: number; end: number; dataZoomIndex: number }) => void;

  /**
   * 是否启用数据筛选功能
   *
   * @type {boolean}
   * @default false
   * @description 启用后允许用户筛选图表数据
   */
  enableDataFiltering?: boolean;

  /**
   * 当前筛选条件
   *
   * @type {Record<string, any>}
   * @description 用于筛选图表数据的条件
   */
  filters?: Record<string, any>;

  /**
   * 数据筛选回调函数
   *
   * @type {(filteredData: any[], filters: Record<string, any>) => void}
   * @description 当数据筛选时调用，返回筛选后的数据和筛选条件
   */
  onDataFiltered?: (filteredData: any[], filters: Record<string, any>) => void;

  /**
   * 是否启用增强图例交互
   *
   * @type {boolean}
   * @default false
   * @description 启用后允许用户通过图例进行更丰富的交互操作
   */
  enableLegendInteraction?: boolean;

  /**
   * 图例交互模式
   *
   * @type {'single' | 'multiple' | 'all'}
   * @default 'single'
   * @description 图例交互模式：single（单选）、multiple（多选）、all（全选/反选）
   */
  legendInteractionMode?: 'single' | 'multiple' | 'all';

  /**
   * 图例选择回调函数
   *
   * @type {(params: { name: string; selected: Record<string, boolean> }) => void}
   * @description 当图例项被选择时调用
   */
  onLegendSelect?: (params: { name: string; selected: Record<string, boolean> }) => void;

  /**
   * 图例取消选择回调函数
   *
   * @type {(params: { name: string; selected: Record<string, boolean> }) => void}
   * @description 当图例项被取消选择时调用
   */
  onLegendUnselect?: (params: { name: string; selected: Record<string, boolean> }) => void;

  /**
   * 图例全选回调函数
   *
   * @type {(params: { selected: Record<string, boolean> }) => void}
   * @description 当图例全选时调用
   */
  onLegendSelectAll?: (params: { selected: Record<string, boolean> }) => void;

  /**
   * 图例反选回调函数
   *
   * @type {(params: { selected: Record<string, boolean> }) => void}
   * @description 当图例反选时调用
   */
  onLegendInverseSelect?: (params: { selected: Record<string, boolean> }) => void;

  /**
   * 是否启用自定义提示框
   *
   * @type {boolean}
   * @default false
   * @description 启用后允许自定义提示框内容和样式
   */
  enableCustomTooltip?: boolean;

  /**
   * 自定义提示框内容
   *
   * @type {(params: any) => React.ReactNode}
   * @description 自定义提示框内容的渲染函数
   */
  customTooltipContent?: (params: any) => React.ReactNode;

  /**
   * 自定义提示框样式
   *
   * @type {React.CSSProperties}
   * @description 自定义提示框的样式
   */
  customTooltipStyle?: React.CSSProperties;

  /**
   * 提示框显示事件回调函数
   *
   * @type {(params: any) => void}
   * @description 当提示框显示时调用
   */
  onTooltipShow?: (params: any) => void;

  /**
   * 提示框隐藏事件回调函数
   *
   * @type {(params: any) => void}
   * @description 当提示框隐藏时调用
   */
  onTooltipHide?: (params: any) => void;

  /**
   * 图表导出回调函数
   *
   * @type {(dataURL: string, options: ChartExportOptions) => void}
   * @description 当图表导出完成时调用，返回导出的数据URL和选项
   */
  onExport?: (dataURL: string, options: ChartExportOptions) => void;

  /**
   * 图表联动配置
   */
  linkageConfig?: ChartLinkageConfig;

  /**
   * 数据更新回调函数
   *
   * @type {(oldOption: EChartsOption | undefined, newOption: EChartsOption | undefined) => void}
   * @description 当图表数据更新时调用，返回旧的配置和新的配置
   */
  onDataUpdate?: (
    oldOption: EChartsOption | undefined,
    newOption: EChartsOption | undefined
  ) => void;

  /**
   * 数据更新监听选项
   */
  dataUpdateOptions?: {
    /**
     * 是否启用数据更新监听
     */
    enabled?: boolean;

    /**
     * 数据更新监听的深度
     */
    deepCompare?: boolean;

    /**
     * 防抖延迟（毫秒）
     */
    debounceDelay?: number;
  };
}

/**
 * 基础图表组件
 *
 * @param {ChartProps} props - 组件属性
 * @returns {JSX.Element} - 返回的 JSX 元素
 *
 * @description 基础图表组件，所有具体图表组件的基类
 * 负责处理图表的初始化、事件绑定、主题设置等核心逻辑
 */
const BaseChart: React.FC<ChartProps> = props => {
  const {
    chartId,
    option,
    width = '100%',
    height = '300px',
    theme,
    autoResize = true,
    direction = 'ltr',
    onInit,
    onClick,
    onDataZoom,
    style,
    className,
    children,
    virtualScroll = false,
    virtualScrollPageSize = 100,
    virtualScrollPreloadSize = 50,
    enablePerformanceMonitoring = false,
    onPerformance,
    enableZoom = false,
    onZoom,
    enableDataFiltering = false,
    filters = {},
    onDataFiltered,
    enableLegendInteraction = false,
    legendInteractionMode = 'single',
    onLegendSelect,
    onLegendUnselect,
    onLegendSelectAll: _onLegendSelectAll,
    onLegendInverseSelect: _onLegendInverseSelect,
    enableCustomTooltip = false,
    customTooltipContent,
    customTooltipStyle,
    onTooltipShow,
    onTooltipHide,
    onExport,
    linkageConfig = {},
    onDataUpdate,
    dataUpdateOptions = {},
  } = props;

  /**
   * 图表容器的引用
   */
  const chartRef = useRef<HTMLDivElement>(null);

  /**
   * 图表适配器的引用
   */
  const adapterRef = useRef<any>(null);

  /**
   * 虚拟滚动状态
   */
  const virtualScrollRef = useRef({
    currentPage: 0,
    totalPages: 1,
    totalDataCount: 0,
    startIndex: 0,
    endIndex: 0,
    isScrolling: false,
  });

  /**
   * 性能分析器实例引用
   */
  const performanceAnalyzerRef = useRef<PerformanceAnalyzer | null>(null);

  /**
   * 性能监控状态
   */
  const performanceRef = useRef({
    initStartTime: 0,
    initEndTime: 0,
    renderStartTime: 0,
    renderEndTime: 0,
    updateStartTime: 0,
    updateEndTime: 0,
    dataSize: 0,
  });

  /**
   * 旧的图表配置引用，用于数据更新监听
   */
  const oldOptionRef = useRef<EChartsOption | undefined>(option);

  /**
   * 调试配置引用
   */
  const debugConfigRef = useRef<DebugPanelOptions | null>(null);

  /**
   * 处理调试配置
   */
  const processDebugConfig = (): DebugPanelOptions | null => {
    if (!props.debug) {
      return null;
    }

    if (typeof props.debug === 'boolean') {
      return {
        enabled: props.debug,
        autoExpand: false,
      };
    }

    return {
      enabled: true,
      ...props.debug,
    };
  };

  /**
   * 导出图表为DataURL
   * @param options 导出选项
   * @returns 导出的数据URL
   */
  const exportChartToDataURL = (options: ChartExportOptions = {}): string | undefined => {
    if (!adapterRef.current) {
      console.error('Chart adapter not initialized');
      return undefined;
    }

    const { type = 'png', pixelRatio = 2, backgroundColor = 'transparent' } = options;

    const dataURL = adapterRef.current.convertToDataURL({
      type,
      pixelRatio,
      backgroundColor,
    });

    // 触发导出回调
    if (onExport && dataURL) {
      onExport(dataURL, options);
    }

    return dataURL;
  };

  /**
   * 导出图表并下载
   * @param options 导出选项
   */
  const exportChart = (options: ChartExportOptions = {}): void => {
    const dataURL = exportChartToDataURL(options);
    if (!dataURL) {
      console.error('Failed to export chart');
      return;
    }

    const { type = 'png', filename = `chart-${Date.now()}` } = options;
    const fullFilename = `${filename}.${type}`;

    // 创建下载链接
    const link = document.createElement('a');
    link.download = fullFilename;
    link.href = dataURL;
    link.click();
  };

  /**
   * 组件实例引用，用于暴露公共方法
   */
  const chartInstanceRef = useRef({
    exportChartToDataURL,
    exportChart,
  });

  // 暴露组件实例方法
  React.useImperativeHandle(props as any, () => chartInstanceRef.current);

  /**
   * 记录性能数据
   * @param type 性能数据类型
   * @param data 性能数据
   */
  const recordPerformance = (type: 'init' | 'render' | 'update', _data?: any) => {
    const now = Date.now();

    switch (type) {
      case 'init':
        if (!performanceRef.current.initStartTime) {
          performanceRef.current.initStartTime = now;
        } else {
          performanceRef.current.initEndTime = now;
          const initTime =
            performanceRef.current.initEndTime - performanceRef.current.initStartTime;

          // 计算数据大小
          const dataSize = JSON.stringify(option).length;

          // 使用性能分析器记录数据
          if (performanceAnalyzerRef.current) {
            performanceAnalyzerRef.current.recordInitTime(initTime);
            performanceAnalyzerRef.current.recordDataSize(option);
          }

          // 触发性能回调
          if (onPerformance) {
            onPerformance({
              renderTime: 0,
              initTime,
              updateTime: 0,
              dataSize,
            });
          }
        }
        break;

      case 'render':
        if (!performanceRef.current.renderStartTime) {
          performanceRef.current.renderStartTime = now;
        } else {
          performanceRef.current.renderEndTime = now;
          const renderTime =
            performanceRef.current.renderEndTime - performanceRef.current.renderStartTime;

          // 计算数据大小
          const dataSize = JSON.stringify(option).length;

          // 使用性能分析器记录数据
          if (performanceAnalyzerRef.current) {
            performanceAnalyzerRef.current.recordRenderTime(renderTime);
          }

          // 触发性能回调
          if (onPerformance) {
            onPerformance({
              renderTime,
              initTime: performanceRef.current.initEndTime - performanceRef.current.initStartTime,
              updateTime: 0,
              dataSize,
            });
          }
        }
        break;

      case 'update':
        if (!performanceRef.current.updateStartTime) {
          performanceRef.current.updateStartTime = now;
        } else {
          performanceRef.current.updateEndTime = now;
          const updateTime =
            performanceRef.current.updateEndTime - performanceRef.current.updateStartTime;

          // 计算数据大小
          const dataSize = JSON.stringify(option).length;

          // 使用性能分析器记录数据
          if (performanceAnalyzerRef.current) {
            performanceAnalyzerRef.current.recordUpdateTime(updateTime);
            performanceAnalyzerRef.current.recordDataSize(option);
          }

          // 触发性能回调
          if (onPerformance) {
            onPerformance({
              renderTime: 0,
              initTime: 0,
              updateTime,
              dataSize,
            });
          }
        }
        break;
    }
  };

  /**
   * 筛选数据
   * @param data 原始数据
   * @param filters 筛选条件
   * @returns 筛选后的数据
   */
  const filterData = (data: any[], filters: Record<string, any>): any[] => {
    if (!enableDataFiltering || !filters || Object.keys(filters).length === 0) {
      return data;
    }

    return data.filter(item => {
      // 遍历所有筛选条件
      for (const [key, value] of Object.entries(filters)) {
        // 检查数据项是否满足筛选条件
        if (item[key] !== value && !item[key]?.includes?.(value)) {
          return false;
        }
      }
      return true;
    });
  };

  /**
   * 计算数据长度，用于动画性能优化
   */
  const calculateDataLength = (option: EChartsOption): number => {
    let count = 0;

    // 计算系列数据长度
    if (option.series) {
      const series = Array.isArray(option.series) ? option.series : [option.series];
      series.forEach((seriesItem: any) => {
        if (seriesItem.data) {
          if (Array.isArray(seriesItem.data)) {
            count += seriesItem.data.length;
          } else if (typeof seriesItem.data === 'object') {
            // 处理对象类型数据
            count += Object.keys(seriesItem.data).length;
          }
        }
      });
    }

    return count;
  };

  /**
   * 处理大数据集的虚拟滚动和数据筛选
   * @param originalOption 原始图表配置
   * @returns 处理后的图表配置，只包含当前页的数据和筛选后的数据
   */
  const processVirtualScroll = (originalOption: EChartsOption): EChartsOption => {
    if (!originalOption) {
      return originalOption;
    }

    // 深拷贝原始配置，避免修改原始数据
    const processedOption = JSON.parse(JSON.stringify(originalOption)) as EChartsOption;

    // 处理series数据
    if (processedOption.series && Array.isArray(processedOption.series)) {
      // 使用类型断言解决类型不匹配问题
      (processedOption.series as any) = processedOption.series.map((series: any) => {
        if (series.data && Array.isArray(series.data)) {
          const data = series.data;

          // 应用数据筛选
          const filteredData = filterData(data, filters);

          // 触发数据筛选回调
          if (onDataFiltered) {
            onDataFiltered(filteredData, filters);
          }

          // 应用虚拟滚动
          if (virtualScroll) {
            virtualScrollRef.current.totalDataCount = filteredData.length;
            virtualScrollRef.current.totalPages = Math.ceil(
              filteredData.length / virtualScrollPageSize
            );

            // 计算当前页的起始和结束索引
            const startIndex = virtualScrollRef.current.currentPage * virtualScrollPageSize;
            const endIndex = Math.min(
              startIndex + virtualScrollPageSize + virtualScrollPreloadSize,
              filteredData.length
            );

            virtualScrollRef.current.startIndex = startIndex;
            virtualScrollRef.current.endIndex = endIndex;

            // 返回只包含当前页数据的series
            return {
              ...series,
              data: filteredData.slice(startIndex, endIndex),
            };
          }

          // 只应用数据筛选，不应用虚拟滚动
          return {
            ...series,
            data: filteredData,
          };
        }
        return series;
      });
    }

    // 生成动画配置
    const dataLength = calculateDataLength(processedOption);
    const animationOption = generateEChartsAnimationConfig(props.animation, dataLength);

    // 合并动画配置到图表选项
    return {
      ...processedOption,
      ...animationOption,
    };
  };

  /**
   * 初始化图表的 useEffect
   *
   * @description 当图表容器 ref 变化时，初始化图表适配器和图表实例
   * 负责图表的创建、事件绑定和清理工作
   */
  useEffect(() => {
    if (chartRef.current) {
      // 处理调试配置
      const debugConfig = processDebugConfig();
      debugConfigRef.current = debugConfig;

      // 初始化性能分析器
      if (enablePerformanceMonitoring) {
        performanceAnalyzerRef.current = PerformanceAnalyzer.getInstance({
          enabled: true,
          metrics: ['initTime', 'renderTime', 'updateTime', 'dataSize', 'frameRate'],
          sampleInterval: 1000,
          maxSamples: 100,
          realTime: true,
          autoStart: true,
        });
      }

      // 开始记录初始化时间
      recordPerformance('init');

      // 处理虚拟滚动
      const processedOption = processVirtualScroll(option as EChartsOption);

      // 获取适配器实例
      const chartAdapter = getAdapter({
        width,
        height,
        theme,
        option: processedOption,
        onInit,
        containerRef: chartRef,
        direction,
      });

      // 设置组件实例（针对小程序环境）
      if (typeof chartAdapter.setComponent === 'function') {
        chartAdapter.setComponent({
          createChart: (_config: Record<string, any>) => {
            // 这里应该根据具体平台实现创建图表的逻辑
            return {};
          },
        });
      }

      // 开始记录渲染时间
      recordPerformance('render');

      // 初始化图表
      const instance = chartAdapter.init();

      // 结束记录渲染时间
      recordPerformance('render');

      // 注册图表实例
      if (chartId && instance) {
        registerChart(chartId, instance);
      }

      // 更新调试信息
      if (debugConfig?.enabled) {
        // 更新实例信息
        updateDebugInfo({
          instance: {
            id: chartId,
            type: 'ECharts',
            renderer: 'canvas', // 简化处理，使用默认值
            width: typeof width === 'number' ? width : undefined,
            height: typeof height === 'number' ? height : undefined,
            platform: 'web', // 简化处理，使用默认值
          },
          config: processedOption,
          data: {
            series: Array.isArray(processedOption.series) ? processedOption.series : [],
            totalDataCount: calculateDataLength(processedOption),
            currentDataCount: calculateDataLength(processedOption),
          },
          performance: {
            initTime: performanceRef.current.initEndTime - performanceRef.current.initStartTime,
            renderTime:
              performanceRef.current.renderEndTime - performanceRef.current.renderStartTime,
            dataSize: JSON.stringify(processedOption).length,
          },
        });
      }

      // 绑定事件
      if (instance && onClick) {
        instance.on('click', (params: any) => {
          onClick(params as any);

          // 点击联动
          if (linkageConfig.enableClickLinkage && chartId && linkageConfig.linkedChartIds) {
            linkageConfig.linkedChartIds.forEach(linkedChartId => {
              const linkedChart = getChart(linkedChartId);
              if (linkedChart) {
                // 这里可以根据需要实现点击联动逻辑
                // 例如：高亮联动图表中对应的系列或数据点
                linkedChart.dispatchAction({
                  type: 'highlight',
                  name: params.name,
                });
              }
            });
          }
        });
      }

      // 绑定datazoom事件
      if (instance) {
        instance.on('datazoom', (params: any) => {
          // 触发原始的datazoom事件
          if (onDataZoom) {
            onDataZoom(params as any);
          }

          // 触发缩放事件
          if (onZoom) {
            onZoom({
              start: params.start || 0,
              end: params.end || 100,
              dataZoomIndex: params.dataZoomIndex || 0,
            });
          }

          // 缩放联动
          if (linkageConfig.enableZoomLinkage && chartId && linkageConfig.linkedChartIds) {
            linkageConfig.linkedChartIds.forEach(linkedChartId => {
              const linkedChart = getChart(linkedChartId);
              if (linkedChart) {
                linkedChart.dispatchAction({
                  type: 'dataZoom',
                  start: params.start,
                  end: params.end,
                  dataZoomIndex: params.dataZoomIndex,
                });
              }
            });
          }

          // 处理虚拟滚动
          if (virtualScroll) {
            if (virtualScrollRef.current.isScrolling) {
              return;
            }

            virtualScrollRef.current.isScrolling = true;

            // 根据滚动位置计算当前页码
            const scrollPercent = params.start || 0;
            const newPage = Math.floor((scrollPercent / 100) * virtualScrollRef.current.totalPages);

            if (newPage !== virtualScrollRef.current.currentPage) {
              virtualScrollRef.current.currentPage = newPage;

              // 更新图表数据
              const updatedOption = processVirtualScroll(option as EChartsOption);
              chartAdapter.setOption(updatedOption);
            }

            // 延迟重置滚动状态，避免频繁触发
            setTimeout(() => {
              virtualScrollRef.current.isScrolling = false;
            }, 100);
          }
        });
      }

      // 启用图表缩放功能
      if (instance && enableZoom) {
        // 这里可以根据需要添加更多缩放相关的配置
        // 例如：instance.setOption({ dataZoom: [{ type: 'inside', start: 0, end: 100 }] });
      }

      // 增强图例交互功能
      if (instance && enableLegendInteraction) {
        // 图例选择事件
        instance.on('legendselectchanged', (params: any) => {
          const { name, selected } = params;

          // 图例联动
          if (linkageConfig.enableLegendLinkage && chartId && linkageConfig.linkedChartIds) {
            linkageConfig.linkedChartIds.forEach(linkedChartId => {
              const linkedChart = getChart(linkedChartId);
              if (linkedChart) {
                linkedChart.setOption({ legend: { selected } });
              }
            });
          }

          // 根据交互模式处理图例选择
          if (legendInteractionMode === 'single') {
            // 单选模式：只显示当前选中项
            const newSelected: Record<string, boolean> = {};
            Object.keys(selected).forEach(key => {
              newSelected[key] = key === name;
            });
            instance.setOption({ legend: { selected: newSelected } });

            // 触发回调
            if (onLegendSelect) {
              onLegendSelect({ name, selected: newSelected });
            }
          } else {
            // 多选或全选模式：保持原有选择
            if (selected[name]) {
              // 选择图例项
              if (onLegendSelect) {
                onLegendSelect({ name, selected });
              }
            } else {
              // 取消选择图例项
              if (onLegendUnselect) {
                onLegendUnselect({ name, selected });
              }
            }
          }
        });

        // 图例全选功能
        if (legendInteractionMode === 'all') {
          // 这里可以添加全选/反选的逻辑
          // 例如：监听特定事件或添加自定义按钮
        }
      }

      // 自定义提示框功能
      if (instance && enableCustomTooltip) {
        // 提示框显示事件
        instance.on('tooltipshow', (params: any) => {
          // 触发提示框显示回调
          if (onTooltipShow) {
            onTooltipShow(params);
          }
        });

        // 提示框隐藏事件
        instance.on('tooltiphide', (params: any) => {
          // 触发提示框隐藏回调
          if (onTooltipHide) {
            onTooltipHide(params);
          }
        });

        // 提示框格式化功能
        if (customTooltipContent) {
          // 这里可以添加自定义提示框的格式化逻辑
          // 例如：使用ECharts的tooltip.formatter选项
          instance.setOption({
            tooltip: {
              formatter: (params: any) => {
                // 这里可以返回自定义的HTML内容
                // 由于ECharts的tooltip.formatter只支持返回字符串，我们需要将React组件转换为HTML字符串
                // 注意：这种方式有局限性，更复杂的自定义提示框可能需要使用其他方案
                return (
                  '<div style="background: white; padding: 10px; border: 1px solid #ccc;">' +
                  JSON.stringify(params) +
                  '</div>'
                );
              },
              ...(customTooltipStyle && {
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                textStyle: {},
              }),
            },
          });
        }
      }

      adapterRef.current = chartAdapter;

      // 结束记录初始化时间
      recordPerformance('init');

      // 清理函数
      return () => {
        // 移除图表实例
        if (chartId) {
          removeChart(chartId);
        }

        // 停止性能监控
        if (performanceAnalyzerRef.current) {
          performanceAnalyzerRef.current.stop();
          performanceAnalyzerRef.current = null;
        }

        if (chartAdapter) {
          chartAdapter.dispose();
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, width, height, theme, option, onInit, onClick, onDataZoom, chartId, linkageConfig]);

  /**
   * 更新图表尺寸的 useEffect
   *
   * @description 当图表宽度或高度变化时，调整图表大小
   */
  useEffect(() => {
    if (adapterRef.current) {
      adapterRef.current.resize();
    }
  }, [width, height]);

  /**
   * 比较两个配置是否相同
   * @param oldOption 旧的配置
   * @param newOption 新的配置
   * @returns 是否相同
   */
  const isOptionEqual = (
    oldOption: EChartsOption | undefined,
    newOption: EChartsOption | undefined
  ): boolean => {
    if (oldOption === newOption) {
      return true;
    }

    if (!oldOption || !newOption) {
      return false;
    }

    if (dataUpdateOptions.deepCompare) {
      // 深度比较
      return JSON.stringify(oldOption) === JSON.stringify(newOption);
    } else {
      // 浅比较，只比较引用
      return oldOption === newOption;
    }
  };

  /**
   * 更新图表配置的 useEffect
   *
   * @description 当图表配置项变化时，更新图表
   */
  useEffect(() => {
    if (adapterRef.current && option) {
      // 开始记录更新时间
      recordPerformance('update');

      // 处理虚拟滚动
      const processedOption = processVirtualScroll(option);
      adapterRef.current.setOption(processedOption);

      // 结束记录更新时间
      recordPerformance('update');
    }

    // 数据更新监听
    if (onDataUpdate && dataUpdateOptions.enabled !== false) {
      const oldOption = oldOptionRef.current;
      if (!isOptionEqual(oldOption, option)) {
        onDataUpdate(oldOption, option);
        // 更新旧的配置引用
        oldOptionRef.current = option;
      }
    }
  }, [option, onDataUpdate, dataUpdateOptions]);

  /**
   * 更新图表主题的 useEffect
   *
   * @description 当图表主题变化时，更新图表主题
   */
  useEffect(() => {
    if (adapterRef.current && theme) {
      adapterRef.current.setTheme(theme);
    }
  }, [theme]);

  /**
   * 处理窗口大小变化的 useEffect
   *
   * @description 当窗口大小变化时，如果开启了自动调整大小，则调整图表大小
   */
  useEffect(() => {
    if (!autoResize || !adapterRef.current) {
      return;
    }

    const handleResize = () => {
      adapterRef.current.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [autoResize]);

  /**
   * 合并后的样式对象
   *
   * @description 合并用户传入的样式和组件默认样式
   */
  const mergedStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    direction,
    ...style,
  };

  /**
   * 组件渲染函数
   *
   * @returns {JSX.Element} - 返回渲染后的 JSX 元素
   * @description 渲染图表容器，并将 chartRef 绑定到容器上
   */
  const debugConfig = processDebugConfig();

  // 渲染图表容器
  const chartContainer = React.createElement(
    'div',
    {
      ref: chartRef,
      style: mergedStyle,
      className,
    },
    children
  );

  // 如果启用了调试面板，渲染调试面板
  if (debugConfig?.enabled) {
    return React.createElement(
      React.Fragment,
      null,
      chartContainer,
      React.createElement(DebugPanel, {
        options: debugConfig,
        debugInfo: {
          instance: {
            id: chartId,
            type: 'ECharts',
            renderer: 'canvas', // 简化处理，使用默认值
            width: typeof width === 'number' ? width : undefined,
            height: typeof height === 'number' ? height : undefined,
            platform: 'web', // 简化处理，使用默认值
          },
          config: option,
          data: {
            series: Array.isArray(option?.series) ? option.series : [],
            totalDataCount: calculateDataLength(option as EChartsOption),
            currentDataCount: calculateDataLength(option as EChartsOption),
          },
          performance: {
            initTime: performanceRef.current.initEndTime - performanceRef.current.initStartTime,
            renderTime:
              performanceRef.current.renderEndTime - performanceRef.current.renderStartTime,
            updateTime:
              performanceRef.current.updateEndTime - performanceRef.current.updateStartTime,
            dataSize: JSON.stringify(option).length,
          },
        },
      })
    );
  }

  // 否则只渲染图表容器
  return chartContainer;
};

/**
 * 导出基础图表组件
 */
export default BaseChart;
