/**
 * TaroViz 调试工具入口文件
 */

// 导出类型定义
export * from './types';

// 导出调试面板组件
export { DebugPanel } from './DebugPanel';

// 导出调试工具函数
export {
  initDebugger,
  getDebugInfo,
  updateDebugInfo,
  addDebugEvent,
  addDebugError,
  clearDebugInfo,
  enableDebugging,
  disableDebugging,
} from './debugger';
