/**
 * TaroViz 代码示例生成器类型定义
 */

/**
 * 代码示例框架类型
 */
export type FrameworkType = 'react' | 'vue' | 'vanilla' | 'angular';

/**
 * 代码示例导入类型
 */
export type ImportType = 'esm' | 'cjs' | 'umd';

/**
 * 代码示例主题类型
 */
export type ThemeType = 'light' | 'dark';

/**
 * 代码示例选项
 */
export interface CodeGeneratorOptions {
  /**
   * 框架类型
   */
  framework: FrameworkType;
  /**
   * 导入类型
   */
  importType?: ImportType;
  /**
   * 主题类型
   */
  theme?: ThemeType;
  /**
   * 是否包含样式
   */
  includeStyles?: boolean;
  /**
   * 是否包含数据
   */
  includeData?: boolean;
  /**
   * 是否包含注释
   */
  includeComments?: boolean;
  /**
   * 是否使用TypeScript
   */
  useTypeScript?: boolean;
  /**
   * 图表ID
   */
  chartId?: string;
  /**
   * 组件名称
   */
  componentName?: string;
  /**
   * 其他自定义选项
   */
  [key: string]: any;
}

/**
 * 代码示例模板
 */
export interface CodeExampleTemplate {
  /**
   * 模板名称
   */
  name: string;
  /**
   * 模板描述
   */
  description: string;
  /**
   * 模板适用的框架
   */
  frameworks: FrameworkType[];
  /**
   * 模板内容
   */
  content: string;
  /**
   * 模板变量
   */
  variables?: string[];
}

/**
 * 代码示例生成结果
 */
export interface CodeGeneratorResult {
  /**
   * 生成的代码
   */
  code: string;
  /**
   * 代码语言
   */
  language: string;
  /**
   * 代码框架
   */
  framework: FrameworkType;
  /**
   * 代码导入类型
   */
  importType: ImportType;
  /**
   * 代码主题
   */
  theme: ThemeType;
  /**
   * 生成时间
   */
  generatedAt: number;
  /**
   * 代码文件扩展名
   */
  extension: string;
}

/**
 * 代码示例生成器事件类型
 */
export enum CodeGeneratorEventType {
  /**
   * 代码生成开始事件
   */
  GENERATE_START = 'codeGenerateStart',
  /**
   * 代码生成完成事件
   */
  GENERATE_COMPLETE = 'codeGenerateComplete',
  /**
   * 代码生成失败事件
   */
  GENERATE_ERROR = 'codeGenerateError',
  /**
   * 模板应用事件
   */
  TEMPLATE_APPLY = 'templateApply',
}

/**
 * 代码示例生成器事件处理器
 */
export type CodeGeneratorEventHandler = (event: {
  type: CodeGeneratorEventType;
  data?: any;
}) => void;

/**
 * 代码示例片段
 */
export interface CodeSnippet {
  /**
   * 片段名称
   */
  name: string;
  /**
   * 片段内容
   */
  content: string;
  /**
   * 片段语言
   */
  language: string;
}

/**
 * 完整代码示例
 */
export interface CompleteCodeExample {
  /**
   * 主文件代码
   */
  main: string;
  /**
   * 依赖文件代码
   */
  dependencies?: Record<string, string>;
  /**
   * 配置文件代码
   */
  config?: Record<string, string>;
  /**
   * 示例说明
   */
  description?: string;
  /**
   * 示例标题
   */
  title?: string;
}
