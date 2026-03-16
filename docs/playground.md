---
layout: page
title: Playground
titleTemplate: 交互式图表配置器
---

# 图表配置 Playground

这是一个简单的图表配置演示页面。

## 基础折线图

```tsx
import { LineChart } from '@agions/taroviz'

export default function App() {
  return (
    <LineChart
      title="销售趋势"
      data={[
        {
          name: '销量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]}
      options={{
        responsive: true,
        xAxis: {
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        series: [{
          type: 'line',
          smooth: true
        }]
      }}
    />
  )
}
```

## 基础柱状图

```tsx
import { BarChart } from '@agions/taroviz'

export default function App() {
  return (
    <BarChart
      title="月度销售"
      data={[
        { name: '月份', data: ['1月', '2月', '3月', '4月', '5月', '6月'] },
        { name: '销量', data: [820, 932, 901, 934, 1290, 1330] }
      ]}
    />
  )
}
```

## 基础饼图

```tsx
import { PieChart } from '@agions/taroviz'

export default function App() {
  return (
    <PieChart
      title="访问来源"
      data={[
        {
          name: '访问来源',
          data: [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' },
            { value: 300, name: '视频广告' }
          ]
        }
      ]}
    />
  )
}
```

## 主题切换

```tsx
import { LineChart } from '@agions/taroviz'

// 使用内置主题
<LineChart theme="dark" data={...} />
<LineChart theme="neon" data={...} />
<LineChart theme="ocean" data={...} />
```

## 快速开始

```bash
# 安装
pnpm add @agions/taroviz

# 使用
import { LineChart, BarChart, PieChart } from '@agions/taroviz'
```
