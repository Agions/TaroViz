# TaroViz 使用指南

## 安装

使用npm或yarn安装TaroViz：

```bash
# 使用npm
npm install @agions/taroviz

# 使用yarn
yarn add @agions/taroviz

# 使用pnpm
pnpm add @agions/taroviz
```

## 基本用法

### 引入组件

```jsx
import { LineChart } from '@agions/taroviz';
```

### 使用图表组件

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { LineChart } from '@agions/taroviz';

const BasicLineChart = () => {
  const chartData = {
    categories: ['一月', '二月', '三月', '四月', '五月', '六月'],
    series: [
      {
        name: '销售额',
        data: [150, 230, 224, 218, 135, 147],
      },
      {
        name: '利润',
        data: [70, 100, 120, 140, 80, 90],
      }
    ]
  };

  const chartConfig = {
    title: '月度销售数据',
    width: '100%',
    height: 300,
  };

  return (
    <View className="chart-container">
      <LineChart data={chartData} config={chartConfig} />
    </View>
  );
};

export default BasicLineChart;
```

## 配置选项

### 通用配置

所有图表组件都支持以下通用配置项：

| 配置项    | 类型             | 描述                         | 默认值    |
| --------- | ---------------- | ---------------------------- | --------- |
| width     | number\| string  | 图表宽度                     | '100%'    |
| height    | number\| string  | 图表高度                     | 300       |
| title     | string           | 图表标题                     | ''        |
| theme     | string\| object  | 主题名称或自定义主题配置对象 | 'default' |
| animation | boolean          | 是否启用动画                 | true      |
| loading   | boolean          | 是否显示加载状态             | false     |
| renderer  | 'canvas'\| 'svg' | 渲染器类型                   | 'canvas'  |
| onEvents  | object           | 事件监听函数                 | {}        |

### 数据格式

TaroViz支持多种数据格式，以下是基本格式：

```js
// 基本格式
const basicData = {
  categories: ['类别1', '类别2', '类别3'],
  series: [
    {
      name: '系列1',
      data: [10, 20, 30]
    }
  ]
};

// ECharts兼容格式
const echartsData = {
  xAxis: {
    type: 'category',
    data: ['类别1', '类别2', '类别3']
  },
  series: [
    {
      name: '系列1',
      type: 'bar',
      data: [10, 20, 30]
    }
  ]
};
```

## 响应式适配

TaroViz组件会自动适配不同设备和屏幕尺寸。您也可以通过提供不同的配置来进一步优化显示效果：

```jsx
import { useWindowSize } from '@agions/taroviz-hooks';

const ResponsiveChart = () => {
  const { width } = useWindowSize();
  
  // 根据屏幕宽度调整配置
  const chartConfig = {
    height: width < 768 ? 200 : 300,
    // 其他配置...
  };
  
  return <LineChart data={data} config={chartConfig} />;
};
```

## 平台差异

TaroViz支持多个小程序平台和H5，但不同平台之间可能有一些差异：

| 功能         | 微信小程序 | 支付宝小程序  | H5 |
| ------------ | ---------- | ------------- | -- |
| 所有图表类型 | ✅         | ✅            | ✅ |
| SVG渲染      | ✅         | ⚠️ 部分支持 | ✅ |
| 交互事件     | ✅         | ✅            | ✅ |
| 自定义主题   | ✅         | ✅            | ✅ |
| 图表动画     | ✅         | ⚠️ 可能较慢 | ✅ |

## 更多信息

有关更多信息和高级用法，请参考：

- [API文档](./API.md)
- [示例](./EXAMPLES.md)
- [开发指南](./DEVELOPMENT.md)
