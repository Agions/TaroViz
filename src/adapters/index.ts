/**
 * TaroViz 平台适配器
 * 自动检测并加载适合当前平台的适配器
 */

import { PlatformType } from '../core';

import type { AdapterOptions, Adapter } from './types';

/**
 * 平台配置映射
 */
interface PlatformConfig {
  name: string;
  requireComponent?: boolean;
}

const PLATFORM_CONFIGS: Record<PlatformType, PlatformConfig> = {
  [PlatformType.H5]: { name: 'H5' },
  [PlatformType.WEAPP]: { name: 'Wechat', requireComponent: true },
  [PlatformType.ALIPAY]: { name: 'Alipay', requireComponent: true },
  [PlatformType.SWAN]: { name: 'Baidu', requireComponent: true },
  [PlatformType.TT]: { name: 'ByteDance', requireComponent: true },
  [PlatformType.QQ]: { name: 'QQ', requireComponent: true },
  [PlatformType.JD]: { name: 'JD', requireComponent: true },
  [PlatformType.DD]: { name: 'DingTalk', requireComponent: true },
  [PlatformType.QYWX]: { name: 'QiyeWechat' },
  [PlatformType.LARK]: { name: 'Lark' },
  [PlatformType.HARMONY]: { name: 'HarmonyOS', requireComponent: true },
};

/**
 * 检测当前运行的平台环境
 */
export function detectPlatform(): PlatformType {
  if (typeof window === 'undefined') {
    return PlatformType.H5;
  }

  const checks: Array<{ test: () => boolean; platform: PlatformType }> = [
    { test: () => 'wx' in window && (window as any).wx?.getSystemInfoSync && !(window as any).wx?.qy, platform: PlatformType.WEAPP },
    { test: () => 'my' in window && (window as any).my?.getSystemInfoSync, platform: PlatformType.ALIPAY },
    { test: () => 'swan' in window && (window as any).swan?.getSystemInfoSync, platform: PlatformType.SWAN },
    { test: () => 'tt' in window && (window as any).tt?.getSystemInfoSync, platform: PlatformType.TT },
    { test: () => 'qq' in window && (window as any).qq?.getSystemInfoSync, platform: PlatformType.QQ },
    { test: () => 'jd' in window && (window as any).jd?.getSystemInfoSync, platform: PlatformType.JD },
    { test: () => 'dd' in window && (window as any).dd?.getSystemInfoSync, platform: PlatformType.DD },
    { test: () => 'wx' in window && (window as any).wx?.qy, platform: PlatformType.QYWX },
    { test: () => 'tt' in window && (window as any).tt?.env?.appName === 'lark', platform: PlatformType.LARK },
    { test: () => navigator.userAgent.includes('HarmonyOS'), platform: PlatformType.HARMONY },
  ];

  for (const check of checks) {
    if (check.test()) {
      return check.platform;
    }
  }

  return PlatformType.H5;
}

/**
 * 判断运行环境
 */
export function getEnv(): 'h5' | 'weapp' | 'unknown' {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    return 'h5';
  }
  if (typeof global !== 'undefined' && (global as any)?.wx?.getSystemInfoSync) {
    return 'weapp';
  }
  return 'unknown';
}

/**
 * 创建适配器实例
 */
function createAdapterInstance(platform: PlatformType, options: AdapterOptions): Adapter {
  const adapters: Record<PlatformType, () => Adapter> = {
    [PlatformType.H5]: () => require('./h5').default.create(options),
    [PlatformType.WEAPP]: () => require('./weapp').default.create(options),
    [PlatformType.SWAN]: () => require('./swan').default.create(options),
    [PlatformType.TT]: () => require('./tt').default.create(options),
    [PlatformType.HARMONY]: () => require('./harmony').default.create(options),
    [PlatformType.ALIPAY]: () => require('./h5').default.create(options),
    [PlatformType.QQ]: () => require('./h5').default.create(options),
    [PlatformType.JD]: () => require('./h5').default.create(options),
    [PlatformType.DD]: () => require('./h5').default.create(options),
    [PlatformType.QYWX]: () => require('./h5').default.create(options),
    [PlatformType.LARK]: () => require('./h5').default.create(options),
  };

  return adapters[platform]();
}

/**
 * 获取适配器
 */
export function getAdapter(options: AdapterOptions): Adapter {
  const platform = detectPlatform();
  const config = PLATFORM_CONFIGS[platform];

  // 检查是否需要 component 属性
  if (config?.requireComponent && !('component' in options)) {
    console.warn(`[TaroViz] ${config.name}Adapter requires component property, fallback to H5Adapter`);
  }

  try {
    return createAdapterInstance(platform, options);
  } catch (error) {
    console.error(`[TaroViz] Failed to load adapter for platform '${platform}':`, error);
    return require('./h5').default.create(options);
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
export const version = '1.2.0';

export * from './types';

export default {
  getAdapter,
  getEnv,
  detectPlatform,
  h5: require('./h5').default,
  weapp: require('./weapp').default,
  swan: require('./swan').default,
  tt: require('./tt').default,
  harmony: require('./harmony').default,
};
