# TaroViz 使用文档

## 安装

### 使用 npm 安装

```bash
npm install taroviz
```

### 使用 yarn 安装

```bash
yarn add taroviz
```

## 基础使用

### 引入组件

```tsx
import { Chart } from 'taroviz'
```

### 基础示例

```tsx
import { Chart } from 'taroviz'

const MyChart = () => {
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
  }

  return <Chart option={option} />
}
```

## 配置说明

### 基础配置

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| option | `EChartsOption` | ECharts 配置项 | - |
| style | `CSSProperties` | 容器样式 | `{ width: '100%', height: '300px' }` |
| theme | `string` | 主题名称 | 'light' |
| loading | `boolean` | 是否显示加载动画 | false |
| loadingOption | `object` | 加载动画配置 | - |

### 事件配置

```tsx
const MyChart = () => {
  const option = {
    // ... 图表配置
  }

  const onInit = (chart) => {
    console.log('图表初始化完成', chart)
  }

  const onClick = (params) => {
    console.log('点击事件', params)
  }

  return (
    <Chart
      option={option}
      onInit={onInit}
      onClick={onClick}
    />
  )
}
```

### 主题配置

```tsx
import { Chart } from 'taroviz'
import 'taroviz/dist/theme/dark.css'

const MyChart = () => {
  const option = {
    // ... 图表配置
  }

  return <Chart option={option} theme="dark" />
}
```

## 图表类型示例

### 折线图

```tsx
const LineChart = () => {
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
      type: 'line',
      smooth: true
    }]
  }

  return <Chart option={option} />
}
```

### 柱状图

```tsx
const BarChart = () => {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }]
  }

  return <Chart option={option} />
}
```

### 饼图

```tsx
const PieChart = () => {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    series: [{
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
        { value: 300, name: '视频广告' }
      ]
    }]
  }

  return <Chart option={option} />
}
```

## 动态数据更新

```tsx
const DynamicChart = () => {
  const [data, setData] = useState([820, 932, 901, 934, 1290, 1330, 1320])

  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: data,
      type: 'line'
    }]
  }

  const updateData = () => {
    setData(data.map(v => v + Math.random() * 100))
  }

  return (
    <div>
      <Chart option={option} />
      <button onClick={updateData}>更新数据</button>
    </div>
  )
}
```

## 按需引入

```tsx
// 只引入需要的图表类型
import { Chart } from 'taroviz/dist/chart'
import 'taroviz/dist/chart/line'
import 'taroviz/dist/chart/bar'

const MyChart = () => {
  const option = {
    // ... 图表配置
  }

  return <Chart option={option} />
}
```

## 常见问题

### 1. 图表不显示

检查以下几点：
- 确保容器有宽高
- 检查 option 配置是否正确
- 检查控制台是否有错误信息

### 2. 性能优化

- 使用按需引入
- 合理设置图表更新频率
- 避免频繁更新大量数据

### 3. 主题切换

- 确保引入对应的主题文件
- 检查主题名称是否正确
- 注意主题切换的性能影响

## 最佳实践

1. 合理设置图表容器大小
2. 使用响应式布局
3. 添加适当的加载状态
4. 处理图表事件
5. 优化数据更新策略
6. 使用主题定制
7. 添加图表交互提示
8. 处理异常情况

## 更新日志

### v0.2.0
- 新增 H5 平台支持
- 优化打包配置
- 完善类型定义
- 添加示例文档

### v0.1.0
- 初始版本发布
- 支持基础图表类型
- 支持微信小程序
