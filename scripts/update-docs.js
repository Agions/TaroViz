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

// 先构建所有包
function buildPackages() {
  console.log('🔄 构建所有包...');
  try {
    // 为所有包创建临时的dist目录，确保TypeDoc能找到它们
    const packagesDir = path.join(rootDir, 'packages');
    const packages = fs.readdirSync(packagesDir);
    
    for (const pkg of packages) {
      const packageDir = path.join(packagesDir, pkg);
      if (fs.statSync(packageDir).isDirectory()) {
        console.log(`- 构建包: ${pkg}`);
        // 检查package.json是否存在
        const packageJsonPath = path.join(packageDir, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          // 在各个包目录中执行构建
          const buildResult = runCommand(`cd ${packageDir} && pnpm build`, { stdio: 'inherit' });
          if (buildResult === null) {
            console.warn(`⚠️ 构建包 ${pkg} 失败，尝试继续...`);
          }
        }
      }
    }
    
    console.log('✅ 包构建完成！');
    return true;
  } catch (error) {
    console.error('❌ 构建包失败：', error);
    return false;
  }
}

// 为TypeDoc创建临时tsconfig
function createTemporaryTsConfig() {
  console.log('🔄 创建临时TypeDoc配置...');
  
  // 读取原始typedoc.json
  const typedocPath = path.join(rootDir, 'typedoc.json');
  let typedocConfig = {};
  
  if (fs.existsSync(typedocPath)) {
    typedocConfig = JSON.parse(fs.readFileSync(typedocPath, 'utf8'));
  }
  
  // 修改配置
  typedocConfig.tsconfig = 'tsconfig.typedoc.json';
  
  // 写入临时的typedoc配置
  fs.writeFileSync(
    path.join(rootDir, 'typedoc.temp.json'),
    JSON.stringify(typedocConfig, null, 2)
  );
  
  // 创建临时的tsconfig.json供TypeDoc使用
  const tsConfig = {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@agions/taroviz-core": ["packages/core/src"],
        "@agions/taroviz-charts": ["packages/charts/src"],
        "@agions/taroviz-themes": ["packages/themes/src"],
        "@agions/taroviz-data": ["packages/data/src"],
        "@agions/taroviz-hooks": ["packages/hooks/src"],
        "@agions/taroviz-adapters": ["packages/adapters/src"],
        "@agions/taroviz": ["packages/all/src"]
      },
      "module": "esnext",
      "target": "es6",
      "moduleResolution": "node",
      "jsx": "react",
      "skipLibCheck": true,
      "esModuleInterop": true,
      "resolveJsonModule": true
    },
    "include": [
      "packages/*/src/**/*"
    ],
    "exclude": [
      "node_modules",
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/__tests__/**"
    ]
  };
  
  fs.writeFileSync(
    path.join(rootDir, 'tsconfig.typedoc.json'),
    JSON.stringify(tsConfig, null, 2)
  );
  
  console.log('✅ 临时配置创建完成！');
}

// 清理临时文件
function cleanupTemporaryFiles() {
  console.log('🔄 清理临时文件...');
  
  const tempTypedocPath = path.join(rootDir, 'typedoc.temp.json');
  const tempTsConfigPath = path.join(rootDir, 'tsconfig.typedoc.json');
  
  if (fs.existsSync(tempTypedocPath)) {
    fs.unlinkSync(tempTypedocPath);
  }
  
  if (fs.existsSync(tempTsConfigPath)) {
    fs.unlinkSync(tempTsConfigPath);
  }
  
  console.log('✅ 临时文件清理完成！');
}

// 生成API文档
function generateApiDocs() {
  console.log('🔄 生成API文档...');
  try {
    // 先构建所有包
    if (!buildPackages()) {
      console.warn('⚠️ 构建包失败，但仍尝试生成文档...');
    }
    
    // 创建临时TypeDoc配置
    createTemporaryTsConfig();
    
    // 使用临时配置运行TypeDoc
    const result = runCommand('npx typedoc --options typedoc.temp.json');
    
    // 清理临时文件
    cleanupTemporaryFiles();
    
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