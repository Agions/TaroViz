/**
 * 支持的平台类型
 */
export type Platform =
  | 'h5' // 标准H5/Web环境
  | 'weapp' // 微信小程序
  | 'alipay' // 支付宝小程序
  | 'harmony' // 鸿蒙OS应用
  | 'swan' // 百度智能小程序
  | 'tt' // 字节跳动小程序
  | 'qq' // QQ小程序
  | 'jd' // 京东小程序
  | 'ks' // 快手小程序
  | 'kwai' // 快手小程序(别名)
  | 'dd' // 钉钉小程序
  | 'qywx' // 企业微信小程序
  | 'lark' // 飞书小程序
  | 'web'; // 同H5(别名)

/**
 * 平台类型枚举
 */
export enum PlatformType {
  H5 = 'h5',
  WEAPP = 'weapp', // 微信小程序
  ALIPAY = 'alipay', // 支付宝小程序
  SWAN = 'swan', // 百度小程序
  TT = 'tt', // 字节跳动小程序
  QQ = 'qq', // QQ小程序
  JD = 'jd', // 京东小程序
  HARMONY = 'harmony', // 鸿蒙OS
  DD = 'dd', // 钉钉小程序
  QYWX = 'qywx', // 企业微信小程序
  LARK = 'lark', // 飞书小程序
  KWAI = 'kwai', // 快手小程序
}

/**
 * 适配器通用选项
 */
export interface AdapterOptions {
  /**
   * 平台类型
   */
  platform?: Platform;

  /**
   * 画布ID
   */
  canvasId?: string;

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
   * 设备像素比
   */
  devicePixelRatio?: number;

  /**
   * 初始化回调
   */
  onInit?: (instance: any) => void;

  /**
   * 容器引用
   */
  containerRef?: any;

  /**
   * 图表选项
   */
  option?: any;

  /**
   * 渲染器类型
   */
  renderer?: 'canvas' | 'svg';

  /**
   * 样式对象
   */
  style?: any;

  /**
   * CSS类名
   */
  className?: string;
}

/**
 * H5环境适配器选项
 */
export interface H5AdapterOptions extends AdapterOptions {
  /**
   * 容器引用
   */
  containerRef?: React.RefObject<HTMLDivElement>;

  /**
   * 图表选项
   */
  option?: any;

  /**
   * 是否不合并选项
   */
  notMerge?: boolean;

  /**
   * 是否延迟更新
   */
  lazyUpdate?: boolean;

  /**
   * 样式
   */
  style?: React.CSSProperties;

  /**
   * 类名
   */
  className?: string;

  /**
   * 渲染器类型
   */
  renderer?: 'canvas' | 'svg';
}

/**
 * 小程序适配器基础选项
 */
export interface MiniAppAdapterOptions extends AdapterOptions {
  /**
   * 小程序组件实例
   */
  componentInstance?: any;

  /**
   * 是否禁用touch事件
   */
  disableTouch?: boolean;

  /**
   * 渲染模式
   */
  renderMode?: '2d' | 'webgl';

  /**
   * 图表配置选项
   */
  option?: any;

  /**
   * 样式属性
   */
  style?: React.CSSProperties;
}

/**
 * 微信小程序适配器选项
 */
export interface WeappAdapterOptions extends MiniAppAdapterOptions {
  /**
   * 微信特有选项
   */
  weappOptions?: {
    /**
     * 是否启用右侧菜单
     */
    enableContextMenu?: boolean;

    /**
     * 是否启用跨端同层渲染
     */
    enableCrossPageTransfer?: boolean;
  };
}

/**
 * 支付宝小程序适配器选项
 */
export interface AlipayAdapterOptions extends MiniAppAdapterOptions {
  /**
   * 支付宝特有选项
   */
  alipayOptions?: {
    /**
     * 是否启用离屏渲染
     */
    enableOffscreenRendering?: boolean;
  };
}

/**
 * 百度小程序适配器选项
 */
export interface SwanAdapterOptions extends MiniAppAdapterOptions {
  /**
   * 百度智能小程序特有选项
   */
  swanOptions?: {
    /**
     * 是否启用复杂交互
     */
    enableComplexInteraction?: boolean;

    /**
     * 是否启用性能优化
     */
    enablePerformanceOptimization?: boolean;
  };
}

/**
 * 鸿蒙OS适配器选项
 */
export interface HarmonyAdapterOptions extends AdapterOptions {
  /**
   * 鸿蒙特有选项
   */
  harmonyOptions?: {
    /**
     * 是否启用硬件加速
     */
    enableHardwareAcceleration?: boolean;
  };
}

/**
 * 适配器接口
 */
export interface Adapter {
  /**
   * 初始化图表
   */
  init(): any;

  /**
   * 获取图表实例
   */
  getInstance(): any;

  /**
   * 设置图表配置项
   */
  setOption(option: any, opts?: any): void;

  /**
   * 获取图表宽度
   */
  getWidth(): number;

  /**
   * 获取图表高度
   */
  getHeight(): number;

  /**
   * 获取DOM元素
   */
  getDom(): HTMLElement | null;

  /**
   * 调整图表大小
   */
  resize(opts?: any): void;

  /**
   * 触发图表行为
   */
  dispatchAction(payload: any): void;

  /**
   * 转换为DataURL
   */
  convertToDataURL(opts?: any): string | undefined;

  /**
   * 清空图表
   */
  clear(): void;

  /**
   * 获取DataURL
   */
  getDataURL(opts?: any): string | undefined;

  /**
   * 绑定事件
   */
  on(eventName: string, handler: any, context?: object): void;

  /**
   * 解绑事件
   */
  off(eventName: string, handler?: Function): void;

  /**
   * 显示加载动画
   */
  showLoading(opts?: object): void;

  /**
   * 隐藏加载动画
   */
  hideLoading(): void;

  /**
   * 销毁图表实例
   */
  dispose(): void;

  /**
   * 渲染图表
   */
  render(): JSX.Element;
}
