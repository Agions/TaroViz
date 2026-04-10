# TaroViz 项目学习日志

## 优化过程中的经验记录

---

## [LRN-20260410-001] best_practice

**Logged**: 2026-04-10T08:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: frontend

### Summary
ECharts 实例在 React 组件卸载后仍然可能持有 Promise 回调引用，导致 unmount 后访问已销毁 DOM

### Details
`BaseChartWrapper` 原始实现使用 `cleanupPromise.then()` 模式：
```tsx
const cleanupPromise = initChart();
return () => { cleanupPromise.then((cleanup) => cleanup?.()); };
```
如果组件在 `initChart()` 异步完成前 unmount，`cleanup` 永远不会被调用，ECharts 实例泄漏。

### Suggested Action
使用 `isMountedRef` + `cleanupRef` 模式：
```tsx
const isMountedRef = useRef(true);
const cleanupRef = useRef<(() => void) | null>(null);

useEffect(() => {
  isMountedRef.current = true;
  const init = async () => {
    const instance = await adapter.init();
    if (!isMountedRef.current) { instance.dispose(); return; }
    cleanupRef.current = () => instance.dispose();
  };
  init();
  return () => { isMountedRef.current = false; cleanupRef.current?.(); };
}, []);
```

### Metadata
- Source: error
- Related Files: src/charts/common/BaseChartWrapper.tsx
- Tags: react-lifecycle, async-cleanup, echarts
- Pattern-Key: react.async_cleanup_ref_pattern

---

## [LRN-20260410-002] best_practice

**Logged**: 2026-04-10T08:10:00+08:00
**Priority**: medium
**Status**: pending
**Area**: frontend

### Summary
单例模式在 React 图表库中会导致多实例指标数据混淆

### Details
`PerformanceAnalyzer.getInstance()` 全局单例被多个 `BaseChart` 共享。当同一页面有多个图表时，所有图表的 `initTime/renderTime/updateTime` 指标会互相覆盖，因为底层 `metrics` Map 是共享的。

### Suggested Action
按 `chartId` 隔离实例：
```ts
public static getInstance(config?: PerformanceAnalysisConfig): PerformanceAnalyzer {
  if (config?.chartId) {
    if (!instances.has(config.chartId)) {
      instances.set(config.chartId, new PerformanceAnalyzer(config));
    }
    return instances.get(config.chartId)!;
  }
  // Legacy singleton
  ...
}
```

### Metadata
- Source: error
- Related Files: src/core/utils/performance/PerformanceAnalyzer.ts, src/core/components/BaseChart.tsx
- Tags: singleton, performance, react
- Pattern-Key: performance.per_chart_analyzer

---

## [LRN-20260410-003] best_practice

**Logged**: 2026-04-10T08:15:00+08:00
**Priority**: medium
**Status**: pending
**Area**: frontend

### Summary
`requestAnimationFrame` 循环未做幂等保护，多次调用 `start()` 会启动多个循环

### Details
`usePerformance.ts` 的 `start()` 函数每次调用都会执行 `requestAnimationFrame(updateFps)`，但没有检查是否已经在运行中。这在 React StrictMode 或快速重挂载时会导致多个 RAF 循环同时运行。

### Suggested Action
在 `start()` 开头添加幂等检查：
```ts
const start = useCallback(() => {
  if (animationFrameRef.current !== null) return; // Already running
  animationFrameRef.current = requestAnimationFrame(updateFps);
  ...
}, [...]);
```

### Metadata
- Source: error
- Related Files: src/hooks/usePerformance.ts
- Tags: raf, performance, idempotency
- Pattern-Key: performance.raf_idempotent_start

---
