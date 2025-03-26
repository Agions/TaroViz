# TaroViz 配置项参考

本文档详细介绍了TaroViz的各种配置项及使用方法。

## 目录

- [Chart组件配置项](#chart组件配置项)
- [ECharts选项配置](#echarts选项配置)
- [自定义配置选项](#自定义配置选项)
- [主题配置](#主题配置)
- [响应式配置](#响应式配置)
- [按平台配置](#按平台配置)

## Chart组件配置项

TaroViz的Chart组件支持以下配置项：

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| option | Object | {} | ECharts配置项，主要图表配置都在这里定义 |
| theme | string \| Object | 'default' | 主题名称或配置对象 |
| width | string \| number | '100%' | 图表宽度 |
| height | string \| number | '300px' | 图表高度 |
| loading | boolean | false | 是否显示加载动画 |
| loadingOption | Object | {} | 加载动画配置项 |
| renderer | 'canvas' \| 'svg' | 'canvas' | 渲染器类型，小程序环境建议使用canvas |
| notMerge | boolean | false | 更新时是否不与之前的option合并 |
| lazyUpdate | boolean | false | 是否延迟更新 |
| silent | boolean | false | 是否禁止图表交互 |
| devicePixelRatio | number | window.devicePixelRatio | 设备像素比 |
| locale | string | 'en-US' | 国际化语言设置 |
| onEvents | Object | {} | 事件监听函数对象 |
| customConfig | Object | {} | 自定义配置项，简化常用的echarts配置 |

## ECharts选项配置

`option`属性是TaroViz最重要的配置项，它直接对应ECharts的配置项。以下是常用的ECharts配置子项：

### 标题(title)

```js
title: {
  text: '图表标题',
  subtext: '副标题',
  left: 'center', // 水平位置: 'left', 'center', 'right'
  top: 'top',     // 垂直位置: 'top', 'middle', 'bottom'
  textStyle: {
    color: '#333',
    fontSize: 18
  }
}
```

### 图例(legend)

```js
legend: {
  type: 'plain', // 'plain', 'scroll'
  orient: 'horizontal', // 'horizontal', 'vertical'
  left: 'center',
  top: 'bottom',
  data: ['系列1', '系列2'], // 图例项，可以省略
  selected: {
    '系列1': true,
    '系列2': false
  }
}
```

### 提示框(tooltip)

```js
tooltip: {
  trigger: 'item', // 'item', 'axis', 'none'
  formatter: '{a} <br/>{b}: {c} ({d}%)', // 字符串模板或回调函数
  axisPointer: {
    type: 'line' // 'line', 'shadow', 'cross', 'none'
  },
  backgroundColor: 'rgba(50,50,50,0.7)',
  borderColor: '#ccc',
  borderWidth: 0,
  padding: 5,
  textStyle: {
    color: '#fff'
  }
}
```

### 坐标轴(xAxis, yAxis)

```js
xAxis: {
  type: 'category', // 'value', 'category', 'time', 'log'
  data: ['周一', '周二', '周三', '周四', '周五'],
  name: 'X轴名称',
  nameLocation: 'end', // 'start', 'middle', 'end'
  axisLine: {
    show: true
  },
  axisTick: {
    show: true
  },
  axisLabel: {
    show: true,
    rotate: 0,
    formatter: '{value} 单位'
  }
},
yAxis: {
  type: 'value',
  name: 'Y轴名称',
  min: 0,
  max: 1000,
  splitNumber: 5,
  splitLine: {
    show: true
  }
}
```

### 系列(series)

```js
series: [
  {
    name: '系列1',
    type: 'line', // 图表类型
    data: [120, 200, 150, 80, 70, 110],
    // 图表类型特定配置
    smooth: true, // 线条平滑 (折线图)
    barWidth: '60%', // 柱宽 (柱状图)
    radius: '50%', // 半径 (饼图)
    // 样式配置
    itemStyle: {
      color: '#c23531', // 或使用函数/渐变/图案
      borderWidth: 1
    },
    // 标签配置
    label: {
      show: true,
      position: 'top', // 标签位置
      formatter: '{c}' // 标签格式化
    },
    // 强调样式 (hover时)
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0,0,0,0.3)'
      }
    }
  }
]
```

### 其他常用配置

```js
// 网格配置
grid: {
  left: '3%',
  right: '4%',
  top: '16%',
  bottom: '3%',
  containLabel: true // 包含坐标轴标签
},

// 工具箱
toolbox: {
  feature: {
    saveAsImage: {}, // 保存为图片
    dataZoom: {},    // 数据缩放
    restore: {},     // 还原
    dataView: {}     // 数据视图
  }
},

// 区域缩放
dataZoom: [
  {
    type: 'inside', // 'inside', 'slider'
    start: 0,
    end: 100
  }
],

// 视觉映射
visualMap: {
  min: 0,
  max: 1000,
  calculable: true,
  orient: 'vertical',
  left: 'left',
  inRange: {
    color: ['#50a3ba', '#eac736', '#d94e5d']
  }
}
```

## 自定义配置选项

TaroViz提供了`customConfig`属性，可以简化常用的图表配置：

```js
customConfig: {
  // 颜色配置
  colorPalette: ['#5470c6', '#91cc75', '#fac858'], // 自定义色板
  
  // 自定义格式化函数
  tooltipFormatter: (params) => `${params.name}: ${params.value}`,
  legendFormatter: (name) => `${name}系列`,
  axisLabelFormatter: (value) => `${value}单位`,
  
  // 视觉配置
  fontFamily: 'Arial',
  animation: true,
  animationDuration: 1000,
  
  // 布局配置
  grid: { top: 40, right: 8, bottom: 40, left: 50 },
  titlePosition: 'center',
  
  // 交互配置
  enableDataZoom: true,
  enableTooltip: true,
  enableLegendSelect: true,
  
  // 渐变色配置
  useGradient: true,
  gradientDirection: 'vertical', // 'horizontal', 'vertical'
  
  // 自适应配置
  adaptiveLayout: true,
  minHeight: 200,
  aspectRatio: 16/9
}
```

## 主题配置

TaroViz内置了多种主题，可以通过`theme`属性直接使用：

```jsx
<Chart option={option} theme="dark" />
```

也可以自定义主题并注册：

```jsx
import { configTheme } from 'taroviz';

// 注册自定义主题
configTheme('myTheme', {
  color: ['#5470c6', '#91cc75', '#fac858'],
  backgroundColor: '#ffffff',
  textStyle: { color: '#333333' },
  title: { textStyle: { color: '#222222' } },
  line: { itemStyle: { borderWidth: 2 } },
  // 更多配置项...
});

// 使用自定义主题
<Chart option={option} theme="myTheme" />
```

## 响应式配置

TaroViz支持根据屏幕尺寸自动调整图表配置：

```jsx
import { Chart, configResponsive } from 'taroviz';

// 定义响应式断点和配置
configResponsive([
  {
    query: { maxWidth: 576 }, // 小屏幕
    option: {
      legend: { orient: 'horizontal', top: 'bottom' },
      grid: { left: '5%', right: '5%' }
    }
  },
  {
    query: { minWidth: 576, maxWidth: 768 }, // 中屏幕
    option: {
      legend: { orient: 'horizontal', top: '10%' },
      grid: { left: '10%', right: '10%' }
    }
  },
  {
    query: { minWidth: 768 }, // 大屏幕
    option: {
      legend: { orient: 'vertical', right: '5%' },
      grid: { left: '15%', right: '15%' }
    }
  }
]);
```

## 按平台配置

TaroViz可以根据不同平台环境应用不同配置：

```jsx
import { Chart, configByPlatform } from 'taroviz';

// 配置不同平台的默认选项
configByPlatform({
  weapp: {
    renderer: 'canvas',
    devicePixelRatio: 2.5,
    customConfig: {
      // 小程序特定配置
    }
  },
  h5: {
    renderer: 'canvas',
    customConfig: {
      // H5特定配置
    }
  },
  alipay: {
    // 支付宝小程序特定配置
  },
  harmony: {
    // 鸿蒙应用特定配置
  }
});
``` 