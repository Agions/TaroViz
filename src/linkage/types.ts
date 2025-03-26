/**
 * 联动事件类型
 */
export type LinkageEvent = 
  | 'tooltip'      // 提示框联动
  | 'highlight'    // 高亮联动
  | 'legendSelect' // 图例选择联动
  | 'dataZoom'     // 数据缩放联动
  | 'select'       // 数据选择联动
  | 'brush'        // 区域刷选联动
  | 'restore'      // 还原联动
  | 'click'        // 点击联动
  | 'dblclick'     // 双击联动
  | 'visualMap'    // 视觉映射联动
  | 'drill'        // 下钻联动
  | 'custom';      // 自定义联动

/**
 * 联动选项
 */
export interface LinkageOptions {
  // 是否同步提示框
  syncTooltip?: boolean;
  // 是否同步高亮
  syncHighlight?: boolean;
  // 是否同步图例选择
  syncLegendSelect?: boolean;
  // 是否同步数据缩放
  syncDataZoom?: boolean;
  // 是否同步选中
  syncSelect?: boolean;
  // 是否同步视觉映射
  syncVisualMap?: boolean;
  // 是否同步还原
  syncRestore?: boolean;
  // 自定义联动配置
  customSync?: Record<string, boolean>;
  // 联动延迟(ms)
  delay?: number;
  // 联动触发模式: 'all' - 所有图表, 'group' - 同组图表, 'related' - 关联图表
  triggerMode?: 'all' | 'group' | 'related';
  // 是否启用调试模式
  debug?: boolean;
}

/**
 * 联动实例接口
 */
export interface LinkageInstance {
  // 联动组ID
  groupId: string;
  // 联动选项
  options: LinkageOptions;
  // 注册图表
  registerChart: (chartId: string, chartInstance: any) => () => void;
  // 触发联动事件
  trigger: (event: LinkageEvent, params: any, sourceChartId?: string) => void;
  // 监听联动事件
  on: (event: LinkageEvent, callback: (data: any) => void) => () => void;
  // 取消监听
  off: (event: LinkageEvent, callback?: (data: any) => void) => void;
  // 销毁联动实例
  dispose: () => void;
}

/**
 * 联动组映射
 */
export type LinkageGroupMap = Map<string, LinkageInstance>;

/**
 * 图表联动配置接口
 */
export interface ChartLinkConfig {
  // 要监听的联动事件
  target?: LinkageEvent[];
  // 要广播的联动事件
  broadcast?: LinkageEvent[];
  // 禁用的联动事件
  disabled?: LinkageEvent[];
  // 自定义事件映射，将图表事件映射到联动事件
  eventMap?: Record<string, LinkageEvent>;
  // 数据映射函数，用于在不同图表间转换数据
  dataMapper?: (event: LinkageEvent, data: any) => any;
}

/**
 * 带联动的图表属性
 */
export interface ChartLinkageProps {
  // 联动实例
  linkage?: LinkageInstance | string;
  // 联动配置
  linkConfig?: ChartLinkConfig;
  // 图表ID，用于联动识别，默认自动生成
  chartId?: string;
} 