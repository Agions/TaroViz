# TaroViz

TaroViz是一个专业的多端图表可视化解决方案，基于Taro和ECharts构建，专为跨平台应用场景设计。通过统一的API和灵活的适配器架构，提供在Web、React Native、小程序等多个平台上一致的图表开发体验和渲染效果。

![TaroViz Logo](./logo.png)

## 功能特点

- **多端适配架构**：采用适配器模式，支持H5、微信小程序、支付宝小程序、百度小程序、鸿蒙OS等多平台
- **统一API设计**：遵循一致性原则，提供统一的组件接口和配置项，实现一次开发多端运行
- **TypeScript支持**：完整的类型定义系统，包含泛型支持和严格类型检查，提供卓越的开发体验
- **丰富图表类型**：支持20+种图表类型，包括基础图表、复合图表和自定义图表
- **声明式开发**：提供React Hooks API，实现声明式、响应式的图表开发模式
- **主题与定制**：内置多种主题，并支持自定义主题和样式系统
- **高性能渲染**：针对移动端优化的渲染性能，支持大数据集和复杂交互场景
- **模块化设计**：采用模块化架构，支持按需引入，优化包体积和加载性能

## 技术架构

TaroViz采用多层架构设计，确保跨平台一致性和高性能：

- **核心层**：提供基础图表能力和类型定义
- **适配层**：处理不同平台差异，确保一致的API体验
- **组件层**：提供React组件封装，简化开发流程
- **钩子层**：提供React Hooks，实现声明式开发
- **工具层**：提供数据处理、格式转换等通用工具

这种分层设计确保了TaroViz能够在保持API一致性的同时，充分利用各平台的特性，提供最佳性能和用户体验。

## 安装

```bash
# 方式1: 安装主包 (推荐)
npm install @taroviz

# 方式2: 安装主包和必要子包
npm install @taroviz @taroviz/core @taroviz/adapters @taroviz/charts @taroviz/hooks

# 使用yarn
yarn add @taroviz

# 使用pnpm
pnpm add @taroviz
```

## 快速开始

### 基础图表示例

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { LineChart } from '@taroviz';

const BasicChart = () => {
  // 图表配置
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [{
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      smooth: true,
      areaStyle: {}
    }]
  };

  return (
    <View className="chart-container">
      <LineChart 
        option={option} 
        height="300px" 
        theme="dark"
        onChartReady={(chart) => console.log('图表已准备就绪', chart)}
      />
    </View>
  );
};

export default BasicChart;
```

### 多图表组合使用

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { LineChart, BarChart, PieChart, ScatterChart } from '@taroviz';

const MultiChartDemo = () => {
  // 各类图表配置 (代码略)
  
  return (
    <View className="dashboard">
      <View className="chart-row">
        <LineChart option={lineOption} height="300px" className="chart-item" />
        <BarChart option={barOption} height="300px" className="chart-item" />
      </View>
      <View className="chart-row">
        <PieChart option={pieOption} height="300px" className="chart-item" />
        <ScatterChart option={scatterOption} height="300px" className="chart-item" />
      </View>
    </View>
  );
};
```

## 导入方式

TaroViz提供多种灵活的导入方式，适应不同的项目结构和开发习惯：

```jsx
// 方式1：使用命名空间 (推荐)
import { Core, Adapters, Charts, Hooks, Themes } from '@taroviz';

// 命名空间使用示例
const chart = new Charts.LineChart({ /* 配置 */ });
const adapter = Adapters.getAdapter({ /* 配置 */ });
const theme = Themes.getTheme('dark');
const coreVersion = Core.version;

// 方式2：直接导入 (简便)
import { LineChart, getAdapter, useChart } from '@taroviz';

// 方式3：子包导入 (精细控制)
import { LineChart } from '@taroviz/charts';
import { useChart } from '@taroviz/hooks';
import { getAdapter } from '@taroviz/adapters';
```

## 响应式开发

TaroViz提供了一系列React Hooks，实现响应式图表开发：

```jsx
import React, { useRef, useState, useEffect } from 'react';
import { View, Button } from '@tarojs/components';
import { useChart, useOption, useResize, useEvents, useLoading, useChartTheme } from '@taroviz';

const ReactiveChart = () => {
  // 状态管理
  const chartRef = useRef(null);
  const [instance] = useChart(chartRef);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  const [data, setData] = useState([]);
  
  // 数据加载
  useEffect(() => {
    fetchData().then(responseData => {
      setData(responseData);
      setLoading(false);
    });
  }, []);
  
  // 图表配置 - 响应data变化自动更新
  const option = {
    xAxis: { type: 'category', data: data.map(item => item.name) },
    yAxis: { type: 'value' },
    series: [{ data: data.map(item => item.value), type: 'line' }]
  };
  
  // 使用钩子函数构建响应式图表
  useOption(instance, option);         // 配置响应
  useResize(instance);                  // 尺寸响应
  useLoading(instance, loading);        // 加载状态响应
  useChartTheme(instance, theme);       // 主题响应
  useEvents(instance, {                 // 事件响应
    click: handleChartClick,
    legendselectchanged: handleLegendChange
  });
  
  return (
    <View className="reactive-chart">
      <View ref={chartRef} style={{ width: '100%', height: '300px' }} />
      <View className="chart-controls">
        <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          切换主题
        </Button>
        <Button onClick={() => setLoading(!loading)}>
          {loading ? '隐藏' : '显示'}加载状态
        </Button>
        <Button onClick={refreshData}>刷新数据</Button>
      </View>
    </View>
  );
};
```

## 适配器系统

TaroViz的核心是强大的适配器系统，能够处理不同平台的差异，提供一致的开发体验：

```jsx
// 自动选择适配器 (推荐)
import { getAdapter } from '@taroviz';

function initChart(container, options) {
  // 自动检测当前环境并选择合适的适配器
  const adapter = getAdapter({
    container,
    width: '100%',
    height: '300px',
    theme: 'default',
    devicePixelRatio: 2,
    renderer: 'canvas'
  });
  
  // 初始化并配置图表
  adapter.init();
  adapter.setOption(options);
  
  return adapter;
}

// 手动选择适配器
import { H5Adapter, WeappAdapter, AlipayAdapter } from '@taroviz';
// 或从子包导入
import H5Adapter from '@taroviz/adapters/h5';
import WeappAdapter from '@taroviz/adapters/weapp';

// 根据环境创建适配器实例
const adapter = isH5Environment 
  ? new H5Adapter({ /* 配置 */ }) 
  : new WeappAdapter({ /* 配置 */ });
```

## 性能优化

TaroViz内置多种性能优化策略，特别适合移动端和小程序环境：

### 大数据集优化

```jsx
import { Data, Charts } from '@taroviz';

// 大数据集可视化优化
function optimizedChart() {
  // 假设有10,000+数据点
  const largeDataset = generateLargeDataset();
  
  // 1. 数据降采样
  const sampledData = Data.sample(largeDataset, {
    count: 200,  // 采样后的点数
    method: 'lttb' // 使用LTTB算法保留视觉特征
  });
  
  // 2. 渐进渲染
  const option = {
    // 启用渐进渲染
    progressive: 300, // 每帧渲染300个数据
    progressiveThreshold: 1000, // 数据量超过1000时启用
    
    // 关闭不必要的动画
    animation: false,
    
    // 使用采样后的数据
    series: [{
      type: 'line',
      data: sampledData,
      // 禁用符号绘制，减少绘制压力
      showSymbol: false,
      // 简化线条，提高性能
      lineStyle: { width: 1 }
    }]
  };
  
  return <Charts.LineChart option={option} />;
}
```

### 小程序优化

```jsx
import { LineChart } from '@taroviz';
import Taro from '@tarojs/taro';

function optimizedMiniChart() {
  // 小程序环境特殊优化
  const miniappOption = {
    // 减少轴标签数量
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月'],
      // 增大间隔，减少标签数量
      axisLabel: { interval: 'auto' }
    },
    
    // 简化提示框
    tooltip: {
      // 触摸优化
      triggerOn: 'click',
      // 简化内容
      formatter: '{b}: {c}'
    },
    
    // 其他配置...
  };
  
  return (
    <LineChart 
      option={miniappOption}
      // 小程序平台特殊配置
      renderer="canvas"
      notMerge={true}
      lazyUpdate={true}
      // 关闭不必要的动画
      animation={Taro.getEnv() === Taro.ENV_TYPE.WEAPP ? false : true}
    />
  );
}
```

## 模块化体系

TaroViz采用模块化设计，实现功能分离和按需加载：

```
@taroviz/
├── core          # 核心功能和类型定义
├── adapters      # 平台适配器实现
├── charts        # 图表组件封装
├── hooks         # React Hooks实现
├── themes        # 主题系统
├── data          # 数据处理工具
└── all           # 完整功能导出
```

每个模块可独立使用，也可通过主包统一引入：

```jsx
// 主包引入 (包含所有功能)
import { LineChart, useChart } from '@taroviz';

// 子包引入 (按需加载)
import { LineChart } from '@taroviz/charts';
import { useChart } from '@taroviz/hooks';
```

## 类型系统

TaroViz提供完整的TypeScript类型支持，确保代码质量和开发体验：

### 组件类型

```tsx
import { LineChart } from '@taroviz';
import { LineChartProps } from '@taroviz/charts';

// 组件属性类型
const props: LineChartProps = {
  option: { /* 图表配置 */ },
  theme: 'dark',
  width: '100%',
  height: 300,
  autoResize: true,
  onChartInit: (instance) => {
    // 类型安全的实例操作
    instance.setOption({ /* 更新配置 */ });
  }
};

// 类型安全的组件使用
<LineChart {...props} />;
```

### 选项类型

```tsx
import { EChartsOption } from '@taroviz/core';

// 图表选项类型
const option: EChartsOption = {
  // 类型系统提供智能提示和验证
  title: { text: '销售数据' },
  xAxis: { 
    type: 'category', 
    data: ['Q1', 'Q2', 'Q3', 'Q4'] 
  },
  yAxis: { 
    type: 'value',
    name: '销售额 (万元)'
  },
  series: [{ 
    name: '2023年',
    data: [120, 200, 150, 180], 
    type: 'line',
    smooth: true,
    markPoint: {
      data: [
        { type: 'max', name: '最大值' },
        { type: 'min', name: '最小值' }
      ]
    }
  }]
};
```

### 钩子函数类型

```tsx
import { useChart, useOption, useEvents } from '@taroviz';
import { ChartInstance, ChartOptions, ChartEventParams } from '@taroviz/hooks';

// 带泛型的钩子函数使用
const [instance, setInstance] = useChart<ChartInstance>(chartRef);

// 类型安全的配置更新
const options: ChartOptions = { /* 图表配置 */ };
useOption(instance, options);

// 类型安全的事件处理
useEvents<ChartEventParams>(instance, {
  click: (params) => {
    // 类型安全的事件参数访问
    console.log(`数据系列: ${params.seriesName}`);
    console.log(`数据索引: ${params.dataIndex}`);
    console.log(`数据值: ${params.value}`);
  }
});
```

## 平台兼容性

TaroViz目前支持以下平台:

| 平台 | 版本要求 | 特殊配置 |
|------|---------|---------|
| Web / H5 | 现代浏览器，IE11+ | 无 |
| 微信小程序 | 基础库 2.9.0+ | 需配置Canvas组件ID |
| 支付宝小程序 | 基础库 2.0.0+ | 需启用Canvas 2D权限 |
| 百度小程序 | 基础库 3.0.0+ | 无 |
| 鸿蒙OS | HMS Core 5.0+ | 配置相关权限 |

## API参考

详细的API文档请参阅：

- [API参考文档](./docs/API.md)
- [使用指南](./docs/USAGE.md)
- [图表类型示例](./docs/EXAMPLES.md)
- [配置选项说明](./docs/OPTIONS.md)
- [开发指南](./docs/DEVELOPMENT.md)

## 许可证

TaroViz使用MIT许可证，详情请参见[LICENSE](LICENSE)文件。
