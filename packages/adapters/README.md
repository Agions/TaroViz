# @agions/taroviz-adapters

[![npm version](https://img.shields.io/npm/v/@agions/taroviz-adapters.svg)](https://www.npmjs.com/package/@agions/taroviz-adapters)
[![npm downloads](https://img.shields.io/npm/dm/@agions/taroviz-adapters.svg)](https://www.npmjs.com/package/@agions/taroviz-adapters)
[![GitHub](https://img.shields.io/github/license/Agions/TaroViz)](https://github.com/Agions/TaroViz/blob/main/LICENSE)

## 简介

@agions/taroviz-adapters 是 TaroViz 图表库的多平台适配层，负责抽象不同平台（H5、微信小程序等）的渲染差异，提供统一的图表渲染接口。本包解决了在跨平台环境中 ECharts 图表渲染的兼容性问题，确保开发者可以使用一致的 API 在各平台创建图表。

## 技术依赖

- TypeScript 5.0+
- ECharts 5.4.0+
- Taro 3.4.0+
- @agions/taroviz-core

## 安装

```bash
# 使用npm
npm install @agions/taroviz-adapters

# 使用yarn
yarn add @agions/taroviz-adapters

# 使用pnpm
pnpm add @agions/taroviz-adapters
```

## 核心功能

- **多平台适配** - 提供H5、微信小程序等平台的适配实现
- **统一API接口** - 封装平台差异，提供统一的图表实例管理接口
- **Canvas上下文处理** - 处理不同平台的Canvas上下文差异
- **事件系统转换** - 转换不同平台的事件系统为统一格式
- **自动平台检测** - 根据运行环境自动选择适配器实现

## 平台支持

目前支持的平台包括：

- **H5** - 浏览器环境
- **微信小程序** - 微信小程序环境
- **其他小程序** - 支持支付宝、百度、抖音等平台小程序（部分平台可能需要额外配置）

## 适配器类型

### H5适配器

专为浏览器环境设计的适配器，直接使用标准DOM操作：

```typescript
import { H5Adapter } from '@agions/taroviz-adapters';

// 创建H5适配器实例
const adapter = new H5Adapter({
  canvasId: 'chart-canvas',
  width: 375,
  height: 300
});

// 初始化图表
const chart = adapter.init();
```

### 微信小程序适配器

专为微信小程序环境设计的适配器，处理小程序特有的Canvas上下文：

```typescript
import { WeappAdapter } from '@agions/taroviz-adapters';

// 创建微信小程序适配器实例
const adapter = new WeappAdapter({
  canvasId: 'chart-canvas',
  width: 375,
  height: 300,
  canvas: canvasRef.current, // 小程序Canvas实例
  ctx: canvasContext // 小程序Canvas上下文
});

// 初始化图表
const chart = adapter.init();
```

### 自动适配器

根据运行环境自动选择合适的适配器实现：

```typescript
import { createAdapter } from '@agions/taroviz-adapters';

// 自动创建适配器
const adapter = createAdapter({
  canvasId: 'chart-canvas',
  width: 375,
  height: 300,
  // 以下参数在小程序环境中必须提供
  canvas: process.env.TARO_ENV !== 'h5' ? canvasRef.current : undefined,
  ctx: process.env.TARO_ENV !== 'h5' ? canvasContext : undefined
});

// 初始化图表
const chart = adapter.init();
```

## 高级功能

### 渲染优化配置

适配器提供渲染优化选项，针对不同平台进行优化：

```typescript
import { createAdapter } from '@agions/taroviz-adapters';

const adapter = createAdapter({
  canvasId: 'chart-canvas',
  width: 375,
  height: 300,
  // 渲染优化配置
  optimization: {
    // 渐进式渲染（适用于大数据量）
    progressive: true,
    // 动画级别调整
    animation: false,
    // 小程序环境特殊优化
    weappOptimization: {
      skiaOptimization: true, // 启用Skia渲染引擎优化
      lazyUpdate: true // 延迟更新，提高性能
    }
  }
});
```

### 手动平台指定

在特殊场景下，可手动指定平台类型：

```typescript
import { createAdapter, PlatformType } from '@agions/taroviz-adapters';

// 手动指定平台
const adapter = createAdapter({
  canvasId: 'chart-canvas',
  width: 375,
  height: 300,
  // 强制使用H5适配器
  platformType: PlatformType.H5
});
```

### 事件代理

适配器提供统一的事件处理接口，自动转换不同平台的事件：

```typescript
import { createAdapter } from '@agions/taroviz-adapters';

const adapter = createAdapter({
  canvasId: 'chart-canvas',
  width: 375,
  height: 300
});

const chart = adapter.init();

// 添加事件监听
chart.on('click', (params) => {
  console.log('Chart clicked:', params);
});

// 移除事件监听
chart.off('click');
```

## 开发自定义适配器

您可以通过实现适配器接口，开发支持其他平台的适配器：

```typescript
import { Adapter, AdapterOptions, BaseAdapter } from '@agions/taroviz-adapters';

// 继承BaseAdapter
class CustomPlatformAdapter extends BaseAdapter {
  constructor(options: AdapterOptions) {
    super(options);
    // 平台特定初始化
  }

  // 实现平台特定Chart初始化
  protected initChart(): EChartsInstance {
    // 自定义平台初始化逻辑
    return null;
  }

  // 其他平台特定方法实现...
}

// 注册自定义适配器
import { registerAdapter, PlatformType } from '@agions/taroviz-adapters';

// 定义新的平台类型
const CUSTOM_PLATFORM = 'custom' as PlatformType;

// 注册适配器
registerAdapter(CUSTOM_PLATFORM, CustomPlatformAdapter);

// 使用自定义适配器
const adapter = createAdapter({
  platformType: CUSTOM_PLATFORM,
  // 其他选项...
});
```

## 与其他包的关系

- 依赖 `@agions/taroviz-core` 作为基础类型和接口
- 被 `@agions/taroviz-charts` 使用作为图表渲染层
- 被 `@agions/taroviz-hooks` 使用作为图表实例创建基础
- 被主包 `@agions/taroviz` 整合并暴露统一接口

## 仓库关联

本包是 [TaroViz](https://github.com/agions/taroviz) 项目的一部分，存在于 `packages/adapters` 目录中。

```bash
# 克隆整个项目
git clone https://github.com/agions/taroviz.git

# 进入adapters包目录
cd taroviz/packages/adapters

# 安装依赖
pnpm install

# 构建包
pnpm build
```

## 贡献指南

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/new-adapter`)
3. 提交更改，遵循提交规范 (`git commit -m 'feat: add new platform adapter'`)
4. 推送到分支 (`git push origin feature/new-adapter`)
5. 提交 Pull Request

### 开发适配器的最佳实践

- 确保遵循适配器接口规范
- 尽可能处理平台特殊情况和边缘案例
- 提供完善的类型定义
- 编写适配器单元测试，确保各平台行为一致
- 优先考虑性能和内存占用

## 许可证

[MIT License](https://github.com/agions/taroviz/blob/main/LICENSE) © [Agions](https://github.com/Agions) 