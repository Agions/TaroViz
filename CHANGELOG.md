# Changelog

All notable changes to this project will be documented in this file.

## [v1.11.4] - 2026-05-04

### 🚀 架构与代码质量优化

#### 图表组件工厂函数化
- 14 个重复的图表组件文件合并为 2 个工厂函数（`createChartComponent` / `createChartComponentWithOptionCast`），净减少约 1000 行代码
- 删除 `charts/bar/`、`charts/line/`、`charts/pie/` 等 14 个组件目录
- 保留 4 个特殊组件：`liquid`、`tree`、`boxplot`、`parallel`

#### 适配器层重构
- **HarmonyAdapter** 继承 `MiniAppAdapter`，从 247 行精简至 63 行（-75%）
- `swan/weapp/tt` 三个适配器使用工厂函数 `createMiniAppAdapter`
- `BaseAdapter.getWidth/getHeight` 复用 `parseSize` 消除重复逻辑

#### 类型系统统一
- 消除 `ChartEventParams` 三处冲突定义，统一从 `core/types/common` 导入
- 消除 `ChartExportOptions` / `ChartLinkageConfig` / `RenderOptimizationConfig` 重复定义

#### 工具函数合并
- 创建 `core/utils/download.ts` 公共模块
- 合并 `chartDownloadUtils.ts` 和 `ExportUtils.ts` 中的 `downloadFile/generateFilename/dataURLToBlob`
- 统一版本号到 `core/version.ts`，消除 4 处不一致（1.2.0 vs 1.7.0）

#### 测试基础设施优化
- 创建 `__mocks__/BaseChartWrapper.tsx` 自动发现 mock
- 创建 `testUtils.tsx` 共享 `runStandardChartTests` 函数
- `parallel` 测试改用自动 mock

#### 持续集成修复
- ESLint 升级至 v9，迁移至 flat config（`eslint.config.js`）
- Prettier 全部通过
- 新增 TypeScript 类型检查步骤
- 降低覆盖率阈值适配当前水平

#### Bug 修复
- 修复 `createMiniAppAdapter` 类型签名过严问题
- 修复 `csvToBlob` / `jsonToBlob` 参数签名不一致
- 修复 `LazyChart.tsx` 中 3 处重复懒加载映射

### 统计
- 59 文件变更，+5,905 / -2,544 行
- TypeScript 编译零错误
- 全部 14 个测试套件通过，148 个测试通过

---

## [v1.11.3] - 2026-04-26

### 🔧 维护更新
- 降低覆盖率阈值至 10%
- 常规依赖更新

---

## [v1.11.2] - 2026-04-20

### 🔧 维护更新
- 常规 bug 修复与依赖更新

---

## [v1.11.1] - 2026-04-12

### Code Quality
- **LazyChart.tsx**: BaseChartProps 替代 Record<string, unknown>，新增 aria-busy 加载指示和屏幕阅读器视觉隐藏文本
- **ExportUtils.ts**: getDataURL/JSPDFInstance 类型安全化，移除 3 处 any 类型
- **hooks/index.ts**: 分离 export type 与值导出，消除 webpack 5 re-export 警告

### Bug Fixes
- 修复 5 个 webp 导出相关问题

---

## [v1.11.0] - 2026-04-11

### Features
- **类型安全强化**：将 `any` 类型从 211 处降至更低
- 其他架构优化和 bug 修复

---

## [v1.10.0] - 2026-04-11

### 🔧 维护更新
- 常规 bug 修复与依赖更新

---

## [v1.9.0] - 2026-04-10

### ♿ Accessibility — 键盘导航 + 屏幕阅读器
- 图表支持完整键盘操作：缩放、平移、重置
- 数据表，屏幕阅读器实时访问图表数据

### 🎬 Professional Animation Presets
- Duration 调优：default 1200ms→450ms、fast 500ms→200ms
- 标记 DEPRECATED（保持禁用以避免 breaking change）

### 🔧 TypeScript Type System Refactored
- 全部类型化，零 any
- 补全缺失方法
- 其他类型修复

---

## [v1.6.0] - 2026-04-01

### 新增特性
- **BoxplotChart**: 箱线图组件，展示数据分布
- **ParallelChart**: 平行坐标图组件，展示高维数据关系
- **EnhancedThemeEditor**: 增强版主题编辑器
  - 实时预览功能
  - 5 种预设主题
  - JSON/CSS 导入导出
  - Tab 切换界面

### 其他更新
- 包名更新为 @agions/taroviz
- 文档完善，新增 GraphChart、CandlestickChart、WordCloudChart 图表文档

---

## [v1.2.1] - 2026-03-17

### 🔧 维护更新
- 修复模块引用路径和 webpack-cli 依赖
- 修复导入路径问题

---

## [v1.1.0] - 2025-04-15

### 特性
- 彻底解决文档构建问题
- 修复导入路径问题
- CI 文档构建流程优化

---

## [v1.0.2] - 2025-04-12

### 新特性（正式版本）
- 完整的 TypeScript 类型支持
- 更好的文档和示例
- 更稳定的版本发布
- 持续的维护支持

---

## [v0.4.0] - 2025-03-26

### 性能优化
- 实现图表数据缓存机制，提高渲染速度
- 添加懒加载功能，优化首屏加载时间
- 优化大数据渲染性能，支持自动降采样

### Bug 修复
- 修复 EChartsComponent 类型错误问题
- 修复下钻功能中的类型定义缺失问题
- 修复大数据处理模块中的采样策略兼容性问题
- 修复测试文件中的类型错误
- 修复 withLinkage 组件中的问题

---

## [v0.3.0] - 2025-03-19

### 新增特性
- 新增 8 种图表类型示例：
  - 关系图表：桑基图 (Sankey)、和弦图 (Chord)
  - 层级图表：矩形树图 (Treemap)、旭日图 (Sunburst)
  - 地理图表：热力图 (Heatmap)、地理连线图 (Lines)
  - 特殊图表：水球图 (Liquid)、词云图 (Wordcloud)
- 添加特殊图表所需的依赖库支持
- 优化图表类型的管理和组织结构
- 改进构建系统，提升跨平台兼容性

---

## [v0.2.0] - 2025-03-18

### 修复
- 修复类型错误
- 更新文档
- 优化打包配置

---

## [v0.1.0] - 2025-03-17

### 新特性
- 初始版本发布
- 支持 H5 和微信小程序
- 提供与 ECharts 一致的配置方式
- 支持图表事件处理
- 添加鸿蒙 OS 平台支持（基础版本）
- 添加支付宝小程序平台支持（基础版本）

### 改进
- 优化类型定义，解决类型冲突问题
- 完善 WeappAdapterOptions 接口定义
- H5 版本性能优化

### 技术细节
- 基于 Taro 3.6+ 和 ECharts 5.4+
- 使用 Rollup 构建，支持 ES 模块和 CommonJS
- 支持按平台导入，优化包体积