---
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

## 项目数据

| 图表组件 | 小程序平台 | 月下载量 |
|:---:|:---:|:---:|
| **11+** | **6+** | **10k+** |

## 为什么选择 TaroViz？

TaroViz 专为跨端场景设计，兼顾小程序性能和 Web 灵活性。在 Taro 生态下，你无需在不同平台间做权衡 — 同一套 API，同一份代码，天然支持所有平台。

## 已支持的平台

<span class="platform-tag">微信小程序</span>
<span class="platform-tag">支付宝小程序</span>
<span class="platform-tag">百度小程序</span>
<span class="platform-tag">字节跳动小程序</span>
<span class="platform-tag">H5</span>

<style>
.VPHero .VPImage {
  max-height: 120px !important;
}

h2:not(.VPHero h2) {
  font-size: 1.4rem !important;
  font-weight: 700 !important;
  text-align: center !important;
  margin: 48px 0 24px !important;
  color: var(--vp-c-text-1) !important;
}

table {
  display: inline-table !important;
  margin: 0 auto !important;
  border-radius: 16px !important;
  overflow: hidden !important;
  border: 1px solid var(--vp-c-border) !important;
  box-shadow: var(--vp-shadow-2) !important;
}

table th {
  background: linear-gradient(135deg, #0d9488, #14b8a6) !important;
  color: #ffffff !important;
  font-weight: 700 !important;
  padding: 12px 24px !important;
  border: none !important;
  text-align: center !important;
}

table td {
  padding: 10px 24px !important;
  border: none !important;
  border-bottom: 1px solid var(--vp-c-divider) !important;
  text-align: center !important;
}

table tr:last-child td {
  border-bottom: none !important;
}

table tr:hover td {
  background: var(--vp-c-bg-soft) !important;
}

table td:first-child {
  color: var(--vp-c-text-2) !important;
  font-size: 0.875rem !important;
}

table td:last-child {
  color: #0d9488 !important;
  font-weight: 700 !important;
  font-size: 1.25rem !important;
}

table td:not(:first-child):not(:last-child) {
  border-left: 1px solid var(--vp-c-divider) !important;
  border-right: 1px solid var(--vp-c-divider) !important;
}

p {
  text-align: center !important;
  color: var(--vp-c-text-2) !important;
  max-width: 600px !important;
  margin: 0 auto 48px auto !important;
  line-height: 1.8 !important;
}

.platform-tag {
  display: inline-block;
  margin: 0 24px 16px 0;
  padding: 6px 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

@media (max-width: 640px) {
  table {
    display: block !important;
    overflow-x: auto !important;
  }

  .platform-tag {
    margin: 0 8px 12px 0;
    padding: 4px 12px;
    font-size: 0.75rem;
  }
}
</style>
