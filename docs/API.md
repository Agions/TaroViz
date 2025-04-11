# TaroViz API参考

本文档详细介绍了TaroViz提供的API和组件用法。

## 目录

- [导入方式](#导入方式)
- [Chart组件](#chart组件)
- [图表类型组件](#图表类型组件)
- [钩子函数](#钩子函数)
- [适配器](#适配器)
- [配置API](#配置api)
- [工具函数](#工具函数)
- [主题设置](#主题设置)
- [事件处理](#事件处理)
- [类型系统](#类型系统)

## 导入方式

TaroViz提供多种灵活的导入方式：

### 主包导入

```jsx
// 命名空间方式
import { Core, Adapters, Charts, Hooks } from 'taroviz';

// 直接导入组件
import { LineChart, BarChart, PieChart } from 'taroviz';

// 直接导入钩子函数
import { useChart, useOption } from 'taroviz';

// 直接导入适配器
import { getAdapter, H5Adapter, WeappAdapter } from 'taroviz';
```

### 子包导入

```jsx
// 导入核心功能
import { BaseChart } from '@taroviz/core';

// 导入图表组件
import { LineChart } from '@taroviz/charts';

// 导入钩子函数
import useChart from '@taroviz/hooks';
// 或者
import { useChart } from '@taroviz/hooks';

// 导入适配器
import { getAdapter } from '@taroviz/adapters';
import H5Adapter from '@taroviz/adapters/h5';
```

## Chart组件

`BaseChart`是TaroViz的核心组件，用于渲染各类图表。

### 属性

| 属性         | 类型             | 默认值    | 描述                     |
| ------------ | ---------------- | --------- | ------------------------ |
| option       | Object           | {}        | ECharts配置项            |
| theme        | string\| Object  | 'default' | 主题名称或配置对象       |
| width        | string\| number  | '100%'    | 图表宽度                 |
| height       | string\| number  | '300px'   | 图表高度                 |
| loading      | boolean          | false     | 是否显示加载动画         |
| renderer     | 'canvas'\| 'svg' | 'canvas'  | 渲染器类型               |
| notMerge     | boolean          | false     | 是否不合并与之前的配置项 |
| lazyUpdate   | boolean          | false     | 是否延迟更新             |
| autoResize   | boolean          | true      | 是否自动调整大小         |
| onChartInit  | Function         | -         | 图表初始化回调           |
| onChartReady | Function         | -         | 图表准备好回调           |
| onEvents     | Object           | {}        | 事件处理函数对象         |
| style        | Object           | {}        | 容器样式                 |
| className    | string           | ''        | 容器类名                 |

### 方法

| 方法               | 参数    | 返回值      | 描述            |
| ------------------ | ------- | ----------- | --------------- |
| getEchartsInstance | -       | echarts实例 | 获取ECharts实例 |
| clear              | -       | void        | 清空图表        |
| dispose            | -       | void        | 销毁图表实例    |
| reload             | -       | void        | 重新加载图表    |
| resize             | options | void        | 调整图表大小    |

### 示例

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { BaseChart } from '@taroviz/core';
// 或者从主包导入
// import { BaseChart } from 'taroviz';

export default function ChartExample() {
  const chartRef = React.useRef(null);
  const option = {/* ECharts配置 */};
  
  const handleInit = (instance) => {
    console.log('图表已初始化', instance);
  };
  
  return (
    <View>
      <BaseChart 
        option={option} 
        theme="dark"
        width="100%"
        height="300px"
        onChartInit={handleInit}
        onEvents={{
          click: (params) => console.log(params)
        }}
      />
    </View>
  );
}
```

## 图表类型组件

TaroViz提供了针对特定图表类型的组件：

```jsx
import { LineChart, BarChart, PieChart, RadarChart, ScatterChart, HeatmapChart } from '@taroviz/charts';
// 或者从主包导入
// import { LineChart, BarChart, PieChart } from 'taroviz';

// 使用特定图表组件
<LineChart option={lineOption} />
<BarChart option={barOption} />
<PieChart option={pieOption} />
```

这些组件继承了 `BaseChart`的所有属性和方法，但会自动设置对应的图表类型。

## 钩子函数

TaroViz提供了一系列React Hooks，使图表开发更加灵活：

### useChart

创建和管理图表实例：

```jsx
import { useChart } from '@taroviz/hooks';
// 或者从主包导入
// import { useChart } from 'taroviz';

function ChartComponent() {
  const chartRef = useRef(null);
  const [instance, setInstance] = useChart(chartRef);
  
  // instance是图表实例，可以调用ECharts的API
  
  return <View ref={chartRef} style={{ width: '100%', height: '300px' }} />;
}
```

### useOption

设置图表选项：

```jsx
import { useChart, useOption } from '@taroviz/hooks';

function ChartComponent() {
  const chartRef = useRef(null);
  const [instance] = useChart(chartRef);
  
  const option = {
    // ECharts配置
  };
  
  // 设置图表选项，当option变化时会自动更新
  useOption(instance, option);
  
  return <View ref={chartRef} style={{ width: '100%', height: '300px' }} />;
}
```

### useResize

处理图表尺寸调整：

```jsx
import { useChart, useResize } from '@taroviz/hooks';

function ChartComponent() {
  const chartRef = useRef(null);
  const [instance] = useChart(chartRef);
  
  // 监听窗口大小变化，自动调整图表尺寸
  useResize(instance);
  
  return <View ref={chartRef} style={{ width: '100%', height: '300px' }} />;
}
```

### useEvents

绑定图表事件：

```jsx
import { useChart, useEvents } from '@taroviz/hooks';

function ChartComponent() {
  const chartRef = useRef(null);
  const [instance] = useChart(chartRef);
  
  const events = {
    click: (params) => console.log('点击了图表', params),
    mouseover: (params) => console.log('鼠标悬停', params)
  };
  
  // 绑定事件监听
  useEvents(instance, events);
  
  return <View ref={chartRef} style={{ width: '100%', height: '300px' }} />;
}
```

### useLoading

控制图表加载状态：

```jsx
import { useChart, useLoading } from '@taroviz/hooks';

function ChartComponent() {
  const chartRef = useRef(null);
  const [instance] = useChart(chartRef);
  const [loading, setLoading] = useState(true);
  
  // 根据loading状态自动显示/隐藏加载动画
  useLoading(instance, loading);
  
  // 数据加载完成后
  useEffect(() => {
    fetchData().then(() => setLoading(false));
  }, []);
  
  return <View ref={chartRef} style={{ width: '100%', height: '300px' }} />;
}
```

### useChartTheme

管理图表主题：

```jsx
import { useChart, useChartTheme } from '@taroviz/hooks';

function ChartComponent() {
  const chartRef = useRef(null);
  const [instance] = useChart(chartRef);
  
  // 设置图表主题
  useChartTheme(instance, 'dark');
  
  return <View ref={chartRef} style={{ width: '100%', height: '300px' }} />;
}
```

### useChartData

处理和转换图表数据：

```jsx
import { useChart, useOption, useChartData } from '@taroviz/hooks';

function ChartComponent() {
  const chartRef = useRef(null);
  const [instance] = useChart(chartRef);
  
  const rawData = [
    { date: '2023-01-01', value: 100 },
    { date: '2023-01-02', value: 200 },
    // ...
  ];
  
  // 转换数据为图表可用格式
  const chartData = useChartData(rawData, (data) => {
    return {
      xAxis: { data: data.map(item => item.date) },
      series: [{ data: data.map(item => item.value), type: 'line' }]
    };
  });
  
  // 使用转换后的数据
  useOption(instance, chartData);
  
  return <View ref={chartRef} style={{ width: '100%', height: '300px' }} />;
}
```

## 适配器

TaroViz使用适配器模式处理不同平台的差异：

### getAdapter

自动获取当前平台的适配器：

```jsx
import { getAdapter } from '@taroviz/adapters';
// 或者从主包导入
// import { getAdapter } from 'taroviz';

const adapter = getAdapter({
  canvasId: 'my-chart',
  width: 300,
  height: 200,
  theme: 'dark',
  autoResize: true
});

// 使用适配器
adapter.init();
adapter.setOption(option);
```

### 平台适配器

TaroViz提供了多个平台的适配器：

```jsx
// 导入特定平台适配器
import H5Adapter from '@taroviz/adapters/h5';
import WeappAdapter from '@taroviz/adapters/weapp';
import AlipayAdapter from '@taroviz/adapters/alipay';
import SwanAdapter from '@taroviz/adapters/swan';
import HarmonyAdapter from '@taroviz/adapters/harmony';

// 或者从主包导入
import { H5Adapter, WeappAdapter } from 'taroviz';

// 创建适配器实例
const adapter = new H5Adapter({
  canvasId: 'my-chart',
  width: 300,
  height: 200
});

// 使用适配器
adapter.init();
adapter.setOption(option);
```

## 配置API

### 全局配置

设置全局默认配置：

```jsx
import { Core } from 'taroviz';

Core.setGlobalOptions({
  theme: 'dark',
  renderer: 'canvas',
  devicePixelRatio: 2
});
```

### 主题配置

注册自定义主题：

```jsx
import { Themes } from 'taroviz';

Themes.registerTheme('myTheme', {
  color: ['#3498db', '#2ecc71', '#e74c3c'],
  backgroundColor: '#f5f5f5',
  // 其他主题配置
});
```

## 工具函数

TaroViz提供了一系列工具函数：

### 数据处理工具

```jsx
import { Data } from 'taroviz';

// 格式化数据
const formattedData = Data.formatForChart(rawData, {
  xKey: 'date',
  yKey: 'value',
  type: 'line'
});

// 数据聚合
const aggregatedData = Data.aggregate(rawData, {
  groupBy: 'category',
  measure: 'value',
  method: 'sum'
});
```

### 工具函数

```jsx
import { Core } from 'taroviz';

// 生成唯一ID
const id = Core.uuid();

// 深度合并对象
const merged = Core.deepMerge(obj1, obj2);
```

## 主题设置

TaroViz内置多种主题，可以通过以下方式使用：

```jsx
// 使用内置主题
<LineChart option={option} theme="dark" />

// 或者通过钩子函数使用
useChartTheme(instance, 'dark');
```

支持的内置主题：

- `'default'` - 默认主题
- `'dark'` - 暗色主题
- `'light'` - 亮色主题
- `'vintage'` - 复古主题
- `'macarons'` - 马卡龙主题
- `'westeros'` - 西部主题

## 事件处理

TaroViz支持所有ECharts的事件类型：

```jsx
// 通过组件属性
<LineChart 
  option={option}
  onEvents={{
    click: (params) => handleClick(params),
    mouseover: (params) => handleMouseOver(params)
  }}
/>

// 或者通过钩子函数
useEvents(instance, {
  click: (params) => handleClick(params),
  mouseover: (params) => handleMouseOver(params)
});
```

常用事件类型：

- `'click'` - 点击事件
- `'dblclick'` - 双击事件
- `'mouseover'` - 鼠标悬停
- `'mouseout'` - 鼠标移出
- `'legendselectchanged'` - 图例选择状态改变
- `'datazoom'` - 数据缩放
- `'rendered'` - 渲染完成

## 类型系统

TaroViz提供了完整的TypeScript类型定义：

### 图表选项类型

```typescript
import { EChartsOption } from '@taroviz/core';

const option: EChartsOption = {
  // 类型提示
};
```

### 图表实例类型

```typescript
import { ChartInstance } from '@taroviz/hooks';

function handleInit(chart: ChartInstance) {
  // 类型提示
}
```

### 组件属性类型

```typescript
import { LineChartProps } from '@taroviz/charts';

// 使用类型
const props: LineChartProps = {
  option: {},
  theme: 'dark',
  width: 300,
  height: 200
};
```

### 适配器类型

```typescript
import { AdapterConfig, Adapter } from '@taroviz/adapters';

const config: AdapterConfig = {
  canvasId: 'my-chart',
  width: 300,
  height: 200
};

function useAdapter(adapter: Adapter) {
  // 类型提示
}
```

### 钩子函数类型

```typescript
import { useChart, useOption } from '@taroviz/hooks';
import { ChartOptions, ChartInstance } from '@taroviz/hooks';

// 明确指定返回类型
const [instance, setInstance] = useChart<ChartInstance>(chartRef);

// 指定选项类型
const options: ChartOptions = {
  // 类型提示
};
useOption(instance, options);
```
