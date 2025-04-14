# TaroViz 贡献指南

感谢您对TaroViz的关注！我们非常欢迎社区贡献，无论是功能开发、问题修复、文档完善还是使用反馈。本指南将帮助您了解如何参与TaroViz的开发和改进。

## 行为准则

参与TaroViz项目意味着您同意遵守我们的行为准则：

- 尊重所有参与者，不论经验水平、性别、性取向、残疾状况、种族或宗教信仰
- 使用友善和包容的语言
- 对不同观点和经验持开放态度
- 优雅地接受建设性批评
- 关注对社区最有利的事情

## 如何贡献

### 报告Bug

如果您发现了Bug，请在GitHub Issues中创建一个新的Issue，并包含以下信息：

1. Bug的清晰描述
2. 复现步骤（越详细越好）
3. 预期行为与实际行为
4. TaroViz版本、Taro版本和运行环境（如微信开发者工具版本、操作系统等）
5. 可能的解决方案（如果有）

### 提出新功能

1. 在提交Pull Request前，先创建一个Issue讨论您的想法
2. 清晰地描述该功能的用途和价值
3. 如有可能，提供使用示例或设计方案

### 提交Pull Request

1. Fork项目仓库
2. 创建您的特性分支：`git checkout -b feature/your-feature`
3. 提交您的更改：`git commit -am 'feat: add some feature'`
4. 推送到分支：`git push origin feature/your-feature`
5. 提交Pull Request

## 开发流程

### 1. 环境搭建

```bash
# 克隆项目
git clone https://github.com/yourusername/taroviz.git
cd taroviz

# 安装依赖
pnpm install

# 链接本地包
pnpm run bootstrap
```

### 2. 开发规范

#### 代码风格

本项目使用ESLint和Prettier进行代码风格检查和格式化，请确保您的代码符合项目规范：

```bash
# 检查代码风格
pnpm run lint

# 自动修复
pnpm run lint:fix
```

#### 提交规范

我们使用[约定式提交](https://www.conventionalcommits.org/zh-hans/)规范，提交信息格式如下：

```
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

常用的提交类型：

- `feat`: 新功能
- `fix`: 修复Bug
- `docs`: 文档变更
- `style`: 代码格式变更（不影响代码运行的变动）
- `refactor`: 重构（既不是新增功能，也不是修复Bug的代码变动）
- `perf`: 性能优化
- `test`: 增加测试
- `chore`: 构建过程或辅助工具的变动
- `ci`: 持续集成相关的改动

示例：

```
feat(charts): 添加雷达图组件

- 支持基本雷达图配置
- 支持自定义样式
- 支持交互事件

关联 #123
```

### 3. 测试

添加或修改功能后，请确保添加相应的测试用例：

```bash
# 运行测试
pnpm run test

# 查看测试覆盖率
pnpm run test:coverage
```

### 4. 文档

如果您添加了新功能或修改了现有功能，请同时更新相应的文档：

```bash
# 生成API文档
pnpm run docs:api

# 预览文档
pnpm run docs:serve
```

## 项目结构

```
taroviz/
├── packages/              # 核心包
│   ├── core/              # 核心渲染引擎
│   ├── components/        # 图表组件
│   ├── hooks/             # React Hooks
│   └── adapters/          # 平台适配器
├── examples/              # 示例项目
├── docs/                  # 文档
├── scripts/               # 构建和开发脚本
├── tests/                 # 测试
└── package.json           # 项目配置
```

## 版本发布

TaroViz使用语义化版本控制，版本号格式为：`主版本号.次版本号.修订号`

- 主版本号：做了不兼容的API修改
- 次版本号：做了向下兼容的功能性新增
- 修订号：做了向下兼容的问题修正

维护者会根据PR的内容决定下一个版本号。

## 获取帮助

如果您在贡献过程中遇到任何问题，可以通过以下方式获取帮助：

- GitHub Issues
- 项目讨论区
- 联系维护者

## 致谢

再次感谢您对TaroViz的贡献！您的参与对于项目的发展至关重要。
