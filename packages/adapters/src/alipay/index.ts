/**
 * TaroViz 支付宝小程序适配器
 * 基于支付宝小程序canvas组件实现图表渲染
 */
import { Canvas } from '@tarojs/components';
import * as echarts from 'echarts/core';
import React from 'react';

import { Adapter, AlipayAdapterOptions } from '../types';

// 支付宝小程序全局对象
declare const my: {
  createSelectorQuery: () => {
    select: (selector: string) => {
      boundingClientRect: () => {
        exec: (callback: (res: any[]) => void) => void;
      };
    };
  };
  createCanvasContext: (canvasId: string) => any;
  [key: string]: any;
};

/**
 * 生成唯一ID
 * @returns 随机生成的UUID字符串
 */
function generateUuid(): string {
  return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, function (_c) {
    const r = (Math.random() * 16) | 0;
    return r.toString(16);
  });
}

/**
 * 支付宝小程序环境下的ECharts适配器
 */
class AlipayAdapter implements Adapter {
  private instance: echarts.ECharts | null = null;
  private options: AlipayAdapterOptions;
  private canvasId: string;
  private ctx: any = null;
  private component: any = null;
  private canvasDom: any = null;

  constructor(options: AlipayAdapterOptions) {
    this.options = options || ({} as AlipayAdapterOptions);
    this.canvasId = this.options.canvasId || `ec-canvas-${generateUuid()}`;
  }

  /**
   * 初始化图表
   */
  init(): echarts.ECharts | null {
    if (this.instance) {
      return this.instance;
    }

    // 支付宝小程序初始化Canvas
    my.createSelectorQuery()
      .select(`#${this.canvasId}`)
      .boundingClientRect()
      .exec((res: any[]) => {
        if (!res || !res[0]) {
          console.error('[TaroViz] Failed to get canvas instance');
          return;
        }

        const width = res[0].width;
        const height = res[0].height;

        // 获取canvas上下文
        const ctx = my.createCanvasContext(this.canvasId);

        // 支付宝小程序不支持直接获取canvas节点，需要适配
        const myCanvas = {
          width,
          height,
          getContext: () => ctx,
          // 支付宝小程序需要额外添加的方法
          createImage: () => ({
            onload: null,
            onerror: null,
            src: '',
          }),
          // 其他方法按需适配
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => {},
          requestAnimationFrame: (callback: () => void) => setTimeout(callback, 16),
          cancelAnimationFrame: (id: number) => clearTimeout(id),
        };

        this.ctx = ctx;
        this.canvasDom = myCanvas;

        // 初始化图表
        this.instance = echarts.init(myCanvas as any, null, {
          width: width,
          height: height,
          devicePixelRatio: 2,
          renderer: 'canvas',
        });

        // 设置图表配置
        if (this.options.option) {
          this.instance.setOption(this.options.option);
        }

        // 调用初始化回调
        if (this.options.onInit) {
          this.options.onInit(this.instance);
        }
      });

    return null;
  }

  /**
   * 获取图表实例
   */
  getInstance(): echarts.ECharts | null {
    return this.instance;
  }

  /**
   * 设置图表配置项
   */
  setOption(option: any, opts?: any): void {
    if (this.instance) {
      this.instance.setOption(option, opts);
    } else {
      // 保存配置，等实例初始化后应用
      this.options.option = option;
    }
  }

  /**
   * 调整图表大小
   */
  resize(_opts?: any): void {
    if (this.instance) {
      this.instance.resize();
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
  on(eventName: string, handler: (params: any) => void, context?: any): void {
    if (this.instance) {
      this.instance.on(eventName, handler, context);
    }
  }

  /**
   * 解绑事件
   */
  off(eventName: string, handler?: (params: any) => void): void {
    if (this.instance) {
      this.instance.off(eventName, handler);
    }
  }

  /**
   * 显示加载动画
   */
  showLoading(_opts?: object): void {
    if (this.instance) {
      this.instance.showLoading();
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
   * 销毁图表实例
   */
  dispose(): void {
    if (this.instance) {
      this.instance.dispose();
      this.instance = null;
    }

    this.canvasDom = null;
    this.ctx = null;
  }

  /**
   * 设置组件实例
   */
  setComponent(component: any): void {
    this.component = component;
  }

  /**
   * 渲染图表
   */
  render(): JSX.Element {
    const { width = '100%', height = '300px', style = {} } = this.options;

    // 合并样式
    const mergedStyle = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      ...style,
    };

    return React.createElement(Canvas, {
      type: '2d',
      id: this.canvasId,
      style: mergedStyle,
      className: 'taroviz-echarts-alipay',
    });
  }
}

export default AlipayAdapter;
