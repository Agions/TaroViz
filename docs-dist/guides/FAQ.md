# TaroViz 常见问题解答 (FAQ)

本文档收集了使用 TaroViz 过程中最常见的问题及其解答。如果您在使用过程中遇到问题，请先查阅本文档，若问题未能解决，可以在 GitHub Issues 中提问。

## 基础问题

### Q: TaroViz 是什么？

A: TaroViz 是一个基于 Taro 框架的跨平台可视化图表库，专为小程序和 H5 环境设计，支持各种常见图表类型，并提供了丰富的定制选项和交互能力。

### Q: TaroViz 支持哪些平台？

A: TaroViz 支持所有 Taro 支持的平台，包括微信小程序、支付宝小程序、百度小程序、头条小程序、QQ小程序、京东小程序以及 H5 环境。

### Q: TaroViz 与其他图表库如 ECharts 有什么区别？

A: TaroViz 专为 Taro 生态设计，针对小程序环境进行了深度优化，体积更小，渲染性能更好。同时，TaroViz 提供了与 React 组件无缝集成的能力，支持 React Hooks，更符合 React 开发习惯。

## 安装与配置

### Q: 如何安装 TaroViz？

A: 您可以使用包管理器安装 TaroViz：

```bash
# 使用 npm
npm install @taroviz/core @taroviz/components

# 使用 yarn
yarn add @taroviz/core @taroviz/components

# 使用 pnpm
pnpm add @taroviz/core @taroviz/components
```

### Q: 如何在 Taro 项目中配置 TaroViz？

A: 在 Taro 项目中，需要在项目配置文件 `config/index.js` 中添加以下配置：

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

## 使用问题

### Q: 图表无法正常显示，怎么排查？

A: 请检查以下几点：

1. Canvas 容器的宽高是否设置正确
2. 数据格式是否符合要求
3. 是否正确引入了所需的组件
4. 在小程序中，检查是否有正确配置 Canvas 的 canvas-id
5. 检查控制台是否有报错信息

### Q: 如何自定义图表主题？

A: TaroViz 提供了主题系统，您可以通过以下方式自定义主题：

```jsx
import { ThemeProvider } from '@taroviz/core';
import { LineChart } from '@taroviz/components';

const customTheme = {
  colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#DDDF6B', '#E7A97E'],
  backgroundColor: '#FFFFFF',
  textStyle: {
    color: '#333333',
    fontSize: 12
  },
  // 其他主题配置...
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <LineChart {...props} />
    </ThemeProvider>
  );
}
```

### Q: 图表在不同尺寸设备上显示异常，如何处理？

A: TaroViz 支持响应式设计，您可以：

1. 使用百分比或视口单位（vw/vh）设置容器大小
2. 使用 `autoFit` 属性让图表自适应容器大小
3. 结合 Taro 的设备信息 API 动态计算合适的尺寸

```jsx
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { LineChart } from '@taroviz/components';

function ResponsiveChart() {
  const [size, setSize] = useState({ width: 300, height: 200 });
  
  useEffect(() => {
    const info = Taro.getSystemInfoSync();
    setSize({
      width: info.windowWidth * 0.9,
      height: info.windowHeight * 0.3
    });
  }, []);
  
  return <LineChart width={size.width} height={size.height} {...otherProps} />;
}
```

## 性能优化

### Q: 大数据量图表渲染缓慢，如何优化？

A: 可以采取以下措施优化大数据量图表的性能：

1. 使用数据采样或聚合技术减少数据点数量
2. 启用 `lazy` 属性延迟渲染
3. 避免频繁更新导致重复渲染
4. 设置合理的动画时长或关闭动画
5. 对于非常大的数据集，考虑分页或虚拟化渲染

### Q: 如何减小打包体积？

A: TaroViz 采用模块化设计，您可以：

1. 只引入需要的图表组件，而不是整个库
2. 使用 Tree-Shaking 功能（确保您的构建工具支持）
3. 如需进一步优化，可以使用 TaroViz 的按需加载功能

```jsx
// 按需引入
import { LineChart } from '@taroviz/components/LineChart';
import { BarChart } from '@taroviz/components/BarChart';
```

## 功能扩展

### Q: 如何创建自定义图表组件？

A: TaroViz 提供了底层绘图 API，您可以基于这些 API 创建自定义图表：

```jsx
import { useCanvas, useTheme } from '@taroviz/hooks';
import { Chart } from '@taroviz/core';

function CustomChart(props) {
  const { data, width, height, ...rest } = props;
  const theme = useTheme();
  
  const renderContent = (ctx, chart) => {
    // 使用 Canvas 上下文绘制自定义内容
    ctx.fillStyle = theme.colors[0];
    // ...绘制逻辑
  };
  
  return (
    <Chart
      width={width}
      height={height}
      data={data}
      render={renderContent}
      {...rest}
    />
  );
}
```

### Q: 如何在图表中添加自定义交互？

A: 您可以使用 TaroViz 的事件系统添加自定义交互：

```jsx
import { LineChart } from '@taroviz/components';

function InteractiveChart() {
  const handleTap = (event, chart) => {
    const { x, y } = event;
    const dataPoint = chart.getPointByPosition(x, y);
    if (dataPoint) {
      // 处理点击的数据点
      console.log('Clicked point:', dataPoint);
    }
  };
  
  return <LineChart {...props} onTap={handleTap} />;
}
```

## 调试与故障排除

### Q: 如何调试 TaroViz 渲染问题？

A: 您可以启用调试模式，显示图表的布局和边界：

```jsx
<LineChart {...props} debug={true} />
```

### Q: 在小程序中使用 TaroViz 时报错"canvas context not found"，如何解决？

A: 这个错误通常是由于 Canvas 元素未正确创建或访问导致的。请确保：

1. 为 Canvas 组件设置了正确的 ID
2. Canvas 组件已经渲染完成（可以在 `onReady` 生命周期中初始化图表）
3. 在某些情况下，需要延迟一小段时间再进行 Canvas 操作

```jsx
import { useEffect, useState } from 'react';
import { Canvas } from '@tarojs/components';
import { useChart } from '@taroviz/hooks';

function ChartComponent() {
  const [ready, setReady] = useState(false);
  const { chartRef, init } = useChart();
  
  useEffect(() => {
    // 延迟初始化以确保 Canvas 已准备就绪
    const timer = setTimeout(() => {
      setReady(true);
    }, 100);
  
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (ready) {
      init('chart-id'); // 初始化图表
    }
  }, [ready, init]);
  
  return <Canvas id="chart-id" style={{ width: '100%', height: '300px' }} />;
}
```

### Q: 图表在某些Android设备上显示异常，如何解决？

A: 某些Android设备的Canvas实现存在差异，可以尝试：

1. 使用 `devicePixelRatio` 属性适配设备像素比
2. 避免使用复杂的渐变和阴影效果
3. 更新到最新版本的 TaroViz，我们会持续优化兼容性

## 版本与迁移

### Q: 如何从早期版本升级到最新版本？

A: 请参考[CHANGELOG](./CHANGELOG.md)文档了解各版本的变更内容。通常的升级步骤：

1. 更新依赖包版本
2. 根据变更日志调整已弃用的 API
3. 测试应用确保功能正常

### Q: TaroViz 与最新版本的 Taro 兼容吗？

A: TaroViz 会持续保持与 Taro 最新版本的兼容。我们建议同时更新 Taro 和 TaroViz 到最新版本以获得最佳体验。如遇到兼容性问题，请在 GitHub Issues 中反馈。

## 其他问题

### Q: 我的问题在这里没有找到答案，怎么办？

A: 您可以：

1. 查阅[完整文档](https://github.com/agions/taroviz)
2. 在 GitHub 上搜索或提交 Issue
3. 查看示例代码获取使用灵感
4. 加入社区交流群获取帮助

### Q: 如何贡献代码或文档？

A: 我们非常欢迎社区贡献！请查阅[贡献指南](./CONTRIBUTING.md)了解详细流程。
