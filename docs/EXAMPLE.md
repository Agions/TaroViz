# TaroViz 示例库

本文档收集了 TaroViz 的各种实用示例，帮助您快速掌握各种图表类型的使用方法。

## 基础图表

### 折线图

```jsx
import { LineChart } from '@agions/components';

// 基础折线图
function BasicLine() {
  const data = {
    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    datasets: [
      {
        label: '访问量',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        borderColor: '#5ab1ef',
        backgroundColor: 'rgba(90, 177, 239, 0.2)',
      }
    ]
  };
  
  return <LineChart data={data} />;
}

// 多条线折线图
function MultiLine() {
  const data = {
    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    datasets: [
      {
        label: '访问量',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        borderColor: '#5ab1ef',
      },
      {
        label: '订单量',
        data: [320, 332, 301, 334, 390, 330, 320],
        borderColor: '#f35f7f',
      }
    ]
  };
  
  return <LineChart data={data} />;
}

// 面积图
function AreaChart() {
  const data = {
    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    datasets: [
      {
        label: '访问量',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        borderColor: '#5ab1ef',
        backgroundColor: 'rgba(90, 177, 239, 0.5)',
        fill: true
      }
    ]
  };
  
  return <LineChart data={data} />;
}
```

### 柱状图

```jsx
import { BarChart } from '@agions/components';

// 基础柱状图
function BasicBar() {
  const data = {
    labels: ['一月', '二月', '三月', '四月', '五月'],
    datasets: [
      {
        label: '销售额',
        data: [50, 25, 40, 30, 60],
        backgroundColor: '#36a2eb'
      }
    ]
  };
  
  return <BarChart data={data} />;
}

// 横向柱状图
function HorizontalBar() {
  const data = {
    labels: ['一月', '二月', '三月', '四月', '五月'],
    datasets: [
      {
        label: '销售额',
        data: [50, 25, 40, 30, 60],
        backgroundColor: '#36a2eb'
      }
    ]
  };
  
  const options = {
    indexAxis: 'y' // 设置为水平方向
  };
  
  return <BarChart data={data} options={options} />;
}

// 堆叠柱状图
function StackedBar() {
  const data = {
    labels: ['一月', '二月', '三月', '四月', '五月'],
    datasets: [
      {
        label: '线上销售',
        data: [50, 25, 40, 30, 60],
        backgroundColor: '#36a2eb'
      },
      {
        label: '线下销售',
        data: [30, 20, 25, 35, 40],
        backgroundColor: '#ff6384'
      }
    ]
  };
  
  const options = {
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };
  
  return <BarChart data={data} options={options} />;
}
```

### 饼图

```jsx
import { PieChart } from '@agions/components';

// 基础饼图
function BasicPie() {
  const data = {
    labels: ['线上', '线下', '其他'],
    datasets: [
      {
        data: [300, 180, 50],
        backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56']
      }
    ]
  };
  
  return <PieChart data={data} />;
}

// 环形图
function DonutChart() {
  const data = {
    labels: ['线上', '线下', '其他'],
    datasets: [
      {
        data: [300, 180, 50],
        backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56']
      }
    ]
  };
  
  const options = {
    cutout: '60%' // 设置环形图的内径百分比
  };
  
  return <PieChart data={data} options={options} />;
}
```

## 高级图表

### 散点图

```jsx
import { ScatterChart } from '@agions/components';

function ScatterPlot() {
  const data = {
    datasets: [
      {
        label: '分布',
        data: [
          { x: 10, y: 20 },
          { x: 15, y: 15 },
          { x: 20, y: 25 },
          { x: 25, y: 30 },
          { x: 30, y: 35 },
          { x: 35, y: 40 },
          { x: 40, y: 45 }
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      }
    ]
  };
  
  return <ScatterChart data={data} />;
}
```

### 雷达图

```jsx
import { RadarChart } from '@agions/components';

function RadarPlot() {
  const data = {
    labels: ['速度', '力量', '防御', '生命', '魔法', '技巧'],
    datasets: [
      {
        label: '角色A',
        data: [90, 70, 60, 80, 50, 85],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
      {
        label: '角色B',
        data: [60, 90, 80, 65, 85, 70],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      }
    ]
  };
  
  return <RadarChart data={data} />;
}
```

### 混合图表

```jsx
import { MixedChart } from '@agions/components';

function MixedChartExample() {
  const data = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        type: 'bar',
        label: '销售额',
        data: [50, 60, 70, 80, 90, 100],
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      },
      {
        type: 'line',
        label: '同比增长',
        data: [5, 15, 10, 12, 8, 10],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0)',
        yAxisID: 'y1'
      }
    ]
  };
  
  const options = {
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };
  
  return <MixedChart data={data} options={options} />;
}
```

## 交互示例

### 工具提示

```jsx
import { LineChart } from '@agions/components';

function TooltipExample() {
  const data = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        label: '销售额',
        data: [50, 60, 70, 80, 90, 100],
        borderColor: 'rgba(54, 162, 235, 1)',
      }
    ]
  };
  
  const options = {
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  };
  
  return <LineChart data={data} options={options} />;
}
```

### 点击事件

```jsx
import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { PieChart } from '@agions/components';

function ClickableChart() {
  const [clickedSlice, setClickedSlice] = useState(null);
  
  const data = {
    labels: ['线上', '线下', '其他'],
    datasets: [
      {
        data: [300, 180, 50],
        backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56']
      }
    ]
  };
  
  const handleClick = (event, chartElements) => {
    if (chartElements.length > 0) {
      const { index } = chartElements[0];
      setClickedSlice({
        label: data.labels[index],
        value: data.datasets[0].data[index]
      });
    }
  };
  
  return (
    <View>
      <PieChart 
        data={data} 
        onTap={handleClick}
      />
      {clickedSlice && (
        <View style={{ marginTop: '20px', textAlign: 'center' }}>
          <Text>您选择了: {clickedSlice.label}, 值: {clickedSlice.value}</Text>
        </View>
      )}
    </View>
  );
}
```

## 自定义图表

### 自定义样式

```jsx
import { BarChart } from '@agions/components';

function CustomStyleBar() {
  const data = {
    labels: ['一月', '二月', '三月', '四月', '五月'],
    datasets: [
      {
        label: '销售额',
        data: [50, 25, 40, 30, 60],
        backgroundColor: function(context) {
          const value = context.dataset.data[context.dataIndex];
          return value > 40 ? '#2ecc71' : '#e74c3c';
        },
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333'
      }
    ]
  };
  
  const options = {
    plugins: {
      title: {
        display: true,
        text: '月度销售统计',
        font: {
          size: 18,
          weight: 'bold'
        }
      },
      legend: {
        display: true,
        position: 'bottom'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            weight: 'bold'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            weight: 'bold'
          }
        }
      }
    }
  };
  
  return <BarChart data={data} options={options} />;
}
```

### 响应式设计

```jsx
import React, { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { LineChart } from '@agions/components';

function ResponsiveChartExample() {
  const [chartDimensions, setChartDimensions] = useState({
    width: 300,
    height: 200
  });
  
  useEffect(() => {
    const updateDimensions = async () => {
      try {
        const systemInfo = await Taro.getSystemInfo();
        const windowWidth = systemInfo.windowWidth;
      
        // 设置图表宽度为屏幕宽度的90%，高度为宽度的0.6倍（保持宽高比）
        setChartDimensions({
          width: windowWidth * 0.9,
          height: windowWidth * 0.9 * 0.6
        });
      } catch (error) {
        console.error('获取系统信息失败', error);
      }
    };
  
    updateDimensions();
  
    // 监听屏幕旋转事件（如果平台支持）
    Taro.onWindowResize && Taro.onWindowResize(() => {
      updateDimensions();
    });
  
    return () => {
      Taro.offWindowResize && Taro.offWindowResize();
    };
  }, []);
  
  const data = {
    labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
    datasets: [
      {
        label: '销售额',
        data: [50, 60, 70, 80, 90, 100],
        borderColor: '#5ab1ef',
      }
    ]
  };
  
  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <LineChart 
        data={data} 
        width={chartDimensions.width} 
        height={chartDimensions.height}
      />
    </View>
  );
}
```

## 数据可视化最佳实践

### 实时数据更新

```jsx
import React, { useEffect, useState } from 'react';
import { LineChart } from '@agions/components';

function RealtimeChart() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: '实时数据',
        data: [],
        borderColor: '#5ab1ef',
        backgroundColor: 'rgba(90, 177, 239, 0.2)',
        fill: true
      }
    ]
  });
  
  useEffect(() => {
    // 模拟数据源
    const initialLabels = Array.from({ length: 10 }, (_, i) => `${i + 1}s`);
    const initialData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
  
    setData({
      labels: initialLabels,
      datasets: [
        {
          ...data.datasets[0],
          data: initialData
        }
      ]
    });
  
    // 模拟实时数据更新
    const interval = setInterval(() => {
      setData(prevData => {
        const labels = [...prevData.labels.slice(1), `${parseInt(prevData.labels[prevData.labels.length - 1]) + 1}s`];
        const newDataPoint = Math.floor(Math.random() * 100);
        const dataPoints = [...prevData.datasets[0].data.slice(1), newDataPoint];
      
        return {
          labels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: dataPoints
            }
          ]
        };
      });
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  
  const options = {
    animation: {
      duration: 0 // 关闭动画以提高实时更新性能
    },
    scales: {
      y: {
        min: 0,
        max: 100
      }
    },
    plugins: {
      tooltip: {
        mode: 'nearest',
        intersect: false
      }
    }
  };
  
  return <LineChart data={data} options={options} />;
}
```

更多示例请查看 [TaroViz GitHub 仓库](https://github.com/agions/taroviz)中的示例代码。
