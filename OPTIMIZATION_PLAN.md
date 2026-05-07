# TaroViz 项目功能扩展与性能优化规划

> 版本: v1.11.5 → v2.0.0 (规划)
> 制定时间: 2026-05-07
> 目标: 代码质量提升 + 功能扩展 + 性能优化

---

## 📊 项目现状诊断

| 指标 | 当前状态 | 目标状态 |
|------|----------|----------|
| **TypeScript** | ✅ 0 errors | ✅ 0 errors |
| **测试** | ✅ 142 passed | ✅ 200+ passed |
| **Lint** | ❌ 788 errors | ✅ 0 errors |
| **代码行数** | ~7,568 行 | ~8,500 行 (功能扩展) |
| **图表类型** | 4 种 (boxplot/liquid/parallel/tree) | 10+ 种 |
| **Bundle 体积** | 待分析 | 减少 20% |

### 🔴 Lint 问题根因分析

```
788 errors 主要分类:
├── no-undef (~200) - 全局类型未定义
│   ├── window, document, HTMLElement, React
│   ├── console, Blob, navigator, ResizeObserver
│   └── 原因: ESLint 配置中 globals 未正确应用到所有文件
│
├── no-unused-vars (~500) - 未使用变量
│   ├── 回调参数 (event, params, data) 符合接口但不使用
│   ├── 原因: 事件处理函数参数按接口定义必须存在
│   └── 解决方案: 用 _ 前缀标记故意未使用
│
└── 其他 (~88) - 测试文件、Mock 重复等
```

---

## 🎯 分阶段执行计划

### Phase 1: 代码质量修复 (1-2 周)

**目标**: Lint 0 errors，建立高质量代码基线

#### R1 — ESLint 配置修复
- [ ] 修复 `no-undef` 错误：添加 `lib: ["DOM", "DOM.Iterable", "ES2022"]` 到 tsconfig
- [ ] 统一 `no-unused-vars` 规则：使用 `@typescript-eslint/no-unused-vars` 替代基础规则
- [ ] 添加 `argsIgnorePattern: "^_"` 允许 `_` 前缀参数
- [ ] 清理 dist 目录中的 mock 文件重复警告

#### R2 — 未使用变量清理
- [ ] 为故意未使用的回调参数添加 `_` 前缀
- [ ] 移除真正未使用的导入和变量
- [ ] 使用 `_variable` 模式标记接口必需但当前未使用的参数

#### R3 — 测试清理
- [ ] 删除 `dist/` 目录中的重复 mock 文件
- [ ] 添加测试覆盖率报告生成
- [ ] 补充核心模块测试用例

**交付物**: 
- `eslint.config.js` 修复
- Lint 0 errors 验证
- 测试覆盖率报告

---

### Phase 2: 性能优化 (2-3 周)

**目标**: Bundle 体积减少 20%，渲染性能提升

#### P1 — Bundle 分析
- [ ] 运行 `webpack-bundle-analyzer` 分析打包体积
- [ ] 识别大体积依赖和重复代码
- [ ] 生成 Bundle 分析报告

#### P2 — ECharts 按需导入优化
- [ ] 当前: `import * as echarts from 'echarts/core'`
- [ ] 优化: 按需导入图表模块，减少包体积
- [ ] 创建 `ChartModuleLoader` 动态加载机制

#### P3 — 图表渲染优化
- [ ] 实现图表实例缓存机制
- [ ] 添加 `React.memo` 优化图表组件重渲染
- [ ] 实现 `useMemo` 优化图表配置生成
- [ ] 添加防抖/节流处理窗口 resize 事件

#### P4 — 内存泄漏检测
- [ ] 确保所有定时器在组件卸载时清理
- [ ] 确保所有事件监听器在组件卸载时移除
- [ ] 添加 `useEffect` 清理函数验证
- [ ] 使用 Chrome DevTools Memory 快照验证

#### P5 — 懒加载优化
- [ ] 实现 `LazyChart` 组件的 IntersectionObserver 懒加载
- [ ] 添加图表组件代码分割 (code splitting)
- [ ] 优化首屏加载时间

**交付物**:
- Bundle 分析报告
- 性能测试报告 (Lighthouse)
- 内存泄漏检测验证

---

### Phase 3: 功能扩展 (3-4 周)

**目标**: 新增 6+ 种图表类型，增强现有功能

#### F1 — 新增图表类型

| 图表类型 | 优先级 | 复杂度 | 预计工时 |
|----------|--------|--------|----------|
| **热力图 (Heatmap)** | P0 | 中 | 2 天 |
| **雷达图 (Radar)** | P0 | 低 | 1 天 |
| **关系图 (Graph)** | P1 | 高 | 3 天 |
| **桑基图 (Sankey)** | P1 | 高 | 3 天 |
| **词云图 (WordCloud)** | P2 | 中 | 2 天 |
| **漏斗图 (Funnel)** | P2 | 低 | 1 天 |

**实现模式** (参考现有 chart 结构):
```
src/charts/heatmap/
├── index.tsx      # 图表组件
├── types.ts       # 类型定义
└── __tests__/     # 单元测试
```

#### F2 — 数据导出增强
- [ ] 当前: 仅支持 PNG 导出
- [ ] 新增: PDF 导出 (使用 jspdf)
- [ ] 新增: SVG 导出 (矢量格式)
- [ ] 新增: Excel 数据导出 (使用 xlsx)

#### F3 — 主题系统增强
- [ ] 动态主题切换 (运行时)
- [ ] 主题预览功能 (ThemeEditor 增强)
- [ ] 自定义主题导入/导出
- [ ] 暗色/亮色自动切换优化

#### F4 — 跨平台适配增强
- [ ] HarmonyOS 深度适配 (当前仅基础支持)
- [ ] 支付宝小程序增强适配
- [ ] 字节跳动小程序增强适配

#### F5 — 图表交互增强
- [ ] 图表联动 (多个图表数据同步)
- [ ] 数据钻取 (drill-down) 增强
- [ ] 自定义工具栏 (export, reset, dataZoom)
- [ ] 图表注释 (Annotation) 增强

**交付物**:
- 6+ 新图表类型
- 数据导出功能增强
- 主题系统 v2
- 单元测试覆盖新增功能

---

### Phase 4: 文档与发布 (1 周)

**目标**: 完整文档体系，正式发布 v2.0.0

#### D1 — API 文档更新
- [ ] 更新 TypeDoc 生成 API 文档
- [ ] 补充新图表类型 API 文档
- [ ] 更新 VitePress 文档站点

#### D2 — 示例更新
- [ ] 新增各图表类型示例
- [ ] 更新 Playground 演示
- [ ] 添加迁移指南 (v1.x → v2.x)

#### D3 — 发布流程
- [ ] 运行完整测试套件
- [ ] 更新 CHANGELOG.md
- [ ] 更新 README.md (性能指标、新特性)
- [ ] `npm version major` → `v2.0.0`
- [ ] `git tag v2.0.0` + push
- [ ] npm publish

---

## 📋 详细任务清单

### Phase 1: 代码质量修复

#### R1.1 — ESLint 配置修复
```bash
# 修改 eslint.config.js
# 1. 添加 lib 配置到 tsconfig
# 2. 统一 no-unused-vars 规则
# 3. 添加 _ 前缀忽略模式
```

#### R1.2 — 批量修复 no-undef
```bash
# 添加 @types/node, @types/react-dom 等类型包
npm install -D @types/node @types/react-dom

# 验证修复
npm run lint
```

#### R1.3 — 批量修复 no-unused-vars
```bash
# 使用 sed 批量添加 _ 前缀到未使用的参数
# 或使用 ESLint --fix 自动修复

# 手动修复模式:
# event -> _event
# params -> _params  
# data -> _data
# index -> _index
```

---

### Phase 2: 性能优化

#### P2.1 — ECharts 按需导入
```typescript
// 当前 (全量导入)
import * as echarts from 'echarts/core';

// 优化 (按需导入)
import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart,
  PieChart,
  // ...按需导入
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // ...按需导入
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  BarChart, LineChart, PieChart,
  TitleComponent, TooltipComponent, GridComponent,
  CanvasRenderer
]);
```

#### P2.2 — 图表实例缓存
```typescript
// 在 BaseChart 中添加缓存机制
const chartCache = new WeakMap<HTMLDivElement, EChartsType>();

// 组件卸载时清理
useEffect(() => {
  return () => {
    const chart = chartCache.get(containerRef.current);
    if (chart) chart.dispose();
  };
}, []);
```

---

### Phase 3: 功能扩展示例

#### F1.1 — 热力图 (Heatmap) 实现模板
```typescript
// src/charts/heatmap/index.tsx
import * as React from 'react';
import { BaseChart, BaseChartProps } from '@/core/components/BaseChart';
import type { HeatmapSeriesOption } from 'echarts/types/dist/shared';

export interface HeatmapChartProps extends BaseChartProps {
  data: Array<[number, number, number]>; // [x, y, value]
  visualMap?: {
    min: number;
    max: number;
    calculable?: boolean;
  };
}

export const HeatmapChart: React.FC<HeatmapChartProps> = (props) => {
  const { data, visualMap, ...rest } = props;
  
  const option = {
    xAxis: { type: 'category' },
    yAxis: { type: 'category' },
    series: [{
      type: 'heatmap',
      data,
      ...visualMap && { visualMap }
    }]
  };
  
  return <BaseChart option={option} {...rest} />;
};

export default HeatmapChart;
```

---

## 📈 预期成果

| 阶段 | 时间 | 主要成果 |
|------|------|----------|
| Phase 1 | 1-2 周 | Lint 0 errors, 代码质量基线 |
| Phase 2 | 2-3 周 | Bundle -20%, 渲染性能提升 |
| Phase 3 | 3-4 周 | 6+ 新图表, 功能增强 |
| Phase 4 | 1 周 | v2.0.0 发布, 完整文档 |

**总计**: 7-10 周完成全部优化

---

## ⚠️ 风险与应对

| 风险 | 影响 | 应对措施 |
|------|------|----------|
| ECharts 版本升级不兼容 | 高 | 锁定 echarts ^5.4.3, 逐步测试 |
| 新图表类型测试覆盖不足 | 中 | 每个图表至少 10 个测试用例 |
| Bundle 优化影响功能 | 中 | 逐步优化，每步验证功能 |
| HarmonyOS 适配复杂度高 | 中 | 优先保证基础功能，逐步增强 |

---

## 🚀 启动建议

**推荐启动顺序**:
1. **Phase 1 (R1-R3)** — 先修复 Lint，建立高质量基线
2. **Phase 2 (P1-P2)** — Bundle 分析，确定优化方向
3. **Phase 3 (F1)** — 从简单的雷达图开始，验证扩展模式
4. **Phase 4** — 文档和发布

**优先级**: 代码质量 > 性能优化 > 功能扩展

---

*规划版本: v1.0 | 最后更新: 2026-05-07*
