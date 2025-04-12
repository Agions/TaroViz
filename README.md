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
    <a href="https://github.com/yourusername/taroviz/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/@agions/taroviz.svg" alt="license">
    </a>
  </p>
</div>

## 特性

- 📊 丰富的图表类型
- 📱 多端适配支持（小程序、H5）
- 🎨 灵活的主题定制
- 📦 模块化设计
- 🚀 高性能渲染
- 🛠️ 强大的数据处理能力
- 🎯 易用的 React Hooks
- 📖 完善的类型定义

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

### 使用

```typescript
import { LineChart } from '@agions/taroviz';

const App = () => {
  const data = {
    xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: [150, 230, 224, 218, 135]
  };

  return (
    <LineChart
      data={data}
      width={350}
      height={250}
    />
  );
};
```

## 包说明

TaroViz 采用 monorepo 管理模式，包含以下核心包：

| 包名 | 版本 | 描述 |
|------|------|------|
| [@agions/taroviz](./packages/all) | [![npm](https://img.shields.io/npm/v/@agions/taroviz.svg)](https://www.npmjs.com/package/@agions/taroviz) | 完整功能包 |
| [@agions/taroviz-core](./packages/core) | [![npm](https://img.shields.io/npm/v/@agions/taroviz-core.svg)](https://www.npmjs.com/package/@agions/taroviz-core) | 核心组件 |
| [@agions/taroviz-charts](./packages/charts) | [![npm](https://img.shields.io/npm/v/@agions/taroviz-charts.svg)](https://www.npmjs.com/package/@agions/taroviz-charts) | 图表组件 |
| [@agions/taroviz-hooks](./packages/hooks) | [![npm](https://img.shields.io/npm/v/@agions/taroviz-hooks.svg)](https://www.npmjs.com/package/@agions/taroviz-hooks) | React Hooks |
| [@agions/taroviz-themes](./packages/themes) | [![npm](https://img.shields.io/npm/v/@agions/taroviz-themes.svg)](https://www.npmjs.com/package/@agions/taroviz-themes) | 主题系统 |
| [@agions/taroviz-data](./packages/data) | [![npm](https://img.shields.io/npm/v/@agions/taroviz-data.svg)](https://www.npmjs.com/package/@agions/taroviz-data) | 数据处理 |
| [@agions/taroviz-adapters](./packages/adapters) | [![npm](https://img.shields.io/npm/v/@agions/taroviz-adapters.svg)](https://www.npmjs.com/package/@agions/taroviz-adapters) | 平台适配器 |

## 示例

### 折线图

```typescript
import { LineChart } from '@agions/taroviz';
import { useTheme } from '@agions/taroviz-hooks';

const LineChartDemo = () => {
  const theme = useTheme();
  
  return (
    <LineChart
      data={{
        xAxis: ['Q1', 'Q2', 'Q3', 'Q4'],
        series: [
          { name: '收入', data: [150, 230, 224, 218] },
          { name: '支出', data: [120, 180, 190, 170] }
        ]
      }}
      theme={theme}
      width={350}
      height={250}
    />
  );
};
```

### 柱状图

```typescript
import { BarChart } from '@agions/taroviz';

const BarChartDemo = () => {
  return (
    <BarChart
      data={{
        xAxis: ['产品A', '产品B', '产品C'],
        series: [120, 200, 150]
      }}
      width={350}
      height={250}
    />
  );
};
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
```

## 技术栈

- [Taro](https://taro.jd.com/) - 多端统一开发框架
- [ECharts](https://echarts.apache.org/zh/index.html) - 图表库
- [React](https://reactjs.org/) - 用户界面库
- [TypeScript](https://www.typescriptlang.org/) - 类型系统
- [pnpm](https://pnpm.io/) - 包管理器
- [Webpack](https://webpack.js.org/) - 构建工具

## 兼容性

- 小程序
  - 微信小程序
  - 支付宝小程序
  - 百度小程序
  - 字节跳动小程序
- H5
- React Native

## 贡献指南

我们欢迎任何形式的贡献，包括但不限于：

- 提交问题和建议
- 改进文档
- 修复 bug
- 添加新功能

请查看 [贡献指南](./CONTRIBUTING.md) 了解详细信息。

## 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解详细的更新历史。

## 许可证

[MIT License](./LICENSE) © 2025 Agions

## 支持

如果您在使用过程中遇到问题，可以通过以下方式获取帮助：

- [GitHub Issues](https://github.com/agions/taroviz/issues)

