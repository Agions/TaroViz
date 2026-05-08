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
import { LineChart, useChartEvent } from '@agions/taroviz';

const EventComponent = () => {
  const { bindEvent, unbindEvent } = useChartEvent();

  const handlePointClick = (params: any) => {
    console.log('数据点点击:', params);
  };

  return (
    <LineChart
      chartId="event-chart"
      option={{ /* ... */ }}
      width="100%"
      height={400}
      onInit={(chartInstance) => {
        bindEvent(chartInstance, 'click', handlePointClick);
      }}
      onDispose={(chartInstance) => {
        unbindEvent('click', handlePointClick);
      }}
    />
  );
};

export default EventComponent;
```

## useChartHistory

用于管理图表配置历史记录的 Hook，支持 Undo/Redo 操作。

### 导入

```typescript
import { useChartHistory } from '@agions/taroviz';
```

### 类型定义

```typescript
interface UseChartHistoryOptions {
  /**
   * 最大历史记录数
   */
  maxHistorySize?: number;
  /**
   * 是否启用键盘快捷键
   */
  enableKeyboard?: boolean;
  /**
   * 历史记录间隔（毫秒）
   */
  debounceMs?: number;
}

interface UseChartHistoryReturn {
  /**
   * 是否可以撤销
   */
  canUndo: boolean;
  /**
   * 是否可以重做
   */
  canRedo: boolean;
  /**
   * 撤销操作
   */
  undo: () => void;
  /**
   * 重做操作
   */
  redo: () => void;
  /**
   * 获取历史记录
   */
  getHistory: () => any[];
  /**
   * 清空历史记录
   */
  clearHistory: () => void;
}

function useChartHistory(chartInstance: any, options?: UseChartHistoryOptions): UseChartHistoryReturn;
```

### 示例

```typescript
import React from 'react';
import { LineChart, useChartHistory } from '@agions/taroviz';

const HistoryComponent = () => {
  const chartRef = React.useRef(null);
  const { canUndo, canRedo, undo, redo } = useChartHistory(chartRef.current, {
    maxHistorySize: 50,
    enableKeyboard: true, // 支持 Ctrl+Z / Ctrl+Y
  });

  return (
    <div>
      <LineChart ref={chartRef} option={{ /* ... */ }} width="100%" height={400} />
      <div>
        <button onClick={undo} disabled={!canUndo}>撤销 (Ctrl+Z)</button>
        <button onClick={redo} disabled={!canRedo}>重做 (Ctrl+Y)</button>
      </div>
    </div>
  );
};

export default HistoryComponent;
```

## useChartSelection

用于管理图表数据点选择的 Hook，支持单选、多选和反选。

### 导入

```typescript
import { useChartSelection } from '@agions/taroviz';
```

### 类型定义

```typescript
interface UseChartSelectionOptions {
  /**
   * 选择模式：'single' | 'multiple' | 'invert'
   */
  mode?: 'single' | 'multiple' | 'invert';
  /**
   * 是否支持程序化控制
   */
  programmable?: boolean;
}

interface SelectedPoint {
  /**
   * 系列索引
   */
  seriesIndex: number;
  /**
   * 数据索引
   */
  dataIndex: number;
  /**
   * 数据值
   */
  value: any;
  /**
   * 系列名称
   */
  seriesName?: string;
}

interface UseChartSelectionReturn {
  /**
   * 当前选中的数据点
   */
  selectedPoints: SelectedPoint[];
  /**
   * 选择数据点
   */
  select: (seriesIndex: number, dataIndex: number | number[]) => void;
  /**
   * 取消选择数据点
   */
  deselect: (seriesIndex: number, dataIndex: number | number[]) => void;
  /**
   * 清空所有选择
   */
  clearSelection: () => void;
  /**
   * 反选当前选择
   */
  invertSelection: () => void;
}

function useChartSelection(chartInstance: any, options?: UseChartSelectionOptions): UseChartSelectionReturn;
```

### 示例

```typescript
import React from 'react';
import { LineChart, useChartSelection } from '@agions/taroviz';

const SelectionComponent = () => {
  const chartRef = React.useRef(null);
  const { selectedPoints, select, deselect, clearSelection } = useChartSelection(chartRef.current, {
    mode: 'multiple',
  });

  return (
    <div>
      <LineChart ref={chartRef} option={{ /* ... */ }} width="100%" height={400} />
      <div>
        <p>已选择: {selectedPoints.length} 个数据点</p>
        <button onClick={() => select(0, 0)}>选择第一个点</button>
        <button onClick={clearSelection}>清空选择</button>
      </div>
    </div>
  );
};

export default SelectionComponent;
```

## useChartDownload

用于导出图表为图片或其他格式的 Hook。

### 导入

```typescript
import { useChartDownload } from '@agions/taroviz';
```

### 类型定义

```typescript
interface UseChartDownloadOptions {
  /**
   * 默认导出格式
   */
  defaultFormat?: 'png' | 'jpeg' | 'svg' | 'pdf';
  /**
   * 默认分辨率
   */
  pixelRatio?: number;
}

interface UseChartDownloadReturn {
  /**
   * 导出为 PNG
   */
  downloadPNG: (filename?: string) => Promise<void>;
  /**
   * 导出为 JPEG
   */
  downloadJPEG: (filename?: string, quality?: number) => Promise<void>;
  /**
   * 导出为 SVG
   */
  downloadSVG: (filename?: string) => Promise<void>;
  /**
   * 导出为 PDF
   */
  downloadPDF: (filename?: string) => Promise<void>;
  /**
   * 导出为 CSV
   */
  downloadCSV: (filename?: string) => Promise<void>;
  /**
   * 导出为 JSON
   */
  downloadJSON: (filename?: string) => Promise<void>;
}

function useChartDownload(chartInstance: any, options?: UseChartDownloadOptions): UseChartDownloadReturn;
```

### 示例

```typescript
import React from 'react';
import { LineChart, useChartDownload } from '@agions/taroviz';

const DownloadComponent = () => {
  const chartRef = React.useRef(null);
  const { downloadPNG, downloadSVG } = useChartDownload(chartRef.current);

  return (
    <div>
      <LineChart ref={chartRef} option={{ /* ... */ }} width="100%" height={400} />
      <div>
        <button onClick={() => downloadPNG('my-chart')}>导出 PNG</button>
        <button onClick={() => downloadSVG('my-chart')}>导出 SVG</button>
      </div>
    </div>
  );
};

export default DownloadComponent;
```

## useChartConnect

用于实现多图表联动的 Hook。

### 导入

```typescript
import { useChartConnect } from '@agions/taroviz';
```

### 类型定义

```typescript
interface UseChartConnectOptions {
  /**
   * 联动组名称
   */
  group?: string;
  /**
   * 联动事件
   */
  events?: string[];
}

interface UseChartConnectReturn {
  /**
   * 连接图表到联动组
   */
  connect: (chartInstance: any) => void;
  /**
   * 断开图表连接
   */
  disconnect: (chartInstance: any) => void;
  /**
   * 发送联动事件
   */
  dispatch: (eventName: string, params: any) => void;
}

function useChartConnect(options?: UseChartConnectOptions): UseChartConnectReturn;
```

### 示例

```typescript
import React from 'react';
import { LineChart, PieChart, useChartConnect } from '@agions/taroviz';

const ConnectComponent = () => {
  const lineRef = React.useRef(null);
  const pieRef = React.useRef(null);
  const { connect, dispatch } = useChartConnect({ group: 'dashboard' });

  return (
    <div>
      <LineChart ref={lineRef} option={{ /* ... */ }} width="100%" height={400} />
      <PieChart ref={pieRef} option={{ /* ... */ }} width="100%" height={400} />
    </div>
  );
};

export default ConnectComponent;
```

## useDataZoom

用于管理图表区域缩放的 Hook。

### 导入

```typescript
import { useDataZoom } from '@agions/taroviz';
```

### 类型定义

```typescript
interface UseDataZoomReturn {
  /**
   * 当前缩放范围
   */
  range: [number, number];
  /**
   * 设置缩放范围
   */
  setRange: (start: number, end: number) => void;
  /**
   * 重置缩放
   */
  reset: () => void;
  /**
   * 是否正在缩放
   */
  isZooming: boolean;
}

function useDataZoom(chartInstance: any): UseDataZoomReturn;
```

### 示例

```typescript
import React from 'react';
import { LineChart, useDataZoom } from '@agions/taroviz';

const DataZoomComponent = () => {
  const chartRef = React.useRef(null);
  const { range, setRange, reset } = useDataZoom(chartRef.current);

  return (
    <div>
      <LineChart ref={chartRef} option={{ /* ... */ }} width="100%" height={400} />
      <div>
        <p>当前范围: {range[0]}% - {range[1]}%</p>
        <button onClick={() => setRange(0, 50)}>前 50%</button>
        <button onClick={reset}>重置</button>
      </div>
    </div>
  );
};

export default DataZoomComponent;
```

## useAnimation

用于控制图表动画的 Hook。

### 导入

```typescript
import { useAnimation } from '@agions/taroviz';
```

### 类型定义

```typescript
interface UseAnimationReturn {
  /**
   * 是否正在播放动画
   */
  isPlaying: boolean;
  /**
   * 播放动画
   */
  play: () => void;
  /**
   * 暂停动画
   */
  pause: () => void;
  /**
   * 恢复动画
   */
  resume: () => void;
  /**
   * 停止动画
   */
  stop: () => void;
  /**
   * 设置动画时长
   */
  setDuration: (duration: number) => void;
}

function useAnimation(chartInstance: any): UseAnimationReturn;
```

### 示例

```typescript
import React from 'react';
import { LineChart, useAnimation } from '@agions/taroviz';

const AnimationComponent = () => {
  const chartRef = React.useRef(null);
  const { isPlaying, play, pause, stop } = useAnimation(chartRef.current);

  return (
    <div>
      <LineChart ref={chartRef} option={{ /* ... */ }} width="100%" height={400} />
      <div>
        <button onClick={play} disabled={isPlaying}>播放</button>
        <button onClick={pause} disabled={!isPlaying}>暂停</button>
        <button onClick={stop}>停止</button>
      </div>
    </div>
  );
};

export default AnimationComponent;
```

## useThemeSwitcher

用于管理主题切换的 Hook。

### 导入

```typescript
import { useThemeSwitcher } from '@agions/taroviz';
```

### 类型定义

```typescript
interface UseThemeSwitcherReturn {
  /**
   * 当前主题
   */
  currentTheme: string;
  /**
   * 所有可用主题
   */
  themes: string[];
  /**
   * 切换主题
   */
  switchTheme: (theme: string) => void;
  /**
   * 获取主题配置
   */
  getThemeConfig: (theme: string) => object;
}

function useThemeSwitcher(initialTheme?: string): UseThemeSwitcherReturn;
```

### 示例

```typescript
import React from 'react';
import { LineChart, useThemeSwitcher } from '@agions/taroviz';

const ThemeSwitcherComponent = () => {
  const { currentTheme, themes, switchTheme } = useThemeSwitcher('default');

  return (
    <div>
      <select value={currentTheme} onChange={(e) => switchTheme(e.target.value)}>
        {themes.map((theme) => (
          <option key={theme} value={theme}>{theme}</option>
        ))}
      </select>
      <LineChart
        option={{ /* ... */ }}
        width="100%"
        height={400}
        theme={currentTheme}
      />
    </div>
  );
};

export default ThemeSwitcherComponent;
```

## useDataTransform

用于数据转换和处理的 Hook。

### 导入

```typescript
import { useDataTransform } from '@agions/taroviz';
```

### 类型定义

```typescript
interface UseDataTransformReturn {
  /**
   * 原始数据
   */
  originalData: any;
  /**
   * 转换后的数据
   */
  transformedData: any;
  /**
   * 应用转换
   */
  transform: (transformFn: (data: any) => any) => void;
  /**
   * 重置数据
   */
  reset: () => void;
}

function useDataTransform(initialData?: any): UseDataTransformReturn;
```

### 示例

```typescript
import React from 'react';
import { LineChart, useDataTransform } from '@agions/taroviz';

const TransformComponent = () => {
  const { transformedData, transform, reset } = useDataTransform([120, 200, 150, 80, 70, 110, 130]);

  const handleSmooth = () => {
    transform((data) => data.map(v => v * 1.1));
  };

  return (
    <div>
      <LineChart
        option={{ series: [{ data: transformedData, type: 'line' }] }}
        width="100%"
        height={400}
      />
      <button onClick={handleSmooth}>平滑处理</button>
      <button onClick={reset}>重置</button>
    </div>
  );
};

export default TransformComponent;
```

## 工具 Hooks

以下工具 Hooks 位于 `src/core/utils/performance/` 目录下：

### useDebounce

防抖 Hook，用于延迟执行函数。

```typescript
import { useDebounce } from '@agions/taroviz';

const debouncedValue = useDebounce(value, delay);
```

### useThrottle

节流 Hook，用于限制函数执行频率。

```typescript
import { useThrottle } from '@agions/taroviz';

const throttledFn = useThrottle(fn, limit);
```

### useAnimationFrame

动画帧 Hook，用于实现流畅动画。

```typescript
import { useAnimationFrame } from '@agions/taroviz';

useAnimationFrame((time) => {
  // 动画逻辑
});
```

### useWindowSizeDebounce

窗口大小防抖 Hook，用于响应窗口大小变化。

```typescript
import { useWindowSizeDebounce } from '@agions/taroviz';

const [width, height] = useWindowSizeDebounce(100);
```
