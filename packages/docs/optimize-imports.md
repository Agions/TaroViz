# TaroViz 按需导入指南

为了减小应用的打包体积，TaroViz 提供了多种方式进行按需导入。

## 基本按需导入

从特定包中只导入需要的组件:

```jsx
// ✅ 推荐: 只导入需要的图表组件
import { BarChart, LineChart } from '@agions/taroviz';

// ❌ 不推荐: 导入整个库
import TaroViz from '@agions/taroviz';
```

## 单个图表组件导入

对于进一步优化，可以直接从组件路径导入:

```jsx
// ✅ 最佳实践: 直接导入单个组件
import BarChart from '@agions/taroviz-charts/BarChart';
import LineChart from '@agions/taroviz-charts/LineChart';
```

## 使用动态导入

对于不常用的组件，使用动态导入:

```jsx
// ✅ 高级用法: 动态导入
import React, { lazy, Suspense } from 'react';

// 懒加载图表组件
const DashboardChart = lazy(() => import('@agions/taroviz-charts/DashboardChart'));

function App() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <DashboardChart option={option} />
    </Suspense>
  );
}
```

## 使用Webpack优化

在webpack配置中添加treeshaking优化:

```js
// webpack.config.js
module.exports = {
  // ...
  optimization: {
    usedExports: true,
    sideEffects: true
  }
};
```

## 使用API按需加载

```jsx
import { loadCharts, loadThemes } from '@agions/taroviz';

// 当需要时加载额外功能
async function loadExtendedFeatures() {
  const Charts = await loadCharts();
  const { TreemapChart } = Charts;
  // 使用TreemapChart...
}
```
