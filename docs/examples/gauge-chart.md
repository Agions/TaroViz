# 仪表盘示例

仪表盘是一种用于展示单一指标当前值与目标值关系的图表类型，通常用于监控场景。

## 基本用法

```tsx
import { GaugeChart } from '@agions/taroviz';

const data = {
  series: [
    {
      name: '完成率',
      data: [
        {
          value: 75,
          name: '完成率',
        },
      ],
    },
  ],
};

function App() {
  return (
    <GaugeChart
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          text: '任务完成率',
        },
        tooltip: {
          trigger: 'item',
        },
      }}
    />
  );
}
```

## 自定义仪表盘

```tsx
import { GaugeChart } from '@agions/taroviz';

const data = {
  series: [
    {
      name: '完成率',
      data: [
        {
          value: 75,
          name: '完成率',
        },
      ],
    },
  ],
};

function App() {
  return (
    <GaugeChart
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          text: '任务完成率',
        },
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            type: 'gauge',
            detail: {
              formatter: '{value}%',
            },
            axisLine: {
              lineStyle: {
                width: 20,
                color: [
                  [0.3, '#67e0e3'],
                  [0.7, '#37a2da'],
                  [1, '#fd666d'],
                ],
              },
            },
          },
        ],
      }}
    />
  );
}
```

## 配置项

仪表盘支持所有 ECharts 仪表盘的配置项，详细请参考 [ECharts 仪表盘文档](https://echarts.apache.org/zh/option.html#series-gauge)。

## 注意事项

- 仪表盘适合展示单一指标的当前状态
- 可以通过颜色分段表示不同的状态区间
- 通常用于实时监控场景
