/**
 * TaroViz 图表配置生成器入口
 */

// 导出类型定义
export * from './types';

// 导出配置生成器类
export { ConfigGenerator } from './ConfigGenerator';

// 导出默认实例
import { ConfigGenerator } from './ConfigGenerator';
export const configGenerator = ConfigGenerator.getInstance();
