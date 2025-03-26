# TaroViz API参考

本文档详细介绍了TaroViz提供的API和组件用法。

## 目录

- [Chart组件](#chart组件)
- [图表类型组件](#图表类型组件)
- [配置API](#配置api)
- [工具函数](#工具函数)
- [主题设置](#主题设置)
- [事件处理](#事件处理)

## Chart组件

`Chart`是TaroViz的核心组件，用于渲染各类图表。

### 属性

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| option | Object | {} | ECharts配置项 |
| theme | string \| Object | 'default' | 主题名称或配置对象 |
| width | string \| number | '100%' | 图表宽度 |
| height | string \| number | '300px' | 图表高度 |
| loading | boolean | false | 是否显示加载动画 |
| renderer | 'canvas' \| 'svg' | 'canvas' | 渲染器类型 |
| notMerge | boolean | false | 是否不合并与之前的配置项 |
| lazyUpdate | boolean | false | 是否延迟更新 |
| silent | boolean | false | 是否禁止交互 |
| onEvents | Object | {} | 事件处理函数对象 |
| customConfig | Object | {} | 自定义配置项 |

### 方法

| 方法 | 参数 | 返回值 | 描述 |
| --- | --- | --- | --- |
| getEchartsInstance | - | echarts实例 | 获取ECharts实例 |
| clear | - | void | 清空图表 |
| dispose | - | void | 销毁图表实例 |
| reload | - | void | 重新加载图表 |
| resize | options | void | 调整图表大小 |

### 示例

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { Chart } from 'taroviz';

export default function ChartExample() {
  const chartRef = React.useRef(null);
  const option = {/* ECharts配置 */};
  
  const handleClick = () => {
    // 获取图表实例
    const instance = chartRef.current?.getEchartsInstance();
    // 执行操作
  };
  
  return (
    <View>
      <Chart 
        ref={chartRef}
        option={option} 
        theme="dark"
        width="100%"
        height="300px"
        onEvents={{
          click: (params) => console.log(params)
        }}
      />
    </View>
  );
}
```

## 图表类型组件

除了通用的`Chart`组件，TaroViz还提供了针对特定图表类型的组件：

```jsx
import { LineChart, BarChart, PieChart } from 'taroviz/charts';

// 使用特定图表组件
<LineChart option={lineOption} />
<BarChart option={barOption} />
<PieChart option={pieOption} />
```

这些组件继承了`Chart`的所有属性和方法，但会自动设置对应的图表类型。

## 配置API

### configProvider

全局配置TaroViz的默认行为：

```jsx
import { configProvider } from 'taroviz';

configProvider({
  theme: 'dark',
  renderer: 'canvas',
  devicePixelRatio: window.devicePixelRatio,
  useDirtyRect: true,
  locale: 'zh-CN'
});
```

### configTheme

注册自定义主题：

```jsx
import { configTheme } from 'taroviz';

configTheme('myTheme', {
  color: ['#3498db', '#2ecc71', '#e74c3c'],
  backgroundColor: '#f5f5f5',
  // 其他主题配置
});
```

## 工具函数

TaroViz提供了一系列工具函数，帮助处理常见的图表操作：

### formatData

格式化数据，适配图表配置：

```jsx
import { formatData } from 'taroviz/utils';

const rawData = [
  { date: '2023-01-01', value: 100 },
  { date: '2023-01-02', value: 200 },
  // ...
];

const formattedData = formatData.forLine(rawData, {
  xKey: 'date',
  yKey: 'value'
});

// 结果可直接用于图表配置
```

### themeUtils

主题相关工具函数：

```jsx
import { themeUtils } from 'taroviz/utils';

// 获取当前主题的颜色
const colors = themeUtils.getThemeColors('dark');

// 基于当前主题生成渐变色
const gradient = themeUtils.createLinearGradient('#3498db');
```

## 主题设置

TaroViz内置多种主题：

- `'default'` - 默认主题
- `'dark'` - 暗色主题
- `'light'` - 亮色主题
- `'vintage'` - 复古主题
- `'macarons'` - 马卡龙主题
- `'westeros'` - 西部主题

可以通过`Chart`组件的`theme`属性使用这些主题：

```jsx
<Chart option={option} theme="dark" />
```

## 事件处理

TaroViz支持所有ECharts的事件类型：

```jsx
<Chart 
  option={option}
  onEvents={{
    click: (params) => handleClick(params),
    legendselectchanged: (params) => handleLegendChange(params),
    mouseover: (params) => handleMouseOver(params)
  }}
/>
```

常见事件类型：

- `'click'` - 点击事件
- `'dblclick'` - 双击事件
- `'mouseover'` - 鼠标悬停
- `'mouseout'` - 鼠标移出
- `'legendselectchanged'` - 图例选择状态改变
- `'datazoom'` - 数据缩放
- `'brush'` - 区域选择
- `'rendered'` - 渲染完成 