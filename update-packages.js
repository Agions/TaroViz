const fs = require('fs');
const path = require('path');

// 子包列表
const packages = [
  'core',
  'adapters',
  'themes',
  'data',
  'hooks',
  'charts',
  'all'
];

// 更新每个子包的package.json
packages.forEach(pkg => {
  const packageJsonPath = path.join(__dirname, 'packages', pkg, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    try {
      // 读取package.json
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      // 更新scripts
      if (packageJson.scripts) {
        if (packageJson.scripts.dev && packageJson.scripts.dev.includes('rollup')) {
          packageJson.scripts.dev = 'webpack --mode=development --watch';
        }
        if (packageJson.scripts.build && packageJson.scripts.build.includes('rollup')) {
          packageJson.scripts.build = 'webpack --mode=production';
        }
      }
      
      // 移除type: module
      delete packageJson.type;
      
      // 移除rollup相关依赖
      if (packageJson.devDependencies) {
        Object.keys(packageJson.devDependencies).forEach(dep => {
          if (dep.includes('rollup')) {
            delete packageJson.devDependencies[dep];
          }
        });
        
        // 如果devDependencies为空对象，则删除它
        if (Object.keys(packageJson.devDependencies).length === 0) {
          delete packageJson.devDependencies;
        }
      }
      
      // 保存修改后的package.json
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
      console.log(`更新了 ${pkg} 的package.json`);
    } catch (error) {
      console.error(`更新 ${pkg} 的package.json时出错:`, error);
    }
  } else {
    console.log(`找不到 ${pkg} 的package.json`);
  }
});

console.log('所有子包的package.json文件已更新'); 