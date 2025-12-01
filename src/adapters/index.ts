/**
 * TaroViz 平台适配器
 * 自动检测并加载适合当前平台的适配器
 */

import { PlatformType } from '../core';

import type { AdapterOptions, Adapter } from './types';

/**
 * 检测当前运行的平台环境
 * @returns 当前平台类型
 */
export function detectPlatform(): PlatformType {
  // 服务端渲染环境
  if (typeof window === 'undefined') {
    return PlatformType.H5; // 默认返回H5，实际并不会在服务端渲染图表
  }

  // 微信小程序
  if (
    typeof window !== 'undefined' &&
    'wx' in window &&
    typeof (window as any).wx.getSystemInfoSync === 'function'
  ) {
    return PlatformType.WEAPP;
  }

  // 支付宝小程序
  if (
    typeof window !== 'undefined' &&
    'my' in window &&
    typeof (window as any).my.getSystemInfoSync === 'function'
  ) {
    return PlatformType.ALIPAY;
  }

  // 百度小程序
  if (
    typeof window !== 'undefined' &&
    'swan' in window &&
    typeof (window as any).swan.getSystemInfoSync === 'function'
  ) {
    return PlatformType.SWAN;
  }

  // 字节跳动小程序
  if (
    typeof window !== 'undefined' &&
    'tt' in window &&
    typeof (window as any).tt.getSystemInfoSync === 'function'
  ) {
    return PlatformType.TT;
  }

  // QQ小程序
  if (
    typeof window !== 'undefined' &&
    'qq' in window &&
    typeof (window as any).qq.getSystemInfoSync === 'function'
  ) {
    return PlatformType.QQ;
  }

  // 京东小程序
  if (
    typeof window !== 'undefined' &&
    'jd' in window &&
    typeof (window as any).jd.getSystemInfoSync === 'function'
  ) {
    return PlatformType.JD;
  }

  // 钉钉小程序
  if (
    typeof window !== 'undefined' &&
    'dd' in window &&
    typeof (window as any).dd.getSystemInfoSync === 'function'
  ) {
    return PlatformType.DD;
  }

  // 企业微信小程序
  if (typeof window !== 'undefined' && 'wx' in window && 'qy' in (window as any).wx) {
    return PlatformType.QYWX;
  }

  // 飞书小程序
  if (
    typeof window !== 'undefined' &&
    'tt' in window &&
    typeof (window as any).tt.getSystemInfoSync === 'function' &&
    (window as any).tt.env?.appName === 'lark'
  ) {
    return PlatformType.LARK;
  }

  // 鸿蒙OS（通过UserAgent判断）
  if (typeof navigator !== 'undefined' && navigator.userAgent.includes('HarmonyOS')) {
    return PlatformType.HARMONY;
  }

  // 默认为H5
  return PlatformType.H5;
}

/**
 * 判断运行环境
 * @returns 当前环境类型 ('h5' | 'weapp' | 'unknown')
 */
export function getEnv(): 'h5' | 'weapp' | 'unknown' {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    return 'h5';
  } else if (
    typeof global !== 'undefined' &&
    typeof (global as any)['wx'] !== 'undefined' &&
    typeof (global as any)['wx'].getSystemInfoSync === 'function'
  ) {
    return 'weapp';
  }
  return 'unknown';
}

/**
 * 获取适配器
 * @param options 适配器选项
 * @returns 适配器实例
 */
export function getAdapter(options: AdapterOptions): Adapter {
  const platform = detectPlatform();

  try {
    switch (platform) {
      case PlatformType.H5: {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const H5Adapter = require('./h5').default;
        return H5Adapter.create(options) as Adapter;
      }
      case PlatformType.WEAPP: {
        // 微信小程序环境需要component属性
        // 如果提供了component，则使用WeappAdapter
        // 否则回退到H5Adapter
        if ('component' in options) {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const WeappAdapter = require('./weapp').default;
          return WeappAdapter.create(options as any) as Adapter;
        }
        console.error('[TaroViz] WeappAdapter requires component property, fallback to H5Adapter');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const FallbackH5Adapter = require('./h5').default;
        return FallbackH5Adapter.create(options) as Adapter;
      }
      case PlatformType.SWAN: {
        // 百度小程序环境需要component属性
        if ('component' in options) {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const SwanAdapter = require('./swan').default;
          return SwanAdapter.create(options as any) as Adapter;
        }
        console.error('[TaroViz] SwanAdapter requires component property, fallback to H5Adapter');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const FallbackH5Adapter = require('./h5').default;
        return FallbackH5Adapter.create(options) as Adapter;
      }
      case PlatformType.TT: {
        // 字节跳动小程序环境需要component属性
        if ('component' in options) {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const TTAdapter = require('./tt').default;
          return TTAdapter.create(options as any) as Adapter;
        }
        console.error('[TaroViz] TTAdapter requires component property, fallback to H5Adapter');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const FallbackH5Adapter = require('./h5').default;
        return FallbackH5Adapter.create(options) as Adapter;
      }
      case PlatformType.HARMONY: {
        // HarmonyOS环境需要component属性
        if ('component' in options) {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const HarmonyAdapter = require('./harmony').default;
          return HarmonyAdapter.create(options as any) as Adapter;
        }
        console.error(
          '[TaroViz] HarmonyAdapter requires component property, fallback to H5Adapter'
        );
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const FallbackH5Adapter = require('./h5').default;
        return FallbackH5Adapter.create(options) as Adapter;
      }
      default: {
        console.warn(`[TaroViz] Platform '${platform}' not supported, fallback to H5Adapter`);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const DefaultH5Adapter = require('./h5').default;
        return DefaultH5Adapter.create(options) as Adapter;
      }
    }
  } catch (error) {
    console.error(`[TaroViz] Failed to load adapter for platform '${platform}':`, error);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const DefaultH5Adapter = require('./h5').default;
    return DefaultH5Adapter.create(options) as Adapter;
  }
}

// 导出所有适配器
export { default as H5Adapter } from './h5';
export { default as WeappAdapter } from './weapp';
export { default as SwanAdapter } from './swan';
export { default as TTAdapter } from './tt';
export { default as HarmonyAdapter } from './harmony';

/**
 * 版本信息
 */
export const version = '1.1.1';

export * from './types';

export default {
  getAdapter,
  getEnv,
  detectPlatform,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  h5: require('./h5').default,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  weapp: require('./weapp').default,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  swan: require('./swan').default,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  tt: require('./tt').default,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  harmony: require('./harmony').default,
};
