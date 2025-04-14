# TaroViz 贡献指南

感谢您对TaroViz项目的关注！我们欢迎来自社区的贡献，无论是修复bug、改进文档还是添加新功能。本指南将帮助您了解如何参与贡献。

## 开发环境设置

首先，克隆仓库并安装依赖：

```bash
git clone https://github.com/yourusername/taroviz.git
cd taroviz
npm install
```

TaroViz使用Lerna进行多包管理，初始化Lerna工作区：

```bash
npm run bootstrap
```

## 项目结构

TaroViz项目采用了模块化的结构，主要包括以下目录：

```
taroviz/
├── packages/
│   ├── core/         # 核心功能和类型定义
│   ├── adapters/     # 平台适配器
│   ├── charts/       # 图表组件
│   ├── hooks/        # React hooks
│   ├── themes/       # 主题系统
│   ├── data/         # 数据处理工具
│   └── all/          # 整合包，导出所有功能
├── examples/         # 使用示例
├── docs/             # 文档
├── scripts/          # 构建和开发脚本
└── tests/            # 测试
```

## 开发流程

1. **创建分支**：从main分支创建一个新的功能分支或修复分支
2. **开发**：在本地进行开发和测试
3. **构建**：使用构建命令确保代码能够正确编译

```bash
# 开发模式（监视文件变化）
npm run dev

# 构建所有包
npm run build

# 按依赖顺序构建
npm run build:order

# 构建单个包
npm run build:core
npm run build:adapters
# 等等...
```

4. **测试**：运行测试确保功能正常

```bash
npm run test
```

5. **提交**：提交代码并推送到远程仓库
6. **创建PR**：创建Pull Request并等待审核

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

1. 更新版本号（使用Lerna）
2. 生成变更日志
3. 发布到npm
4. 创建版本标签

```bash
# 更新版本
npm run version

# 发布
npm run publish
```

## 问题和讨论

如果您有任何问题或想法，可以：

- 创建GitHub Issues
- 在Pull Request中讨论
- 联系维护者

感谢您的贡献！
