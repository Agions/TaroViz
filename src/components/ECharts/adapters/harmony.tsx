/**
 * Taro ECharts 鸿蒙OS适配器
 * 为鸿蒙OS环境提供ECharts图表渲染支持
 */
import React from 'react';
import Taro from '@tarojs/taro';
import { Canvas } from '@tarojs/components';
import * as echarts from 'echarts/core';
import { Adapter, HarmonyAdapterOptions } from '../types/platform';
import { EChartsOption } from '../types/common';

/**
 * 鸿蒙OS适配器类
 * 实现Adapter接口，提供鸿蒙OS环境下的图表功能
 */
class HarmonyAdapter implements Adapter {
  private instance: echarts.ECharts | null = null;
  private options: HarmonyAdapterOptions;
  private chartCanvas: any = null;
  private isCanvasReady: boolean = false;

  constructor(options: HarmonyAdapterOptions) {
    this.options = options;
  }

  /**
   * 初始化图表
   */
  async init(): Promise<echarts.ECharts | null> {
    if (this.instance) {
      return this.instance;
    }

    try {
      // 获取canvas上下文
      const query = Taro.createSelectorQuery();
      return new Promise<echarts.ECharts | null>((resolve) => {
        query.select(`#${this.options.canvasId}`)
          .fields({ node: true, size: true })
          .exec((res) => {
            if (!res[0]?.node) {
              console.error('Canvas node not found');
              resolve(null);
              return;
            }

            const canvas = res[0].node;
            const ctx = canvas.getContext('2d');

            // 设置canvas大小
            const dpr = Taro.getSystemInfoSync().pixelRatio;
            canvas.width = res[0].width * dpr;
            canvas.height = res[0].height * dpr;
            ctx.scale(dpr, dpr);

            // 创建ECharts实例
            this.instance = echarts.init(canvas, this.options.theme, {
              renderer: 'canvas',
              width: res[0].width,
              height: res[0].height,
              devicePixelRatio: dpr
            });

            this.chartCanvas = canvas;
            this.isCanvasReady = true;

            // 设置初始配置
            if (this.options.option) {
              this.instance.setOption(this.options.option);
            }

            // 调用初始化回调
            if (this.options.onInit) {
              this.options.onInit(this.instance);
            }

            resolve(this.instance);
          });
      });
    } catch (error) {
      console.error('Failed to initialize chart in HarmonyOS:', error);
      return null;
    }
  }

  /**
   * 获取ECharts实例
   */
  getInstance(): echarts.ECharts | null {
    return this.instance;
  }

  /**
   * 获取图表宽度
   */
  getWidth(): number {
    return this.chartCanvas ? this.chartCanvas.width : 0;
  }

  /**
   * 获取图表高度
   */
  getHeight(): number {
    return this.chartCanvas ? this.chartCanvas.height : 0;
  }

  /**
   * 获取DOM元素
   */
  getDom(): HTMLElement | null {
    return null; // 小程序环境下没有DOM
  }

  /**
   * 设置图表配置
   */
  setOption(option: EChartsOption, notMerge?: boolean): void {
    if (this.instance && this.isCanvasReady) {
      this.instance.setOption(option, notMerge);
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
    this.isCanvasReady = false;
  }

  /**
   * 调整图表大小
   */
  resize(opts?: any): void {
    if (this.instance && this.isCanvasReady) {
      const query = Taro.createSelectorQuery();
      query.select(`#${this.options.canvasId}`)
        .fields({ node: true, size: true })
        .exec((res) => {
          if (res[0]) {
            const canvas = res[0].node;
            const dpr = Taro.getSystemInfoSync().pixelRatio;

            // 更新canvas大小
            canvas.width = res[0].width * dpr;
            canvas.height = res[0].height * dpr;
            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);

            // 调整图表大小
            this.instance?.resize({
              width: res[0].width,
              height: res[0].height,
              ...opts
            });
          }
        });
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
   * 转换为dataURL
   */
  async convertToDataURL(opts?: object): Promise<string | undefined> {
    if (!this.instance || !this.isCanvasReady) {
      return undefined;
    }

    try {
      const canvas = this.chartCanvas;
      return new Promise<string>((resolve, reject) => {
        Taro.canvasToTempFilePath({
          canvas,
          success: res => resolve(res.tempFilePath),
          fail: reject,
          ...opts
        });
      });
    } catch (error) {
      console.error('Failed to convert to dataURL in HarmonyOS:', error);
      return undefined;
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
   * 获取图表的图片URL
   */
  async getDataURL(opts?: object): Promise<string | undefined> {
    return this.convertToDataURL(opts);
  }

  /**
   * 绑定事件
   */
  on(eventName: string, handler: Function, context?: object): void {
    if (this.instance) {
      // 使用类型断言解决类型不匹配问题
      this.instance.on(eventName, handler as any, context);
    }
  }

  /**
   * 解绑事件
   */
  off(eventName: string, handler?: Function): void {
    if (this.instance) {
      // 使用类型断言解决类型不匹配问题
      this.instance.off(eventName, handler as any);
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
   * 渲染图表
   */
  render(): React.ReactNode {
    const { width, height, canvasId } = this.options;

    // 使用一个函数组件来渲染Canvas
    const CanvasComponent = () => (
      <Canvas
        type='2d'
        id={canvasId}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height
        }}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      />
    );

    return <CanvasComponent />;
  }

  /**
   * 触摸开始事件处理
   */
  private handleTouchStart = (e: any) => {
    if (!this.instance || !this.isCanvasReady) return;

    const touch = e.touches[0];
    const rect = this.chartCanvas.getBoundingClientRect();

    this.instance.getZr().handler.dispatch('mousedown', {
      zrX: touch.x - rect.left,
      zrY: touch.y - rect.top,
      preventDefault: () => {},
      stopPropagation: () => {}
    });
  }

  /**
   * 触摸移动事件处理
   */
  private handleTouchMove = (e: any) => {
    if (!this.instance || !this.isCanvasReady) return;

    const touch = e.touches[0];
    const rect = this.chartCanvas.getBoundingClientRect();

    this.instance.getZr().handler.dispatch('mousemove', {
      zrX: touch.x - rect.left,
      zrY: touch.y - rect.top,
      preventDefault: () => {},
      stopPropagation: () => {}
    });
  }

  /**
   * 触摸结束事件处理
   */
  private handleTouchEnd = (e: any) => {
    if (!this.instance || !this.isCanvasReady) return;

    const touch = e.changedTouches[0];
    const rect = this.chartCanvas.getBoundingClientRect();

    this.instance.getZr().handler.dispatch('mouseup', {
      zrX: touch.x - rect.left,
      zrY: touch.y - rect.top,
      preventDefault: () => {},
      stopPropagation: () => {}
    });
  }
}

export default HarmonyAdapter;
