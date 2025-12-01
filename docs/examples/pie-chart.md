# 饼图示例

饼图是一种用于展示各部分占总体比例关系的图表类型。

## 基本用法

```tsx
import { PieChart } from '@agions/taroviz';

const data = {
  series: [
    {
      name: '销量',
      data: [
        { name: '周一', value: 120 },
        { name: '周二', value: 200 },
        { name: '周三', value: 150 },
        { name: '周四', value: 80 },
        { name: '周五', value: 70 },
      ],
    },
  ],
};

function App() {
  return (
    <PieChart
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          text: '周销量占比',
        },
        tooltip: {
          trigger: 'item',
        },
      }}
    />
  );
}
```

## 环形图

```tsx
import { PieChart } from '@agions/taroviz';

const data = {
  series: [
    {
      name: '销量',
      data: [
        { name: '周一', value: 120 },
        { name: '周二', value: 200 },
        { name: '周三', value: 150 },
        { name: '周四', value: 80 },
        { name: '周五', value: 70 },
      ],
    },
  ],
};

function App() {
  return (
    <PieChart
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          text: '周销量占比',
        },
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
          },
        ],
      }}
    />
  );
}
```

## 配置项

饼图支持所有 ECharts 饼图的配置项，详细请参考 [ECharts 饼图文档](https://echarts.apache.org/zh/option.html#series-pie)。

## 注意事项

- 饼图适合展示各部分占总体的比例关系
- 建议数据项数量不超过10个，否则会影响可读性
- 可以通过 `radius` 配置项创建环形图
