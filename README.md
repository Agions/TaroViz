# TaroViz

[![npm version](https://img.shields.io/npm/v/taroviz.svg)](https://www.npmjs.com/package/taroviz)
[![npm downloads](https://img.shields.io/npm/dm/taroviz.svg)](https://www.npmjs.com/package/taroviz)
[![license](https://img.shields.io/npm/l/taroviz.svg)](https://github.com/agions/taroviz/blob/main/LICENSE)

基于 ECharts 的 Taro 图表库，支持 H5 和小程序环境。

## 特性

- 🎯 基于 ECharts 5.x
- 📱 支持 H5 和小程序环境
- 🎨 支持主题定制
- 📦 支持按需引入
- 🔄 支持动态数据更新
- 🎭 支持图表交互
- 📊 支持多种图表类型
- 🛠 支持自定义配置
- 🎯 多端适配: 一套代码，多端运行 (微信小程序、H5、支付宝小程序、鸿蒙)
- 📊 图表丰富: 支持大部分 ECharts 图表类型和特性
- 🔌 按需引入: 支持按需引入只需要的图表类型
- 📱 响应式: 自动适配不同屏幕大小
- 💡 开箱即用: 内置丰富的示例和模板
- 🛠️ 完善的类型定义: 提供 TypeScript 类型支持

## 安装

```bash
npm install --save taroviz
# 或者
yarn add taroviz
```

## 快速开始

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { Chart } from 'taroviz';

export default function Page() {
  const option = {
    title: {
      text: '基础折线图'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }]
  };

  return (
    <View className='page'>
      <Chart option={option} />
    </View>
  );
}
```

## 文档

- [使用文档](docs/USAGE.md)
- [开发文档](docs/DEVELOPMENT.md)
- [贡献指南](CONTRIBUTING.md)
- [更新日志](CHANGELOG.md)

## 支持的图表类型

- 折线图 (line)
- 柱状图 (bar)
- 饼图 (pie)
- 散点图 (scatter)
- 雷达图 (radar)
- 地图 (map)
- 仪表盘 (gauge)
- 热力图 (heatmap)
- 树图 (tree)
- 矩形树图 (treemap)
- 桑基图 (sankey)
- 漏斗图 (funnel)
- 箱线图 (boxplot)
- 平行坐标系 (parallel)
- 主题河流图 (themeRiver)
- 旭日图 (sunburst)
- 词云图 (wordCloud)
- 关系图 (graph)
- 日历图 (calendar)
- 自定义系列 (custom)
- 面积图 (area)
- 堆叠柱状图 (stacked bar)
- 环形图 (donut)
- K线图 (candlestick)
- 水球图 (liquid)
- 路线图 (lines)
- 和弦图 (chord)

## 图表类型

TaroViz 支持以下图表类型:

### 基础图表
- 折线图 (Line)
- 柱状图 (Bar)
- 饼图 (Pie)
- 面积图 (Area)
- 堆叠柱状图 (Stacked Bar)
- 环形图 (Donut)

### 统计图表
- 散点图 (Scatter)
- 雷达图 (Radar)
- 箱线图 (Boxplot)
- K线图 (Candlestick)

### 关系图表
- 关系图 (Graph)
- 桑基图 (Sankey)
- 和弦图 (Chord)

### 层级图表
- 树图 (Tree)
- 矩形树图 (Treemap)
- 旭日图 (Sunburst)

### 地理图表
- 地图 (Map)
- 热力图 (Heatmap)
- 地理连线图 (Lines)

### 特殊图表
- 仪表盘 (Gauge)
- 水球图 (Liquid)
- 词云图 (Wordcloud)

## 高级配置

TaroViz 提供了丰富的自定义配置选项:

```jsx
<Chart
  option={option}
  theme="dark"
  width="100%"
  height="300px"
  loading={false}
  customConfig={{
    // 简化配置
    colorPalette: ['#5470c6', '#91cc75', '#fac858'],
    tooltipFormatter: (params) => `${params.name}: ${params.value}`,
    legendFormatter: (name) => `${name}系列`,
    axisLabelFormatter: (value) => `${value}单位`,
    // 视觉配置
    fontFamily: 'Arial',
    animation: true,
    animationDuration: 1000,
    // 布局配置
    grid: { top: 40, right: 8, bottom: 40, left: 50 },
    titlePosition: 'center'
  }}
  onEvents={{
    click: (params) => console.log('点击了', params)
  }}
/>
```

## 最新版本 (0.3.0) 更新

- 新增8种图表类型示例:
  - 关系图表: 桑基图(Sankey)、和弦图(Chord)
  - 层级图表: 矩形树图(Treemap)、旭日图(Sunburst)
  - 地理图表: 热力图(Heatmap)、地理连线图(Lines)
  - 特殊图表: 水球图(Liquid)、词云图(Wordcloud)
- 添加了特殊图表所需的依赖库支持
- 优化了图表类型的管理和组织结构
- 改进了构建系统，提升了跨平台兼容性

## 开发计划

### v0.3.0 (已完成)
- [x] 支持更多图表类型
- [x] 添加更多示例
- [x] 完善文档
- [x] 支持更多自定义配置

### v0.4.0 (计划中)
- [ ] 优化性能
- [ ] 添加单元测试
- [ ] 添加 E2E 测试
- [ ] 支持更多平台
- [ ] 支持更多主题
- [ ] 支持更多交互方式
- [ ] 支持图表联动
- [ ] 支持数据导出
- [ ] 支持图表动画
- [ ] 支持图表事件
- [ ] 支持图表布局
- [ ] 支持图表缩放
- [ ] 支持图表拖拽
- [ ] 支持图表旋转
- [ ] 支持图表镜像

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT
