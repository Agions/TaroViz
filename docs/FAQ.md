# TaroViz 常见问题解答（FAQ）

## 目录

- [基础问题](#基础问题)
- [安装和配置](#安装和配置)
- [功能使用](#功能使用)
- [性能问题](#性能问题)
- [平台兼容性](#平台兼容性)
- [错误处理](#错误处理)

## 基础问题

### Q: TaroViz 支持哪些图表类型？

A: TaroViz 目前支持以下图表类型：

- 折线图（Line Chart）
- 柱状图（Bar Chart）
- 饼图（Pie Chart）
- 散点图（Scatter Chart）
- 雷达图（Radar Chart）
- 热力图（Heat Map）
- 更多图表类型正在开发中

### Q: TaroViz 可以在哪些平台上使用？

A: TaroViz 支持以下平台：

- 微信小程序
- 支付宝小程序
- 百度小程序
- 字节跳动小程序
- H5
- React Native

## 安装和配置

### Q: 如何安装 TaroViz？

A: 您可以使用以下命令安装：

```bash
# 使用 npm
npm install @agions/taroviz

# 使用 yarn
yarn add @agions/taroviz

# 使用 pnpm
pnpm add @agions/taroviz
```

### Q: 为什么安装时报错 "peer dependencies" 未满足？

A: 请确保您的项目安装了以下依赖：

- React >= 16.13.0
- @tarojs/taro >= 3.4.0
- @tarojs/components >= 3.4.0

```bash
pnpm add react@^16.13.0 @tarojs/taro@^3.4.0 @tarojs/components@^3.4.0
```

### Q: 如何配置 TypeScript？

A: 在 `tsconfig.json` 中添加以下配置：

```json
{
  "compilerOptions": {
    "types": ["@tarojs/taro", "@agions/taroviz-core"]
  }
}
```

## 功能使用

### Q: 如何自定义图表主题？

A: 使用 `createTheme` 创建自定义主题：

```typescript
import { createTheme, ThemeProvider } from '@agions/taroviz-themes';

const customTheme = createTheme({
  palette: {
    primary: '#1890ff',
    secondary: '#13c2c2'
  }
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourChart />
    </ThemeProvider>
  );
}
```

### Q: 如何处理大数据量图表？

A: 使用数据采样或虚拟滚动：

```typescript
import { useVirtualData } from '@agions/taroviz-hooks';

function BigDataChart() {
  const { data } = useVirtualData(rawData, {
    sampleSize: 1000,
    method: 'lttb'
  });
  
  return <LineChart data={data} />;
}
```

## 性能问题

### Q: 图表渲染很慢怎么办？

A: 可以采取以下措施：

1. 使用数据采样
2. 启用虚拟滚动
3. 实现数据缓存
4. 避免不必要的重渲染

```typescript
import { useChartOptimize } from '@agions/taroviz-hooks';

function OptimizedChart() {
  const { data, loading } = useChartOptimize(rawData, {
    enableCache: true,
    enableVirtual: true
  });
}
```

### Q: 如何优化小程序的包体积？

A: 可以：

1. 使用分包加载
2. 按需引入组件
3. 开启 tree-shaking
4. 使用动态加载

## 平台兼容性

### Q: 在不同平台上展示效果不一致怎么办？

A: 使用平台适配器：

```typescript
import { getPlatformAdapter } from '@agions/taroviz-adapters';

const adapter = getPlatformAdapter();
const Chart = adapter.getChart('line');
```

### Q: 如何处理不同平台的触摸事件？

A: 使用统一的事件处理：

```typescript
import { useChartEvents } from '@agions/taroviz-hooks';

function TouchableChart() {
  const { handleTouch } = useChartEvents({
    onTouch: (e) => {
      // 统一的事件处理逻辑
    }
  });
}
```

## 错误处理

### Q: 如何处理图表加载失败？

A: 使用错误边界和加载状态：

```typescript
import { ChartErrorBoundary } from '@agions/taroviz-core';

function SafeChart() {
  return (
    <ChartErrorBoundary fallback={<ErrorMessage />}>
      <Chart data={data} />
    </ChartErrorBoundary>
  );
}
```

### Q: 数据格式错误怎么处理？

A: 使用数据验证：

```typescript
import { validateChartData } from '@agions/taroviz-data';

function ValidatedChart() {
  const isValid = validateChartData(data);
  if (!isValid) {
    return <ErrorMessage message="数据格式错误" />;
  }
  return <Chart data={data} />;
}
```