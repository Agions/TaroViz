# @agions/taroviz-charts

[![npm version](https://img.shields.io/npm/v/@agions/taroviz-charts.svg)](https://www.npmjs.com/package/@agions/taroviz-charts)
[![npm downloads](https://img.shields.io/npm/dm/@agions/taroviz-charts.svg)](https://www.npmjs.com/package/@agions/taroviz-charts)
[![GitHub](https://img.shields.io/github/license/Agions/TaroViz)](https://github.com/Agions/TaroViz/blob/main/LICENSE)

TaroViz 的图表组件集合，提供丰富的开箱即用图表组件。

## 介绍

`@agions/taroviz-charts` 提供了一系列基于 ECharts 实现的图表组件，开箱即用且高度可定制。这些组件可以在 Taro 支持的各种平台上运行，包括 H5、微信小程序、支付宝小程序等。

## 安装

```bash
# npm
npm install @agions/taroviz-charts

# yarn
yarn add @agions/taroviz-charts

# pnpm
pnpm add @agions/taroviz-charts
```

## 引用关系

- 依赖于：

  - [`@agions/taroviz-core`](https://www.npmjs.com/package/@agions/taroviz-core) - 提供基础图表类和工具
  - [`@agions/taroviz-adapters`](https://www.npmjs.com/package/@agions/taroviz-adapters) - 提供多平台适配能力
- 被以下包依赖：

  - [`@agions/taroviz`](https://www.npmjs.com/package/@agions/taroviz) - 作为主包的组成部分

## 图表类型

- 基础图表

  - `LineChart` - 折线图
  - `BarChart` - 柱状图
  - `PieChart` - 饼图
  - `ScatterChart` - 散点图
  - `RadarChart` - 雷达图
  - `HeatmapChart` - 热力图
- 高级图表

  - `TreeChart` - 树图
  - `TreemapChart` - 矩形树图
  - `SunburstChart` - 旭日图
  - `GraphChart` - 关系图
  - `LiquidFillChart` - 水球图
  - `GaugeChart` - 仪表盘
  - `FunnelChart` - 漏斗图
  - `WordCloudChart` - 词云图
  - `ComboChart` - 组合图表

## 使用示例

### 折线图

```jsx
import React from 'react';
import { LineChart } from '@agions/taroviz-charts';

const LineChartDemo = () => {
  const data = {
    xAxis: ['周一', '周二', '周三', '周四', '周五'],
    series: [
      { name: '销量', data: [150, 230, 224, 218, 135] },
      { name: '利润', data: [50, 130, 124, 118, 35] }
    ]
  };

  return (
    <LineChart
      data={data}
      width={350}
      height={250}
      title="销售数据统计"
      smooth={true}
      showLegend={true}
    />
  );
};

export default LineChartDemo;
```

### 饼图

```jsx
import React from 'react';
import { PieChart } from '@agions/taroviz-charts';

const PieChartDemo = () => {
  const data = [
    { name: '直接访问', value: 335 },
    { name: '邮件营销', value: 310 },
    { name: '联盟广告', value: 234 },
    { name: '视频广告', value: 135 },
    { name: '搜索引擎', value: 1548 }
  ];

  return (
    <PieChart
      data={data}
      width={350}
      height={250}
      title="访问来源"
      radius={['40%', '70%']}
      roseType={false}
    />
  );
};

export default PieChartDemo;
```

## 自定义主题和配置

所有图表组件都支持通过 `option` 属性自定义 ECharts 配置，提供最大的灵活性：

```jsx
import React from 'react';
import { BarChart } from '@agions/taroviz-charts';

const CustomBarChart = () => {
  return (
    <BarChart
      data={{
        xAxis: ['产品A', '产品B', '产品C'],
        series: [120, 200, 150]
      }}
      width={350}
      height={250}
      option={{
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
      }}
    />
  );
};
```

## 事件处理

图表组件支持各种交互事件处理：

```jsx
import React from 'react';
import { PieChart } from '@agions/taroviz-charts';

const EventDemo = () => {
  return (
    <PieChart
      data={[
        { name: '分类A', value: 335 },
        { name: '分类B', value: 310 }
      ]}
      width={350}
      height={250}
      onClick={(params) => {
        console.log('点击了:', params.name);
      }}
      onLegendSelect={(params) => {
        console.log('选中了图例:', params.name);
      }}
    />
  );
};
```

## 依赖要求

- `@tarojs/components`: >=3.4.0
- `@tarojs/taro`: >=3.4.0
- `echarts`: >=5.4.0
- `react`: >=16.13.0

## 相关链接

- [GitHub仓库](https://github.com/Agions/TaroViz)
- [问题反馈](https://github.com/Agions/TaroViz/issues)
- [完整文档](https://github.com/Agions/TaroViz/tree/main/packages/charts)

## 许可证

MIT © [Agions](https://github.com/Agions)
