/**
 * TaroViz 微信小程序适配器
 * 基于微信小程序canvas组件实现图表渲染
 */
import * as React from 'react';

import { Adapter, WeappAdapterOptions } from '../types';

// 扩展 WeappAdapterOptions 类型
interface ExtendedWeappAdapterOptions extends WeappAdapterOptions {
  component?: any;
  canvasId?: string;
  width?: number | string;
  height?: number | string;
  theme?: string | object;
  option?: any;
  onInit?: (instance: any) => void;
}

/**
 * 微信小程序环境下的图表适配器
 */
class WeappAdapter implements Adapter {
  /**
   * 配置项
   */
  private config: ExtendedWeappAdapterOptions;

  /**
   * 图表实例
   */
  private chartInstance: any | null = null;

  /**
   * 组件实例
   */
  private component: any | null = null;

  /**
   * 构造函数
   * @param config 适配器配置
   */
  constructor(config: ExtendedWeappAdapterOptions) {
    this.config = config;
    this.component = config.component;
  }

  /**
   * 创建微信小程序适配器实例
   * @param options 适配器选项
   * @returns 适配器实例
   */
  static create(options: ExtendedWeappAdapterOptions): WeappAdapter {
    return new WeappAdapter(options);
  }

  /**
   * 获取图表实例
   */
  getInstance(): any {
    return this.chartInstance;
  }

  /**
   * 初始化图表
   */
  init(): any {
    const { canvasId, width, height, theme, option } = this.config;

    if (!this.component) {
      console.error('[TaroViz] WeappAdapter: component is required');
      return null;
    }

    if (!canvasId) {
      console.error('[TaroViz] WeappAdapter: canvasId is required');
      return null;
    }

    // 创建图表实例
    const chart = this.component.createChart({
      id: canvasId,
      width: width,
      height: height,
      theme: theme,
    });

    // 设置图表选项
    if (option) {
      chart.setOption(option);
    }

    // 存储图表实例
    this.chartInstance = chart;

    // 初始化回调
    if (this.config.onInit) {
      this.config.onInit(chart);
    }

    return chart;
  }

  /**
   * 设置图表选项
   */
  setOption(option: any, opts?: any): void {
    if (this.chartInstance) {
      this.chartInstance.setOption(option, opts);
    } else {
      this.config.option = option;
    }
  }

  /**
   * 设置主题
   */
  setTheme(theme: string | object): void {
    this.config.theme = theme;
    if (this.chartInstance) {
      this.chartInstance.setTheme?.(theme);
    }
  }

  /**
   * 获取图表宽度
   */
  getWidth(): number {
    return 0;
  }

  /**
   * 获取图表高度
   */
  getHeight(): number {
    return 0;
  }

  /**
   * 获取DOM元素
   */
  getDom(): HTMLElement | null {
    return null;
  }

  /**
   * 转换为DataURL
   */
  convertToDataURL(opts?: any): string | undefined {
    return this.chartInstance?.getDataURL(opts);
  }

  /**
   * 清空图表
   */
  clear(): void {
    if (this.chartInstance) {
      this.chartInstance.clear();
    }
  }

  /**
   * 绑定事件
   */
  on(event: string, handler: (params: any) => void): void {
    if (this.chartInstance) {
      this.chartInstance.on(event, handler);
    }
  }

  /**
   * 解绑事件
   */
  off(event: string, handler?: (params: any) => void): void {
    if (this.chartInstance) {
      this.chartInstance.off(event, handler);
    }
  }

  /**
   * 显示加载动画
   */
  showLoading(opts?: object): void {
    if (this.chartInstance) {
      this.chartInstance.showLoading(opts);
    }
  }

  /**
   * 隐藏加载动画
   */
  hideLoading(): void {
    if (this.chartInstance) {
      this.chartInstance.hideLoading();
    }
  }

  /**
   * 销毁图表
   */
  dispose(): void {
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
  }

  /**
   * 处理图表大小变化
   */
  resize(opts?: any): void {
    if (this.chartInstance) {
      this.chartInstance.resize(opts);
    }
  }

  /**
   * 设置组件实例
   */
  setComponent(component: any): void {
    this.component = component;
  }

  /**
   * 渲染图表组件
   */
  render(): JSX.Element {
    const { canvasId = 'ec-canvas', width = '100%', height = '300px', style = {} } = this.config;
    // 注意：这里需要根据实际使用的Taro版本和组件库来调整
    return React.createElement('view', {
      id: canvasId,
      style: { width, height, ...style },
    });
  }
}

export default WeappAdapter;
