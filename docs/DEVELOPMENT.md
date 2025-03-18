# TaroViz 开发文档

该文档面向想要参与 TaroViz 开发或了解其内部实现的开发者。

## 目录

- [项目结构](#项目结构)
- [开发环境](#开发环境)
- [构建流程](#构建流程)
- [版本规划与特性开发](#版本规划与特性开发)
- [代码规范](#代码规范)
- [平台适配](#平台适配)
- [性能优化](#性能优化)
- [测试](#测试)
- [发布流程](#发布流程)
- [贡献指南](#贡献指南)

## 项目结构

```
taroviz/
├── src/                # 源代码
│   ├── components/     # 组件
│   │   └── ECharts/    # 图表组件
│   │       ├── adapters/   # 平台适配器
│   │       ├── hooks/      # 自定义 Hooks
│   │       ├── styles/     # 样式文件
│   │       ├── utils/      # 工具函数
│   │       ├── types/      # 类型定义
│   │       └── themes/     # 主题配置
│   ├── examples/       # 示例
│   └── index.ts        # 主入口
├── demo/               # 示例项目
├── docs/               # 文档
├── tests/              # 测试文件
├── scripts/            # 构建脚本
├── .eslintrc.js        # ESLint 配置
├── .prettierrc         # Prettier 配置
├── tsconfig.json       # TypeScript 配置
├── package.json        # 包配置
└── README.md           # 项目说明
```

## 开发环境

### 环境要求

- Node.js >= 14.0.0
- yarn >= 1.22.0 或 npm >= 6.0.0

### 安装依赖

```bash
# 安装项目依赖
yarn install

# 安装示例项目依赖
cd demo && yarn install
```

### 开发流程

1. 启动开发环境

```bash
# 启动库开发环境
yarn dev

# 启动示例项目开发环境
cd demo && yarn dev:h5
# 或者
cd demo && yarn dev:weapp
```

2. 修改代码并测试

3. 构建

```bash
yarn build
```

## 构建流程

TaroViz 使用 Rollup 进行打包，支持多种模块格式输出。

### 构建命令

```bash
# 完整构建
yarn build

# 仅构建库
yarn build:lib

# 仅构建类型定义
yarn build:types

# 仅构建示例
yarn build:demo
```

### 构建输出

构建后的文件位于 `dist` 目录：

- `dist/index.js` - CommonJS 格式
- `dist/index.esm.js` - ES Module 格式
- `dist/index.umd.js` - UMD 格式
- `dist/types` - TypeScript 类型定义

## 版本规划与特性开发

TaroViz 采用逐步迭代的开发模式，每个版本专注于特定功能集的实现和优化。

### v0.3.0 版本（已完成）

v0.3.0 版本重点实现了以下功能：

#### 增强的自定义配置功能
- 实现了 `customConfig` 属性，简化常见图表配置
- 支持提示框、图例、坐标轴标签等格式化函数
- 添加了颜色主题、字体、动画、网格等多种视觉效果配置
- 完善了加载状态和无数据状态处理

#### 扩展的图表类型支持
- 实现了完整的图表类型注册系统
- 新增多种图表类型，包括：
  - 基础图表：面积图、堆叠柱状图、环形图
  - 统计图表：箱线图、K线图
  - 关系图表：桑基图、和弦图
  - 层级图表：矩形树图、旭日图
  - 地理图表：热力图、路线图
  - 特殊图表：水球图、词云图

#### 丰富的示例应用
- 交互式图表示例：展示高亮、提示框控制、标记点添加等交互功能
- 动态数据图表示例：实现实时数据更新、数据窗口滑动、手动添加异常值
- 响应式布局示例：支持单列、双列和仪表盘三种布局，自适应不同屏幕尺寸
- 自定义配置示例：展示如何使用简化配置快速定制图表样式

#### 文档和示例管理
- 为Chart组件添加了详细的API文档
- 创建了统一的示例索引和分类系统
- 为每个示例提供了详细说明和使用指南

### v0.4.0 版本规划

v0.4.0 版本将专注于以下方向：

#### 性能优化
- 实现图表组件懒加载
- 优化大数据量渲染性能
- 提高跨平台渲染一致性
- 减少不必要的重绘和计算

#### 测试与质量保障
- 添加单元测试覆盖核心功能
- 实现端到端测试验证跨平台兼容性
- 建立持续集成流程

#### 扩展支持平台
- 增强已支持平台的适配度
- 添加更多小程序平台支持
- 优化平台特定功能

#### 高级交互与功能
- 实现图表联动功能
- 支持更复杂的图表交互
- 添加数据导出能力
- 增强图表动画效果

### 参与特性开发

如果您想参与特定特性的开发，建议按照以下步骤：

1. 查看项目 Issues 和 Projects，了解当前开发重点
2. 在开始开发前创建 Issue 讨论实现方案
3. 遵循 [贡献指南](#贡献指南) 提交代码
4. 编写充分的单元测试和文档
5. 创建示例展示新功能的使用方法

我们特别欢迎以下方面的贡献：
- 新图表类型的实现
- 性能优化
- 跨平台兼容性改进
- 文档和示例完善
- 单元测试和端到端测试

## 代码规范

本项目使用 ESLint 和 Prettier 维护代码质量和统一风格。

### 代码质量检查

```bash
# 执行 ESLint 检查
yarn lint

# 自动修复 ESLint 错误
yarn lint:fix
```

### 代码格式化

```bash
# 执行 Prettier 格式化
yarn format
```

### 提交前检查

项目使用 husky 和 lint-staged 在提交前自动检查和格式化代码。

## 平台适配

TaroViz 支持多个平台，每个平台都有对应的适配器。

### 适配器结构

适配器位于 `src/components/ECharts/adapters` 目录下，每个平台对应一个适配器文件。

### 适配原理

1. 每个适配器都实现了相同的接口，但针对平台特性进行不同的实现
2. 运行时会根据当前环境自动选择合适的适配器
3. 适配器主要处理以下差异：
   - Canvas 上下文获取方式
   - 触摸事件转换
   - 渲染流程调整
   - 平台特定API调用

### 添加新平台支持

要添加新平台的支持，需要以下步骤：

1. 创建平台适配器文件 (如 `src/components/ECharts/adapters/newplatform.tsx`)
2. 实现适配器组件，处理平台特定逻辑
3. 在 `src/components/ECharts/adapters/index.ts` 中导出并注册适配器
4. 添加平台特定的优化和兼容性处理
5. 编写文档和示例

## 性能优化

### 减少重绘

- 使用 `useCallback` 和 `useMemo` 减少不必要的函数重建和计算
- 实现选择性渲染，只在必要时更新图表

### 数据处理

- 大数据量时进行数据抽样或聚合
- 使用 `requestAnimationFrame` 分批处理数据

### 资源加载

- 按需加载图表组件
- 延迟加载非关键资源
- 优化包体积，减少依赖

## 测试

TaroViz 使用 Jest 和 @testing-library/react 进行测试。

### 单元测试

```bash
# 运行所有测试
yarn test

# 运行特定测试
yarn test src/components/ECharts

# 生成测试覆盖率报告
yarn test:coverage
```

### 编写测试

测试文件应放在对应组件目录下的 `__tests__` 目录中，如：
`src/components/ECharts/__tests__/index.test.tsx`

```tsx
import React from 'react';
import { render } from '@testing-library/react';
import { Chart } from '../index';

describe('Chart Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Chart
        option={{
          xAxis: { type: 'category', data: ['A', 'B', 'C'] },
          yAxis: { type: 'value' },
          series: [{ data: [1, 2, 3], type: 'bar' }]
        }}
      />
    );
    expect(container).toBeInTheDocument();
  });
});
```

## 发布流程

### 版本管理

1. 使用语义化版本号 (Semantic Versioning)
2. 更新 `CHANGELOG.md` 文件，记录变更
3. 更新版本号

```bash
# 更新补丁版本 (1.0.0 -> 1.0.1)
yarn version --patch

# 更新次要版本 (1.0.0 -> 1.1.0)
yarn version --minor

# 更新主要版本 (1.0.0 -> 2.0.0)
yarn version --major
```

### 发布到 npm

```bash
# 构建
yarn build

# 发布
npm publish
```

## 贡献指南

我们欢迎任何形式的贡献，包括但不限于：

- 提交 bug 报告
- 功能请求
- 代码贡献
- 文档改进

### 贡献流程

1. Fork 项目仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### Pull Request 指南

- 确保 PR 描述清晰地说明了变更内容和原因
- 包含必要的测试
- 遵循现有的代码风格
- 保持单一职责，一个 PR 只做一件事
- 关联相关的 issue

### 代码评审

所有提交的代码都需要通过代码评审。评审将关注：

- 功能正确性
- 代码质量
- 性能影响
- 架构一致性
- 文档完整性

感谢您对 TaroViz 项目的贡献!
