/**
 * TaroViz 图表工具函数
 */

/**
 * 处理适配器配置参数类型
 * 解决类型不匹配问题
 */
export function processAdapterConfig(config: {
  width?: string | number;
  height?: string | number;
  theme?: string | object;
  autoResize?: boolean;
  canvasId?: string;
  containerRef?: any;
  option?: any;
  renderer?: 'canvas' | 'svg';
  [key: string]: any;
}): any {
  // 将复杂类型转换为简单类型
  const processedConfig = {
    width: typeof config.width === 'number' ? config.width : undefined,
    height: typeof config.height === 'number' ? config.height : undefined,
    theme: typeof config.theme === 'string' ? config.theme : undefined,
    autoResize: config.autoResize,
    canvasId: config.canvasId,
    containerRef: config.containerRef,
    option: config.option,
    renderer: config.renderer,
  };

  // 复制其他可能存在的属性
  const result: Record<string, any> = { ...processedConfig };
  Object.keys(config).forEach(key => {
    if (!(key in processedConfig)) {
      result[key] = config[key];
    }
  });

  return result;
}

/**
 * 安全地调用适配器渲染方法
 * 解决 render 方法可能不存在的问题
 */
export function safeRenderAdapter(adapter: any): JSX.Element | null {
  if (adapter && typeof adapter.render === 'function') {
    try {
      return adapter.render();
    } catch (error) {
      console.error('[TaroViz] Error rendering adapter:', error);
    }
  }
  return null;
}
