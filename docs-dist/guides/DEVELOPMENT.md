# TaroViz 开发指南

本文档提供了TaroViz库的开发指南，适用于想要参与贡献或在项目中深度集成TaroViz的开发者。

## 项目结构

TaroViz采用Monorepo架构，使用pnpm作为包管理工具。整体结构如下：

```
taroviz/
├── packages/               # 所有包目录
│   ├── all/                # 统一导出包
│   ├── core/               # 核心组件
│   ├── charts/             # 图表组件
│   ├── hooks/              # React Hooks
│   ├── themes/             # 主题系统
│   ├── data/               # 数据处理
│   └── adapters/           # 平台适配器
├── examples/               # 示例项目
├── docs/                   # 文档
├── scripts/                # 构建脚本
└── ...
```

## 环境准备

在开始开发前，确保您的环境满足以下条件：

1. Node.js v14或更高版本
2. pnpm v7或更高版本
3. Git

## 开发流程

### 1. 克隆仓库

```bash
git clone https://github.com/agions/taroviz.git
cd taroviz
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发模式

```bash
pnpm dev
```

此命令会启动所有包的监视模式，当有文件变化时会自动重新构建。

### 4. 构建所有包

```bash
pnpm build
```

### 5. 运行测试

```bash
pnpm test
```

## 开发规范

### 代码风格

项目使用TypeScript开发，并遵循以下规范：

- 使用ESLint和Prettier进行代码风格检查和格式化
- 使用TypeScript的严格模式
- 所有组件和函数都需要添加JSDoc注释

### 提交规范

提交信息遵循[Conventional Commits](https://www.conventionalcommits.org/)规范：

```
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

常用的提交类型：

- `feat`: 新功能
- `fix`: 修复Bug
- `docs`: 文档更新
- `style`: 代码风格修改(不影响代码运行的变动)
- `refactor`: 重构(既不是新增功能，也不是修改bug的代码变动)
- `perf`: 性能优化
- `test`: 增加测试
- `chore`: 构建过程或辅助工具的变动

示例：

```
feat(charts): 添加散点图组件

- 实现基本散点图功能
- 支持自定义样式和交互
```

### 分支管理

- `main`: 主分支，保持稳定可发布状态
- `develop`: 开发分支，用于集成功能
- `feature/xxx`: 功能分支，用于开发新功能
- `fix/xxx`: 修复分支，用于修复Bug

## 包开发指南

### 1. 核心包 (@agions/taroviz-core)

核心包提供基础组件和工具，负责图表渲染的底层逻辑。

```typescript
// 组件示例
import React from 'react';
import { BaseChartProps } from '../types';

export const BaseChart: React.FC<BaseChartProps> = (props) => {
  // 实现逻辑
  return (
    // 渲染逻辑
  );
};
```

### 2. 图表包 (@agions/taroviz-charts)

图表包提供各种图表组件，依赖于核心包。

```typescript
// 新增图表组件示例
import React from 'react';
import { BaseChart } from '@agions/taroviz-core';
import { LineChartProps } from '../types';

export const LineChart: React.FC<LineChartProps> = (props) => {
  // 处理特定于折线图的配置
  const processedConfig = processLineConfig(props.config);
  
  return (
    <BaseChart
      {...props}
      config={processedConfig}
      chartType="line"
    />
  );
};

function processLineConfig(config) {
  // 处理配置逻辑
  return {
    ...config,
    // 折线图特定配置
  };
}
```

### 3. Hooks包 (@agions/taroviz-hooks)

Hooks包提供可复用的React Hooks。

```typescript
// 新增Hook示例
import { useState, useEffect, useRef } from 'react';

export function useChartResize() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setSize({ width, height });
      }
    };
    
    // 初始化尺寸
    updateSize();
    
    // 监听resize事件
    window.addEventListener('resize', updateSize);
    
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return { containerRef, size };
}
```

## 测试指南

项目使用Jest进行单元测试和组件测试。

### 编写单元测试

```typescript
// 函数测试示例
import { processData } from '../src/utils/dataProcessor';

describe('processData', () => {
  it('should transform data correctly', () => {
    const input = {
      categories: ['A', 'B', 'C'],
      series: [{ name: 'Series 1', data: [1, 2, 3] }]
    };
    
    const expected = {
      // 预期输出
    };
    
    expect(processData(input)).toEqual(expected);
  });
});
```

### 编写组件测试

```typescript
// 组件测试示例
import React from 'react';
import { render } from '@testing-library/react';
import { LineChart } from '../src/components/LineChart';

describe('LineChart', () => {
  it('should render without crashing', () => {
    const data = {
      categories: ['A', 'B', 'C'],
      series: [{ name: 'Series 1', data: [1, 2, 3] }]
    };
    
    const { container } = render(<LineChart data={data} />);
    expect(container).toBeTruthy();
  });
});
```

## 构建与发布

### 1. 检查版本

在发布前，确保所有包的版本号已更新。

```bash
pnpm version:check
```

### 2. 构建所有包

```bash
pnpm build
```

### 3. 发布

```bash
pnpm publish:all
```

此命令会发布所有已修改的包。

## 文档开发

文档使用TypeDoc生成API文档，使用Markdown编写指南文档。

### 生成API文档

```bash
pnpm docs:build
```

### 预览文档

```bash
pnpm docs:serve
```

### 更新文档

在以下情况下需要更新文档：

1. 添加新的组件或API
2. 修改现有API的行为
3. 修复文档中的错误
4. 添加新的示例或用法说明

## 贡献指南

我们欢迎任何形式的贡献，包括但不限于：

- 提交Bug报告
- 提出新功能建议
- 修复Bug
- 实现新功能
- 完善文档
- 添加测试用例

### 贡献流程

1. Fork项目仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的变更 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建一个Pull Request

### 问题反馈

如果你在使用过程中遇到问题，请在GitHub上提交issue，并尽可能详细地描述问题和复现步骤。

## 性能优化建议

在开发过程中，请注意以下性能优化点：

1. 避免不必要的重渲染
2. 使用React.memo、useMemo和useCallback优化组件性能
3. 大数据集的处理应该放在useEffect中异步处理
4. 避免同时渲染过多图表
5. 考虑使用可视区渲染优化大列表

## 调试技巧

### 调试组件

可以使用React开发者工具和浏览器开发者工具调试组件：

1. 在Chrome中安装React开发者工具扩展
2. 使用console.log打印关键数据
3. 使用浏览器开发者工具的Elements面板查看DOM结构
4. 使用Performance面板分析性能问题

### 调试小程序

对于小程序平台：

1. 使用小程序开发者工具的调试功能
2. 使用console.log打印日志
3. 使用小程序调试器查看网络请求和存储

## 常见问题

### Q: 如何在项目中只使用部分图表组件？

A: 可以只导入你需要的组件，以减小打包体积：

```js
// 导入单个组件
import { LineChart } from '@agions/taroviz-charts';
```

### Q: 如何解决小程序中Canvas显示问题？

A: 确保正确设置Canvas的ID和尺寸，并检查是否有CSS样式影响了Canvas的显示。可以参考示例项目中的配置。

### Q: 为什么我的自定义主题不生效？

A: 请确保主题对象结构正确，并且在config中正确传递。检查控制台是否有相关错误提示。 