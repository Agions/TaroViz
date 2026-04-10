# TaroViz 错误日志

---

## [ERR-20260410-001] PerformanceAnalyzer

**Logged**: 2026-04-10T08:00:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary
`getMetrics()` 方法不存在，实际应为 `getAllMetrics()`，返回类型为 `Map`

### Error
```
src/hooks/usePerformance.ts(225,42): error TS2551: Property 'getMetrics' does not exist on type 'PerformanceAnalyzer'. Did you mean 'getAllMetrics'?
```

### Context
- `usePerformance.ts` 的 `getReport()` 回调调用了 `analyzerRef.current.getMetrics?.()`
- `PerformanceAnalyzer` 只有 `getAllMetrics()` 方法，返回 `Map<string, Metric[]>`

### Suggested Fix
```ts
const report = analyzerRef.current.getAllMetrics?.();
return Array.from(report.values()).flat(); // 扁平化为数组
```

### Metadata
- Reproducible: yes
- Related Files: src/hooks/usePerformance.ts

---

## [ERR-20260410-002] BaseChartWrapper

**Logged**: 2026-04-10T08:01:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary
`resetMetrics()` 不存在于 `PerformanceAnalyzer` 类

### Error
```
src/hooks/usePerformance.ts(205,26): error TS2339: Property 'resetMetrics' does not exist on type 'PerformanceAnalyzer'.
```

### Context
- `usePerformance.ts` 的 `reset()` 调用了 `analyzerRef.current?.resetMetrics?.()`
- 类中只有静态方法 `resetInstance()`，实例方法 `resetMetrics` 不存在

### Suggested Fix
使用 `PerformanceAnalyzer.resetInstance()` 替代，或添加实例方法 `resetMetrics()`

### Metadata
- Reproducible: yes
- Related Files: src/hooks/usePerformance.ts, src/core/utils/performance/PerformanceAnalyzer.ts

---
