/**
 * 文档更新脚本
 * 用于生成API文档和预览
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
// 引入文档修复工具
const { fixDocs } = require('./doc-fix');

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
  
  try {
    // 先使用文档修复工具创建基本文档结构
    log('使用文档修复工具...', colors.blue);
    const fixResult = fixDocs();
    
    if (fixResult) {
      log('文档基本结构已生成', colors.green);
      return true;
    } else {
      log('文档修复工具执行失败', colors.red);
      return false;
    }
  } catch (error) {
    log(`生成API文档时出错: ${error.message}`, colors.red);
    return false;
  }
}

/**
 * 生成HTML文档从Markdown
 */
function generateHtmlDocs() {
  log('开始生成HTML文档...', colors.cyan);
  
  // 复制文档文件
  if (fs.existsSync('docs')) {
    log('复制文档文件...', colors.blue);
    
    try {
      // 创建目标目录
      ensureDirectoryExists('docs-dist');
      ensureDirectoryExists('docs-dist/guides');
      
      // 读取docs目录中的所有文件
      const files = fs.readdirSync('docs');
      
      files.forEach(file => {
        const sourcePath = path.join('docs', file);
        const stat = fs.statSync(sourcePath);
        
        if (stat.isDirectory() && file !== 'node_modules') {
          // 目录递归复制
          const targetDir = path.join('docs-dist', file);
          ensureDirectoryExists(targetDir);
          
          const nestedFiles = fs.readdirSync(sourcePath);
          nestedFiles.forEach(nestedFile => {
            const nestedSourcePath = path.join(sourcePath, nestedFile);
            const nestedStat = fs.statSync(nestedSourcePath);
            
            if (nestedStat.isFile()) {
              const nestedTargetPath = path.join('docs-dist', file, nestedFile);
              fs.copyFileSync(nestedSourcePath, nestedTargetPath);
              log(`复制: ${nestedSourcePath} -> ${nestedTargetPath}`, colors.green);
            }
          });
        } else if (stat.isFile() && file.endsWith('.md')) {
          // Markdown文件直接复制到docs-dist下
          const targetPath = path.join('docs-dist', file);
          
          // 读取原始内容并确保写入文件内容是有效的
          const content = fs.readFileSync(sourcePath, 'utf8');
          fs.writeFileSync(targetPath, content);
          log(`复制: ${sourcePath} -> ${targetPath}`, colors.green);
          
          // 同时也复制到guides目录
          const guidesPath = path.join('docs-dist/guides', file);
          fs.writeFileSync(guidesPath, content);
          
          // 尝试转换为HTML
          convertToHtml(sourcePath, path.join('docs-dist', file.replace('.md', '.html')));
          convertToHtml(sourcePath, path.join('docs-dist/guides', file.replace('.md', '.html')));
        } else if (stat.isFile() && file.endsWith('.html')) {
          // HTML文件直接复制
          const targetPath = path.join('docs-dist', file);
          fs.copyFileSync(sourcePath, targetPath);
          log(`复制: ${sourcePath} -> ${targetPath}`, colors.green);
        }
      });
      
      // 确保.nojekyll文件存在
      fs.writeFileSync(path.join('docs-dist', '.nojekyll'), '');
      log('创建.nojekyll文件', colors.green);
      
      log('文档文件复制完成!', colors.green);
    } catch (error) {
      log('复制文档文件失败: ' + error.message, colors.red);
      return false;
    }
  } else {
    log('docs目录不存在，跳过HTML文档生成', colors.yellow);
    return false;
  }
  
  // 复制API文档
  if (fs.existsSync('docs-api')) {
    log('复制API文档...', colors.blue);
    
    try {
      // 创建api目录
      ensureDirectoryExists('docs-dist/api');
      
      // 复制API文档
      execSync('cp -r docs-api/* docs-dist/api/', { stdio: 'inherit' });
      log('API文档复制完成!', colors.green);
    } catch (error) {
      log('复制API文档失败: ' + error.message, colors.red);
      return false;
    }
  }
  
  log('HTML文档生成成功!', colors.green);
  return true;
}

/**
 * 将Markdown转换为HTML
 */
function convertToHtml(mdFile, htmlFile) {
  try {
    // 检查能否使用marked库
    try {
      require.resolve('marked');
    } catch (error) {
      log('marked库未安装，正在安装...', colors.yellow);
      execSync('pnpm add -D marked -w', { stdio: 'inherit' });
    }
    
    const marked = require('marked');
    const content = fs.readFileSync(mdFile, 'utf8');
    
    // 检查内容是否为空
    if (!content || content.trim() === '') {
      log(`警告: ${mdFile} 内容为空`, colors.yellow);
      return false;
    }
    
    // 使用marked解析Markdown
    let htmlContent;
    if (typeof marked === 'function') {
      htmlContent = marked(content);
    } else if (marked && typeof marked.parse === 'function') {
      htmlContent = marked.parse(content);
    } else {
      throw new Error('marked库不可用，无法解析Markdown');
    }
    
    // 检查解析后的HTML内容是否为空
    if (!htmlContent || htmlContent.trim() === '') {
      log(`警告: ${mdFile} 解析结果为空，使用原始内容`, colors.yellow);
      htmlContent = `<pre>${content}</pre>`;
    }
    
    // 添加HTML头部和尾部
    const finalHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${path.basename(mdFile, '.md')} - TaroViz文档</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    pre { 
      background: #f6f8fa;
      padding: 16px;
      overflow: auto;
      border-radius: 5px;
    }
    code { 
      font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
      background: #f6f8fa;
      padding: 2px 4px;
      border-radius: 3px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 20px 0;
    }
    table, th, td {
      border: 1px solid #ddd;
    }
    th, td {
      padding: 12px;
      text-align: left;
    }
    th {
      background-color: #f8f9fa;
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 24px;
      margin-bottom: 16px;
      font-weight: 600;
      color: #0d47a1;
    }
    a {
      color: #0366d6;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .nav {
      background: #f8f9fa;
      padding: 15px;
      margin-bottom: 20px;
      border-radius: 5px;
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
    }
    .nav a {
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="nav">
    <a href="../index.html">首页</a>
    <a href="../USAGE.html">使用指南</a>
    <a href="../API.html">API文档</a>
    <a href="../EXAMPLES.html">示例</a>
    <a href="../DEVELOPMENT.html">开发指南</a>
  </div>
  
  <div class="content">
${htmlContent}
  </div>
</body>
</html>
    `;
    
    fs.writeFileSync(htmlFile, finalHtml);
    log(`转换: ${mdFile} -> ${htmlFile}`, colors.green);
    return true;
  } catch (error) {
    log(`转换 ${mdFile} 失败: ${error.message}`, colors.red);
    return false;
  }
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
  
  // 确保文档目录存在
  let docDir = 'docs-dist';
  if (!fs.existsSync(docDir)) {
    log('docs-dist目录不存在，尝试使用docs-api目录...', colors.yellow);
    docDir = 'docs-api';
    
    if (!fs.existsSync(docDir)) {
      log('文档目录不存在，请先生成文档', colors.red);
      return false;
    }
  }
  
  // 启动serve
  log(`启动文档服务器，访问 ${docDir} 目录，按Ctrl+C停止...`, colors.green);
  execSync(`npx serve ${docDir}`, { stdio: 'inherit' });
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
  log('  html      - 生成HTML文档', colors.reset);
  log('  serve     - 启动文档预览服务器', colors.reset);
  log('  all       - 生成并预览文档', colors.reset);
  log('  help      - 显示此帮助信息', colors.reset);
  log('\n示例:', colors.cyan);
  log('  node scripts/update-docs.js generate', colors.reset);
  log('  node scripts/update-docs.js html', colors.reset);
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
    case 'html':
      generateHtmlDocs();
      break;
    case 'serve':
      serveDocumentation();
      break;
    case 'all':
      // 尝试生成API文档，但即使失败也继续
      const apiResult = generateApiDocs();
      log(apiResult ? '✅ API文档生成成功' : '⚠️ API文档生成未完成，继续生成HTML文档', apiResult ? colors.green : colors.yellow);
      
      // 生成HTML文档
      const htmlResult = generateHtmlDocs();
      log(htmlResult ? '✅ HTML文档生成成功' : '❌ HTML文档生成失败', htmlResult ? colors.green : colors.red);
      
      // 如果HTML文档生成成功，启动服务
      if (htmlResult) {
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