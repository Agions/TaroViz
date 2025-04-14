# @agions/taroviz-charts

[![npm version](https://img.shields.io/npm/v/@agions/taroviz-charts.svg)](https://www.npmjs.com/package/@agions/taroviz-charts)
[![npm downloads](https://img.shields.io/npm/dm/@agions/taroviz-charts.svg)](https://www.npmjs.com/package/@agions/taroviz-charts)
[![GitHub](https://img.shields.io/github/license/Agions/TaroViz)](https://github.com/Agions/TaroViz/blob/main/LICENSE)

## 简介

@agions/taroviz-charts 是 TaroViz 可视化生态系统的图表组件库，提供了一系列高效、美观且易于使用的数据可视化组件。该包基于 @agions/taroviz-core 构建，充分利用 TaroViz 的跨平台渲染能力，支持在 H5、微信小程序和其他 Taro 支持的平台上运行。图表组件采用声明式设计，专注于数据表达，并提供完善的配置项和交互能力。

## 技术依赖

- TypeScript 5.0+
- React 18.0+
- @tarojs/taro 3.6.0+
- @agions/taroviz-core
- @agions/taroviz-hooks
- @agions/taroviz-data
- @agions/taroviz-themes

## 安装

```bash
# 使用npm
npm install @agions/taroviz-charts

# 使用yarn
yarn add @agions/taroviz-charts

# 使用pnpm
pnpm add @agions/taroviz-charts
```

## 图表组件

### 基础图表

#### 折线图 (LineChart)

用于显示数据在连续时间轴上的变化趋势：

```tsx
import React from 'react';
import { LineChart } from '@agions/taroviz-charts';

const Demo = () => {
  const data = [
    { year: '2019', value: 3 },
    { year: '2020', value: 4 },
    { year: '2021', value: 3.5 },
    { year: '2022', value: 5 },
    { year: '2023', value: 4.9 },
  ];

  return (
    <LineChart
      data={data}
      width={350}
      height={250}
      xField="year"
      yField="value"
      smooth={true}
      point={{ size: 5, style: { fill: '#fff', stroke: '#1890ff', lineWidth: 2 } }}
      tooltip={{ showCrosshairs: true }}
      style={{ padding: [20, 30, 30, 40] }}
    />
  );
};
```

#### 面积图 (AreaChart)

适用于展示连续数据的数值变化趋势，并通过面积填充强调数据量变化：

```tsx
import React from 'react';
import { AreaChart } from '@agions/taroviz-charts';

const Demo = () => {
  const data = [
    { year: '2019', value: 3 },
    { year: '2020', value: 4 },
    { year: '2021', value: 3.5 },
    { year: '2022', value: 5 },
    { year: '2023', value: 4.9 },
  ];

  return (
    <AreaChart
      data={data}
      width={350}
      height={250}
      xField="year"
      yField="value"
      smooth={true}
      areaStyle={{ fill: 'l(270) 0:#ffffff 1:#1890ff', fillOpacity: 0.6 }}
      line={{ style: { stroke: '#1890ff', lineWidth: 2 } }}
    />
  );
};
```

#### 柱状图 (ColumnChart)

用于展示离散数据之间的比较关系：

```tsx
import React from 'react';
import { ColumnChart } from '@agions/taroviz-charts';

const Demo = () => {
  const data = [
    { category: '类别A', value: 340 },
    { category: '类别B', value: 260 },
    { category: '类别C', value: 180 },
    { category: '类别D', value: 420 },
    { category: '类别E', value: 300 },
  ];

  return (
    <ColumnChart
      data={data}
      width={350}
      height={250}
      xField="category"
      yField="value"
      columnStyle={{ radius: [4, 4, 0, 0] }}
      label={{
        position: 'top',
        style: { fill: '#666666' }
      }}
      animation={{ appear: { duration: 1000 } }}
    />
  );
};
```

#### 条形图 (BarChart)

特别适合展示分类数据之间的排序关系：

```tsx
import React from 'react';
import { BarChart } from '@agions/taroviz-charts';

const Demo = () => {
  const data = [
    { category: '类别A', value: 340 },
    { category: '类别B', value: 260 },
    { category: '类别C', value: 180 },
    { category: '类别D', value: 420 },
    { category: '类别E', value: 300 },
  ];

  return (
    <BarChart
      data={data}
      width={350}
      height={250}
      xField="value"
      yField="category"
      seriesField="category"
      colorField="category" // 根据分类着色
      sort={{ by: 'value', order: 'desc' }} // 按值排序
      barStyle={{ radius: [0, 4, 4, 0] }}
      label={{ position: 'right' }}
    />
  );
};
```

#### 饼图 (PieChart)

用于显示不同类别的占比情况：

```tsx
import React from 'react';
import { PieChart } from '@agions/taroviz-charts';

const Demo = () => {
  const data = [
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
    { type: '其他', value: 5 },
  ];

  return (
    <PieChart
      data={data}
      width={350}
      height={250}
      angleField="value"
      colorField="type"
      radius={0.8}
      innerRadius={0.5} // 环形图配置
      label={{
        type: 'outer',
        content: '{name}: {percentage}',
        style: { fontSize: 12 }
      }}
      interactions={[{ type: 'element-active' }]}
      pieStyle={{ stroke: '#fff', lineWidth: 2 }}
      legend={{ position: 'bottom' }}
    />
  );
};
```

#### 散点图 (ScatterChart)

用于显示数据点之间的分布关系：

```tsx
import React from 'react';
import { ScatterChart } from '@agions/taroviz-charts';

const Demo = () => {
  const data = [
    { x: 10, y: 8, size: 20, category: 'A' },
    { x: 20, y: 15, size: 10, category: 'B' },
    { x: 30, y: 22, size: 15, category: 'A' },
    { x: 40, y: 28, size: 25, category: 'C' },
    { x: 50, y: 20, size: 18, category: 'B' },
  ];

  return (
    <ScatterChart
      data={data}
      width={350}
      height={250}
      xField="x"
      yField="y"
      sizeField="size"
      colorField="category"
      pointStyle={{ fillOpacity: 0.8, stroke: '#fff' }}
      tooltip={{ showTitle: false }}
      legend={{ position: 'top' }}
    />
  );
};
```

### 多维图表

#### 组合图表 (ComboChart)

支持在同一坐标系中混合展示多种图表类型：

```tsx
import React from 'react';
import { ComboChart } from '@agions/taroviz-charts';

const Demo = () => {
  const data = [
    { year: '2019', sales: 300, profit: 200 },
    { year: '2020', sales: 350, profit: 250 },
    { year: '2021', sales: 300, profit: 220 },
    { year: '2022', sales: 400, profit: 300 },
    { year: '2023', sales: 450, profit: 320 },
  ];

  return (
    <ComboChart
      data={data}
      width={350}
      height={250}
      xField="year"
      yField={['sales', 'profit']}
      geometryOptions={[
        { geometry: 'column', color: '#1890ff', columnStyle: { radius: [4, 4, 0, 0] } },
        { geometry: 'line', smooth: true, lineStyle: { stroke: '#fa8c16', lineWidth: 2 } }
      ]}
      tooltip={{ shared: true }}
      legend={{ position: 'top-right' }}
    />
  );
};
```

#### 双轴图表 (DualAxisChart)

在同一图表中显示两组不同量级的数据：

```tsx
import React from 'react';
import { DualAxisChart } from '@agions/taroviz-charts';

const Demo = () => {
  const data = [
    { year: '2019', sales: 300, growth: 0.1 },
    { year: '2020', sales: 350, growth: 0.17 },
    { year: '2021', sales: 300, growth: -0.14 },
    { year: '2022', sales: 400, growth: 0.33 },
    { year: '2023', sales: 450, growth: 0.12 },
  ];

  return (
    <DualAxisChart
      data={data}
      width={350}
      height={250}
      xField="year"
      yField={['sales', 'growth']}
      geometryOptions={[
        { geometry: 'column', color: '#1890ff' },
        { 
          geometry: 'line', 
          smooth: true, 
          lineStyle: { stroke: '#fa8c16' },
          point: { size: 4, style: { fill: '#fa8c16' } }
        }
      ]}
      yAxis={[
        { title: { text: '销售额' } },
        { title: { text: '增长率' }, tickFormatter: (val) => (val * 100).toFixed(0) + '%' }
      ]}
    />
  );
};
```

### 特殊图表

#### 雷达图 (RadarChart)

用于多维数据的比较分析：

```tsx
import React from 'react';
import { RadarChart } from '@agions/taroviz-charts';

const Demo = () => {
  const data = [
    { item: '指标1', value: 70, type: '系列1' },
    { item: '指标2', value: 60, type: '系列1' },
    { item: '指标3', value: 80, type: '系列1' },
    { item: '指标4', value: 90, type: '系列1' },
    { item: '指标5', value: 100, type: '系列1' },
    { item: '指标6', value: 80, type: '系列1' },
    { item: '指标1', value: 80, type: '系列2' },
    { item: '指标2', value: 70, type: '系列2' },
    { item: '指标3', value: 60, type: '系列2' },
    { item: '指标4', value: 80, type: '系列2' },
    { item: '指标5', value: 70, type: '系列2' },
    { item: '指标6', value: 90, type: '系列2' },
  ];

  return (
    <RadarChart
      data={data}
      width={350}
      height={350}
      angleField="item"
      radiusField="value"
      seriesField="type"
      radarStyle={{ lineDash: [4, 4] }}
      area={{ visible: true, fillOpacity: 0.3 }}
      line={{ visible: true }}
      point={{ visible: true, shape: 'circle' }}
      legend={{ position: 'bottom' }}
    />
  );
};
```

#### 热力图 (HeatmapChart)

适合展示三维数据的分布情况：

```tsx
import React from 'react';
import { HeatmapChart } from '@agions/taroviz-charts';

const Demo = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 7; j++) {
      data.push({
        hour: `${i}:00`,
        day: `星期${j + 1}`,
        value: Math.floor(Math.random() * 100)
      });
    }
  }

  return (
    <HeatmapChart
      data={data}
      width={600}
      height={350}
      xField="hour"
      yField="day"
      colorField="value"
      color={['#BAE7FF', '#1890FF', '#0050B3']}
      label={{ style: { fill: '#fff', fontWeight: 'bold' } }}
      meta={{
        value: {
          min: 0,
          max: 100
        }
      }}
      tooltip={{ showTitle: false }}
    />
  );
};
```

#### 漏斗图 (FunnelChart)

适合展示转化率数据：

```tsx
import React from 'react';
import { FunnelChart } from '@agions/taroviz-charts';

const Demo = () => {
  const data = [
    { stage: '浏览网站', value: 1000 },
    { stage: '加入购物车', value: 800 },
    { stage: '生成订单', value: 600 },
    { stage: '支付订单', value: 500 },
    { stage: '完成交易', value: 400 },
  ];

  return (
    <FunnelChart
      data={data}
      width={350}
      height={350}
      xField="stage"
      yField="value"
      isTransposed={false}
      label={{
        formatter: (datum) => `${datum.stage}: ${datum.value}`,
        style: { fontSize: 12, fill: '#fff' }
      }}
      conversionTag={{
        visible: true,
        formatter: (datum, index) => {
          if (index === 0) return '';
          const prev = data[index - 1].value;
          return `转化率: ${((datum.value / prev) * 100).toFixed(1)}%`;
        }
      }}
      tooltip={{
        formatter: (datum) => {
          return { name: datum.stage, value: datum.value };
        }
      }}
    />
  );
};
```

#### 水波图 (LiquidChart)

用于展示完成率、达成率等指标：

```tsx
import React from 'react';
import { LiquidChart } from '@agions/taroviz-charts';

const Demo = () => {
  return (
    <LiquidChart
      percent={0.65}
      width={250}
      height={250}
      outline={{ border: 2, distance: 4, style: { stroke: '#1890ff' } }}
      wave={{ length: 128 }}
      pattern={{ type: 'line', cfg: { stroke: '#fff' } }}
      statistic={{
        title: {
          formatter: () => '完成率',
          style: { fontSize: 16, fill: '#1890ff' },
        },
        content: {
          style: { fontSize: 24, fill: '#1890ff' },
          formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        },
      }}
    />
  );
};
```

#### 树图 (TreemapChart)

用于展示层级关系数据：

```tsx
import React from 'react';
import { TreemapChart } from '@agions/taroviz-charts';

const Demo = () => {
  const data = {
    name: '总计',
    children: [
      { name: '分类1', value: 560 },
      { name: '分类2', value: 500 },
      { 
        name: '分类3', 
        children: [
          { name: '子分类1', value: 150 },
          { name: '子分类2', value: 100 },
          { name: '子分类3', value: 280 },
        ] 
      },
      { name: '分类4', value: 200 },
    ],
  };

  return (
    <TreemapChart
      data={data}
      width={350}
      height={300}
      colorField="name"
      rectStyle={{ stroke: '#fff', lineWidth: 2 }}
      label={{
        style: {
          fontSize: 12,
          fill: '#fff',
          fontWeight: 'bold',
        }
      }}
      tooltip={{
        formatter: (info) => {
          return { name: info.name, value: info.value };
        }
      }}
      interactions={[{ type: 'element-active' }]}
    />
  );
};
```

## 图表组件特性

### 交互能力

所有图表组件都支持丰富的交互配置：

```tsx
// 添加交互行为
<LineChart
  interactions={[
    { type: 'element-active' },
    { type: 'tooltip' },
    { type: 'legend-highlight' },
    { 
      type: 'element-highlight',
      cfg: { start: [{ trigger: 'element:mouseenter' }], end: [{ trigger: 'element:mouseleave' }] }
    }
  ]}
/>
```

### 动画配置

自定义图表动画效果：

```tsx
<ColumnChart
  animation={{
    appear: {
      animation: 'wave-in', // 入场动画
      duration: 1000,
      delay: 100
    },
    update: {
      animation: 'fade-in',
      duration: 500
    }
  }}
/>
```

### 事件处理

注册图表事件监听器：

```tsx
<PieChart
  onReady={(chart) => {
    console.log('图表实例已准备就绪', chart);
  }}
  onEvent={(chart, event) => {
    if (event.type === 'element:click') {
      const { data } = event;
      console.log('点击了数据', data);
    }
  }}
/>
```

### 主题定制

应用自定义主题：

```tsx
import { ThemeManager } from '@agions/taroviz-core';
import { LineChart } from '@agions/taroviz-charts';

// 定义自定义主题
const customTheme = {
  colors: ['#FF4D4F', '#FAAD14', '#52C41A', '#1890FF', '#722ED1'],
  background: '#f0f2f5',
  axisLine: {
    style: {
      stroke: '#d9d9d9',
      lineWidth: 1
    }
  },
  text: {
    style: {
      fontSize: 12,
      fontFamily: 'Roboto, PingFang SC, sans-serif',
      fill: '#595959'
    }
  },
  point: {
    style: {
      r: 4,
      lineWidth: 2,
      stroke: '#fff'
    }
  }
};

// 注册主题
ThemeManager.register('myTheme', customTheme);

// 使用主题
<LineChart theme="myTheme" />
```

### 响应式支持

实现自适应图表：

```tsx
import React from 'react';
import { useContainerSize } from '@agions/taroviz-hooks';
import { LineChart } from '@agions/taroviz-charts';

const ResponsiveChart = () => {
  const [containerRef, { width, height }] = useContainerSize();
  
  return (
    <div ref={containerRef} style={{ width: '100%', height: '300px' }}>
      {width && height && (
        <LineChart
          width={width}
          height={height}
          data={data}
          xField="year"
          yField="value"
          // 其他属性...
        />
      )}
    </div>
  );
};
```

## 进阶用法

### 图表联动

使用事件实现多图表联动：

```tsx
import React, { useState } from 'react';
import { PieChart, BarChart } from '@agions/taroviz-charts';

const LinkedCharts = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  
  const pieData = [
    { type: '分类A', value: 30 },
    { type: '分类B', value: 25 },
    { type: '分类C', value: 45 },
  ];
  
  const barData = [
    { category: '分类A', value1: 15, value2: 15 },
    { category: '分类B', value1: 10, value2: 15 },
    { category: '分类C', value1: 25, value2: 20 },
  ];
  
  const filteredBarData = activeCategory 
    ? barData.filter(item => item.category === activeCategory) 
    : barData;
  
  return (
    <div>
      <PieChart
        data={pieData}
        width={300}
        height={300}
        angleField="value"
        colorField="type"
        onEvent={(chart, event) => {
          if (event.type === 'element:click') {
            setActiveCategory(event.data.data.type);
          }
        }}
      />
      
      <BarChart
        data={filteredBarData}
        width={400}
        height={300}
        xField="category"
        yField={['value1', 'value2']}
      />
      
      {activeCategory && (
        <button onClick={() => setActiveCategory(null)}>重置筛选</button>
      )}
    </div>
  );
};
```

### 自定义图形

扩展图表的图形元素：

```tsx
import React from 'react';
import { ColumnChart } from '@agions/taroviz-charts';
import { registerShape } from '@agions/taroviz-core';

// 注册自定义柱状图形状
registerShape('column', 'custom-column', {
  draw(cfg, container) {
    const { points } = cfg;
    const path = [
      ['M', points[0].x, points[0].y],
      ['L', points[1].x, points[1].y],
      ['L', points[2].x, points[2].y],
      ['L', points[3].x, points[3].y],
      ['Z'],
    ];
    
    // 绘制波浪顶部
    const group = container.addGroup();
    const height = points[2].y - points[1].y;
    
    // 绘制波浪线
    const wavePoints = [];
    const waveWidth = 10;
    const waveHeight = 5;
    
    for (let i = 0; i <= 10; i++) {
      const x = points[0].x + (i * (points[1].x - points[0].x)) / 10;
      const y = points[0].y - waveHeight * Math.sin((i * Math.PI) / 5);
      wavePoints.push([i === 0 ? 'M' : 'L', x, y]);
    }
    
    // 绘制波浪柱形
    group.addShape('path', {
      attrs: {
        path: [
          ...wavePoints,
          ['L', points[1].x, points[1].y],
          ['L', points[2].x, points[2].y],
          ['L', points[3].x, points[3].y],
          ['Z'],
        ],
        fill: cfg.color,
        ...cfg.style,
      },
    });
    
    return group;
  },
});

// 使用自定义图形
const Demo = () => {
  return (
    <ColumnChart
      data={data}
      width={400}
      height={300}
      xField="category"
      yField="value"
      shapeType="custom-column"
    />
  );
};
```

## 与其他包的关系

- 依赖 `@agions/taroviz-core` 提供的渲染引擎、事件系统和基础设施
- 使用 `@agions/taroviz-hooks` 提供的状态管理和工具函数
- 使用 `@agions/taroviz-data` 进行数据处理和转换
- 采用 `@agions/taroviz-themes` 提供的主题系统
- 为主包 `@agions/taroviz` 提供所有图表组件

## 贡献指南

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/new-chart`)
3. 提交更改，遵循提交规范 (`git commit -m 'feat: add new chart type'`)
4. 推送到分支 (`git push origin feature/new-chart`)
5. 提交 Pull Request

### 图表贡献准则

- 确保新的图表组件遵循现有的API设计规范
- 提供完整的TypeScript类型定义
- 添加详细的文档和示例
- 实现必要的单元测试和视觉测试
- 考虑不同平台的兼容性和性能优化

## 仓库关联

本包是 [TaroViz](https://github.com/agions/taroviz) 项目的一部分，存在于 `packages/charts` 目录中。

```bash
# 克隆整个项目
git clone https://github.com/agions/taroviz.git

# 进入charts包目录
cd taroviz/packages/charts

# 安装依赖
pnpm install

# 构建包
pnpm build
```

## 许可证

[MIT License](https://github.com/agions/taroviz/blob/main/LICENSE) © [Agions](https://github.com/Agions)
