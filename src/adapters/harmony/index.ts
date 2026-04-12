/**
 * TaroViz HarmonyOS适配器
 * 基于HarmonyOS Canvas实现图表渲染
 */
import * as React from 'react';

import type { EChartsOption, EChartsType } from 'echarts';
import { Adapter, AdapterOptions } from '../types';
import type { EventHandler } from '../../core/types/platform';

// 扩展 AdapterOptions 类型
interface ExtendedHarmonyAdapterOptions extends AdapterOptions {
  /**
   * HarmonyOS组件实例
   */
  component?: object;
  /**
   * 图表选项
   */
  option?: EChartsOption;
  /**
   * 初始化回调
   */
  onInit?: (instance: EChartsType) => void;
}

/**
 * HarmonyOS环境下的图表适配器
 */
class HarmonyAdapter implements Adapter {
  /**
   * 配置项
   */
  private config: ExtendedHarmonyAdapterOptions;

  /**
   * 图表实例
   */
  private chartInstance: EChartsType | null = null;

  /**
   * 组件实例
   */
  private component: object | null = null;

  /**
   * 构造函数
   * @param config 适配器配置
   */
  constructor(config: ExtendedHarmonyAdapterOptions) {
    this.config = config;
    this.component = config.component ?? null;
  }

  /**
   * 创建HarmonyOS适配器实例
   * @param _options 适配器选项
   * @returns 适配器实例
   */
  init(_options?: object): EChartsType {
    const { canvasId, width, height, theme, option } = this.config;

    if (!this.component) {
      console.error('[TaroViz] HarmonyAdapter: component is required');
      return this.chartInstance as EChartsType;
    }

    if (!canvasId) {
      console.error('[TaroViz] HarmonyAdapter: canvasId is required');
      return this.chartInstance as EChartsType;
    }

    // 创建图表实例
    const chart = (this.component as { createChart: (config: {
      id: string;
      width?: number | string;
      height?: number | string;
      theme?: string | object;
    }) => EChartsType }).createChart({
      id: canvasId,
      width,
      height,
      theme,
    });

    // 设置图表选项
    if (option) {
      chart.setOption(option);
    }

    // 存储图表实例
    this.chartInstance = chart;

    // 初始化回调
    this.config.onInit?.(chart);

    return chart;
  }

  /**
   * 获取图表实例
   */
  getInstance(): EChartsType | null {
    return this.chartInstance;
  }

  /**
   * 设置图表选项
   */
  setOption(option: EChartsOption, opts?: object): void {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.chartInstance as any).setTheme?.(theme);
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
  convertToDataURL(opts?: object): string | undefined {
    return this.chartInstance?.getDataURL(opts as object);
  }

  /**
   * 清空图表
   */
  clear(): void {
    this.chartInstance?.clear();
  }

  /**
   * 绑定事件
   */
  on(eventName: string, handler: EventHandler, _context?: object): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.chartInstance?.on(eventName, handler as any);
  }

  /**
   * 解绑事件
   */
  off(eventName: string, handler?: EventHandler): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.chartInstance?.off(eventName, handler as any);
  }

  /**
   * 显示加载动画
   */
  showLoading(opts?: object): void {
    this.chartInstance?.showLoading(opts);
  }

  /**
   * 隐藏加载动画
   */
  hideLoading(): void {
    this.chartInstance?.hideLoading();
  }

  /**
   * 销毁图表
   */
  dispose(): void {
    this.chartInstance?.dispose();
    this.chartInstance = null;
  }

  /**
   * 处理图表大小变化
   */
  resize(opts?: object): void {
    this.chartInstance?.resize(opts);
  }

  /**
   * 设置组件实例
   */
  setComponent(component: object): void {
    this.component = component;
  }

  /**
   * 渲染图表组件
   */
  render(): React.ReactElement {
    const { canvasId = 'ec-canvas', width = '100%', height = '300px', style = {} } = this.config;
    return React.createElement('view', {
      id: canvasId,
      style: { width, height, ...style },
    });
  }

  /**
   * 触发图表行为
   */
  dispatchAction(payload: { type: string; [key: string]: unknown }): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.chartInstance?.dispatchAction(payload as any);
  }

  /**
   * 获取DataURL
   */
  getDataURL(opts?: object): string | undefined {
    return this.chartInstance?.getDataURL(opts);
  }
}

export default HarmonyAdapter;
