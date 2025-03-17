/**
 * TaroViz 鸿蒙OS ECharts 组件
 * 为鸿蒙OS环境提供ECharts图表渲染支持
 */
import * as React from 'react';
import * as echarts from 'echarts/core';
import HarmonyAdapter from './adapters/harmony';
import { EChartsProps } from './types/props';
import { EChartsOption, ThemeType } from './types/common';

/**
 * 鸿蒙OS环境的ECharts图表组件
 */
export default class ECharts extends React.Component<EChartsProps> {
  static defaultProps = {
    width: '100%',
    height: '300px',
    lazyUpdate: true
  };

  private adapter: HarmonyAdapter | null = null;
  private canvasId: string = `taroviz-charts-harmony-${Date.now()}`;
  private containerRef: React.RefObject<any> = React.createRef();
  private canvasRef: React.RefObject<any> = React.createRef();

  /**
   * 初始化适配器
   */
  private initAdapter() {
    const { width, height, theme, onInit, option, ...harmonyOptions } = this.props;

    // 初始化适配器
    this.adapter = new HarmonyAdapter({
      canvasId: this.canvasId,
      width,
      height,
      theme: theme as ThemeType,
      containerRef: this.containerRef,
      canvasRef: this.canvasRef,
      onInit: (instance: echarts.ECharts) => {
        if (option) {
          instance.setOption(option, true);
        }
        if (onInit) {
          onInit(instance);
        }
      },
      option: option as EChartsOption,
      harmonyOptions
    });
  }

  /**
   * 获取ECharts实例
   */
  public getEchartsInstance(): echarts.ECharts | null {
    if (!this.adapter) {
      return null;
    }
    return this.adapter.getInstance();
  }

  /**
   * 设置图表配置项
   */
  public setOption(option: EChartsOption, notMerge?: boolean): void {
    if (this.adapter) {
      this.adapter.setOption(option, notMerge);
    }
  }

  /**
   * 获取图表宽度
   */
  public getWidth(): number {
    if (!this.adapter) {
      return 0;
    }
    return this.adapter.getWidth();
  }

  /**
   * 获取图表高度
   */
  public getHeight(): number {
    if (!this.adapter) {
      return 0;
    }
    return this.adapter.getHeight();
  }

  /**
   * 调整图表大小
   */
  public resize(opts?: any): void {
    if (this.adapter) {
      this.adapter.resize(opts);
    }
  }

  /**
   * 触发图表行为
   */
  public dispatchAction(payload: any): void {
    if (this.adapter) {
      this.adapter.dispatchAction(payload);
    }
  }

  /**
   * 清空图表
   */
  public clear(): void {
    if (this.adapter) {
      this.adapter.clear();
    }
  }

  /**
   * 转换为DataURL
   */
  public async convertToDataURL(opts?: object): Promise<string | undefined> {
    if (!this.adapter) {
      return undefined;
    }
    return this.adapter.convertToDataURL(opts);
  }

  /**
   * 获取DataURL
   */
  public async getDataURL(opts?: object): Promise<string | undefined> {
    if (!this.adapter) {
      return undefined;
    }
    return this.adapter.getDataURL(opts);
  }

  /**
   * 绑定事件
   */
  public on(eventName: string, handler: Function, context?: object): void {
    if (this.adapter) {
      this.adapter.on(eventName, handler, context);
    }
  }

  /**
   * 解绑事件
   */
  public off(eventName: string, handler?: Function): void {
    if (this.adapter) {
      this.adapter.off(eventName, handler);
    }
  }

  /**
   * 显示加载动画
   */
  public showLoading(opts?: object): void {
    if (this.adapter) {
      this.adapter.showLoading(opts);
    }
  }

  /**
   * 隐藏加载动画
   */
  public hideLoading(): void {
    if (this.adapter) {
      this.adapter.hideLoading();
    }
  }

  componentDidMount() {
    this.initAdapter();
    if (this.adapter) {
      this.adapter.init().then(() => {
        // 初次渲染后调整图表大小
        this.resize();

        const { onChartReady } = this.props;
        if (onChartReady) {
          const instance = this.getEchartsInstance();
          if (instance) {
            onChartReady(instance);
          }
        }
      });
    }
  }

  componentDidUpdate(prevProps: EChartsProps) {
    const { option: prevOption, width: prevWidth, height: prevHeight } = prevProps;
    const { option, width, height, lazyUpdate } = this.props;

    // 当option变化时更新图表
    if (option !== prevOption) {
      this.setOption(option as EChartsOption, !lazyUpdate);
    }

    // 当尺寸变化时调整图表大小
    if (width !== prevWidth || height !== prevHeight) {
      setTimeout(() => this.resize(), 0);
    }

    // 处理主题变化
    if (prevProps.theme !== this.props.theme) {
      this.dispose();
      this.initAdapter();
      this.adapter?.init().then(() => {
        this.resize();

        const { onChartReady } = this.props;
        if (onChartReady) {
          const instance = this.getEchartsInstance();
          if (instance) {
            onChartReady(instance);
          }
        }
      });
    }
  }

  componentWillUnmount() {
    this.dispose();
  }

  /**
   * 销毁图表实例
   */
  public dispose(): void {
    if (this.adapter) {
      this.adapter.dispose();
      this.adapter = null;
    }
  }

  render() {
    // 创建一个包含ref的div，用于定位和渲染图表
    return (
      <div ref={this.containerRef} style={{ width: '100%', height: '100%' }}>
        {this.adapter && this.adapter.render()}
      </div>
    );
  }
}
