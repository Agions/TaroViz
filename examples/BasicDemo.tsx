import React, { useState, useRef } from 'react';
import { View, Button, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import ECharts, { EChartsRef, lightTheme, darkTheme } from '../src';
import './style.scss';

const BasicDemo: React.FC = () => {
  const [theme, setTheme] = useState(lightTheme);
  const chartRef = useRef<EChartsRef>(null);
  
  const option = {
    title: {
      text: 'ECharts 基础示例'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['销量', '利润']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '销量',
        type: 'line',
        stack: '总量',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '利润',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310]
      }
    ]
  };

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const refreshData = () => {
    if (chartRef.current) {
      chartRef.current.setOption({
        series: [
          {
            data: Array(7).fill(0).map(() => Math.floor(Math.random() * 300) + 50)
          },
          {
            data: Array(7).fill(0).map(() => Math.floor(Math.random() * 300) + 100)
          }
        ]
      });
    }
  };

  const handleChartClick = (params) => {
    Taro.showToast({
      title: `点击了: ${params.seriesName} ${params.name} (${params.value})`,
      icon: 'none'
    });
  };

  return (
    <View className='demo-container'>
      <Text className='demo-title'>Taro ECharts 多端组件演示</Text>
      
      <View className='chart-wrapper'>
        <ECharts
          ref={chartRef}
          option={option}
          theme={theme}
          onEvents={{
            click: handleChartClick
          }}
          onInit={(instance) => console.log('图表已初始化')}
          onRenderComplete={() => console.log('图表渲染完成')}
        />
      </View>
      
      <View className='button-group'>
        <Button onClick={toggleTheme} className='action-button'>
          切换{theme === lightTheme ? '暗色' : '亮色'}主题
        </Button>
        <Button onClick={refreshData} className='action-button'>
          刷新数据
        </Button>
      </View>
    </View>
  );
};

export default BasicDemo; 