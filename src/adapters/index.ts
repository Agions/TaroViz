/**
 * TaroViz 平台适配器
 * 自动检测并加载适合当前平台的适配器
 *
 * 使用动态导入实现按需加载，减少包体积
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
  [PlatformType.KWAI]: { name: 'Kwai', requireComponent: true },
  [PlatformType.HARMONY]: { name: 'HarmonyOS', requireComponent: true },
};

/**
 * 检测当前运行的平台环境
 */
export function detectPlatform(): PlatformType {
  if (typeof window === 'undefined') {
    return PlatformType.H5;
  }

  const win = window as Window & {
    wx?: { getSystemInfoSync?: unknown; qy?: unknown };
    my?: { getSystemInfoSync?: unknown };
    swan?: { getSystemInfoSync?: unknown };
    tt?: { getSystemInfoSync?: unknown; env?: { appName?: string } };
    qq?: { getSystemInfoSync?: unknown };
    jd?: { getSystemInfoSync?: unknown };
    dd?: { getSystemInfoSync?: unknown };
  };

  const checks: Array<{ test: () => boolean; platform: PlatformType }> = [
    { test: () => !!win.wx?.getSystemInfoSync && !win.wx?.qy, platform: PlatformType.WEAPP },
    { test: () => !!win.my?.getSystemInfoSync, platform: PlatformType.ALIPAY },
    { test: () => !!win.swan?.getSystemInfoSync, platform: PlatformType.SWAN },
    { test: () => !!win.tt?.getSystemInfoSync, platform: PlatformType.TT },
    { test: () => !!win.qq?.getSystemInfoSync, platform: PlatformType.QQ },
    { test: () => !!win.jd?.getSystemInfoSync, platform: PlatformType.JD },
    { test: () => !!win.dd?.getSystemInfoSync, platform: PlatformType.DD },
    { test: () => !!win.wx?.qy, platform: PlatformType.QYWX },
    { test: () => win.tt?.env?.appName === 'lark', platform: PlatformType.LARK },
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
  if (
    typeof global !== 'undefined' &&
    (global as Global & { wx?: { getSystemInfoSync?: unknown } })?.wx?.getSystemInfoSync
  ) {
    return 'weapp';
  }
  return 'unknown';
}

/**
 * 获取适配器
 * 返回 Promise 以支持动态导入
 */
export async function getAdapter(options: AdapterOptions): Promise<Adapter> {
  const platform = detectPlatform();
  const config = PLATFORM_CONFIGS[platform];

  // 检查是否需要 component 属性
  if (config?.requireComponent && !('component' in options)) {
    console.warn(
      `[TaroViz] ${config.name}Adapter requires component property, fallback to H5Adapter`
    );
  }

  try {
    // 根据平台加载对应的适配器
    switch (platform) {
      case PlatformType.H5:
      case PlatformType.ALIPAY:
      case PlatformType.QQ:
      case PlatformType.JD:
      case PlatformType.DD:
      case PlatformType.QYWX:
      case PlatformType.LARK:
      case PlatformType.KWAI: {
        const { default: h5Adapter } = await import('./h5');
        return h5Adapter.create(options);
      }
      case PlatformType.WEAPP: {
        const { default: weappAdapter } = await import('./weapp');
        return weappAdapter.create(options);
      }
      case PlatformType.SWAN: {
        const { default: swanAdapter } = await import('./swan');
        return swanAdapter.create(options);
      }
      case PlatformType.TT: {
        const { default: ttAdapter } = await import('./tt');
        return ttAdapter.create(options);
      }
      case PlatformType.HARMONY: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { HarmonyAdapter } = await import('./harmony') as unknown as { HarmonyAdapter: { create: (opts: object) => Adapter } };
        return HarmonyAdapter.create(options);
      }
      default: {
        const { default: h5Adapter } = await import('./h5');
        return h5Adapter.create(options);
      }
    }
  } catch (error) {
    console.error(`[TaroViz] Failed to load adapter for platform '${platform}':`, error);
    // 降级到 H5 适配器
    const { default: h5Adapter } = await import('./h5');
    return h5Adapter.create(options);
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
};
