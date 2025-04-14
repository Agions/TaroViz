import { getAdapter } from '@agions/taroviz-adapters';
import { EChartsOption } from '@agions/taroviz-core/types';

/**
 * 图表工厂配置选项
 */
export interface ChartFactoryOptions {
  /**
   * 图表容器ID
   */
  containerId: string;

  /**
   * 图表配置项
   */
  option: EChartsOption;

  /**
   * 宽度
   */
  width?: number | string;

  /**
   * 高度
   */
  height?: number | string;

  /**
   * 主题
   */
  theme?: string | object;

  /**
   * 是否自动调整大小
   */
  autoResize?: boolean;

  /**
   * 渲染器类型
   */
  renderer?: 'canvas' | 'svg';

  /**
   * 图表初始化完成回调
   */
  onInit?: (chart: any) => void;

  /**
   * 事件处理映射
   */
  events?: Record<string, (params: any) => void>;
}

/**
 * 图表工厂函数，用于动态创建图表实例
 * @param options 图表配置选项
 * @returns 图表实例及控制方法
 */
export const createChart = (options: ChartFactoryOptions) => {
  const {
    containerId,
    option,
    width = '100%',
    height = '300px',
    theme,
    autoResize = true,
    renderer = 'canvas',
    onInit,
    events = {},
  } = options;

  let chartInstance: any = null;

  // 获取适配器
  const adapter = getAdapter({
    width,
    height,
    theme,
    autoResize,
    canvasId: containerId,
    option,
    renderer,
    onInit: (instance) => {
      chartInstance = instance;

      // 绑定事件
      if (events) {
        Object.keys(events).forEach((eventName) => {
          instance.on(eventName, events[eventName]);
        });
      }

      // 初始化回调
      if (onInit) {
        onInit(instance);
      }
    },
  });

  // 初始化图表
  adapter.init();

  // 返回图表实例和控制方法
  return {
    /**
     * 获取图表实例
     */
    getInstance: () => chartInstance,

    /**
     * 更新图表配置
     * @param newOption 新的配置项
     * @param notMerge 是否不合并
     */
    setOption: (newOption: EChartsOption, notMerge?: boolean) => {
      if (chartInstance) {
        chartInstance.setOption(newOption, notMerge);
      }
    },

    /**
     * 重绘图表
     */
    resize: () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    },

    /**
     * 显示加载动画
     * @param loadingOption 加载配置
     */
    showLoading: (loadingOption?: object) => {
      if (chartInstance) {
        chartInstance.showLoading(loadingOption);
      }
    },

    /**
     * 隐藏加载动画
     */
    hideLoading: () => {
      if (chartInstance) {
        chartInstance.hideLoading();
      }
    },

    /**
     * 绑定事件
     * @param eventName 事件名称
     * @param handler 事件处理函数
     */
    on: (eventName: string, handler: (params: any) => void) => {
      if (chartInstance) {
        chartInstance.on(eventName, handler);
      }
    },

    /**
     * 解绑事件
     * @param eventName 事件名称
     * @param handler 事件处理函数
     */
    off: (eventName: string, handler?: (params: any) => void) => {
      if (chartInstance) {
        chartInstance.off(eventName, handler);
      }
    },

    /**
     * 销毁图表实例
     */
    dispose: () => {
      if (chartInstance) {
        // 解绑所有事件
        if (events) {
          Object.keys(events).forEach((eventName) => {
            chartInstance.off(eventName);
          });
        }
        chartInstance.dispose();
        chartInstance = null;
      }
    },
  };
};
