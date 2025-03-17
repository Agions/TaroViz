/**
 * Taro ECharts H5适配器
 * 基于echarts-for-react实现H5环境下的图表渲染
 */
import * as echarts from 'echarts/core';
import ReactEChartsCore from 'echarts-for-react/lib/core';

// 导入ECharts组件
import {
  BarChart, LineChart, PieChart, ScatterChart,
  RadarChart, MapChart, TreeChart, TreemapChart,
  GraphChart, GaugeChart, FunnelChart, ParallelChart,
  SankeyChart, BoxplotChart, CandlestickChart,
  EffectScatterChart, LinesChart, HeatmapChart,
  PictorialBarChart, ThemeRiverChart, SunburstChart,
  CustomChart
} from 'echarts/charts';

// 导入组件
import {
  GridComponent, PolarComponent, GeoComponent,
  SingleAxisComponent, ParallelComponent, CalendarComponent,
  GraphicComponent, ToolboxComponent, TooltipComponent,
  AxisPointerComponent, BrushComponent, TitleComponent,
  TimelineComponent, MarkPointComponent, MarkLineComponent,
  MarkAreaComponent, LegendComponent, DataZoomComponent,
  AriaComponent, DatasetComponent, TransformComponent,
  VisualMapComponent
} from 'echarts/components';

// 导入渲染器
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';

// 导入类型
import {
  Adapter,
  H5AdapterOptions
} from '../types/platform';
import { EChartsOption } from '../types/common';

// 注册必要的组件
echarts.use([
  // 图表
  BarChart, LineChart, PieChart, ScatterChart,
  RadarChart, MapChart, TreeChart, TreemapChart,
  GraphChart, GaugeChart, FunnelChart, ParallelChart,
  SankeyChart, BoxplotChart, CandlestickChart,
  EffectScatterChart, LinesChart, HeatmapChart,
  PictorialBarChart, ThemeRiverChart, SunburstChart,
  CustomChart,

  // 组件
  GridComponent, PolarComponent, GeoComponent,
  SingleAxisComponent, ParallelComponent, CalendarComponent,
  GraphicComponent, ToolboxComponent, TooltipComponent,
  AxisPointerComponent, BrushComponent, TitleComponent,
  TimelineComponent, MarkPointComponent, MarkLineComponent,
  MarkAreaComponent, LegendComponent, DataZoomComponent,
  AriaComponent, DatasetComponent, TransformComponent,
  VisualMapComponent,

  // 渲染器
  CanvasRenderer, SVGRenderer
]);

/**
 * H5环境下的ECharts适配器
 */
class H5Adapter implements Adapter {
  private instance: echarts.ECharts | null = null;
  private options: H5AdapterOptions;
  private containerRef: React.RefObject<HTMLDivElement>;
  private resizeObserver: ResizeObserver | null = null;

  constructor(options: H5AdapterOptions) {
    this.options = options;
    this.containerRef = options.containerRef;
  }

  /**
   * 初始化图表
   */
  init(): echarts.ECharts | null {
    if (this.instance) {
      return this.instance;
    }

    // 等待ReactEChartsCore组件初始化完成后设置实例
    return null;
  }

  /**
   * 处理图表实例初始化
   */
  handleChartInit = (instance: any): void => {
    this.instance = instance;

    // 设置设备像素比
    if (this.options.devicePixelRatio && this.instance) {
      this.instance.setOption({
        devicePixelRatio: this.options.devicePixelRatio
      });
    }

    // 调用初始化回调
    if (this.options.onInit) {
      this.options.onInit(this.instance);
    }

    // 设置监听器
    this.setupResizeListener();
  };

  /**
   * 设置尺寸变化监听器
   */
  private setupResizeListener(): void {
    if (this.containerRef.current) {
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(this.containerRef.current);
    }
  }

  /**
   * 处理容器大小变化
   */
  private handleResize = (entries: ResizeObserverEntry[]): void => {
    if (entries && entries.length > 0) {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      this.instance?.resize({ width, height });
    }
  };

  /**
   * 移除尺寸变化监听器
   */
  private removeResizeListener(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  /**
   * 获取ECharts实例
   */
  getInstance(): echarts.ECharts | null {
    return this.instance;
  }

  /**
   * 设置图表配置项
   */
  setOption(option: EChartsOption, opts?: any): void {
    if (this.instance) {
      this.instance.setOption(option, opts);
    }
  }

  /**
   * 获取图表宽度
   */
  getWidth(): number {
    return this.instance?.getWidth() || 0;
  }

  /**
   * 获取图表高度
   */
  getHeight(): number {
    return this.instance?.getHeight() || 0;
  }

  /**
   * 获取DOM元素
   */
  getDom(): HTMLElement | null {
    return this.instance?.getDom() || null;
  }

  /**
   * 调整图表大小
   */
  resize(opts?: any): void {
    if (this.instance) {
      this.instance.resize(opts);
    }
  }

  /**
   * 触发图表行为
   */
  dispatchAction(payload: any): void {
    if (this.instance) {
      this.instance.dispatchAction(payload);
    }
  }

  /**
   * 转换为DataURL
   */
  convertToDataURL(opts?: any): string | undefined {
    if (!this.instance) {
      return undefined;
    }
    return this.instance.getDataURL(opts);
  }

  /**
   * 清空图表
   */
  clear(): void {
    if (this.instance) {
      this.instance.clear();
    }
  }

  /**
   * 获取DataURL
   */
  getDataURL(opts?: any): string | undefined {
    if (!this.instance) {
      return undefined;
    }
    return this.instance.getDataURL(opts);
  }

  /**
   * 绑定事件
   */
  on(eventName: string, handler: any, context?: object): void {
    if (this.instance) {
      this.instance.on(eventName, handler, context);
    }
  }

  /**
   * 解绑事件
   */
  off(eventName: string, handler?: Function): void {
    if (this.instance) {
      this.instance.off(eventName, handler);
    }
  }

  /**
   * 显示加载动画
   */
  showLoading(opts?: object): void {
    if (this.instance) {
      this.instance.showLoading(opts);
    }
  }

  /**
   * 隐藏加载动画
   */
  hideLoading(): void {
    if (this.instance) {
      this.instance.hideLoading();
    }
  }

  /**
   * 销毁实例
   */
  dispose(): void {
    this.removeResizeListener();
    if (this.instance) {
      this.instance.dispose();
      this.instance = null;
    }
  }

  /**
   * 渲染图表
   */
  render(): JSX.Element {
    const { width, height, theme, renderer = 'canvas' } = this.options;

    // 获取事件处理器
    const events = this.options.h5Options?.onEvents || {};

    // 创建ECharts选项
    const option: EChartsOption = {};

    // 返回ReactEChartsCore组件
    return (
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={theme}
        onEvents={events}
        opts={{
          renderer,
          width: typeof width === 'number' ? width : undefined,
          height: typeof height === 'number' ? height : undefined
        }}
        style={{
          width: typeof width === 'string' ? width : undefined,
          height: typeof height === 'string' ? height : undefined
        }}
        onChartReady={this.handleChartInit as any}
      />
    );
  }
}

export default H5Adapter;
