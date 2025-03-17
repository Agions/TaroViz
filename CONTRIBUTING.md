# 贡献指南

感谢您考虑为taroviz组件做出贡献！无论是修复Bug、改进文档，还是实现新功能，您的参与对我们都很重要。本指南旨在帮助您顺利地为项目做出贡献。

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

## 行为准则

我们希望所有参与者创建一个友好、包容的环境。请参阅我们的[行为准则](CODE_OF_CONDUCT.md)以了解我们的期望。

## 如何开始

### 环境搭建

1. Fork本仓库
2. Clone您的fork到本地
   ```bash
   git clone https://github.com/agions/TaroViz.git
   cd tarojs-echarts
   ```
3. 安装依赖
   ```bash
   npm install
   ```
4. 设置上游仓库
   ```bash
   git remote add upstream https://github.com/original-repo/TaroViz.git
   ```

有关详细的开发环境配置，请参阅我们的[开发环境配置指南](docs/DEVELOPMENT.md)，其中包含各平台的环境要求、依赖安装、调试命令和常见问题解决方案。

### 项目结构
