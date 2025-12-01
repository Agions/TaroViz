/**
 * TaroViz 代码示例生成器
 * 用于生成不同框架和导入类型的代码示例
 */

import { EChartsOption } from '../../types';

import {
  CodeGeneratorOptions,
  CodeGeneratorResult,
  CodeExampleTemplate,
  CodeGeneratorEventType,
  CodeGeneratorEventHandler,
  FrameworkType,
  ImportType,
  ThemeType,
} from './types';

/**
 * 代码示例生成器类
 */
export class CodeGenerator {
  private static instance: CodeGenerator | null = null;
  private eventHandlers: Map<CodeGeneratorEventType, CodeGeneratorEventHandler[]> = new Map();
  private templates: Map<string, CodeExampleTemplate> = new Map();

  /**
   * 私有构造函数，使用单例模式
   */
  private constructor() {
    // 初始化内置模板
    this.initBuiltinTemplates();
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): CodeGenerator {
    if (!CodeGenerator.instance) {
      CodeGenerator.instance = new CodeGenerator();
    }
    return CodeGenerator.instance;
  }

  /**
   * 注册事件处理器
   */
  public on(eventType: CodeGeneratorEventType, handler: CodeGeneratorEventHandler): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, []);
    }
    this.eventHandlers.get(eventType)?.push(handler);
  }

  /**
   * 移除事件处理器
   */
  public off(eventType: CodeGeneratorEventType, handler: CodeGeneratorEventHandler): void {
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  /**
   * 触发事件
   */
  private emit(eventType: CodeGeneratorEventType, data?: any): void {
    const handlers = this.eventHandlers.get(eventType);
    handlers?.forEach(handler => {
      try {
        handler({ type: eventType, data });
      } catch (error) {
        console.error('Error in code generator event handler:', error);
      }
    });
  }

  /**
   * 初始化内置模板
   */
  private initBuiltinTemplates(): void {
    // React ESM TypeScript 模板
    this.registerTemplate({
      name: 'react-esm-ts',
      description: 'React ESM TypeScript 代码示例模板',
      frameworks: ['react'],
      content: `import React from 'react';
import { BaseChart } from '@agions/taroviz';
import { EChartsOption } from '@agions/taroviz/types';

const { componentName } = options;
const chartId = options.chartId || 'chart';

const option: EChartsOption = {
  title: {
    text: '图表示例'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['系列1', '系列2']
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '系列1',
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130]
    },
    {
      name: '系列2',
      type: 'line',
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
};

const {componentName} = () => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <BaseChart
        chartId={chartId}
        option={option}
      />
    </div>
  );
};

export default {componentName};`,
      variables: ['componentName', 'chartId', 'option'],
    });

    // React ESM JavaScript 模板
    this.registerTemplate({
      name: 'react-esm-js',
      description: 'React ESM JavaScript 代码示例模板',
      frameworks: ['react'],
      content: `import React from 'react';
import { BaseChart } from '@agions/taroviz';

const { componentName } = options;
const chartId = options.chartId || 'chart';

const option = {
  title: {
    text: '图表示例'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['系列1', '系列2']
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '系列1',
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130]
    },
    {
      name: '系列2',
      type: 'line',
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
};

const {componentName} = () => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <BaseChart
        chartId={chartId}
        option={option}
      />
    </div>
  );
};

export default {componentName};`,
      variables: ['componentName', 'chartId', 'option'],
    });

    // Vue ESM TypeScript 模板
    this.registerTemplate({
      name: 'vue-esm-ts',
      description: 'Vue ESM TypeScript 代码示例模板',
      frameworks: ['vue'],
      content: `<template>
  <div style="width: 100%; height: 400px;">
    <BaseChart :chart-id="chartId" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BaseChart } from '@agions/taroviz';
import { EChartsOption } from '@agions/taroviz/types';

const chartId = options.chartId || 'chart';

const option: EChartsOption = ref({
  title: {
    text: '图表示例'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['系列1', '系列2']
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '系列1',
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130]
    },
    {
      name: '系列2',
      type: 'line',
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
});
</script>`,
      variables: ['chartId', 'option'],
    });

    // Vue ESM JavaScript 模板
    this.registerTemplate({
      name: 'vue-esm-js',
      description: 'Vue ESM JavaScript 代码示例模板',
      frameworks: ['vue'],
      content: `<template>
  <div style="width: 100%; height: 400px;">
    <BaseChart :chart-id="chartId" :option="option" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BaseChart } from '@agions/taroviz';

const chartId = options.chartId || 'chart';

const option = ref({
  title: {
    text: '图表示例'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['系列1', '系列2']
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '系列1',
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130]
    },
    {
      name: '系列2',
      type: 'line',
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
});
</script>`,
      variables: ['chartId', 'option'],
    });

    // Vanilla ESM TypeScript 模板
    this.registerTemplate({
      name: 'vanilla-esm-ts',
      description: 'Vanilla ESM TypeScript 代码示例模板',
      frameworks: ['vanilla'],
      content: `import { BaseChart } from '@agions/taroviz';
import { EChartsOption } from '@agions/taroviz/types';

const chartId = options.chartId || 'chart';
const container = document.getElementById(chartId);

if (!container) {
  throw new Error('Chart container not found');
}

const option: EChartsOption = {
  title: {
    text: '图表示例'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['系列1', '系列2']
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '系列1',
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130]
    },
    {
      name: '系列2',
      type: 'line',
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
};

// 创建图表实例
const chart = new BaseChart({
  chartId,
  option,
  container
});

// 渲染图表
chart.render();

// 导出图表实例
export default chart;`,
      variables: ['chartId', 'option'],
    });

    // Vanilla ESM JavaScript 模板
    this.registerTemplate({
      name: 'vanilla-esm-js',
      description: 'Vanilla ESM JavaScript 代码示例模板',
      frameworks: ['vanilla'],
      content: `import { BaseChart } from '@agions/taroviz';

const chartId = options.chartId || 'chart';
const container = document.getElementById(chartId);

if (!container) {
  throw new Error('Chart container not found');
}

const option = {
  title: {
    text: '图表示例'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['系列1', '系列2']
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '系列1',
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130]
    },
    {
      name: '系列2',
      type: 'line',
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
};

// 创建图表实例
const chart = new BaseChart({
  chartId,
  option,
  container
});

// 渲染图表
chart.render();

// 导出图表实例
export default chart;`,
      variables: ['chartId', 'option'],
    });
  }

  /**
   * 注册模板
   */
  public registerTemplate(template: CodeExampleTemplate): void {
    this.templates.set(template.name, template);
  }

  /**
   * 获取模板
   */
  public getTemplate(name: string): CodeExampleTemplate | undefined {
    return this.templates.get(name);
  }

  /**
   * 获取所有模板
   */
  public getAllTemplates(): CodeExampleTemplate[] {
    return Array.from(this.templates.values());
  }

  /**
   * 根据框架获取模板
   */
  public getTemplatesByFramework(framework: FrameworkType): CodeExampleTemplate[] {
    return Array.from(this.templates.values()).filter(template =>
      template.frameworks.includes(framework)
    );
  }

  /**
   * 删除模板
   */
  public removeTemplate(name: string): void {
    this.templates.delete(name);
  }

  /**
   * 生成代码示例
   */
  public generate(option: EChartsOption, options: CodeGeneratorOptions): CodeGeneratorResult {
    try {
      // 触发生成开始事件
      this.emit(CodeGeneratorEventType.GENERATE_START, { option, options });

      // 应用模板
      const generatedCode = this.generateCodeFromTemplate(option, options);

      // 生成结果
      const result: CodeGeneratorResult = {
        code: generatedCode,
        language: options.useTypeScript ? 'typescript' : 'javascript',
        framework: options.framework,
        importType: options.importType || 'esm',
        theme: options.theme || 'light',
        generatedAt: Date.now(),
        extension: this.getFileExtension(options),
      };

      // 触发生成完成事件
      this.emit(CodeGeneratorEventType.GENERATE_COMPLETE, result);

      return result;
    } catch (error) {
      // 触发生成失败事件
      this.emit(CodeGeneratorEventType.GENERATE_ERROR, { error });
      throw error;
    }
  }

  /**
   * 从模板生成代码
   */
  private generateCodeFromTemplate(option: EChartsOption, options: CodeGeneratorOptions): string {
    // 获取模板
    const templateName = this.getTemplateName(options);
    const template = this.getTemplate(templateName);

    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }

    // 触发模板应用事件
    this.emit(CodeGeneratorEventType.TEMPLATE_APPLY, { template, option, options });

    // 替换模板变量
    let code = template.content;

    // 替换组件名称
    const componentName = options.componentName || 'ChartComponent';
    code = code.replace(/\{componentName\}/g, componentName);

    // 替换图表ID
    const chartId = options.chartId || 'chart';
    code = code.replace(/\{chartId\}/g, chartId);

    // 替换选项
    const optionStr = JSON.stringify(option, null, 2);
    code = code.replace(/\{\s*option\s*\}/g, optionStr);

    // 处理导入类型
    code = this.processImportType(code, options.importType || 'esm');

    // 处理主题
    code = this.processTheme(code, options.theme || 'light');

    // 处理样式
    if (!options.includeStyles) {
      code = this.removeStyles(code);
    }

    // 处理数据
    if (!options.includeData) {
      code = this.removeData(code);
    }

    // 处理注释
    if (!options.includeComments) {
      code = this.removeComments(code);
    }

    return code;
  }

  /**
   * 获取模板名称
   */
  private getTemplateName(options: CodeGeneratorOptions): string {
    const framework = options.framework;
    const importType = options.importType || 'esm';
    const useTypeScript = options.useTypeScript || false;

    return `${framework}-${importType}-${useTypeScript ? 'ts' : 'js'}`;
  }

  /**
   * 获取文件扩展名
   */
  private getFileExtension(options: CodeGeneratorOptions): string {
    const useTypeScript = options.useTypeScript || false;
    const framework = options.framework;

    if (framework === 'vue') {
      return 'vue';
    }

    return useTypeScript ? 'tsx' : 'jsx';
  }

  /**
   * 处理导入类型
   */
  private processImportType(code: string, importType: ImportType): string {
    switch (importType) {
      case 'cjs':
        return code.replace(/import\s+([^\s]+)\s+from\s+([^;]+);/g, 'const $1 = require($2);');
      case 'umd':
        return code.replace(
          /import\s+([^\s]+)\s+from\s+([^;]+);/g,
          'const $1 = window.TaroViz.$1;'
        );
      default:
        return code;
    }
  }

  /**
   * 处理主题
   */
  private processTheme(code: string, theme: ThemeType): string {
    // 添加主题相关的样式或配置
    if (theme === 'dark') {
      return code.replace(
        /style={{([^}]+)}}/g,
        "style={{$1, backgroundColor: '#1a1a1a', color: '#ffffff'}}"
      );
    }
    return code;
  }

  /**
   * 移除样式
   */
  private removeStyles(code: string): string {
    return code.replace(/style={{[^}]+}}/g, '');
  }

  /**
   * 移除数据
   */
  private removeData(code: string): string {
    return code.replace(/\s*data:\s*\[[^\]]+\]/g, 'data: []');
  }

  /**
   * 移除注释
   */
  private removeComments(code: string): string {
    // 移除单行注释
    code = code.replace(/\/\/.*$/gm, '');
    // 移除多行注释
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');
    // 移除空行
    code = code.replace(/^\s*\n/gm, '');
    return code;
  }

  /**
   * 生成完整的代码示例
   */
  public generateCompleteExample(option: EChartsOption, options: CodeGeneratorOptions): string {
    const result = this.generate(option, options);
    return result.code;
  }

  /**
   * 生成代码片段
   */
  public generateSnippet(option: EChartsOption, options: CodeGeneratorOptions): string {
    const result = this.generate(option, options);
    return result.code;
  }

  /**
   * 重置实例
   */
  public static resetInstance(): void {
    CodeGenerator.instance = null;
  }
}
