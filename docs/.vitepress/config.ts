import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TaroViz",
  description: "基于 Taro 和 ECharts 的多端图表组件库",
  
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#0d9488' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap', rel: 'stylesheet' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '示例', link: '/examples/' },
      { text: 'API', link: '/api/' }
    ],

    sidebar: {
      '/guide/': [
        { text: '快速开始', link: '/guide/' },
        { text: '安装', link: '/guide/installation' },
        { text: '基础使用', link: '/guide/basic-usage' },
        { text: '图表类型', link: '/guide/chart-types' },
        { text: '主题预览', link: '/guide/themes' },
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
        { text: '交互式示例', link: '/examples/interactive' },
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
      { icon: 'npm', link: 'https://www.npmjs.com/package/taroviz' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Agions'
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: '目录'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: {
      text: '最后更新'
    }
  },

  base: '/TaroViz/',
  vite: {
    build: {
      assetsDir: 'assets'
    },
    optimizeDeps: {
      include: ['echarts']
    }
  },

  markdown: {
    lineNumbers: true
  }
})
