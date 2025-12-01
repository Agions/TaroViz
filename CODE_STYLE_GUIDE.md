# TaroViz 代码规范指南

## 1. 命名约定

### 1.1 文件命名

- **组件文件**：使用 PascalCase，如 `BaseChart.tsx`
- **工具函数文件**：使用 kebab-case，如 `chart-utils.ts`
- **类型定义文件**：使用 kebab-case，如 `chart-types.ts`
- **样式文件**：使用 kebab-case，如 `base-chart.scss`
- **测试文件**：使用 `.test.ts` 或 `.spec.ts` 后缀，如 `BaseChart.test.tsx`

### 1.2 组件命名

- 使用 PascalCase，如 `BaseChart`、`BarChart`
- 组件名称应清晰反映其功能
- 避免使用缩写，除非是广为人知的缩写（如 `UI`、`API`）

### 1.3 函数命名

- 使用 camelCase，如 `initChart`、`updateOptions`
- 函数名称应清晰反映其功能
- 动词开头，如 `get`、`set`、`update`、`create` 等
- 避免使用缩写，除非是广为人知的缩写

### 1.4 变量命名

- 使用 camelCase，如 `chartInstance`、`chartOptions`
- 变量名称应清晰反映其含义
- 避免使用单字母变量（循环变量除外，如 `i`、`j`）
- 避免使用缩写，除非是广为人知的缩写

### 1.5 常量命名

- 使用 UPPER_CASE，如 `DEFAULT_THEME`、`MAX_CHART_COUNT`
- 单词之间用下划线分隔
- 常量应具有明确的含义

### 1.6 类型命名

- 使用 PascalCase，如 `ChartProps`、`ChartOptions`
- 接口名称使用 `I` 前缀或直接使用名词，如 `IChartProps` 或 `ChartProps`
- 类型别名使用 `T` 前缀或直接使用名词，如 `TChartType` 或 `ChartType`
- 枚举名称使用 PascalCase，如 `ChartType`

## 2. 代码风格

### 2.1 缩进

- 使用 2 个空格缩进
- 避免使用制表符

### 2.2 引号

- 使用单引号 `'` 而非双引号 `"`
- 模板字符串使用反引号 `` ` ``

### 2.3 换行

- 每行代码不超过 120 个字符
- 运算符后换行
- 逗号后换行
- 函数参数过长时，每行一个参数

### 2.4 空格

- 运算符前后加空格，如 `a + b` 而非 `a+b`
- 逗号后加空格，如 `[1, 2, 3]` 而非 `[1,2,3]`
- 分号后加空格，如 `let a = 1; let b = 2;` 而非 `let a = 1;let b = 2;`
- 函数参数括号前后加空格，如 `function(a, b)` 而非 `function(a,b)`
- 花括号前后加空格，如 `{ a: 1 }` 而非 `{a: 1}`

### 2.5 括号

- 条件语句和循环语句必须使用花括号
- 花括号换行，如：
  ```tsx
  if (condition) {
    // code
  }
  ```
  而非：
  ```tsx
  if (condition) { // code }
  ```

### 2.6 分号

- 必须使用分号结束语句
- 避免依赖自动分号插入

### 2.7 空行

- 函数之间加空行
- 代码块之间加空行
- 文件末尾加空行
- 避免连续的空行

## 3. 注释规范

### 3.1 模块注释

- 每个模块顶部添加模块说明
- 包括模块功能、作者、创建日期等信息
- 使用 JSDoc 格式

```tsx
/**
 * BaseChart 组件
 * 基础图表组件，提供图表的初始化、渲染和事件处理
 * @author TaroViz Team
 * @since 2025-11-26
 */
```

### 3.2 函数注释

- 使用 JSDoc 格式注释函数
- 包括函数功能、参数、返回值、抛出异常等
- 对于复杂函数，添加示例用法

```tsx
/**
 * 初始化图表实例
 * @param container 图表容器元素
 * @param options 图表配置选项
 * @returns 图表实例
 * @throws {Error} 当容器无效时抛出错误
 */
function initChart(container: HTMLElement, options: ChartOptions): ChartInstance {
  // code
}
```

### 3.3 行内注释

- 对复杂逻辑添加行内注释
- 注释应简洁明了
- 避免注释显而易见的代码

```tsx
// 计算图表宽度，考虑容器padding
const chartWidth = container.clientWidth - paddingLeft - paddingRight;
```

### 3.4 类型注释

- 为接口和类型别名添加注释
- 说明类型的用途和各个属性的含义

```tsx
/**
 * 图表配置选项
 */
interface ChartOptions {
  /**
   * 图表宽度
   */
  width?: number | string;
  
  /**
   * 图表高度
   */
  height?: number | string;
  
  /**
   * 图表主题
   */
  theme?: string | Record<string, any>;
}
```

## 4. 组件开发规范

### 4.1 组件结构

- 每个组件单独一个文件
- 组件文件包含组件定义、类型定义和样式
- 复杂组件可拆分为多个子组件

### 4.2 Props 设计

- 使用接口定义 Props 类型
- 为每个 Prop 添加类型和默认值
- 区分必填和可选 Props
- 使用 `PropTypes` 进行运行时类型检查（可选）

```tsx
interface ChartProps {
  // 必填属性
  data: any[];
  
  // 可选属性
  options?: ChartOptions;
  style?: React.CSSProperties;
  className?: string;
  width?: number | string;
  height?: number | string;
  
  // 事件处理
  onClick?: (params: any) => void;
  onEvents?: Record<string, (params: any) => void>;
}

const defaultProps: Partial<ChartProps> = {
  width: '100%',
  height: 400,
  theme: 'default',
};
```

### 4.3 状态管理

- 优先使用 React Hooks 管理状态
- 避免不必要的状态，尽量使用 props 或计算属性
- 复杂状态使用 `useReducer` 管理
- 使用 `useMemo` 和 `useCallback` 优化性能

### 4.4 生命周期

- 使用 React Hooks 替代类组件生命周期方法
- `useEffect` 用于处理副作用
- `useLayoutEffect` 用于需要同步执行的副作用

### 4.5 样式设计

- 使用 CSS Modules 或 SCSS 模块化样式
- 避免使用全局样式
- 样式命名使用 BEM 命名规范
- 组件样式应与组件逻辑分离

## 5. TypeScript 规范

### 5.1 类型定义

- 为所有变量、函数、组件添加类型定义
- 避免使用 `any` 类型
- 使用 `unknown` 类型代替 `any`，除非确实无法确定类型
- 使用联合类型和交叉类型增强类型安全性

### 5.2 接口设计

- 接口应简洁明了，只包含必要的属性
- 接口应具有明确的含义
- 避免过度设计接口

### 5.3 类型使用

- 使用类型断言时，确保类型安全
- 优先使用类型守卫而非类型断言
- 使用泛型增强代码的复用性

### 5.4 严格模式

- 启用 TypeScript 严格模式
- 配置 `tsconfig.json` 中的严格选项：
  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "strictFunctionTypes": true,
      "strictBindCallApply": true,
      "strictPropertyInitialization": true,
      "noImplicitThis": true,
      "alwaysStrict": true
    }
  }
  ```

## 6. 测试规范

### 6.1 测试文件结构

- 测试文件与被测试文件放在同一目录下
- 测试文件命名为 `[filename].test.tsx` 或 `[filename].spec.tsx`

### 6.2 测试用例编写

- 每个测试用例测试一个功能点
- 测试用例名称应清晰反映测试内容
- 使用 `describe` 组织测试用例
- 使用 `it` 或 `test` 定义单个测试用例

```tsx
describe('BaseChart 组件', () => {
  it('应该正确初始化图表', () => {
    // 测试代码
  });
  
  it('应该响应数据变化', () => {
    // 测试代码
  });
});
```

### 6.3 测试覆盖率

- 核心功能测试覆盖率 ≥ 90%
- 图表组件测试覆盖率 ≥ 80%
- 工具函数测试覆盖率 ≥ 95%
- 定期检查测试覆盖率报告

### 6.4 测试最佳实践

- 测试组件的行为而非实现细节
- 使用模拟数据测试组件
- 测试边界情况和异常情况
- 保持测试用例的独立性

## 7. Git 规范

### 7.1 分支命名

- **主分支**：`main`
- **开发分支**：`develop`
- **特性分支**：`feature/[feature-name]`
- **修复分支**：`fix/[fix-name]`
- **发布分支**：`release/[version]`
- **热修复分支**：`hotfix/[fix-name]`

### 7.2 Commit 消息

- 使用英文编写 Commit 消息
- 遵循 Conventional Commits 规范
- 格式：`type(scope?): description`
- 类型包括：`feat`（新功能）、`fix`（修复）、`docs`（文档）、`style`（代码风格）、`refactor`（重构）、`test`（测试）、`chore`（构建过程或辅助工具的变动）

示例：
- `feat(chart): add bar chart component`
- `fix(core): fix chart initialization issue`
- `docs: update API documentation`

### 7.3 Pull Request

- 每个 Pull Request 解决一个问题
- 提供清晰的描述和测试结果
- 确保所有测试通过
- 确保代码符合规范
- 至少一个人 review 后才能合并

## 8. 性能优化

### 8.1 组件性能

- 使用 `React.memo` 优化组件渲染
- 使用 `useMemo` 缓存计算结果
- 使用 `useCallback` 缓存函数引用
- 避免在渲染过程中创建新对象
- 合理使用 `key` 属性

### 8.2 图表性能

- 优化图表配置，减少不必要的渲染
- 使用 `notMerge` 和 `lazyUpdate` 优化图表更新
- 合理设置 `animation` 选项
- 对于大数据量，使用数据采样或分页

### 8.3 构建性能

- 启用 Tree Shaking，移除未使用的代码
- 启用代码分割，减少初始加载体积
- 优化 Webpack 配置，提高构建速度
- 使用持久化缓存，减少重复构建

## 9. 可访问性

### 9.1 组件可访问性

- 确保组件支持键盘导航
- 为图表添加适当的 ARIA 属性
- 确保图表有清晰的标题和描述
- 支持高对比度模式

### 9.2 文档可访问性

- 确保文档有良好的结构和导航
- 为代码示例添加说明
- 提供多种语言的文档（可选）

## 10. 最佳实践

- 遵循 SOLID 原则
- 保持代码简洁明了
- 优先使用函数式编程范式
- 避免过度设计
- 定期重构代码，保持代码质量
- 编写清晰的文档
- 重视测试

## 11. 违规处理

- 代码审查时发现的违规应及时修复
- 严重违规应记录并跟踪
- 定期进行代码规范培训
- 建立代码规范检查机制

---

**文档版本**：v1.0
**编写日期**：2025-11-26
**作者**：TaroViz Team