/**
 * TaroViz 平台适配器类型定义
 */
import { AdapterConfig, EChartsType, PlatformType, Adapter as CoreAdapter } from '@taroviz/core/types';

/**
 * 重导出核心Adapter类型
 */
export type Adapter = CoreAdapter;

/**
 * 平台类型枚举
 */
export { PlatformType } from '@taroviz/core/types';

/**
 * 检测当前运行的平台环境
 * @returns 当前平台类型
 */
export function detectPlatform(): PlatformType;

/**
 * 获取适配器实例
 * @param config 配置信息
 * @returns 适配器实例
 */
export function getAdapter(config: AdapterConfig): Adapter;

/**
 * H5适配器
 */
export class H5Adapter implements Adapter {
  constructor(config: AdapterConfig);
  init(): EChartsType | null;
  dispose(): void;
  resize(width?: number | string, height?: number | string): void;
  getName(): string;
  getVersion(): string;
  getPlatformInfo(): Record<string, any>;
}

/**
 * 微信小程序适配器
 */
export class WeappAdapter implements Adapter {
  constructor(config: AdapterConfig);
  init(): EChartsType | null;
  dispose(): void;
  resize(width?: number | string, height?: number | string): void;
  getName(): string;
  getVersion(): string;
  getPlatformInfo(): Record<string, any>;
}

/**
 * 支付宝小程序适配器
 */
export class AlipayAdapter implements Adapter {
  constructor(config: AdapterConfig);
  init(): EChartsType | null;
  dispose(): void;
  resize(width?: number | string, height?: number | string): void;
  getName(): string;
  getVersion(): string;
  getPlatformInfo(): Record<string, any>;
}

/**
 * 百度小程序适配器
 */
export class SwanAdapter implements Adapter {
  constructor(config: AdapterConfig);
  init(): EChartsType | null;
  dispose(): void;
  resize(width?: number | string, height?: number | string): void;
  getName(): string;
  getVersion(): string;
  getPlatformInfo(): Record<string, any>;
}

/**
 * 鸿蒙OS适配器
 */
export class HarmonyAdapter implements Adapter {
  constructor(config: AdapterConfig);
  init(): EChartsType | null;
  dispose(): void;
  resize(width?: number | string, height?: number | string): void;
  getName(): string;
  getVersion(): string;
  getPlatformInfo(): Record<string, any>;
}

/**
 * 钉钉小程序适配器
 */
export class DDAdapter implements Adapter {
  constructor(config: AdapterConfig);
  init(): EChartsType | null;
  dispose(): void;
  resize(width?: number | string, height?: number | string): void;
  getName(): string;
  getVersion(): string;
  getPlatformInfo(): Record<string, any>;
}

/**
 * 企业微信小程序适配器
 */
export class QYWXAdapter implements Adapter {
  constructor(config: AdapterConfig);
  init(): EChartsType | null;
  dispose(): void;
  resize(width?: number | string, height?: number | string): void;
  getName(): string;
  getVersion(): string;
  getPlatformInfo(): Record<string, any>;
}

/**
 * 飞书小程序适配器
 */
export class LarkAdapter implements Adapter {
  constructor(config: AdapterConfig);
  init(): EChartsType | null;
  dispose(): void;
  resize(width?: number | string, height?: number | string): void;
  getName(): string;
  getVersion(): string;
  getPlatformInfo(): Record<string, any>;
}

/**
 * 版本信息
 */
export const version: string; 