# 版本迁移指南

本文档提供了 TaroViz 各版本之间的迁移指南，帮助您从旧版本顺利升级到新版本。

## 从 1.1.x 迁移到 1.2.x

### 新增功能

1. **平台扩展**

   - 支持百度小程序 (swan)
   - 支持字节跳动小程序 (tt)
   - 支持HarmonyOS (harmony)

2. **开发工具**

   - 性能分析工具
   - 图表配置生成器
   - 代码示例生成器

3. **文档系统**
   - API文档自动生成
   - 在线示例
   - 平台适配指南

### 重大变更

1. **适配器 API 变更**

   - 适配器工厂函数从 `getEnv()` 改为 `detectPlatform()`
   - 新增了 `dispatchAction()` 和 `getDataURL()` 方法

2. **配置生成器 API**

   - 新增了 `generate()` 方法，支持快速生成ECharts配置
   - 支持多种内置模板

3. **性能分析 API**
   - 新增了 `PerformanceAnalyzer` 类，支持帧率监控和内存使用分析
   - 支持生成性能报告

### 迁移步骤

1. **更新依赖**

   ```bash
   npm update @agions/taroviz
   ```

2. **更新适配器使用**

   ```typescript
   // 旧版本
   import { getEnv, getAdapter } from '@agions/taroviz/adapters';

   // 新版本
   import { detectPlatform, getAdapter } from '@agions/taroviz/adapters';
   ```

3. **更新图表配置**

   ```typescript
   // 旧版本
   const option = {
     // ECharts配置
   };

   // 新版本 - 使用配置生成器
   import { ConfigGenerator } from '@agions/taroviz';

   const option = ConfigGenerator.generate('line', {
     title: '销售趋势',
     data: {
       categories: ['1月', '2月', '3月'],
       series: [
         { name: '线上', data: [120, 200, 150] },
         { name: '线下', data: [90, 150, 120] },
       ],
     },
   });
   ```

4. **添加性能监控**

   ```typescript
   import { PerformanceAnalyzer } from '@agions/taroviz';

   // 启用性能监控
   const analyzer = PerformanceAnalyzer.getInstance();
   analyzer.start();

   // 生成性能报告
   const report = analyzer.generateReport();
   console.log(report);
   ```

## 从 1.0.x 迁移到 1.1.x

### 重大变更

1. **包名变更**

   - 主包从 `@agions/taroviz-all` 改为 `@agions/taroviz`
   - 所有子包统一使用 `@agions/taroviz-*` 命名

2. **API 简化**
   - 移除了冗余的 API
   - 简化了图表组件的使用方式

### 迁移步骤

1. **更新包名**

   ```bash
   # 卸载旧包
   npm uninstall @agions/taroviz-all @agions/taroviz-core @agions/taroviz-charts

   # 安装新包
   npm install @agions/taroviz
   ```

2. **更新导入语句**

   ```typescript
   // 旧版本
   import { LineChart } from '@agions/taroviz-charts';
   import { ThemeProvider } from '@agions/taroviz-core';

   // 新版本
   import { LineChart, ThemeProvider } from '@agions/taroviz';
   ```

3. **更新组件使用**

   ```typescript
   // 旧版本
   <LineChart
     chartId="chart"
     option={option}
     width={400}
     height={300}
     onChartReady={(instance) => {
       // 图表就绪回调
     }}
   />

   // 新版本
   <LineChart
     chartId="chart"
     option={option}
     width={400}
     height={300}
     onInit={(instance) => {
       // 图表初始化回调
     }}
   />
   ```

## 从 0.5.x 迁移到 1.0.x

### 重大变更

1. **架构重构**

   - 从多包架构改为单包架构
   - 简化了依赖关系

2. **API 完全重设计**
   - 图表组件 API 重设计
   - 主题系统重设计
   - 数据处理 API 重设计

### 迁移步骤

1. **卸载旧包**

   ```bash
   npm uninstall @agions/taroviz-all @agions/taroviz-core @agions/taroviz-charts @agions/taroviz-themes @agions/taroviz-hooks @agions/taroviz-data @agions/taroviz-adapters
   ```

2. **安装新包**

   ```bash
   npm install @agions/taroviz
   ```

3. **重写图表组件**

   ```typescript
   // 旧版本
   import { LineChart } from '@agions/taroviz-charts';
   import { useChartData } from '@agions/taroviz-hooks';

   const data = useChartData(rawData);

   <LineChart
     data={data}
     config={{
       title: '销售趋势',
       xAxis: { field: 'month' },
       yAxis: { field: 'value' }
     }}
   />

   // 新版本
   import { LineChart } from '@agions/taroviz';

   const option = {
     title: {
       text: '销售趋势'
     },
     xAxis: {
       type: 'category',
       data: ['1月', '2月', '3月']
     },
     yAxis: {
       type: 'value'
     },
     series: [
       {
         type: 'line',
         data: [120, 200, 150]
       }
     ]
   };

   <LineChart
     chartId="chart"
     option={option}
   />
   ```

## 常见问题

### 1. 图表渲染失败

**原因**：适配器初始化失败或配置错误

**解决方案**：

- 检查 `chartId` 是否唯一
- 确保容器元素存在且有正确的尺寸
- 检查 ECharts 配置是否正确
- 查看控制台错误信息

### 2. 性能问题

**原因**：大数据集或复杂配置导致渲染缓慢

**解决方案**：

- 启用虚拟滚动
- 减少数据点数量
- 简化图表配置
- 使用 `PerformanceAnalyzer` 分析性能瓶颈

### 3. 平台兼容性问题

**原因**：不同平台的 Canvas 实现差异

**解决方案**：

- 检查平台适配器是否正确加载
- 查看平台适配指南
- 针对特定平台调整配置

## 寻求帮助

如果您在迁移过程中遇到问题，可以：

- 查看 [API 文档](./docs-api/index.html)
- 查看 [示例项目](./examples)
- 创建 [GitHub Issue](https://github.com/agions/taroviz/issues)
- 联系维护者

## 版本历史

- [1.2.0](./CHANGELOG.md#120) - 2025-11-28
- [1.1.1](./CHANGELOG.md#111) - 2025-04-22
- [1.1.0](./CHANGELOG.md#110) - 2025-04-14
- [1.0.3](./CHANGELOG.md#103) - 2025-04-14
- [1.0.2](./CHANGELOG.md#102) - 2025-04-12
- [1.0.1](./CHANGELOG.md#101) - 2025-04-12
- [1.0.0](./CHANGELOG.md#100) - 2025-04-12
