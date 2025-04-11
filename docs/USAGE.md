# TaroViz 使用文档

TaroViz 是一个基于 ECharts 的 Taro 图表库，支持 H5 和小程序环境。本文档介绍如何使用 TaroViz 在 Taro 应用中展示各种图表。

## 目录

- [安装](#安装)
- [导入方式](#导入方式)
- [基本使用](#基本使用)
- [组件化使用](#组件化使用)
- [钩子函数使用](#钩子函数使用)
- [适配器使用](#适配器使用)
- [支持的图表类型](#支持的图表类型)
- [配置项](#配置项)
- [事件监听](#事件监听)
- [实例方法](#实例方法)
- [主题定制](#主题定制)
- [数据处理](#数据处理)
- [移动端适配](#移动端适配)
- [性能优化](#性能优化)
- [类型系统](#类型系统)
- [多平台支持](#多平台支持)
- [常见问题](#常见问题)

## 安装

```bash
# 安装主包和必要子包
npm install @taroviz @taroviz/core @taroviz/adapters @taroviz/charts @taroviz/hooks

# 或者只安装主包（包含所有功能）
npm install @taroviz
```

## 导入方式

TaroViz 提供多种灵活的导入方式，可以根据需求选择：

### 方式1：从主包导入（推荐）

```jsx
// 命名空间导入
import { Core, Charts, Hooks, Adapters } from '@taroviz';

// 直接导入组件
import { LineChart, BarChart, PieChart } from '@taroviz';

// 直接导入钩子函数
import { useChart, useOption } from '@taroviz';
```

### 方式2：从子包导入

```jsx
// 导入图表组件
import { LineChart } from '@taroviz/charts';

// 导入钩子函数
import { useChart } from '@taroviz/hooks';
// 或者使用默认导出
import Hooks from '@taroviz/hooks';
const { useChart } = Hooks;

// 导入适配器
import { getAdapter } from '@taroviz/adapters';
import H5Adapter from '@taroviz/adapters/h5';
```

## 基本使用

TaroViz 提供了多种使用方式，以下是基本用法示例：

### 基础图表示例

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { LineChart } from '@taroviz';

const Index = () => {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }]
  };

  return (
    <View style={{ height: '300px' }}>
      <LineChart option={option} />
    </View>
  );
};

export default Index;
```

## 组件化使用

TaroViz 提供了多种预定义的图表组件，让开发更加便捷：

### 使用特定图表组件

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { LineChart, BarChart, PieChart, RadarChart } from '@taroviz';

const ChartDemo = () => {
  // 折线图配置
  const lineOption = {
    xAxis: { type: 'category', data: ['A', 'B', 'C'] },
    yAxis: { type: 'value' },
    series: [{ data: [120, 200, 150], type: 'line' }]
  };
  
  // 柱状图配置
  const barOption = {
    xAxis: { type: 'category', data: ['A', 'B', 'C'] },
    yAxis: { type: 'value' },
    series: [{ data: [120, 200, 150], type: 'bar' }]
  };
  
  // 饼图配置
  const pieOption = {
    series: [{
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' }
      ]
    }]
  };
  
  return (
    <View>
      <LineChart option={lineOption} height="200px" />
      <BarChart option={barOption} height="200px" />
      <PieChart option={pieOption} height="200px" />
    </View>
  );
};

export default ChartDemo;
```

### 图表属性

所有图表组件支持以下通用属性：

| 属性         | 类型           | 默认值   | 说明             |
| ------------ | -------------- | -------- | ---------------- |
| option       | Object         | -        | ECharts 配置项   |
| theme        | string/Object  | -        | 主题             |
| width        | string/number  | '100%'   | 图表宽度         |
| height       | string/number  | '300px'  | 图表高度         |
| loading      | boolean        | false    | 是否显示加载动画 |
| renderer     | 'canvas'/'svg' | 'canvas' | 渲染器类型       |
| autoResize   | boolean        | true     | 是否自动调整大小 |
| notMerge     | boolean        | false    | 是否不合并数据   |
| lazyUpdate   | boolean        | false    | 是否延迟更新     |
| onChartInit  | function       | -        | 图表初始化回调   |
| onChartReady | function       | -        | 图表准备好回调   |
| onEvents     | Object         | -        | 事件监听对象     |
| style        | Object         | -        | 容器样式         |
| className    | string         | -        | 容器类名         |

## 钩子函数使用

TaroViz 提供了一系列 React Hooks，使图表开发更加灵活和声明式：

### useChart

创建和管理图表实例：

```jsx
import React, { useRef } from 'react';
import { View } from '@tarojs/components';
import { useChart } from '@taroviz';

function ChartComponent() {
  const chartRef = useRef(null);
  const [instance, setInstance] = useChart(chartRef);
  
  // chart为图表实例，可以使用ECharts的API
  console.log('图表实例:', instance);
  
  return <View ref={chartRef} style={{ width: '100%', height: '300px' }} />;
}
```

### useOption

设置图表选项并在选项变化时自动更新：

```jsx
import React, { useRef, useState } from 'react';
import { View, Button } from '@tarojs/components';
import { useChart, useOption } from '@taroviz';

function DynamicChart() {
  const chartRef = useRef(null);
  const [instance] = useChart(chartRef);
  const [count, setCount] = useState(0);
  
  // 动态选项
  const option = {
    xAxis: { type: 'category', data: ['A', 'B', 'C'] },
    yAxis: { type: 'value' },
    series: [{ data: [100 + count, 200 + count, 150 + count], type: 'line' }]
  };
  
  // 当option变化时，图表会自动更新
  useOption(instance, option);
  
  return (
    <View>
      <View ref={chartRef} style={{ width: '100%', height: '300px' }} />
      <Button onClick={() => setCount(count + 10)}>更新数据</Button>
    </View>
  );
}
```

### useResize

处理图表自适应调整：

```jsx
import React, { useRef } from 'react';
import { View } from '@tarojs/components';
import { useChart, useOption, useResize } from '@taroviz';

function ResponsiveChart() {
  const chartRef = useRef(null);
  const [instance] = useChart(chartRef);
  
  const option = { /* 图表配置 */ };
  useOption(instance, option);
  
  // 监听窗口大小变化，自动调整图表尺寸
  useResize(instance);
  
  return <View ref={chartRef} style={{ width: '100%', height: '50vh' }} />;
}
```

### useEvents

绑定图表事件：

```jsx
import React, { useRef } from 'react';
import { View } from '@tarojs/components';
import { useChart, useOption, useEvents } from '@taroviz';
import Taro from '@tarojs/taro';

function InteractiveChart() {
  const chartRef = useRef(null);
  const [instance] = useChart(chartRef);
  
  const option = { /* 图表配置 */ };
  useOption(instance, option);
  
  // 定义事件处理函数
  const events = {
    click: (params) => {
      Taro.showToast({
        title: `点击了 ${params.name}: ${params.value}`,
        icon: 'none'
      });
    },
    legendselectchanged: (params) => {
      console.log('图例选择变化:', params);
    }
  };
  
  // 绑定事件
  useEvents(instance, events);
  
  return <View ref={chartRef} style={{ width: '100%', height: '300px' }} />;
}
```

### 组合使用钩子函数

钩子函数可以组合使用，创建功能完备的图表组件：

```jsx
import React, { useRef, useState, useEffect } from 'react';
import { View, Button } from '@tarojs/components';
import { useChart, useOption, useResize, useEvents, useLoading } from '@taroviz';
import Taro from '@tarojs/taro';

function CompleteChart() {
  const chartRef = useRef(null);
  const [instance] = useChart(chartRef);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  // 模拟数据加载
  useEffect(() => {
    setTimeout(() => {
      setData([150, 230, 224, 218, 135]);
      setLoading(false);
    }, 1500);
  }, []);
  
  // 图表配置
  const option = {
    xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] },
    yAxis: { type: 'value' },
    series: [{ data, type: 'line' }]
  };
  
  // 使用钩子函数
  useOption(instance, option);
  useResize(instance);
  useLoading(instance, loading);
  useEvents(instance, {
    click: (params) => Taro.showToast({ title: `值: ${params.value}`, icon: 'none' })
  });
  
  return (
    <View>
      <View ref={chartRef} style={{ width: '100%', height: '300px' }} />
      <Button onClick={() => setLoading(!loading)}>
        {loading ? '隐藏' : '显示'}加载状态
      </Button>
    </View>
  );
}
```

## 适配器使用

TaroViz 使用适配器模式处理不同平台的差异：

### 自动适配

在大多数情况下，TaroViz 会自动检测平台并使用合适的适配器：

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { LineChart } from '@taroviz';

// TaroViz 会自动检测当前环境并使用合适的适配器
const AutoChart = () => {
  const option = { /* 图表配置 */ };
  return <LineChart option={option} />;
};
```

### 手动选择适配器

也可以手动使用特定的适配器：

```jsx
import React, { useRef, useEffect } from 'react';
import { View } from '@tarojs/components';
import { getAdapter } from '@taroviz';
// 或者直接导入特定适配器
import H5Adapter from '@taroviz/adapters/h5';

const ManualAdapterChart = () => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (chartRef.current) {
      // 使用getAdapter自动获取适配器
      const adapter = getAdapter({
        containerRef: chartRef,
        width: '100%',
        height: '300px'
      });
    
      // 或者手动指定适配器
      // const adapter = new H5Adapter({
      //   containerRef: chartRef,
      //   width: '100%',
      //   height: '300px'
      // });
    
      // 初始化并配置图表
      adapter.init();
      adapter.setOption({ /* 图表配置 */ });
    }
  }, []);
  
  return <View ref={chartRef} style={{ width: '100%', height: '300px' }} />;
};
```

## 支持的图表类型

TaroViz 支持 ECharts 的所有图表类型，包括但不限于：

- 折线图 (line)
- 柱状图 (bar)
- 饼图 (pie)
- 散点图 (scatter)
- 雷达图 (radar)
- 地图 (map)
- 仪表盘 (gauge)
- 热力图 (heatmap)
- 树图 (tree)
- 矩形树图 (treemap)
- 桑基图 (sankey)
- 漏斗图 (funnel)
- 箱线图 (boxplot)
- 平行坐标系 (parallel)
- 主题河流图 (themeRiver)
- 旭日图 (sunburst)
- 词云图 (wordCloud)
- 关系图 (graph)
- 日历图 (calendar)
- 自定义系列 (custom)

## 配置项

TaroViz 的配置项与 ECharts 完全兼容，详细配置可参考 [ECharts 配置项手册](https://echarts.apache.org/zh/option.html)。

## 事件监听

TaroViz 支持监听 ECharts 的各种事件：

### 组件方式监听事件

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { LineChart } from '@taroviz';

function EventDemo() {
  const option = { /* 图表配置 */ };
  
  const eventHandlers = {
    click: (params) => console.log('点击事件:', params),
    mouseover: (params) => console.log('鼠标悬停事件:', params),
    legendselectchanged: (params) => console.log('图例选择变化:', params)
  };
  
  return (
    <LineChart 
      option={option} 
      onEvents={eventHandlers} 
    />
  );
}
```

### 钩子函数方式监听事件

```jsx
import React, { useRef } from 'react';
import { View } from '@tarojs/components';
import { useChart, useOption, useEvents } from '@taroviz';

function EventHookDemo() {
  const chartRef = useRef(null);
  const [instance] = useChart(chartRef);
  
  const option = { /* 图表配置 */ };
  useOption(instance, option);
  
  useEvents(instance, {
    click: (params) => console.log('点击事件:', params),
    mouseover: (params) => console.log('鼠标悬停事件:', params)
  });
  
  return <View ref={chartRef} style={{ width: '100%', height: '300px' }} />;
}
```

## 实例方法

通过图表实例可以调用 ECharts 的各种方法：

```jsx
import React, { useRef } from 'react';
import { View, Button } from '@tarojs/components';
import { useChart, useOption } from '@taroviz';

function MethodDemo() {
  const chartRef = useRef(null);
  const [instance] = useChart(chartRef);
  
  const option = { /* 图表配置 */ };
  useOption(instance, option);
  
  // 使用图表实例方法
  const handleClear = () => instance?.clear();
  const handleResize = () => instance?.resize();
  const handleRefresh = () => instance?.setOption(option, true);
  
  // 触发图表行为
  const handleHighlight = () => {
    instance?.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: 1
    });
  };
  
  return (
    <View>
      <View ref={chartRef} style={{ width: '100%', height: '300px' }} />
      <View>
        <Button onClick={handleClear}>清空</Button>
        <Button onClick={handleResize}>重置大小</Button>
        <Button onClick={handleRefresh}>刷新</Button>
        <Button onClick={handleHighlight}>高亮第二项</Button>
      </View>
    </View>
  );
}
```

## 主题定制

TaroViz 支持多种主题定制方式：

### 使用内置主题

```jsx
import React from 'react';
import { LineChart } from '@taroviz';

// 使用内置的dark主题
function DarkThemeChart() {
  const option = { /* 图表配置 */ };
  return <LineChart option={option} theme="dark" />;
}
```

### 注册自定义主题

```jsx
import React from 'react';
import { Themes, LineChart } from '@taroviz';

// 注册自定义主题
Themes.registerTheme('myTheme', {
  color: ['#4ea397', '#22c3aa', '#7bd9a5', '#d0648a', '#f58db2'],
  backgroundColor: '#f5f5f5',
  textStyle: {
    color: '#333'
  },
  title: {
    textStyle: {
      color: '#666'
    }
  },
  line: {
    itemStyle: {
      borderWidth: 2
    },
    lineStyle: {
      width: 3
    },
    symbolSize: 8
  }
});

// 使用自定义主题
function CustomThemeChart() {
  const option = { /* 图表配置 */ };
  return <LineChart option={option} theme="myTheme" />;
}
```

## 数据处理

TaroViz 提供了数据处理工具，简化数据转换：

```jsx
import React from 'react';
import { LineChart } from '@taroviz';
import { Data } from '@taroviz';

function DataProcessingDemo() {
  // 原始数据
  const rawData = [
    { date: '2023-01-01', sales: 120, cost: 80 },
    { date: '2023-01-02', sales: 132, cost: 90 },
    { date: '2023-01-03', sales: 101, cost: 70 },
    { date: '2023-01-04', sales: 134, cost: 85 },
    { date: '2023-01-05', sales: 90, cost: 65 }
  ];
  
  // 转换数据为图表可用格式
  const chartData = Data.formatForChart(rawData, {
    xKey: 'date',
    yKey: ['sales', 'cost'],
    type: 'line'
  });
  
  // 等效于手动创建以下选项
  const option = {
    xAxis: {
      type: 'category',
      data: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      { 
        name: 'sales',
        data: [120, 132, 101, 134, 90], 
        type: 'line' 
      },
      { 
        name: 'cost',
        data: [80, 90, 70, 85, 65], 
        type: 'line' 
      }
    ]
  };
  
  return <LineChart option={option || chartData} />;
}
```

## 移动端适配

为确保在移动端良好的体验，TaroViz 提供了多种优化方案：

### 自适应布局

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { LineChart } from '@taroviz';

function ResponsiveChart() {
  const option = {
    // 调整间距，适应小屏幕
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    // 旋转文字，避免X轴拥挤
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月'],
      axisLabel: {
        rotate: 45,
        fontSize: 12
      }
    },
    // 其他配置...
  };
  
  return (
    <View style={{ height: '50vh' }}>
      <LineChart 
        option={option}
        // 开启自动调整大小
        autoResize={true}
        // 设置自适应样式
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  );
}
```

## 性能优化

对于大数据量或复杂图表，TaroViz 提供了性能优化方案：

### 数据采样和聚合

```jsx
import React from 'react';
import { LineChart } from '@taroviz';
import { Data } from '@taroviz';

function OptimizedChart() {
  // 假设有大量数据
  const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
    time: new Date(2023, 0, 1).getTime() + i * 60000,
    value: Math.random() * 100
  }));
  
  // 数据采样
  const sampledData = Data.sample(largeDataset, {
    count: 100,  // 采样100个点
    method: 'lttb' // Largest-Triangle-Three-Buckets算法
  });
  
  // 或者聚合数据
  const aggregatedData = Data.aggregate(largeDataset, {
    groupBy: item => new Date(item.time).toLocaleDateString(), // 按天分组
    measure: 'value',
    method: 'avg' // 计算平均值
  });
  
  const option = {
    // 使用处理后的数据...
  };
  
  return <LineChart option={option} />;
}
```

### 渐进渲染和动态加载

```jsx
import React from 'react';
import { LineChart } from '@taroviz';

function ProgressiveChart() {
  // 大数据量配置优化
  const option = {
    // 启用渐进渲染
    progressive: 200, // 每帧渲染200个数据
    progressiveThreshold: 1000, // 数据量超过1000时启用渐进渲染
  
    // 简化图表元素
    animation: false, // 关闭动画
  
    // 其他配置...
  };
  
  return <LineChart option={option} />;
}
```

## 类型系统

TaroViz 提供了完善的 TypeScript 类型定义，帮助开发者获得更好的开发体验：

### 使用类型定义

```tsx
import React from 'react';
import { View } from '@tarojs/components';
import { LineChart } from '@taroviz';
import { LineChartProps } from '@taroviz/charts';
import { EChartsOption, ChartInstance } from '@taroviz/core';

// 使用类型定义图表选项
const option: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line'
  }]
};

// 使用类型定义组件属性
const chartProps: LineChartProps = {
  option,
  theme: 'dark',
  width: '100%',
  height: 300,
  onChartInit: (instance: ChartInstance) => {
    console.log('图表初始化完成', instance);
  }
};

// 在组件中使用类型化属性
function TypedChart() {
  return <LineChart {...chartProps} />;
}
```

### 钩子函数类型使用

```tsx
import React, { useRef } from 'react';
import { View } from '@tarojs/components';
import { useChart, useOption } from '@taroviz';
import { ChartInstance, ChartOptions } from '@taroviz/hooks';

function TypedHooksChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  // 带类型的钩子函数调用
  const [instance, setInstance] = useChart<ChartInstance>(chartRef);
  
  // 定义带类型的选项
  const option: ChartOptions = {
    // 图表配置...
  };
  
  // 类型安全的钩子函数调用
  useOption(instance, option);
  
  return <View ref={chartRef} style={{ width: '100%', height: '300px' }} />;
}
```

## 多平台支持

TaroViz 支持多个平台，包括：

- H5 / 浏览器
- 微信小程序
- 支付宝小程序
- 百度小程序
- 鸿蒙OS

对于不同平台之间的差异，TaroViz 会自动处理，但也可以为特定平台提供优化：

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { LineChart } from '@taroviz';
import Taro from '@tarojs/taro';

function PlatformSpecificChart() {
  // 判断当前平台
  const platform = Taro.getEnv();
  
  // 根据平台调整配置
  const option = {
    // 共用配置
    xAxis: { /* ... */ },
    yAxis: { /* ... */ },
  
    // 平台特定配置
    animation: platform === Taro.ENV_TYPE.WEAPP ? false : true, // 微信小程序关闭动画提升性能
  
    // 其他配置...
  };
  
  // 平台特定属性
  const props = {
    // 微信小程序特有属性
    ...(platform === Taro.ENV_TYPE.WEAPP && {
      renderer: 'canvas' // 微信小程序强制使用canvas渲染
    }),
  
    // H5特有属性
    ...(platform === Taro.ENV_TYPE.WEB && {
      devicePixelRatio: window.devicePixelRatio // H5设置设备像素比
    })
  };
  
  return <LineChart option={option} {...props} />;
}
```

## 常见问题

### 图表不显示

- 检查容器高度是否正确设置
- 确认数据格式是否正确
- 查看控制台是否有错误信息

### 小程序环境兼容性

- 确保小程序基础库版本满足要求（建议2.9.0以上）
- 避免使用小程序不支持的高级特性（如某些3D图表）

### 性能问题

- 减少数据量，使用数据采样或聚合
- 简化图表配置，减少不必要的视觉元素
- 在小程序环境中，关闭复杂动画效果
