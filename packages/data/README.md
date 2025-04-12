# @agions/taroviz-data

TaroViz 数据处理工具库，提供强大的数据转换、处理和分析能力。

## 特性

- 📊 强大的数据处理能力
- 🔄 灵活的数据转换
- 📈 数据分析工具
- 🚀 高性能实现
- 🛠️ 丰富的工具函数

## 安装

```bash
# npm
npm install @agions/taroviz-data

# yarn
yarn add @agions/taroviz-data

# pnpm
pnpm add @agions/taroviz-data
```

## 要求

- React >= 16.13.0
- @tarojs/taro >= 3.4.0

## 使用

```typescript
import { transform, aggregate, format } from '@agions/taroviz-data';

// 数据转换
const transformedData = transform(rawData, {
  type: 'line',
  mapping: {
    x: 'date',
    y: 'value'
  }
});

// 数据聚合
const aggregatedData = aggregate(data, {
  groupBy: 'category',
  measures: ['value'],
  operations: ['sum', 'average']
});

// 数据格式化
const formattedData = format(data, {
  date: 'YYYY-MM-DD',
  value: '0.00'
});
```

## API 文档

### 数据转换

#### transform(data, options)

数据转换函数，用于将原始数据转换为图表所需格式。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| data | array | 是 | 原始数据 |
| options | object | 是 | 转换配置 |

```typescript
const options = {
  type: 'line' | 'bar' | 'pie',
  mapping: {
    x: string,
    y: string,
    color?: string
  }
};
```

### 数据聚合

#### aggregate(data, options)

数据聚合函数，用于数据统计和汇总。

```typescript
const options = {
  groupBy: string | string[],
  measures: string[],
  operations: ('sum' | 'average' | 'count' | 'max' | 'min')[]
};
```

### 数据格式化

#### format(data, formatters)

数据格式化函数，支持日期、数字等格式化。

```typescript
const formatters = {
  date: string | DateFormatter,
  number: string | NumberFormatter
};
```

## 工具函数

### 数据验证

```typescript
import { validate } from '@agions/taroviz-data';

const isValid = validate(data, schema);
```

### 数据过滤

```typescript
import { filter } from '@agions/taroviz-data';

const filteredData = filter(data, conditions);
```

### 数据排序

```typescript
import { sort } from '@agions/taroviz-data';

const sortedData = sort(data, {
  key: 'value',
  order: 'desc'
});
```

## 开发指南

### 本地开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build
```

### 目录结构

```
src/
  ├── transform/     # 数据转换
  ├── aggregate/     # 数据聚合
  ├── format/        # 数据格式化
  ├── utils/         # 工具函数
  ├── types/         # TypeScript 类型定义
  └── index.ts       # 入口文件
```

## 最佳实践

### 性能优化

1. 使用适当的数据结构
2. 实现数据缓存
3. 避免不必要的数据转换
4. 使用批量处理

### 数据处理流程

```typescript
import { pipeline } from '@agions/taroviz-data';

const result = pipeline(data, [
  validate,
  transform,
  aggregate,
  format
]);
```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交改动 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 许可证

MIT License © 2024 Agions 