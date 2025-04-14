/**
 * TaroViz 平台适配器
 * 自动检测并加载适合当前平台的适配器
 */

import { PlatformType } from '@agions/taroviz-core';

import H5Adapter from './h5';
import type { AdapterOptions } from './types';
import WeappAdapter from './weapp';

// 本地定义Adapter接口以避免导入问题
interface Adapter {
  init(): any;
  dispose(): void;
  // 其他必要的接口定义
}

// 定义全局 wx 接口以避免编译错误
declare const _wx: {
  getSystemInfoSync: () => any;
  [key: string]: any;
};

// 扩展全局变量类型定义
declare global {
  interface Global {
    wx?: {
      getSystemInfoSync: () => any;
      [key: string]: any;
    };
  }
}

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
 * 动态导入适配器
 * @param platform 平台类型
 * @returns 适配器类
 */
async function _loadAdapter(platform: PlatformType): Promise<any> {
  switch (platform) {
    case PlatformType.WEAPP:
      return (await import('./weapp')).default;
    case PlatformType.ALIPAY:
      return (await import('./alipay')).default;
    case PlatformType.SWAN:
      return (await import('./swan')).default;
    case PlatformType.HARMONY:
      return (await import('./harmony')).default;
    case PlatformType.DD:
      return (await import('./dd')).default;
    case PlatformType.QYWX:
      return (await import('./qywx')).default;
    case PlatformType.LARK:
      return (await import('./lark')).default;
    case PlatformType.H5:
    default:
      return (await import('./h5')).default;
  }
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
  const env = getEnv();

  switch (env) {
    case 'h5':
      return H5Adapter.create(options) as Adapter;
    case 'weapp':
      // 微信小程序环境需要component属性
      // 如果提供了component，则使用WeappAdapter
      // 否则回退到H5Adapter
      if ('component' in options) {
        return WeappAdapter.create(options as any) as Adapter;
      }
      console.error('[TaroViz] WeappAdapter requires component property, fallback to H5Adapter');
      return H5Adapter.create(options) as Adapter;
    default:
      console.warn(`[TaroViz] Environment '${env}' not supported, fallback to H5Adapter`);
      return H5Adapter.create(options) as Adapter;
  }
}

// 导出所有适配器
export { default as H5Adapter } from './h5';
export { default as WeappAdapter } from './weapp';
export { default as AlipayAdapter } from './alipay';
export { default as SwanAdapter } from './swan';
export { default as HarmonyAdapter } from './harmony';
export { default as DDAdapter } from './dd';
export { default as QYWXAdapter } from './qywx';
export { default as LarkAdapter } from './lark';

/**
 * 版本信息
 */
export const version = '0.5.0';

export * from './types';

export default {
  getAdapter,
  getEnv,
  h5: H5Adapter,
  weapp: WeappAdapter,
};
