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

// 生成API文档
function generateApiDocs() {
  console.log('🔄 生成API文档...');
  try {
    execSync('pnpm docs:build', { cwd: rootDir, stdio: 'inherit' });
    console.log('✅ API文档生成成功！');
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
    fs.mkdirSync(docsDistDir);
  }
  
  // 复制API文档
  execSync(`cp -r ${path.join(rootDir, 'docs-api')}/* ${docsDistDir}/`, { stdio: 'inherit' });
  
  // 复制其他文档
  execSync(`cp -r ${path.join(rootDir, 'docs')}/* ${docsDistDir}/`, { stdio: 'inherit' });
  
  // 复制README.md
  execSync(`cp ${path.join(rootDir, 'README.md')} ${docsDistDir}/`, { stdio: 'inherit' });
  
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