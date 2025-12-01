# 贡献指南

我们欢迎任何形式的贡献，包括但不限于：

- 提交问题和建议
- 改进文档
- 修复 bug
- 添加新功能
- 优化性能

## 1. 提交问题和建议

如果您在使用 TaroViz 时遇到问题，或者有任何建议，可以通过以下方式提交：

1. [GitHub Issues](https://github.com/agions/taroviz/issues) - 提交问题和建议
2. [GitHub Discussions](https://github.com/agions/taroviz/discussions) - 参与讨论

### 1.1 提交问题

在提交问题时，请提供以下信息：

- TaroViz 版本
- Taro 版本
- 运行平台
- 完整的错误信息
- 复现步骤
- 预期行为
- 实际行为
- 代码示例（如果可能）

### 1.2 提交建议

在提交建议时，请提供以下信息：

- 建议的功能或改进
- 功能的用途和价值
- 实现思路（如果有）
- 相关参考（如果有）

## 2. 开发流程

### 2.1 Fork 仓库

首先，您需要 Fork TaroViz 仓库到您的 GitHub 账号：

1. 访问 [TaroViz 仓库](https://github.com/agions/taroviz)
2. 点击右上角的 "Fork" 按钮

### 2.2 克隆仓库

将 Fork 后的仓库克隆到本地：

```bash
git clone https://github.com/your-username/taroviz.git
cd taroviz
```

### 2.3 安装依赖

使用 pnpm 安装依赖：

```bash
pnpm install
```

### 2.4 创建分支

创建一个新的分支用于开发：

```bash
git checkout -b feature/your-feature-name
```

### 2.5 开发

开始开发，确保遵循以下规则：

1. 遵循代码风格指南
2. 编写测试用例
3. 更新文档
4. 确保构建通过

### 2.6 运行测试

在提交代码之前，确保所有测试都通过：

```bash
# 运行单元测试
pnpm test

# 运行端到端测试
pnpm test:e2e

# 运行类型检查
pnpm type-check

# 运行 lint 检查
pnpm lint
```

### 2.7 构建

确保项目可以正常构建：

```bash
pnpm build
```

### 2.8 提交代码

提交代码，确保提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
git add .
git commit -m "feat: 添加新功能"
git push origin feature/your-feature-name
```

### 2.9 创建 Pull Request

创建 Pull Request 到 TaroViz 仓库：

1. 访问您 Fork 的仓库
2. 点击 "Compare & pull request" 按钮
3. 填写 Pull Request 标题和描述
4. 点击 "Create pull request" 按钮

## 3. 代码风格指南

### 3.1 TypeScript 风格

1. 使用 TypeScript strict 模式
2. 避免使用 `any` 类型
3. 使用接口定义对象类型
4. 使用类型别名定义复杂类型
5. 使用枚举定义常量

### 3.2 命名规范

1. 类名使用 PascalCase
2. 函数名使用 camelCase
3. 变量名使用 camelCase
4. 常量名使用 UPPER_SNAKE_CASE
5. 接口名使用 PascalCase，以 `I` 开头（可选）
6. 类型别名使用 PascalCase
7. 枚举名使用 PascalCase

### 3.3 代码格式

1. 使用 Prettier 格式化代码
2. 缩进使用 2 个空格
3. 行宽限制为 120 个字符
4. 使用单引号
5. 结尾不使用分号
6. 使用 `===` 和 `!==` 进行比较
7. 使用模板字符串代替字符串拼接

### 3.4 注释

1. 使用 JSDoc 注释
2. 为公共 API 添加注释
3. 为复杂逻辑添加注释
4. 为测试用例添加注释

## 4. 测试指南

### 4.1 单元测试

1. 使用 Jest 编写单元测试
2. 测试文件放在 `__tests__` 目录下
3. 测试文件名使用 `.test.ts` 或 `.test.tsx` 后缀
4. 为每个功能模块编写测试
5. 测试覆盖率目标：90% 以上

### 4.2 端到端测试

1. 使用 Cypress 编写端到端测试
2. 测试文件放在 `cypress/e2e` 目录下
3. 测试文件名使用 `.cy.ts` 后缀
4. 测试核心功能和常见场景
5. 测试跨平台兼容性

## 5. 文档指南

### 5.1 API 文档

1. 使用 JSDoc 注释生成 API 文档
2. 为每个公共 API 添加详细的注释
3. 包括参数、返回值、示例等
4. 使用 `npm run docs:api` 生成 API 文档

### 5.2 使用指南

1. 编写清晰、简洁的使用指南
2. 包括快速开始、基础使用、高级使用等
3. 提供完整的代码示例
4. 解释核心概念和最佳实践

### 5.3 示例

1. 提供丰富的示例
2. 包括基础示例、高级示例、平台特定示例等
3. 示例代码应该可运行、可复用
4. 示例应该覆盖常见使用场景

## 6. 发布流程

### 6.1 版本号规则

使用 [Semantic Versioning](https://semver.org/) 版本号规则：

- `MAJOR` 版本：不兼容的 API 变化
- `MINOR` 版本：向后兼容的功能添加
- `PATCH` 版本：向后兼容的 bug 修复

### 6.2 发布步骤

1. 更新 `package.json` 中的版本号
2. 更新 `CHANGELOG.md`
3. 运行测试和构建
4. 提交代码
5. 创建 GitHub Release
6. 发布到 npm

## 7. 行为准则

我们期望所有贡献者遵循以下行为准则：

1. 尊重他人
2. 包容不同观点
3. 保持专业
4. 关注社区利益
5. 遵守法律法规

## 8. 贡献者列表

感谢所有为 TaroViz 做出贡献的开发者！

- [Contributors](https://github.com/agions/taroviz/graphs/contributors)

## 9. 许可证

TaroViz 使用 [MIT License](https://github.com/agions/taroviz/blob/main/LICENSE)。
