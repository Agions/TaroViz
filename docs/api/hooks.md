# Hooks

TaroViz 提供了一系列 React Hooks，用于简化图表的开发和管理。

## useChart

用于管理图表实例的 Hook，提供了获取和管理图表实例的便捷方式。

### 导入

```typescript
import { useChart } from '@agions/taroviz';
```

### 类型定义

```typescript
interface UseChartOptions {
  /**
   * 图表ID
   */
  chartId?: string;
  /**
   * 自动初始化图表
   */
  autoInit?: boolean;
  /**
   * 初始化选项
   */
  initOptions?: any;
}

interface UseChartReturn {
  /**
   * 图表实例引用
   */
  chartRef: React.RefObject<any>;
  /**
   * 图表实例
   */
  chartInstance: any;
  /**
   * 图表是否已初始化
   */
  isInitialized: boolean;
  /**
   * 初始化图表
   */
  initChart: () => void;
  /**
   * 销毁图表
   */
  destroyChart: () => void;
  /**
   * 调整图表大小
   */
  resizeChart: () => void;
  /**
   * 设置图表配置
   */
  setChartOption: (option: any, notMerge?: boolean, lazyUpdate?: boolean) => void;
  /**
   * 获取图表配置
   */
  getChartOption: () => any;
}

function useChart(chartId?: string | UseChartOptions): UseChartReturn;
```

### 示例

```typescript
import React from 'react';
import { LineChart, useChart } from '@agions/taroviz';

const ChartComponent = () => {
  const { chartRef, chartInstance, isInitialized } = useChart('chart-id');

  const option = {
    title: {
      text: '折线图示例'
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
        type: 'line'
      }
    ]
  };

  // 使用 chartInstance 调用图表方法
  const handleResize = () => {
    if (chartInstance) {
      chartInstance.resize();
    }
  };

  return (
    <div>
      <LineChart
        ref={chartRef}
        chartId="chart-id"
        option={option}
        width="100%"
        height={400}
      />
      <button onClick={handleResize} disabled={!isInitialized}>
        调整大小
      </button>
    </div>
  );
};

export default ChartComponent;
```

## useTheme

用于管理图表主题的 Hook，提供了主题切换和管理的便捷方式。

### 导入

```typescript
import { useTheme } from '@agions/taroviz';
```

### 类型定义

```typescript
interface UseThemeReturn {
  /**
   * 当前主题
   */
  theme: string | object;
  /**
   * 设置主题
   */
  setTheme: (theme: string | object) => void;
  /**
   * 主题列表
   */
  themes: string[];
  /**
   * 注册自定义主题
   */
  registerTheme: (name: string, theme: object) => void;
}

function useTheme(initialTheme?: string | object): UseThemeReturn;
```

### 示例

```typescript
import React from 'react';
import { LineChart, useTheme } from '@agions/taroviz';

const ThemeComponent = () => {
  const { theme, setTheme, themes } = useTheme('default');

  const option = {
    title: {
      text: '主题切换示例'
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
        type: 'line'
      }
    ]
  };

  return (
    <div>
      <div>
        <label>选择主题：</label>
        <select value={typeof theme === 'string' ? theme : 'default'} onChange={(e) => setTheme(e.target.value)}>
          {themes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <LineChart
        chartId="theme-chart"
        option={option}
        width="100%"
        height={400}
        theme={theme}
      />
    </div>
  );
};

export default ThemeComponent;
```

## useChartData

用于管理图表数据的 Hook，提供了数据更新和管理的便捷方式。

### 导入

```typescript
import { useChartData } from '@agions/taroviz';
```

### 类型定义

```typescript
interface UseChartDataOptions {
  /**
   * 初始数据
   */
  initialData?: any;
  /**
   * 数据更新延迟
   */
  updateDelay?: number;
  /**
   * 数据验证函数
   */
  validateData?: (data: any) => boolean;
}

interface UseChartDataReturn {
  /**
   * 当前数据
   */
  data: any;
  /**
   * 更新数据
   */
  updateData: (newData: any) => void;
  /**
   * 数据是否正在更新
   */
  isUpdating: boolean;
  /**
   * 数据更新次数
   */
  updateCount: number;
  /**
   * 重置数据
   */
  resetData: () => void;
}

function useChartData(initialData?: any | UseChartDataOptions): UseChartDataReturn;
```

### 示例

```typescript
import React from 'react';
import { BarChart, useChartData } from '@agions/taroviz';

const DataComponent = () => {
  const { data, updateData, isUpdating } = useChartData([120, 200, 150, 80, 70, 110, 130]);

  const option = {
    title: {
      text: '数据更新示例'
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
        data,
        type: 'bar'
      }
    ]
  };

  const handleUpdateData = () => {
    const newData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 200) + 50);
    updateData(newData);
  };

  return (
    <div>
      <button onClick={handleUpdateData} disabled={isUpdating}>
        {isUpdating ? '更新中...' : '更新数据'}
      </button>
      <BarChart
        chartId="data-chart"
        option={option}
        width="100%"
        height={400}
      />
    </div>
  );
};

export default DataComponent;
```

## usePerformance

用于监控图表性能的 Hook，提供了性能数据的收集和分析功能。

### 导入

```typescript
import { usePerformance } from '@agions/taroviz';
```

### 类型定义

```typescript
interface UsePerformanceOptions {
  /**
   * 是否自动开始监控
   */
  autoStart?: boolean;
  /**
   * 监控间隔（毫秒）
   */
  interval?: number;
  /**
   * 监控指标
   */
  metrics?: string[];
}

interface PerformanceMetrics {
  /**
   * 帧率
   */
  fps: number;
  /**
   * 渲染时间
   */
  renderTime: number;
  /**
   * 内存使用
   */
  memoryUsage: number;
  /**
   * 数据处理时间
   */
  dataProcessTime: number;
  /**
   * 初始化时间
   */
  initTime: number;
}

interface UsePerformanceReturn {
  /**
   * 性能指标
   */
  metrics: PerformanceMetrics;
  /**
   * 是否正在监控
   */
  isMonitoring: boolean;
  /**
   * 开始监控
   */
  startMonitoring: () => void;
  /**
   * 停止监控
   */
  stopMonitoring: () => void;
  /**
   * 重置性能数据
   */
  resetMetrics: () => void;
  /**
   * 生成性能报告
   */
  generateReport: () => any;
}

function usePerformance(options?: UsePerformanceOptions): UsePerformanceReturn;
```

### 示例

```typescript
import React from 'react';
import { LineChart, usePerformance } from '@agions/taroviz';

const PerformanceComponent = () => {
  const { metrics, isMonitoring, startMonitoring, stopMonitoring } = usePerformance({
    autoStart: true,
    interval: 1000
  });

  const option = {
    title: {
      text: '性能监控示例'
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
        type: 'line'
      }
    ]
  };

  return (
    <div>
      <div>
        <h3>性能指标</h3>
        <p>帧率: {metrics.fps} FPS</p>
        <p>渲染时间: {metrics.renderTime} ms</p>
        <p>内存使用: {metrics.memoryUsage} MB</p>
        <p>数据处理时间: {metrics.dataProcessTime} ms</p>
        <p>初始化时间: {metrics.initTime} ms</p>
        <button onClick={isMonitoring ? stopMonitoring : startMonitoring}>
          {isMonitoring ? '停止监控' : '开始监控'}
        </button>
      </div>
      <LineChart
        chartId="performance-chart"
        option={option}
        width="100%"
        height={400}
      />
    </div>
  );
};

export default PerformanceComponent;
```

## useChartEvent

用于处理图表事件的 Hook，提供了便捷的事件监听和处理方式。

### 导入

```typescript
import { useChartEvent } from '@agions/taroviz';
```

### 类型定义

```typescript
interface UseChartEventOptions {
  /**
   * 图表实例
   */
  chartInstance?: any;
  /**
   * 事件映射
   */
  eventMap?: Record<string, (params: any) => void>;
  /**
   * 是否自动绑定事件
   */
  autoBind?: boolean;
}

interface UseChartEventReturn {
  /**
   * 绑定事件
   */
  bindEvents: (chartInstance: any) => void;
  /**
   * 解绑事件
   */
  unbindEvents: () => void;
  /**
   * 绑定单个事件
   */
  bindEvent: (eventName: string, handler: (params: any) => void) => void;
  /**
   * 解绑单个事件
   */
  unbindEvent: (eventName: string, handler: (params: any) => void) => void;
}

function useChartEvent(options?: UseChartEventOptions): UseChartEventReturn;
```

### 示例

```typescript
import React from 'react';
import { PieChart, useChart, useChartEvent } from '@agions/taroviz';

const EventComponent = () => {
  const { chartRef, chartInstance } = useChart('event-chart');

  const handleClick = (params: any) => {
    console.log('点击事件:', params);
    alert(`您点击了: ${params.name}`);
  };

  const handleMouseOver = (params: any) => {
    console.log('鼠标悬停事件:', params);
  };

  const { bindEvents } = useChartEvent({
    eventMap: {
      click: handleClick,
      mouseover: handleMouseOver
    }
  });

  // 当图表实例可用时绑定事件
  React.useEffect(() => {
    if (chartInstance) {
      bindEvents(chartInstance);
    }
  }, [chartInstance, bindEvents]);

  const option = {
    title: {
      text: '事件处理示例',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '销售渠道',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 350, name: '线上商城' },
          { value: 250, name: '线下门店' },
          { value: 200, name: '代理商' },
          { value: 150, name: '其他' }
        ]
      }
    ]
  };

  return (
    <PieChart
      ref={chartRef}
      chartId="event-chart"
      option={option}
      width="100%"
      height={400}
    />
  );
};

export default EventComponent;
```

## useResponsive

用于处理图表响应式布局的 Hook，提供了自动调整图表大小的功能。

### 导入

```typescript
import { useResponsive } from '@agions/taroviz';
```

### 类型定义

interface UseResponsiveOptions {
/\*\*

- 监听的元素
  \*/
  element?: HTMLElement | null;
  /\*\*
- 调整大小的延迟（毫秒）
  \*/
  debounceDelay?: number;
  /\*\*
- 响应式配置
  _/
  responsiveConfig?: {
  /\*\*
  _ 断点配置
  _/
  breakpoints?: {
  [key: string]: number;
  };
  /\*\*
  _ 根据断点返回不同的配置
  \*/
  getConfigByBreakpoint?: (breakpoint: string, width: number) => any;
  };
  }

interface UseResponsiveReturn {
/\*\*

- 当前宽度
  \*/
  width: number;
  /\*\*
- 当前高度
  \*/
  height: number;
  /\*\*
- 当前断点
  \*/
  currentBreakpoint: string;
  /\*\*
- 响应式配置
  \*/
  responsiveConfig: any;
  /\*\*
- 手动触发调整大小
  \*/
  triggerResize: () => void;
  /\*\*
- 更新监听的元素
  \*/
  updateElement: (element: HTMLElement | null) => void;
  }

function useResponsive(options?: UseResponsiveOptions): UseResponsiveReturn;

### 示例

```typescript
import React from 'react';
import { LineChart, useResponsive } from '@agions/taroviz';

const ResponsiveComponent = () => {
  const chartRef = React.useRef<HTMLDivElement>(null);
  const { width, height, currentBreakpoint } = useResponsive({
    element: chartRef.current,
    debounceDelay: 300,
    responsiveConfig: {
      breakpoints: {
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200
      },
      getConfigByBreakpoint: (breakpoint, width) => {
        // 根据不同断点返回不同的配置
        if (breakpoint === 'sm') {
          return { title: { fontSize: 14 }, legend: { show: false } };
        } else if (breakpoint === 'md') {
          return { title: { fontSize: 16 }, legend: { show: true } };
        } else {
          return { title: { fontSize: 18 }, legend: { show: true } };
        }
      }
    }
  });

  React.useEffect(() => {
    if (chartRef.current) {
      // 更新监听的元素
    }
  }, [chartRef]);

  const baseOption = {
    title: {
      text: '响应式示例'
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
        type: 'line'
      }
    ]
  };

  return (
    <div ref={chartRef}>
      <div style={{ marginBottom: '10px' }}>
        当前断点: {currentBreakpoint}, 宽度: {width}px, 高度: {height}px
      </div>
      <LineChart
        chartId="responsive-chart"
        option={baseOption}
        width="100%"
        height={400}
        autoResize
      />
    </div>
  );
};

export default ResponsiveComponent;
```
