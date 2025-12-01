# 柱状图示例

柱状图是一种用于比较不同类别数据大小的图表类型。

## 基本用法

```tsx
import { BarChart } from '@agions/taroviz';

const data = {
  categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  series: [
    {
      name: '销量',
      data: [120, 200, 150, 80, 70, 110, 130],
    },
  ],
};

function App() {
  return (
    <BarChart
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          text: '周销量统计',
        },
        tooltip: {
          trigger: 'axis',
        },
      }}
    />
  );
}
```

## 堆叠柱状图

```tsx
import { BarChart } from '@agions/taroviz';

const data = {
  categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  series: [
    {
      name: '线上销量',
      data: [60, 100, 75, 40, 35, 55, 65],
    },
    {
      name: '线下销量',
      data: [60, 100, 75, 40, 35, 55, 65],
    },
  ],
};

function App() {
  return (
    <BarChart
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          text: '线上线下销量对比',
        },
        tooltip: {
          trigger: 'axis',
        },
        series: [
          {
            type: 'bar',
            stack: 'total',
          },
          {
            type: 'bar',
            stack: 'total',
          },
        ],
      }}
    />
  );
}
```

## 配置项

柱状图支持所有 ECharts 柱状图的配置项，详细请参考 [ECharts 柱状图文档](https://echarts.apache.org/zh/option.html#series-bar)。

## 注意事项

- 柱状图适合比较不同类别的数据大小
- 可以通过堆叠柱状图展示数据的组成部分
- 建议类别数量不超过10个，否则图表会变得拥挤
