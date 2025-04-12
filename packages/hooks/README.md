# @agions/taroviz-hooks

[![npm version](https://img.shields.io/npm/v/@agions/taroviz-hooks.svg)](https://www.npmjs.com/package/@agions/taroviz-hooks)
[![npm downloads](https://img.shields.io/npm/dm/@agions/taroviz-hooks.svg)](https://www.npmjs.com/package/@agions/taroviz-hooks)
[![GitHub](https://img.shields.io/github/license/Agions/TaroViz)](https://github.com/Agions/TaroViz/blob/main/LICENSE)

TaroViz 的 React Hooks 集合，提供图表相关的便捷功能钩子。

## 介绍

`@agions/taroviz-hooks` 提供了一系列专为 TaroViz 图表开发设计的 React Hooks，让图表的状态管理、生命周期控制、事件处理等变得更加简单和直观。这些 Hooks 遵循 React Hooks 的设计原则，提供了声明式的 API。

## 安装

```bash
# npm
npm install @agions/taroviz-hooks

# yarn
yarn add @agions/taroviz-hooks

# pnpm
pnpm add @agions/taroviz-hooks
```

## 引用关系

- 依赖于：
  - [`@agions/taroviz-core`](https://www.npmjs.com/package/@agions/taroviz-core) - 使用核心类型和工具
  - [`@agions/taroviz-adapters`](https://www.npmjs.com/package/@agions/taroviz-adapters) - 使用平台适配能力

- 被以下包依赖：
  - [`@agions/taroviz-charts`](https://www.npmjs.com/package/@agions/taroviz-charts) - 提供生命周期控制
  - [`@agions/taroviz`](https://www.npmjs.com/package/@agions/taroviz) - 作为主包的组成部分

## 主要功能

- 图表实例管理
- 图表配置控制
- 图表尺寸响应式
- 图表事件处理
- 主题状态管理
- 加载状态控制
- 数据监听与更新

## 主要Hooks

### 图表管理

- `useChart` - 图表实例管理Hook
- `useOption` - 图表配置管理Hook
- `useResize` - 图表尺寸响应式Hook
- `useEvents` - 图表事件处理Hook
- `useLoading` - 图表加载状态Hook
- `useChartTheme` - 图表主题Hook
- `useChartData` - 图表数据Hook

## 使用示例

### 基础图表Hook

```jsx
import React, { useRef } from 'react';
import { useChart, useOption } from '@agions/taroviz-hooks';

const ChartDemo = () => {
  const containerRef = useRef(null);
  
  // 创建图表配置
  const option = {
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135],
        type: 'line'
      }
    ]
  };
  
  // 使用图表Hook
  const { chart, initialized } = useChart({
    container: containerRef,
    renderer: 'canvas',
    autoResize: true
  });
  
  // 使用配置Hook
  useOption(chart, option, {
    notMerge: false,
    lazyUpdate: true
  });
  
  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height: '300px' }}></div>
      {!initialized && <div>图表加载中...</div>}
    </div>
  );
};

export default ChartDemo;
```

### 事件处理

```jsx
import React, { useRef, useState } from 'react';
import { useChart, useEvents } from '@agions/taroviz-hooks';

const EventsDemo = () => {
  const containerRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const option = {
    // 图表配置...
  };
  
  const { chart } = useChart({
    container: containerRef,
    option
  });
  
  // 使用事件Hook
  useEvents(chart, {
    click: (params) => {
      setSelectedItem(params.name);
      console.log('点击了:', params);
    },
    legendselectchanged: (params) => {
      console.log('图例选择改变:', params);
    }
  });
  
  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height: '300px' }}></div>
      {selectedItem && <div>已选择: {selectedItem}</div>}
    </div>
  );
};

export default EventsDemo;
```

### 响应式尺寸

```jsx
import React, { useRef } from 'react';
import { useChart, useResize } from '@agions/taroviz-hooks';

const ResponsiveDemo = () => {
  const containerRef = useRef(null);
  
  const { chart } = useChart({
    container: containerRef,
    option: {
      // 图表配置...
    }
  });
  
  // 使用响应式Hook
  useResize(chart, containerRef);
  
  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height: '300px' }}></div>
    </div>
  );
};

export default ResponsiveDemo;
```

### 主题切换

```jsx
import React, { useRef, useState } from 'react';
import { useChart, useChartTheme } from '@agions/taroviz-hooks';

const ThemeDemo = () => {
  const containerRef = useRef(null);
  const [themeName, setThemeName] = useState('light');
  
  const { chart } = useChart({
    container: containerRef,
    option: {
      // 图表配置...
    }
  });
  
  // 使用主题Hook
  useChartTheme(chart, themeName);
  
  return (
    <div>
      <div>
        <button onClick={() => setThemeName('light')}>浅色主题</button>
        <button onClick={() => setThemeName('dark')}>深色主题</button>
      </div>
      <div ref={containerRef} style={{ width: '100%', height: '300px' }}></div>
    </div>
  );
};

export default ThemeDemo;
```

### 数据加载状态

```jsx
import React, { useRef, useState, useEffect } from 'react';
import { useChart, useLoading } from '@agions/taroviz-hooks';

const LoadingDemo = () => {
  const containerRef = useRef(null);
  const [data, setData] = useState(null);
  
  const { chart } = useChart({
    container: containerRef
  });
  
  // 使用加载状态Hook
  const { loading, setLoading } = useLoading(chart, {
    text: '加载中...',
    maskColor: 'rgba(255, 255, 255, 0.8)',
    textColor: '#333'
  });
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 模拟数据加载
        await new Promise(resolve => setTimeout(resolve, 2000));
        setData([150, 230, 224, 218, 135]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [setLoading]);
  
  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height: '300px' }}></div>
      {loading && <div>加载中...</div>}
    </div>
  );
};

export default LoadingDemo;
```

## 依赖要求

- `@tarojs/taro`: >=3.4.0
- `react`: >=16.13.0

## 相关链接

- [GitHub仓库](https://github.com/Agions/TaroViz)
- [问题反馈](https://github.com/Agions/TaroViz/issues)
- [完整文档](https://github.com/Agions/TaroViz/tree/main/packages/hooks)

## 许可证

MIT © [Agions](https://github.com/Agions) 