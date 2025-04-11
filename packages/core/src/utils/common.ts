/**
 * 防抖函数
 * @param fn 需要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @param immediate 是否立即执行
 * @returns 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 200,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let isFirst = true;

  return function(this: any, ...args: Parameters<T>): void {
    const context = this;

    if (timer) {
      clearTimeout(timer);
    }

    if (immediate && isFirst) {
      fn.apply(context, args);
      isFirst = false;
      return;
    }

    timer = setTimeout(() => {
      fn.apply(context, args);
      timer = null;
    }, delay);
  };
}

/**
 * 节流函数
 * @param fn 需要节流的函数
 * @param delay 延迟时间（毫秒）
 * @returns 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 200
): (...args: Parameters<T>) => void {
  let lastTime = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function(this: any, ...args: Parameters<T>): void {
    const now = Date.now();
    const context = this;
    const remaining = delay - (now - lastTime);

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(context, args);
      lastTime = now;
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        lastTime = Date.now();
        timer = null;
      }, remaining);
    }
  };
}



/**
 * 获取DOM元素
 * @param selector 选择器或DOM元素
 * @returns DOM元素
 */
export function getElement(selector: string | Element): Element | null {
  if (typeof selector === 'string') {
    return document.querySelector(selector);
  }
  return selector;
}

/**
 * 是否为浏览器环境
 * @returns 是否为浏览器环境
 */
export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * 是否为NodeJS环境
 * @returns 是否为NodeJS环境
 */
export const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;

/**
 * 是否为React Native环境
 * @returns 是否为React Native环境
 */
export const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

/**
 * 是否为小程序环境
 * @returns 是否为小程序环境
 */
export const isMiniApp = (): boolean => {
  // @ts-ignore 小程序环境变量
  if (typeof wx !== 'undefined') return true;
  // @ts-ignore 支付宝小程序环境变量
  if (typeof my !== 'undefined') return true;
  // @ts-ignore 百度小程序环境变量
  if (typeof swan !== 'undefined') return true;
  // @ts-ignore 字节跳动小程序环境变量
  if (typeof tt !== 'undefined') return true;
  // @ts-ignore 京东小程序环境变量
  if (typeof jd !== 'undefined') return true;
  
  return false;
}; 