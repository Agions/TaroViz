# TaroViz 0.5.0 迁移指南

## 包名变更

在 TaroViz 0.5.0 版本中，我们对包名进行了标准化更改，主要是将整合包的名称从 `@taroviz` 更改为 `@taroviz/core-bundle`。这项更改是为了符合 NPM 包命名规范，使包名结构更加清晰。

### 旧版本

```js
// 整合包引用方式
import { LineChart } from '@taroviz';
```

### 新版本

```js
// 整合包新的引用方式
import { LineChart } from '@taroviz/core-bundle';
```

## 依赖更新

如果您正在使用旧版本，需要更新您的依赖：

```bash
# 删除旧版本
npm uninstall @taroviz

# 安装新版本
npm install @taroviz/core-bundle
```

对于使用 yarn 的用户：

```bash
# 删除旧版本
yarn remove @taroviz

# 安装新版本
yarn add @taroviz/core-bundle
```

对于使用 pnpm 的用户：

```bash
# 删除旧版本
pnpm remove @taroviz

# 安装新版本
pnpm add @taroviz/core-bundle
```

## 子包引用

如果您使用了按需引入的方式，引用各个子包，这部分的引用方式保持不变：

```js
// 仍然有效，无需更改
import { BaseChart } from '@taroviz/core';
import { LineChart } from '@taroviz/charts';
import { getAdapter } from '@taroviz/adapters';
import { applyTheme } from '@taroviz/themes';
import { transform } from '@taroviz/data';
import { useChart } from '@taroviz/hooks';
```

## 新增功能

### 0.5.0版本中的改进：

1. **包构建优化**：

   - 解决了ESM/CommonJS模块兼容性问题
   - 优化了包体积和构建流程
2. **多平台支持完善**：

   - 完善了百度小程序(swan)适配器
   - 统一了各平台适配器接口
3. **类型定义改进**：

   - 修复了跨包类型导入和接口实现问题
   - 增强了TypeScript类型提示
4. **文档更新**：

   - 完善了安装和使用说明
   - 添加了各种使用场景的代码示例

## 平台适配器

0.5.0版本中，我们提供了明确的平台适配器导出，方便用户在特定场景下直接引用：

```js
import { H5Adapter } from '@taroviz/core-bundle';
import { WeappAdapter } from '@taroviz/core-bundle';
import { AlipayAdapter } from '@taroviz/core-bundle';
import { SwanAdapter } from '@taroviz/core-bundle';  // 新增的百度小程序适配器
import { HarmonyAdapter } from '@taroviz/core-bundle';  // 鸿蒙OS适配器
```

## 项目配置兼容性

TaroViz 0.5.0 已经解决了与现代打包工具的兼容性问题，支持：

1. **ESM 与 CommonJS 双模式**：

   - 可以同时在 ESM 和 CommonJS 项目中使用
   - 支持 `import` 和 `require` 两种引入方式
2. **构建工具兼容**：

   - 兼容 Webpack、Rollup、Vite 等主流构建工具
   - 提供了适用于不同环境的入口文件

## API 变更

本次更新主要是包名变更，API保持不变。如果您的项目中发现与旧版本不兼容的情况，请参考我们的API文档或提交issue。

## 常见问题

**Q: 我需要同时安装 `@taroviz` 和 `@taroviz/core-bundle` 吗？**

A: 不需要。`@taroviz/core-bundle` 是 `@taroviz` 的替代品，您只需要安装 `@taroviz/core-bundle`。

**Q: 更新后发现部分功能不可用？**

A: 请确保您已经完全卸载了旧版本的 `@taroviz`，并正确安装了 `@taroviz/core-bundle`。同时，检查您的引用路径是否已经更新。

**Q: 使用TypeScript时出现类型错误？**

A: 请确保您使用的是最新的TypeScript版本，并且正确导入了类型。如果问题仍然存在，可能是您项目中的路径别名配置需要更新。

## 技术支持

如果您在迁移过程中遇到任何问题，请通过以下方式联系我们：

- 提交 GitHub Issue: https://github.com/agions/taroviz/issues
- 发送邮件至：support@taroviz.dev

我们将尽快回复您的问题。
