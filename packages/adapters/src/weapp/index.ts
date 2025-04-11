/**
 * TaroViz 微信小程序适配器
 * 基于微信小程序canvas组件实现图表渲染
 */
import React from 'react';
import { Adapter, WeappAdapterOptions } from '../types';

/**
 * 微信小程序环境下的图表适配器
 */
class WeappAdapter implements Adapter {
  /**
   * 配置项
   */
  private config: WeappAdapterOptions;
  
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
  constructor(config: WeappAdapterOptions) {
    this.config = config;
    this.component = config.component;
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
      theme: theme
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
    } else if (this.config) {
      this.config.option = option;
    }
  }
  
  /**
   * 设置主题
   */
  setTheme(theme: string | object): void {
    if (this.config) {
      this.config.theme = theme;
      if (this.chartInstance) {
        this.chartInstance.setTheme?.(theme);
      }
    }
  }
  
  /**
   * 调整图表大小
   */
  resize(opts?: any): void {
    if (this.chartInstance) {
      this.chartInstance.resize(opts);
    }
  }
  
  /**
   * 获取图表实例
   */
  getInstance(): any {
    return this.chartInstance;
  }
  
  /**
   * 销毁图表实例
   */
  dispose(): void {
    if (this.chartInstance) {
      this.chartInstance.dispose?.();
      this.chartInstance = null;
    }
  }
  
  /**
   * 渲染图表
   */
  render(): JSX.Element {
    // 微信小程序通过传入的component进行渲染
    return React.createElement('div', { className: 'taroviz-weapp-container' });
  }
  
  /**
   * 设置组件实例
   */
  setComponent(component: any): void {
    this.component = component;
  }
  
  /**
   * 绑定事件
   */
  on(eventName: string, handler: Function, context?: object): void {
    if (this.chartInstance) {
      this.chartInstance.on?.(eventName, handler, context);
    }
  }
  
  /**
   * 解绑事件
   */
  off(eventName: string, handler?: Function): void {
    if (this.chartInstance) {
      this.chartInstance.off?.(eventName, handler);
    }
  }
  
  /**
   * 显示加载状态
   */
  showLoading(opts?: object): void {
    if (this.chartInstance) {
      this.chartInstance.showLoading?.(opts);
    }
  }
  
  /**
   * 隐藏加载状态
   */
  hideLoading(): void {
    if (this.chartInstance) {
      this.chartInstance.hideLoading?.();
    }
  }
  
  /**
   * 清空图表
   */
  clear(): void {
    if (this.chartInstance) {
      this.chartInstance.clear?.();
    }
  }
  
  /**
   * 派发事件行为
   */
  dispatchAction(payload: any): void {
    if (this.chartInstance) {
      this.chartInstance.dispatchAction?.(payload);
    }
  }
  
  /**
   * 获取图表宽度
   */
  getWidth(): number {
    return this.chartInstance?.getWidth?.() || 0;
  }
  
  /**
   * 获取图表高度
   */
  getHeight(): number {
    return this.chartInstance?.getHeight?.() || 0;
  }
  
  /**
   * 获取DOM元素
   */
  getDom(): HTMLElement | null {
    return null; // 小程序环境没有DOM
  }
  
  /**
   * 获取图表的DataURL
   */
  getDataURL(opts?: object): string | undefined {
    return this.chartInstance?.getDataURL?.(opts);
  }
  
  /**
   * 转换为DataURL
   */
  convertToDataURL(opts?: object): string | undefined {
    return this.chartInstance?.convertToDataURL?.(opts);
  }
  
  /**
   * 获取适配器名称
   */
  getName(): string {
    return 'WeappAdapter';
  }
  
  /**
   * 获取适配器版本
   */
  getVersion(): string {
    return '0.5.0';
  }
  
  /**
   * 获取平台信息
   */
  getPlatformInfo(): Record<string, any> {
    return {
      platform: 'weapp',
      canvasId: this.config.canvasId
    };
  }
}

/**
 * 创建微信小程序环境下的图表适配器
 * @param options 适配器选项
 * @returns 微信小程序适配器实例
 */
export function createWeappAdapter(options: WeappAdapterOptions): Adapter {
  return new WeappAdapter(options);
}

export default {
  create: createWeappAdapter
}; 