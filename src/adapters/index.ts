/**
 * TaroViz 平台适配器
 * 自动检测并加载适合当前平台的适配器
 *
 * 使用动态导入实现按需加载，减少包体积
 */

import { PlatformType } from '../core';
import { detectRuntime } from '../core/utils/runtime';
import type { RuntimeInfo } from '../core/utils/runtime';
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

/** Map RuntimeInfo miniAppType to PlatformType */
const MINI_APP_TO_PLATFORM: Record<string, PlatformType> = {
  weapp: PlatformType.WEAPP,
  alipay: PlatformType.ALIPAY,
  swan: PlatformType.SWAN,
  tt: PlatformType.TT,
  qq: PlatformType.QQ,
  jd: PlatformType.JD,
  dd: PlatformType.DD,
  qywx: PlatformType.QYWX,
  lark: PlatformType.LARK,
  kwai: PlatformType.KWAI,
};

/**
 * 检测当前运行的平台环境
 *
 * Delegates to the unified detectRuntime() and maps the result to PlatformType.
 * Also checks for HarmonyOS via userAgent, which is not a mini-app.
 */
export function detectPlatform(): PlatformType {
  const runtime: RuntimeInfo = detectRuntime();

  if (runtime.platform === 'miniapp' && runtime.miniAppType) {
    return MINI_APP_TO_PLATFORM[runtime.miniAppType] ?? PlatformType.H5;
  }

  // HarmonyOS: detected via userAgent in browser context
  if (runtime.platform === 'browser' && typeof navigator !== 'undefined') {
    if (navigator.userAgent.includes('HarmonyOS')) {
      return PlatformType.HARMONY;
    }
  }

  return PlatformType.H5;
}

/**
 * 判断运行环境
 */
export function getEnv(): 'h5' | 'weapp' | 'unknown' {
  const runtime = detectRuntime();

  if (runtime.isBrowser) {
    return 'h5';
  }
  if (runtime.isMiniApp && runtime.miniAppType === 'weapp') {
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

        return h5Adapter.create(options as any);
      }
      case PlatformType.WEAPP: {
        const { createWeappAdapter } = await import('./weapp');
        return createWeappAdapter(options as any);
      }
      case PlatformType.SWAN: {
        const { createSwanAdapter } = await import('./swan');
        return createSwanAdapter(options as any);
      }
      case PlatformType.TT: {
        const { createTTAdapter } = await import('./tt');
        return createTTAdapter(options as any);
      }
      case PlatformType.HARMONY: {
        const { HarmonyAdapter } = (await import('./harmony')) as unknown as {
          HarmonyAdapter: { create: (_opts: object) => Adapter };
        };
        return HarmonyAdapter.create(options);
      }
      default: {
        const { default: h5Adapter } = await import('./h5');

        return h5Adapter.create(options as any);
      }
    }
  } catch (error) {
    console.error(`[TaroViz] Failed to load adapter for platform '${platform}':`, error);
    // 降级到 H5 适配器
    const { default: h5Adapter } = await import('./h5');

    return h5Adapter.create(options as any);
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
// 导出版本信息
export { VERSION as version } from '../core/version';

export * from './types';

export default {
  getAdapter,
  getEnv,
  detectPlatform,
};
