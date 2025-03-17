# TaroViz

## 简介

TaroViz 是一个多端兼容的 Apache ECharts 图表组件，专为 Taro 框架打造。支持在 H5、微信小程序、支付宝小程序和鸿蒙OS 等多个平台下无缝使用 ECharts 强大的可视化能力。

## 特性

- **多平台支持**：同一套代码，支持 H5、微信小程序、支付宝小程序和鸿蒙OS
- **完整 ECharts 能力**：支持 ECharts 提供的所有图表类型和交互特性
- **高性能渲染**：针对不同平台优化的渲染性能
- **灵活的配置项**：与原生 ECharts 配置保持一致，易于上手
- **丰富的事件处理**：支持点击、缩放、选中等交互事件处理
- **主题定制**：支持自定义主题，满足不同设计需求

## 安装

```bash
# 使用 npm
npm install taroviz echarts --save

# 使用 yarn
yarn add taroviz echarts

# 使用 pnpm
pnpm add taroviz echarts
```

## 使用方法

### 基础使用

```jsx
import { Component } from 'react';
import { View } from '@tarojs/components';
import ECharts from 'taroviz';

export default class Index extends Component {
  render() {
    // ECharts 配置项
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
    };

    return (
      <View className='container'>
        <ECharts
          option={option}
          width='100%'
          height='300px'
          onChartReady={(chart) => {
            console.log('图表已准备就绪', chart);
          }}
        />
      </View>
    );
  }
}
```

### 获取图表实例

```jsx
import { Component, createRef } from 'react';
import { View, Button } from '@tarojs/components';
import ECharts from 'taroviz';
import type { EChartsRef } from 'taroviz';

export default class Index extends Component {
  // 创建引用
  chartRef = createRef<EChartsRef>();

  // 更新数据
  updateData = () => {
    const chartInstance = this.chartRef.current?.getEchartsInstance();
    if (chartInstance) {
      // 直接操作图表实例
      chartInstance.setOption({
        series: [{
          data: [Math.random() * 200, Math.random() * 200, Math.random() * 200]
        }]
      });
    }
  };

  render() {
    const option = {
      xAxis: { data: ['A', 'B', 'C'] },
      yAxis: {},
      series: [{ type: 'bar', data: [100, 120, 90] }]
    };

    return (
      <View className='container'>
        <ECharts
          ref={this.chartRef}
          option={option}
          width='100%'
          height='300px'
        />
        <Button onClick={this.updateData}>更新数据</Button>
      </View>
    );
  }
}
```

## API

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| option | Object | - | ECharts 配置项，与 ECharts 官方配置一致 |
| width | string \| number | '100%' | 图表宽度 |
| height | string \| number | '300px' | 图表高度 |
| theme | string \| Object | 'light' | 图表主题 |
| canvasId | string | 'echarts-canvas' | Canvas ID，在小程序环境中必须唯一 |
| notMerge | boolean | false | 是否不合并与之前的配置 |
| lazyUpdate | boolean | false | 是否延迟更新 |
| showLoading | boolean | false | 是否显示加载动画 |
| loadingOption | Object | - | 加载动画配置 |
| renderer | 'canvas' \| 'svg' | 'canvas' | 渲染器类型 |
| devicePixelRatio | number | - | 设备像素比 |
| disableTouch | boolean | false | 是否禁用触摸事件 |
| onInit | (instance) => void | - | 图表初始化回调 |
| onChartReady | (instance) => void | - | 图表准备就绪回调 |
| onOptionChanged | (option) => void | - | 配置变更回调 |
| onRendered | () => void | - | 渲染完成回调 |
| onResize | (width, height) => void | - | 尺寸变化回调 |
| onEvents | Object | - | 事件处理函数映射表 |
| className | string | - | 自定义类名 |
| style | Object | - | 自定义样式 |

### 图表实例方法

通过 `ref` 可以获取组件实例，访问以下方法：

| 方法 | 说明 |
| --- | --- |
| getEchartsInstance() | 获取 ECharts 实例 |
| setOption(option, notMerge) | 设置图表配置 |
| resize() | 调整图表大小 |
| dispatchAction(payload) | 触发图表行为 |
| convertToDataURL(opts) | 转换为图片 URL |
| clear() | 清空图表 |
| dispose() | 销毁图表实例 |
| showLoading(opts) | 显示加载动画 |
| hideLoading() | 隐藏加载动画 |
| getDataURL(opts) | 获取图表图片 URL |

## 平台支持

| 平台 | 支持状态 |
| --- | --- |
| H5 | ✅ 完全支持 |
| 微信小程序 | ✅ 完全支持 |
| 支付宝小程序 | 🚧 部分支持，持续优化中 |
| 鸿蒙OS | 🚧 开发中 |

## 贡献指南

欢迎为 TaroViz 贡献代码和提出建议。请遵循以下步骤：

1. Fork 仓库
2. 创建新分支 (`git checkout -b feature/your-feature`)
3. 提交修改 (`git commit -m 'Add some feature'`)
4. 推送到远程分支 (`git push origin feature/your-feature`)
5. 创建 Pull Request

## 许可证

[MIT](LICENSE)
