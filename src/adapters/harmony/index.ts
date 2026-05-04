/**
 * TaroViz HarmonyOS适配器
 * 基于HarmonyOS Canvas实现图表渲染
 * 继承 MiniAppAdapter，复用通用逻辑
 */
import * as React from 'react';

import type { EChartsType } from 'echarts';
import { MiniAppAdapter, createMiniAppAdapter } from '../MiniAppAdapter';

/**
 * HarmonyOS环境下的图表适配器
 */
class HarmonyAdapter extends MiniAppAdapter {
  /**
   * 平台名称
   */
  protected get platformName(): string {
    return 'Harmony';
  }

  /**
   * 初始化图表（覆盖父类方法，返回 EChartsType）
   */
  init(): EChartsType {
    const result = super.init();
    return result as EChartsType;
  }

  /**
   * 渲染图表组件
   */
  render(): React.ReactElement {
    const config = this.config;
    const canvasId = (config.canvasId as string) || 'ec-canvas';
    const width = (config.width as string) || '100%';
    const height = (config.height as string) || '300px';
    const style = (config.style as React.CSSProperties) || {};

    return React.createElement('view', {
      id: canvasId,
      style: { width, height, ...style },
    });
  }
}

/**
 * 创建 Harmony 适配器
 */
export const createHarmonyAdapter = createMiniAppAdapter(HarmonyAdapter);

export default HarmonyAdapter;
