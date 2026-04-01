# 平行坐标图

## 概述

平行坐标图（Parallel Chart）是一种用于展示高维数据的图表类型，通过多条平行轴来表示不同维度，每个数据点在每条轴上都有对应的坐标点，用折线连接形成数据轨迹。

## 基本用法

```tsx
import { ParallelChart } from '@agions/taroviz';

const App = () => {
  const option = {
    title: {
      text: '高维数据可视化',
    },
    parallel: {
      left: '5%',
      right: '10%',
      bottom: '10%',
      top: '20%',
      height: '50%',
    },
    parallelAxisDefault: {
      type: 'value',
      name: '维度',
      nameLocation: 'end',
      nameTextStyle: {
        padding: [0, 0, 0, 50],
      },
    },
    series: [
      {
        type: 'parallel',
        lineStyle: {
          width: 2,
          opacity: 0.5,
        },
        data: [
          [1, 55, 9, 56, 0.46, 2, 35],
          [2, 25, 11, 21, 0.65, 2, 33],
          [3, 56, 7, 63, 0.92, 3, 45],
          [4, 33, 16, 24, 0.33, 3, 23],
          [5, 42, 12, 58, 0.78, 3, 54],
        ],
      },
    ],
  };

  return <ParallelChart option={option} width="100%" height={400} />;
};
```

## 高级配置

### 自定义轴

```tsx
const option = {
  parallel: {
    axisExpandable: true,
    axisExpandCenter: 3,
    axisExpandCount: 3,
    axisExpandWidth: 30,
  },
  parallelAxisDefault: {
    type: 'value',
    nameLocation: 'start',
  },
  series: [
    {
      type: 'parallel',
      lineStyle: {
        width: 3,
        color: '#1890ff',
        opacity: 0.8,
      },
      emphasis: {
        lineStyle: {
          width: 5,
          color: '#40a9ff',
        },
      },
      data: [
        // ... data
      ],
    },
  ],
};
```

### 分类轴

```tsx
const option = {
  parallelAxisDefault: {
    type: 'category',
    data: ['维度A', '维度B', '维度C', '维度D', '维度E', '维度F', '维度G'],
    name: '指标',
  },
  series: [
    {
      type: 'parallel',
      data: [
        ['A', 55, 9, 56, 0.46, 2, 35],
        ['B', 25, 11, 21, 0.65, 2, 33],
      ],
    },
  ],
};
```

## API

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| option | ParallelOption | - | ECharts 平行坐标图配置 |
| width | string \| number | '100%' | 图表宽度 |
| height | string \| number | 400 | 图表高度 |
| className | string | - | CSS 类名 |
| style | CSSProperties | - | 内联样式 |
| loading | boolean | false | 是否显示加载状态 |
| theme | string | - | 主题名称 |

### ParallelOption

| 属性 | 类型 | 说明 |
|------|------|------|
| parallel | ParallelAxisSetting | 坐标系设置 |
| parallelAxisDefault | ParallelAxisItem | 轴默认配置 |
| series[].type | 'parallel' | 图表类型 |
| series[].data | any[][] | 数据 |
| series[].lineStyle | object | 线条样式 |
