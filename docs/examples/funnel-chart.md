# 漏斗图示例

漏斗图是一种用于展示业务流程中各阶段转化率的图表类型，适合分析用户转化路径。

## 基本用法

```tsx
import { FunnelChart } from '@agions/taroviz';

const data = {
  series: [
    {
      name: '转化率',
      data: [
        { name: '访问', value: 10000 },
        { name: '注册', value: 8000 },
        { name: '登录', value: 6000 },
        { name: '购买', value: 4000 },
        { name: '支付', value: 2000 },
      ],
    },
  ],
};

function App() {
  return (
    <FunnelChart
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          text: '用户转化漏斗',
        },
        tooltip: {
          trigger: 'item',
        },
      }}
    />
  );
}
```

## 自定义漏斗图

```tsx
import { FunnelChart } from '@agions/taroviz';

const data = {
  series: [
    {
      name: '转化率',
      data: [
        { name: '访问', value: 10000 },
        { name: '注册', value: 8000 },
        { name: '登录', value: 6000 },
        { name: '购买', value: 4000 },
        { name: '支付', value: 2000 },
      ],
    },
  ],
};

function App() {
  return (
    <FunnelChart
      data={data}
      width={300}
      height={200}
      options={{
        title: {
          text: '用户转化漏斗',
        },
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            type: 'funnel',
            left: '10%',
            width: '80%',
            label: {
              show: true,
              position: 'inside',
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1,
            },
          },
        ],
      }}
    />
  );
}
```

## 配置项

漏斗图支持所有 ECharts 漏斗图的配置项，详细请参考 [ECharts 漏斗图文档](https://echarts.apache.org/zh/option.html#series-funnel)。

## 注意事项

- 漏斗图适合展示业务流程中的转化率
- 数据项应按照流程顺序排列
- 可以通过颜色和标签自定义漏斗图样式
