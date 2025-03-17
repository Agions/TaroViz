# Taro ECharts组件开发环境快速配置指南

## 1. 各平台开发环境要求与配置步骤

### 通用环境要求
- **Node.js**: v14.0.0或更高版本（推荐使用v16.x LTS版本）
- **npm**: v6.0.0或更高版本，或**yarn**: v1.22.0或更高版本
- **Git**: 最新稳定版

### 微信小程序
1. 下载并安装[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 在微信开发者工具中启用设置：
   - 设置 → 项目设置 → 开启调试模式
   - 设置 → 项目设置 → 开启ES6转ES5
   - 设置 → 项目设置 → 不校验合法域名
3. 配置AppID（测试可使用测试号）

### H5
1. 确保已安装现代浏览器（Chrome、Firefox、Safari等）
2. 安装浏览器调试插件：
   - Chrome DevTools
   - React Developer Tools
   - Redux DevTools（如果使用Redux）

### 支付宝小程序
1. 下载并安装[支付宝小程序开发者工具](https://opendocs.alipay.com/mini/ide/download)
2. 在工具中配置：
   - 关闭域名检查
   - 开启默认编译ES6

### React Native
1. 按照[React Native官方文档](https://reactnative.dev/docs/environment-setup)配置开发环境
2. 安装额外依赖：
   ```bash
   # iOS开发环境 (仅macOS)
   brew install watchman
   sudo gem install cocoapods

   # Android开发环境
   # 安装Android Studio和配置ANDROID_HOME环境变量
   ```
3. 安装模拟器或连接真机

## 2. 必要的全局依赖安装命令

```bash
# 安装Node.js和npm (使用nvm管理Node版本)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm install 16
nvm use 16

# 安装Taro CLI (全局)
npm install -g @tarojs/cli

# 全局工具 (可选但推荐)
npm install -g typescript
npm install -g eslint
npm install -g prettier
npm install -g rollup

# 克隆项目并安装依赖
git clone https://github.com/agions/tarojs-echarts.git
cd tarojs-echarts
npm install

# 针对React Native环境额外依赖
npm install -g react-native-cli
```

## 3. 开发调试命令说明

### 项目初始化与依赖管理
```bash
# 安装项目依赖
npm install

# 重新生成lock文件(修复依赖问题)
rm -rf node_modules package-lock.json
npm install
```

### 开发命令
```bash
# H5环境开发
npm run dev:h5

# 微信小程序开发
npm run dev:weapp

# 支付宝小程序开发
npm run dev:alipay

# React Native开发
npm run dev:rn

# TypeScript类型检查
npm run type-check

# 代码风格检查
npm run lint

# 代码风格自动修复
npm run lint:fix
```

### 构建命令
```bash
# 构建所有平台
npm run build

# 构建特定平台
npm run build:h5
npm run build:weapp
npm run build:alipay
npm run build:rn

# 构建组件库
npm run build:lib
```

### 组件调试
```bash
# 运行示例程序
npm run example

# 启动调试环境(监视文件变化)
npm run start

# 运行测试
npm run test
```

## 4. 常见开发环境问题解决方案

### Node.js和npm相关问题

| 问题 | 解决方案 |
|------|---------|
| 依赖安装失败 | 1. 清除npm缓存: `npm cache clean --force`<br>2. 使用淘宝镜像: `npm config set registry https://registry.npmmirror.com`<br>3. 删除node_modules重新安装: `rm -rf node_modules && npm install` |
| 版本冲突 | 1. 使用`npm-check-updates`检查并更新依赖<br>2. 检查package.json中的peer dependencies |
| 内存溢出错误 | 增加Node内存限制: `NODE_OPTIONS=--max_old_space_size=4096 npm run build` |

### 平台特定问题

#### 微信小程序
- **问题**: 无法预览或真机调试
  - **解决方案**: 1. 检查AppID配置 2. 确认开发者工具版本 3. 删除dist文件夹重新构建

- **问题**: Canvas组件渲染问题
  - **解决方案**: 1. 检查Canvas的ID和context获取方式 2. 确保使用Taro.createCanvasContext 3. 添加type='2d'属性

#### 支付宝小程序
- **问题**: 样式不一致
  - **解决方案**: 1. 使用postcss适配 2. 检查rpx转换规则 3. 添加平台特定样式

- **问题**: API调用失败
  - **解决方案**: 1. 使用Taro.getEnv()判断环境 2. 使用process.env.TARO_ENV进行条件编译

#### React Native
- **问题**: 原生模块链接问题
  - **解决方案**: 1. 运行`react-native link` 2. 手动检查原生模块配置 3. 使用`pod install`更新iOS依赖

- **问题**: WebView渲染ECharts问题
  - **解决方案**: 1. 确保HTMLContent正确加载 2. 注入正确的echarts脚本 3. 使用postMessage进行通信

### 通用问题

- **问题**: TypeScript类型错误
  - **解决方案**: 1. 更新@types依赖 2. 检查tsconfig.json配置 3. 添加必要的类型声明

- **问题**: 构建产物体积过大
  - **解决方案**: 1. 使用按需加载 2. 优化图表组件注册 3. 配置tree-shaking

## 5. 高效开发的IDE设置与插件推荐

### VSCode设置

推荐在项目根目录创建`.vscode/settings.json`文件，包含以下设置：

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true
}
```

### 推荐插件

#### VSCode插件
- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **TypeScript Hero**: TS导入管理
- **Path Intellisense**: 路径自动完成
- **React Native Tools**: RN开发支持
- **Taro开发助手**: Taro开发辅助
- **GitLens**: Git集成
- **EditorConfig**: 统一编辑器配置
- **Sass/Less/Stylus支持插件**: CSS预处理器支持

#### 浏览器插件
- **React Developer Tools**: React组件调试
- **Redux DevTools**: 状态管理调试
- **Taro Inspector**: Taro应用调试
- **Echarts Explorer**: ECharts调试

### 效率提升技巧

1. **代码片段**：创建常用的Taro ECharts组件代码片段
   ```json
   // 在VSCode中添加自定义代码片段
   {
     "Taro ECharts Component": {
       "prefix": "tarocharts",
       "body": [
         "import React from 'react';",
         "import { ECharts } from 'tarojs-echarts';",
         "",
         "const $1 = () => {",
         "  const option = {",
         "    $2",
         "  };",
         "",
         "  return (",
         "    <ECharts",
         "      option={option}",
         "      width='100%'",
         "      height='300px'",
         "    />",
         "  );",
         "};",
         "",
         "export default $1;"
       ],
       "description": "创建Taro ECharts组件"
     }
   }
   ```

2. **终端集成**：
   - 在VSCode中使用集成终端同时运行开发和类型检查
   - 配置npm脚本，组合常用命令

3. **工作区设置**：使用VSCode工作区管理组件库和示例应用

4. **调试配置**：
   ```json
   // launch.json示例配置
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug H5",
         "type": "chrome",
         "request": "launch",
         "url": "http://localhost:10086",
         "webRoot": "${workspaceFolder}/dist"
       },
       {
         "name": "Debug RN",
         "type": "reactnative",
         "request": "launch",
         "platform": "android"
       }
     ]
   }
   ```

5. **Git Hooks**：
   - 使用husky配置pre-commit钩子
   - 使用lint-staged在提交前运行代码检查和格式化

## 小结

本指南提供了Taro ECharts组件开发环境的基本配置步骤和工具推荐。遵循这些指南，可以快速搭建一个高效的开发环境，提升多平台图表组件的开发效率。随着项目的发展，可能需要根据具体需求调整配置。如有问题，请参考官方文档或在社区中提问。

祝您开发顺利！
