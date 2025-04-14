/**
 * 修复模块引用问题，用于在生成文档前处理包内的引用
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
 * 递归查找目录中的TypeScript文件
 */
function findTsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      findTsFiles(filePath, fileList);
    } else if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * 获取所有包名称
 */
function getPackageNames() {
  const packagesDir = path.join(process.cwd(), 'packages');
  const packages = {};
  
  fs.readdirSync(packagesDir).forEach((dir) => {
    const packageJsonPath = path.join(packagesDir, dir, 'package.json');
    
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      packages[packageJson.name] = {
        dir: path.join(packagesDir, dir),
        main: packageJson.main || 'dist/index.js'
      };
    }
  });
  
  return packages;
}

/**
 * 创建临时的node_modules链接
 */
function createPackageLinks(packages) {
  const nodeModulesDir = path.join(process.cwd(), 'node_modules');
  
  // 确保node_modules目录存在
  if (!fs.existsSync(nodeModulesDir)) {
    fs.mkdirSync(nodeModulesDir, { recursive: true });
  }
  
  // 为每个包创建符号链接
  for (const [packageName, packageInfo] of Object.entries(packages)) {
    const packageLinkPath = path.join(nodeModulesDir, packageName);
    const packageScope = packageName.split('/')[0];
    const packageScopePath = path.join(nodeModulesDir, packageScope);
    
    // 确保作用域目录存在
    if (!fs.existsSync(packageScopePath)) {
      fs.mkdirSync(packageScopePath, { recursive: true });
    }
    
    // 创建符号链接
    try {
      // 移除已存在的链接
      if (fs.existsSync(packageLinkPath)) {
        fs.rmSync(packageLinkPath, { recursive: true, force: true });
      }
      
      fs.symlinkSync(packageInfo.dir, packageLinkPath, 'junction');
      log(`创建符号链接: ${packageName} -> ${packageInfo.dir}`, colors.green);
    } catch (error) {
      log(`创建符号链接失败: ${packageName} - ${error.message}`, colors.red);
    }
  }
}

/**
 * 移除临时的node_modules链接
 */
function removePackageLinks(packages) {
  const nodeModulesDir = path.join(process.cwd(), 'node_modules');
  
  // 为每个包移除符号链接
  for (const packageName of Object.keys(packages)) {
    const packageLinkPath = path.join(nodeModulesDir, packageName);
    
    try {
      if (fs.existsSync(packageLinkPath)) {
        fs.rmSync(packageLinkPath, { recursive: true, force: true });
        log(`移除符号链接: ${packageName}`, colors.yellow);
      }
    } catch (error) {
      log(`移除符号链接失败: ${packageName} - ${error.message}`, colors.red);
    }
  }
}

/**
 * 创建临时的类型定义文件
 */
function createTempTypeDefs(packages) {
  log('创建临时类型定义文件...', colors.blue);
  
  // 遍历所有包
  for (const [packageName, packageInfo] of Object.entries(packages)) {
    const srcDir = path.join(packageInfo.dir, 'src');
    const distDir = path.join(packageInfo.dir, 'dist');
    
    // 确保dist目录存在
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // 寻找src/index.ts文件
    const indexPath = path.join(srcDir, 'index.ts');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      
      // 创建简单的类型定义文件
      const dtsContent = `// 临时生成的类型定义文件，用于文档生成
declare module '${packageName}' {
  ${indexContent
    .replace(/import\s+.*?from\s+['"].*?['"]/g, '')
    .replace(/export\s+{\s*.*?\s*}/g, '')
    .replace(/export\s+default\s+.*?;/g, '')
    .replace(/export\s+\*/g, '')
    .trim()}
  export * from './index';
}
`;
      
      // 写入临时类型定义文件
      const dtsPath = path.join(distDir, 'index.d.ts');
      fs.writeFileSync(dtsPath, dtsContent);
      log(`创建临时类型定义: ${dtsPath}`, colors.green);
    }
  }
  
  log('临时类型定义文件创建完成', colors.green);
}

/**
 * 创建typedoc.temp.json文件
 */
function createTypeDocTempConfig() {
  log('创建临时TypeDoc配置...', colors.blue);
  
  const configPath = path.join(process.cwd(), 'typedoc.json');
  
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    // 修改配置，排除node_modules中的依赖，但包含我们的符号链接
    if (!config.exclude) {
      config.exclude = [];
    }
    
    // 确保从node_modules中排除非我们包的内容
    if (!config.exclude.includes('**/node_modules/**')) {
      config.exclude.push('**/node_modules/**');
    }
    
    // 添加我们包的例外
    config.exclude = config.exclude.filter(pattern => 
      pattern !== '**/node_modules/**'
    );
    config.exclude.push('**/node_modules/!(*/taroviz*)/**');
    
    // 写入临时配置
    const tempConfigPath = path.join(process.cwd(), 'typedoc.temp.json');
    fs.writeFileSync(tempConfigPath, JSON.stringify(config, null, 2));
    log(`创建临时TypeDoc配置: ${tempConfigPath}`, colors.green);
    
    return tempConfigPath;
  } else {
    log('未找到TypeDoc配置文件', colors.red);
    return null;
  }
}

/**
 * 主函数
 */
function main() {
  log('开始修复模块引用...', colors.cyan);
  
  // 获取所有包信息
  const packages = getPackageNames();
  log(`找到 ${Object.keys(packages).length} 个包`, colors.blue);
  
  try {
    // 创建临时链接
    createPackageLinks(packages);
    
    // 创建临时类型定义
    createTempTypeDefs(packages);
    
    // 创建临时TypeDoc配置
    createTypeDocTempConfig();
    
    log('模块引用修复完成，可以继续生成文档', colors.green);
  } catch (error) {
    log(`修复模块引用失败: ${error.message}`, colors.red);
    // 清理临时链接
    removePackageLinks(packages);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = {
  fixModuleReferences: main,
  removePackageLinks,
  getPackageNames,
  createTypeDocTempConfig
}; 