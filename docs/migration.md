# 迁移指南

本指南将帮助您从旧版本的 TaroViz 迁移到新版本。

## 1. 从 v1.x 迁移到 v2.0.0

### 1.1 重大变更

v2.0.0 是功能大版本更新，新增了 6 种图表类型，并优化了项目架构。

#### 新增图表类型

| 图表 | 组件名 |
|------|--------|
| 雷达图 | `RadarChart` |
| 热力图 | `HeatmapChart` |
| 漏斗图 | `FunnelChart` |
| 关系图 | `GraphChart` |
| 桑基图 | `SankeyChart` |
| 词云图 | `WordCloudChart` |

#### 架构优化

- **目录重构**: `utils/` 目录已重新组织为更清晰的领域结构
  - `utils/debug/` → `core/utils/debug/`
  - `utils/configGenerator/` → `core/utils/config/`
  - `utils/codeGenerator/` → `core/utils/generator/`
  - `hooks/useAnimation.ts` → `core/utils/performance/useAnimation.ts`
  - `hooks/useDataZoom.ts` → `core/utils/performance/useDataZoom.ts`

- **统一节流函数**: 移除了重复的 `throttle` 实现，统一使用 `performanceUtils.ts` 中的版本

### 1.2 导入路径变更

以下导入路径已更新：

```typescript
// 旧路径
import { useAnimation } from '@agions/taroviz/hooks/useAnimation';
import { useDataZoom } from '@agions/taroviz/hooks/useDataZoom';
import { generateChartConfig } from '@agions/taroviz/utils/configGenerator';
import { generateCodeExample } from '@agions/taroviz/utils/codeGenerator';

// 新路径（推荐）
import { useAnimation, useDataZoom } from '@agions/taroviz';
import { generateChartConfig } from '@agions/taroviz';
import { generateCodeExample } from '@agions/taroviz';
```

> **注意**: 所有功能仍通过主入口 `@agions/taroviz` 导出，无需更改导入语句。

### 1.3 API 变化

#### 1.3.1 组件属性变化

| 旧属性名 | 新属性名 | 描述 |
| -------- | -------- | ---- |
| `chart-id` | `chartId` | 图表唯一标识符 |
| `auto-resize` | `autoResize` | 是否自动调整大小 |
| `init-options` | `initOptions` | 初始化选项 |

#### 1.3.2 事件变化

| 旧事件名 | 新事件名 | 描述 |
| -------- | -------- | ---- |
| `on-init` | `onInit` | 图表初始化完成事件 |
| `on-render-complete` | `onRenderComplete` | 图表渲染完成事件 |

#### 1.3.3 方法变化

| 旧方法名 | 新方法名 | 描述 |
| -------- | -------- | ---- |
| `resizeChart` | `resize` | 调整图表大小 |
| `setChartOption` | `setOption` | 设置图表配置项 |
| `getChartOption` | `getOption` | 获取图表配置项 |

### 1.4 迁移步骤

1. **更新依赖**
   ```bash
   npm install @agions/taroviz@2.0.0
   # 或
   pnpm add @agions/taroviz@2.0.0
   ```

2. **检查导入路径**
   - 确认所有导入都来自 `@agions/taroviz`
   - 无需修改内部路径

3. **更新属性命名**
   - 将短横线命名改为驼峰命名

4. **运行测试**
   ```bash
   npm test
   ```

5. **验证功能**
   - 检查图表渲染是否正常
   - 验证事件处理是否正确

### 1.5 示例对比

#### 旧版本

```typescript
<LineChart
  chart-id="chart-1"
  option={option}
  width="100%"
  height={400}
  auto-resize={true}
  on-init={() => console.log('初始化完成')}
  on-render-complete={() => console.log('渲染完成')}
/>
```

#### 新版本

```typescript
<LineChart
  chartId="chart-1"
  option={option}
  width="100%"
  height={400}
  autoResize={true}
  onInit={() => console.log('初始化完成')}
  onRenderComplete={() => console.log('渲染完成')}
/>
```

## 2. 从 v1.0.x 迁移到 v1.1.x

### 2.1 API 变化

#### 2.1.1 组件属性变化

| 旧属性名 | 新属性名 | 描述 |
| -------- | -------- | ---- |
| `chart-id` | `chartId` | 图表唯一标识符 |
| `auto-resize` | `autoResize` | 是否自动调整大小 |
| `init-options` | `initOptions` | 初始化选项 |

#### 2.1.2 事件变化

| 旧事件名 | 新事件名 | 描述 |
| -------- | -------- | ---- |
| `on-init` | `onInit` | 图表初始化完成事件 |
| `on-render-complete` | `onRenderComplete` | 图表渲染完成事件 |

#### 2.1.3 方法变化

| 旧方法名 | 新方法名 | 描述 |
| -------- | -------- | ---- |
| `resizeChart` | `resize` | 调整图表大小 |
| `setChartOption` | `setOption` | 设置图表配置项 |
| `getChartOption` | `getOption` | 获取图表配置项 |

### 2.2 迁移步骤

1. 更新组件属性名，将短横线命名改为驼峰命名
2. 更新事件名，将短横线命名改为驼峰命名
3. 更新方法名，将 `resizeChart` 改为 `resize`，`setChartOption` 改为 `setOption`，`getChartOption` 改为 `getOption`

### 2.3 示例

#### 旧版本

```typescript
<LineChart
  chart-id="chart-1"
  option={option}
  width="100%"
  height={400}
  auto-resize={true}
  on-init={() => console.log('初始化完成')}
  on-render-complete={() => console.log('渲染完成')}
/>
```

#### 新版本

```typescript
<LineChart
  chartId="chart-1"
  option={option}
  width="100%"
  height={400}
  autoResize={true}
  onInit={() => console.log('初始化完成')}
  onRenderComplete={() => console.log('渲染完成')}
/>
```

## 3. 从 v1.1.x 迁移到 v1.2.x

### 3.1 API 变化

#### 3.1.1 平台适配器变化

- 移除了 `getEnv()` 函数，使用 `detectPlatform()` 替代
- 适配器工厂函数现在使用 `detectPlatform()` 检测平台
- 添加了对百度小程序、字节跳动小程序和 HarmonyOS 的支持

#### 3.1.2 性能分析工具

- 添加了 `PerformanceAnalyzer` 性能分析工具
- 支持帧率监控和内存使用分析

#### 3.1.3 配置生成器

- 添加了 `ConfigGenerator` 配置生成器
- 支持快速生成 ECharts 配置项

#### 3.1.4 代码生成器

- 添加了 `CodeGenerator` 代码生成器
- 支持生成 React、Vue、Vanilla 框架的代码示例

### 3.2 迁移步骤

1. 将 `getEnv()` 替换为 `detectPlatform()`
2. 更新适配器相关代码，使用新的适配器工厂函数
3. 可以选择使用新添加的性能分析工具、配置生成器和代码生成器

### 3.3 示例

#### 旧版本

```typescript
import { getEnv } from '@agions/taroviz';

const env = getEnv();
console.log('当前环境:', env);
```

#### 新版本

```typescript
import { detectPlatform } from '@agions/taroviz';

const platform = detectPlatform();
console.log('当前平台:', platform);
```

## 4. 常见问题

### 4.1 组件无法渲染

**问题**：迁移后组件无法渲染。

**解决方案**：

1. 检查组件属性名是否正确，使用驼峰命名
2. 检查事件名是否正确，使用驼峰命名
3. 检查是否正确引入了组件
4. 检查图表配置项是否正确

### 4.2 事件不触发

**问题**：迁移后事件不触发。

**解决方案**：

1. 检查事件名是否正确，使用驼峰命名
2. 检查事件处理函数是否正确定义
3. 检查组件是否正确绑定了事件

### 4.3 方法调用失败

**问题**：迁移后方法调用失败。

**解决方案**：

1. 检查方法名是否正确
2. 检查是否通过 ref 获取了组件实例
3. 检查组件是否已经初始化完成

### 4.4 导入路径错误

**问题**：迁移后出现导入路径错误。

**解决方案**：

1. 确认所有导入都来自 `@agions/taroviz`
2. 检查是否使用了已废弃的内部路径
3. 清除缓存并重新安装依赖

## 5. 迁移工具

### 5.1 代码迁移脚本

TaroViz 提供了代码迁移脚本，可以帮助您自动迁移代码：

```bash
# 安装迁移工具
npm install -g @agions/taroviz-migrate

# 运行迁移脚本
npx @agions/taroviz-migrate migrate --source ./src --target ./src
```

### 5.2 配置迁移

对于配置文件的迁移，建议手动更新，确保配置项的正确性。

## 6. 最佳实践

1. **逐步迁移**：建议逐步迁移，先迁移核心功能，再迁移其他功能
2. **测试验证**：迁移后，务必进行测试验证，确保功能正常
3. **文档更新**：更新项目文档，反映 API 变化
4. **培训团队**：对团队成员进行培训，确保大家了解新 API

## 7. 支持

如果在迁移过程中遇到问题，可以通过以下方式获取支持：

- [GitHub Issues](https://github.com/Agions/TaroViz/issues) - 提交问题和建议
- [在线文档](https://agions.github.io/TaroViz/) - 查看详细文档
- [示例](https://agions.github.io/TaroViz/examples/) - 参考使用示例

## 8. 版本支持策略

| 版本 | 发布日期 | 支持状态 |
| ---- | -------- | -------- |
| v1.0.x | 2025-01-01 | 已停止支持 |
| v1.1.x | 2025-04-14 | 维护中 |
| v1.2.x | 2025-11-28 | 维护中 |
| v2.0.0 | 2026-05-07 | 活跃开发中 |

我们建议您尽快迁移到最新版本，以获得更好的性能和更多的功能。
