# @agions/taroviz-core

[![npm version](https://img.shields.io/npm/v/@agions/taroviz-core.svg)](https://www.npmjs.com/package/@agions/taroviz-core)
[![npm downloads](https://img.shields.io/npm/dm/@agions/taroviz-core.svg)](https://www.npmjs.com/package/@agions/taroviz-core)
[![GitHub](https://img.shields.io/github/license/Agions/TaroViz)](https://github.com/Agions/TaroViz/blob/main/LICENSE)

## 简介

@agions/taroviz-core 是 TaroViz 可视化库的核心包，为整个 TaroViz 生态系统提供基础设施和通用功能，包括渲染引擎、事件系统、主题管理、数据结构、工具函数和核心API。该包作为其他所有 TaroViz 包的基础依赖，定义了关键接口和抽象，确保整个库的一致性和互操作性。

## 技术依赖

- TypeScript 5.0+
- React 18.0+
- @tarojs/taro 3.6.0+
- ECharts 5.4.0+
- Lodash 4.17.21+

## 安装

```bash
# 使用npm
npm install @agions/taroviz-core

# 使用yarn
yarn add @agions/taroviz-core

# 使用pnpm
pnpm add @agions/taroviz-core
```

## 核心功能

### 渲染引擎

渲染引擎为不同平台提供统一的画布渲染接口：

```tsx
import { createRenderer, RenderType } from '@agions/taroviz-core';

// 创建渲染器实例
const renderer = createRenderer({
  type: RenderType.CANVAS, // 或 RenderType.SVG
  container: 'chart-container', // 容器ID或DOM节点
  width: 600,
  height: 400,
  pixelRatio: 2, // 支持高清屏
  optimizeRendering: true // 启用渲染优化
});

// 绘制图形
renderer.beginPath();
renderer.setFillStyle('#1890ff');
renderer.rect(10, 10, 100, 80);
renderer.fill();
renderer.closePath();

// 渲染图像
renderer.render();

// 清理资源
renderer.dispose();
```

#### 平台抽象层

提供统一的平台抽象接口，自动适配不同平台的渲染能力：

```tsx
import { getPlatformContext } from '@agions/taroviz-core';

// 获取平台特定的上下文
const context = getPlatformContext({
  id: 'chart-canvas',
  type: 'canvas', // 或 'svg'
  // 平台特定配置
  platform: 'h5' // 或 'weapp', 'alipay', 'rn' 等
});

// 使用上下文绘制
context.drawImage(...);
```

### 事件系统

提供统一的事件处理机制，支持多种平台的事件处理：

```tsx
import { EventSystem, EventType } from '@agions/taroviz-core';

// 创建事件系统
const eventSystem = new EventSystem({
  container: 'chart-container',
  captureEvents: true
});

// 注册事件处理
eventSystem.on(EventType.CLICK, (event) => {
  const { x, y, target, originalEvent } = event;
  console.log('点击坐标:', x, y);
  console.log('点击目标:', target);
});

// 移除事件处理
eventSystem.off(EventType.CLICK);

// 触发自定义事件
eventSystem.trigger('customEvent', { data: 'custom data' });

// 销毁事件系统
eventSystem.dispose();
```

### 主题管理

为图表提供一致的主题支持，包括颜色、字体、边距等：

```tsx
import { ThemeManager, presetThemes } from '@agions/taroviz-core';

// 使用预设主题
const theme = presetThemes.default;

// 或创建自定义主题
const customTheme = {
  name: 'myTheme',
  colors: ['#f5222d', '#faad14', '#52c41a', '#1890ff', '#722ed1'],
  backgroundColor: '#ffffff',
  textStyle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 12,
    color: '#333333'
  },
  // 其他主题属性...
};

// 注册自定义主题
ThemeManager.register('myTheme', customTheme);

// 获取注册的主题
const registeredTheme = ThemeManager.getTheme('myTheme');

// 使用主题混合
const mergedTheme = ThemeManager.mergeTheme(presetThemes.dark, {
  colors: ['#ff4d4f', '#ffa940', '#73d13d']
});
```

### 核心数据结构

#### 图形/图元

提供基础图形元素，用于构建复杂的可视化：

```tsx
import { Circle, Rect, Line, Path, Group } from '@agions/taroviz-core';

// 创建图形元素
const circle = new Circle({
  x: 100,
  y: 100,
  radius: 50,
  fill: '#1890ff',
  stroke: '#096dd9',
  strokeWidth: 2,
  opacity: 0.8
});

// 创建组
const group = new Group();
group.add(circle);
group.add(new Rect({
  x: 200,
  y: 80,
  width: 100,
  height: 60,
  fill: '#52c41a'
}));

// 应用变换
group.translate(10, 10);
group.rotate(Math.PI / 4);
group.scale(1.2, 1.2);

// 添加事件
circle.on('click', (e) => {
  console.log('圆形被点击');
});

// 渲染到画布
renderer.render(group);
```

#### 数据框架

提供处理数据的核心结构：

```tsx
import { DataFrame, DataType } from '@agions/taroviz-core';

// 创建数据框
const df = new DataFrame({
  columns: ['category', 'value', 'date'],
  types: [DataType.STRING, DataType.NUMBER, DataType.DATE],
  data: [
    ['A', 10, '2023-01-01'],
    ['B', 20, '2023-01-02'],
    ['C', 30, '2023-01-03']
  ]
});

// 获取列值
const valueColumn = df.getColumn('value'); // [10, 20, 30]

// 过滤数据
const filteredDf = df.filter(row => row.value > 15);

// 添加计算列
const dfWithTotal = df.addColumn('total', row => row.value * 2, DataType.NUMBER);

// 聚合计算
const summary = df.aggregate({
  groupBy: 'category',
  measures: [
    { field: 'value', op: 'sum', as: 'totalValue' },
    { field: 'value', op: 'mean', as: 'avgValue' }
  ]
});
```

### 坐标系统

提供各种坐标系定义和转换工具：

```tsx
import { 
  CartesianCoordinate, 
  PolarCoordinate, 
  Point 
} from '@agions/taroviz-core';

// 创建笛卡尔坐标系
const cartesian = new CartesianCoordinate({
  x: { min: 0, max: 100 },
  y: { min: 0, max: 100 },
  originPosition: 'bottom-left', // 或 'top-left', 'center' 等
  padding: { top: 20, right: 20, bottom: 30, left: 40 }
});

// 坐标转换
const dataPoint = { x: 50, y: 75 };
const pixelPoint = cartesian.convert(dataPoint);
const convertedBack = cartesian.invert(pixelPoint);

// 创建极坐标系
const polar = new PolarCoordinate({
  center: { x: 200, y: 200 },
  radius: 150,
  startAngle: 0,
  endAngle: Math.PI * 2
});

// 极坐标转换
const polarPoint = { radius: 100, angle: Math.PI / 4 };
const cartesianPoint = polar.convert(polarPoint);
```

### 动画系统

提供流畅的图表动画支持：

```tsx
import { Animation, Easing } from '@agions/taroviz-core';

// 创建动画
const animation = new Animation({
  from: { x: 0, y: 0, opacity: 0 },
  to: { x: 100, y: 50, opacity: 1 },
  duration: 500, // 毫秒
  delay: 100,
  easing: Easing.easeInOut,
  onUpdate: (values) => {
    // 更新图形属性
    circle.attr(values);
  },
  onComplete: () => {
    console.log('动画完成');
  }
});

// 开始动画
animation.start();

// 暂停动画
animation.pause();

// 继续动画
animation.resume();

// 停止动画
animation.stop();
```

### 工具函数

提供一系列实用的工具函数：

```tsx
import { 
  utils, 
  math, 
  color, 
  scale,
  formatter 
} from '@agions/taroviz-core';

// 颜色处理
const rgbColor = color.hexToRgb('#1890ff'); // { r: 24, g: 144, b: 255 }
const hexColor = color.rgbToHex(24, 144, 255); // '#1890ff'
const interpolated = color.interpolate('#1890ff', '#f5222d', 0.5);

// 数学工具
const distance = math.distance(10, 10, 20, 20); // 14.14...
const angle = math.angle(0, 0, 10, 10); // 45°
const isPointInRect = math.pointInRect(10, 10, { x: 0, y: 0, width: 20, height: 20 }); // true

// 比例尺
const linearScale = scale.linear()
  .domain([0, 100])
  .range([0, 500]);
  
const value = linearScale(50); // 250

const logScale = scale.log()
  .domain([1, 1000])
  .range([0, 300]);

const bandScale = scale.band()
  .domain(['A', 'B', 'C', 'D'])
  .range([0, 400])
  .padding(0.1);

// 格式化工具
const formattedNumber = formatter.number(1234.5678, { precision: 2 }); // '1,234.57'
const formattedDate = formatter.date(new Date(), 'YYYY-MM-DD'); // '2023-10-01'
const formattedPercent = formatter.percent(0.1234); // '12.34%'
```

## 核心组件

### BaseChart

所有图表的基类，提供共享功能：

```tsx
import { BaseChart, BaseChartProps } from '@agions/taroviz-core';
import React from 'react';

// 继承基础图表类
class MyCustomChart extends BaseChart<MyCustomChartProps> {
  render() {
    // 实现自定义渲染逻辑
    return (
      <div className="my-chart-container">
        <canvas ref={this.canvasRef} />
      </div>
    );
  }
  
  // 实现图表绘制方法
  drawChart() {
    const { data, width, height } = this.props;
    const ctx = this.getContext();
  
    // 绘制图表...
  }
  
  // 更新图表
  updateChart(prevProps) {
    // 处理属性变化...
    this.drawChart();
  }
}

// 使用自定义图表
const App = () => {
  return (
    <MyCustomChart
      data={[10, 20, 30, 40]}
      width={600}
      height={400}
      theme="default"
    />
  );
};
```

### 基础组件

提供构建图表的基础组件：

```tsx
import {
  Axis,
  Legend,
  Tooltip,
  Grid,
  Title
} from '@agions/taroviz-core';
import React from 'react';

// 使用基础组件
const App = () => {
  return (
    <div className="chart-container">
      <Title text="销售数据" subtext="2023年季度报告" />
    
      <Grid
        left={50}
        right={50}
        top={60}
        bottom={60}
      />
    
      <Axis
        type="x"
        position="bottom"
        data={['Q1', 'Q2', 'Q3', 'Q4']}
        title="季度"
      />
    
      <Axis
        type="y"
        position="left"
        min={0}
        max={100}
        title="销售额(万元)"
      />
    
      <Legend
        data={['销售额', '利润']}
        position="top-right"
      />
    
      <Tooltip
        trigger="item"
        formatter="{b}: {c} ({d}%)"
      />
    
      {/* 图表内容... */}
    </div>
  );
};
```

## TaroViz 架构

TaroViz 核心架构图：

```
+------------------------------------------+
|              @agions/taroviz             |
+------------------------------------------+
           /        |        \      \
          /         |         \      \
+----------+ +----------+ +-------+ +--------+
|   core   | |  charts  | | hooks | | themes |
+----------+ +----------+ +-------+ +--------+
      |            |          |         |
      v            v          v         v
+------------------------------------------+
|               Renderers                  |
|   (Canvas/SVG/Native for each platform)  |
+------------------------------------------+
            |               |
+----------------------+ +-----------------+
|     Web/H5/React     | |  Mini Programs  |
+----------------------+ +-----------------+
```

### 架构层次

TaroViz 核心包的架构分为以下几层：

1. **基础层**：提供工具函数、类型定义和基础服务
2. **渲染层**：包括渲染器和平台适配器
3. **图形层**：基础图形元素和组件
4. **API层**：公开的接口和工具

## 与其他包的关系

- 为 `@agions/taroviz-charts` 提供基础图表组件和渲染能力
- 为 `@agions/taroviz-hooks` 提供状态管理和工具函数
- 为 `@agions/taroviz-themes` 提供主题管理基础设施
- 为 `@agions/taroviz-adapters` 提供平台抽象接口
- 为 `@agions/taroviz-data` 提供数据结构和转换接口
- 被主包 `@agions/taroviz` 整合并再导出

## 贡献指南

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/my-feature`)
3. 提交更改，遵循提交规范 (`git commit -m 'feat: add new feature'`)
4. 推送到分支 (`git push origin feature/my-feature`)
5. 提交 Pull Request

### 核心开发准则

- 保持向后兼容性
- 优先考虑性能和跨平台兼容性
- 全面的单元测试覆盖率
- 清晰的 TypeScript 类型定义
- 完整的文档和示例

## 仓库关联

本包是 [TaroViz](https://github.com/agions/taroviz) 项目的一部分，存在于 `packages/core` 目录中。

```bash
# 克隆整个项目
git clone https://github.com/agions/taroviz.git

# 进入core包目录
cd taroviz/packages/core

# 安装依赖
pnpm install

# 构建包
pnpm build
```

## 许可证

[MIT License](https://github.com/agions/taroviz/blob/main/LICENSE) © [Agions](https://github.com/Agions)
