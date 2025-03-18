# Chart 组件

Chart 组件是 TaroViz 的核心组件，用于在各平台上渲染 ECharts 图表。

## 基本用法

```tsx
import { Chart } from 'taroviz'
import { View } from '@tarojs/components'

const BasicChart = () => {
  const option = {
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
        type: 'bar'
      }
    ]
  }

  return (
    <View>
      <Chart
        option={option}
        height={300}
      />
    </View>
  )
}
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| option | EChartsOption | - | ECharts 图表配置项 |
| theme | string \| object | - | 图表主题 |
| width | number \| string | '100%' | 图表宽度 |
| height | number \| string | '300px' | 图表高度 |
| loading | boolean | false | 是否显示加载动画 |
| loadingOption | object | - | 加载动画配置项 |
| notMerge | boolean | false | 是否不合并配置项 |
| lazyUpdate | boolean | false | 是否延迟更新 |
| autoResize | boolean | true | 是否自动调整大小 |
| style | React.CSSProperties | {} | 容器样式 |
| className | string | '' | 容器类名 |
| onInit | (chart: any) => void | - | 图表初始化回调 |
| onRendered | () => void | - | 图表渲染完成回调 |
| onError | (e: Error) => void | - | 图表渲染错误回调 |
| onEvents | ChartEventListener[] | - | 图表事件监听器数组 |
| onlyRenderOnResize | boolean | false | 是否仅在尺寸变化时重新渲染 |
| showLoading | boolean | false | 是否显示加载动画 |
| showNoDataMask | boolean | true | 当无数据时是否显示遮罩 |
| noDataText | string | '暂无数据' | 无数据时显示的文本 |
| throttleRender | number | 100 | 渲染节流时间(ms) |
| canvasId | string | - | 自定义canvas id |
| customConfig | object | - | 自定义配置，见下文 |

## 自定义配置 (customConfig)

使用 `customConfig` 属性可以更方便地定制图表的常用配置，无需深入了解 ECharts 的复杂配置项。

### 示例

```tsx
<Chart
  option={option}
  height={300}
  customConfig={{
    tooltipFormatter: (params) => `${params.name}: ${params.value}`,
    colorPalette: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
    responsiveGrid: true,
    enableDataZoom: true,
    rotateLongLabels: true
  }}
/>
```

### 可用配置项

| 配置项 | 类型 | 说明 |
| --- | --- | --- |
| tooltipFormatter | (params: any) => string | 提示框格式化函数 |
| legendFormatter | (name: string) => string | 图例格式化函数 |
| axisLabelFormatter | (value: any, index: number) => string | 轴标签格式化函数 |
| animationDuration | number | 动画时长 |
| colorPalette | string[] | 自定义颜色 |
| responsiveGrid | boolean | 自适应网格 |
| fontFamily | string | 全局字体 |
| symbolSize | number | 标记大小 |
| titlePosition | 'center' \| 'left' \| 'right' | 标题位置 |
| tooltipTrigger | 'item' \| 'axis' \| 'none' | 提示触发方式 |
| background | string | 背景色 |
| enableDataZoom | boolean | 启用数据区域缩放 |
| rotateLongLabels | boolean | 旋转长标签 |
| locale | string | 国际化语言 |

## 事件处理

使用 `onEvents` 属性可以注册图表事件监听器：

```tsx
<Chart
  option={option}
  onEvents={[
    {
      name: 'click',
      callback: (params) => {
        console.log('点击了图表', params)
      }
    },
    {
      name: 'legendselectchanged',
      callback: (params) => {
        console.log('图例选择变化', params)
      }
    }
  ]}
/>
```

## 加载状态和空数据处理

Chart 组件内置了加载状态和空数据处理的 UI：

```tsx
// 显示加载状态
<Chart
  option={option}
  loading={true}
  loadingOption={{
    text: '加载中...',
    color: '#3498db',
    textColor: '#666'
  }}
/>

// 空数据处理
<Chart
  option={emptyOption}
  showNoDataMask={true}
  noDataText="暂无图表数据"
/>
```
