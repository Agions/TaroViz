/**
 * Unified runtime detection for TaroViz
 *
 * Consolidates environment detection logic that was previously duplicated
 * between core/utils/common.ts and adapters/index.ts.
 */

/** Mini-app platform subtypes */
export type MiniAppType =
  | 'weapp'
  | 'alipay'
  | 'swan'
  | 'tt'
  | 'qq'
  | 'jd'
  | 'dd'
  | 'kwai'
  | 'qywx'
  | 'lark';

/** Unified runtime information */
export interface RuntimeInfo {
  platform: 'browser' | 'node' | 'miniapp' | 'react-native' | 'unknown';
  miniAppType?: MiniAppType;
  isBrowser: boolean;
  isNode: boolean;
  isMiniApp: boolean;
  isReactNative: boolean;
}

/** Cached runtime result — detection only runs once */
let cachedRuntime: RuntimeInfo | null = null;

/**
 * Reset the cached runtime info (useful for testing).
 */
export function resetRuntimeCache(): void {
  cachedRuntime = null;
}

function makeResult(
  platform: RuntimeInfo['platform'],
  opts: Partial<Pick<RuntimeInfo, 'miniAppType'>> = {}
): RuntimeInfo {
  const isMiniApp = platform === 'miniapp';
  const result: RuntimeInfo = {
    platform,
    isBrowser: platform === 'browser',
    isNode: platform === 'node',
    isMiniApp,
    isReactNative: platform === 'react-native',
  };
  if (opts.miniAppType) {
    result.miniAppType = opts.miniAppType;
  }
  cachedRuntime = result;
  return result;
}

/** Safe access to global mini-app objects */
function getGlobalObj(): Record<string, unknown> {
  if (typeof window !== 'undefined') return window as unknown as Record<string, unknown>;
  if (typeof globalThis !== 'undefined') return globalThis as unknown as Record<string, unknown>;
  return {};
}

function hasGetSystemInfoSync(key: string): boolean {
  const g = getGlobalObj();
  const obj = g[key];
  return (
    typeof obj !== 'undefined' &&
    typeof (obj as Record<string, unknown>)?.getSystemInfoSync === 'function'
  );
}

/**
 * Detect the current runtime environment.
 *
 * Combines detection logic from:
 * - src/core/utils/common.ts (isBrowser, isNode, isReactNative, isMiniApp)
 * - src/adapters/index.ts (detectPlatform with getSystemInfoSync checks)
 *
 * Results are cached after the first call.
 */
export function detectRuntime(): RuntimeInfo {
  if (cachedRuntime) return cachedRuntime;

  const g = getGlobalObj();

  // --- Mini-app detection (order matters: more specific checks first) ---

  // Enterprise WeChat must be checked before regular WeChat
  const wx = g['wx'] as Record<string, unknown> | undefined;
  if (typeof wx !== 'undefined' && wx?.qy) {
    return makeResult('miniapp', { miniAppType: 'qywx' });
  }

  if (hasGetSystemInfoSync('wx')) {
    return makeResult('miniapp', { miniAppType: 'weapp' });
  }

  if (hasGetSystemInfoSync('my')) {
    return makeResult('miniapp', { miniAppType: 'alipay' });
  }

  if (hasGetSystemInfoSync('swan')) {
    return makeResult('miniapp', { miniAppType: 'swan' });
  }

  if (hasGetSystemInfoSync('tt')) {
    // Lark (Feishu) runs on the TT runtime but with appName === 'lark'
    const ttObj = g['tt'] as Record<string, unknown> | undefined;
    const env = ttObj?.env as Record<string, unknown> | undefined;
    const isLark = env?.appName === 'lark';
    return makeResult('miniapp', { miniAppType: isLark ? 'lark' : 'tt' });
  }

  if (hasGetSystemInfoSync('qq')) {
    return makeResult('miniapp', { miniAppType: 'qq' });
  }

  if (hasGetSystemInfoSync('jd')) {
    return makeResult('miniapp', { miniAppType: 'jd' });
  }

  if (hasGetSystemInfoSync('dd')) {
    return makeResult('miniapp', { miniAppType: 'dd' });
  }

  // Kwai / Kuaishou: presence of ks global
  if (typeof g['ks'] !== 'undefined') {
    return makeResult('miniapp', { miniAppType: 'kwai' });
  }

  // --- Browser detection ---
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    return makeResult('browser');
  }

  // --- Node.js detection ---
  try {
    const proc = (globalThis as Record<string, unknown>).process as
      | Record<string, unknown>
      | undefined;
    if (
      typeof proc !== 'undefined' &&
      proc.versions &&
      (proc.versions as Record<string, unknown>).node &&
      Object.prototype.toString.call(proc) === '[object process]'
    ) {
      return makeResult('node');
    }
  } catch {
    // ignore
  }

  // --- React Native detection ---
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return makeResult('react-native');
  }

  return makeResult('unknown');
}
