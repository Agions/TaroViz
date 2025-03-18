# TaroViz 示例

这个目录包含了 TaroViz 的各种使用示例，展示了如何在不同场景下使用 TaroViz 来创建交互式图表。

## 示例列表

### 基础示例

- **自定义配置** ([CustomChartConfig.tsx](./CustomChartConfig.tsx))

  使用 `customConfig` 属性来简化常见的图表配置。这个示例展示了如何使用自定义配置选项来设置颜色、字体、交互行为等，而无需深入了解 ECharts 的复杂配置。

### 交互示例

- **图表交互** ([InteractiveChart.tsx](./InteractiveChart.tsx))

  演示如何与图表进行交互，包括高亮数据点、控制提示框显示、添加标记点等。这个示例展示了如何在 React 组件中获取并操作图表实例。

### 高级示例

- **动态数据** ([DynamicDataChart.tsx](./DynamicDataChart.tsx))

  展示如何处理实时数据更新和动态加载数据。这个示例包含了数据流实时更新、数据点添加、时间窗口滑动等功能，适用于监控面板和数据可视化应用。

### 响应式示例

- **响应式布局** ([ResponsiveLayout.tsx](./ResponsiveLayout.tsx))

  根据不同屏幕尺寸自动调整图表布局和样式。这个示例展示了如何创建在不同设备上都能良好展示的图表界面，包括单列、双列和仪表盘等不同布局。

## 如何运行示例

1. 确保已安装所有依赖：

```bash
npm install
# 或
yarn install
```

2. 运行开发服务器：

```bash
# H5 环境
npm run dev:h5
# 或
yarn dev:h5

# 微信小程序环境
npm run dev:weapp
# 或
yarn dev:weapp
```

3. 在浏览器或小程序开发工具中查看示例。

## 示例结构

每个示例通常包含以下部分：

1. **组件文件** (`*.tsx`): 包含示例的主要代码和逻辑
2. **样式文件** (`*.scss`): 包含示例的样式定义
3. **说明文档**: 代码注释中提供了详细说明

## 示例索引

`index.ts` 文件导出了所有示例，并提供了分类和检索功能。您可以通过以下方式使用：

```typescript
import Examples, { getExamples, getCategories, ExampleCategory } from './examples';

// 获取所有示例
const allExamples = getExamples();

// 获取特定分类的示例
const interactiveExamples = getExamples(ExampleCategory.Interactive);

// 直接使用特定示例组件
const { InteractiveChart } = Examples;
```

## 贡献新示例

如果您想贡献新的示例，请按照以下步骤：

1. 创建示例组件文件和样式文件
2. 在 `index.ts` 中注册您的示例
3. 为您的示例添加详细的代码注释和文档
4. 提交 Pull Request

## 许可证

这些示例与 TaroViz 项目共享相同的许可证。
