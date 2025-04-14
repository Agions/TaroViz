# @agions/taroviz-themes

[![npm version](https://img.shields.io/npm/v/@agions/taroviz-themes.svg)](https://www.npmjs.com/package/@agions/taroviz-themes)
[![npm downloads](https://img.shields.io/npm/dm/@agions/taroviz-themes.svg)](https://www.npmjs.com/package/@agions/taroviz-themes)
[![GitHub](https://img.shields.io/github/license/Agions/TaroViz)](https://github.com/Agions/TaroViz/blob/main/LICENSE)

## 简介

@agions/taroviz-themes 是 TaroViz 图表库的主题系统，提供了一套完整的主题管理解决方案，使开发者能够轻松地为图表应用统一的视觉风格。该包支持多种内置主题，同时提供了强大的自定义主题功能，可适配不同业务场景的视觉需求。

## 技术依赖

- TypeScript 5.0+
- React 18.0+
- ECharts 5.4.0+
- @agions/taroviz-core

## 安装

```bash
# 使用npm
npm install @agions/taroviz-themes

# 使用yarn
yarn add @agions/taroviz-themes

# 使用pnpm
pnpm add @agions/taroviz-themes
```

## 内置主题

@agions/taroviz-themes 提供了多种开箱即用的内置主题：

- `default` - 默认主题，现代简约风格
- `dark` - 暗色主题，适合深色背景应用
- `vintage` - 复古主题，怀旧风格配色
- `westeros` - 清新主题，浅色调搭配
- `wonderland` - 梦幻主题，明亮色彩组合
- `walden` - 自然主题，绿色系色调
- `tech` - 科技主题，蓝色调为主

## 基本使用

### 应用内置主题

```jsx
import React from 'react';
import { LineChart } from '@agions/taroviz-charts';
import { ThemeProvider } from '@agions/taroviz-themes';

export const ThemedApp = () => {
  return (
    <ThemeProvider theme="dark">
      <LineChart 
        data={data}
        width={375}
        height={300}
        xField="name"
        yField="value"
      />
    </ThemeProvider>
  );
};
```

### 直接在图表组件中使用

```jsx
import React from 'react';
import { LineChart } from '@agions/taroviz-charts';

export const ChartWithTheme = () => {
  return (
    <LineChart 
      data={data}
      width={375}
      height={300}
      xField="name"
      yField="value"
      theme="vintage" // 直接应用内置主题
    />
  );
};
```

### 使用主题Hook

```jsx
import React from 'react';
import { LineChart } from '@agions/taroviz-charts';
import { useTheme } from '@agions/taroviz-themes';

export const ChartWithHookTheme = () => {
  // 获取内置主题配置对象
  const darkTheme = useTheme('dark');
  
  return (
    <LineChart 
      data={data}
      width={375}
      height={300}
      xField="name"
      yField="value"
      theme={darkTheme} // 传入主题对象
    />
  );
};
```

## 自定义主题

### 创建自定义主题

```jsx
import React from 'react';
import { LineChart } from '@agions/taroviz-charts';
import { registerTheme } from '@agions/taroviz-themes';

// 注册自定义主题
registerTheme('myCustomTheme', {
  color: ['#8A2BE2', '#4169E1', '#1E90FF', '#00BFFF', '#87CEFA'],
  backgroundColor: '#f5f5f5',
  textStyle: {
    color: '#333'
  },
  title: {
    textStyle: {
      color: '#673AB7'
    },
    subtextStyle: {
      color: '#9575CD'
    }
  },
  line: {
    itemStyle: {
      borderWidth: 2
    },
    lineStyle: {
      width: 3
    },
    symbolSize: 8,
    symbol: 'circle',
    smooth: true
  },
  // 其他配置...
});

export const CustomThemedChart = () => {
  return (
    <LineChart 
      data={data}
      width={375}
      height={300}
      xField="name"
      yField="value"
      theme="myCustomTheme" // 使用自定义主题
    />
  );
};
```

### 使用主题工厂创建主题

```jsx
import React from 'react';
import { LineChart } from '@agions/taroviz-charts';
import { createTheme, ThemeProvider } from '@agions/taroviz-themes';

// 使用主题工厂创建自定义主题
const corporateTheme = createTheme({
  name: 'corporate',
  base: 'default', // 基于默认主题
  palette: {
    primary: '#0078D7',
    secondary: '#50E3C2',
    accent: '#FFB900',
    error: '#E81123',
    warning: '#FF8C00',
    info: '#0078D7',
    success: '#107C10'
  },
  font: {
    family: 'Arial, sans-serif',
    size: 12,
    weightLight: 300,
    weightNormal: 400,
    weightBold: 700
  },
  // 其他配置...
});

export const FactoryThemedApp = () => {
  return (
    <ThemeProvider theme={corporateTheme}>
      <LineChart 
        data={data}
        width={375}
        height={300}
        xField="name"
        yField="value"
      />
    </ThemeProvider>
  );
};
```

## 响应式主题（明暗模式切换）

```jsx
import React, { useState } from 'react';
import { LineChart } from '@agions/taroviz-charts';
import { ThemeProvider, useTheme } from '@agions/taroviz-themes';

export const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // 根据当前模式选择主题
  const currentTheme = isDarkMode ? 'dark' : 'default';
  
  return (
    <div>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        切换{isDarkMode ? '浅色' : '深色'}模式
      </button>
    
      <ThemeProvider theme={currentTheme}>
        <LineChart 
          data={data}
          width={375}
          height={300}
          xField="name"
          yField="value"
        />
      </ThemeProvider>
    </div>
  );
};
```

## 全局主题与局部主题

```jsx
import React from 'react';
import { LineChart, BarChart } from '@agions/taroviz-charts';
import { ThemeProvider } from '@agions/taroviz-themes';

export const MixedThemeApp = () => {
  return (
    // 全局应用暗色主题
    <ThemeProvider theme="dark">
      <div className="chart-container">
        {/* 使用全局主题 */}
        <LineChart 
          data={lineData}
          width={375}
          height={300}
          xField="name"
          yField="value"
        />
      
        {/* 局部使用不同主题，覆盖全局主题 */}
        <ThemeProvider theme="vintage">
          <BarChart 
            data={barData}
            width={375}
            height={300}
            xField="category"
            yField="value"
          />
        </ThemeProvider>
      </div>
    </ThemeProvider>
  );
};
```

## 主题继承与扩展

```jsx
import React from 'react';
import { LineChart } from '@agions/taroviz-charts';
import { extendTheme, ThemeProvider } from '@agions/taroviz-themes';

// 基于已有主题扩展创建新主题
const extendedDarkTheme = extendTheme('dark', {
  // 只覆盖部分属性
  color: ['#FF5722', '#FF9800', '#FFC107', '#FFEB3B', '#CDDC39'],
  title: {
    textStyle: {
      fontWeight: 'bold',
      fontSize: 18
    }
  }
});

export const ExtendedThemeChart = () => {
  return (
    <ThemeProvider theme={extendedDarkTheme}>
      <LineChart 
        data={data}
        width={375}
        height={300}
        xField="name"
        yField="value"
      />
    </ThemeProvider>
  );
};
```

## 主题属性引用

主题系统支持在应用中访问主题的各个属性：

```jsx
import React from 'react';
import { useThemeTokens } from '@agions/taroviz-themes';

export const ThemedComponent = () => {
  // 获取当前主题的令牌值
  const { colors, typography, spacing } = useThemeTokens();
  
  return (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        padding: spacing.medium,
        fontFamily: typography.fontFamily
      }}
    >
      <h2 style={{ color: colors.primary }}>主题化组件</h2>
      <p>此组件使用了当前主题的样式属性</p>
    </div>
  );
};
```

## 与CSS变量集成

```jsx
import React from 'react';
import { LineChart } from '@agions/taroviz-charts';
import { ThemeProvider, useCssVariables } from '@agions/taroviz-themes';

// 将主题转换为CSS变量并应用到文档根元素
export const CssVariablesApp = () => {
  // 自动将当前主题注入为CSS变量
  useCssVariables();
  
  return (
    <ThemeProvider theme="tech">
      <div className="custom-styled-container">
        <LineChart 
          data={data}
          width={375}
          height={300}
          xField="name"
          yField="value"
        />
      </div>
    </ThemeProvider>
  );
};

// CSS样式中使用主题变量
/*
.custom-styled-container {
  background-color: var(--taroviz-background-color);
  border: 1px solid var(--taroviz-border-color);
  border-radius: var(--taroviz-border-radius);
  padding: var(--taroviz-spacing-medium);
}
*/
```

## 主题工具函数

```jsx
import {
  darken,
  lighten,
  alpha,
  getContrastText,
  createGradient
} from '@agions/taroviz-themes';

// 调暗颜色
const darkerBlue = darken('#1890ff', 0.2); // => #1472cc

// 调亮颜色
const lighterBlue = lighten('#1890ff', 0.2); // => #46a6ff

// 设置透明度
const transparentBlue = alpha('#1890ff', 0.5); // => rgba(24, 144, 255, 0.5)

// 根据背景色获取对比文本颜色
const textColor = getContrastText('#1890ff'); // => #ffffff

// 创建渐变色
const gradient = createGradient(['#1890ff', '#722ed1']); // => 线性渐变对象
```

## 与其他包的关系

- 依赖 `@agions/taroviz-core` 获取核心类型定义
- 被 `@agions/taroviz-charts` 用于图表主题设置
- 被主包 `@agions/taroviz` 整合并暴露统一接口

## 仓库关联

本包是 [TaroViz](https://github.com/agions/taroviz) 项目的一部分，存在于 `packages/themes` 目录中。

```bash
# 克隆整个项目
git clone https://github.com/agions/taroviz.git

# 进入themes包目录
cd taroviz/packages/themes

# 安装依赖
pnpm install

# 构建包
pnpm build
```

## 贡献指南

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/new-theme`)
3. 提交更改，遵循提交规范 (`git commit -m 'feat: add new corporate theme'`)
4. 推送到分支 (`git push origin feature/new-theme`)
5. 提交 Pull Request

### 开发主题的最佳实践

- 确保色彩对比度符合可访问性标准
- 测试主题在不同图表类型上的表现
- 为主题提供完整的类型定义
- 遵循语义化颜色命名规范
- 考虑主题在不同尺寸和分辨率下的表现

## 许可证

[MIT License](https://github.com/agions/taroviz/blob/main/LICENSE) © [Agions](https://github.com/Agions)
