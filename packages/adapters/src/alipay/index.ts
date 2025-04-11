/**
 * TaroViz 支付宝小程序适配器
 * 基于支付宝小程序canvas组件实现图表渲染
 */
import React from 'react';
import Taro from '@tarojs/taro';
import { Canvas } from '@tarojs/components';
import * as echarts from 'echarts/core';
import { Adapter, AlipayAdapterOptions, EChartsOption } from '@taroviz/core/types';
import { uuid } from '@taroviz/core/utils';

/**
 * 支付宝小程序环境下的ECharts适配器
 */
class AlipayAdapter implements Adapter {
  private instance: any = null;
  private options: AlipayAdapterOptions;
  private canvasId: string;
  private ctx: any = null;
  private component: any = null;
  private canvasDom: any = null;
  
  constructor(options: AlipayAdapterOptions) {
    this.options = options || {} as any;
    this.canvasId = this.options.canvasId || `ec-canvas-${uuid()}`;
  }

  /**
   * 初始化图表
   */
  init(): any {
    if (this.instance) {
      return this.instance;
    }

    // 支付宝小程序初始化Canvas
    // @ts-ignore
    my.createSelectorQuery()
      .select(`#${this.canvasId}`)
      .boundingClientRect()
      .exec((res: any) => {
        if (!res || !res[0]) {
          console.error('[TaroViz] Failed to get canvas instance');
          return;
        }

        const width = res[0].width;
        const height = res[0].height;
        
        // 获取canvas上下文
        // @ts-ignore
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
            src: ''
          }),
          // 其他方法按需适配
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => {},
          requestAnimationFrame: (fn: Function) => setTimeout(fn, 16),
          cancelAnimationFrame: (id: number) => clearTimeout(id)
        };
        
        this.ctx = ctx;
        this.canvasDom = myCanvas;
        
        // 初始化图表
        this.instance = echarts.init(myCanvas as any, null, {
          width: width,
          height: height,
          devicePixelRatio: 2,
          renderer: 'canvas'
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
  getInstance(): any {
    return this.instance;
  }

  /**
   * 设置图表配置项
   */
  setOption(option: EChartsOption, opts?: any): void {
    if (this.instance) {
      this.instance.setOption(option, opts);
    } else {
      // 保存配置，等实例初始化后应用
      (this.options as any).option = option;
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
    return this.canvasDom || null;
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
    // 支付宝小程序环境不支持直接获取DataURL
    console.warn('[TaroViz] convertToDataURL not supported in Alipay environment');
    return undefined;
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
    // 支付宝小程序环境不支持直接获取DataURL
    console.warn('[TaroViz] getDataURL not supported in Alipay environment');
    return undefined;
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
    const { width = '100%', height = '300px' } = this.options;
    
    // 合并样式
    const mergedStyle = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height
    };
    
    return React.createElement(Canvas, {
      id: this.canvasId,
      style: mergedStyle,
      className: "taroviz-echarts-alipay"
    });
  }
}

// 导出适配器
export default AlipayAdapter; 