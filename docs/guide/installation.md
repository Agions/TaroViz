# 安装

TaroViz 支持多种包管理器，您可以根据自己的偏好选择合适的方式进行安装。

## 前置条件

- Node.js >= 16.0.0
- Taro >= 3.6.0

## 使用 npm 安装

```bash
npm install @agions/taroviz
```

## 使用 yarn 安装

```bash
yarn add @agions/taroviz
```

## 使用 pnpm 安装

```bash
pnpm add @agions/taroviz
```

## 在 Taro 项目中使用

### 1. 确保您的项目已安装 Taro

如果您还没有创建 Taro 项目，可以使用以下命令创建：

```bash
npx @tarojs/cli init my-app
```

### 2. 安装 TaroViz

在 Taro 项目根目录执行安装命令：

```bash
npm install @agions/taroviz
```

### 3. 配置项目

确保您的 Taro 项目已配置好 ECharts 相关依赖。对于小程序平台，您可能需要在 `app.config.ts` 中添加相应的配置：

```typescript
// app.config.ts
export default defineAppConfig({
  // 其他配置
  usingComponents: {
    // 其他组件
  },
});
```

## 验证安装

安装完成后，您可以在项目中引入 TaroViz 组件，验证安装是否成功：

```typescript
import { LineChart } from '@agions/taroviz';

console.log('TaroViz 安装成功！');
```

## 常见问题

### 安装失败

如果安装失败，您可以尝试以下方法：

1. 清除 npm 缓存：

   ```bash
   npm cache clean --force
   ```

2. 切换 npm 源：

   ```bash
   npm config set registry https://registry.npmmirror.com
   ```

3. 使用 pnpm 安装：
   ```bash
   pnpm add @agions/taroviz
   ```

### 版本冲突

如果遇到版本冲突问题，您可以尝试：

1. 查看当前项目依赖：

   ```bash
   npm list @agions/taroviz
   ```

2. 安装特定版本：
   ```bash
   npm install @agions/taroviz@1.2.0
   ```

## 下一步

继续阅读 [基础使用](./basic-usage.md) 指南，学习 TaroViz 的基本使用方法。
