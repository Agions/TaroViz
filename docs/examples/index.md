# 示例

TaroViz 提供了丰富的图表示例，展示了各种图表类型的使用方法。本指南将介绍 TaroViz 的示例。

## 1. 基础示例

### 1.1 折线图

折线图用于展示数据随时间或类别的变化趋势。

```typescript
import React from 'react';
import { LineChart } from '@agions/taroviz';

const LineChartExample = () => {
  const option = {
    title: {
      text: '销售趋势'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['线上', '线下']
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '线上',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110],
        smooth: true
      },
      {
        name: '线下',
        type: 'line',
        data: [90, 150, 120, 100, 80, 130],
        smooth: true
      }
    ]
  };

  return (
    <LineChart
      chartId="line-chart-example"
      option={option}
      width="100%"
      height={400}
    />
  );
};

export default LineChartExample;
```

### 1.2 柱状图

柱状图用于比较不同类别的数据大小。

```typescript
import React from 'react';
import { BarChart } from '@agions/taroviz';

const BarChartExample = () => {
  const option = {
    title: {
      text: '产品销量对比'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['2023年', '2024年']
    },
    xAxis: {
      type: 'category',
      data: ['产品A', '产品B', '产品C', '产品D', '产品E']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '2023年',
        type: 'bar',
        data: [350, 250, 200, 150, 100]
      },
      {
        name: '2024年',
        type: 'bar',
        data: [450, 350, 300, 250, 200]
      }
    ]
  };

  return (
    <BarChart
      chartId="bar-chart-example"
      option={option}
      width="100%"
      height={400}
    />
  );
};

export default BarChartExample;
```

### 1.3 饼图

饼图用于展示数据的占比关系。

```typescript
import React from 'react';
import { PieChart } from '@agions/taroviz';

const PieChartExample = () => {
  const option = {
    title: {
      text: '销售渠道分布',
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
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <PieChart
      chartId="pie-chart-example"
      option={option}
      width="100%"
      height={400}
    />
  );
};

export default PieChartExample;
```

## 2. 高级示例

### 2.1 动态数据更新

展示如何动态更新图表数据。

```typescript
import React, { useState, useEffect } from 'react';
import { LineChart } from '@agions/taroviz';

const DynamicDataExample = () => {
  const [option, setOption] = useState({
    title: {
      text: '实时数据监控'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1秒前', '2秒前', '3秒前', '4秒前', '5秒前', '6秒前', '7秒前']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '实时数据',
        type: 'line',
        data: [0, 0, 0, 0, 0, 0, 0],
        smooth: true
      }
    ]
  });

  useEffect(() => {
    // 模拟实时数据更新
    const interval = setInterval(() => {
      setOption(prev => {
        // 生成随机数据
        const newData = [...prev.series[0].data.slice(1), Math.floor(Math.random() * 100)];

        return {
          ...prev,
          series: [
            {
              ...prev.series[0],
              data: newData
            }
          ]
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LineChart
      chartId="dynamic-data-example"
      option={option}
      width="100%"
      height={400}
      autoResize={true}
    />
  );
};

export default DynamicDataExample;
```

### 2.2 多图表联动

展示如何实现多个图表之间的联动。

```typescript
import React, { useState } from 'react';
import { LineChart, BarChart } from '@agions/taroviz';

const ChartLinkageExample = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

  // 共享的数据源
  const data = {
    '2023': {
      line: [120, 200, 150, 80, 70, 110],
      bar: [350, 250, 200, 150, 100]
    },
    '2024': {
      line: [150, 250, 200, 120, 100, 150],
      bar: [450, 350, 300, 250, 200]
    }
  };

  // 折线图配置
  const lineOption = {
    title: {
      text: '销售趋势'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '销售数据',
        type: 'line',
        data: data[selectedYear as keyof typeof data].line
      }
    ]
  };

  // 柱状图配置
  const barOption = {
    title: {
      text: '产品销量'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['产品A', '产品B', '产品C', '产品D', '产品E']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '销售数据',
        type: 'bar',
        data: data[selectedYear as keyof typeof data].bar
      }
    ]
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setSelectedYear('2023')}
          style={{ marginRight: '10px' }}
        >
          2023年
        </button>
        <button onClick={() => setSelectedYear('2024')}>
          2024年
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <LineChart
          chartId="line-chart-linkage"
          option={lineOption}
          width="100%"
          height={300}
        />
      </div>

      <BarChart
        chartId="bar-chart-linkage"
        option={barOption}
        width="100%"
        height={300}
      />
    </div>
  );
};

export default ChartLinkageExample;
```

### 2.3 自定义主题

展示如何使用自定义主题。

```typescript
import React from 'react';
import { LineChart, registerTheme } from '@agions/taroviz';

// 注册自定义主题
registerTheme('my-theme', {
  color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
  backgroundColor: '#f5f5f5',
  textStyle: {
    color: '#333'
  },
  title: {
    textStyle: {
      color: '#5470c6'
    }
  },
  legend: {
    textStyle: {
      color: '#666'
    }
  },
  axisLine: {
    lineStyle: {
      color: '#ccc'
    }
  },
  splitLine: {
    lineStyle: {
      color: '#eee',
      type: 'dashed'
    }
  }
});

const CustomThemeExample = () => {
  const option = {
    title: {
      text: '自定义主题示例'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['系列1', '系列2', '系列3']
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
        name: '系列1',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130]
      },
      {
        name: '系列2',
        type: 'line',
        data: [90, 150, 120, 100, 80, 130, 110]
      },
      {
        name: '系列3',
        type: 'line',
        data: [150, 250, 200, 120, 100, 150, 140]
      }
    ]
  };

  return (
    <LineChart
      chartId="custom-theme-example"
      option={option}
      width="100%"
      height={400}
      theme="my-theme" // 使用自定义主题
    />
  );
};

export default CustomThemeExample;
```

## 3. 平台特定示例

### 3.1 微信小程序示例

展示如何在微信小程序中使用 TaroViz。

```typescript
import React from 'react';
import { LineChart } from '@agions/taroviz';
import { View } from '@tarojs/components';

const WeappExample = () => {
  const option = {
    title: {
      text: '微信小程序示例'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '销售数据',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110]
      }
    ]
  };

  return (
    <View style={{ width: '100%', height: '400px' }}>
      <LineChart
        chartId="weapp-example"
        option={option}
        width="100%"
        height={400}
        renderer="canvas" // 微信小程序推荐使用 canvas 渲染器
      />
    </View>
  );
};

export default WeappExample;
```

### 3.2 H5 示例

展示如何在 H5 中使用 TaroViz。

```typescript
import React from 'react';
import { LineChart } from '@agions/taroviz';

const H5Example = () => {
  const option = {
    title: {
      text: 'H5 示例'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '销售数据',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110]
      }
    ]
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <LineChart
        chartId="h5-example"
        option={option}
        width="100%"
        height={400}
        renderer="svg" // H5 支持 svg 渲染器
        autoResize={true}
      />
    </div>
  );
};

export default H5Example;
```

## 4. 性能优化示例

### 4.1 大数据集处理

展示如何处理大数据集。

```typescript
import React from 'react';
import { LineChart } from '@agions/taroviz';

// 数据采样函数
const sampleData = (data: number[], sampleSize: number) => {
  if (data.length <= sampleSize) {
    return data;
  }

  const step = Math.ceil(data.length / sampleSize);
  return data.filter((_, index) => index % step === 0);
};

const BigDataExample = () => {
  // 生成大数据集（10000个数据点）
  const rawData = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));

  // 采样后的数据（1000个数据点）
  const sampledData = sampleData(rawData, 1000);

  const option = {
    title: {
      text: '大数据集示例'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Array.from({ length: sampledData.length }, (_, index) => index.toString())
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '大数据',
        type: 'line',
        data: sampledData,
        smooth: true,
        animation: false // 关闭动画以提高性能
      }
    ]
  };

  return (
    <LineChart
      chartId="big-data-example"
      option={option}
      width="100%"
      height={400}
      renderer="canvas"
    />
  );
};

export default BigDataExample;
```

## 5. 最佳实践

### 5.1 组件封装

展示如何封装自定义图表组件。

```typescript
import React from 'react';
import { LineChart, ChartProps } from '@agions/taroviz';

// 封装自定义折线图组件
interface CustomLineChartProps extends Omit<ChartProps, 'option'> {
  title: string;
  data: number[];
  xAxisData: string[];
}

const CustomLineChart: React.FC<CustomLineChartProps> = ({
  title,
  data,
  xAxisData,
  ...props
}) => {
  const option = {
    title: {
      text: title
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: xAxisData
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: title,
        type: 'line',
        data: data,
        smooth: true
      }
    ]
  };

  return (
    <LineChart
      {...props}
      option={option}
    />
  );
};

// 使用封装后的组件
const ComponentEncapsulationExample = () => {
  return (
    <CustomLineChart
      chartId="custom-line-chart"
      title="封装组件示例"
      data={[120, 200, 150, 80, 70, 110, 130]}
      xAxisData={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
      width="100%"
      height={400}
    />
  );
};

export default ComponentEncapsulationExample;
```

### 5.2 错误处理

展示如何添加错误处理。

```typescript
import React, { useState } from 'react';
import { LineChart } from '@agions/taroviz';

const ErrorHandlingExample = () => {
  const [option, setOption] = useState({
    title: {
      text: '错误处理示例'
    },
    // 故意省略 xAxis 和 yAxis 配置，模拟错误
    series: [
      {
        name: '系列1',
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130]
      }
    ]
  });

  const [error, setError] = useState<string | null>(null);

  const handleError = (err: Error) => {
    setError(err.message);
    console.error('图表错误:', err);
  };

  const fixError = () => {
    setOption(prev => ({
      ...prev,
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      }
    }));
    setError(null);
  };

  return (
    <div>
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          <p>发生错误: {error}</p>
          <button onClick={fixError}>修复错误</button>
        </div>
      )}

      <LineChart
        chartId="error-handling-example"
        option={option}
        width="100%"
        height={400}
        onError={handleError}
      />
    </div>
  );
};

export default ErrorHandlingExample;
```
