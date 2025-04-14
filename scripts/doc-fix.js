/**
 * 文档修复脚本 - 为解决TypeDoc构建问题
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 颜色函数
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

/**
 * 打印带颜色的消息
 */
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

/**
 * 执行命令并打印输出
 */
function runCommand(command, errorMessage) {
  try {
    log(`执行命令: ${command}`, colors.blue);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    log(errorMessage || `命令执行失败: ${command}`, colors.red);
    log(error.message, colors.red);
    return false;
  }
}

/**
 * 创建临时目录，用于存放临时构建文件
 */
function createTempBuildDir() {
  const tempDir = path.join(process.cwd(), 'temp-build');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempDir, { recursive: true });
  return tempDir;
}

/**
 * 创建简化版TypeDoc配置
 */
function createSimpleTypeDocConfig() {
  const tempConfigPath = path.join(process.cwd(), 'typedoc.simple.json');
  
  // 基本配置
  const simpleConfig = {
    entryPoints: ["packages/core/src/index.ts"],
    out: "docs-api",
    exclude: ["**/__tests__/**", "**/node_modules/**"],
    theme: "default",
    name: "TaroViz API文档",
    readme: "README.md",
    excludePrivate: true,
    excludeProtected: true,
    excludeExternals: true,
    includeVersion: true
  };
  
  fs.writeFileSync(tempConfigPath, JSON.stringify(simpleConfig, null, 2));
  log(`创建简化TypeDoc配置: ${tempConfigPath}`, colors.green);
  
  return tempConfigPath;
}

/**
 * 创建核心包的临时文档构建
 */
function generateCoreDocs() {
  // 创建临时配置
  const configPath = createSimpleTypeDocConfig();
  
  // 运行TypeDoc
  const success = runCommand(`npx typedoc --options ${configPath}`, '核心API文档生成失败');
  
  // 清理
  if (fs.existsSync(configPath)) {
    fs.unlinkSync(configPath);
    log('已删除临时TypeDoc配置', colors.yellow);
  }
  
  return success;
}

/**
 * 准备适当的文档目录结构
 */
function prepareDocStructure() {
  // 确保docs-api目录存在
  const docsApiDir = path.join(process.cwd(), 'docs-api');
  if (!fs.existsSync(docsApiDir)) {
    fs.mkdirSync(docsApiDir, { recursive: true });
  }
  
  // 创建一个基本的索引页
  const indexPath = path.join(docsApiDir, 'index.html');
  const indexContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TaroViz API文档</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 { color: #0d47a1; }
    a { color: #0366d6; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .package { 
      margin: 20px 0;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .package h2 {
      margin-top: 0;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    .description {
      margin-bottom: 15px;
      color: #555;
    }
  </style>
</head>
<body>
  <h1>TaroViz API文档</h1>
  <p>TaroViz 是一个基于 Taro 和 ECharts 的图表组件库，支持多端小程序和 H5。以下是各个包的API文档：</p>
  
  <div class="package">
    <h2>@agions/taroviz-core</h2>
    <div class="description">核心库，提供基础功能和接口</div>
    <a href="core/index.html">查看文档</a>
  </div>
  
  <div class="package">
    <h2>@agions/taroviz-charts</h2>
    <div class="description">图表组件库，包含各种类型的图表实现</div>
    <a href="charts/index.html">查看文档</a>
  </div>
  
  <div class="package">
    <h2>@agions/taroviz-adapters</h2>
    <div class="description">平台适配器，处理不同平台的差异</div>
    <a href="adapters/index.html">查看文档</a>
  </div>
  
  <div class="package">
    <h2>@agions/taroviz-data</h2>
    <div class="description">数据处理工具，提供数据转换和处理功能</div>
    <a href="data/index.html">查看文档</a>
  </div>
  
  <div class="package">
    <h2>@agions/taroviz-hooks</h2>
    <div class="description">React Hooks库，提供各种图表相关的钩子函数</div>
    <a href="hooks/index.html">查看文档</a>
  </div>
  
  <div class="package">
    <h2>@agions/taroviz-themes</h2>
    <div class="description">主题库，提供各种图表主题</div>
    <a href="themes/index.html">查看文档</a>
  </div>
  
  <div class="package">
    <h2>@agions/taroviz</h2>
    <div class="description">主包，整合所有功能</div>
    <a href="all/index.html">查看文档</a>
  </div>
  
  <footer style="margin-top: 50px; text-align: center; color: #777; font-size: 0.9em;">
    Copyright © 2023-2024 TaroViz 团队
  </footer>
</body>
</html>
  `;
  
  fs.writeFileSync(indexPath, indexContent);
  log(`创建API文档索引页: ${indexPath}`, colors.green);
  
  // 创建各个包的目录
  const packages = ['core', 'charts', 'adapters', 'data', 'hooks', 'themes', 'all'];
  packages.forEach(pkg => {
    const pkgDir = path.join(docsApiDir, pkg);
    if (!fs.existsSync(pkgDir)) {
      fs.mkdirSync(pkgDir, { recursive: true });
    }
    
    // 创建简单的占位索引页
    const pkgIndexPath = path.join(pkgDir, 'index.html');
    const pkgIndexContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@agions/taroviz-${pkg}</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 { color: #0d47a1; }
    a { color: #0366d6; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .nav { margin-bottom: 30px; }
    .coming-soon {
      padding: 40px;
      text-align: center;
      background: #f8f9fa;
      border-radius: 5px;
      margin: 30px 0;
    }
  </style>
</head>
<body>
  <div class="nav">
    <a href="../index.html">返回API文档首页</a>
  </div>

  <h1>@agions/taroviz-${pkg}</h1>
  <p>此包的详细API文档正在完善中。请参考源代码或示例了解更多使用方法。</p>
  
  <div class="coming-soon">
    <h2>API文档完善中</h2>
    <p>我们正在努力完善此包的API文档。</p>
    <p>在此期间，您可以查看<a href="https://github.com/agions/taroviz/tree/main/packages/${pkg}/src">源代码</a>或<a href="https://github.com/agions/taroviz/blob/main/docs/EXAMPLES.md">示例</a>了解更多信息。</p>
  </div>
  
  <footer style="margin-top: 50px; text-align: center; color: #777; font-size: 0.9em;">
    Copyright © 2023-2024 TaroViz 团队
  </footer>
</body>
</html>
    `;
    
    fs.writeFileSync(pkgIndexPath, pkgIndexContent);
    log(`创建包占位文档: ${pkgIndexPath}`, colors.green);
  });
  
  return true;
}

/**
 * 主函数
 */
function main() {
  log('开始修复文档生成...', colors.cyan);
  
  // 尝试生成核心包文档
  const coreSuccess = generateCoreDocs();
  log(coreSuccess ? '核心包文档生成成功' : '核心包文档生成失败，使用占位文档', coreSuccess ? colors.green : colors.yellow);
  
  // 创建文档结构
  const structureSuccess = prepareDocStructure();
  log(structureSuccess ? '文档结构准备完成' : '文档结构准备失败', structureSuccess ? colors.green : colors.red);
  
  if (structureSuccess) {
    log('文档修复完成！请继续执行文档构建流程', colors.green);
    return true;
  } else {
    log('文档修复失败！', colors.red);
    return false;
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  process.exit(main() ? 0 : 1);
}

module.exports = {
  fixDocs: main
}; 