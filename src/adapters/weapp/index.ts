/**
 * TaroViz 微信小程序适配器
 * 基于微信小程序canvas组件实现图表渲染
 */

import { BaseAdapter } from '../BaseAdapter';
import type { Adapter, WeappAdapterOptions } from '../types';

export class WeappAdapter extends BaseAdapter {
  private component: unknown = null;

  constructor(config: WeappAdapterOptions) {
    super(config);
    this.component = config.component;
  }

  static create(options: WeappAdapterOptions): Adapter {
    return new WeappAdapter(options) as unknown as Adapter;
  }

  init(): unknown {
    const config = this.config as WeappAdapterOptions & { canvasId?: string };
    const { canvasId, width, height, theme, option } = config;

    if (!this.component) {
      console.error('[TaroViz] WeappAdapter: component is required');
      return null;
    }

    if (!canvasId) {
      console.error('[TaroViz] WeappAdapter: canvasId is required');
      return null;
    }

    const chart = (this.component as { createChart: (config: unknown) => unknown }).createChart({
      id: canvasId,
      width,
      height,
      theme,
    });

    if (option) {
      (chart as { setOption: (o: unknown) => void }).setOption(option);
    }

    this.chartInstance = chart;

    const onInit = this.config['onInit'] as ((instance: unknown) => void) | undefined;
    if (onInit) {
      onInit(chart);
    }

    return chart;
  }

  getWidth(): number {
    return this.parseSize((this.config as WeappAdapterOptions).width, 300);
  }

  getHeight(): number {
    return this.parseSize((this.config as WeappAdapterOptions).height, 300);
  }

  setComponent(component: unknown): void {
    this.component = component;
  }

  dispatchAction(action: unknown): void {
    (this.chartInstance as { dispatchAction?: (a: unknown) => void })?.dispatchAction?.(action);
  }

  getDataURL(opts?: unknown): string | undefined {
    return (this.chartInstance as { getDataURL?: (o?: unknown) => string })?.getDataURL?.(opts);
  }
}

export default WeappAdapter;
