# TaroViz 快速入门指南

这篇指南将帮助您快速上手 TaroViz，在几分钟内创建您的第一个跨平台可视化图表。

## 前置条件

在开始之前，请确保您已经：

- 安装了 Node.js (推荐 v14 或更高版本)
- 安装了包管理工具 (npm, yarn 或 pnpm)
- 熟悉 React 和 Taro 的基本概念

## 安装

### 步骤 1: 创建一个新的 Taro 项目

如果您还没有一个 Taro 项目，可以使用以下命令创建：

```bash
# 安装 Taro CLI
npm install -g @tarojs/cli

# 创建新项目
taro init my-taroviz-app
```

根据提示选择框架 (React) 和项目类型。

### 步骤 2: 安装 TaroViz

在您的 Taro 项目中，安装 TaroViz 依赖：

```bash
# 进入项目目录
cd my-taroviz-app

# 使用 npm
npm install @taroviz/core @taroviz/components

# 或使用 yarn
yarn add @taroviz/core @taroviz/components

# 或使用 pnpm
pnpm add @taroviz/core @taroviz/components
```

### 步骤 3: 配置项目

在 Taro 配置文件 `config/index.js` 中添加必要的配置：

```javascript
// config/index.js
const config = {
  // ...其他配置
  mini: {
    // ...
    postcss: {
      // ...
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      }
    }
  },
  h5: {
    // ...
    esnextModules: ['@taroviz'],
  }
}
```

## 创建您的第一个图表

### 步骤 1: 创建一个简单的折线图

在您的组件文件中（例如 `src/pages/index/index.jsx`）：

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { LineChart } from '@taroviz/components';

export default function Index() {
  // 准备数据
  const data = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        label: '销售额',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#5ab1ef',
        backgroundColor: 'rgba(90, 177, 239, 0.2)',
      }
    ]
  };

  // 图表配置
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '月度销售趋势'
      },
      tooltip: {
        enable: true
      }
    }
  };

  return (
    <View className='index'>
      <View style={{ padding: '20px', width: '100%', height: '300px' }}>
        <LineChart 
          data={data}
          options={options}
          width='100%'
          height='100%'
        />
      </View>
    </View>
  );
}
```

### 步骤 2: 运行项目

```bash
# 运行到 H5
npm run dev:h5

# 或运行到微信小程序
npm run dev:weapp
```

就这么简单！您已经创建了第一个使用 TaroViz 的可视化图表。

## 添加交互功能

让我们为图表添加一些交互性，例如点击响应：

```jsx
import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { LineChart } from '@taroviz/components';

export default function InteractiveChart() {
  const [selectedPoint, setSelectedPoint] = useState(null);
  
  // 准备数据
  const data = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        label: '销售额',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#5ab1ef',
        backgroundColor: 'rgba(90, 177, 239, 0.2)',
      }
    ]
  };
  
  const handleChartClick = (event, chart) => {
    const points = chart.getElementsAtEventForMode(
      event.nativeEvent,
      'nearest',
      { intersect: true },
      false
    );
  
    if (points.length) {
      const firstPoint = points[0];
      const label = data.labels[firstPoint.index];
      const value = data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
      setSelectedPoint({ label, value });
    } else {
      setSelectedPoint(null);
    }
  };
  
  return (
    <View className='index'>
      <View style={{ padding: '20px', width: '100%', height: '300px' }}>
        <LineChart 
          data={data}
          width='100%'
          height='100%'
          onTap={handleChartClick}
        />
      </View>
    
      {selectedPoint && (
        <View style={{ marginTop: '20px', textAlign: 'center' }}>
          <Text>您选择了: {selectedPoint.label}, 值: {selectedPoint.value}</Text>
        </View>
      )}
    </View>
  );
}
```

## 自定义主题

TaroViz 允许您轻松自定义图表的外观：

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { ThemeProvider } from '@taroviz/core';
import { LineChart } from '@taroviz/components';

export default function ThemedChart() {
  // 自定义主题
  const customTheme = {
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#DDDF6B', '#E7A97E'],
    backgroundColor: '#FFFFFF',
    textStyle: {
      color: '#333333',
      fontSize: 12
    },
    lineStyle: {
      width: 2,
      dash: [0, 0]
    }
  };
  
  // 图表数据
  const data = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        label: '销售额',
        data: [12, 19, 3, 5, 2, 3]
      },
      {
        label: '成本',
        data: [8, 12, 2, 4, 1, 2]
      }
    ]
  };
  
  return (
    <View className='index'>
      <ThemeProvider theme={customTheme}>
        <View style={{ padding: '20px', width: '100%', height: '300px' }}>
          <LineChart 
            data={data}
            width='100%'
            height='100%'
          />
        </View>
      </ThemeProvider>
    </View>
  );
}
```

## 响应式图表

创建能够适应不同屏幕尺寸的图表：

```jsx
import React, { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { LineChart } from '@taroviz/components';

export default function ResponsiveChart() {
  const [size, setSize] = useState({ width: 300, height: 200 });
  
  useEffect(() => {
    // 获取设备信息
    const getSystemInfo = async () => {
      const info = await Taro.getSystemInfo();
      setSize({
        width: info.windowWidth * 0.9, // 使用窗口宽度的90%
        height: info.windowHeight * 0.3 // 使用窗口高度的30%
      });
    };
  
    getSystemInfo();
  }, []);
  
  // 图表数据
  const data = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        label: '销售额',
        data: [12, 19, 3, 5, 2, 3]
      }
    ]
  };
  
  return (
    <View className='index'>
      <View style={{ padding: '20px' }}>
        <LineChart 
          data={data}
          width={size.width}
          height={size.height}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </View>
    </View>
  );
}
```

## 下一步

现在您已经了解了 TaroViz 的基础用法，可以：

1. 查看[完整文档](https://github.com/agions/taroviz)了解更多高级功能
2. 探索[示例库](./EXAMPLES.md)获取更多实用案例
3. 阅读[API参考](./API.md)获取详细的参数说明
4. 查看[常见问题](./FAQ.md)解决可能遇到的问题

## 常见问题排查

如果您在使用过程中遇到问题，请确保：

1. 所有依赖已正确安装
2. Taro 配置正确
3. Canvas 组件有明确的尺寸
4. 数据格式符合要求

有关更多的疑难解答，请参阅[常见问题解答](./FAQ.md)。

## 获取帮助

如果您需要更多帮助：

1. 在 GitHub 上提交 [Issue](https://github.com/agions/taroviz/issues)
2. 查阅[完整文档](https://github.com/agions/taroviz)
3. 加入社区讨论群获取支持
