/**
 * 修复导入路径
 * 将 @agions/* 替换为 @agions/taroviz-*
 */
const fs = require('fs');
const path = require('path');

const glob = require('glob');

// 查找所有TypeScript文件
const files = glob.sync('packages/**/src/**/*.{ts,tsx}');

console.log(`找到 ${files.length} 个文件需要处理...`);

// 定义替换规则
const replacements = [
  { from: /@agions\/core\/types/g, to: '@agions/taroviz-core/types' },
  { from: /@agions\/core\/utils/g, to: '@agions/taroviz-core/utils' },
  { from: /@agions\/core/g, to: '@agions/taroviz-core' },
  { from: /@agions\/adapters/g, to: '@agions/taroviz-adapters' },
  { from: /@agions\/charts/g, to: '@agions/taroviz-charts' },
  { from: /@agions\/themes/g, to: '@agions/taroviz-themes' },
  { from: /@agions\/data/g, to: '@agions/taroviz-data' },
  { from: /@agions\/hooks/g, to: '@agions/taroviz-hooks' },
];

// 处理每个文件
let modifiedCount = 0;
files.forEach(file => {
  const filePath = path.resolve(file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 应用所有替换规则
  replacements.forEach(({ from, to }) => {
    const newContent = content.replace(from, to);
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  });

  // 如果文件被修改，写回文件
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
    console.log(`已修复: ${file}`);
  }
});

console.log(`修复完成，共修改了 ${modifiedCount} 个文件。`);
