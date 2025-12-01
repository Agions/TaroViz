/**
 * TaroViz H5 适配器
 * 基于 HTML Canvas 实现图表渲染
 */
import type { EChartsType } from 'echarts';
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

// 扩展 H5AdapterOptions 类型
interface ExtendedH5AdapterOptions extends H5AdapterOptions {
  canvasId?: string;
  width?: number | string;
  height?: number | string;
  theme?: string | object;
  option?: any;
  onInit?: (instance: any) => void;
  containerRef?: any;
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
  private instance: any = null;
  private options: ExtendedH5AdapterOptions;
  private containerRef: any = null;
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
  init(_options?: any): EChartsType {
    if (this.instance) {
      return this.instance;
    }

    // 获取容器元素
    const container = this.containerRef?.current || document.getElementById(this.canvasId);
    if (!container) {
      console.error('[TaroViz] H5Adapter: container not found');
      // 如果容器未找到，返回一个空对象
      return {} as EChartsType;
    }

    // 初始化图表
    this.instance = echarts.init(container, this.options.theme, {
      // 性能优化选项
      useDirtyRect: true, // 使用脏矩形渲染，减少重绘区域
      renderer: this.options.renderer || 'canvas',
    } as any); // 使用类型断言允许额外的配置选项

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

    // 设置初始化选项，使用notMerge: false和lazyUpdate: true优化性能
    if (this.options.option && this.instance) {
      this.instance.setOption(this.options.option, {
        notMerge: false, // 合并新选项和旧选项
        lazyUpdate: true, // 延迟更新，合并多次setOption调用
      });
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
  getInstance(): any {
    return this.instance;
  }

  /**
   * 设置图表选项
   */
  setOption(option: any, opts?: any): void {
    if (this.instance) {
      // 使用性能优化选项，默认启用lazyUpdate
      this.instance.setOption(option, {
        lazyUpdate: true,
        ...opts,
      });
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
    return this.containerRef?.current || null;
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
  on(event: string, handler: (params: any) => void): void {
    if (this.instance) {
      this.instance.on(event, handler);
    }
  }

  /**
   * 解绑事件
   */
  off(event: string, handler?: (params: any) => void): void {
    if (this.instance) {
      this.instance.off(event, handler);
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
  setComponent(component: any): void {
    this.containerRef = component;
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
   * 处理图表大小变化
   */
  resize(opts?: any): void {
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
  getPlatformInfo(): Record<string, any> {
    return {
      platform: 'h5',
      renderer: this.options.renderer || 'canvas',
      userAgent: navigator.userAgent,
      devicePixelRatio: window.devicePixelRatio,
    };
  }
}

export default H5Adapter;
