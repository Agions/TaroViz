// Re-export barrel file — all public APIs preserved
// External import paths remain unchanged

// 事件常量
export { events } from './events';

// 对象合并
export { deepMerge } from './merge';

// 格式化与颜色工具
export { formatNumber, getContrastColor } from './format';

// 检测当前环境（简易版，向后兼容）
export { getEnvironment } from './runtime';

// 统一运行时检测
export { detectRuntime, resetRuntimeCache } from './runtime';
export type { RuntimeInfo, MiniAppType } from './runtime';

// UUID工具函数
export { uuid, shortId, prefixedId } from './uuid';

// 国际化工具
import * as i18n from './i18n';
export { i18n };

// 性能优化工具（含 debounce, throttle, DebounceManager 等）
export * from './performanceUtils';
export { DebounceManager } from './performanceUtils';
