/**
 * TaroViz 代码示例生成器入口
 */

// 导出类型定义
export * from './types';

// 导出代码示例生成器类
export { CodeGenerator } from './CodeGenerator';

// 导出默认实例
import { CodeGenerator } from './CodeGenerator';
export const codeGenerator = CodeGenerator.getInstance();
