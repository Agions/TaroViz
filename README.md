# TaroViz

[![npm version](https://img.shields.io/npm/v/taroviz.svg)](https://www.npmjs.com/package/taroviz)
[![npm downloads](https://img.shields.io/npm/dm/taroviz.svg)](https://www.npmjs.com/package/taroviz)
[![license](https://img.shields.io/npm/l/taroviz.svg)](https://github.com/agions/taroviz/blob/main/LICENSE)

基于 ECharts 的 Taro 图表库，支持 H5 和小程序环境。

## 特性

- 🎯 基于 ECharts 5.x
- 📱 支持 H5 和小程序环境
- 🎨 支持主题定制
- 📦 支持按需引入
- 🔄 支持动态数据更新
- 🎭 支持图表交互
- 📊 支持多种图表类型
- 🛠 支持自定义配置

## 安装

```bash
npm install taroviz
# 或
yarn add taroviz
```

## 快速开始

```tsx
import { Chart } from 'taroviz'

// 在组件中使用
const MyChart = () => {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }]
  }

  return <Chart option={option} />
}
```

## 文档

- [使用文档](docs/USAGE.md)
- [开发文档](docs/DEVELOPMENT.md)
- [贡献指南](CONTRIBUTING.md)
- [更新日志](CHANGELOG.md)

## 支持的图表类型

- 折线图 (line)
- 柱状图 (bar)
- 饼图 (pie)
- 散点图 (scatter)
- 雷达图 (radar)
- 地图 (map)
- 仪表盘 (gauge)
- 热力图 (heatmap)
- 树图 (tree)
- 矩形树图 (treemap)
- 桑基图 (sankey)
- 漏斗图 (funnel)
- 箱线图 (boxplot)
- 平行坐标系 (parallel)
- 主题河流图 (themeRiver)
- 旭日图 (sunburst)
- 词云图 (wordCloud)
- 关系图 (graph)
- 日历图 (calendar)
- 自定义系列 (custom)


## 开发计划

### v0.3.0 (计划中)
- [ ] 支持更多图表类型
- [ ] 优化性能
- [ ] 添加更多示例
- [ ] 完善文档
- [ ] 添加单元测试
- [ ] 添加 E2E 测试
- [ ] 支持更多平台
- [ ] 支持更多主题
- [ ] 支持更多交互方式
- [ ] 支持更多自定义配置

### v0.4.0 (计划中)
- [ ] 支持图表联动
- [ ] 支持数据导出
- [ ] 支持图表动画
- [ ] 支持图表事件
- [ ] 支持图表主题
- [ ] 支持图表布局
- [ ] 支持图表缩放
- [ ] 支持图表拖拽
- [ ] 支持图表旋转
- [ ] 支持图表镜像

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT
