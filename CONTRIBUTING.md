# 贡献指南

感谢您考虑为TaroViz做出贡献！本指南旨在帮助您顺利地为项目做出贡献。

## 目录

- [行为准则](#行为准则)
- [如何开始](#如何开始)
  - [环境搭建](#环境搭建)
  - [项目结构](#项目结构)
- [开发流程](#开发流程)
  - [分支策略](#分支策略)
  - [提交规范](#提交规范)
- [开发标准](#开发标准)
  - [代码风格](#代码风格)
  - [测试要求](#测试要求)
  - [文档要求](#文档要求)
- [提交变更](#提交变更)
  - [Issue流程](#issue流程)
  - [Pull Request流程](#pull-request流程)
- [发布流程](#发布流程)
- [社区互动](#社区互动)


## 如何开始

### 环境搭建

1. Fork本仓库
2. Clone您的fork到本地
   ```bash
   git clone https://github.com/yourusername/taroviz.git
   cd taroviz
   ```
3. 安装依赖
   ```bash
   npm install
   ```
4. 设置上游仓库
   ```bash
   git remote add upstream https://github.com/agions/taroviz.git
   ```

有关详细的开发环境配置，请参阅我们的[开发环境配置指南](docs/DEVELOPMENT.md)。

### 项目结构

```
taroviz/
├── src/               # 源代码
│   ├── components/    # 组件
│   ├── utils/         # 工具函数
│   ├── types/         # 类型定义
│   └── index.ts       # 入口文件
├── dist/              # 构建输出
├── docs/              # 文档
├── tests/             # 测试文件
├── examples/          # 示例代码
└── config/            # 配置文件
```

## 开发流程

### 分支策略

- `main`: 稳定版本分支
- `develop`: 开发分支
- `feature/*`: 新功能分支
- `bugfix/*`: 错误修复分支
- `release/*`: 发布准备分支

### 提交规范

我们使用[约定式提交](https://www.conventionalcommits.org/)规范:

```
<类型>[可选作用域]: <描述>

[可选正文]

[可选脚注]
```

类型包括:
- `feat`: 新功能
- `fix`: 修复Bug
- `docs`: 文档更新
- `style`: 代码样式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

## 开发标准

### 代码风格

我们使用ESLint和Prettier来保持代码风格一致:

```bash
# 检查代码
npm run lint

# 自动修复问题
npm run lint:fix
```

### 测试要求

所有代码变更需要有相应的测试:

```bash
# 运行测试
npm test

# 查看测试覆盖率
npm run test:coverage
```

### 文档要求

对于新特性或API更改:
- 更新README.md中的相关描述
- 更新相关组件文档
- 提供使用示例

## 提交变更

### Issue流程

1. 使用Issue模板创建新Issue
2. 清晰描述问题或需求
3. 添加合适的标签
4. 等待维护者分配

### Pull Request流程

1. 确保本地分支同步最新上游变更
2. 创建功能分支
3. 实现更改并提交
4. 运行测试确认通过
5. 推送到您的Fork
6. 创建Pull Request并链接相关Issue
7. 等待代码审查

## 发布流程

1. 更新版本号(使用[语义化版本](https://semver.org/))
2. 更新CHANGELOG.md
3. 创建发布标签
4. 发布到npm

## 社区互动

- 使用[Discussions](https://github.com/agions/taroviz/discussions)讨论想法
- 参与Issue评论
- 在PR中提供建设性反馈

感谢您的贡献！
