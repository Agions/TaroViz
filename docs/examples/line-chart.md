# 折线图示例

折线图是一种用于展示数据随时间或类别变化趋势的图表类型。

## 基本用法

```tsx
import { LineChart } from '@agions/taroviz';

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
    <LineChart
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          text: '周销量趋势',
        },
        tooltip: {
          trigger: 'axis',
        },
      }}
    />
  );
}
```

## 多系列折线图

```tsx
import { LineChart } from '@agions/taroviz';

const data = {
  categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  series: [
    {
      name: '销量',
      data: [120, 200, 150, 80, 70, 110, 130],
    },
    {
      name: '利润',
      data: [60, 100, 75, 40, 35, 55, 65],
    },
  ],
};

function App() {
  return (
    <LineChart
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          text: '周销量与利润趋势',
        },
        tooltip: {
          trigger: 'axis',
        },
      }}
    />
  );
}
```

## 配置项

折线图支持所有 ECharts 折线图的配置项，详细请参考 [ECharts 折线图文档](https://echarts.apache.org/zh/option.html#series-line)。

## 注意事项

- 折线图适合展示连续数据的变化趋势
- 建议系列数量不超过5个，否则图表会变得复杂难以阅读
- 可以通过 `options.series` 配置线条样式、标记点等
