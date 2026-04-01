# 图表组件

TaroViz 提供了多种图表组件，每种图表组件都继承自 BaseChart，具有相同的基础属性和方法。

## LineChart

折线图组件，用于展示数据随时间或类别变化的趋势。

### 导入

```typescript
import { LineChart } from '@agions/taroviz';
```

### 示例

```typescript
import React from 'react';
import { LineChart } from '@agions/taroviz';

const LineChartDemo = () => {
  const option = {
    title: {
      text: '销售趋势'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '线上销售',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110]
      },
      {
        name: '线下销售',
        type: 'line',
        data: [90, 150, 120, 100, 80, 130]
      }
    ]
  };

  return (
    <LineChart
      chartId="line-chart-demo"
      option={option}
      width="100%"
      height={400}
    />
  );
};

export default LineChartDemo;
```

## BarChart

柱状图组件，用于比较不同类别的数据大小。

### 导入

```typescript
import { BarChart } from '@agions/taroviz';
```

### 示例

```typescript
import React from 'react';
import { BarChart } from '@agions/taroviz';

const BarChartDemo = () => {
  const option = {
    title: {
      text: '产品销量对比'
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
        name: '销量',
        type: 'bar',
        data: [350, 250, 200, 150, 100]
      }
    ]
  };

  return (
    <BarChart
      chartId="bar-chart-demo"
      option={option}
      width="100%"
      height={400}
    />
  );
};

export default BarChartDemo;
```

## PieChart

饼图组件，用于展示数据占比关系。

### 导入

```typescript
import { PieChart } from '@agions/taroviz';
```

### 示例

```typescript
import React from 'react';
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
        ]
      }
    ]
  };

  return (
    <PieChart
      chartId="pie-chart-demo"
      option={option}
      width="100%"
      height={400}
    />
  );
};

export default PieChartDemo;
```

## ScatterChart

散点图组件，用于展示两个变量之间的关系。

### 导入

```typescript
import { ScatterChart } from '@agions/taroviz';
```

### 示例

```typescript
import React from 'react';
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
      chartId="scatter-chart-demo"
      option={option}
      width="100%"
      height={400}
    />
  );
};

export default ScatterChartDemo;
```

## RadarChart

雷达图组件，用于展示多维度数据。

### 导入

```typescript
import { RadarChart } from '@agions/taroviz';
```

### 示例

```typescript
import React from 'react';
import { RadarChart } from '@agions/taroviz';

const RadarChartDemo = () => {
  const option = {
    title: {
      text: '产品性能评估'
    },
    radar: {
      indicator: [
        { name: '易用性', max: 100 },
        { name: '性能', max: 100 },
        { name: '功能完整性', max: 100 },
        { name: '可扩展性', max: 100 },
        { name: '安全性', max: 100 },
        { name: '维护性', max: 100 }
      ]
    },
    series: [
      {
        name: '产品评估',
        type: 'radar',
        data: [
          {
            value: [80, 90, 85, 75, 95, 85],
            name: '产品A'
          },
          {
            value: [70, 85, 80, 90, 85, 90],
            name: '产品B'
          }
        ]
      }
    ]
  };

  return (
    <RadarChart
      chartId="radar-chart-demo"
      option={option}
      width="100%"
      height={400}
    />
  );
};

export default RadarChartDemo;
```

## HeatmapChart

热力图组件，用于展示数据密度和分布。

### 导入

```typescript
import { HeatmapChart } from '@agions/taroviz';
```

### 示例

```typescript
import React from 'react';
import { HeatmapChart } from '@agions/taroviz';

const HeatmapChartDemo = () => {
  const option = {
    title: {
      text: '用户访问热力图'
    },
    tooltip: {
      position: 'top'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
        name: '访问量',
        type: 'heatmap',
        data: [
          [0, 0, 50],
          [0, 1, 60],
          [0, 2, 70],
          [0, 3, 80],
          [0, 4, 90],
          [0, 5, 100],
          [0, 6, 80],
          // 更多数据...
        ],
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
      chartId="heatmap-chart-demo"
      option={option}
      width="100%"
      height={400}
    />
  );
};

export default HeatmapChartDemo;
```

## GaugeChart

仪表盘组件，用于展示单一指标的进度或状态。

### 导入

```typescript
import { GaugeChart } from '@agions/taroviz';
```

### 示例

```typescript
import React from 'react';
import { GaugeChart } from '@agions/taroviz';

const GaugeChartDemo = () => {
  const option = {
    title: {
      text: '任务完成率'
    },
    series: [
      {
        name: '完成率',
        type: 'gauge',
        detail: {
          formatter: '{value}%'
        },
        data: [
          {
            value: 75,
            name: '完成率'
          }
        ]
      }
    ]
  };

  return (
    <GaugeChart
      chartId="gauge-chart-demo"
      option={option}
      width="100%"
      height={400}
    />
  );
};

export default GaugeChartDemo;
```

## FunnelChart

漏斗图组件，用于展示流程中各阶段的数据转化。

### 导入

```typescript
import { FunnelChart } from '@agions/taroviz';
```

### 示例

```typescript
import React from 'react';
import { FunnelChart } from '@agions/taroviz';

const FunnelChartDemo = () => {
  const option = {
    title: {
      text: '销售漏斗'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%'
    },
    legend: {
      data: ['访问', '咨询', '订单', '支付', '完成']
    },
    series: [
      {
        name: '转化率',
        type: 'funnel',
        data: [
          { value: 100, name: '访问' },
          { value: 80, name: '咨询' },
          { value: 60, name: '订单' },
          { value: 40, name: '支付' },
          { value: 20, name: '完成' }
        ]
      }
    ]
  };

  return (
    <FunnelChart
      chartId="funnel-chart-demo"
      option={option}
      width="100%"
      height={400}
    />
  );
};

export default FunnelChartDemo;
```
