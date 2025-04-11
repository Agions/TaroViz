# TaroViz

TaroViz是一个专业的多端图表可视化解决方案，基于Taro和ECharts构建，专为跨平台应用场景设计。通过统一的API和灵活的适配器架构，提供在Web、React Native、小程序等多个平台上一致的图表开发体验和渲染效果。

![TaroViz Logo](./logo.png)

## 功能特点

- **多端适配架构**：采用适配器模式，支持H5、微信小程序、支付宝小程序、百度小程序、鸿蒙OS等多平台
- **统一API设计**：遵循一致性原则，提供统一的组件接口和配置项，实现一次开发多端运行
- **TypeScript支持**：完整的类型定义系统，包含泛型支持和严格类型检查，提供卓越的开发体验
- **丰富图表类型**：支持20+种图表类型，包括基础图表、复合图表和自定义图表
- **声明式开发**：提供React Hooks API，实现声明式、响应式的图表开发模式
- **主题与定制**：内置多种主题，并支持自定义主题和样式系统
- **高性能渲染**：针对移动端优化的渲染性能，支持大数据集和复杂交互场景
- **模块化设计**：采用模块化架构，支持按需引入，优化包体积和加载性能

## 技术架构

TaroViz采用多层架构设计，确保跨平台一致性和高性能：

- **核心层 (@taroviz/core)**：提供基础图表能力和类型定义
- **适配层 (@taroviz/adapters)**：处理不同平台差异，确保一致的API体验
- **数据层 (@taroviz/data)**：提供数据处理和转换能力
- **钩子层 (@taroviz/hooks)**：提供React Hooks，实现声明式开发
- **主题层 (@taroviz/themes)**：提供主题系统和样式定制能力

## 安装

推荐使用 pnpm 进行安装：

```bash
# 使用 pnpm 安装（推荐）
pnpm add @taroviz/core @taroviz/adapters @taroviz/hooks @taroviz/data @taroviz/themes

# 使用 npm 安装
npm install @taroviz/core @taroviz/adapters @taroviz/hooks @taroviz/data @taroviz/themes

# 使用 yarn 安装
yarn add @taroviz/core @taroviz/adapters @taroviz/hooks @taroviz/data @taroviz/themes
```

## 开发指南

### 基础使用

```tsx
import React from 'react';
import { View } from '@tarojs/components';
import { useChart } from '@taroviz/hooks';
import { getAdapter } from '@taroviz/adapters';

const BasicChart = () => {
  const adapter = getAdapter();
  const { chart, container } = useChart({
    option: {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70],
        type: 'line'
      }]
    }
  });

  return (
    <View ref={container} style={{ width: '100%', height: '300px' }} />
  );
};

export default BasicChart;
```

### 使用主题

```tsx
import { useTheme } from '@taroviz/hooks';
import { darkTheme } from '@taroviz/themes';

const ThemedChart = () => {
  const { chart, container } = useChart({
    theme: darkTheme,
    // ... 其他配置
  });

  return <View ref={container} />;
};
```

### 数据处理

```tsx
import { processData } from '@taroviz/data';

const DataChart = () => {
  const data = processData([
    { date: '2023-01', value: 100 },
    { date: '2023-02', value: 200 }
  ]);

  const { chart, container } = useChart({
    option: {
      // ... 使用处理后的数据
    }
  });

  return <View ref={container} />;
};
```

## 开发者指南

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/yourusername/taroviz.git

# 安装依赖
pnpm install

# 构建所有包
pnpm run build

# 开发模式
pnpm run dev
```

### 目录结构

```
packages/
  ├── core/          # 核心功能
  ├── adapters/      # 平台适配器
  ├── data/          # 数据处理工具
  ├── hooks/         # React Hooks
  ├── themes/        # 主题系统
  └── docs/          # 文档
```

## 贡献指南

我们欢迎社区贡献！如果你想参与项目开发，请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解详细信息。

## 许可证

本项目采用 [MIT 许可证](./LICENSE)。
