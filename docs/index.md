---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: TaroViz
  text: 优雅的数据可视化解决方案
  tagline: 基于 Taro 与 ECharts 构建的多端图表组件库，为小程序和 Web 应用提供丰富的交互式图表
  image:
    src: /logo.png
    alt: TaroViz Logo
  actions:
    - theme: brand
      text: 快速开始 →
      link: /guide/installation
    - theme: alt
      text: 查看示例
      link: /examples/

features:
  - icon: 📊
    title: 10+ 图表类型
    details: 折线图、柱状图、饼图、散点图、雷达图、热力图、仪表盘、漏斗图等，满足各类数据可视化需求

  - icon: 📱
    title: 真正的小程序原生
    details: 深度适配微信、支付宝、百度、字节等主流小程序平台，一套代码多端运行

  - icon: 🎨
    title: 主题系统
    details: 内置 6 套预设主题，支持自定义主题和动态主题切换，轻松匹配品牌风格

  - icon: ⚡
    title: 极致性能
    details: 智能数据采样、渐进式渲染、WebWorker 异步计算，轻松处理万级数据点

  - icon: 🪝
    title: React Hooks
    details: useChart、useTheme、useResizeObserver 等 Hooks，简化状态管理与生命周期

  - icon: 🛠️
    title: TypeScript First
    details: 完整的类型定义，智能提示覆盖，IDE 中畅享丝滑开发体验

footer:
  message: 基于 MIT 许可证开源
  copyright: Copyright © 2025-present TaroViz Team
---

<div class="hero-stats">

::: stats
| 图表组件 | 小程序平台 | npm 下载量 |
|:---:|:---:|:---:|
| **10+** | **6+** | **10k+**/月 |
:::

</div>

<style>

.hero-stats {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}

.stats {
  display: inline-flex;
  gap: 32px;
  padding: 20px 32px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

.stats table {
  border: none;
  background: transparent;
}

.stats td {
  padding: 8px 24px;
  text-align: center;
  border: none;
}

.stats td:first-child {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.stats td:last-child {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  font-size: 18px;
}

.stats td:not(:first-child):not(:last-child) {
  border-left: 1px solid var(--vp-c-divider);
  border-right: 1px solid var(--vp-c-divider);
}

.VPHero .VPImage {
  max-height: 120px !important;
}

</style>
