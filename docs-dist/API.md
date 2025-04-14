# TaroViz API文档

## 核心组件

### LineChart

折线图组件，用于展示数据趋势。

```jsx
import { LineChart } from '@agions/taroviz';

<LineChart 
  data={chartData} 
  config={chartConfig} 
/>
```

**属性：**

| 属性   | 类型   | 描述     | 是否必须 |
| ------ | ------ | -------- | -------- |
| data   | object | 图表数据 | 是       |
| config | object | 图表配置 | 否       |

### BarChart

柱状图组件，用于比较不同类别的数据。

```jsx
import { BarChart } from '@agions/taroviz';

<BarChart 
  data={chartData} 
  config={chartConfig} 
/>
```

**属性：**

| 属性   | 类型   | 描述     | 是否必须 |
| ------ | ------ | -------- | -------- |
| data   | object | 图表数据 | 是       |
| config | object | 图表配置 | 否       |

### PieChart

饼图组件，用于展示部分与整体的关系。

```jsx
import { PieChart } from '@agions/taroviz';

<PieChart 
  data={chartData} 
  config={chartConfig} 
/>
```

**属性：**

| 属性   | 类型   | 描述     | 是否必须 |
| ------ | ------ | -------- | -------- |
| data   | object | 图表数据 | 是       |
| config | object | 图表配置 | 否       |

### ScatterChart

散点图组件，用于展示数据分布。

```jsx
import { ScatterChart } from '@agions/taroviz';

<ScatterChart 
  data={chartData} 
  config={chartConfig} 
/>
```

**属性：**

| 属性   | 类型   | 描述     | 是否必须 |
| ------ | ------ | -------- | -------- |
| data   | object | 图表数据 | 是       |
| config | object | 图表配置 | 否       |

### RadarChart

雷达图组件，用于多维度数据比较。

```jsx
import { RadarChart } from '@agions/taroviz';

<RadarChart 
  data={chartData} 
  config={chartConfig} 
/>
```

**属性：**

| 属性   | 类型   | 描述     | 是否必须 |
| ------ | ------ | -------- | -------- |
| data   | object | 图表数据 | 是       |
| config | object | 图表配置 | 否       |

## 数据格式

### 基本数据格式

```js
const chartData = {
  categories: string[],  // 类别数组
  series: [              // 数据系列数组
    {
      name: string,      // 系列名称
      data: number[]     // 数据点数组
    }
  ]
};
```

### 饼图数据格式

```js
const pieData = {
  series: [
    {
      name: string,       // 系列名称
      data: [
        {
          name: string,   // 数据项名称
          value: number   // 数据项值
        }
      ]
    }
  ]
};
```

## 配置选项

### 通用配置

```js
const chartConfig = {
  // 基本设置
  width: number | string,    // 图表宽度，默认'100%'
  height: number | string,   // 图表高度，默认300
  title: string,             // 图表标题
  subtitle: string,          // 图表副标题
  
  // 主题与样式
  theme: string | object,    // 主题名称或自定义主题
  backgroundColor: string,   // 背景颜色
  textStyle: object,         // 文本样式
  
  // 交互与动画
  animation: boolean,        // 是否启用动画，默认true
  animationDuration: number, // 动画持续时间
  loading: boolean,          // 是否显示加载状态
  
  // 组件显示
  legend: object | boolean,  // 图例配置或是否显示
  tooltip: object | boolean, // 提示框配置或是否显示
  grid: object,              // 网格配置
  
  // 坐标轴
  xAxis: object,             // X轴配置
  yAxis: object,             // Y轴配置
  
  // 数据区域
  dataZoom: object[],        // 数据区域缩放组件
  visualMap: object,         // 视觉映射组件
  
  // 事件处理
  onEvents: {                // 事件回调函数
    click: Function,
    legendselectchanged: Function,
    // ...其他事件
  }
};
```

## Hooks

### useChart

用于获取和操作图表实例的Hook。

```jsx
import { useChart } from '@agions/taroviz-hooks';

function MyChart() {
  const { chartRef, getInstance } = useChart();
  
  const handleClick = () => {
    const instance = getInstance();
    if (instance) {
      // 操作图表实例
      instance.setOption({...});
    }
  };
  
  return (
    <>
      <LineChart data={data} chartRef={chartRef} />
      <Button onClick={handleClick}>更新图表</Button>
    </>
  );
}
```

### useWindowSize

用于获取当前窗口尺寸的Hook。

```jsx
import { useWindowSize } from '@agions/taroviz-hooks';

function ResponsiveChart() {
  const { width, height } = useWindowSize();
  
  return (
    <LineChart 
      data={data} 
      config={{ width, height: height * 0.5 }} 
    />
  );
}
```

## 主题系统

### 使用预设主题

```jsx
import { LineChart } from '@agions/taroviz';
import { THEME_DARK, THEME_LIGHT } from '@agions/taroviz-themes';

<LineChart 
  data={data} 
  config={{ theme: THEME_DARK }} 
/>
```

### 自定义主题

```jsx
import { LineChart } from '@agions/taroviz';

const customTheme = {
  color: ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed'],
  backgroundColor: '#ffffff',
  textStyle: {},
  title: {
    textStyle: {
      color: '#333333'
    },
    subtextStyle: {
      color: '#aaaaaa'
    }
  },
  line: {
    itemStyle: {
      borderWidth: 2
    },
    symbolSize: 4,
    symbol: 'circle',
    smooth: false
  },
  // ...其他配置
};

<LineChart 
  data={data} 
  config={{ theme: customTheme }} 
/>
```

## 平台适配器

### 获取当前平台信息

```jsx
import { getPlatform } from '@agions/taroviz-adapters';

const platform = getPlatform();
console.log(platform.name); // 'weapp', 'alipay', 'h5', ...
console.log(platform.canUseCanvas); // true/false
```

### 根据平台调整配置

```jsx
import { getPlatform } from '@agions/taroviz-adapters';
import { LineChart } from '@agions/taroviz';

function PlatformAwareChart() {
  const platform = getPlatform();
  
  const chartConfig = {
    renderer: platform.name === 'alipay' ? 'canvas' : 'svg',
    // 其他配置...
  };
  
  return <LineChart data={data} config={chartConfig} />;
}
```
