# API 文档

TaroViz 提供完整的 API 接口，包括核心组件、Hooks、工具函数和类型定义。

::: info TypeScript 支持
所有 API 都提供完整的 TypeScript 类型定义，IDE 中可享受智能提示。
:::

## API 概览

| 分类 | 说明 |
|:---|:---|
| [核心组件](#核心组件) | BaseChart 及所有图表组件 |
| [Hooks](#hooks) | useChart、useTheme 等 React Hooks |
| [工具函数](#工具函数) | registerTheme、registerAdapter 等 |
| [类型定义](#类型定义) | ChartProps、Adapter、Theme 等 |

---

## 核心组件

### BaseChart

所有图表组件的基类，提供通用的属性、事件和方法。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|:---|:---|:---|:---|
| `chartId` | `string` | - | 图表唯一标识符 |
| `option` | `object` | - | ECharts 配置项 |
| `width` | `string \| number` | `'100%'` | 图表宽度 |
| `height` | `string \| number` | `400` | 图表高度 |
| `theme` | `string \| object` | `'default'` | 图表主题 |
| `renderer` | `'canvas' \| 'svg'` | `'canvas'` | 渲染器类型 |
| `autoResize` | `boolean` | `false` | 是否自动调整大小 |
| `adapter` | `string` | - | 平台适配器名称 |

#### 事件

| 事件 | 参数 | 说明 |
|:---|:---|:---|
| `onInit` | `() => void` | 图表初始化完成 |
| `onRenderComplete` | `() => void` | 图表渲染完成 |
| `onClick` | `(params) => void` | 点击事件 |
| `onDataZoom` | `(params) => void` | 数据缩放事件 |
| `onLegendSelectChanged` | `(params) => void` | 图例选择变化 |

#### 方法

| 方法 | 说明 |
|:---|:---|
| `resize()` | 调整图表大小 |
| `setOption(option)` | 设置图表配置项 |
| `getOption()` | 获取当前配置项 |
| `destroy()` | 销毁图表实例 |

---

### 图表组件

所有图表组件都继承自 BaseChart：

| 组件 | 说明 |
|:---|:---|
| `LineChart` | 折线图 |
| `BarChart` | 柱状图 |
| `PieChart` | 饼图 |
| `ScatterChart` | 散点图 |
| `RadarChart` | 雷达图 |
| `HeatmapChart` | 热力图 |
| `GaugeChart` | 仪表盘 |
| `FunnelChart` | 漏斗图 |
| `TreeMapChart` | 矩形树图 |
| `SunburstChart` | 旭日图 |
| `SankeyChart` | 桑基图 |

---

## Hooks

### useChart

用于管理图表实例的 Hook。

```typescript
import { useChart } from '@agions/taroviz';

function ChartComponent() {
  const { chartRef, chartInstance } = useChart('chart-id');

  const handleClick = () => {
    chartInstance?.resize();
  };

  return (
    <LineChart
      ref={chartRef}
      chartId="chart-id"
      option={option}
    />
  );
}
```

### useTheme

用于管理图表主题。

```typescript
import { useTheme } from '@agions/taroviz';

function ThemeComponent() {
  const { theme, setTheme } = useTheme('default');

  return (
    <LineChart
      chartId="chart"
      option={option}
      theme={theme}
    />
  );
}
```

---

## 工具函数

### registerTheme

注册自定义主题。

```typescript
import { registerTheme } from '@agions/taroviz';

registerTheme('my-theme', {
  color: ['#5470c6', '#91cc75', '#fac858'],
  backgroundColor: '#f5f5f5',
});
```

### registerAdapter

注册自定义平台适配器。

```typescript
import { registerAdapter } from '@agions/taroviz';

registerAdapter('custom', CustomAdapter);
```

### detectPlatform

检测当前运行平台。

```typescript
import { detectPlatform } from '@agions/taroviz';

const platform = detectPlatform();
// 'weapp' | 'alipay' | 'swan' | 'tt' | 'h5' | 'rn'
```

---

## 类型定义

### ChartProps

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

### Platform

平台常量。

```typescript
import { Platform } from '@agions/taroviz';

Platform.WEAPP  // 'weapp'
Platform.ALIPAY // 'alipay'
Platform.H5     // 'h5'
```

### version

版本信息。

```typescript
import { version } from '@agions/taroviz';

console.log(version); // 'x.x.x'
```

---

## 错误处理

TaroViz 定义了多种错误类型：

| 错误类型 | 说明 |
|:---|:---|
| `ChartInitError` | 图表初始化错误 |
| `AdapterError` | 适配器错误 |
| `ThemeError` | 主题错误 |
| `ConfigError` | 配置错误 |

```typescript
import { LineChart, ChartInitError } from '@agions/taroviz';

<LineChart
  chartId="chart"
  option={option}
  onError={(error) => {
    if (error instanceof ChartInitError) {
      console.error('初始化失败:', error.message);
    }
  }}
/>
```
