/**
 * ECharts事件相关类型定义
 */

/**
 * 常见ECharts事件类型枚举
 */
export enum EChartsEventType {
  // 鼠标事件
  CLICK = 'click',
  DBLCLICK = 'dblclick',
  MOUSEOVER = 'mouseover',
  MOUSEOUT = 'mouseout',
  MOUSEMOVE = 'mousemove',
  MOUSEDOWN = 'mousedown',
  MOUSEUP = 'mouseup',
  GLOBALOUT = 'globalout',
  CONTEXTMENU = 'contextmenu',
  
  // 交互组件事件
  LEGEND_SELECT_CHANGED = 'legendselectchanged',
  LEGEND_SELECTED = 'legendselected',
  LEGEND_UNSELECTED = 'legendunselected',
  LEGEND_SCROLL = 'legendscroll',
  DATAZOOM = 'datazoom',
  DATARANGE_SELECTED = 'datarangeselected',
  TIMELINE_CHANGED = 'timelinechanged',
  TIMELINE_PLAY_CHANGED = 'timelineplaychanged',
  RESTORE = 'restore',
  DATAVIEW_CHANGED = 'dataviewchanged',
  MAGICTYPE_CHANGED = 'magictypechanged',
  GEO_SELECT_CHANGED = 'geoselectchanged',
  GEO_SELECTED = 'geoselected',
  GEO_UNSELECTED = 'geounselected',
  
  // 系列事件
  PIE_SELECT_CHANGED = 'pieselectchanged',
  PIE_SELECTED = 'pieselected',
  PIE_UNSELECTED = 'pieunselected',
  MAP_SELECT_CHANGED = 'mapselectchanged',
  MAP_SELECTED = 'mapselected',
  MAP_UNSELECTED = 'mapunselected',
  AXIS_AREA_SELECTED = 'axisareaselected',
  FOCUS_NODE_ADJACENCY = 'focusnodeadjacency',
  UNFOCUS_NODE_ADJACENCY = 'unfocusnodeadjacency',
  BRUSH = 'brush',
  BRUSH_END = 'brushend',
  BRUSH_SELECTED = 'brushselected',
  
  // 渲染事件
  RENDERED = 'rendered',
  FINISHED = 'finished'
}

/**
 * 通用事件参数基础接口
 */
export interface EChartsEventParams {
  /**
   * 组件类型
   */
  componentType?: string;
  
  /**
   * 系列类型
   */
  seriesType?: string;
  
  /**
   * 系列索引
   */
  seriesIndex?: number;
  
  /**
   * 系列名称
   */
  seriesName?: string;
  
  /**
   * 数据名称
   */
  name?: string;
  
  /**
   * 数据索引
   */
  dataIndex?: number;
  
  /**
   * 数据值
   */
  value?: any;
  
  /**
   * 颜色值
   */
  color?: string;
}

/**
 * 鼠标事件参数接口
 */
export interface EChartsMouseEventParams extends EChartsEventParams {
  /**
   * 鼠标x坐标
   */
  event?: {
    offsetX: number;
    offsetY: number;
  };
}

/**
 * 事件处理函数类型
 */
export type EChartsEventHandler<T = EChartsEventParams> = (params: T) => void;

/**
 * 触摸事件映射类型
 */
export interface TouchToMouseEventMap {
  touchstart: EChartsEventType.MOUSEDOWN | EChartsEventType.MOUSEMOVE;
  touchmove: EChartsEventType.MOUSEMOVE;
  touchend: EChartsEventType.MOUSEUP;
} 