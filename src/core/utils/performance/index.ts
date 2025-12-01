/**
 * TaroViz 性能分析工具入口
 */

// 导出类型定义
export * from './types';

// 导出性能分析器类
export { PerformanceAnalyzer } from './PerformanceAnalyzer';

// 导出默认实例
import { PerformanceAnalyzer } from './PerformanceAnalyzer';
export const performanceAnalyzer = PerformanceAnalyzer.getInstance();
