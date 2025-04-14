# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.1.0](https://github.com/Agions/TaroViz/compare/v1.0.2...v1.1.0) (2025-04-14)

### Bug Fixes

- 彻底解决文档构建问题，修复模块引用路径和webpack-cli依赖 ([1a10246](https://github.com/Agions/TaroViz/commit/1a10246ec49fa31d00a66039fcaad4cad787ae33))
- 更新包版本至1.0.3并修复导入路径问题 ([4449b03](https://github.com/Agions/TaroViz/commit/4449b0352f2566b57332eee4b80fcd9aa84b7bdf))
- 解决pnpm安装时frozen-lockfile错误，优化CI文档构建流程 ([a60f1cb](https://github.com/Agions/TaroViz/commit/a60f1cbcca5fdcc961933386727cc8d62f705d55))
- 修复GitHub Action无法找到pnpm可执行文件的问题 ([e42181f](https://github.com/Agions/TaroViz/commit/e42181fde0939011e7f81ebf3f92defa183e516c))
- 修复npm不支持workspace协议问题，改用pnpm处理所有依赖 ([6bc2ec9](https://github.com/Agions/TaroViz/commit/6bc2ec9fdfaf70e50af9ee4ae37d1bf62a36f5bc))
- 修复PNPM安装依赖错误和文档生成问题，增加容错机制 ([a4c3025](https://github.com/Agions/TaroViz/commit/a4c3025af1765ed82b6fc259458dd29461282915))
- 修复TypeDoc无法找到模块依赖的问题 ([9861264](https://github.com/Agions/TaroViz/commit/98612640da20589ef02dd56a9780b78cdf7ae0cf))
- 移除TypeDoc不支持的skipLibCheck选项 ([0f682d2](https://github.com/Agions/TaroViz/commit/0f682d248790af6f04a998af69b2526ffa4e9955))

### Features

- 更新版本号到1.0.3，修复类型定义问题 ([f5afd2d](https://github.com/Agions/TaroViz/commit/f5afd2d1e71ec8e9e4d57b6ce55693c5fb6e690b))
- 添加GitHub Pages部署所需的权限配置 ([acac0e2](https://github.com/Agions/TaroViz/commit/acac0e2cc6e9c8bfe9474b7e981036d04a413fc9))

## [1.0.3](https://github.com/Agions/TaroViz/compare/v1.0.2...v1.0.3) (2025-04-14)

### Bug Fixes

- 修复类型定义中使用`Function`类型的问题，替换为更具体的`EventHandler`类型
- 优化各适配器中的代码规范和类型安全性
- 修复WeappAdapter中的组件实例类型问题

## [1.0.2](https://github.com/Agions/TaroViz/compare/v1.0.1...v1.0.2) (2025-04-12)

**Note:** Version bump only for package @agions/taroviz

## [1.0.1](https://github.com/Agions/TaroViz/compare/v0.4.0...v1.0.1) (2025-04-12)

### Bug Fixes

- 删除 lerna.json 中已废弃的 useWorkspaces 选项 ([eb0354d](https://github.com/Agions/TaroViz/commit/eb0354d2d1a17e30598e0e713aec7ae0bc504af1))
- 删除对不存在的 getEnv 导出的引用 ([8dd6d4f](https://github.com/Agions/TaroViz/commit/8dd6d4fb6db28690e3cc94cf7eab89985654067d))
- 修复构建和发布问题 ([2fa5bd4](https://github.com/Agions/TaroViz/commit/2fa5bd41ce5f66bbeddf665ce223e3e7da118cef))

# 更新日志

本文档记录 TaroViz 的所有重要变更。

## [1.0.0]

### 重大变更

- 📦 包名更新：主包从 `@agions/taroviz-all` 改为 `@agions/taroviz`

### 新增

- 🎉 首次发布
- 📊 支持基础图表类型：折线图、柱状图、饼图
- 🎨 主题系统支持
- 🔄 数据处理工具
- 📱 多端适配支持

### 核心包更新

#### @agions/taroviz-core@1.0.0

- ✨ 基础图表组件
- 🛠️ 工具函数库
- 📱 多端渲染支持

#### @agions/taroviz-hooks@1.0.0

- 🎯 图表数据处理 Hooks
- 🔄 状态管理 Hooks
- 🎨 主题 Hooks

#### @agions/taroviz-data@1.0.0

- 📊 数据转换工具
- 📈 数据聚合功能
- 🔍 数据过滤与验证

#### @agions/taroviz-themes@1.0.0

- 🎨 预设主题
- 🛠️ 主题创建工具
- 🔄 主题切换支持

#### @agions/taroviz-adapters@1.0.0

- 📱 多端适配器
- 🔌 平台兼容层
- 🛠️ 渲染优化

### 修复

- 修复图表渲染性能问题
- 修复主题切换闪烁问题
- 修复数据更新不及时问题

### 优化

- 优化图表渲染性能
- 优化数据处理效率
- 优化包体积

### 文档

- 📚 完善 API 文档
- 🎯 添加使用示例
- 📖 更新开发指南

## [0.5.1]

### 新增

- 支持自定义主题
- 添加数据处理工具
- 新增图表类型

### 修复

- 修复小程序兼容性问题
- 修复主题应用问题
- 修复数据更新问题

## [0.5.0]

### 新增

- 项目初始化
- 基础功能实现
- 核心包开发

### 修复

- 基础功能问题修复
- 开发环境配置优化
- 依赖关系调整
