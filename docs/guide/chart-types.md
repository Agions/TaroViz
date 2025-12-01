# 图表类型

TaroViz 支持多种图表类型，每种图表类型都有其特定的用途和配置方式。本指南将介绍 TaroViz 支持的所有图表类型及其基本使用方法。

## 支持的图表类型

| 图表类型 | 描述                               | 组件名         |
| -------- | ---------------------------------- | -------------- |
| 折线图   | 用于展示数据随时间或类别变化的趋势 | `LineChart`    |
| 柱状图   | 用于比较不同类别的数据大小         | `BarChart`     |
| 饼图     | 用于展示数据占比关系               | `PieChart`     |
| 散点图   | 用于展示两个变量之间的关系         | `ScatterChart` |
| 雷达图   | 用于展示多维度数据                 | `RadarChart`   |
| 热力图   | 用于展示数据密度和分布             | `HeatmapChart` |
| 仪表盘   | 用于展示单一指标的进度或状态       | `GaugeChart`   |
| 漏斗图   | 用于展示流程中各阶段的数据转化     | `FunnelChart`  |

## 折线图

### 用途

用于展示数据随时间或类别变化的趋势。

### 基本用法

```typescript
import { LineChart } from '@agions/taroviz';

const LineChartDemo = () => {
  const option = {
    title: {
      text: '销售趋势'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['线上', '线下']
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '线上',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110],
        smooth: true
      },
      {
        name: '线下',
        type: 'line',
        data: [90, 150, 120, 100, 80, 130],
        smooth: true
      }
    ]
  };

  return (
    <LineChart
      chartId="line-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

## 柱状图

### 用途

用于比较不同类别的数据大小。

### 基本用法

```typescript
import { BarChart } from '@agions/taroviz';

const BarChartDemo = () => {
  const option = {
    title: {
      text: '产品销量对比'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['2023年', '2024年']
    },
    xAxis: {
      type: 'category',
      data: ['产品A', '产品B', '产品C', '产品D', '产品E']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '2023年',
        type: 'bar',
        data: [350, 250, 200, 150, 100]
      },
      {
        name: '2024年',
        type: 'bar',
        data: [450, 350, 300, 250, 200]
      }
    ]
  };

  return (
    <BarChart
      chartId="bar-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

## 饼图

### 用途

用于展示数据占比关系。

### 基本用法

```typescript
import { PieChart } from '@agions/taroviz';

const PieChartDemo = () => {
  const option = {
    title: {
      text: '销售渠道分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '销售渠道',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 350, name: '线上商城' },
          { value: 250, name: '线下门店' },
          { value: 200, name: '代理商' },
          { value: 150, name: '其他' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <PieChart
      chartId="pie-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

## 散点图

### 用途

用于展示两个变量之间的关系。

### 基本用法

```typescript
import { ScatterChart } from '@agions/taroviz';

const ScatterChartDemo = () => {
  const option = {
    title: {
      text: '身高体重分布'
    },
    xAxis: {
      name: '身高 (cm)',
      type: 'value'
    },
    yAxis: {
      name: '体重 (kg)',
      type: 'value'
    },
    series: [
      {
        type: 'scatter',
        data: [
          [161.2, 51.6],
          [167.5, 59.0],
          [159.5, 49.2],
          [157.0, 63.0],
          [155.8, 53.6],
          [170.0, 59.0],
          [159.1, 47.6],
          [166.0, 69.8],
          [176.2, 66.8],
          [160.2, 75.2]
        ]
      }
    ]
  };

  return (
    <ScatterChart
      chartId="scatter-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

## 雷达图

### 用途

用于展示多维度数据。

### 基本用法

```typescript
import { RadarChart } from '@agions/taroviz';

const RadarChartDemo = () => {
  const option = {
    title: {
      text: '产品性能评估'
    },
    tooltip: {},
    radar: {
      indicator: [
        { name: '性能', max: 100 },
        { name: '易用性', max: 100 },
        { name: '功能', max: 100 },
        { name: '稳定性', max: 100 },
        { name: '兼容性', max: 100 },
        { name: '安全性', max: 100 }
      ]
    },
    series: [
      {
        name: '产品对比',
        type: 'radar',
        data: [
          {
            value: [80, 90, 85, 95, 88, 92],
            name: '产品A'
          },
          {
            value: [75, 85, 90, 92, 85, 88],
            name: '产品B'
          }
        ]
      }
    ]
  };

  return (
    <RadarChart
      chartId="radar-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

## 热力图

### 用途

用于展示数据密度和分布。

### 基本用法

```typescript
import { HeatmapChart } from '@agions/taroviz';

const HeatmapChartDemo = () => {
  // 生成模拟数据
  const data = [];
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 24; j++) {
      data.push([j, i, Math.floor(Math.random() * 100)]);
    }
  }

  const option = {
    title: {
      text: '24小时热力图'
    },
    tooltip: {
      position: 'top'
    },
    grid: {
      height: '50%',
      top: '10%'
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 24 }, (_, i) => `${i}时`),
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: 'category',
      data: Array.from({ length: 12 }, (_, i) => `${i+1}月`),
      splitArea: {
        show: true
      }
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%'
    },
    series: [
      {
        name: '热力图',
        type: 'heatmap',
        data: data,
        label: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <HeatmapChart
      chartId="heatmap-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

## 仪表盘

### 用途

用于展示单一指标的进度或状态。

### 基本用法

```typescript
import { GaugeChart } from '@agions/taroviz';

const GaugeChartDemo = () => {
  const option = {
    title: {
      text: 'CPU 使用率'
    },
    series: [
      {
        name: 'CPU 使用率',
        type: 'gauge',
        detail: {
          formatter: '{value}%'
        },
        data: [{ value: 65, name: '使用率' }]
      }
    ]
  };

  return (
    <GaugeChart
      chartId="gauge-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

## 漏斗图

### 用途

用于展示流程中各阶段的数据转化。

### 基本用法

```typescript
import { FunnelChart } from '@agions/taroviz';

const FunnelChartDemo = () => {
  const option = {
    title: {
      text: '销售漏斗'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      data: ['访问', '咨询', '订单', '支付', '完成']
    },
    series: [
      {
        name: '销售漏斗',
        type: 'funnel',
        left: '10%',
        top: 60,
        bottom: 60,
        width: '80%',
        min: 0,
        max: 1000,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside'
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          label: {
            fontSize: 20
          }
        },
        data: [
          { value: 1000, name: '访问' },
          { value: 800, name: '咨询' },
          { value: 500, name: '订单' },
          { value: 300, name: '支付' },
          { value: 200, name: '完成' }
        ]
      }
    ]
  };

  return (
    <FunnelChart
      chartId="funnel-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

## 下一步

继续阅读 [主题定制](./theming.md) 指南，学习如何自定义图表主题。
