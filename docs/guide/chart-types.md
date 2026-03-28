# 图表类型

TaroViz 支持 11 种图表类型，每种图表都有其特定的使用场景和配置方式。

## 图表速览

| 图表 | 组件 | 最佳场景 |
|:---|:---|:---|
| 折线图 | `LineChart` | 趋势变化、时间序列 |
| 柱状图 | `BarChart` | 类别比较、数量对比 |
| 饼图 | `PieChart` | 占比分布、部分与整体 |
| 散点图 | `ScatterChart` | 关联关系、分布密度 |
| 雷达图 | `RadarChart` | 多维度评估、综合对比 |
| 热力图 | `HeatmapChart` | 密度分布、时序模式 |
| 仪表盘 | `GaugeChart` | 单指标进度、状态展示 |
| 漏斗图 | `FunnelChart` | 转化漏斗、流程分析 |
| 矩形树图 | `TreeMapChart` | 层级占比、目录结构 |
| 旭日图 | `SunburstChart` | 多级占比、层级下钻 |
| 桑基图 | `SankeyChart` | 流向分析、能量转移 |

---

## 折线图 LineChart

::: tip 适用场景
用于展示数据随时间或类别的变化趋势，是最常用的图表之一。
:::

```typescript
import { LineChart } from '@agions/taroviz';

const option = {
  title: { text: '销售趋势' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['线上', '线下'] },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: { type: 'value' },
  series: [
    { name: '线上', type: 'line', data: [120, 200, 150, 80, 70, 110], smooth: true },
    { name: '线下', type: 'line', data: [90, 150, 120, 100, 80, 130], smooth: true }
  ]
};

<LineChart chartId="line" option={option} width="100%" height={400} />
```

---

## 柱状图 BarChart

::: tip 适用场景
用于比较不同类别的数据大小，直观展示高低差异。
:::

```typescript
import { BarChart } from '@agions/taroviz';

const option = {
  title: { text: '产品销量对比' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['2023年', '2024年'] },
  xAxis: { type: 'category', data: ['产品A', '产品B', '产品C', '产品D', '产品E'] },
  yAxis: { type: 'value' },
  series: [
    { name: '2023年', type: 'bar', data: [350, 250, 200, 150, 100] },
    { name: '2024年', type: 'bar', data: [450, 350, 300, 250, 200] }
  ]
};

<BarChart chartId="bar" option={option} width="100%" height={400} />
```

---

## 饼图 PieChart

::: tip 适用场景
用于展示数据占比关系，强调部分在整体中的比例。
:::

```typescript
import { PieChart } from '@agions/taroviz';

const option = {
  title: { text: '销售渠道分布', left: 'center' },
  tooltip: { trigger: 'item' },
  legend: { orient: 'vertical', left: 'left' },
  series: [{
    type: 'pie',
    radius: '50%',
    data: [
      { value: 350, name: '线上商城' },
      { value: 250, name: '线下门店' },
      { value: 200, name: '代理商' },
      { value: 150, name: '其他' }
    ],
    emphasis: {
      itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' }
    }
  }]
};

<PieChart chartId="pie" option={option} width="100%" height={400} />
```

---

## 散点图 ScatterChart

::: tip 适用场景
用于展示两个变量之间的关系，发现数据规律和异常值。
:::

```typescript
import { ScatterChart } from '@agions/taroviz';

const option = {
  title: { text: '身高体重分布' },
  xAxis: { name: '身高 (cm)', type: 'value' },
  yAxis: { name: '体重 (kg)', type: 'value' },
  series: [{
    type: 'scatter',
    data: [
      [161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0],
      [155.8, 53.6], [170.0, 59.0], [159.1, 47.6], [166.0, 69.8]
    ]
  }]
};

<ScatterChart chartId="scatter" option={option} width="100%" height={400} />
```

---

## 雷达图 RadarChart

::: tip 适用场景
用于展示多维度数据，直观对比不同主体的综合表现。
:::

```typescript
import { RadarChart } from '@agions/taroviz';

const option = {
  title: { text: '产品性能评估' },
  radar: {
    indicator: [
      { name: '性能', max: 100 },
      { name: '易用性', max: 100 },
      { name: '功能', max: 100 },
      { name: '稳定性', max: 100 },
      { name: '兼容性', max: 100 }
    ]
  },
  series: [{
    type: 'radar',
    data: [
      { value: [80, 90, 85, 95, 88], name: '产品A' },
      { value: [75, 85, 90, 92, 85], name: '产品B' }
    ]
  }]
};

<RadarChart chartId="radar" option={option} width="100%" height={400} />
```

---

## 热力图 HeatmapChart

::: tip 适用场景
用于展示数据密度和分布模式，揭示时序和类别交叉的规律。
:::

```typescript
import { HeatmapChart } from '@agions/taroviz';

const option = {
  title: { text: '24小时访问热力图' },
  tooltip: { position: 'top' },
  xAxis: { type: 'category', data: Array.from({length: 24}, (_, i) => `${i}时`) },
  yAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五'] },
  visualMap: { min: 0, max: 100, calculable: true, orient: 'horizontal', left: 'center' },
  series: [{
    type: 'heatmap',
    data: [[0,0,5], [1,0,8], [2,0,12], /* ... more data */]
  }]
};

<HeatmapChart chartId="heatmap" option={option} width="100%" height={400} />
```

---

## 仪表盘 GaugeChart

::: tip 适用场景
用于展示单一指标的进度或状态，如 CPU 使用率、销售目标完成度。
:::

```typescript
import { GaugeChart } from '@agions/taroviz';

const option = {
  series: [{
    type: 'gauge',
    detail: { formatter: '{value}%' },
    data: [{ value: 65, name: '使用率' }]
  }]
};

<GaugeChart chartId="gauge" option={option} width="100%" height={400} />
```

---

## 漏斗图 FunnelChart

::: tip 适用场景
用于展示流程中各阶段的数据转化，如用户转化、订单漏斗。
:::

```typescript
import { FunnelChart } from '@agions/taroviz';

const option = {
  title: { text: '销售漏斗' },
  tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c}%' },
  series: [{
    type: 'funnel',
    left: '10%', width: '80%',
    data: [
      { value: 1000, name: '访问' },
      { value: 800, name: '咨询' },
      { value: 500, name: '订单' },
      { value: 300, name: '支付' },
      { value: 200, name: '完成' }
    ]
  }]
};

<FunnelChart chartId="funnel" option={option} width="100%" height={400} />
```

---

## 矩形树图 TreeMapChart

::: tip 适用场景
用于展示带有层级结构的数据，矩形面积代表数据大小。
:::

```typescript
import { TreeMapChart } from '@agions/taroviz';

const option = {
  title: { text: '文件目录结构' },
  series: [{
    type: 'treemap',
    data: [
      { name: 'src', children: [
        { name: 'components', value: 30 },
        { name: 'hooks', value: 20 },
        { name: 'pages', value: 35 }
      ]}
    ]
  }]
};

<TreeMapChart chartId="treemap" option={option} width="100%" height={400} />
```

---

## 旭日图 SunburstChart

::: tip 适用场景
用于展示多层级数据的占比关系，支持交互式下钻。
:::

```typescript
import { SunburstChart } from '@agions/taroviz';

const option = {
  title: { text: '销售分布' },
  series: [{
    type: 'sunburst',
    radius: ['0%', '90%'],
    data: [
      { name: '华东', value: 40, children: [
        { name: '上海', value: 15 },
        { name: '杭州', value: 12 }
      ]},
      { name: '华南', value: 35, children: [
        { name: '深圳', value: 15 }
      ]}
    ]
  }]
};

<SunburstChart chartId="sunburst" option={option} width="100%" height={400} />
```

---

## 桑基图 SankeyChart

::: tip 适用场景
用于展示数据流向和转移关系，如用户行为路径、能源流转。
:::

```typescript
import { SankeyChart } from '@agions/taroviz';

const option = {
  title: { text: '用户行为流向' },
  series: [{
    type: 'sankey',
    layout: 'none',
    emphasis: { focus: 'adjacency' },
    data: [
      { name: '首页' }, { name: '商品列表' }, { name: '商品详情' },
      { name: '购物车' }, { name: '支付' }
    ],
    links: [
      { source: '首页', target: '商品列表', value: 100 },
      { source: '商品列表', target: '商品详情', value: 60 },
      { source: '商品详情', target: '购物车', value: 40 },
      { source: '购物车', target: '支付', value: 30 }
    ]
  }]
};

<SankeyChart chartId="sankey" option={option} width="100%" height={400} />
```

---

## 下一步

<div class="next-steps">

[主题定制 →](./theming.md)

</div>

<style scoped>

.next-steps {
  margin-top: 24px;
  padding: 16px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  display: inline-block;
}

.next-steps a {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  text-decoration: none;
}

</style>
