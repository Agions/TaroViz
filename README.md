# TaroViz

<div align="center">
  <h1>TaroViz</h1>
  <p>基于 Taro 和 ECharts 的多端图表组件库</p>
  <p>
    <a href="https://www.npmjs.com/package/@agions/taroviz">
      <img src="https://img.shields.io/npm/v/@agions/taroviz.svg" alt="npm package">
    </a>
    <a href="https://www.npmjs.com/package/@agions/taroviz">
      <img src="https://img.shields.io/npm/dm/@agions/taroviz.svg" alt="npm downloads">
    </a>
    <a href="https://github.com/agions/taroviz/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/@agions/taroviz.svg" alt="license">
    </a>
  </p>
</div>

## 📢 最新版本 v1.1.1

我们很高兴地宣布 TaroViz v1.1.1 已正式发布！查看 [更新日志](./CHANGELOG.md) 了解详细信息。

## 📚 文档

- [API文档](./docs-api/index.html)
- [使用指南](./docs/USAGE.md)
- [开发指南](./docs/DEVELOPMENT.md)
- [示例](./docs/EXAMPLE.md)
- [FAQ](./docs/FAQ.md)

## 特性

- 📊 **丰富的图表类型** - 支持折线图、柱状图、饼图、散点图、雷达图、热力图、仪表盘、漏斗图等多种图表类型
- 📱 **多端适配支持** - 支持微信小程序、支付宝小程序、百度小程序、字节跳动小程序和 H5
- 🎨 **灵活的主题定制** - 内置多种主题，支持自定义主题
- 📦 **单包架构设计** - 简化依赖管理，方便使用
- 🚀 **高性能渲染** - 基于 ECharts 优化，确保流畅渲染
- 🛠️ **强大的数据处理能力** - 内置数据处理工具，支持复杂数据转换
- 🎯 **易用的 React Hooks** - 提供便捷的 Hooks 简化开发
- 📖 **完善的类型定义** - 完整的 TypeScript 类型支持，提升开发体验

## 快速开始

### 安装

```bash
# npm
npm install @agions/taroviz

# yarn
yarn add @agions/taroviz

# pnpm
pnpm add @agions/taroviz
```

### 基础使用

```typescript
import React from 'react';
import { LineChart } from '@agions/taroviz';

const App = () => {
  // ECharts 配置项
  const option = {
    title: {
      text: '折线图示例'
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
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line'
      }
    ]
  };

  return (
    <LineChart
      option={option}
      width="100%"
      height={400}
    />
  );
};

export default App;
```

## 支持的图表类型

TaroViz 支持以下图表类型：

| 图表类型 | 描述 | 组件名 |
|---------|------|--------|
| 折线图 | 用于展示数据随时间或类别变化的趋势 | `LineChart` |
| 柱状图 | 用于比较不同类别的数据大小 | `BarChart` |
| 饼图 | 用于展示数据占比关系 | `PieChart` |
| 散点图 | 用于展示两个变量之间的关系 | `ScatterChart` |
| 雷达图 | 用于展示多维度数据 | `RadarChart` |
| 热力图 | 用于展示数据密度和分布 | `HeatmapChart` |
| 仪表盘 | 用于展示单一指标的进度或状态 | `GaugeChart` |
| 漏斗图 | 用于展示流程中各阶段的数据转化 | `FunnelChart` |

## 架构说明

TaroViz 采用单包架构设计，包含以下核心模块：

| 模块           | 描述                |
| -------------- | ------------------- |
| core           | 核心功能和类型定义  |
| adapters       | 多平台适配器，处理不同平台的差异 |
| charts         | 各种图表组件的实现 |
| hooks          | React Hooks，提供便捷的状态管理 |
| themes         | 主题系统，支持多种内置主题和自定义主题 |
| utils          | 工具函数和数据处理工具 |

## 详细示例

### 折线图

```typescript
import React from 'react';
import { LineChart } from '@agions/taroviz';

const LineChartDemo = () => {
  const option = {
    title: {
      text: '销售趋势'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['线上', '线下']
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '线上',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110],
        smooth: true
      },
      {
        name: '线下',
        type: 'line',
        data: [90, 150, 120, 100, 80, 130],
        smooth: true
      }
    ]
  };

  return (
    <LineChart
      option={option}
      width="100%"
      height={400}
      theme="dark"
      autoResize={true}
    />
  );
};

export default LineChartDemo;
```

### 饼图

```typescript
import React from 'react';
import { PieChart } from '@agions/taroviz';

const PieChartDemo = () => {
  const option = {
    title: {
      text: '销售渠道分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '销售渠道',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 350, name: '线上商城' },
          { value: 250, name: '线下门店' },
          { value: 200, name: '代理商' },
          { value: 150, name: '其他' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <PieChart
      option={option}
      width={400}
      height={400}
    />
  );
};

export default PieChartDemo;
```

### 散点图

```typescript
import React from 'react';
import { ScatterChart } from '@agions/taroviz';

const ScatterChartDemo = () => {
  const option = {
    title: {
      text: '身高体重分布'
    },
    xAxis: {
      name: '身高 (cm)',
      type: 'value'
    },
    yAxis: {
      name: '体重 (kg)',
      type: 'value'
    },
    series: [
      {
        type: 'scatter',
        data: [
          [161.2, 51.6],
          [167.5, 59.0],
          [159.5, 49.2],
          [157.0, 63.0],
          [155.8, 53.6],
          [170.0, 59.0],
          [159.1, 47.6],
          [166.0, 69.8],
          [176.2, 66.8],
          [160.2, 75.2]
        ]
      }
    ]
  };

  return (
    <ScatterChart
      option={option}
      width="100%"
      height={400}
    />
  );
};

export default ScatterChartDemo;
```

## 本地开发

```bash
# 克隆仓库
git clone https://github.com/agions/taroviz.git

# 安装依赖
pnpm install

# 启动开发服务
pnpm dev

# 构建
pnpm build

# 运行测试
pnpm test

# 生成 API 文档
pnpm run docs:api
```

## 技术栈

- [Taro](https://taro.jd.com/) - 多端统一开发框架
- [ECharts](https://echarts.apache.org/zh/index.html) - 强大的图表库
- [React](https://reactjs.org/) - 用户界面库
- [TypeScript](https://www.typescriptlang.org/) - 类型系统
- [pnpm](https://pnpm.io/) - 高效的包管理器
- [Webpack](https://webpack.js.org/) - 构建工具
- [Jest](https://jestjs.io/) - 测试框架
- [Cypress](https://www.cypress.io/) - 端到端测试工具

## 兼容性

| 平台 | 支持情况 |
|------|----------|
| 微信小程序 | ✅ 支持 |
| 支付宝小程序 | ✅ 支持 |
| 百度小程序 | ✅ 支持 |
| 字节跳动小程序 | ✅ 支持 |
| H5 | ✅ 支持 |
| React Native | ⚠️ 部分支持 |

## 贡献指南

我们欢迎任何形式的贡献，包括但不限于：

- 提交问题和建议
- 改进文档
- 修复 bug
- 添加新功能
- 优化性能

请查看 [贡献指南](./CONTRIBUTING.md) 了解详细信息。

## 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解详细的更新历史。

## 许可证

[MIT License](./LICENSE) © 2025 Agions

## 支持

如果您在使用过程中遇到问题，可以通过以下方式获取帮助：

- [GitHub Issues](https://github.com/agions/taroviz/issues) - 提交问题和建议
- [文档](./docs) - 查看详细文档
- [示例](./docs/EXAMPLE.md) - 参考使用示例

## 致谢

感谢所有为 TaroViz 做出贡献的开发者！

## 相关链接

- [Taro 官网](https://taro.jd.com/)
- [ECharts 官网](https://echarts.apache.org/zh/index.html)
- [GitHub 仓库](https://github.com/agions/taroviz)
- [npm 包](https://www.npmjs.com/package/@agions/taroviz)
