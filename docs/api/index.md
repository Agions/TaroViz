# API 文档

TaroViz 提供了丰富的 API，包括核心组件、图表组件、Hooks、工具函数和类型定义。本指南将介绍 TaroViz 的 API。

## 1. 核心组件

### 1.1 BaseChart

基础图表组件，所有图表组件的基类。

#### 属性

| 属性名     | 类型              | 描述             | 默认值    |
| ---------- | ----------------- | ---------------- | --------- |
| chartId    | string            | 图表唯一标识符   | -         |
| option     | object            | ECharts 配置项   | -         |
| width      | string \| number  | 图表宽度         | '100%'    |
| height     | string \| number  | 图表高度         | 400       |
| theme      | string \| object  | 图表主题         | 'default' |
| renderer   | 'canvas' \| 'svg' | 渲染器类型       | 'canvas'  |
| autoResize | boolean           | 是否自动调整大小 | false     |
| adapter    | string            | 平台适配器名称   | -         |

#### 事件

| 事件名                | 类型                  | 描述               |
| --------------------- | --------------------- | ------------------ |
| onInit                | () => void            | 图表初始化完成事件 |
| onRenderComplete      | () => void            | 图表渲染完成事件   |
| onClick               | (params: any) => void | 图表点击事件       |
| onDblClick            | (params: any) => void | 图表双击事件       |
| onMouseDown           | (params: any) => void | 鼠标按下事件       |
| onMouseMove           | (params: any) => void | 鼠标移动事件       |
| onMouseUp             | (params: any) => void | 鼠标释放事件       |
| onMouseOver           | (params: any) => void | 鼠标悬停事件       |
| onMouseOut            | (params: any) => void | 鼠标离开事件       |
| onDataZoom            | (params: any) => void | 数据缩放事件       |
| onLegendSelectChanged | (params: any) => void | 图例选择变化事件   |

#### 方法

| 方法名                 | 描述           |
| ---------------------- | -------------- |
| resize()               | 调整图表大小   |
| setOption(option: any) | 设置图表配置项 |
| getOption()            | 获取图表配置项 |
| destroy()              | 销毁图表实例   |

## 2. 图表组件

TaroViz 提供了多种图表组件，每种图表组件都继承自 BaseChart。

### 2.1 LineChart

折线图组件。

```typescript
import { LineChart } from '@agions/taroviz';
```

### 2.2 BarChart

柱状图组件。

```typescript
import { BarChart } from '@agions/taroviz';
```

### 2.3 PieChart

饼图组件。

```typescript
import { PieChart } from '@agions/taroviz';
```

### 2.4 ScatterChart

散点图组件。

```typescript
import { ScatterChart } from '@agions/taroviz';
```

### 2.5 RadarChart

雷达图组件。

```typescript
import { RadarChart } from '@agions/taroviz';
```

### 2.6 HeatmapChart

热力图组件。

```typescript
import { HeatmapChart } from '@agions/taroviz';
```

### 2.7 GaugeChart

仪表盘组件。

```typescript
import { GaugeChart } from '@agions/taroviz';
```

### 2.8 FunnelChart

漏斗图组件。

```typescript
import { FunnelChart } from '@agions/taroviz';
```

## 3. Hooks

### 3.1 useChart

用于管理图表实例的 Hook。

```typescript
import { useChart } from '@agions/taroviz';

const ChartComponent = () => {
  const { chartRef, chartInstance } = useChart('chart-id');

  // 使用 chartInstance 调用图表方法
  const handleClick = () => {
    if (chartInstance) {
      chartInstance.resize();
    }
  };

  return (
    <LineChart
      ref={chartRef}
      chartId="chart-id"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

### 3.2 useTheme

用于管理图表主题的 Hook。

```typescript
import { useTheme } from '@agions/taroviz';

const ThemeComponent = () => {
  const { theme, setTheme } = useTheme('default');

  return (
    <LineChart
      chartId="chart-id"
      option={option}
      width="100%"
      height={400}
      theme={theme}
    />
  );
};
```

## 4. 工具函数

### 4.1 registerTheme

注册自定义主题。

```typescript
import { registerTheme } from '@agions/taroviz';

registerTheme('custom-theme', {
  color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
  backgroundColor: '#f5f5f5',
});
```

### 4.2 registerAdapter

注册自定义平台适配器。

```typescript
import { registerAdapter } from '@agions/taroviz';

class CustomAdapter {
  // 实现适配器方法
}

registerAdapter('custom', CustomAdapter);
```

### 4.3 getAdapter

获取指定平台的适配器。

```typescript
import { getAdapter } from '@agions/taroviz';

const adapter = getAdapter('weapp');
```

### 4.4 detectPlatform

检测当前运行平台。

```typescript
import { detectPlatform } from '@agions/taroviz';

const platform = detectPlatform();
console.log('当前平台:', platform);
```

## 5. 性能分析工具

### 5.1 PerformanceAnalyzer

性能分析工具，用于监控图表的性能。

```typescript
import { PerformanceAnalyzer } from '@agions/taroviz';

// 获取单例实例
const analyzer = PerformanceAnalyzer.getInstance();

// 开始监控
analyzer.start();

// 停止监控
analyzer.stop();

// 生成报告
const report = analyzer.generateReport();
console.log('性能报告:', report);
```

## 6. 配置生成器

### 6.1 ConfigGenerator

图表配置生成器，用于生成 ECharts 配置项。

```typescript
import { ConfigGenerator } from '@agions/taroviz';

// 创建配置生成器实例
const generator = new ConfigGenerator();

// 生成折线图配置
const lineConfig = generator.generate('line', {
  title: '折线图示例',
  data: [120, 200, 150, 80, 70, 110, 130],
});
```

## 7. 代码生成器

### 7.1 CodeGenerator

代码示例生成器，用于生成不同框架的代码示例。

```typescript
import { CodeGenerator } from '@agions/taroviz';

// 创建代码生成器实例
const generator = new CodeGenerator();

// 生成 React 代码示例
const reactCode = generator.generate('react', {
  chartType: 'line',
  option: {
    title: { text: '折线图示例' },
    series: [{ data: [120, 200, 150, 80, 70, 110, 130] }],
  },
});
```

## 8. 类型定义

### 8.1 ChartProps

图表组件属性类型。

```typescript
import type { ChartProps } from '@agions/taroviz';

const props: ChartProps = {
  chartId: 'chart-id',
  option: {},
  width: '100%',
  height: 400,
};
```

### 8.2 Adapter

平台适配器接口。

```typescript
import type { Adapter } from '@agions/taroviz';

class CustomAdapter implements Adapter {
  // 实现接口方法
}
```

### 8.3 Theme

主题类型。

```typescript
import type { Theme } from '@agions/taroviz';

const customTheme: Theme = {
  color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
  backgroundColor: '#f5f5f5',
};
```

## 9. 常量

### 9.1 Platform

平台常量。

```typescript
import { Platform } from '@agions/taroviz';

console.log(Platform.WEAPP); // 'weapp'
console.log(Platform.ALIPAY); // 'alipay'
console.log(Platform.SWAN); // 'swan'
console.log(Platform.TT); // 'tt'
console.log(Platform.H5); // 'h5'
console.log(Platform.RN); // 'rn'
```

### 9.2 Version

版本常量。

```typescript
import { version } from '@agions/taroviz';

console.log('TaroViz 版本:', version);
```

## 10. 错误处理

### 10.1 错误类型

TaroViz 定义了多种错误类型，用于标识不同的错误场景。

| 错误类型       | 描述           |
| -------------- | -------------- |
| ChartInitError | 图表初始化错误 |
| AdapterError   | 适配器错误     |
| ThemeError     | 主题错误       |
| ConfigError    | 配置错误       |

### 10.2 错误处理

在使用 TaroViz 时，建议添加错误处理：

```typescript
import { LineChart, ChartInitError } from '@agions/taroviz';

const ErrorHandlingExample = () => {
  const handleError = (error: Error) => {
    if (error instanceof ChartInitError) {
      console.error('图表初始化错误:', error.message);
    } else {
      console.error('其他错误:', error.message);
    }
  };

  return (
    <LineChart
      chartId="error-chart"
      option={option}
      width="100%"
      height={400}
      onError={handleError}
    />
  );
};
```
