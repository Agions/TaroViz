/**
 * TaroViz 飞书小程序适配器
 * 基于飞书小程序canvas组件实现图表渲染
 */
import { Canvas } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Adapter, MiniAppAdapterOptions, EChartsOption, EventHandler } from '@agions/taroviz-core';
import { uuid } from '@agions/taroviz-core';
import * as echarts from 'echarts/core';
import React from 'react';

// 为MiniAppAdapterOptions添加选项属性（临时解决lint错误）
interface LarkAdapterOptions extends MiniAppAdapterOptions {
  option?: EChartsOption;
  style?: React.CSSProperties;
}

/**
 * 飞书小程序环境下的ECharts适配器
 */
class LarkAdapter implements Adapter {
  private instance: any = null;
  private options: LarkAdapterOptions;
  private canvasId: string;
  private ctx: any = null;
  private component: any = null;
  private canvasDom: any = null;

  constructor(options: LarkAdapterOptions) {
    this.options = options || ({} as any);
    this.canvasId = this.options.canvasId || `ec-canvas-${uuid()}`;
  }

  /**
   * 初始化图表
   */
  init(): any {
    if (this.instance) {
      return this.instance;
    }

    // 初始化飞书小程序Canvas
    const query = Taro.createSelectorQuery();
    // @ts-ignore
    query
      .select(`#${this.canvasId}`)
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0] || !res[0].node) {
          console.error('[TaroViz] Failed to get canvas instance');
          return;
        }

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');

        // 设置canvas样式尺寸
        const dpr = Taro.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;

        // 保存上下文和DOM
        this.ctx = ctx;
        this.canvasDom = canvas;

        // 初始化图表
        this.instance = echarts.init(canvas, null, {
          width: res[0].width,
          height: res[0].height,
          devicePixelRatio: dpr,
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
      this.options.option = option;
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
    // 小程序环境不支持直接获取DataURL
    console.warn('[TaroViz] convertToDataURL not supported in Lark Mini Program environment');
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
    // 小程序环境不支持直接获取DataURL
    console.warn('[TaroViz] getDataURL not supported in Lark Mini Program environment');
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
  off(eventName: string, handler?: EventHandler): void {
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
    const { width = '100%', height = '300px', style = {} } = this.options;

    // 合并样式
    const mergedStyle = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      ...style,
    };

    // @ts-ignore - 处理JSX兼容性问题
    return React.createElement(Canvas, {
      type: '2d',
      id: this.canvasId,
      style: mergedStyle,
      className: 'taroviz-echarts-lark',
    });
  }
}

// 导出适配器
export default LarkAdapter;
