/**
 * 文档更新脚本
 * 
 * 此脚本用于：
 * 1. 生成最新的API文档
 * 2. 更新版本信息
 * 3. 准备文档部署
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 项目根目录
const rootDir = path.resolve(__dirname, '..');

// 获取当前版本
function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
  return packageJson.version || '未知版本';
}

// 跨平台兼容的命令执行
function runCommand(command, options = {}) {
  try {
    return execSync(command, { ...options, stdio: 'inherit', cwd: rootDir });
  } catch (error) {
    console.error(`执行命令失败: ${command}`);
    console.error(error);
    return null;
  }
}

// 跨平台兼容的目录复制
function copyDirectory(source, destination) {
  // 确保目标目录存在
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // 读取源目录内容
  const files = fs.readdirSync(source);
  
  // 复制每个文件/目录
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      // 如果是目录，递归复制
      copyDirectory(sourcePath, destPath);
    } else {
      // 如果是文件，直接复制
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}

// 生成API文档
function generateApiDocs() {
  console.log('🔄 生成API文档...');
  try {
    const result = runCommand('npx typedoc --options typedoc.json');
    if (result !== null) {
      console.log('✅ API文档生成成功！');
    } else {
      throw new Error('TypeDoc命令执行失败');
    }
  } catch (error) {
    console.error('❌ API文档生成失败：', error);
    process.exit(1);
  }
}

// 更新版本信息到文档
function updateVersionInDocs() {
  const version = getCurrentVersion();
  console.log(`🔄 更新文档版本信息为 ${version}...`);
  
  // 在这里可以添加更新特定文档文件中版本号的逻辑
  // 例如，更新README.md中的版本号
}

// 准备文档部署
function prepareDeployment() {
  console.log('🔄 准备文档部署...');
  
  // 创建docs-dist目录
  const docsDistDir = path.join(rootDir, 'docs-dist');
  if (!fs.existsSync(docsDistDir)) {
    fs.mkdirSync(docsDistDir, { recursive: true });
  }
  
  // 复制API文档
  const docsApiDir = path.join(rootDir, 'docs-api');
  if (fs.existsSync(docsApiDir)) {
    console.log('- 复制API文档...');
    copyDirectory(docsApiDir, docsDistDir);
  } else {
    console.warn('⚠️ API文档目录不存在:', docsApiDir);
  }
  
  // 复制其他文档
  const docsDir = path.join(rootDir, 'docs');
  if (fs.existsSync(docsDir)) {
    console.log('- 复制其他文档...');
    const docsTargetDir = path.join(docsDistDir, 'guides');
    if (!fs.existsSync(docsTargetDir)) {
      fs.mkdirSync(docsTargetDir, { recursive: true });
    }
    copyDirectory(docsDir, docsTargetDir);
  } else {
    console.warn('⚠️ 文档目录不存在:', docsDir);
  }
  
  // 复制README.md
  const readmePath = path.join(rootDir, 'README.md');
  if (fs.existsSync(readmePath)) {
    console.log('- 复制README.md...');
    fs.copyFileSync(readmePath, path.join(docsDistDir, 'README.md'));
  } else {
    console.warn('⚠️ README.md文件不存在:', readmePath);
  }
  
  console.log('✅ 文档准备完成！');
}

// 主函数
function main() {
  console.log('📚 开始更新文档...');
  
  generateApiDocs();
  updateVersionInDocs();
  prepareDeployment();
  
  console.log('🎉 文档更新完成！');
}

// 执行主函数
main(); 