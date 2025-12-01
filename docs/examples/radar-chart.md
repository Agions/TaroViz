# 雷达图示例

雷达图是一种用于展示多维度数据的图表类型，适合比较不同对象在多个维度上的表现。

## 基本用法

```tsx
import { RadarChart } from '@agions/taroviz';

const data = {
  series: [
    {
      name: '产品A',
      data: [80, 90, 70, 85, 95, 75],
    },
  ],
};

function App() {
  return (
    <RadarChart
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          text: '产品性能评估',
        },
        tooltip: {
          trigger: 'item',
        },
        radar: {
          indicator: [
            { name: '性能', max: 100 },
            { name: '易用性', max: 100 },
            { name: '功能', max: 100 },
            { name: '稳定性', max: 100 },
            { name: '安全性', max: 100 },
            { name: '可扩展性', max: 100 },
          ],
        },
      }}
    />
  );
}
```

## 多系列雷达图

```tsx
import { RadarChart } from '@agions/taroviz';

const data = {
  series: [
    {
      name: '产品A',
      data: [80, 90, 70, 85, 95, 75],
    },
    {
      name: '产品B',
      data: [90, 80, 85, 90, 85, 95],
    },
  ],
};

function App() {
  return (
    <RadarChart
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          text: '产品性能对比',
        },
        tooltip: {
          trigger: 'item',
        },
        radar: {
          indicator: [
            { name: '性能', max: 100 },
            { name: '易用性', max: 100 },
            { name: '功能', max: 100 },
            { name: '稳定性', max: 100 },
            { name: '安全性', max: 100 },
            { name: '可扩展性', max: 100 },
          ],
        },
      }}
    />
  );
}
```

## 配置项

雷达图支持所有 ECharts 雷达图的配置项，详细请参考 [ECharts 雷达图文档](https://echarts.apache.org/zh/option.html#series-radar)。

## 注意事项

- 雷达图适合展示多维度数据的对比
- 建议维度数量在3-8个之间，过多会影响可读性
- 可以通过不同颜色区分不同系列的数据
