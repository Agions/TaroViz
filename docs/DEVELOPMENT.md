# TaroViz 开发环境配置指南

## 1. 开发环境要求与配置步骤

### 通用环境要求
- **Node.js**: v16.0.0或更高版本（推荐使用v18.x LTS版本）
- **npm**: v8.0.0或更高版本，或**yarn**: v1.22.0或更高版本
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

### 支付宝小程序
1. 下载并安装[支付宝小程序开发者工具](https://opendocs.alipay.com/mini/ide/download)
2. 在工具中配置：
   - 关闭域名检查
   - 开启默认编译ES6

### 鸿蒙OS
1. 按照鸿蒙开发文档配置开发环境
2. 安装DevEco Studio

## 2. 必要的全局依赖安装命令

```bash
# 安装Node.js和npm (使用nvm管理Node版本)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm install 18
nvm use 18

# 安装Taro CLI (全局)
npm install -g @tarojs/cli

# 全局工具 (可选但推荐)
npm install -g typescript
npm install -g eslint
npm install -g prettier
npm install -g rollup

# 克隆项目并安装依赖
git clone https://github.com/agions/taroviz.git
cd taroviz
npm install
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
# 开发模式(监视文件变化)
npm run dev

# H5环境开发
npm run build:h5

# 微信小程序开发
npm run build:weapp

# 支付宝小程序开发
npm run build:alipay

# 鸿蒙OS开发
npm run build:harmony

# 构建所有平台
npm run build:all

# TypeScript类型检查
npm run type-check

# 代码风格检查
npm run lint

# 代码风格自动修复
npm run lint:fix
```

### 构建命令
```bash
# 清理构建目录
npm run clean

# 构建生产版本
npm run build

# 运行测试
npm test

# 在发布前准备(自动运行build)
npm run prepare
```

### 示例项目启动
```bash
# 进入示例目录
cd demo

# 安装依赖
npm install

# 运行H5示例
npm run dev:h5

# 运行微信小程序示例
npm run dev:weapp
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

#### H5
- **问题**: ECharts实例未正确渲染
  - **解决方案**: 1. 检查容器元素是否正确设置了宽高 2. 确保在组件挂载后初始化图表 3. 使用resize方法响应容器尺寸变化

#### 鸿蒙OS
- **问题**: 组件兼容性问题
  - **解决方案**: 1. 使用条件编译 2. 添加平台特定适配代码 3. 参考鸿蒙开发文档进行调整

### 打包相关问题

- **问题**: 打包体积过大
  - **解决方案**: 1. 使用按需加载ECharts模块 2. 开启tree-shaking 3. 分离依赖和应用代码

- **问题**: Rollup配置问题
  - **解决方案**: 1. 检查external配置 2. 确保正确处理CSS文件 3. 配置适当的输出格式

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
- **GitLens**: Git集成
- **EditorConfig**: 统一编辑器配置
- **Sass/Less支持插件**: CSS预处理器支持

#### 浏览器插件
- **React Developer Tools**: React组件调试
- **Redux DevTools**: 状态管理调试
- **Taro Inspector**: Taro应用调试
- **ECharts Explorer**: ECharts调试

## 6. TaroViz开发最佳实践

### 组件开发

1. **平台差异处理**
   ```tsx
   // 使用条件编译处理平台差异
   import { ECharts } from 'taroviz';

   const MyChart = () => {
     // 不同平台的配置差异
     let chartConfig = {};

     if (process.env.TARO_ENV === 'h5') {
       // H5特有配置
       chartConfig = { renderer: 'canvas' };
     } else if (process.env.TARO_ENV === 'weapp') {
       // 小程序特有配置
       chartConfig = { renderer: 'svg' };
     }

     return <ECharts {...chartConfig} option={option} />;
   };
   ```

2. **性能优化**
   - 避免频繁更新option
   - 使用notMerge属性控制配置合并
   - 使用lazyUpdate延迟更新
   - 合理设置节流和防抖

3. **类型安全**
   - 为所有组件和函数提供完整类型定义
   - 使用ECharts提供的类型声明
   - 创建自定义类型扩展

### 测试策略

1. **单元测试**
   - 测试核心功能和API
   - 使用Jest进行快照测试
   - 模拟ECharts实例

2. **集成测试**
   - 测试不同平台的渲染结果
   - 验证事件处理
   - 检查性能和内存使用

3. **端到端测试**
   - 在实际设备上测试
   - 验证用户交互
   - 检查不同环境下的兼容性

### 贡献示例

贡献新功能或修复bug时，请提供完整的示例代码:

```tsx
// 示例：添加新图表类型支持
import React from 'react';
import { View } from '@tarojs/components';
import { ECharts } from 'taroviz';

export default function SunburstChartExample() {
  const option = {
    series: [{
      type: 'sunburst',
      data: [/* 数据 */],
      radius: [0, '90%'],
      label: {
        rotate: 'radial'
      }
    }]
  };

  return (
    <View className='example-container'>
      <ECharts
        option={option}
        width='100%'
        height='300px'
      />
    </View>
  );
}
```

## 小结

本指南提供了TaroViz开发环境的基本配置步骤和工具推荐。遵循这些指南，可以快速搭建一个高效的开发环境，提升多平台图表组件的开发效率。随着项目的发展，可能需要根据具体需求调整配置。如有问题，请参考官方文档或在社区中提问。

祝您开发顺利！
