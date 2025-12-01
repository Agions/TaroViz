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
export const isReactNative =
  typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

/**
 * 是否为小程序环境
 * @returns 是否为小程序环境
 */
export const isMiniApp = (): boolean => {
  // 使用类型断言来安全地检查全局变量
  const globalObj =
    typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};

  if (typeof (globalObj as any).wx !== 'undefined') {
    return true;
  }
  if (typeof (globalObj as any).my !== 'undefined') {
    return true;
  }
  if (typeof (globalObj as any).swan !== 'undefined') {
    return true;
  }
  if (typeof (globalObj as any).tt !== 'undefined') {
    return true;
  }
  if (typeof (globalObj as any).jd !== 'undefined') {
    return true;
  }

  return false;
};
