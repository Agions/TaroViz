# 主题定制

TaroViz 提供了灵活的主题定制功能，允许您根据自己的需求调整图表的外观和风格。本指南将介绍 TaroViz 的主题系统和自定义主题的方法。

## 内置主题

TaroViz 内置了多种主题，您可以直接使用：

| 主题名称 | 描述     |
| -------- | -------- |
| default  | 默认主题 |
| dark     | 深色主题 |
| light    | 浅色主题 |
| blue     | 蓝色主题 |
| green    | 绿色主题 |
| orange   | 橙色主题 |

## 使用内置主题

您可以通过 `theme` 属性指定使用的主题：

```typescript
import { LineChart } from '@agions/taroviz';

const ThemeExample = () => {
  const option = {
    // 配置项
  };

  return (
    <LineChart
      chartId="theme-chart"
      option={option}
      width="100%"
      height={400}
      theme="dark" // 使用深色主题
    />
  );
};
```

## 自定义主题

### 主题结构

TaroViz 主题是一个包含各种样式配置的对象，主要包括以下部分：

```typescript
const customTheme = {
  // 颜色配置
  color: [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc',
  ],

  // 背景色
  backgroundColor: '#fff',

  // 文本样式
  textStyle: {
    color: '#333',
  },

  // 标题样式
  title: {
    textStyle: {
      color: '#333',
    },
  },

  // 图例样式
  legend: {
    textStyle: {
      color: '#333',
    },
  },

  // 坐标轴样式
  axisLine: {
    lineStyle: {
      color: '#ccc',
    },
  },

  axisTick: {
    lineStyle: {
      color: '#ccc',
    },
  },

  axisLabel: {
    color: '#666',
  },

  // 网格线样式
  splitLine: {
    lineStyle: {
      color: '#eee',
      type: 'dashed',
    },
  },

  // 提示框样式
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderColor: '#ccc',
    textStyle: {
      color: '#fff',
    },
  },

  // 系列样式
  series: {
    line: {
      itemStyle: {
        borderWidth: 2,
      },
      lineStyle: {
        width: 3,
      },
      areaStyle: {
        opacity: 0.3,
      },
    },
    bar: {
      itemStyle: {
        borderRadius: 4,
      },
    },
    pie: {
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2,
      },
    },
  },
};
```

### 使用自定义主题

您可以直接将自定义主题对象传递给 `theme` 属性：

```typescript
import { LineChart } from '@agions/taroviz';

const CustomThemeExample = () => {
  const option = {
    // 配置项
  };

  const customTheme = {
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
    backgroundColor: '#f5f5f5',
    textStyle: {
      color: '#333'
    }
  };

  return (
    <LineChart
      chartId="custom-theme-chart"
      option={option}
      width="100%"
      height={400}
      theme={customTheme} // 使用自定义主题
    />
  );
};
```

### 注册全局主题

您可以使用 `registerTheme` 函数注册全局主题，方便在多个图表中复用：

```typescript
import { registerTheme, LineChart, BarChart } from '@agions/taroviz';

// 注册全局主题
registerTheme('my-theme', {
  color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
  backgroundColor: '#f5f5f5'
});

const GlobalThemeExample = () => {
  const option = {
    // 配置项
  };

  return (
    <div>
      <LineChart
        chartId="line-chart"
        option={option}
        width="100%"
        height={400}
        theme="my-theme" // 使用全局主题
      />
      <BarChart
        chartId="bar-chart"
        option={option}
        width="100%"
        height={400}
        theme="my-theme" // 使用全局主题
      />
    </div>
  );
};
```

## 主题切换

您可以动态切换主题，实现主题的实时更新：

```typescript
import React, { useState } from 'react';
import { LineChart } from '@agions/taroviz';

const ThemeSwitchExample = () => {
  const [theme, setTheme] = useState('default');
  const [option, setOption] = useState({
    // 配置项
  });

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleThemeChange('default')}>默认主题</button>
        <button onClick={() => handleThemeChange('dark')}>深色主题</button>
        <button onClick={() => handleThemeChange('light')}>浅色主题</button>
        <button onClick={() => handleThemeChange('blue')}>蓝色主题</button>
      </div>
      <LineChart
        chartId="theme-switch-chart"
        option={option}
        width="100%"
        height={400}
        theme={theme}
      />
    </div>
  );
};
```

## 主题继承

您可以基于现有主题创建新主题，实现主题的继承和扩展：

```typescript
import { registerTheme } from '@agions/taroviz';

// 基于深色主题创建新主题
registerTheme('my-dark-theme', {
  // 继承深色主题
  extends: 'dark',
  // 覆盖部分配置
  color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
  backgroundColor: '#1a1a1a',
});
```

## 主题最佳实践

### 1. 保持一致性

确保所有图表使用相同的主题，保持整个应用的视觉一致性。

### 2. 考虑可读性

选择合适的颜色对比度，确保图表内容清晰可读。

### 3. 适应不同场景

- 数据展示场景：使用清晰、简洁的主题
- 数据监控场景：使用高对比度主题，突出关键数据
- 演示场景：使用鲜艳、吸引人的主题

### 4. 响应式主题

考虑在不同设备和屏幕尺寸下的主题适配：

```typescript
import React, { useState, useEffect } from 'react';
import { LineChart } from '@agions/taroviz';

const ResponsiveThemeExample = () => {
  const [theme, setTheme] = useState('default');
  const [option, setOption] = useState({
    // 配置项
  });

  useEffect(() => {
    // 检测系统主题
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    // 初始检测
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    // 监听主题变化
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return (
    <LineChart
      chartId="responsive-theme-chart"
      option={option}
      width="100%"
      height={400}
      theme={theme}
    />
  );
};
```

## 主题配置参考

有关 ECharts 主题配置的详细说明，请参考 [ECharts 主题配置文档](https://echarts.apache.org/zh/option.html#color)。

## 下一步

继续阅读 [性能优化](./performance.md) 指南，了解如何优化 TaroViz 图表的性能。
