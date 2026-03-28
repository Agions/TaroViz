---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: TaroViz
  text: 优雅的数据可视化解决方案
  tagline: 基于 Taro 与 ECharts 构建的多端图表组件库，为小程序和 Web 应用提供丰富的交互式图表，让数据讲述故事
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
  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 9l-5-6-4 8-3-2"/></svg>
    title: 11+ 图表类型
    details: 折线图、柱状图、饼图、散点图、雷达图、热力图、仪表盘、漏斗图、矩形树图、旭日图、桑基图等，满足各类数据可视化需求

  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
    title: 真正的小程序原生
    details: 深度适配微信、支付宝、百度、字节跳动等主流小程序平台，一套代码多端运行，无需额外适配

  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 2a10 10 0 0 0-10 10"/><circle cx="12" cy="12" r="4"/></svg>
    title: 主题系统
    details: 内置 10+ 套预设主题（Neon、Glass、Pastel、Sunset、Ocean、Cyber 等），支持自定义主题和动态主题切换

  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    title: 极致性能
    details: 智能数据采样、渐进式渲染、WebWorker 异步计算，轻松处理万级数据点，流畅不卡顿

  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    title: React Hooks
    details: useChart、useTheme、useResizeObserver 等 Hooks，简化状态管理与生命周期，开发更优雅

  - icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    title: TypeScript First
    details: 完整的类型定义，智能提示覆盖 IDE 中畅享丝滑开发体验，告别 any 类型

footer:
  message: 基于 MIT 许可证开源
  copyright: Copyright © 2025-present TaroViz Team
---

<div class="hero-stats">

::: stats
| 图表组件 | 小程序平台 | 月下载量 |
|:---:|:---:|:---:|
| **11+** | **6+** | **10k+** |
:::

</div>

::: why-section
## 为什么选择 TaroViz？

TaroViz 专为跨端场景设计，兼顾小程序性能和 Web 灵活性。在Taro生态下，你无需在不同平台间做权衡 — 同一套 API，同一份代码，天然支持所有平台。
:::

<div class="logo-cloud">

<div class="logo-cloud-title">已支持的平台</div>

<div class="logo-cloud-items">
  <span>微信小程序</span>
  <span>支付宝小程序</span>
  <span>百度小程序</span>
  <span>字节跳动小程序</span>
  <span>H5</span>
</div>

</div>

<style>

.hero-stats {
  margin-top: 48px;
  display: flex;
  justify-content: center;
}

.stats {
  display: inline-flex;
  gap: 40px;
  padding: 24px 40px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  box-shadow: var(--vp-shadow-2);
}

.stats table {
  border: none;
  background: transparent;
}

.stats td {
  padding: 8px 28px;
  text-align: center;
  border: none;
}

.stats td:first-child {
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.stats td:nth-child(2) {
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.stats td:last-child {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  font-size: 22px;
}

.stats td:not(:first-child):not(:last-child) {
  border-left: 1px solid var(--vp-c-divider);
  border-right: 1px solid var(--vp-c-divider);
}

.VPHero .VPImage {
  max-height: 120px !important;
}

.why-section {
  margin: 48px auto;
  padding: 40px;
  background: linear-gradient(135deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
  border: 1px solid var(--vp-c-border);
  border-radius: 16px;
  text-align: center;
  max-width: 800px;
}

.why-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.why-section p {
  color: var(--vp-c-text-2);
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;
}

.logo-cloud {
  margin: 48px 0;
  text-align: center;
}

.logo-cloud-title {
  font-size: 12px;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 24px;
  font-weight: 500;
}

.logo-cloud-items {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
  flex-wrap: wrap;
  opacity: 0.7;
}

.logo-cloud-items span {
  font-size: 15px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

@media (max-width: 768px) {
  .stats {
    flex-direction: column;
    gap: 12px;
  }
  
  .stats td:not(:first-child):not(:last-child) {
    border-left: none;
    border-right: none;
    border-top: 1px solid var(--vp-c-divider);
    border-bottom: 1px solid var(--vp-c-divider);
  }
  
  .logo-cloud-items {
    gap: 24px;
  }
}

</style>
