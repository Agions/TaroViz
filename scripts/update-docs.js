/**
 * 文档更新脚本
 * 用于生成API文档和预览
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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
 * 检查目录是否存在，不存在则创建
 */
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    log(`创建目录: ${dir}`, colors.yellow);
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * 生成API文档
 */
function generateApiDocs() {
  log('开始生成API文档...', colors.cyan);
  
  // 检查typedoc是否安装
  try {
    execSync('npx typedoc --version', { stdio: 'pipe' });
  } catch (error) {
    log('TypeDoc未安装，正在安装...', colors.yellow);
    if (!runCommand('npm install -g typedoc', 'TypeDoc安装失败')) {
      return false;
    }
  }
  
  // 运行typedoc
  if (!runCommand('npx typedoc --options typedoc.json', 'API文档生成失败')) {
    return false;
  }
  
  log('API文档生成成功!', colors.green);
  return true;
}

/**
 * 预览文档
 */
function serveDocumentation() {
  log('准备启动文档预览服务...', colors.cyan);
  
  // 检查serve是否安装
  try {
    execSync('npx serve --version', { stdio: 'pipe' });
  } catch (error) {
    log('serve未安装，正在安装...', colors.yellow);
    if (!runCommand('npm install -g serve', 'serve安装失败')) {
      return false;
    }
  }
  
  // 确保docs-api目录存在
  if (!fs.existsSync('docs-api')) {
    log('文档目录不存在，请先生成文档', colors.red);
    return false;
  }
  
  // 启动serve
  log('启动文档服务器，按Ctrl+C停止...', colors.green);
  execSync('npx serve docs-api', { stdio: 'inherit' });
  return true;
}

/**
 * 显示帮助信息
 */
function showHelp() {
  log('\n文档更新工具使用说明:', colors.cyan);
  log('  node scripts/update-docs.js [命令]', colors.reset);
  log('\n可用命令:', colors.cyan);
  log('  generate  - 生成API文档', colors.reset);
  log('  serve     - 启动文档预览服务器', colors.reset);
  log('  all       - 生成并预览文档', colors.reset);
  log('  help      - 显示此帮助信息', colors.reset);
  log('\n示例:', colors.cyan);
  log('  node scripts/update-docs.js generate', colors.reset);
  log('  node scripts/update-docs.js serve', colors.reset);
}

/**
 * 主函数
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'all';
  
  switch (command) {
    case 'generate':
      generateApiDocs();
      break;
    case 'serve':
      serveDocumentation();
      break;
    case 'all':
      if (generateApiDocs()) {
        serveDocumentation();
      }
      break;
    case 'help':
    default:
      showHelp();
      break;
  }
}

// 执行主函数
main(); 