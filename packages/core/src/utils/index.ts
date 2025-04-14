// 通用工具函数
export * from './common';

// 图表实例管理
export * from './chartInstances';

// 事件定义
export const events = {
  click: 'click',
  mousemove: 'mousemove',
  mouseup: 'mouseup',
  mousedown: 'mousedown',
  mouseover: 'mouseover',
  mouseout: 'mouseout',
  globalout: 'globalout',
};

/**
 * 导出所有工具函数
 */
export * from './uuid';

/**
 * 深度合并对象
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的对象
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Record<string, any>
): T {
  const result: any = { ...target };

  Object.keys(source).forEach(key => {
    if (source[key] instanceof Object && key in target && target[key] instanceof Object) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  });

  return result;
}

/**
 * 防抖函数
 * @param fn 需要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

/**
 * 节流函数
 * @param fn 需要节流的函数
 * @param interval 间隔时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number
): (...args: Parameters<T>) => void {
  let lastTime = 0;

  return function (this: any, ...args: Parameters<T>): void {
    const now = Date.now();

    if (now - lastTime >= interval) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

/**
 * 检测当前环境
 * @returns 环境信息
 */
/**
 * 检测当前环境
 * @returns 环境信息
 */
export function getEnvironment() {
  const isServer = typeof window === 'undefined';
  const isClient = !isServer;

  // 使用类型断言解决wx和my未定义的问题
  const isWeapp =
    typeof (window as any)['wx'] !== 'undefined' &&
    typeof (window as any)['wx'].getSystemInfoSync === 'function';
  const isAlipay =
    typeof (window as any)['my'] !== 'undefined' &&
    typeof (window as any)['my'].getSystemInfoSync === 'function';
  const isWeb = isClient && !isWeapp && !isAlipay;

  return {
    isServer,
    isClient,
    isWeapp,
    isAlipay,
    isWeb,
  };
}

/**
 * 格式化数值
 * @param value 要格式化的数值
 * @param digits 小数位数
 * @param options 配置选项
 * @returns 格式化后的字符串
 */
export function formatNumber(
  value: number,
  digits: number = 2,
  options: {
    useGrouping?: boolean;
    locale?: string;
  } = {}
): string {
  const { useGrouping = true, locale = 'zh-CN' } = options;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping,
  }).format(value);
}

/**
 * 获取颜色的对比色
 * @param color 十六进制颜色值
 * @returns 对比色
 */
export function getContrastColor(color: string): string {
  // 移除#前缀
  const hex = color.replace('#', '');

  // 转换为RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // 计算亮度
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // 根据亮度返回黑色或白色
  return brightness > 128 ? '#000000' : '#FFFFFF';
}
