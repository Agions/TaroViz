/**
 * TaroViz H5适配器
 * 基于echarts-for-react实现H5环境下的图表渲染
 */
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import React from 'react';

import { Adapter, H5AdapterOptions } from '../types';

// 注册基础组件
echarts.use([CanvasRenderer, GridComponent, TooltipComponent, TitleComponent, LegendComponent]);

/**
 * H5环境适配器
 * 提供基础的Web浏览器环境下的图表渲染支持
 */
class H5Adapter implements Adapter {
  /**
   * 配置项
   */
  private config: H5AdapterOptions;

  /**
   * 图表实例
   */
  private chartInstance: any | null = null;

  /**
   * 构造函数
   * @param config 适配器配置
   */
  constructor(config: H5AdapterOptions) {
    this.config = config;
  }

  /**
   * 初始化图表
   * @returns 图表实例
   */
  init(): any | null {
    const {
      containerRef,
      width,
      height,
      theme,
      option,
      renderer = 'canvas',
      onInit,
      devicePixelRatio,
    } = this.config;

    // 检查容器引用
    if (!containerRef || !containerRef.current) {
      console.error('[TaroViz] H5Adapter: containerRef is required');
      return null;
    }

    // 初始化ECharts实例
    const chart = echarts.init(containerRef.current, theme, {
      renderer,
      width: typeof width === 'number' ? width : undefined,
      height: typeof height === 'number' ? height : undefined,
      devicePixelRatio: devicePixelRatio || window.devicePixelRatio,
    });

    // 设置配置项
    if (option) {
      chart.setOption(option);
    }

    // 保存实例引用
    this.chartInstance = chart;

    // 自动调整大小
    if (this.config.autoResize) {
      window.addEventListener('resize', this.handleResize);
    }

    // 初始化回调
    if (onInit) {
      onInit(chart);
    }

    return chart;
  }

  /**
   * 获取图表实例
   */
  getInstance(): any {
    return this.chartInstance;
  }

  /**
   * 设置图表配置项
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
    if (this.chartInstance) {
      this.dispose();
      this.config.theme = theme;
      this.init();
    } else if (this.config) {
      this.config.theme = theme;
    }
  }

  /**
   * 获取图表宽度
   */
  getWidth(): number {
    return this.chartInstance?.getWidth() || 0;
  }

  /**
   * 获取图表高度
   */
  getHeight(): number {
    return this.chartInstance?.getHeight() || 0;
  }

  /**
   * 获取DOM元素
   */
  getDom(): HTMLElement | null {
    return this.config.containerRef?.current || null;
  }

  /**
   * 触发图表行为
   */
  dispatchAction(payload: any): void {
    if (this.chartInstance) {
      this.chartInstance.dispatchAction(payload);
    }
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
   * 获取DataURL
   */
  getDataURL(opts?: any): string | undefined {
    return this.chartInstance?.getDataURL(opts);
  }

  /**
   * 绑定事件
   */
  on(eventName: string, handler: Function, context?: object): void {
    if (this.chartInstance) {
      this.chartInstance.on(eventName, handler, context);
    }
  }

  /**
   * 解绑事件
   */
  off(eventName: string, handler?: Function): void {
    if (this.chartInstance) {
      this.chartInstance.off(eventName, handler);
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
   * 设置组件实例
   */
  setComponent(component: any): void {
    // H5适配器不需要存储组件实例
  }

  /**
   * 渲染图表
   */
  render(): JSX.Element {
    // H5适配器使用containerRef进行渲染，无需返回JSX元素
    return React.createElement('div', { className: 'taroviz-h5-container' });
  }

  /**
   * 销毁图表实例
   */
  dispose(): void {
    if (this.chartInstance) {
      // 移除事件监听
      if (this.config.autoResize) {
        window.removeEventListener('resize', this.handleResize);
      }

      // 销毁图表实例
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
  }

  /**
   * 处理窗口大小变化
   */
  private handleResize = (): void => {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  };

  /**
   * 重置图表尺寸
   */
  resize(opts?: any): void {
    if (this.chartInstance) {
      const width = opts?.width;
      const height = opts?.height;
      this.chartInstance.resize({
        width:
          width !== undefined ? (typeof width === 'number' ? width : parseFloat(width)) : undefined,
        height:
          height !== undefined
            ? typeof height === 'number'
              ? height
              : parseFloat(height)
            : undefined,
      });
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
    return '0.5.0';
  }

  /**
   * 获取平台信息
   * @returns 平台信息
   */
  getPlatformInfo(): Record<string, any> {
    return {
      platform: 'h5',
      renderer: this.config.renderer || 'canvas',
      userAgent: navigator.userAgent,
      devicePixelRatio: window.devicePixelRatio,
    };
  }
}

/**
 * 创建 H5 环境下的 ECharts 适配器
 * @param options 适配器选项
 * @returns ECharts 适配器实例
 */
export function createH5Adapter(options: H5AdapterOptions): Adapter {
  return new H5Adapter(options);
}

export default {
  create: createH5Adapter,
};
