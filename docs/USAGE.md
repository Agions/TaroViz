# TaroViz 使用文档

TaroViz 是一个基于 ECharts 的 Taro 图表库，支持 H5 和小程序环境。本文档介绍如何使用 TaroViz 在 Taro 应用中展示各种图表。

## 目录

- [安装](#安装)
- [基本使用](#基本使用)
- [支持的图表类型](#支持的图表类型)
- [配置项](#配置项)
- [事件监听](#事件监听)
- [实例方法](#实例方法)
- [主题定制](#主题定制)
- [移动端适配](#移动端适配)
- [性能优化](#性能优化)
- [平台差异](#平台差异)
- [常见问题](#常见问题)

## 安装

```bash
# 使用 npm
npm install taroviz

# 使用 yarn
yarn add taroviz

# 使用 pnpm
pnpm add taroviz
```

## 基本使用

### 引入组件

```jsx
import { Chart } from 'taroviz';
```

### 基础示例

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { Chart } from 'taroviz';

const Index = () => {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }]
  };

  return (
    <View style={{ height: '300px' }}>
      <Chart option={option} />
    </View>
  );
};

export default Index;
```

## 支持的图表类型

TaroViz 支持 ECharts 的所有图表类型，包括但不限于：

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

## 配置项

Chart 组件支持以下属性：

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| option | Object | - | ECharts 配置项，与 ECharts 配置完全兼容 |
| theme | string/Object | - | 主题，可以是内置主题名称或自定义主题对象 |
| width | string/number | '100%' | 图表宽度 |
| height | string/number | '300px' | 图表高度 |
| loading | boolean | false | 是否显示加载动画 |
| notMerge | boolean | false | 是否不合并数据，设为 true 时，option 中的数据将全量替换 |
| lazyUpdate | boolean | false | 是否延迟更新 |
| onInit | function | - | 图表初始化完成的回调函数 |
| onRendered | function | - | 图表渲染完成的回调函数 |
| onError | function | - | 图表渲染出错的回调函数 |
| canvasId | string | - | 自定义 canvas id |
| style | Object | - | 容器样式 |
| className | string | - | 容器类名 |

## 事件监听

TaroViz 支持监听 ECharts 的各种事件。可以通过获取图表实例来添加事件监听：

```jsx
import React, { useRef } from 'react';
import { View } from '@tarojs/components';
import { Chart } from 'taroviz';

const Index = () => {
  const chartRef = useRef(null);

  const option = {
    // ECharts 配置...
  };

  const handleInit = (chart) => {
    chartRef.current = chart;

    // 添加点击事件监听
    chart.on('click', (params) => {
      console.log('点击了图表：', params);
    });
  };

  return (
    <View style={{ height: '300px' }}>
      <Chart option={option} onInit={handleInit} />
    </View>
  );
};

export default Index;
```

## 实例方法

通过 `onInit` 回调获取到图表实例后，可以调用以下方法：

- `setOption(option, [notMerge], [lazyUpdate])`: 设置图表配置项
- `resize()`: 改变图表尺寸
- `dispatchAction(payload)`: 触发图表行为
- `getDataURL([opts])`: 导出图表为图片
- `clear()`: 清空图表
- `dispose()`: 销毁图表实例

示例：

```jsx
// 更新图表数据
chartRef.current.setOption({
  series: [{
    data: [123, 456, 789]
  }]
});

// 调整图表大小
chartRef.current.resize();

// 触发高亮操作
chartRef.current.dispatchAction({
  type: 'highlight',
  seriesIndex: 0,
  dataIndex: 1
});
```

## 主题定制

TaroViz 支持 ECharts 的主题功能，可以使用内置主题或自定义主题：

```jsx
// 使用内置主题
<Chart option={option} theme="dark" />

// 使用自定义主题
const customTheme = {
  color: ['#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'],
  backgroundColor: '#f0f0f0',
  textStyle: {},
  // 更多主题配置...
};

<Chart option={option} theme={customTheme} />
```

## 移动端适配

TaroViz 已针对移动端进行优化，建议遵循以下最佳实践：

1. 设置合适的容器高度
2. 简化图表配置，减少元素数量
3. 使用适当的字体大小和间距
4. 优化交互方式，适应触摸操作

```jsx
// 移动端优化示例
const option = {
  grid: {
    // 留出更多空间给坐标轴标签
    left: '10%',
    right: '10%'
  },
  xAxis: {
    // 斜角展示长文本
    axisLabel: {
      rotate: 45,
      fontSize: 12
    }
  },
  tooltip: {
    // 触摸友好的提示框
    triggerOn: 'click',
    enterable: true
  }
  // 其他配置...
};
```

## 性能优化

对于大数据量或复杂图表，可以使用以下优化策略：

1. 使用数据抽样或聚合
2. 启用渐进渲染
3. 使用懒加载
4. 减少不必要的动画和特效

```jsx
// 性能优化配置示例
const option = {
  // 启用渐进渲染
  progressive: 200,
  progressiveThreshold: 1000,

  // 减少动画时间
  animation: true,
  animationDuration: 500,

  // 简化线条绘制
  series: [{
    type: 'line',
    sampling: 'average', // 数据抽样
    showSymbol: false,   // 不显示标记点
    lineStyle: {
      width: 1           // 细线
    }
  }]
};
```

## 平台差异

TaroViz 支持以下平台：

- H5
- 微信小程序
- 支付宝小程序
- 百度小程序
- QQ小程序
- 京东小程序
- 抖音小程序
- 钉钉小程序
- 快手小程序
- 鸿蒙系统

大部分功能在各平台表现一致，但存在以下差异：

- 某些小程序平台的 Canvas 2D 功能可能受限
- 部分平台可能不支持某些高级特效
- 渲染性能在不同平台有差异

## 常见问题

### 图表不显示或显示空白

可能原因：
- 容器高度未设置
- 数据为空
- Canvas 上下文获取失败

解决方案：
- 确保容器有明确的高度
- 检查数据格式是否正确
- 在真机环境测试

### 图表性能问题

可能原因：
- 数据量过大
- 频繁更新
- 复杂特效

解决方案：
- 减少数据点
- 降低更新频率
- 简化图表配置

### 样式与预期不符

可能原因：
- 主题冲突
- 容器样式影响
- 平台差异

解决方案：
- 明确设置主题
- 检查容器样式
- 针对特定平台调整
