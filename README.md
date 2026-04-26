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
    <a href="https://github.com/Agions/TaroViz/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/@agions/taroviz.svg" alt="license">
    </a>
    <a href="https://github.com/Agions/TaroViz/actions/workflows/docs-deploy.yml">
      <img src="https://github.com/Agions/TaroViz/actions/workflows/docs-deploy.yml/badge.svg" alt="Deploy Documentation">
    </a>
  </p>
</div>

## 最新版本 v1.11.1

TaroViz v1.11.1 - 基于 Taro 和 ECharts 的专业级多端图表组件库。

## 文档

- [在线文档](https://agions.github.io/TaroViz/)
- [快速开始](https://agions.github.io/TaroViz/guide/)
- [API文档](https://agions.github.io/TaroViz/api/)
- [示例](https://agions.github.io/TaroViz/examples/)

## 特性

- 📊 **丰富的图表类型** - 支持折线图、柱状图、饼图、散点图、雷达图、热力图、仪表盘、漏斗图、矩形树图、旭日图、桑基图、箱线图、平行坐标图、K线图、词云图、水球图、树图、关系图等18种图表
- 📱 **多端适配支持** - 支持微信小程序、支付宝小程序、百度小程序、字节跳动小程序、HarmonyOS 和 H5
- 🎨 **灵活的主题定制** - 内置多种预设主题，支持自定义主题和动态主题切换
- 📦 **单包架构设计** - 简化依赖管理，方便使用
- 🚀 **高性能渲染** - 基于 ECharts 优化，支持懒加载和渐进式渲染
- ⚡ **性能分析工具** - 支持帧率监控和内存使用分析
- 🛡️ **错误边界** - 内置 ErrorBoundary 组件，防止图表渲染错误影响应用
- 🪝 **懒加载支持** - 支持图表组件懒加载，优化首屏加载速度
- ↩️ **Undo/Redo 历史** - useChartHistory Hook 追踪配置变更，支持 Ctrl+Z/Y 快捷键
- 🎯 **数据点选择** - useChartSelection Hook 支持单选/多选/反选，程序化控制数据高亮
- 🎯 **标注系统** - 支持 MarkLine、MarkArea 等标注，预设平均线、警戒线等样式
- 📤 **导出功能** - 支持导出为 PNG、JPEG、SVG、PDF 等格式
- 🎬 **专业动画** - 符合设计规范的动画时长和缓动曲线
- 📖 **完善的类型定义** - 完整的 TypeScript 类型支持
- ♿ **无障碍支持** - 键盘导航和屏幕阅读器支持

## 支持的图表类型

TaroViz 支持 18 种图表类型：

| 图表类型 | 描述 | 组件名 |
| -------- | ---- | ------ |
| 折线图 | 用于展示数据随时间或类别变化的趋势 | `LineChart` |
| 柱状图 | 用于比较不同类别的数据大小 | `BarChart` |
| 饼图 | 用于展示数据占比关系 | `PieChart` |
| 散点图 | 用于展示两个变量之间的关系 | `ScatterChart` |
| 雷达图 | 用于展示多维度数据 | `RadarChart` |
| 热力图 | 用于展示数据密度和分布 | `HeatmapChart` |
| 仪表盘 | 用于展示单一指标的进度或状态 | `GaugeChart` |
| 漏斗图 | 用于展示流程中各阶段的数据转化 | `FunnelChart` |
| 矩形树图 | 用于展示带有层级结构的数据 | `TreeMapChart` |
| 旭日图 | 用于展示多层级数据的占比关系 | `SunburstChart` |
| 桑基图 | 用于展示数据流向和转移关系 | `SankeyChart` |
| 箱线图 | 用于展示数据分布（统计对比） | `BoxplotChart` |
| 平行坐标图 | 用于展示高维数据各维度关系 | `ParallelChart` |
| 关系图 | 用于展示实体之间的关系网络 | `GraphChart` |
| K线图 | 用于展示金融数据的 OHLC | `CandlestickChart` |
| 词云图 | 用于展示文本关键词频率 | `WordCloudChart` |
| 水球图 | 用于展示百分比或进度数据 | `LiquidChart` |
| 树图 | 用于展示层级结构数据 | `TreeChart` |

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

## Hooks

TaroViz 提供多个专业级 React Hooks：

```typescript
import {
  useChart,
  useChartHistory,     // Undo/Redo 历史记录
  useChartSelection,   // 数据点选择/高亮
  useChartDownload,    // 导出 PNG/JPEG/SVG/PDF/CSV/JSON
  useChartConnect,     // 多图表联动
  useDataZoom,         // 区域缩放
  useAnimation,        // 动画控制
  useThemeSwitcher,    // 主题切换
  usePerformance,      // 性能监控
  useDataTransform,    // 数据转换
} from '@agions/taroviz';
```

### Undo/Redo 示例

```typescript
const { canUndo, canRedo, undo, redo } = useChartHistory(chartInstance, {
  maxHistorySize: 50,
  enableKeyboard: true, // Ctrl+Z / Ctrl+Y
});
```

### 数据点选择示例

```typescript
const { selectedPoints, select, deselect, clearSelection } = useChartSelection(chartInstance, {
  mode: 'multiple',
});
```

## 架构说明

TaroViz 采用单包架构设计，包含以下核心模块：

| 模块 | 描述 |
| ---- | ---- |
| `core` | 核心组件（BaseChart、Annotation）、类型定义、主题系统 |
| `adapters` | 多平台适配器（H5、微信小程序、支付宝、百度、字节跳动、HarmonyOS等） |
| `charts` | 18种图表组件实现 |
| `hooks` | React Hooks（useChart、useChartHistory、useChartSelection等10个） |
| `core/themes` | 主题系统（内置主题、自定义主题、ThemeManager） |
| `core/utils` | 工具函数（导出、性能分析、下钻等） |

## 技术栈

- **框架**: Taro 3.x / React 18.x
- **图表库**: ECharts 5.4.x
- **构建工具**: Webpack 5 + TypeScript (strict mode)
- **多端支持**: 微信小程序、支付宝小程序、百度小程序、字节跳动小程序、HarmonyOS、H5

## License

MIT
