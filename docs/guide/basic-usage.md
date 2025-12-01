# 基础使用

本指南将介绍 TaroViz 的基本使用方法，包括组件的基本属性、配置项、事件处理等。

## 基本组件使用

### 引入组件

首先，您需要在项目中引入 TaroViz 组件：

```typescript
import React from 'react';
import { LineChart } from '@agions/taroviz';
```

### 基本用法

```typescript
const App = () => {
  // ECharts 配置项
  const option = {
    title: {
      text: '折线图示例'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line'
      }
    ]
  };

  return (
    <LineChart
      chartId="chart-1"
      option={option}
      width="100%"
      height={400}
    />
  );
};

export default App;
```

## 组件属性

### 核心属性

| 属性名     | 类型              | 描述                                         | 默认值    |
| ---------- | ----------------- | -------------------------------------------- | --------- |
| chartId    | string            | 图表唯一标识符，用于区分多个图表实例         | -         |
| option     | object            | ECharts 配置项，用于定义图表的外观和行为     | -         |
| width      | string \| number  | 图表宽度                                     | '100%'    |
| height     | string \| number  | 图表高度                                     | 400       |
| theme      | string \| object  | 图表主题，可以是内置主题名称或自定义主题对象 | 'default' |
| autoResize | boolean           | 是否自动调整大小，适应容器变化               | false     |
| renderer   | 'canvas' \| 'svg' | 渲染器类型                                   | 'canvas'  |

### 事件属性

TaroViz 支持 ECharts 的各种事件，您可以通过以下属性监听事件：

| 属性名                | 类型     | 描述             |
| --------------------- | -------- | ---------------- |
| onClick               | function | 点击事件         |
| onDblClick            | function | 双击事件         |
| onMouseDown           | function | 鼠标按下事件     |
| onMouseMove           | function | 鼠标移动事件     |
| onMouseUp             | function | 鼠标释放事件     |
| onMouseOver           | function | 鼠标悬停事件     |
| onMouseOut            | function | 鼠标离开事件     |
| onDataZoom            | function | 数据缩放事件     |
| onDataRange           | function | 数据范围事件     |
| onLegendSelectChanged | function | 图例选择变化事件 |
| onLegendSelected      | function | 图例选中事件     |
| onLegendUnselected    | function | 图例取消选中事件 |
| onSeriesToggle        | function | 系列切换事件     |

## 配置项

TaroViz 使用 ECharts 的配置项来定义图表的外观和行为。您可以通过 `option` 属性传递 ECharts 配置项。

### 基本配置项结构

```typescript
const option = {
  // 标题
  title: {
    text: '图表标题',
  },
  // 提示框
  tooltip: {
    trigger: 'axis',
  },
  // 图例
  legend: {
    data: ['系列1', '系列2'],
  },
  // X轴
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  // Y轴
  yAxis: {
    type: 'value',
  },
  // 系列数据
  series: [
    {
      name: '系列1',
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130],
    },
    {
      name: '系列2',
      type: 'line',
      data: [90, 150, 120, 100, 80, 130, 110],
    },
  ],
};
```

### 配置项参考

有关 ECharts 配置项的详细说明，请参考 [ECharts 配置项文档](https://echarts.apache.org/zh/option.html)。

## 事件处理

### 基本事件

```typescript
const handleClick = (params: any) => {
  console.log('图表被点击了', params);
};

const handleDataZoom = (params: any) => {
  console.log('图表缩放了', params);
};

return (
  <LineChart
    chartId="chart-1"
    option={option}
    width="100%"
    height={400}
    onClick={handleClick}
    onDataZoom={handleDataZoom}
  />
);
```

### 事件参数

事件处理函数会接收一个参数 `params`，包含了事件的详细信息：

```typescript
{
  // 事件类型
  type: 'click',
  // 系列索引
  seriesIndex: 0,
  // 数据索引
  dataIndex: 1,
  // 数据值
  value: 200,
  // 系列名称
  seriesName: '系列1',
  // 数据名称
  name: 'Tue',
  // 组件类型
  componentType: 'series'
}
```

## 动态数据更新

TaroViz 支持动态更新图表数据，您只需要更新 `option` 属性即可：

```typescript
import React, { useState } from 'react';
import { LineChart } from '@agions/taroviz';

const DynamicChart = () => {
  const [option, setOption] = useState({
    title: {
      text: '动态数据示例'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line'
      }
    ]
  });

  const updateData = () => {
    // 生成随机数据
    const newData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 200) + 50);

    setOption(prev => ({
      ...prev,
      series: [
        {
          ...prev.series[0],
          data: newData
        }
      ]
    }));
  };

  return (
    <>
      <LineChart
        chartId="dynamic-chart"
        option={option}
        width="100%"
        height={400}
        autoResize={true}
      />
      <button onClick={updateData}>更新数据</button>
    </>
  );
};

export default DynamicChart;
```

## 响应式设计

### 自动调整大小

通过设置 `autoResize` 属性为 `true`，图表会自动适应容器大小变化：

```typescript
<LineChart
  chartId="responsive-chart"
  option={option}
  width="100%"
  height={400}
  autoResize={true}
/>
```

### 手动调整大小

您也可以通过 `ref` 获取图表实例，手动调用 `resize()` 方法调整大小：

```typescript
import React, { useRef } from 'react';
import { LineChart, ChartRef } from '@agions/taroviz';

const ResponsiveChart = () => {
  const chartRef = useRef<ChartRef>(null);

  const handleResize = () => {
    if (chartRef.current) {
      chartRef.current.resize();
    }
  };

  return (
    <>
      <LineChart
        ref={chartRef}
        chartId="manual-resize-chart"
        option={option}
        width="100%"
        height={400}
      />
      <button onClick={handleResize}>手动调整大小</button>
    </>
  );
};

export default ResponsiveChart;
```

## 下一步

继续阅读 [图表类型](./chart-types.md) 指南，了解 TaroViz 支持的图表类型。
