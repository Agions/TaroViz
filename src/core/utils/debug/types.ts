/**
 * TaroViz 调试面板类型定义
 */

/**
 * 调试面板选项
 */
export interface DebugPanelOptions {
  /**
   * 是否启用调试面板
   */
  enabled?: boolean;

  /**
   * 调试面板位置
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

  /**
   * 调试面板宽度
   */
  width?: number;

  /**
   * 调试面板高度
   */
  height?: number;

  /**
   * 默认激活的标签页
   */
  defaultTab?: DebugTabType;

  /**
   * 是否自动展开
   */
  autoExpand?: boolean;
}

/**
 * 调试标签页类型
 */
export type DebugTabType =
  | 'instance'
  | 'config'
  | 'data'
  | 'performance'
  | 'events'
  | 'errors'
  | 'tools';

/**
 * 调试信息类型
 */
export interface DebugInfo {
  /**
   * 图表实例信息
   */
  instance?: {
    id?: string;
    type?: string;
    version?: string;
    renderer?: string;
    width?: number;
    height?: number;
    platform?: string;
  };

  /**
   * 配置信息
   */
  config?: any;

  /**
   * 数据信息
   */
  data?: {
    series?: any[];
    totalDataCount?: number;
    currentDataCount?: number;
  };

  /**
   * 性能信息
   */
  performance?: {
    initTime?: number;
    renderTime?: number;
    updateTime?: number;
    dataSize?: number;
    frameRate?: number;
  };

  /**
   * 事件信息
   */
  events?: Array<{
    type: string;
    timestamp: number;
    params: any;
  }>;

  /**
   * 错误信息
   */
  errors?: Array<{
    type: string;
    message: string;
    stack?: string;
    timestamp: number;
  }>;
}

/**
 * 调试面板事件类型
 */
export enum DebugPanelEventType {
  /**
   * 面板显示事件
   */
  PANEL_SHOW = 'debugPanelShow',

  /**
   * 面板隐藏事件
   */
  PANEL_HIDE = 'debugPanelHide',

  /**
   * 标签页切换事件
   */
  TAB_CHANGE = 'debugPanelTabChange',

  /**
   * 调试信息更新事件
   */
  INFO_UPDATE = 'debugPanelInfoUpdate',
}

/**
 * 调试面板事件回调类型
 */
export type DebugPanelEventHandler = (event: { type: DebugPanelEventType; data?: any }) => void;
