# @agions/taroviz

[![npm version](https://img.shields.io/npm/v/@agions/taroviz.svg)](https://www.npmjs.com/package/@agions/taroviz)
[![npm downloads](https://img.shields.io/npm/dm/@agions/taroviz.svg)](https://www.npmjs.com/package/@agions/taroviz)
[![GitHub](https://img.shields.io/github/license/Agions/TaroViz)](https://github.com/Agions/TaroViz/blob/main/LICENSE)

基于 Taro 和 ECharts 的多端图表组件库完整包，支持微信小程序、支付宝小程序、百度小程序、H5等多平台。

## 介绍

`@agions/taroviz` 是TaroViz组件库的主包，包含了所有子包的功能，提供完整的多端图表解决方案。如果您想使用TaroViz的全部功能，推荐直接安装此包。

## 安装

```bash
# npm
npm install @agions/taroviz

# yarn
yarn add @agions/taroviz

# pnpm
pnpm add @agions/taroviz
```

## 包依赖关系

该包整合了以下子包:

- [`@agions/taroviz-core`](https://www.npmjs.com/package/@agions/taroviz-core) - 核心组件
- [`@agions/taroviz-charts`](https://www.npmjs.com/package/@agions/taroviz-charts) - 图表组件
- [`@agions/taroviz-adapters`](https://www.npmjs.com/package/@agions/taroviz-adapters) - 平台适配器
- [`@agions/taroviz-themes`](https://www.npmjs.com/package/@agions/taroviz-themes) - 主题系统
- [`@agions/taroviz-data`](https://www.npmjs.com/package/@agions/taroviz-data) - 数据处理
- [`@agions/taroviz-hooks`](https://www.npmjs.com/package/@agions/taroviz-hooks) - React Hooks

## 使用示例

```jsx
import React from 'react';
import { LineChart } from '@agions/taroviz';

const App = () => {
  const data = {
    xAxis: ['周一', '周二', '周三', '周四', '周五'],
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

export default App;
```

## API文档

### 导出的组件

以下是主要的图表组件：

- `LineChart` - 折线图
- `BarChart` - 柱状图
- `PieChart` - 饼图
- `RadarChart` - 雷达图
- `ScatterChart` - 散点图
- `HeatmapChart` - 热力图

更多图表类型请参考完整文档。

### 导出的工具

- `Core` - 核心API
- `Adapters` - 适配器API
- `Charts` - 图表组件API
- `Themes` - 主题系统API
- `Data` - 数据处理API
- `Hooks` - React Hooks API

## 依赖要求

- `@tarojs/components`: >=3.4.0
- `@tarojs/taro`: >=3.4.0
- `echarts`: >=5.4.0
- `react`: >=16.13.0

## 相关链接

- [GitHub仓库](https://github.com/Agions/TaroViz)
- [问题反馈](https://github.com/Agions/TaroViz/issues)
- [更新日志](https://github.com/Agions/TaroViz/blob/main/CHANGELOG.md)

## 许可证

MIT © [Agions](https://github.com/Agions)
