# TaroViz项目TypeScript类型优化方案

## 问题分析

在TaroViz项目中，我们发现存在以下TypeScript类型问题：

1. 各分包之间的类型定义不一致，造成引用困难
2. 临时生成的类型定义文件使用了`declare module`包装，容易引起类型冲突
3. 代码风格问题，如空行、空格和导入顺序不符合项目规范
4. 类型定义中存在实现代码，应该只保留类型声明
5. 可能存在循环依赖问题

## 解决方案

### 1. 规范化所有分包的类型定义文件

为每个分包创建标准的类型定义文件，去除`declare module`包装：

```typescript
// 示例：标准类型定义文件结构
/**
 * 包说明
 */

// 类型定义
export interface SomeInterface {
  // ...
}

// 函数声明
export declare function someFunction(): void;

// 默认导出接口
export interface DefaultExport {
  // ...
}

// 默认导出
declare const _default: DefaultExport;
export default _default;
```

### 2. 修复各个分包的类型定义

#### `@agions/taroviz-core`

修复核心包的类型定义：
- 规范化EventType等类型的格式
- 添加详细的JSDoc注释
- 明确类型和方法签名

#### `@agions/taroviz-adapters`

增强适配器包的类型定义：
- 明确Adapter接口的属性和方法
- 为AdapterOptions提供更详细的类型
- 修复PlatformType枚举

#### `@agions/taroviz-charts`

优化图表包的类型定义：
- 为所有图表组件提供具体的React组件类型
- 明确ChartProps接口的属性类型
- 优化createChart函数的返回类型

#### `@agions/taroviz-themes`

完善主题包的类型定义：
- 规范化ThemeOptions接口
- 为主题函数提供精确的参数和返回类型
- 改进默认导出的类型

#### `@agions/taroviz-hooks`

加强钩子包的类型定义：
- 避免使用`Function`类型，使用具体的函数签名
- 为所有钩子提供精确的参数和返回类型
- 修复格式问题

#### `@agions/taroviz-data`

完善数据包的类型定义：
- 为数据转换和处理函数提供精确的类型
- 使用泛型增强类型安全性
- 优化导出接口

#### `@agions/taroviz`（全量包）

优化全量包的类型定义：
- 使用命名空间暂时解决跨包引用问题
- 确保类型扩展正确
- 修复默认导出接口

### 3. 解决导入和导出问题

调整所有文件的导入顺序，符合项目ESLint规则：

```typescript
// 导入顺序示例
import * as AdaptersLib from '@agions/taroviz-adapters';
import * as ChartsLib from '@agions/taroviz-charts';
import * as CoreLib from '@agions/taroviz-core';
import * as DataLib from '@agions/taroviz-data';
import * as HooksLib from '@agions/taroviz-hooks';
import HooksDefault from '@agions/taroviz-hooks';
import * as ThemesLib from '@agions/taroviz-themes';
```

优化导出格式：

```typescript
// 单行格式导出
export { getAdapter, detectPlatform, version as adaptersVersion } from '@agions/taroviz-adapters';

// 解构导出
export const { LineChart, BarChart, PieChart } = ChartsLib;
```

### 4. 避免类型重复

共享类型定义应该在一个地方定义，然后被其他包导入：

```typescript
// 在core包中定义
export interface ChartOptions {
  // ...
}

// 在其他包中导入
import { ChartOptions } from '@agions/taroviz-core';
```

### 5. 未来优化方向

1. 考虑使用monorepo工具如Lerna或Turborepo管理类型一致性
2. 添加TypeScript项目引用功能，明确包间依赖
3. 为项目添加完整的TypeScript构建管道，确保类型正确生成
4. 添加自动化测试，测试生成的类型定义的正确性

## 执行步骤

1. 修复所有分包的类型定义文件，去除`declare module`包装
2. 调整导入顺序和格式，符合ESLint规则
3. 更新全量包的类型引用，确保一致性
4. 运行TypeScript编译器验证类型正确性
5. 确保所有项目中导入这些包的代码可以正常工作

完成这些步骤后，TaroViz项目的类型系统将更加健壮和易于维护。 