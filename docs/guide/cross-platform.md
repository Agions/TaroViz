# 跨平台开发

TaroViz 支持多种平台，包括微信小程序、支付宝小程序、百度小程序、字节跳动小程序和 H5。本指南将介绍如何在不同平台上使用 TaroViz。

## 1. 平台支持情况

| 平台           | 支持情况    | 备注                      |
| -------------- | ----------- | ------------------------- |
| 微信小程序     | ✅ 支持     | 推荐使用 canvas 渲染器    |
| 支付宝小程序   | ✅ 支持     | 推荐使用 canvas 渲染器    |
| 百度小程序     | ✅ 支持     | 支持 canvas 和 svg 渲染器 |
| 字节跳动小程序 | ✅ 支持     | 支持 canvas 和 svg 渲染器 |
| H5             | ✅ 支持     | 支持 canvas 和 svg 渲染器 |
| React Native   | ⚠️ 部分支持 | 仅支持基础图表类型        |

## 2. 平台适配原理

TaroViz 采用了平台适配器架构，通过不同的适配器处理各平台的差异：

```
┌─────────────────┐
│   TaroViz Core  │
└─────────────────┘
          │
          ▼
┌─────────────────┐
│  Adapter Layer  │
└─────────────────┘
          │
          ├───┬───┬───┬───┬───┐
          ▼   ▼   ▼   ▼   ▼   ▼
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│ Weapp│ │ Alipay│ │ Swan │ │  TT  │ │  H5  │ │ RN  │
└─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
```

## 3. 基础使用

### 3.1 安装依赖

在 Taro 项目中安装 TaroViz：

```bash
npm install @agions/taroviz
```

### 3.2 配置项目

#### 微信小程序

在 `app.config.ts` 中添加配置：

```typescript
export default defineAppConfig({
  // 其他配置
  usingComponents: {
    // 其他组件
  },
});
```

#### 支付宝小程序

在 `app.json` 中添加配置：

```json
{
  "usingComponents": {
    // 其他组件
  }
}
```

#### 百度小程序

在 `app.json` 中添加配置：

```json
{
  "usingComponents": {
    // 其他组件
  }
}
```

#### 字节跳动小程序

在 `app.json` 中添加配置：

```json
{
  "usingComponents": {
    // 其他组件
  }
}
```

## 4. 平台特定配置

### 4.1 微信小程序

#### 渲染器选择

微信小程序推荐使用 canvas 渲染器：

```typescript
<LineChart
  chartId="weapp-chart"
  option={option}
  width="100%"
  height={400}
  renderer="canvas"
/>
```

#### 性能优化

1. 减少图表数量，每个页面尽量只使用一个图表
2. 简化图表配置，减少不必要的动画和效果
3. 及时销毁图表实例

### 4.2 支付宝小程序

#### 渲染器选择

支付宝小程序推荐使用 canvas 渲染器：

```typescript
<LineChart
  chartId="alipay-chart"
  option={option}
  width="100%"
  height={400}
  renderer="canvas"
/>
```

#### 注意事项

1. 支付宝小程序的 canvas 组件需要指定 id
2. 部分 API 与微信小程序存在差异

### 4.3 百度小程序

#### 渲染器选择

百度小程序支持 canvas 和 svg 渲染器：

```typescript
<LineChart
  chartId="swan-chart"
  option={option}
  width="100%"
  height={400}
  renderer="svg"
/>
```

#### 注意事项

1. 百度小程序的 canvas 组件需要指定 type 属性
2. 部分 API 与微信小程序存在差异

### 4.4 字节跳动小程序

#### 渲染器选择

字节跳动小程序支持 canvas 和 svg 渲染器：

```typescript
<LineChart
  chartId="tt-chart"
  option={option}
  width="100%"
  height={400}
  renderer="canvas"
/>
```

#### 注意事项

1. 字节跳动小程序的 canvas 组件需要指定 type 属性
2. 部分 API 与微信小程序存在差异

### 4.5 H5

#### 渲染器选择

H5 支持 canvas 和 svg 渲染器，根据需求选择：

```typescript
<LineChart
  chartId="h5-chart"
  option={option}
  width="100%"
  height={400}
  renderer="svg"
/>
```

#### 注意事项

1. H5 平台支持更多的 ECharts 特性
2. 可以利用浏览器的性能特性，如 Web Workers、requestAnimationFrame 等

## 5. 平台特定问题及解决方案

### 5.1 小程序 canvas 尺寸问题

**问题**：在小程序中，canvas 组件的尺寸可能与预期不符。

**解决方案**：

1. 明确指定 canvas 的宽度和高度
2. 使用 `autoResize` 属性自动调整大小
3. 在组件挂载后手动调整大小

```typescript
import React, { useEffect, useRef } from 'react';
import { LineChart, ChartRef } from '@agions/taroviz';

const CanvasSizeExample = () => {
  const chartRef = useRef<ChartRef>(null);
  const option = {
    // 配置项
  };

  useEffect(() => {
    // 组件挂载后手动调整大小
    if (chartRef.current) {
      chartRef.current.resize();
    }
  }, []);

  return (
    <LineChart
      ref={chartRef}
      chartId="canvas-size-chart"
      option={option}
      width="100%"
      height={400}
      autoResize={true}
    />
  );
};
```

### 5.2 小程序性能问题

**问题**：在小程序中，复杂图表可能出现性能问题。

**解决方案**：

1. 简化图表配置，减少不必要的动画和效果
2. 使用 canvas 渲染器
3. 减少数据量，对数据进行采样或过滤
4. 及时销毁图表实例

### 5.3 跨平台样式差异

**问题**：不同平台的样式可能存在差异。

**解决方案**：

1. 使用 Taro 的样式适配功能
2. 针对不同平台编写特定样式
3. 测试各平台的显示效果

## 6. 跨平台开发最佳实践

### 6.1 代码组织

将平台特定的代码分离，使用条件编译：

```typescript
import { LineChart } from '@agions/taroviz';

const CrossPlatformExample = () => {
  const option = {
    // 通用配置项
  };

  // 平台特定配置
  const platformOptions = {
    // #ifdef MP-WEIXIN
    renderer: 'canvas',
    // #endif
    // #ifdef H5
    renderer: 'svg',
    // #endif
  };

  return (
    <LineChart
      chartId="cross-platform-chart"
      option={option}
      width="100%"
      height={400}
      {...platformOptions}
    />
  );
};
```

### 6.2 测试策略

1. 在各平台上进行测试
2. 使用 Taro 的模拟器进行初步测试
3. 在真机上进行最终测试
4. 测试不同屏幕尺寸和分辨率

### 6.3 性能监控

1. 使用 TaroViz 提供的性能分析工具
2. 监控各平台的渲染时间
3. 监控内存使用情况
4. 分析性能瓶颈，进行针对性优化

## 7. 平台扩展

### 7.1 自定义平台适配器

如果需要支持新的平台，可以创建自定义适配器：

```typescript
import { Adapter } from '@agions/taroviz';

class CustomAdapter implements Adapter {
  // 实现 Adapter 接口的方法
  init() {
    // 初始化逻辑
  }

  setOption(option: any) {
    // 设置配置项
  }

  // 其他方法
}

// 注册适配器
import { registerAdapter } from '@agions/taroviz';
registerAdapter('custom', CustomAdapter);
```

### 7.2 使用自定义适配器

```typescript
<LineChart
  chartId="custom-platform-chart"
  option={option}
  width="100%"
  height={400}
  adapter="custom"
/>
```

## 8. 常见问题

### 8.1 小程序中图表不显示

**可能原因**：

1. canvas 组件未指定宽度和高度
2. 配置项有误
3. 渲染器选择不当

**解决方案**：

1. 明确指定 canvas 的宽度和高度
2. 检查配置项是否正确
3. 尝试切换渲染器

### 8.2 图表渲染慢

**可能原因**：

1. 数据量过大
2. 配置项过于复杂
3. 动画效果过多

**解决方案**：

1. 对数据进行采样或过滤
2. 简化配置项
3. 关闭不必要的动画

### 8.3 跨平台样式不一致

**可能原因**：

1. 各平台的样式实现存在差异
2. 未使用 Taro 的样式适配功能

**解决方案**：

1. 使用 Taro 的样式适配功能
2. 针对不同平台编写特定样式
3. 测试各平台的显示效果

## 下一步

继续阅读 [API 文档](../api/)，了解 TaroViz 的核心组件、Hooks、工具函数和类型定义。
