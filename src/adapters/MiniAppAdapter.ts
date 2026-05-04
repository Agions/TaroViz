/**
 * TaroViz 小程序适配器基类
 * 消除 weapp/swan/tt 三个适配器间的代码重复
 */
import { BaseAdapter } from './BaseAdapter';
import type { Adapter } from './types';

/**
 * 小程序适配器选项
 */
export interface MiniAppAdapterOptions {
  component?: unknown;
  canvasId?: string;
  width?: number | string;
  height?: number | string;
  theme?: string | object;
  option?: unknown;
  onInit?: (instance: unknown) => void;
  [key: string]: unknown;
}

/**
 * 小程序适配器基类
 * 封装了小程序 canvas 初始化的通用逻辑
 */
export abstract class MiniAppAdapter extends BaseAdapter {
  protected component: unknown = null;

  constructor(config: MiniAppAdapterOptions) {
    super(config);
    this.component = config.component;
  }

  /**
   * 子类需返回平台名称（用于日志）
   */
  protected abstract get platformName(): string;

  /**
   * 创建图表实例
   * 子类可重写此方法以实现平台特定的创建逻辑
   * 默认实现调用 component.createChart
   */
  protected createChartInstance(
    component: unknown,
    config: { id: string; width?: number | string; height?: number | string; theme?: string | object }
  ): unknown {
    return (component as { createChart: (cfg: unknown) => unknown }).createChart({
      id: config.id,
      width: config.width,
      height: config.height,
      theme: config.theme,
    });
  }

  /**
   * 初始化图表
   */
  init(): unknown {
    const config = this.config as MiniAppAdapterOptions;
    const { canvasId, width, height, theme, option } = config;

    if (!this.component) {
      console.error(`[TaroViz] ${this.platformName}Adapter: component is required`);
      return null;
    }

    if (!canvasId) {
      console.error(`[TaroViz] ${this.platformName}Adapter: canvasId is required`);
      return null;
    }

    const chart = this.createChartInstance(this.component, {
      id: canvasId,
      width,
      height,
      theme,
    });

    if (option) {
      (chart as { setOption: (o: unknown) => void }).setOption(option);
    }

    this.chartInstance = chart;

    const onInit = config.onInit;
    if (onInit) {
      onInit(chart);
    }

    return chart;
  }

  /**
   * 设置组件引用
   */
  setComponent(component: unknown): void {
    this.component = component;
  }

  /**
   * 发送 action
   */
  dispatchAction(action: unknown): void {
    (this.chartInstance as { dispatchAction?: (a: unknown) => void })?.dispatchAction?.(action);
  }

  /**
   * 获取数据 URL
   */
  getDataURL(opts?: unknown): string | undefined {
    return (this.chartInstance as { getDataURL?: (o?: unknown) => string })?.getDataURL?.(opts);
  }
}

/**
 * 创建适配器工厂方法
 * 避免每个子类重复写相同的 static create
 *
 * 注：MiniAppAdapter.init() 返回 unknown ，不满足 Adapter 接口的 EChartsType 要求
 * 但实际使用中通过 as unknown as Adapter 强制转换，与原有子类的 static create 行为一致
 */
export function createMiniAppAdapter(AdapterClass: new (options: MiniAppAdapterOptions) => MiniAppAdapter) {
  return function create(options: MiniAppAdapterOptions): Adapter {
    return new AdapterClass(options) as unknown as Adapter;
  };
}

export default MiniAppAdapter;