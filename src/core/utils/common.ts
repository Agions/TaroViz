/**
 * Environment detection utilities
 *
 * Backward-compatible re-exports that delegate to the unified detectRuntime()
 * in ./runtime.ts. New code should import detectRuntime() directly.
 */

import { detectRuntime as _detectRuntime } from './runtime';

export { detectRuntime, resetRuntimeCache } from './runtime';
export type { RuntimeInfo, MiniAppType } from './runtime';

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
export const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * 是否为NodeJS环境
 * @returns 是否为NodeJS环境
 */
export const isNode = (() => {
  try {
    return (
      typeof process !== 'undefined' &&
      (process as any).versions &&
      (process as any).versions.node &&
      Object.prototype.toString.call((globalThis as any).process) === '[object process]'
    );
  } catch {
    return false;
  }
})();

/**
 * 是否为React Native环境
 * @returns 是否为React Native环境
 */
export const isReactNative =
  typeof navigator !== 'undefined' && (navigator as any).product === 'ReactNative';

/**
 * 是否为小程序环境
 *
 * Delegates to detectRuntime() for unified detection.
 * Cached internally — repeated calls are cheap.
 * @returns 是否为小程序环境
 */
export const isMiniApp = (): boolean => _detectRuntime().isMiniApp;
