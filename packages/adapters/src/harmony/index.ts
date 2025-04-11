/**
 * TaroViz 鸿蒙OS适配器
 * 基于鸿蒙OS应用的Canvas组件实现图表渲染
 */
import React from 'react';
import Taro from '@tarojs/taro';
import { Canvas } from '@tarojs/components';
import * as echarts from 'echarts/core';
import { Adapter, HarmonyAdapterOptions, EChartsOption } from '@taroviz/core/types';
import { uuid } from '@taroviz/core/utils';

/**
 * 鸿蒙OS环境下的ECharts适配器
 */
class HarmonyAdapter implements Adapter {
  private instance: any = null;
  private options: HarmonyAdapterOptions;
  private canvasId: string;
  private ctx: any = null;
  private component: any = null;
  private canvasDom: any = null;
  
  constructor(options: HarmonyAdapterOptions) {
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

    // 鸿蒙OS的Canvas初始化逻辑
    // 由于鸿蒙OS环境的兼容性特性，这里使用特化的API
    // 注意：这里的实现可能需要根据实际的鸿蒙OS开发文档调整
    const createHarmonyCanvas = () => {
      // 鸿蒙环境检测
      const isHarmonyEnvironment = typeof (global as any).ohGetFeature !== 'undefined';
      
      if (!isHarmonyEnvironment) {
        console.warn('[TaroViz] Not running in HarmonyOS environment, fallback to standard implementation');
        return this.initStandardCanvas();
      }
      
      // 获取实际的canvas节点
      Taro.createSelectorQuery()
        .select(`#${this.canvasId}`)
        .fields({ node: true, size: true })
        .exec(res => {
          if (!res || !res[0] || !res[0].node) {
            console.error('[TaroViz] Failed to get canvas instance in HarmonyOS');
            return;
          }

          const canvas = res[0].node;
          const ctx = canvas.getContext('2d');
          
          // 处理鸿蒙特有的高DPI设置
          const dpr = Taro.getSystemInfoSync().pixelRatio || 2;
          canvas.width = res[0].width * dpr;
          canvas.height = res[0].height * dpr;
          
          // 启用硬件加速（如果可用）
          if (this.options.harmonyOptions?.enableHardwareAcceleration) {
            // 这里添加鸿蒙特有的硬件加速API调用
            console.log('[TaroViz] Enabling hardware acceleration in HarmonyOS');
            // 示例: ctx.enableHardwareAcceleration && ctx.enableHardwareAcceleration();
          }
          
          this.ctx = ctx;
          this.canvasDom = canvas;
          
          // 初始化ECharts实例
          this.instance = echarts.init(canvas, null, {
            width: res[0].width,
            height: res[0].height,
            devicePixelRatio: dpr,
            renderer: 'canvas'
          });
          
          // 设置图表配置
          if ((this.options as any).option) {
            this.instance.setOption((this.options as any).option);
          }
          
          // 调用初始化回调
          if (this.options.onInit) {
            this.options.onInit(this.instance);
          }
        });
    };
    
    createHarmonyCanvas();
    return null;
  }
  
  /**
   * 标准Canvas初始化（降级方案）
   */
  private initStandardCanvas(): any {
    Taro.createSelectorQuery()
      .select(`#${this.canvasId}`)
      .fields({ node: true, size: true })
      .exec(res => {
        if (!res || !res[0] || !res[0].node) {
          console.error('[TaroViz] Failed to get canvas instance');
          return;
        }

        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        
        // 标准DPI设置
        const dpr = Taro.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        
        this.ctx = ctx;
        this.canvasDom = canvas;
        
        // 初始化ECharts实例
        this.instance = echarts.init(canvas, null, {
          width: res[0].width,
          height: res[0].height,
          devicePixelRatio: dpr,
          renderer: 'canvas'
        });
        
        // 设置图表配置
        if ((this.options as any).option) {
          this.instance.setOption((this.options as any).option);
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
    if (!this.instance) {
      return undefined;
    }
    return this.instance.getDataURL(opts);
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
    if (!this.instance) {
      return undefined;
    }
    return this.instance.getDataURL(opts);
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
      // 添加鸿蒙特有的属性
      type: "2d",
      className: "taroviz-echarts-harmony"
    });
  }
}

// 导出适配器
export default HarmonyAdapter; 