/**
 * 按依赖顺序构建包
 * 注意：所有包的webpack.config.js都应该使用CommonJS模块语法
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 构建顺序（按依赖关系）
const buildOrder = [
  'core',
  'adapters',
  'themes',
  'data',
  'hooks',
  'charts',
  'all'  // 包文件夹名仍为all，但发布名为@taroviz
];

console.log('正在检查和修复包配置...');

// 确保所有包都有正确的配置
buildOrder.forEach(packageName => {
  const packagePath = path.resolve(__dirname, 'packages', packageName);
  const packageJsonPath = path.join(packagePath, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    let packageJson;
    try {
      packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      // 移除type:module
      if (packageJson.type === 'module') {
        delete packageJson.type;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
        
        // 为all包特殊处理
        if (packageName === 'all') {
          console.log(`已为 @taroviz 移除 type:module 配置`);
        } else {
          console.log(`已为 @taroviz/${packageName} 移除 type:module 配置`);
        }
      }
      
      // 更新package.json中的build脚本
      if (packageJson.scripts && packageJson.scripts.build) {
        const buildScript = packageJson.scripts.build;
        if (buildScript.includes('rollup -c')) {
          packageJson.scripts.build = 'webpack --mode=production';
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
          console.log(`已更新 ${packageName} 的构建脚本为使用 webpack`);
        }
      }
      
      // 为tsconfig添加baseUrl和paths配置以解决相对路径问题
      const tsconfigPath = path.join(packagePath, 'tsconfig.json');
      if (fs.existsSync(tsconfigPath)) {
        try {
          let tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
          if (!tsconfig.compilerOptions) {
            tsconfig.compilerOptions = {};
          }
          
          // 添加declarationDir配置
          tsconfig.compilerOptions.declarationDir = './dist';
          
          // 添加paths配置解决相对路径问题
          if (!tsconfig.compilerOptions.paths) {
            tsconfig.compilerOptions.paths = {};
            buildOrder.forEach(pkg => {
              if (pkg !== packageName) {
                tsconfig.compilerOptions.paths[`@taroviz/${pkg}/*`] = [`../../../${pkg}/src/*`];
              }
            });
            // 特殊处理all包
            if (packageName === 'all') {
              tsconfig.compilerOptions.paths['@taroviz/*'] = [`../*`];
            }
          }
          
          fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2), 'utf8');
          console.log(`已为 ${packageName} 更新 tsconfig.json 配置`);
        } catch (error) {
          console.error(`无法解析或修改 ${packageName} 的 tsconfig.json:`, error);
        }
      }
    } catch (error) {
      if (packageName === 'all') {
        console.error(`无法解析或修改 @taroviz 的配置:`, error);
      } else {
        console.error(`无法解析或修改 @taroviz/${packageName} 的配置:`, error);
      }
    }
  }
});

// 复制logo.png到dist目录
console.log('正在复制logo.png到dist目录...');
if (fs.existsSync(path.join(__dirname, 'logo.png'))) {
  if (!fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
  }
  fs.copyFileSync(
    path.join(__dirname, 'logo.png'), 
    path.join(__dirname, 'dist', 'logo.png')
  );
  console.log('已复制logo.png到dist目录');
} else {
  console.log('未找到logo.png文件');
}

// 创建dist目录结构
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
}
if (!fs.existsSync(path.join(__dirname, 'dist', 'packages'))) {
  fs.mkdirSync(path.join(__dirname, 'dist', 'packages'), { recursive: true });
}
buildOrder.forEach(pkg => {
  const pkgDistDir = path.join(__dirname, 'dist', 'packages', pkg);
  if (!fs.existsSync(pkgDistDir)) {
    fs.mkdirSync(pkgDistDir, { recursive: true });
  }
});
console.log('已创建dist目录结构');

// 单独构建每个包
console.log('正在按顺序构建所有包...');
let buildFailed = false;

buildOrder.forEach(pkg => {
  console.log(`正在构建 ${pkg === 'all' ? '@taroviz' : '@taroviz/' + pkg}...`);
  try {
    execSync(`cd packages/${pkg} && npx webpack --mode=production`, { 
      stdio: 'inherit', 
      env: { ...process.env, NODE_ENV: 'production' } 
    });
    console.log(`${pkg === 'all' ? '@taroviz' : '@taroviz/' + pkg} 构建成功`);
  } catch (error) {
    console.error(`${pkg === 'all' ? '@taroviz' : '@taroviz/' + pkg} 构建失败:`, error);
    buildFailed = true;
  }
});

// 复制README.md到dist目录
if (fs.existsSync(path.join(__dirname, 'README.md'))) {
  fs.copyFileSync(
    path.join(__dirname, 'README.md'), 
    path.join(__dirname, 'dist', 'README.md')
  );
  console.log('已复制README.md到dist目录');
}

// 创建简单的产物
if (!fs.existsSync(path.join(__dirname, 'dist', 'index.js'))) {
  // 创建一个简单的导出文件
  const mainJs = `/**
 * TaroViz - 基于 Taro 和 ECharts 的多端图表组件库
 * @version 0.5.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var all = require('./packages/all/index.js');

Object.keys(all).forEach(function (key) {
  exports[key] = all[key];
});
`;
  fs.writeFileSync(path.join(__dirname, 'dist', 'index.js'), mainJs, 'utf8');
  console.log('已创建主包导出文件(CJS)');
}

if (!fs.existsSync(path.join(__dirname, 'dist', 'index.esm.js'))) {
  // 创建一个简单的导出文件
  const mainEsmJs = `/**
 * TaroViz - 基于 Taro 和 ECharts 的多端图表组件库
 * @version 0.5.0
 */
export * from './packages/all/index.esm.js';
`;
  fs.writeFileSync(path.join(__dirname, 'dist', 'index.esm.js'), mainEsmJs, 'utf8');
  console.log('已创建主包导出文件(ESM)');
}

if (!fs.existsSync(path.join(__dirname, 'dist', 'index.d.ts'))) {
  // 创建一个简单的类型定义文件
  const mainDts = `/**
 * TaroViz - 基于 Taro 和 ECharts 的多端图表组件库
 * @version 0.5.0
 */
export * from './packages/all/index';
`;
  fs.writeFileSync(path.join(__dirname, 'dist', 'index.d.ts'), mainDts, 'utf8');
  console.log('已创建主包类型定义文件');
}

if (buildFailed) {
  console.error('构建过程中存在错误，请检查输出日志');
  process.exit(1);
} else {
  console.log('所有包构建完成');
} 