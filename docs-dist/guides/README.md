# TaroViz 文档中心

欢迎来到 TaroViz 文档中心！TaroViz 是一个基于 Taro 框架的跨平台可视化图表库，专为小程序和 H5 环境设计。本文档将帮助您了解如何使用 TaroViz 在您的应用中创建美观、交互式的图表。

## 文档导航

### 入门指南
- [快速开始](./QUICK_START.md) - 在几分钟内创建您的第一个图表
- [使用指南](./USAGE.md) - 详细了解如何使用各种组件和功能
- [API参考](./API.md) - 完整的API文档和参数说明

### 进阶指南
- [示例库](./EXAMPLES.md) - 各种图表类型的实用示例
- [常见问题](./FAQ.md) - 解答使用过程中的常见问题
- [性能优化](./guides/PERFORMANCE.md) - 提高图表渲染性能的建议
- [自定义图表](./guides/CUSTOMIZATION.md) - 创建自定义图表的详细指南

### 开发者文档
- [贡献指南](./CONTRIBUTING.md) - 参与 TaroViz 开发的规范和流程
- [开发指南](./DEVELOPMENT.md) - 项目开发和测试相关信息
- [更新日志](./CHANGELOG.md) - 版本变更记录及新功能说明

## 主要特性

### 跨平台支持
TaroViz 支持所有 Taro 兼容的平台，包括：
- 微信小程序
- 支付宝小程序
- 百度小程序
- 头条小程序
- QQ小程序
- 京东小程序
- H5环境

### 丰富的图表类型
提供多种常用图表组件：
- 折线图
- 柱状图
- 饼图/环形图
- 散点图
- 雷达图
- 混合图表
- 更多...

### 高性能渲染
- 针对小程序环境优化的渲染引擎
- 智能重绘策略，减少不必要的渲染
- 大数据集可视化支持

### 易用的API
- 声明式React组件API
- 完整TypeScript类型支持
- 灵活的配置选项
- 丰富的定制能力

### 交互能力
- 支持点击、长按等交互事件
- 内置动画效果
- 可自定义工具提示
- 丰富的图例和标签选项

## 快速上手

安装TaroViz:

```bash
# 使用npm
npm install @taroviz/core @taroviz/components

# 使用yarn
yarn add @taroviz/core @taroviz/components

# 使用pnpm
pnpm add @taroviz/core @taroviz/components
```

创建一个简单的折线图:

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { LineChart } from '@taroviz/components';

export default function App() {
  const data = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        label: '销售额',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#5ab1ef',
      }
    ]
  };
  
  return (
    <View style={{ width: '100%', height: '300px' }}>
      <LineChart data={data} />
    </View>
  );
}
```

## 社区资源

- [GitHub仓库](https://github.com/agions/taroviz)
- [问题反馈](https://github.com/agions/taroviz/issues)
- [讨论区](https://github.com/agions/taroviz/discussions)

## 版权和许可

TaroViz 采用 [MIT 许可证](https://github.com/agions/taroviz/blob/main/LICENSE)。 