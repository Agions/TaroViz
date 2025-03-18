# TaroViz

TaroViz 是一个基于 Taro 和 ECharts 的图表组件库，支持多端小程序和 H5。

## 特性

- 🚀 基于 Taro 3.x 和 ECharts 5.x
- 📱 支持多端：微信小程序、支付宝小程序、H5
- 🎨 支持多种图表类型：折线图、柱状图、饼图、仪表盘等
- 📦 按需加载，体积小巧
- 🔧 支持自定义主题和配置
- 📊 支持数据动态更新

## 安装

```bash
npm install taroviz
# 或
yarn add taroviz
```

## 使用

```tsx
import { ECharts } from 'taroviz';

function MyChart() {
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
  };

  return <ECharts option={option} />;
}
```

## 支持的图表类型

- 折线图 (line)
- 柱状图 (bar)
- 饼图 (pie)
- 仪表盘 (gauge)
- 散点图 (scatter)
- 雷达图 (radar)
- 地图 (map)
- 热力图 (heatmap)
- 树图 (tree)
- 旭日图 (sunburst)

## 更新日志

### v0.2.0
- 新增 H5 平台支持
- 优化打包配置
- 完善类型定义
- 添加示例文档

### v0.1.0
- 初始版本发布
- 支持基础图表类型
- 支持微信小程序

## 文档

详细文档请访问：[TaroViz 文档](https://github.com/agions/taroviz/wiki)

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT
