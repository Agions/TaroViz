# TaroViz 自定义图表指南

TaroViz 不仅提供了丰富的内置图表组件，还允许您创建完全自定义的可视化。本指南将介绍如何利用 TaroViz 提供的底层 API 创建自定义图表。

## 自定义图表基础

### 使用底层 Canvas API

TaroViz 提供了对底层 Canvas 绘图 API 的访问，使您可以绘制任何内容：

```jsx
import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import { useCanvas } from '@taroviz/hooks';

function CustomChart() {
  const { canvasRef, ctx, width, height } = useCanvas();
  
  useEffect(() => {
    if (!ctx) return;
    
    // 清除画布
    ctx.clearRect(0, 0, width, height);
    
    // 绘制自定义图形
    ctx.fillStyle = '#36a2eb';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, Math.min(width, height) / 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('自定义图表', width / 2, height / 2);
  }, [ctx, width, height]);
  
  return (
    <View style={{ width: '100%', height: '300px' }}>
      <Canvas id="custom-chart" ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </View>
  );
}
```

### 使用 Chart 基础组件

TaroViz 提供了一个基础的 `Chart` 组件，处理了常见的初始化、尺寸管理和事件绑定：

```jsx
import React from 'react';
import { Chart } from '@taroviz/core';

function CustomBarChart({ data, width, height }) {
  const renderContent = (ctx, chart) => {
    const { width, height } = chart.getSize();
    
    // 计算柱状图参数
    const barCount = data.length;
    const barWidth = width / (barCount * 1.5);
    const maxValue = Math.max(...data.map(d => d.value));
    
    // 绘制坐标轴
    ctx.strokeStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(40, height - 40);
    ctx.lineTo(width - 20, height - 40);
    ctx.stroke();
    
    // 绘制柱状图
    data.forEach((item, index) => {
      const x = 40 + index * (barWidth * 1.5);
      const barHeight = (height - 60) * (item.value / maxValue);
      const y = height - 40 - barHeight;
      
      // 绘制柱子
      ctx.fillStyle = '#36a2eb';
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // 绘制标签
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(item.label, x + barWidth / 2, height - 25);
      
      // 绘制数值
      ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5);
    });
  };
  
  return (
    <Chart
      data={data}
      width={width}
      height={height}
      render={renderContent}
    />
  );
}

// 使用示例
function App() {
  const data = [
    { label: '一月', value: 50 },
    { label: '二月', value: 25 },
    { label: '三月', value: 40 },
    { label: '四月', value: 30 },
    { label: '五月', value: 60 }
  ];
  
  return <CustomBarChart data={data} width={400} height={300} />;
}
```

## 高级自定义

### 创建交互式图表

添加交互功能，如悬停和点击效果：

```jsx
import React, { useState } from 'react';
import { Chart } from '@taroviz/core';

function InteractiveCustomChart({ data, width, height }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const handleTap = (event, chart) => {
    const { x, y } = event;
    const barWidth = width / (data.length * 1.5);
    
    // 计算点击的是哪个柱子
    for (let i = 0; i < data.length; i++) {
      const barX = 40 + i * (barWidth * 1.5);
      if (x >= barX && x <= barX + barWidth) {
        setActiveIndex(i);
        return;
      }
    }
    
    // 点击空白区域取消选中
    setActiveIndex(-1);
  };
  
  const renderContent = (ctx, chart) => {
    const { width, height } = chart.getSize();
    
    // 绘制与前面示例相同的基本图表...
    
    // 为活动柱子添加高亮效果
    if (activeIndex >= 0) {
      const barWidth = width / (data.length * 1.5);
      const x = 40 + activeIndex * (barWidth * 1.5);
      const maxValue = Math.max(...data.map(d => d.value));
      const barHeight = (height - 60) * (data[activeIndex].value / maxValue);
      const y = height - 40 - barHeight;
      
      // 绘制高亮效果
      ctx.strokeStyle = '#ff6384';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 2, y - 2, barWidth + 4, barHeight + 4);
      
      // 绘制提示框
      const tooltipWidth = 100;
      const tooltipHeight = 40;
      const tooltipX = x + barWidth / 2 - tooltipWidth / 2;
      const tooltipY = y - tooltipHeight - 10;
      
      // 绘制提示框背景
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);
      
      // 绘制提示文本
      ctx.fillStyle = '#fff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(data[activeIndex].label, tooltipX + tooltipWidth / 2, tooltipY + 15);
      ctx.fillText(data[activeIndex].value.toString(), tooltipX + tooltipWidth / 2, tooltipY + 30);
    }
  };
  
  return (
    <Chart
      data={data}
      width={width}
      height={height}
      render={renderContent}
      onTap={handleTap}
    />
  );
}
```

### 添加动画效果

为自定义图表添加简单的动画效果：

```jsx
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from '@taroviz/core';
import { useAnimationFrame } from '@taroviz/hooks';

function AnimatedCustomChart({ data, width, height }) {
  const [animProgress, setAnimProgress] = useState(0);
  const animRef = useRef({ active: true, startTime: Date.now() });
  
  // 使用动画钩子
  useAnimationFrame(() => {
    if (!animRef.current.active) return;
    
    const elapsed = Date.now() - animRef.current.startTime;
    const duration = 1000; // 1秒动画
    
    if (elapsed >= duration) {
      setAnimProgress(1);
      animRef.current.active = false;
      return;
    }
    
    // 使用缓动函数使动画更平滑
    const progress = easeOutQuad(elapsed / duration);
    setAnimProgress(progress);
  }, []);
  
  // 缓动函数
  const easeOutQuad = (t) => t * (2 - t);
  
  const renderContent = (ctx, chart) => {
    const { width, height } = chart.getSize();
    
    // 计算柱状图参数
    const barCount = data.length;
    const barWidth = width / (barCount * 1.5);
    const maxValue = Math.max(...data.map(d => d.value));
    
    // 绘制坐标轴
    ctx.strokeStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(40, height - 40);
    ctx.lineTo(width - 20, height - 40);
    ctx.stroke();
    
    // 绘制柱状图（带动画）
    data.forEach((item, index) => {
      const x = 40 + index * (barWidth * 1.5);
      const fullHeight = (height - 60) * (item.value / maxValue);
      // 应用动画进度
      const barHeight = fullHeight * animProgress;
      const y = height - 40 - barHeight;
      
      // 绘制柱子
      ctx.fillStyle = '#36a2eb';
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // 绘制标签
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(item.label, x + barWidth / 2, height - 25);
      
      // 值的透明度随动画进度变化
      ctx.globalAlpha = animProgress;
      ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5);
      ctx.globalAlpha = 1;
    });
  };
  
  return (
    <Chart
      data={data}
      width={width}
      height={height}
      render={renderContent}
    />
  );
}
```

## 结合现有组件

### 扩展现有图表组件

您可以扩展 TaroViz 的内置组件，添加自定义功能：

```jsx
import React from 'react';
import { LineChart } from '@taroviz/components';
import { useTheme } from '@taroviz/hooks';

// 扩展折线图添加阈值线
function LineChartWithThreshold({ data, threshold, thresholdLabel, ...rest }) {
  const theme = useTheme();
  
  // 自定义插件
  const thresholdPlugin = {
    id: 'thresholdLine',
    afterDraw: (chart) => {
      const { ctx, chartArea, scales } = chart;
      const { top, bottom, left, right } = chartArea;
      const y = scales.y.getPixelForValue(threshold);
      
      // 绘制阈值线
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(left, y);
      ctx.lineTo(right, y);
      ctx.lineWidth = 2;
      ctx.strokeStyle = theme.colors.danger || '#ff6384';
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      
      // 绘制标签
      if (thresholdLabel) {
        ctx.fillStyle = theme.colors.danger || '#ff6384';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(thresholdLabel, right + 5, y + 4);
      }
      ctx.restore();
    }
  };
  
  // 合并插件到选项
  const options = {
    ...rest.options,
    plugins: {
      ...rest.options?.plugins,
      thresholdPlugin: true,
    }
  };
  
  // 注册自定义插件
  const plugins = [thresholdPlugin];
  
  return (
    <LineChart
      data={data}
      options={options}
      plugins={plugins}
      {...rest}
    />
  );
}

// 使用示例
function App() {
  const data = {
    labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
    datasets: [
      {
        label: '销售额',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#5ab1ef',
      }
    ]
  };
  
  return (
    <LineChartWithThreshold
      data={data}
      threshold={10}
      thresholdLabel="目标值"
      width="100%"
      height={300}
    />
  );
}
```

### 创建复合图表

将多个图表组合在一起创建复杂的可视化：

```jsx
import React, { useState } from 'react';
import { View } from '@tarojs/components';
import { LineChart, BarChart } from '@taroviz/components';

function CompoundChart({ lineData, barData }) {
  // 共享选中状态
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  // 处理折线图点击
  const handleLineChartClick = (event, chartInstance) => {
    const points = chartInstance.getElementsAtEventForMode(
      event.nativeEvent,
      'nearest',
      { intersect: true },
      false
    );
    
    if (points.length) {
      setSelectedIndex(points[0].index);
    } else {
      setSelectedIndex(-1);
    }
  };
  
  // 处理柱状图点击
  const handleBarChartClick = (event, chartInstance) => {
    const points = chartInstance.getElementsAtEventForMode(
      event.nativeEvent,
      'nearest',
      { intersect: true },
      false
    );
    
    if (points.length) {
      setSelectedIndex(points[0].index);
    } else {
      setSelectedIndex(-1);
    }
  };
  
  // 根据选中索引突出显示数据点
  const getHighlightedLineData = () => {
    if (selectedIndex === -1) return lineData;
    
    return {
      ...lineData,
      datasets: lineData.datasets.map(dataset => ({
        ...dataset,
        pointBackgroundColor: dataset.data.map((_, i) => 
          i === selectedIndex ? '#ff6384' : dataset.backgroundColor || '#36a2eb'
        ),
        pointRadius: dataset.data.map((_, i) => 
          i === selectedIndex ? 8 : 4
        )
      }))
    };
  };
  
  // 根据选中索引突出显示柱子
  const getHighlightedBarData = () => {
    if (selectedIndex === -1) return barData;
    
    return {
      ...barData,
      datasets: barData.datasets.map(dataset => ({
        ...dataset,
        backgroundColor: dataset.data.map((_, i) => 
          i === selectedIndex ? '#ff6384' : dataset.backgroundColor || '#36a2eb'
        )
      }))
    };
  };
  
  return (
    <View>
      <View style={{ marginBottom: '20px' }}>
        <LineChart 
          data={getHighlightedLineData()} 
          height={200}
          onTap={handleLineChartClick}
        />
      </View>
      
      <View>
        <BarChart 
          data={getHighlightedBarData()} 
          height={200}
          onTap={handleBarChartClick}
        />
      </View>
    </View>
  );
}

// 使用示例
function App() {
  // 两个图表使用相同的标签，但不同的数据系列
  const labels = ['一月', '二月', '三月', '四月', '五月', '六月'];
  
  const lineData = {
    labels,
    datasets: [
      {
        label: '销售额趋势',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#5ab1ef',
        fill: false
      }
    ]
  };
  
  const barData = {
    labels,
    datasets: [
      {
        label: '销售额分布',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: '#36a2eb'
      }
    ]
  };
  
  return <CompoundChart lineData={lineData} barData={barData} />;
}
```

## 自定义主题

### 创建和使用主题

TaroViz 支持自定义主题，您可以创建全局主题或特定图表的主题：

```jsx
import React from 'react';
import { ThemeProvider } from '@taroviz/core';
import { LineChart, BarChart, PieChart } from '@taroviz/components';

// 创建自定义主题
const darkTheme = {
  backgroundColor: '#333',
  colors: ['#36a2eb', '#ff6384', '#ffcd56', '#4bc0c0', '#9966ff'],
  textStyle: {
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    fontSize: 12
  },
  lineStyle: {
    width: 2,
    dash: [0, 0]
  },
  grid: {
    color: 'rgba(255, 255, 255, 0.1)'
  },
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderColor: '#555',
    textStyle: {
      color: '#fff'
    }
  }
};

function ThemedDashboard() {
  // 准备数据...
  
  return (
    <ThemeProvider theme={darkTheme}>
      <View style={{ backgroundColor: '#222', padding: '20px' }}>
        <LineChart data={lineData} />
        <BarChart data={barData} />
        <PieChart data={pieData} />
      </View>
    </ThemeProvider>
  );
}
```

### 主题切换和响应

实现主题切换功能，响应用户偏好：

```jsx
import React, { useState, useEffect } from 'react';
import { View, Button } from '@tarojs/components';
import { ThemeProvider } from '@taroviz/core';
import { LineChart } from '@taroviz/components';
import Taro from '@tarojs/taro';

// 明亮主题
const lightTheme = {
  backgroundColor: '#fff',
  colors: ['#36a2eb', '#ff6384', '#ffcd56', '#4bc0c0', '#9966ff'],
  textStyle: {
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    fontSize: 12
  },
  grid: {
    color: 'rgba(0, 0, 0, 0.1)'
  }
};

// 暗色主题
const darkTheme = {
  backgroundColor: '#333',
  colors: ['#5ab1ef', '#f35f7f', '#f9d45a', '#60c5c5', '#aa7aff'],
  textStyle: {
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    fontSize: 12
  },
  grid: {
    color: 'rgba(255, 255, 255, 0.1)'
  }
};

function ThemeSwitchableChart() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // 检测系统深色模式
  useEffect(() => {
    Taro.getSystemInfo({
      success: (res) => {
        if (res.theme === 'dark') {
          setIsDarkMode(true);
        }
      }
    });
  }, []);
  
  // 切换主题
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const currentTheme = isDarkMode ? darkTheme : lightTheme;
  
  const data = {
    labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
    datasets: [
      {
        label: '销售额',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: currentTheme.colors[0],
        backgroundColor: `${currentTheme.colors[0]}33`, // 添加透明度
        fill: true
      }
    ]
  };
  
  const options = {
    scales: {
      y: {
        grid: {
          color: currentTheme.grid.color
        },
        ticks: {
          color: currentTheme.textStyle.color
        }
      },
      x: {
        grid: {
          color: currentTheme.grid.color
        },
        ticks: {
          color: currentTheme.textStyle.color
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: currentTheme.textStyle.color
        }
      }
    }
  };
  
  return (
    <View style={{ 
      backgroundColor: currentTheme.backgroundColor, 
      padding: '20px',
      transition: 'background-color 0.3s'
    }}>
      <ThemeProvider theme={currentTheme}>
        <LineChart data={data} options={options} height={300} />
        
        <Button 
          style={{ 
            marginTop: '20px',
            backgroundColor: isDarkMode ? '#fff' : '#333',
            color: isDarkMode ? '#333' : '#fff'
          }} 
          onClick={toggleTheme}
        >
          切换到{isDarkMode ? '亮色' : '暗色'}主题
        </Button>
      </ThemeProvider>
    </View>
  );
}
```

## 性能考虑

在创建自定义图表时，性能是重要考虑因素，特别是在小程序环境中：

1. **减少重绘**：尽量减少不必要的重绘，使用节流或防抖技术
2. **简化路径**：减少绘制的路径点数量
3. **分层渲染**：考虑使用多个Canvas进行分层渲染，静态内容和动态内容分开
4. **使用离屏Canvas**：对于复杂的静态内容，考虑使用离屏Canvas预渲染

```jsx
import React, { useEffect, useRef } from 'react';
import { Canvas } from '@tarojs/components';
import { useCanvas } from '@taroviz/hooks';

function OptimizedCustomChart({ data }) {
  const { canvasRef, ctx, width, height } = useCanvas();
  const offscreenCanvasRef = useRef(null);
  
  // 创建和渲染静态内容（坐标轴、网格等）
  useEffect(() => {
    if (!ctx || !width || !height) return;
    
    // 创建离屏Canvas
    const offscreenCanvas = wx.createOffscreenCanvas({ type: '2d', width, height });
    const offCtx = offscreenCanvas.getContext('2d');
    
    // 绘制静态内容到离屏Canvas
    offCtx.fillStyle = '#f5f5f5';
    offCtx.fillRect(0, 0, width, height);
    
    // 绘制坐标轴和网格...
    
    offscreenCanvasRef.current = offscreenCanvas;
  }, [ctx, width, height]);
  
  // 渲染动态内容
  useEffect(() => {
    if (!ctx || !width || !height || !offscreenCanvasRef.current) return;
    
    // 清除主Canvas
    ctx.clearRect(0, 0, width, height);
    
    // 绘制离屏Canvas内容
    ctx.drawImage(offscreenCanvasRef.current, 0, 0, width, height);
    
    // 绘制动态内容（数据点、交互元素等）
    data.forEach((item, index) => {
      // 绘制数据点...
    });
  }, [ctx, width, height, data]);
  
  return (
    <Canvas id="optimized-chart" ref={canvasRef} style={{ width: '100%', height: '300px' }} />
  );
}
```

## 总结

通过本指南，您已经了解了如何使用 TaroViz 创建自定义图表，从基础的绘图 API 到高级交互和动画效果。自定义图表可以帮助您实现独特的可视化需求，超越内置组件的限制。

记住以下几点：

1. 从简单开始，逐步添加复杂功能
2. 重用内置组件和工具尽可能减少代码量
3. 考虑性能影响，特别是在小程序环境中
4. 确保图表在不同设备上的响应式显示
5. 遵循可访问性原则，使您的图表对所有用户友好

有关更多示例和高级用法，请参考 [TaroViz GitHub 仓库](https://github.com/agions/taroviz) 中的示例代码。 