# TaroViz 贡献指南

感谢您对TaroViz项目的关注！我们欢迎来自社区的贡献，无论是修复bug、改进文档还是添加新功能。本指南将帮助您了解如何参与贡献。

## 开发环境设置

首先，克隆仓库并安装依赖：

```bash
git clone https://github.com/agions/taroviz.git
cd taroviz
npm install
```

## 项目结构

TaroViz项目采用了单包架构，主要包括以下目录：

```
taroviz/
├── src/              # 源代码目录
│   ├── core/         # 核心功能和类型定义
│   ├── adapters/     # 平台适配器
│   ├── charts/       # 图表组件
│   ├── hooks/        # React hooks
│   ├── themes/       # 主题系统
│   ├── utils/        # 工具函数和数据处理
│   └── index.ts      # 主入口文件
├── public/           # 静态资源
├── prd/              # 产品需求文档
├── docs/             # 文档
├── scripts/          # 构建和开发脚本
└── __tests__/        # 测试文件
```

## 开发流程

### 1. 创建分支

从main分支创建一个新的功能分支或修复分支：

```bash
# 确保main分支是最新的
git checkout main
git pull origin main

# 创建新分支
# 功能分支：feature/feature-name
# 修复分支：fix/issue-number
# 文档分支：docs/documentation-name
git checkout -b feature/chart-animation
```

### 2. 开发

在本地进行开发，遵循以下原则：

- 保持代码简洁、可读性强
- 遵循现有代码风格
- 为新功能添加测试
- 更新相关文档

### 3. 构建

使用构建命令确保代码能够正确编译：

```bash
# 开发模式（监视文件变化）
npm run dev

# 构建生产版本（输出 CommonJS 和 ES Module）
npm run build
```

### 4. 测试

运行测试确保功能正常：

```bash
# 运行所有测试
npm run test

# 运行特定测试文件
npm test src/path/to/test/file

# 运行测试并生成覆盖率报告
npm run test:coverage
```

### 5. 代码检查

确保代码符合规范：

```bash
# 运行 ESLint 检查
npm run lint

# 运行 TypeScript 类型检查
npm run type-check

# 自动修复代码风格问题
npm run format
```

### 6. 提交

提交代码并推送到远程仓库，使用符合规范的提交信息：

```bash
# 暂存更改
git add .

# 提交代码，使用符合Conventional Commits规范的提交信息
git commit -m "feat(charts): 添加图表动画功能"

# 推送到远程仓库
git push origin feature/chart-animation
```

### 7. 创建PR

创建Pull Request并等待审核：

1. 访问GitHub仓库，切换到您的分支
2. 点击"Compare & pull request"
3. 填写PR标题和描述
4. 关联相关Issue
5. 等待维护者审核
6. 根据反馈进行修改
7. 审核通过后，PR将被合并

## 代码审查标准

### 1. 代码质量

- 代码必须符合ESLint和Prettier规范
- 所有TypeScript类型检查必须通过
- 代码应具有良好的可读性和可维护性
- 避免重复代码
- 使用适当的变量和函数命名

### 2. 测试要求

- 新功能必须添加相应的测试
- 测试覆盖率应不低于90%
- 测试应覆盖正常情况和边界情况
- 测试应具有明确的断言

### 3. 文档要求

- 新功能必须更新相关文档
- 公共API必须添加JSDoc注释
- 复杂功能应添加使用示例

### 4. 性能要求

- 代码应具有良好的性能
- 避免不必要的计算和渲染
- 对于大数据集，应考虑性能优化

## CI/CD流程

项目使用GitHub Actions进行持续集成和持续部署：

- 当代码推送到GitHub时，自动运行测试和构建
- 只有通过所有测试的代码才能合并到main分支
- 合并到main分支后，自动生成API文档

## 版本管理

项目使用语义化版本控制（Semantic Versioning）：

- 主版本号（Major）：不兼容的API变更
- 次版本号（Minor）：向后兼容的新功能
- 修订号（Patch）：向后兼容的bug修复

## 发布流程

发布新版本由维护者完成，流程如下：

1. 更新版本号
2. 生成变更日志
3. 发布到npm
4. 创建版本标签

```bash
# 更新版本号
npm version <major|minor|patch>

# 发布到npm
npm publish
```

## 代码规范

我们使用ESLint和Prettier来保持代码风格的一致性：

```bash
# 运行代码检查
npm run lint

# 自动修复代码风格问题
npm run format
```

### TypeScript规范

- 所有代码必须使用TypeScript编写
- 所有公共API必须有明确的类型定义
- 避免使用 `any`类型，除非确实必要
- 尽量使用接口（interface）而不是类型别名（type）来定义对象类型
- 使用联合类型表示有限集合的值

## 类型系统设计

TaroViz的类型系统是其核心优势之一，我们非常重视类型定义的质量。主要的类型定义位于：

- `packages/core/src/types/`: 核心类型定义
- `types.d.ts`: 全局类型声明

在开发新功能时，请注意以下事项：

1. 确保类型之间不产生循环依赖
2. 避免重复定义相同的类型
3. 为复杂类型添加文档注释
4. 使用命名空间避免名称冲突

### 类型导出注意事项

由于包之间存在依赖关系，当多个包导出同名类型时可能会产生冲突。我们采用以下策略来避免冲突：

- 核心类型定义在 `@agions/core`包中
- 其他包通过导入核心包的类型来扩展，而不是重新定义
- 在主包中导出类型时，使用命名空间或重命名策略避免冲突

例如：

```typescript
// 正确的做法
import { BaseType } from '@agions/core';
export interface ExtendedType extends BaseType {
  // 扩展属性...
}

// 错误的做法
export interface BaseType { // 与核心包中的类型同名
  // ...
}
```

## 适配器开发

如果您需要为新平台添加适配器，请遵循以下步骤：

1. 在 `packages/adapters/src/`中创建新的适配器目录
2. 实现 `Adapter`接口（在 `@agions/core/types`中定义）
3. 在 `packages/adapters/src/index.ts`中注册新适配器
4. 添加适当的测试和文档

## 提交规范

我们使用[Conventional Commits](https://www.conventionalcommits.org/)规范：

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码风格变更（不影响功能）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 添加或修改测试
- `build`: 构建系统或外部依赖变更
- `ci`: CI配置变更
- `chore`: 其他变更

提交示例：

```
feat(charts): 添加雷达图组件
fix(adapters): 修复微信小程序适配器初始化问题
docs: 更新安装说明
```

## 发布流程

发布新版本由维护者完成，流程如下：

1. 更新版本号
2. 生成变更日志
3. 发布到npm
4. 创建版本标签

```bash
# 更新版本号
npm version <major|minor|patch>

# 发布到npm
npm publish
```

## 问题和讨论

如果您有任何问题或想法，可以：

- 创建GitHub Issues
- 在Pull Request中讨论
- 联系维护者

感谢您的贡献！
