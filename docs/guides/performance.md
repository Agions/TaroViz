# TaroViz 性能优化指南

在小程序和 H5 环境中使用 TaroViz 进行数据可视化时，性能优化至关重要，特别是在处理大量数据或在低端设备上运行时。本指南提供了一系列最佳实践，帮助您优化 TaroViz 图表的性能。

## 数据优化

### 数据采样和聚合

对于大数据集，可以考虑采样或聚合数据：

```jsx
import { sampleData, aggregateData } from '@agions/core/utils';

// 原始数据包含上千个点
const rawData = [...]; // 大量数据点

// 简单采样：从原始数据中等距选择点
const sampledData = sampleData(rawData, 100); // 减少到100个点

// 或者按时间区间聚合数据
const aggregatedData = aggregateData(rawData, {
  timeField: 'date',
  valueField: 'value',
  interval: 'day', // 'hour', 'day', 'week', 'month'
  aggregationMethod: 'avg' // 'sum', 'min', 'max', 'avg'
});
```

### 数据分页

对于非常大的数据集，可以实现数据分页：

```jsx
import React, { useState } from 'react';
import { View, Button } from '@tarojs/components';
import { LineChart } from '@agions/components';

function PagedChart({ fullData }) {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 50;
  
  // 计算当前页的数据
  const dataForCurrentPage = {
    labels: fullData.labels.slice(currentPage * pageSize, (currentPage + 1) * pageSize),
    datasets: fullData.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    }))
  };
  
  const totalPages = Math.ceil(fullData.labels.length / pageSize);
  
  return (
    <View>
      <LineChart data={dataForCurrentPage} />
      
      <View style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <Button 
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
        >
          上一页
        </Button>
        
        <View>{currentPage + 1} / {totalPages}</View>
        
        <Button
          disabled={currentPage >= totalPages - 1}
          onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
        >
          下一页
        </Button>
      </View>
    </View>
  );
}
```

## 渲染优化

### 延迟加载

使用懒加载方式，仅在需要时渲染图表：

```jsx
import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import { LineChart } from '@agions/components';
import { useInView } from '@agions/hooks';

function LazyLoadChart({ data }) {
  const [ref, inView] = useInView();
  const [showChart, setShowChart] = useState(false);
  
  useEffect(() => {
    if (inView && !showChart) {
      setShowChart(true);
    }
  }, [inView, showChart]);
  
  return (
    <View ref={ref} style={{ width: '100%', height: '300px' }}>
      {showChart ? (
        <LineChart data={data} />
      ) : (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <View>图表加载中...</View>
        </View>
      )}
    </View>
  );
}
```

### 减少重绘

避免频繁的状态更新导致不必要的重绘：

```jsx
import React, { useState, useEffect, useCallback } from 'react';
import { LineChart } from '@agions/components';
import { useDebounce } from '@agions/hooks';

function OptimizedChart({ rawData }) {
  // 使用防抖处理频繁更新的数据
  const debouncedData = useDebounce(rawData, 300);
  
  // 计算衍生数据时使用记忆化
  const processedData = useMemo(() => {
    // 这里进行数据处理...
    return processedResult;
  }, [debouncedData]);
  
  return <LineChart data={processedData} />;
}
```

### 关闭或简化动画

在低端设备上，可以考虑关闭或简化动画：

```jsx
import { LineChart } from '@agions/components';
import Taro from '@tarojs/taro';

function PerformanceOptimizedChart({ data }) {
  // 检测设备性能
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  
  useEffect(() => {
    Taro.getSystemInfo({
      success: (res) => {
        // 根据设备信息判断是否为低端设备
        // 这里使用设备品牌和型号进行简单判断，实际应用中可能需要更复杂的逻辑
        const brand = res.brand.toLowerCase();
        const model = res.model.toLowerCase();
        const isLowEnd = brand.includes('low') || model.includes('low') || res.platform === 'android' && res.system.includes('5.');
        setIsLowEndDevice(isLowEnd);
      }
    });
  }, []);
  
  const options = {
    animation: {
      duration: isLowEndDevice ? 0 : 1000, // 低端设备关闭动画
      easing: isLowEndDevice ? 'linear' : 'easeOutQuart'
    }
  };
  
  return <LineChart data={data} options={options} />;
}
```

## 组件优化

### 使用固定尺寸

尽可能使用固定尺寸而非百分比尺寸，减少布局计算：

```jsx
<View style={{ width: '300px', height: '200px' }}>
  <LineChart data={data} width={300} height={200} />
</View>
```

### 分解复杂组件

将复杂的仪表盘拆分为独立的图表组件：

```jsx
import React from 'react';
import { View } from '@tarojs/components';
import { LineChart, BarChart, PieChart } from '@agions/components';

function Dashboard({ lineData, barData, pieData }) {
  return (
    <View>
      {/* 每个图表独立渲染，避免一个大组件 */}
      <View>
        <LineChart data={lineData} />
      </View>
      
      <View style={{ display: 'flex' }}>
        <View style={{ flex: 1 }}>
          <BarChart data={barData} />
        </View>
        <View style={{ flex: 1 }}>
          <PieChart data={pieData} />
        </View>
      </View>
    </View>
  );
}
```

## 平台特定优化

### 小程序优化

针对小程序环境的特定优化：

```jsx
import { useCanvas } from '@agions/hooks';

function OptimizedMiniChart() {
  const { canvasRef, canvasContext } = useCanvas();
  
  useEffect(() => {
    if (canvasContext) {
      // 使用小程序原生Canvas 2D接口
      // 在某些场景下比Taro Canvas组件性能更好
      canvasContext.draw(true); // 保留上一次绘制内容
      // ...绘制逻辑
    }
  }, [canvasContext]);
  
  return <Canvas id="optimized-canvas" ref={canvasRef} />;
}
```

### H5优化

针对H5环境的优化：

```jsx
import { LineChart } from '@agions/components';

function H5OptimizedChart({ data }) {
  // H5环境下使用WebWorker进行数据处理
  const [processedData, setProcessedData] = useState(data);
  
  useEffect(() => {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker('/dataProcessor.worker.js');
      
      worker.onmessage = (event) => {
        setProcessedData(event.data);
        worker.terminate();
      };
      
      worker.postMessage(data);
    }
  }, [data]);
  
  return <LineChart data={processedData} />;
}
```

## 内存管理

### 清理不需要的图表

确保在组件卸载时清理图表资源：

```jsx
import { useEffect, useRef } from 'react';
import { LineChart } from '@agions/components';

function CleanupChart({ data }) {
  const chartRef = useRef(null);
  
  useEffect(() => {
    return () => {
      // 组件卸载时清理图表实例
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);
  
  return <LineChart ref={chartRef} data={data} />;
}
```

### 控制图表数量

限制同时显示的图表数量：

```jsx
import { useState } from 'react';
import { ScrollView, View } from '@tarojs/components';
import { LineChart } from '@agions/components';

function ChartList({ chartDataList }) {
  const [visibleCharts, setVisibleCharts] = useState(new Set([0, 1, 2])); // 初始显示前三个
  
  const handleScroll = (e) => {
    // 根据滚动位置计算当前应该显示哪些图表
    const scrollTop = e.detail.scrollTop;
    const chartHeight = 300; // 每个图表的高度
    
    const firstVisibleIndex = Math.floor(scrollTop / chartHeight);
    const newVisibleCharts = new Set([
      firstVisibleIndex,
      firstVisibleIndex + 1,
      firstVisibleIndex + 2
    ]);
    
    setVisibleCharts(newVisibleCharts);
  };
  
  return (
    <ScrollView scrollY style={{ height: '100vh' }} onScroll={handleScroll}>
      {chartDataList.map((chartData, index) => (
        <View key={index} style={{ height: '300px' }}>
          {visibleCharts.has(index) ? (
            <LineChart data={chartData} />
          ) : (
            <View style={{ height: '300px' }} /> // 占位符
          )}
        </View>
      ))}
    </ScrollView>
  );
}
```

## 性能监控

### 添加性能指标

监控图表渲染性能：

```jsx
import { LineChart } from '@agions/components';
import { useEffect, useRef, useState } from 'react';

function MonitoredChart({ data }) {
  const [renderTime, setRenderTime] = useState(0);
  const startTimeRef = useRef(0);
  
  const handleBeforeRender = () => {
    startTimeRef.current = Date.now();
  };
  
  const handleAfterRender = () => {
    const endTime = Date.now();
    const time = endTime - startTimeRef.current;
    setRenderTime(time);
    
    // 可以将性能数据上报到监控系统
    if (time > 500) {
      console.warn(`Chart rendering took ${time}ms, which exceeds recommended threshold of 500ms`);
      // reportPerformanceIssue({ component: 'LineChart', renderTime: time });
    }
  };
  
  return (
    <View>
      <LineChart 
        data={data} 
        onBeforeRender={handleBeforeRender}
        onAfterRender={handleAfterRender}
      />
      {process.env.NODE_ENV === 'development' && (
        <View>渲染耗时: {renderTime}ms</View>
      )}
    </View>
  );
}
```

## 小结

通过以上优化措施，您可以显著提升 TaroViz 图表的性能。记住，最佳的优化策略取决于您的具体应用场景和目标平台。在实际应用中，您可能需要结合多种策略来获得最佳效果。

推荐遵循以下优化流程：

1. 首先优化数据（采样、聚合、分页）
2. 然后优化渲染（延迟加载、减少重绘）
3. 最后考虑平台特定优化
4. 添加性能监控以持续改进

更多高级性能优化技巧，请参考[TaroViz官方GitHub仓库](https://github.com/agions/taroviz)的示例代码和最佳实践。 