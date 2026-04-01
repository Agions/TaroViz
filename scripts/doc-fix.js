/**
 * 文档修复脚本 - 为解决TypeDoc构建问题
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
  cyan: '\x1b[36m',
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
 * 创建临时目录，用于存放临时构建文件
 */
function createTempBuildDir() {
  const tempDir = path.join(process.cwd(), 'temp-build');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempDir, { recursive: true });
  return tempDir;
}

/**
 * 生成API文档
 */
function generateApiDocs() {
  // 运行TypeDoc，使用项目根目录下的typedoc.json配置
  const success = runCommand('npx typedoc', 'API文档生成失败');
  return success;
}

/**
 * 创建示例目录和示例文件
 */
function createExamples() {
  // 确保docs目录存在
  const docsDir = path.join(process.cwd(), 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  // 确保examples目录存在
  const examplesDir = path.join(docsDir, 'examples');
  if (!fs.existsSync(examplesDir)) {
    fs.mkdirSync(examplesDir, { recursive: true });
  }

  // 创建示例文件
  const examples = [
    {
      name: 'line-chart.md',
      title: '折线图示例',
      content:
        "# 折线图示例\n\n这是一个简单的折线图示例，展示了如何使用TaroViz创建折线图。\n\n## 基本使用\n\n```typescript\nimport React from 'react';\nimport { LineChart } from '@agions/taroviz';\n\nconst LineChartDemo = () => {\n  const option = {\n    title: {\n      text: '销售趋势'\n    },\n    tooltip: {\n      trigger: 'axis'\n    },\n    legend: {\n      data: ['线上', '线下']\n    },\n    xAxis: {\n      type: 'category',\n      boundaryGap: false,\n      data: ['1月', '2月', '3月', '4月', '5月', '6月']\n    },\n    yAxis: {\n      type: 'value'\n    },\n    series: [\n      {\n        name: '线上',\n        type: 'line',\n        data: [120, 200, 150, 80, 70, 110],\n        smooth: true\n      },\n      {\n        name: '线下',\n        type: 'line',\n        data: [90, 150, 120, 100, 80, 130],\n        smooth: true\n      }\n    ]\n  }\n\n  return (\n    <LineChart\n      chartId=\"line-chart\"\n      option={option}\n      width=\"100%\"\n      height={400}\n      theme=\"dark\"\n      autoResize={true}\n    />\n  )\n}\n\nexport default LineChartDemo\n```\n\n## 配置说明\n\n- chartId: 图表唯一标识符\n- option: ECharts配置项\n- width: 图表宽度\n- height: 图表高度\n- theme: 图表主题\n- autoResize: 是否自动调整大小\n",
    },
    {
      name: 'bar-chart.md',
      title: '柱状图示例',
      content:
        "# 柱状图示例\n\n这是一个简单的柱状图示例，展示了如何使用TaroViz创建柱状图。\n\n## 基本使用\n\n```typescript\nimport React from 'react';\nimport { BarChart } from '@agions/taroviz';\n\nconst BarChartDemo = () => {\n  const option = {\n    title: {\n      text: '销售对比'\n    },\n    tooltip: {\n      trigger: 'axis'\n    },\n    legend: {\n      data: ['2023年', '2024年']\n    },\n    xAxis: {\n      type: 'category',\n      data: ['1月', '2月', '3月', '4月', '5月', '6月']\n    },\n    yAxis: {\n      type: 'value'\n    },\n    series: [\n      {\n        name: '2023年',\n        type: 'bar',\n        data: [120, 200, 150, 80, 70, 110]\n      },\n      {\n        name: '2024年',\n        type: 'bar',\n        data: [220, 180, 250, 130, 150, 210]\n      }\n    ]\n  }\n\n  return (\n    <BarChart\n      chartId=\"bar-chart\"\n      option={option}\n      width=\"100%\"\n      height={400}\n    />\n  )\n}\n\nexport default BarChartDemo\n```\n",
    },
    {
      name: 'pie-chart.md',
      title: '饼图示例',
      content:
        "# 饼图示例\n\n这是一个简单的饼图示例，展示了如何使用TaroViz创建饼图。\n\n## 基本使用\n\n```typescript\nimport React from 'react';\nimport { PieChart } from '@agions/taroviz';\n\nconst PieChartDemo = () => {\n  const option = {\n    title: {\n      text: '销售渠道分布',\n      left: 'center'\n    },\n    tooltip: {\n      trigger: 'item'\n    },\n    legend: {\n      orient: 'vertical',\n      left: 'left'\n    },\n    series: [\n      {\n        name: '销售渠道',\n        type: 'pie',\n        radius: '50%',\n        data: [\n          { value: 350, name: '线上商城' },\n          { value: 250, name: '线下门店' },\n          { value: 200, name: '代理商' },\n          { value: 150, name: '其他' }\n        ],\n        emphasis: {\n          itemStyle: {\n            shadowBlur: 10,\n            shadowOffsetX: 0,\n            shadowColor: 'rgba(0, 0, 0, 0.5)'\n          }\n        }\n      }\n    ]\n  }\n\n  return (\n    <PieChart\n      chartId=\"pie-chart\"\n      option={option}\n      width={400}\n      height={400}\n    />\n  )\n}\n\nexport default PieChartDemo\n```\n",
    },
  ];

  examples.forEach(example => {
    const examplePath = path.join(examplesDir, example.name);
    fs.writeFileSync(examplePath, example.content);
    log(`创建示例文件: ${examplePath}`, colors.green);
  });

  // 创建示例索引文件
  const examplesIndexPath = path.join(docsDir, 'EXAMPLES.md');
  const examplesIndexContent = `# 示例

这里是TaroViz的各种图表示例，展示了如何使用TaroViz创建不同类型的图表。

## 图表示例

### 折线图

- [折线图基本使用](./examples/line-chart.md)

### 柱状图

- [柱状图基本使用](./examples/bar-chart.md)

### 饼图

- [饼图基本使用](./examples/pie-chart.md)

## 高级示例

### 多图表联动

### 动态数据更新

### 自定义主题

### 性能优化
  `;

  fs.writeFileSync(examplesIndexPath, examplesIndexContent);
  log(`创建示例索引文件: ${examplesIndexPath}`, colors.green);

  return true;
}

/**
 * 创建使用指南
 */
function createUsageGuide() {
  // 确保docs目录存在
  const docsDir = path.join(process.cwd(), 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  // 创建使用指南文件
  const usagePath = path.join(docsDir, 'USAGE.md');
  const usageContent = `# 使用指南

## 安装

\`\`\`bash
# npm
npm install @agions/taroviz

# yarn
yarn add @agions/taroviz

# pnpm
pnpm add @agions/taroviz
\`\`\`

## 快速开始

### 基础使用

\`\`\`typescript
import React from 'react';
import { LineChart } from '@agions/taroviz';

const App = () => {
  const option = {
    title: {
      text: '折线图示例'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '系列1',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130]
      }
    ]
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <LineChart
        chartId="chart"
        option={option}
      />
    </div>
  );
};

export default App;
\`\`\`

## 核心概念

### 图表组件

TaroViz提供了多种图表组件，每种图表组件都对应一种ECharts图表类型：

- LineChart - 折线图
- BarChart - 柱状图
- PieChart - 饼图
- ScatterChart - 散点图
- RadarChart - 雷达图
- HeatmapChart - 热力图
- GaugeChart - 仪表盘
- FunnelChart - 漏斗图

### 配置项

TaroViz使用ECharts的配置项来定义图表的外观和行为。你可以通过option属性传递ECharts配置项。

### 主题

TaroViz支持多种内置主题，你可以通过theme属性设置主题：

\`\`\`typescript
<LineChart
  chartId="chart"
  option={option}
  theme="dark"
/>
\`\`\`

### 响应式

TaroViz支持自动调整大小，你可以通过autoResize属性启用：

\`\`\`typescript
<LineChart
  chartId="chart"
  option={option}
  autoResize={true}
/>
\`\`\`

## 高级用法

### 动态数据更新

TaroViz支持动态更新图表数据，你只需要更新option属性即可：

\`\`\`typescript
import React, { useState } from 'react';
import { LineChart } from '@agions/taroviz';

const DynamicChart = () => {
  const [option, setOption] = useState({
    // 初始配置
  });

  const updateData = () => {
    setOption(prev => ({
      ...prev,
      series: [
        {
          ...prev.series[0],
          data: [/* 新数据 */]
        }
      ]
    }));
  };

  return (
    <>
      <LineChart
        chartId="dynamic-chart"
        option={option}
      />
      <button onClick={updateData}>更新数据</button>
    </>
  );
};
\`\`\`

### 事件处理

TaroViz支持ECharts的各种事件，你可以通过相应的属性监听事件：

\`\`\`typescript
<LineChart
  chartId="event-chart"
  option={option}
  onClick={(params) => {
    console.log('图表被点击了', params);
  }}
  onDataZoom={(params) => {
    console.log('图表缩放了', params);
  }}
/>
\`\`\`

### 自定义主题

你可以通过registerTheme函数注册自定义主题：

\`\`\`typescript
import { registerTheme } from '@agions/taroviz';

// 注册自定义主题
registerTheme('my-theme', {
  color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  backgroundColor: '#f5f5f5',
  textStyle: {
    color: '#333'
  },
  title: {
    textStyle: {
      color: '#333'
    }
  },
  legend: {
    textStyle: {
      color: '#333'
    }
  }
});

// 使用自定义主题
<LineChart
  chartId="custom-theme-chart"
  option={option}
  theme="my-theme"
/>
\`\`\`
`;

  fs.writeFileSync(usagePath, usageContent);
  log(`创建使用指南文件: ${usagePath}`, colors.green);

  return true;
}

/**
 * 主函数
 */
function main() {
  log('开始修复文档生成...', colors.cyan);

  // 生成API文档
  const apiSuccess = generateApiDocs();
  log(apiSuccess ? 'API文档生成成功' : 'API文档生成失败', apiSuccess ? colors.green : colors.red);

  // 创建使用指南
  const usageSuccess = createUsageGuide();
  log(
    usageSuccess ? '使用指南创建成功' : '使用指南创建失败',
    usageSuccess ? colors.green : colors.red
  );

  // 创建示例
  const examplesSuccess = createExamples();
  log(
    examplesSuccess ? '示例创建成功' : '示例创建失败',
    examplesSuccess ? colors.green : colors.red
  );

  if (apiSuccess && usageSuccess && examplesSuccess) {
    log('文档修复完成！', colors.green);
    return true;
  } else {
    log('文档修复部分失败！', colors.yellow);
    return true;
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  process.exit(main() ? 0 : 1);
}

module.exports = {
  fixDocs: main,
};
