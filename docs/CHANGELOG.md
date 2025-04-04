# 变更日志

## [0.4.0]

### 图表联动功能
- 完整实现了图表联动系统，支持多图表间的交互关联
- 提供了联动管理API：createLinkage、getLinkage、removeLinkage、getAllLinkages
- 支持多种联动事件类型：提示框联动、高亮联动、图例选择联动、数据缩放联动等
- 实现withLinkage高阶组件，简化图表联动配置
- 支持联动事件的订阅和广播机制

### 下钻功能
- 实现DrillDownManager类，支持图表数据多层次下钻分析
- 提供完整的下钻历史记录和向上导航机制
- 支持自定义下钻行为和切片操作
- 提供丰富的下钻配置选项和事件回调

### 数据导出功能
- 支持导出图表为图片（PNG、JPG等格式）
- 支持导出数据为CSV格式文件
- 提供多种导出配置选项和自定义导出处理

### 大数据性能优化
- 实现大数据处理器optimizeChartOption，提升大数据量渲染性能
- 支持多种数据降采样算法：LTTB、平均值、最大值、最小值、求和等
- 提供渐进渲染和异步渲染优化
- 实现数据缓存和缓存失效机制
- 针对不同图表类型的专项性能优化

### 响应式布局系统
- 实现自动响应式布局系统，适配不同屏幕尺寸
- 提供断点配置和响应式规则定义
- 支持基于设备特性的智能布局优化
- 自动调整图表组件大小、间距和文字

### 类型系统和特殊图表
- 完善图表类型系统和TypeScript类型定义
- 新增专用图表组件：LineChart、BarChart、PieChart等
- 支持水球图、词云图等特殊图表类型
- 提供统一的图表实例API和类型定义

### 工具函数
- 提供UUID生成等实用工具函数
- 实现事件处理器和动态标记点/线添加
- 完善主题配置系统

## [0.3.0]

### 新增
- 添加了8种新的图表类型示例:
  - 关系图表: 桑基图(Sankey)、和弦图(Chord)
  - 层级图表: 矩形树图(Treemap)、旭日图(Sunburst)
  - 地理图表: 热力图(Heatmap)、地理连线图(Lines)
  - 特殊图表: 水球图(Liquid)、词云图(Wordcloud)
- 添加了特殊图表所需的依赖库: echarts-liquidfill, echarts-wordcloud

### 优化
- 更新了所有图表示例的命名和文档注释
- 优化了示例目录结构，按图表类型分类存放

### 新特性
- 增强的自定义配置功能
  - 新增 `customConfig` 属性，简化常见图表配置
  - 支持提示框、图例、坐标轴标签等格式化函数
  - 添加颜色主题、字体、动画、网格等视觉效果配置
  - 完善加载状态和无数据状态处理
- 扩展图表类型支持
  - 实现完整的图表类型注册系统
  - 新增多种图表类型:
    - 基础图表：面积图、堆叠柱状图、环形图
    - 统计图表：箱线图、K线图
    - 关系图表：桑基图、和弦图
    - 层级图表：矩形树图、旭日图
    - 地理图表：热力图、路线图
    - 特殊图表：水球图、词云图
- 丰富示例应用
  - 交互式图表示例，展示图表交互功能
  - 动态数据图表示例，实现实时数据更新
  - 响应式布局示例，支持多种布局模式
  - 自定义配置示例，展示简化配置功能
- 完善文档和示例管理
  - 新增详细的组件API文档
  - 创建统一的示例索引和分类系统
  - 为各示例提供详细说明和使用指南

### 技术细节
- 优化图表组件的性能和响应性
- 改进TypeScript类型定义，提高开发体验
- 增强跨平台兼容性，解决已知问题
- 重构组件结构，提高代码可维护性

## [0.2.0]

### 新特性
- 新增 H5 平台完整支持
- 优化打包配置，减小文件体积
- 完善类型定义，提升开发体验
- 添加详细示例文档

### 技术细节
- 优化 Rollup 配置，提升打包速度
- 改进渲染性能，减少重绘次数
- 添加更多单元测试，提高代码质量
- 修复已知的兼容性问题

## [0.1.0]

### 新特性
- 初始版本发布
- 支持 H5 和微信小程序
- 提供与 ECharts 一致的配置方式
- 支持图表事件处理

### 技术细节
- 实现适配器模式，自动匹配当前环境
- 优化小程序组件结构，提高渲染效率
- 添加基础单元测试 