# 热力图示例

热力图是一种用于展示数据密度和分布的图表类型，通过颜色深浅表示数据值的大小。

## 基本用法

```tsx
import { HeatmapChart } from '@agions/taroviz';

const data = {
  series: [
    {
      name: '热力图',
      data: [
        [0, 0, 10],
        [0, 1, 20],
        [1, 0, 30],
        [1, 1, 40],
        [2, 0, 50],
        [2, 1, 60],
      ],
    },
  ],
};

function App() {
  return (
    <HeatmapChart
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          text: '热力图示例',
        },
        tooltip: {
          position: 'top',
        },
        xAxis: {
          type: 'category',
          data: ['A', 'B', 'C'],
        },
        yAxis: {
          type: 'category',
          data: ['X', 'Y', 'Z'],
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
        },
      }}
    />
  );
}
```

## 时间序列热力图

```tsx
import { HeatmapChart } from '@agions/taroviz';

const data = {
  series: [
    {
      name: '访问量',
      data: [
        [0, 0, 10],
        [0, 1, 20],
        [1, 0, 30],
        [1, 1, 40],
        [2, 0, 50],
        [2, 1, 60],
      ],
    },
  ],
};

function App() {
  return (
    <HeatmapChart
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          text: '时间序列热力图',
        },
        tooltip: {
          position: 'top',
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三'],
        },
        yAxis: {
          type: 'category',
          data: ['上午', '下午', '晚上'],
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
        },
      }}
    />
  );
}
```

## 配置项

热力图支持所有 ECharts 热力图的配置项，详细请参考 [ECharts 热力图文档](https://echarts.apache.org/zh/option.html#series-heatmap)。

## 注意事项

- 热力图适合展示数据密度和分布情况
- 可以通过颜色映射直观地表示数据值的大小
- 通常需要配合 `visualMap` 组件使用，以便用户理解颜色对应的数值范围
