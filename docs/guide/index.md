# 快速开始

欢迎使用 TaroViz！本指南将帮助您快速上手 TaroViz，了解其核心功能和使用方法。

::: info 前置知识
本指南假设您已经熟悉 React 和 Taro 的基本使用方法。如果你是 Taro 新手，建议先阅读 [Taro 官方文档](https://taro-docs.jd.com/)。
:::

## 什么是 TaroViz？

TaroViz 是一个基于 Taro 和 ECharts 的多端图表组件库，旨在为开发者提供丰富、易用、高性能的图表解决方案。

::: tip 核心优势
TaroViz 最大的特点是**一套代码，多端运行**。无论你是开发微信小程序还是 H5 应用，使用相同的 API 和配置即可。
:::

## 核心特性

| 特性 | 说明 |
|:---|:---|
| **丰富的图表类型** | 支持 11+ 种常用图表类型 |
| **多端适配** | 微信、支付宝、百度、字节、H5/RN |
| **灵活的主题** | 内置 10+ 预设主题，支持自定义 |
| **极致性能** | 智能采样、WebWorker 异步计算 |
| **TypeScript** | 完整类型定义，IDE 智能提示 |

## 适用场景

- 📊 **数据可视化仪表盘** — 展示业务数据、运营指标
- 📈 **实时数据监控** — 监控系统状态、用户行为
- 📱 **移动端图表展示** — 小程序/H5 图表页面
- 🔄 **跨平台应用开发** — 多端一致性体验

## 学习路径

建议按以下顺序阅读文档：

1. [安装](./installation.md) — 5 分钟完成环境搭建
2. [基础使用](./basic-usage.md) — 了解核心 API
3. [图表类型](./chart-types.md) — 选择合适的图表
4. [主题定制](./theming.md) — 自定义外观
5. [性能优化](./performance.md) — 处理大数据
6. [跨平台开发](./cross-platform.md) — 多端适配指南

## 示例代码

::: code-group

```typescript [React Component]
import React from 'react';
import { LineChart } from '@agions/taroviz';

const option = {
  title: { text: '销售趋势' },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
  yAxis: { type: 'value' },
  series: [{ data: [120, 200, 150], type: 'line' }]
};

export default function App() {
  return <LineChart chartId="demo" option={option} width="100%" height={400} />;
}
```

```tsx [TSX with Type Safety]
import React from 'react';
import { LineChart, ChartProps } from '@agions/taroviz';

const option: ChartProps['option'] = {
  title: { text: '销售趋势' },
  // ... full type inference
};

export default function App() {
  return <LineChart chartId="demo" option={option} width="100%" height={400} />;
}
```

:::

## 下一步

<div class="next-steps">

[安装 TaroViz →](./installation.md)

</div>

<style scoped>

.next-steps {
  margin-top: 32px;
  padding: 20px 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  display: inline-block;
}

.next-steps a {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.next-steps a:hover {
  color: var(--vp-c-brand-2);
}

</style>
