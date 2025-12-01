# 性能优化

TaroViz 基于 ECharts 优化，确保了良好的性能表现。但在处理大数据集或复杂图表时，仍然需要注意一些性能优化技巧。本指南将介绍如何优化 TaroViz 图表的性能。

## 1. 大数据集处理

### 1.1 数据采样

当数据量过大时，可以考虑对数据进行采样，只显示部分数据点：

```typescript
// 数据采样函数
const sampleData = (data: number[], sampleSize: number) => {
  if (data.length <= sampleSize) {
    return data;
  }

  const step = Math.ceil(data.length / sampleSize);
  return data.filter((_, index) => index % step === 0);
};

const BigDataExample = () => {
  // 生成大数据集
  const rawData = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));

  // 采样后的数据
  const sampledData = sampleData(rawData, 1000);

  const option = {
    // 配置项
    series: [
      {
        data: sampledData,
        type: 'line'
      }
    ]
  };

  return (
    <LineChart
      chartId="big-data-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

### 1.2 数据过滤

根据用户需求，只显示相关的数据：

```typescript
const FilteredDataExample = () => {
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-31');
  const [rawData, setRawData] = useState([]);

  // 过滤数据
  const filteredData = rawData.filter(item => {
    return item.date >= startDate && item.date <= endDate;
  });

  const option = {
    // 配置项
    series: [
      {
        data: filteredData,
        type: 'line'
      }
    ]
  };

  return (
    <LineChart
      chartId="filtered-data-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

## 2. 渲染优化

### 2.1 减少重绘

避免频繁更新图表配置，尽量合并更新：

```typescript
const OptimizedUpdateExample = () => {
  const [option, setOption] = useState({
    // 初始配置
  });

  // 优化的更新函数
  const updateChart = (newData: number[]) => {
    setOption(prev => ({
      ...prev,
      series: [
        {
          ...prev.series[0],
          data: newData
        }
      ]
    }));
  };

  // 避免频繁调用 updateChart
  useEffect(() => {
    const interval = setInterval(() => {
      // 生成新数据
      const newData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
      updateChart(newData);
    }, 1000); // 每秒更新一次，避免过于频繁

    return () => clearInterval(interval);
  }, []);

  return (
    <LineChart
      chartId="optimized-update-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

### 2.2 使用 canvas 渲染器

对于复杂图表，推荐使用 canvas 渲染器，性能更好：

```typescript
const CanvasRendererExample = () => {
  const option = {
    // 复杂配置项
  };

  return (
    <LineChart
      chartId="canvas-chart"
      option={option}
      width="100%"
      height={400}
      renderer="canvas" // 使用 canvas 渲染器
    />
  );
};
```

### 2.3 关闭不必要的动画

对于大数据集，关闭动画可以提高渲染性能：

```typescript
const NoAnimationExample = () => {
  const option = {
    animation: false, // 关闭全局动画
    series: [
      {
        type: 'line',
        data: Array.from({ length: 1000 }, () => Math.floor(Math.random() * 100)),
        animation: false // 关闭系列动画
      }
    ]
  };

  return (
    <LineChart
      chartId="no-animation-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

## 3. 内存管理

### 3.1 销毁图表实例

在组件卸载时，确保销毁图表实例，释放内存：

```typescript
import React, { useEffect, useRef } from 'react';
import { LineChart, ChartRef } from '@agions/taroviz';

const MemoryManagementExample = () => {
  const chartRef = useRef<ChartRef>(null);
  const option = {
    // 配置项
  };

  useEffect(() => {
    return () => {
      // 组件卸载时销毁图表实例
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <LineChart
      ref={chartRef}
      chartId="memory-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

### 3.2 避免内存泄漏

确保在组件卸载时清除所有定时器和事件监听器：

```typescript
const MemoryLeakExample = () => {
  const [option, setOption] = useState({
    // 配置项
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // 更新图表数据
      setOption(prev => ({
        ...prev,
        series: [
          {
            ...prev.series[0],
            data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100))
          }
        ]
      }));
    }, 1000);

    // 清除定时器
    return () => clearInterval(interval);
  }, []);

  return (
    <LineChart
      chartId="memory-leak-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

## 4. 组件优化

### 4.1 使用 React.memo

对于频繁渲染的组件，使用 React.memo 优化：

```typescript
import React, { useState } from 'react';
import { LineChart } from '@agions/taroviz';

// 使用 React.memo 包装图表组件
const MemoizedLineChart = React.memo(LineChart);

const OptimizedComponentExample = () => {
  const [count, setCount] = useState(0);
  const option = {
    // 配置项
  };

  return (
    <div>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
      <p>Count: {count}</p>
      <MemoizedLineChart
        chartId="memoized-chart"
        option={option}
        width="100%"
        height={400}
      />
    </div>
  );
};
```

### 4.2 延迟加载

对于非首屏图表，可以考虑延迟加载：

```typescript
import React, { useState, useEffect } from 'react';
import { LineChart } from '@agions/taroviz';

const LazyLoadExample = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 模拟延迟加载
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const option = {
    // 配置项
  };

  return (
    <div>
      {isVisible && (
        <LineChart
          chartId="lazy-load-chart"
          option={option}
          width="100%"
          height={400}
        />
      )}
    </div>
  );
};
```

## 5. 性能监控

### 5.1 使用性能分析工具

TaroViz 提供了性能分析工具，可以监控图表的性能：

```typescript
import { PerformanceAnalyzer } from '@agions/taroviz';

const PerformanceMonitoringExample = () => {
  const option = {
    // 配置项
  };

  useEffect(() => {
    // 创建性能分析器实例
    const analyzer = PerformanceAnalyzer.getInstance();

    // 开始监控
    analyzer.start();

    // 停止监控并生成报告
    setTimeout(() => {
      analyzer.stop();
      const report = analyzer.generateReport();
      console.log('性能报告:', report);
    }, 5000);

    return () => {
      analyzer.stop();
    };
  }, []);

  return (
    <LineChart
      chartId="performance-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

### 5.2 监控渲染时间

监控图表的渲染时间，及时发现性能问题：

```typescript
const RenderTimeExample = () => {
  const [renderTime, setRenderTime] = useState(0);
  const option = {
    // 配置项
  };

  const handleRenderComplete = () => {
    const endTime = performance.now();
    const time = endTime - startTime;
    setRenderTime(time);
    console.log('图表渲染时间:', time, 'ms');
  };

  let startTime = performance.now();

  return (
    <div>
      <p>渲染时间: {renderTime.toFixed(2)} ms</p>
      <LineChart
        chartId="render-time-chart"
        option={option}
        width="100%"
        height={400}
        onRenderComplete={handleRenderComplete}
      />
    </div>
  );
};
```

## 6. 最佳实践

### 6.1 合理设置图表大小

根据实际需求设置图表大小，避免过大的图表：

```typescript
const OptimizedSizeExample = () => {
  const option = {
    // 配置项
  };

  return (
    <LineChart
      chartId="optimized-size-chart"
      option={option}
      width="100%"
      height={400} // 合理的高度
    />
  );
};
```

### 6.2 简化图表配置

对于复杂图表，尽量简化配置，减少不必要的元素：

```typescript
const SimplifiedConfigExample = () => {
  const option = {
    // 简化的配置项
    title: {
      text: '简化配置示例'
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
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line',
        // 简化系列配置
        animation: false,
        smooth: false,
        areaStyle: null
      }
    ]
  };

  return (
    <LineChart
      chartId="simplified-config-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};
```

## 7. 跨平台性能优化

### 7.1 小程序平台优化

在小程序平台上，需要特别注意性能优化：

1. 减少图表数量：每个页面尽量只使用一个图表
2. 简化图表配置：减少不必要的动画和效果
3. 合理设置图表大小：避免过大的图表
4. 及时销毁图表实例：在页面卸载时销毁图表

### 7.2 H5 平台优化

在 H5 平台上，可以利用浏览器的性能特性：

1. 使用 Web Workers 处理大数据
2. 利用 requestAnimationFrame 优化动画
3. 使用 Intersection Observer API 实现懒加载
4. 利用浏览器缓存

## 下一步

继续阅读 [跨平台开发](./cross-platform.md) 指南，了解如何在不同平台上使用 TaroViz。
