# @agions/taroviz-hooks

[![npm version](https://img.shields.io/npm/v/@agions/taroviz-hooks.svg)](https://www.npmjs.com/package/@agions/taroviz-hooks)
[![npm downloads](https://img.shields.io/npm/dm/@agions/taroviz-hooks.svg)](https://www.npmjs.com/package/@agions/taroviz-hooks)
[![GitHub](https://img.shields.io/github/license/Agions/TaroViz)](https://github.com/Agions/TaroViz/blob/main/LICENSE)

## 简介

@agions/taroviz-hooks 是 TaroViz 图表库的一部分，提供了专门为多端环境（小程序、H5）设计的 React Hooks 集合。本包提供易用且高效的状态管理和生命周期控制解决方案，帮助开发者在 Taro 应用中轻松集成和管理 ECharts 图表。

## 技术依赖

- React 16.13.0+
- Taro 3.4.0+
- ECharts 5.4.0+ (内部集成)
- TypeScript 支持

## 安装

```bash
# 使用npm
npm install @agions/taroviz-hooks

# 使用yarn
yarn add @agions/taroviz-hooks

# 使用pnpm
pnpm add @agions/taroviz-hooks
```

## 核心功能

- **图表实例管理** - 创建、配置和销毁图表实例
- **响应式图表** - 自动处理容器大小变化
- **事件处理** - 统一的图表事件处理机制
- **主题管理** - 动态设置和切换图表主题
- **加载状态控制** - 提供统一的加载状态管理
- **数据管理** - 高效的数据更新和缓存策略

## API 参考

### useChart

`useChart` 钩子用于创建和管理图表实例，遵循 React 组件生命周期。

```typescript
function useChart<T extends Record<string, any>>(
  options?: {
    renderer?: 'canvas' | 'svg';
    theme?: string | object;
    devicePixelRatio?: number;
    autoResize?: boolean;
    [key: string]: any;
  }
): {
  chartRef: React.RefObject<HTMLDivElement>;
  instance: EChartsInstance | null;
  initialized: boolean;
}
```

**参数:**

- `options`
  - `renderer`: 渲染器类型，支持 'canvas' 或 'svg'
  - `theme`: 图表主题名称或主题配置对象
  - `devicePixelRatio`: 设备像素比
  - `autoResize`: 是否自动调整大小（默认为 true）

**返回值:**

- `chartRef`: 用于绑定到容器元素的引用
- `instance`: ECharts 实例
- `initialized`: 图表是否已初始化

### useOption

用于设置和更新图表配置。

```typescript
function useOption(
  instance: EChartsInstance | null,
  option: EChartsOption,
  notMerge?: boolean,
  lazyUpdate?: boolean
): void
```

**参数:**

- `instance`: 图表实例
- `option`: 图表配置对象
- `notMerge`: 是否不合并之前的配置（默认 false）
- `lazyUpdate`: 是否延迟更新（默认 false）

### useResize

自动处理窗口大小变化时的图表尺寸调整。

```typescript
function useResize(
  instance: EChartsInstance | null,
  delay?: number
): void
```

**参数:**

- `instance`: 图表实例
- `delay`: 调整大小的防抖延迟时间（毫秒，默认 200）

### useEvents

管理图表事件的注册与解除。

```typescript
function useEvents(
  instance: EChartsInstance | null,
  events: Record<string, (params: any) => void>
): void
```

**参数:**

- `instance`: 图表实例
- `events`: 事件映射对象，键为事件名，值为处理函数

### useLoading

控制图表的加载状态。

```typescript
function useLoading(
  instance: EChartsInstance | null,
  options?: {
    text?: string;
    color?: string;
    textColor?: string;
    maskColor?: string;
    zlevel?: number;
    [key: string]: any;
  }
): {
  showLoading: () => void;
  hideLoading: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
```

**参数:**

- `instance`: 图表实例
- `options`: 加载配置选项

**返回值:**

- `showLoading`: 显示加载状态的函数
- `hideLoading`: 隐藏加载状态的函数
- `loading`: 当前加载状态
- `setLoading`: 设置加载状态的函数

### useChartTheme

动态设置图表主题。

```typescript
function useChartTheme(
  instance: EChartsInstance | null,
  theme: string | object
): void
```

**参数:**

- `instance`: 图表实例
- `theme`: 主题名称或主题对象

### useChartData

高效管理和更新图表数据。

```typescript
function useChartData<T>(
  instance: EChartsInstance | null,
  initialData: T
): {
  data: T;
  updateData: (newData: T | ((prevData: T) => T), notMerge?: boolean) => void;
}
```

**参数:**

- `instance`: 图表实例
- `initialData`: 初始数据

**返回值:**

- `data`: 当前数据
- `updateData`: 更新数据的函数

## 使用示例

### 基础折线图

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { useChart, useOption, useResize } from '@agions/taroviz-hooks';

function LineChartExample() {
  // 创建图表实例
  const { chartRef, instance } = useChart({
    renderer: 'canvas',
    theme: 'light',
  });

  // 图表配置
  useOption(instance, {
    title: {
      text: '月度销售数据',
      textStyle: {
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
    },
    yAxis: {
      type: 'value',
      name: '销售额（万元）'
    },
    series: [{
      name: '销售数据',
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      smooth: true
    }]
  });

  // 自动处理窗口大小变化
  useResize(instance);

  return (
    <View 
      className="chart-container" 
      ref={chartRef} 
      style={{ width: '100%', height: '300px', padding: '12px' }} 
    />
  );
}

export default LineChartExample;
```

### 事件处理示例

```jsx
import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { useChart, useOption, useEvents } from '@agions/taroviz-hooks';

function InteractiveChartExample() {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const { chartRef, instance } = useChart();
  
  useOption(instance, {
    // 配置柱状图
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [10, 22, 28, 43, 49],
      type: 'bar',
      emphasis: {
        itemStyle: {
          color: '#5470c6'
        }
      }
    }]
  });
  
  // 注册点击事件
  useEvents(instance, {
    click: (params) => {
      setSelectedPoint({
        name: params.name,
        value: params.value,
        dataIndex: params.dataIndex
      });
    }
  });
  
  return (
    <View>
      <View ref={chartRef} style={{ width: '100%', height: '250px' }} />
      {selectedPoint && (
        <View style={{ padding: '8px', background: '#f5f5f5', borderRadius: '4px', marginTop: '8px' }}>
          <Text>已选择: {selectedPoint.name}，值: {selectedPoint.value}</Text>
        </View>
      )}
    </View>
  );
}

export default InteractiveChartExample;
```

### 主题切换示例

```jsx
import React, { useState } from 'react';
import { View, Button } from '@tarojs/components';
import { useChart, useOption, useChartTheme } from '@agions/taroviz-hooks';

function ThemeSwitchExample() {
  const [theme, setTheme] = useState('light');
  const { chartRef, instance } = useChart();
  
  // 配置图表数据
  useOption(instance, {
    series: [{
      type: 'pie',
      radius: '60%',
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 274, name: '联盟广告' },
        { value: 235, name: '视频广告' },
        { value: 400, name: '搜索引擎' }
      ]
    }]
  });
  
  // 使用主题Hook
  useChartTheme(instance, theme);
  
  return (
    <View>
      <View style={{ marginBottom: '12px', display: 'flex', gap: '8px' }}>
        <Button onClick={() => setTheme('light')} 
                style={{ background: theme === 'light' ? '#e6f7ff' : '#f5f5f5' }}>
          浅色主题
        </Button>
        <Button onClick={() => setTheme('dark')}
                style={{ background: theme === 'dark' ? '#e6f7ff' : '#f5f5f5' }}>
          深色主题
        </Button>
      </View>
      <View ref={chartRef} style={{ width: '100%', height: '300px' }} />
    </View>
  );
}

export default ThemeSwitchExample;
```

## 与其他包的关系

- 依赖 `@agions/taroviz-core` 提供核心类型和工具
- 依赖 `@agions/taroviz-adapters` 提供平台适配能力
- 被 `@agions/taroviz-charts` 和主包 `@agions/taroviz` 引用

## 仓库关联

本包是 [TaroViz](https://github.com/agions/taroviz) 项目的一部分，存在于 `packages/hooks` 目录中。

```bash
# 克隆整个项目
git clone https://github.com/agions/taroviz.git

# 进入hooks包目录
cd taroviz/packages/hooks

# 安装依赖
pnpm install

# 构建包
pnpm build
```

## 贡献指南

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改，遵循提交规范 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

### 开发规范

- 遵循 TypeScript 类型定义
- 确保所有 Hook 遵循 React Hooks 的规则
- 编写测试用例
- 保持向后兼容性

## 许可证

[MIT License](https://github.com/agions/taroviz/blob/main/LICENSE) © [Agions](https://github.com/Agions)
