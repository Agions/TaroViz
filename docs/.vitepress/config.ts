import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TaroViz",
  description: "基于 Taro 和 ECharts 的多端图表组件库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: '示例', link: '/examples/' },
      { text: '迁移', link: '/migration/' },
      { text: '贡献', link: '/contributing/' }
    ],

    sidebar: {
      '/guide/': [
        { text: '快速开始', link: '/guide/' },
        { text: '安装', link: '/guide/installation' },
        { text: '基础使用', link: '/guide/basic-usage' },
        { text: '图表类型', link: '/guide/chart-types' },
        { text: '主题定制', link: '/guide/theming' },
        { text: '性能优化', link: '/guide/performance' },
        { text: '跨平台开发', link: '/guide/cross-platform' }
      ],
      '/api/': [
        { text: '核心组件', link: '/api/' },
        { text: '图表组件', link: '/api/charts' },
        { text: 'Hooks', link: '/api/hooks' },
        { text: '工具函数', link: '/api/utils' },
        { text: '类型定义', link: '/api/types' }
      ],
      '/examples/': [
        { text: '基础示例', link: '/examples/' },
        { text: '折线图', link: '/examples/line-chart' },
        { text: '柱状图', link: '/examples/bar-chart' },
        { text: '饼图', link: '/examples/pie-chart' },
        { text: '散点图', link: '/examples/scatter-chart' },
        { text: '雷达图', link: '/examples/radar-chart' },
        { text: '热力图', link: '/examples/heatmap-chart' },
        { text: '仪表盘', link: '/examples/gauge-chart' },
        { text: '漏斗图', link: '/examples/funnel-chart' }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/agions/taroviz' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@agions/taroviz' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Agions'
    },

    search: {
      provider: 'local'
    }
  },

  base: '/taroviz/',
  build: {
    assetsDir: 'assets'
  }
})
