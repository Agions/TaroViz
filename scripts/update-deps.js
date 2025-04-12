/**
 * 依赖更新脚本
 * 
 * 此脚本用于：
 * 1. 更新package.json和pnpm-lock.yaml的一致性
 * 2. 解决CI中frozen-lockfile问题
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 项目根目录
const rootDir = path.resolve(__dirname, '..');

// 跨平台兼容的命令执行
function runCommand(command, options = {}) {
  try {
    console.log(`执行命令: ${command}`);
    const result = execSync(command, { 
      ...options, 
      stdio: 'inherit', 
      cwd: rootDir 
    });
    console.log('命令执行成功！');
    return result;
  } catch (error) {
    console.error(`执行命令失败: ${command}`);
    console.error(error);
    return null;
  }
}

// 更新pnpm锁文件
function updateLockfile() {
  console.log('🔄 更新pnpm锁文件...');
  
  // 首先移除node_modules以确保干净更新
  if (fs.existsSync(path.join(rootDir, 'node_modules'))) {
    console.log('- 移除现有node_modules目录...');
    if (process.platform === 'win32') {
      // Windows平台需要特殊处理深层目录
      runCommand('rmdir /s /q node_modules');
    } else {
      runCommand('rm -rf node_modules');
    }
  }
  
  // 移除旧的锁文件
  const lockfilePath = path.join(rootDir, 'pnpm-lock.yaml');
  if (fs.existsSync(lockfilePath)) {
    console.log('- 移除现有pnpm-lock.yaml...');
    fs.unlinkSync(lockfilePath);
  }
  
  // 重新安装生成新的锁文件
  console.log('- 重新安装依赖...');
  const result = runCommand('pnpm install');
  
  if (result !== null) {
    console.log('✅ 锁文件更新成功！');
  } else {
    console.error('❌ 锁文件更新失败');
    process.exit(1);
  }
}

// 主函数
function main() {
  console.log('📦 开始更新依赖...');
  updateLockfile();
  console.log('🎉 依赖更新完成！');
}

// 执行主函数
main(); 