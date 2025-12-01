# 散点图示例

散点图是一种用于展示两个变量之间关系的图表类型。

## 基本用法

```tsx
import { ScatterChart } from '@agions/taroviz';

const data = {
  series: [
    {
      name: '数据点',
      data: [
        [10, 20],
        [20, 30],
        [30, 40],
        [40, 50],
        [50, 60],
      ],
    },
  ],
};

function App() {
  return (
    <ScatterChart
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          text: '散点图示例',
        },
        tooltip: {
          trigger: 'item',
        },
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'value',
        },
      }}
    />
  );
}
```

## 多系列散点图

```tsx
import { ScatterChart } from '@agions/taroviz';

const data = {
  series: [
    {
      name: '系列1',
      data: [
        [10, 20],
        [20, 30],
        [30, 40],
        [40, 50],
        [50, 60],
      ],
    },
    {
      name: '系列2',
      data: [
        [15, 25],
        [25, 35],
        [35, 45],
        [45, 55],
        [55, 65],
      ],
    },
  ],
};

function App() {
  return (
    <ScatterChart
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          text: '多系列散点图',
        },
        tooltip: {
          trigger: 'item',
        },
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'value',
        },
      }}
    />
  );
}
```

## 配置项

散点图支持所有 ECharts 散点图的配置项，详细请参考 [ECharts 散点图文档](https://echarts.apache.org/zh/option.html#series-scatter)。

## 注意事项

- 散点图适合展示两个变量之间的关系
- 可以通过颜色区分不同系列的数据
- 可以通过点的大小表示第三个变量
