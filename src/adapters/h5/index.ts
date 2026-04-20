/**
 * TaroViz H5 适配器
 * 基于 HTML Canvas 实现图表渲染
 */
import type { EChartsType, EChartsOption } from 'echarts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import * as React from 'react';

import { Adapter, H5AdapterOptions } from '../types';
import type { EventHandler } from '../../core/types/platform';

// 扩展 H5AdapterOptions 类型
interface ExtendedH5AdapterOptions extends H5AdapterOptions {
  canvasId?: string;
  width?: number | string;
  height?: number | string;
  theme?: string | object;
  option?: EChartsOption;
  onInit?: (instance: EChartsType) => void;
  containerRef?: HTMLElement | { current: HTMLElement | null };
  direction?: 'ltr' | 'rtl';
}

// 注册基础组件和渲染器
echarts.use([
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  CanvasRenderer,
  SVGRenderer,
]);

/**
 * H5环境适配器
 * 提供基础的Web浏览器环境下的图表渲染支持
 */
class H5Adapter implements Adapter {
  /**
   * 图表实例
   */
  private instance: EChartsType | null = null;
  private options: ExtendedH5AdapterOptions;
  private containerRef: ExtendedH5AdapterOptions['containerRef'] = undefined;
  private canvasId: string;

  constructor(options: ExtendedH5AdapterOptions) {
    this.options = options || ({} as ExtendedH5AdapterOptions);
    this.containerRef = options.containerRef;
    this.canvasId = this.options.canvasId || 'taroviz-echarts-canvas';
  }

  /**
   * 创建H5适配器实例
   * @param options 适配器选项
   * @returns 适配器实例
   */
  static create(options: ExtendedH5AdapterOptions): H5Adapter {
    return new H5Adapter(options);
  }

  /**
   * 初始化图表
   */
  init(_options?: EChartsOption): EChartsType {
    if (this.instance) {
      return this.instance;
    }

    // 获取容器元素
    const container = this.containerRef && 'current' in this.containerRef
      ? this.containerRef.current
      : this.containerRef || document.getElementById(this.canvasId);
    if (!container) {
      throw new Error(`[TaroViz] H5Adapter: container not found (canvasId: ${this.canvasId})`);
    }

    // 初始化图表
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.instance = echarts.init(container as HTMLElement, this.options.theme, {
      // 性能优化选项
      useDirtyRect: true, // 使用脏矩形渲染，减少重绘区域
      renderer: this.options.renderer || 'canvas',
    }) as unknown as EChartsType;

    // 设置性能优化相关的全局配置
    if (this.instance) {
      // 渐进式渲染配置
      this.instance.setOption(
        {
          animation: this.options.option?.animation !== false,
          animationDurationUpdate: 300,
          animationEasingUpdate: 'cubicOut',
          progressive: 500,
          progressiveThreshold: 1000,
        },
        true
      );
    }

    // 设置初始化选项，使用lazyUpdate优化性能
    if (this.options.option && this.instance) {
      this.instance.setOption(this.options.option, false, true);
    }

    // 执行初始化回调
    if (this.options.onInit && this.instance) {
      this.options.onInit(this.instance);
    }

    return this.instance as EChartsType;
  }

  /**
   * 获取图表实例
   */
  getInstance(): EChartsType | null {
    return this.instance;
  }

  /**
   * 设置图表选项
   */
  setOption(option: EChartsOption, notMerge = false, lazyUpdate = true): void {
    if (this.instance) {
      this.instance.setOption(option, notMerge, lazyUpdate);
    } else {
      this.options.option = option;
    }
  }

  /**
   * 设置主题
   */
  setTheme(theme: string | object): void {
    this.options.theme = theme;
    if (this.instance) {
      // 使用类型断言来访问私有方法
      (this.instance as any).setTheme?.(theme);
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
    const ref = this.containerRef;
    return ref && 'current' in ref ? ref.current : (ref as HTMLElement | null);
  }

  /**
   * 转换为DataURL
   */
  convertToDataURL(opts?: {
    type?: 'svg' | 'png' | 'jpeg';
    pixelRatio?: number;
    backgroundColor?: string;
  }): string | undefined {
    return this.instance?.getDataURL(opts);
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
   * 绑定事件
   */
  on(event: string, handler: EventHandler): void {
    if (this.instance) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.instance.on(event, handler as any);
    }
  }

  /**
   * 解绑事件
   */
  off(event: string, handler?: EventHandler): void {
    if (this.instance) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.instance.off(event, handler as any);
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
   * 设置组件实例
   */
  setComponent(component: unknown): void {
    this.containerRef = component as ExtendedH5AdapterOptions['containerRef'];
  }

  /**
   * 渲染图表组件
   */
  render(): JSX.Element {
    const { width = '100%', height = '300px', style = {}, direction = 'ltr' } = this.options;
    // 注意：这里需要根据实际使用的Taro版本和组件库来调整
    return React.createElement('div', {
      id: this.canvasId,
      ref: this.containerRef,
      style: { width, height, direction, ...style },
    });
  }

  /**
   * 销毁图表
   */
  dispose(): void {
    if (this.instance) {
      this.instance.dispose();
      this.instance = null;
    }
  }

  /**
   * 触发图表行为
   */
  dispatchAction(payload: { type: string; [key: string]: unknown }): void {
    if (this.instance) {
      this.instance.dispatchAction(payload);
    }
  }

  /**
   * 获取DataURL
   */
  getDataURL(opts?: object): string | undefined {
    return this.instance?.getDataURL(opts);
  }

  /**
   * 处理图表大小变化
   */
  resize(opts?: object): void {
    if (this.instance) {
      this.instance.resize(opts);
    }
  }

  /**
   * 获取适配器名称
   * @returns 适配器名称
   */
  getName(): string {
    return 'H5Adapter';
  }

  /**
   * 获取适配器版本
   * @returns 适配器版本
   */
  getVersion(): string {
    return '1.1.1';
  }

  /**
   * 获取平台信息
   * @returns 平台信息
   */
  getPlatformInfo(): Record<string, string> {
    return {
      platform: 'h5',
      renderer: this.options.renderer || 'canvas',
      userAgent: navigator.userAgent,
      devicePixelRatio: String(window.devicePixelRatio),
    };
  }
}

export default H5Adapter;
