#!/usr/bin/env node

/**
 * TaroViz CLI - 快速创建图表项目的脚手架工具
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TEMPLATE_DIR = path.join(__dirname, 'templates');
const PROJECT_TEMPLATE = path.join(TEMPLATE_DIR, 'project');

const commands = {
  create: 'create <project-name>',
  description: '创建一个新的 TaroViz 项目',
  examples: ['taroviz create my-chart-app'],
};

const charts = [
  { name: 'LineChart', alias: '折线图', value: 'line' },
  { name: 'BarChart', alias: '柱状图', value: 'bar' },
  { name: 'PieChart', alias: '饼图', value: 'pie' },
  { name: 'ScatterChart', alias: '散点图', value: 'scatter' },
  { name: 'RadarChart', alias: '雷达图', value: 'radar' },
  { name: 'HeatmapChart', alias: '热力图', value: 'heatmap' },
  { name: 'GaugeChart', alias: '仪表盘', value: 'gauge' },
  { name: 'FunnelChart', alias: '漏斗图', value: 'funnel' },
  { name: 'TreeMapChart', alias: '矩形树图', value: 'treemap' },
  { name: 'SunburstChart', alias: '旭日图', value: 'sunburst' },
  { name: 'SankeyChart', alias: '桑基图', value: 'sankey' },
  { name: 'GraphChart', alias: '关系图', value: 'graph' },
  { name: 'CandlestickChart', alias: 'K线图', value: 'candlestick' },
  { name: 'WordCloudChart', alias: '词云图', value: 'wordcloud' },
];

/**
 * 打印帮助信息
 */
function printHelp() {
  console.log(`
TaroViz CLI v1.4.0 - 快速创建图表项目的脚手架工具

用法:
  taroviz <command> [options]

命令:
  create <name>    创建一个新的 TaroViz 项目
  list             列出所有支持的图表类型
  init             在当前目录初始化 TaroViz

选项:
  -h, --help       显示帮助信息
  -v, --version    显示版本信息
  -t, --template   指定模板 (default|h5|weapp)

示例:
  taroviz create my-dashboard
  taroviz create my-chart-app --template weapp
  taroviz list
  `);
}

/**
 * 列出所有支持的图表
 */
function listCharts() {
  console.log('\n支持的图表类型:\n');
  charts.forEach((chart, index) => {
    console.log(`  ${String(index + 1).padEnd(2)} ${chart.name.padEnd(18)} - ${chart.alias}`);
  });
  console.log();
}

/**
 * 创建新项目
 * @param {string} projectName 项目名称
 * @param {string} template 模板类型
 */
function createProject(projectName, template = 'default') {
  const targetDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    console.error(`错误: 目录 ${projectName} 已存在`);
    process.exit(1);
  }

  console.log(`创建项目: ${projectName}`);
  console.log(`使用模板: ${template}`);

  try {
    fs.mkdirSync(targetDir, { recursive: true });

    const templateFiles = {
      'package.json': getPackageJson(projectName),
      'src/index.tsx': getIndexTsx(),
      'src/App.tsx': getAppTsx(),
      'src/charts/Line.tsx': getLineChart(),
      'src/charts/Bar.tsx': getBarChart(),
      'src/charts/Pie.tsx': getPieChart(),
      'src/index.css': getStyles(),
      'tsconfig.json': getTsConfig(),
      'config/index.js': getConfig(),
    };

    Object.entries(templateFiles).forEach(([filePath, content]) => {
      const fullPath = path.join(targetDir, filePath);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(fullPath, content);
      console.log(`  创建: ${filePath}`);
    });

    console.log('\n项目创建成功!');
    console.log(`\n开始使用:`);
    console.log(`  cd ${projectName}`);
    console.log(`  npm install`);
    console.log(`  npm run dev`);
  } catch (error) {
    console.error('创建项目失败:', error.message);
    process.exit(1);
  }
}

/**
 * 初始化当前目录
 */
function initProject() {
  const hasPackageJson = fs.existsSync('package.json');

  if (hasPackageJson) {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    if (pkg.dependencies?.['@agions/taroviz']) {
      console.log('TaroViz 已安装');
      return;
    }
  }

  console.log('安装 TaroViz...');
  execSync('npm install @agions/taroviz', { stdio: 'inherit' });
  console.log('安装完成!');
}

function getPackageJson(name) {
  return JSON.stringify({
    name,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
    },
    dependencies: {
      '@agions/taroviz': '^1.4.0',
      react: '^18.2.0',
      'react-dom': '^18.2.0',
    },
    devDependencies: {
      '@types/react': '^18.2.0',
      '@vitejs/plugin-react': '^4.0.0',
      typescript: '^5.0.0',
      vite: '^5.0.0',
    },
  }, null, 2);
}

function getIndexTsx() {
  return `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
}

function getAppTsx() {
  return `import React from 'react';
import LineChart from './charts/Line';
import BarChart from './charts/Bar';
import PieChart from './charts/Pie';

const lineOption = {
  title: { text: '销售趋势' },
  xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
  yAxis: { type: 'value' },
  series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: 'line', smooth: true }],
};

const barOption = {
  title: { text: '月度销量' },
  xAxis: { type: 'category', data: ['一月', '二月', '三月', '四月'] },
  yAxis: { type: 'value' },
  series: [{ data: [1200, 2000, 1500, 800], type: 'bar' }],
};

const pieOption = {
  title: { text: '市场份额' },
  series: [{
    type: 'pie',
    radius: '60%',
    data: [
      { value: 335, name: '直接访问' },
      { value: 310, name: '邮件营销' },
      { value: 234, name: '联盟广告' },
    ],
  }],
};

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>TaroViz 示例</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        <LineChart option={lineOption} height={300} />
        <BarChart option={barOption} height={300} />
        <PieChart option={pieOption} height={300} />
      </div>
    </div>
  );
}

export default App;
`;
}

function getLineChart() {
  return `import { LineChart } from '@agions/taroviz';

export default LineChart;
`;
}

function getBarChart() {
  return `import { BarChart } from '@agions/taroviz';

export default BarChart;
`;
}

function getPieChart() {
  return `import { PieChart } from '@agions/taroviz';

export default PieChart;
`;
}

function getStyles() {
  return `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}
`;
}

function getTsConfig() {
  return JSON.stringify({
    compilerOptions: {
      target: 'ES2020',
      useDefineForClassFields: true,
      lib: ['ES2020', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      skipLibCheck: true,
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'react-jsx',
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true,
    },
    include: ['src'],
  }, null, 2);
}

function getConfig() {
  return `export default {
  school: {
    title: 'TaroViz',
  },
};
`;
}

// 主入口
const [,, command, ...args] = process.argv;

switch (command) {
  case 'create':
    if (args[0]) {
      createProject(args[0], args[1]);
    } else {
      console.error('请提供项目名称: taroviz create <project-name>');
    }
    break;

  case 'list':
    listCharts();
    break;

  case 'init':
    initProject();
    break;

  case '-h':
  case '--help':
    printHelp();
    break;

  case '-v':
  case '--version':
    console.log('TaroViz CLI v1.4.0');
    break;

  default:
    printHelp();
}

module.exports = { commands, charts };
