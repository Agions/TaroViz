---
title: TaroViz 示例
---

# 示例中心

TaroViz 提供丰富的示例，涵盖基础用法、高级技巧和平台特定场景。

::: tip 在线预览
所有示例都可以在微信小程序和 H5 环境中运行，代码完全一致。
:::

## 按类型浏览

### 📈 基础图表

| 示例 | 说明 |
|:---|:---|
| [折线图](./line-chart) | 趋势展示、多系列对比 |
| [柱状图](./bar-chart) | 类别比较、堆叠柱状 |
| [饼图](./pie-chart) | 占比展示、环形图 |
| [散点图](./scatter-chart) | 关联分析、标注 |
| [雷达图](./radar-chart) | 多维评估、综合对比 |

### 🔥 高级图表

| 示例 | 说明 |
|:---|:---|
| [热力图](./heatmap-chart) | 密度分布、时序模式 |
| [仪表盘](./gauge-chart) | 进度展示、状态监控 |
| [漏斗图](./funnel-chart) | 转化分析、流程优化 |
| [矩形树图](./treemap-chart) | 层级占比、面积展示 |
| [旭日图](./sunburst-chart) | 多级占比、交互下钻 |
| [桑基图](./sankey-chart) | 流向分析、能量转移 |

### 📊 统计图表

| 示例 | 说明 |
|:---|:---|
| [箱线图](./boxplot-chart) | 数据分布、统计对比 |
| [平行坐标图](./parallel-chart) | 高维数据、多维对比 |

### 🔗 关系图谱

| 示例 | 说明 |
|:---|:---|
| [关系图](./graph-chart) | 社交网络、组织架构 |
| [K线图](./candlestick-chart) | 金融OHLC、技术分析 |
| [词云图](./wordcloud-chart) | 关键词、文本分析 |

### 交互示例

| 示例 | 说明 |
|:---|:---|
| [交互式示例](./interactive) | 动态数据、多图表联动 |

---

## 基础示例

### 折线图

```typescript
import React from 'react';
import { LineChart } from '@agions/taroviz';

const option = {
  title: { text: '销售趋势' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['线上', '线下'] },
  xAxis: { type: 'category', data: ['1月', '2月', '3月'] },
  yAxis: { type: 'value' },
  series: [
    { name: '线上', type: 'line', data: [120, 200, 150], smooth: true },
    { name: '线下', type: 'line', data: [90, 150, 120], smooth: true }
  ]
};

export default function App() {
  return <LineChart chartId="line" option={option} width="100%" height={400} />;
}
```

### 柱状图

```typescript
import React from 'react';
import { BarChart } from '@agions/taroviz';

const option = {
  title: { text: '产品销量' },
  xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] },
  yAxis: { type: 'value' },
  series: [{ type: 'bar', data: [350, 250, 200, 150, 100] }]
};

export default function App() {
  return <BarChart chartId="bar" option={option} width="100%" height={400} />;
}
```

---

## 高级示例

### 动态数据更新

```typescript
import React, { useState, useEffect } from 'react';
import { LineChart } from '@agions/taroviz';

function DynamicChart() {
  const [option, setOption] = useState({
    title: { text: '实时监控' },
    xAxis: { type: 'category', data: ['1s', '2s', '3s', '4s', '5s'] },
    yAxis: { type: 'value' },
    series: [{ type: 'line', data: [0, 0, 0, 0, 0] }]
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setOption(prev => ({
        ...prev,
        series: [{
          ...prev.series[0],
          data: [...prev.series[0].data.slice(1), Math.random() * 100]
        }]
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <LineChart chartId="dynamic" option={option} width="100%" height={300} autoResize />;
}
```

### 多图表联动

```typescript
import React, { useState } from 'react';
import { LineChart, BarChart } from '@agions/taroviz';

function LinkedCharts() {
  const [year, setYear] = useState('2024');
  
  const data = {
    '2023': { line: [120, 200, 150], bar: [350, 250, 200] },
    '2024': { line: [150, 250, 200], bar: [450, 350, 300] }
  };

  return (
    <div>
      <div>
        <button onClick={() => setYear('2023')}>2023</button>
        <button onClick={() => setYear('2024')}>2024</button>
      </div>
      <LineChart chartId="line" option={{ /* ... */ }} />
      <BarChart chartId="bar" option={{ /* ... */ }} />
    </div>
  );
}
```

### 自定义主题

```typescript
import { registerTheme } from '@agions/taroviz';

registerTheme('my-theme', {
  color: ['#5470c6', '#91cc75', '#fac858'],
  backgroundColor: '#f5f5f5',
  textStyle: { color: '#333' }
});

<LineChart chartId="custom" option={option} theme="my-theme" />
```

---

## 平台示例

### 微信小程序

```typescript
import React from 'react';
import { View } from '@tarojs/components';
import { LineChart } from '@agions/taroviz';

function WeappChart() {
  return (
    <View style={{ width: '100%', height: '400px' }}>
      <LineChart
        chartId="weapp"
        option={option}
        width="100%"
        height={400}
        renderer="canvas"
      />
    </View>
  );
}
```

### H5 环境

```typescript
import React from 'react';
import { LineChart } from '@agions/taroviz';

function H5Chart() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <LineChart
        chartId="h5"
        option={option}
        width="100%"
        height={400}
        renderer="svg"
        autoResize
      />
    </div>
  );
}
```

---

## 性能优化

### 大数据集处理

```typescript
import { LineChart } from '@agions/taroviz';

// 数据采样
const sampleData = (data: number[], size: number) => {
  const step = Math.ceil(data.length / size);
  return data.filter((_, i) => i % step === 0);
};

const bigData = sampleData(rawData, 1000); // 10000 -> 1000

<LineChart
  chartId="bigdata"
  option={{ series: [{ data: bigData }] }}
  renderer="canvas"
/>
```

::: info 性能建议
- 大数据集建议使用 `canvas` 渲染器
- 开启 `autoResize` 让图表自适应容器
- 使用 `animation: false` 关闭动画提升首屏性能
- 合理使用 `dataZoom` 避免一次性渲染全部数据
:::

---

## 下一步

<div class="next-steps">

[查看 API 文档 →](../api/)

</div>

<style scoped>

.next-steps {
  margin-top: 32px;
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
