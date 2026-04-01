# 安装

TaroViz 支持多种包管理器，本指南将帮助您完成环境搭建。

::: tip 推荐环境
- Node.js >= 16.0.0
- Taro >= 3.6.0
- React >= 17.0.0
:::

## 包管理器安装

选择你喜欢的包管理器，执行以下命令：

::: code-group

```bash [npm]
npm install @agions/taroviz
```

```bash [yarn]
yarn add @agions/taroviz
```

```bash [pnpm]
pnpm add @agions/taroviz
```

:::

## 创建 Taro 项目

如果你还没有 Taro 项目，可以使用官方脚手架创建：

```bash
npx @tarojs/cli init my-chart-app
cd my-chart-app
npm install @agions/taroviz
```

::: warning 小程序限流
微信小程序在使用 canvas 渲染时需要注意 setData 的数据量限制，建议开启 `autoResize` 和合理配置 `dataZoom`。
:::

## 配置项目

### H5 环境

H5 环境开箱即用，无需额外配置：

```typescript
// app.config.ts
export default defineAppConfig({
  // 默认配置即可
})
```

### 小程序环境

在小程序中使用时，需要在 `app.config.ts` 中配置：

```typescript
// app.config.ts
export default defineAppConfig({
  // 其他配置...
  components: [
    // TaroViz 组件会自动注册
  ]
})
```

## 验证安装

安装完成后，可以通过以下方式验证：

```typescript
import { version } from '@agions/taroviz';

console.log('TaroViz version:', version);
// 输出: TaroViz version: x.x.x
```

## 常见问题

::: details 安装失败怎么办？

1. **清除 npm 缓存**
   ```bash
   npm cache clean --force
   ```

2. **检查网络**
   ```bash
   npm config set registry https://registry.npmmirror.com
   ```

3. **使用 pnpm**
   ```bash
   pnpm install @agions/taroviz
   ```

:::

::: details 版本冲突？

```bash
# 查看当前版本
npm list @agions/taroviz

# 安装指定版本
npm install @agions/taroviz@1.2.0
```

:::

## 下一步

<div class="next-steps">

[基础使用 →](./basic-usage.md)

</div>

<style scoped>

.next-steps {
  margin-top: 24px;
  padding: 16px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  display: inline-block;
}

.next-steps a {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  text-decoration: none;
}

</style>
