# 箱线图

## 概述

箱线图（Boxplot）是一种用于展示数据分布的图表类型，能够直观地显示数据的最小值、Q1（中位数下四分位数）、中位数、Q3（中位数上四分位数）和最大值。

## 基本用法

```tsx
import { BoxplotChart } from 'taroviz';

const App = () => {
  const option = {
    title: {
      text: '箱线图示例',
    },
    xAxis: {
      type: 'category',
      data: ['Group A', 'Group B', 'Group C'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'boxplot',
        data: [
          [850, 940, 980, 1050, 1130],  // Group A: min, Q1, median, Q3, max
          [920, 1000, 1050, 1150, 1200], // Group B
          [780, 850, 920, 1050, 1150],   // Group C
        ],
      },
    ],
  };

  return <BoxplotChart option={option} width="100%" height={400} />;
};
```

## 高级配置

### 自定义样式

```tsx
const option = {
  series: [
    {
      type: 'boxplot',
      data: [
        [850, 940, 980, 1050, 1130],
        [920, 1000, 1050, 1150, 1200],
      ],
      itemStyle: {
        color: '#1890ff',
        borderColor: '#000',
        borderWidth: 2,
      },
      emphasis: {
        itemStyle: {
          color: '#40a9ff',
          borderColor: '#1890ff',
          borderWidth: 3,
        },
      },
    },
  ],
};
```

### 多组数据对比

```tsx
const option = {
  // ... xAxis and yAxis config
  series: [
    {
      name: '2024',
      type: 'boxplot',
      data: [[850, 940, 980, 1050, 1130], [920, 1000, 1050, 1150, 1200]],
    },
    {
      name: '2025',
      type: 'boxplot',
      data: [[800, 900, 950, 1000, 1100], [880, 960, 1020, 1120, 1180]],
    },
  ],
};
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| option | BoxplotOption | - | ECharts 箱线图配置 |
| width | string \| number | '100%' | 图表宽度 |
| height | string \| number | 400 | 图表高度 |
| className | string | - | CSS 类名 |
| style | CSSProperties | - | 内联样式 |
| loading | boolean | false | 是否显示加载状态 |
| theme | string | - | 主题名称 |

### BoxplotOption

继承自 ECharts 的 [Boxplot Series](https://echarts.apache.org/zh/option.html#series-boxplot)，主要配置项：

| 属性 | 类型 | 说明 |
|------|------|------|
| type | 'boxplot' | 图表类型 |
| data | number[][] | 箱线图数据，每项为 [min, Q1, median, Q3, max] |
| name | string | 系列名称 |
| itemStyle | object | 箱体样式 |
| emphasis | object | 高亮样式 |
