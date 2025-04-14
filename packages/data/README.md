# @agions/taroviz-data

[![npm version](https://img.shields.io/npm/v/@agions/taroviz-data.svg)](https://www.npmjs.com/package/@agions/taroviz-data)
[![npm downloads](https://img.shields.io/npm/dm/@agions/taroviz-data.svg)](https://www.npmjs.com/package/@agions/taroviz-data)
[![GitHub](https://img.shields.io/github/license/Agions/TaroViz)](https://github.com/Agions/TaroViz/blob/main/LICENSE)

## 简介

@agions/taroviz-data 是 TaroViz 可视化生态系统的数据处理模块，提供了全面的数据处理、转换、聚合和分析功能。该包专注于高效处理和准备可视化所需的数据，帮助开发者轻松实现数据预处理、清洗、转换和分析，为 TaroViz 的图表组件提供良好的数据支持。

## 技术依赖

- TypeScript 5.0+
- Lodash 4.17+
- D3 Scale & Array 7.8+
- @agions/taroviz-core

## 安装

```bash
# 使用npm
npm install @agions/taroviz-data

# 使用yarn
yarn add @agions/taroviz-data

# 使用pnpm
pnpm add @agions/taroviz-data
```

## 核心功能

### 数据转换器

#### Array 转换器

将数组数据转换为图表所需的格式：

```tsx
import { arrayTransformer } from '@agions/taroviz-data';

// 原始数据
const rawData = [
  [2019, 3, 'A'],
  [2020, 4, 'A'],
  [2021, 3.5, 'A'],
  [2019, 2, 'B'],
  [2020, 3, 'B'],
  [2021, 4, 'B'],
];

// 定义字段映射
const fields = ['year', 'value', 'category'];

// 转换数据
const transformedData = arrayTransformer(rawData, { fields });
console.log(transformedData);
// 输出:
// [
//   { year: 2019, value: 3, category: 'A' },
//   { year: 2020, value: 4, category: 'A' },
//   { year: 2021, value: 3.5, category: 'A' },
//   { year: 2019, value: 2, category: 'B' },
//   { year: 2020, value: 3, category: 'B' },
//   { year: 2021, value: 4, category: 'B' }
// ]
```

#### CSV 转换器

将 CSV 字符串转换为结构化数据：

```tsx
import { csvParser } from '@agions/taroviz-data';

const csvString = `year,value,category
2019,3,A
2020,4,A
2021,3.5,A
2019,2,B
2020,3,B
2021,4,B`;

// 转换数据
const parsedData = csvParser(csvString, {
  types: {
    year: 'number',
    value: 'number',
    category: 'string'
  }
});
console.log(parsedData);
// 输出结构化数据对象数组
```

#### 数据格式转换

在不同数据格式之间进行转换：

```tsx
import { transform } from '@agions/taroviz-data';

// 原始对象数组
const data = [
  { year: '2019', sales: 300, profit: 100, region: '华东' },
  { year: '2020', sales: 350, profit: 120, region: '华东' },
  { year: '2019', sales: 250, profit: 80, region: '华南' },
  { year: '2020', sales: 300, profit: 100, region: '华南' }
];

// 转换为分组数据
const groupedData = transform(data, {
  type: 'group',
  fields: ['region', 'year'],
  aggregates: {
    totalSales: ['sales', 'sum'],
    avgProfit: ['profit', 'mean']
  }
});
console.log(groupedData);
// 输出分组聚合结果

// 转换为层级数据
const hierarchyData = transform(data, {
  type: 'hierarchy',
  keys: ['region', 'year'],
  values: ['sales', 'profit']
});
console.log(hierarchyData);
// 输出嵌套层级数据
```

### 数据处理函数

#### 聚合运算

对数据进行各种聚合操作：

```tsx
import { aggregate } from '@agions/taroviz-data';

const data = [
  { category: 'A', value: 10 },
  { category: 'A', value: 20 },
  { category: 'B', value: 15 },
  { category: 'B', value: 25 },
  { category: 'C', value: 30 }
];

// 按类别分组并计算总和
const result = aggregate(data, {
  groupBy: 'category',
  operations: [
    { field: 'value', method: 'sum', as: 'total' },
    { field: 'value', method: 'mean', as: 'average' },
    { field: 'value', method: 'count', as: 'count' }
  ]
});
console.log(result);
// 输出:
// [
//   { category: 'A', total: 30, average: 15, count: 2 },
//   { category: 'B', total: 40, average: 20, count: 2 },
//   { category: 'C', total: 30, average: 30, count: 1 }
// ]
```

#### 数据过滤

筛选数据集：

```tsx
import { filter } from '@agions/taroviz-data';

const data = [
  { category: 'A', value: 10, year: 2020 },
  { category: 'A', value: 20, year: 2021 },
  { category: 'B', value: 15, year: 2020 },
  { category: 'B', value: 25, year: 2021 },
  { category: 'C', value: 30, year: 2021 }
];

// 筛选满足条件的数据
const filteredData = filter(data, {
  conditions: [
    { field: 'year', operator: '=', value: 2021 },
    { field: 'value', operator: '>', value: 20 }
  ],
  logic: 'and'
});
console.log(filteredData);
// 输出 value 大于 20 且 year 为 2021 的数据项
```

#### 数据排序

对数据集进行排序：

```tsx
import { sort } from '@agions/taroviz-data';

const data = [
  { category: 'A', value: 20 },
  { category: 'B', value: 15 },
  { category: 'C', value: 30 },
  { category: 'D', value: 25 }
];

// 按 value 字段降序排序
const sortedData = sort(data, {
  fields: ['value'],
  orders: ['desc']
});
console.log(sortedData);
// 输出按 value 降序排列的数据

// 多字段排序
const multiSortedData = sort(data, {
  fields: ['category', 'value'],
  orders: ['asc', 'desc']
});
console.log(multiSortedData);
// 输出先按 category 升序，再按 value 降序排列的数据
```

#### 数据归一化

将数据归一化到特定范围：

```tsx
import { normalize } from '@agions/taroviz-data';

const data = [
  { category: 'A', value: 20 },
  { category: 'B', value: 50 },
  { category: 'C', value: 100 },
  { category: 'D', value: 80 }
];

// 归一化 value 字段到 [0, 1] 范围
const normalizedData = normalize(data, {
  field: 'value',
  method: 'minmax',
  target: 'normalizedValue'
});
console.log(normalizedData);
// 输出 value 字段归一化结果

// 使用 z-score 归一化
const zScoreData = normalize(data, {
  field: 'value',
  method: 'zscore',
  target: 'zScore'
});
console.log(zScoreData);
// 输出 z-score 归一化结果
```

### 统计分析

#### 描述性统计

计算数据集的统计指标：

```tsx
import { statistics } from '@agions/taroviz-data';

const data = [
  { category: 'A', value: 20 },
  { category: 'B', value: 50 },
  { category: 'C', value: 100 },
  { category: 'D', value: 80 },
  { category: 'E', value: 65 }
];

// 计算数值字段的描述性统计
const stats = statistics(data, {
  field: 'value'
});
console.log(stats);
// 输出:
// {
//   min: 20,
//   max: 100,
//   mean: 63,
//   median: 65,
//   sum: 315,
//   count: 5,
//   variance: 926,
//   standardDeviation: 30.4,
//   quantiles: [20, 50, 65, 80, 100]
// }
```

#### 相关性分析

计算变量之间的相关性：

```tsx
import { correlation } from '@agions/taroviz-data';

const data = [
  { x: 10, y: 8, z: 13 },
  { x: 20, y: 16, z: 18 },
  { x: 30, y: 24, z: 28 },
  { x: 40, y: 30, z: 33 },
  { x: 50, y: 42, z: 45 }
];

// 计算 x 和 y 之间的相关系数
const pearsonCoeff = correlation(data, {
  x: 'x',
  y: 'y',
  method: 'pearson'
});
console.log('皮尔逊相关系数:', pearsonCoeff);

// 计算所有数值字段之间的相关矩阵
const correlationMatrix = correlation(data, {
  method: 'pearson',
  fields: ['x', 'y', 'z']
});
console.log('相关矩阵:', correlationMatrix);
```

### 数据结构处理

#### 数组转树形结构

将扁平数组转换为树形结构：

```tsx
import { arrayToTree } from '@agions/taroviz-data';

const flatData = [
  { id: 1, name: '总部' },
  { id: 2, name: '研发部', parentId: 1 },
  { id: 3, name: '市场部', parentId: 1 },
  { id: 4, name: '前端组', parentId: 2 },
  { id: 5, name: '后端组', parentId: 2 },
  { id: 6, name: '营销组', parentId: 3 },
  { id: 7, name: '销售组', parentId: 3 }
];

// 将扁平数组转换为树形结构
const treeData = arrayToTree(flatData, {
  id: 'id',
  parentId: 'parentId',
  childrenField: 'children'
});
console.log(treeData);
// 输出嵌套的树形结构
```

#### 树形结构转数组

将树形结构扁平化为数组：

```tsx
import { treeToArray } from '@agions/taroviz-data';

const treeData = {
  id: 1,
  name: '总部',
  children: [
    {
      id: 2,
      name: '研发部',
      children: [
        { id: 4, name: '前端组' },
        { id: 5, name: '后端组' }
      ]
    },
    {
      id: 3,
      name: '市场部',
      children: [
        { id: 6, name: '营销组' },
        { id: 7, name: '销售组' }
      ]
    }
  ]
};

// 将树形结构转换回扁平数组
const flatData = treeToArray(treeData, {
  childrenField: 'children',
  includeLevel: true
});
console.log(flatData);
// 输出扁平化的数组，包含层级信息
```

### 数据集成与导出

#### 数据导出

将数据导出为不同格式：

```tsx
import { exportData } from '@agions/taroviz-data';

const data = [
  { id: 1, name: '张三', age: 28, department: '技术部' },
  { id: 2, name: '李四', age: 32, department: '市场部' },
  { id: 3, name: '王五', age: 25, department: '技术部' }
];

// 导出为 CSV 字符串
const csvString = exportData(data, {
  format: 'csv',
  fields: ['id', 'name', 'age', 'department'],
  fieldTitles: {
    id: '编号',
    name: '姓名',
    age: '年龄',
    department: '部门'
  }
});
console.log(csvString);
// 输出 CSV 格式字符串

// 导出为 JSON 字符串
const jsonString = exportData(data, {
  format: 'json',
  pretty: true
});
console.log(jsonString);
// 输出格式化的 JSON 字符串
```

## 高级用法

### 数据管道

链式组合多个数据处理操作：

```tsx
import { DataPipeline } from '@agions/taroviz-data';

const rawData = [
  { date: '2023-01-01', category: 'A', value: 10 },
  { date: '2023-01-01', category: 'B', value: 15 },
  { date: '2023-01-02', category: 'A', value: 12 },
  { date: '2023-01-02', category: 'B', value: 18 },
  { date: '2023-01-03', category: 'A', value: 8 },
  { date: '2023-01-03', category: 'B', value: 20 }
];

// 创建数据处理管道
const pipeline = new DataPipeline(rawData)
  // 解析日期字符串为 Date 对象
  .transform({
    field: 'date',
    method: 'parse',
    options: { format: 'YYYY-MM-DD' }
  })
  // 筛选数据
  .filter({
    field: 'value',
    operator: '>=',
    value: 10
  })
  // 按日期和类别分组聚合
  .aggregate({
    groupBy: ['date', 'category'],
    operations: [
      { field: 'value', method: 'sum', as: 'totalValue' }
    ]
  })
  // 按日期排序
  .sort({
    fields: ['date'],
    orders: ['asc']
  });

// 获取处理后的数据
const processedData = pipeline.get();
console.log(processedData);
```

### 自定义数据处理器

创建自定义的数据处理函数：

```tsx
import { createProcessor } from '@agions/taroviz-data';

// 定义一个移动平均数据处理器
const movingAverage = createProcessor({
  name: 'movingAverage',
  process: (data, options) => {
    const { field, windowSize = 3, targetField = 'ma' } = options;
    const result = [...data];
    
    for (let i = 0; i < result.length; i++) {
      const window = data
        .slice(Math.max(0, i - windowSize + 1), i + 1)
        .map(item => item[field]);
      
      const sum = window.reduce((acc, val) => acc + val, 0);
      result[i][targetField] = sum / window.length;
    }
    
    return result;
  }
});

// 使用自定义处理器
const timeSeriesData = [
  { date: '2023-01-01', value: 10 },
  { date: '2023-01-02', value: 15 },
  { date: '2023-01-03', value: 8 },
  { date: '2023-01-04', value: 12 },
  { date: '2023-01-05', value: 20 }
];

const processedData = movingAverage(timeSeriesData, {
  field: 'value',
  windowSize: 3,
  targetField: 'movingAvg'
});
console.log(processedData);
// 输出计算了移动平均的数据
```

### 实时数据处理

处理实时数据流：

```tsx
import { DataStream } from '@agions/taroviz-data';

// 创建数据流处理器
const stream = new DataStream({
  windowSize: 10, // 保持最近的 10 条数据
  processors: [
    {
      name: 'filter',
      options: {
        field: 'value',
        operator: '>',
        value: 0
      }
    },
    {
      name: 'normalize',
      options: {
        field: 'value',
        method: 'minmax',
        target: 'normalizedValue'
      }
    }
  ]
});

// 注册数据变更监听器
stream.onDataChange(data => {
  console.log('处理后的数据:', data);
});

// 添加数据到流中
function addRandomData() {
  stream.push({
    timestamp: new Date(),
    value: Math.random() * 100 - 20
  });
  
  setTimeout(addRandomData, 1000);
}

addRandomData();
```

## 与其他包的关系

- 为 `@agions/taroviz-core` 提供数据处理基础设施
- 为 `@agions/taroviz-charts` 提供数据转换和处理功能
- 与 `@agions/taroviz-hooks` 协同工作，提供数据驱动的状态管理
- 被主包 `@agions/taroviz` 整合并导出为统一 API

## 贡献指南

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/new-processor`)
3. 提交更改，遵循提交规范 (`git commit -m 'feat: add new data processor'`)
4. 推送到分支 (`git push origin feature/new-processor`)
5. 提交 Pull Request

### 数据处理器贡献准则

- 确保新的数据处理器有明确的命名和功能描述
- 提供完整的 TypeScript 类型定义
- 编写单元测试覆盖主要功能和边界情况
- 编写详细的文档和使用示例
- 考虑处理大数据集时的性能优化
- 遵循函数式编程范式，保持处理器的纯函数特性

## 仓库关联

本包是 [TaroViz](https://github.com/agions/taroviz) 项目的一部分，存在于 `packages/data` 目录中。

```bash
# 克隆整个项目
git clone https://github.com/agions/taroviz.git

# 进入 data 包目录
cd taroviz/packages/data

# 安装依赖
pnpm install

# 构建包
pnpm build
```

## 许可证

[MIT License](https://github.com/agions/taroviz/blob/main/LICENSE) © [Agions](https://github.com/Agions) 