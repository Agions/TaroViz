import React, { useState, useRef } from 'react';
import { View, Button, Text, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import ECharts from '../src/h5';
import { EChartsRef, lightTheme, darkTheme } from '../src';
import { saveAsImage, formatDataURLOptions } from '../src/components/ECharts/utils';
import './style.scss';

// 图表类型选项
const chartTypes = [
  { label: '折线图', value: 'line' },
  { label: '柱状图', value: 'bar' },
  { label: '饼图', value: 'pie' },
  { label: '散点图', value: 'scatter' },
  { label: '雷达图', value: 'radar' },
  { label: '漏斗图', value: 'funnel' },
  { label: '仪表盘', value: 'gauge' }
];

// 示例数据
const getChartOption = (type: string) => {
  // 基础数据
  const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月'];
  const sales = [120, 132, 101, 134, 90, 230, 210];
  const profits = [220, 182, 191, 234, 290, 330, 310];

  switch (type) {
    case 'line':
      return {
        title: { text: '折线图示例' },
        tooltip: { trigger: 'axis' },
        legend: { data: ['销量', '利润'] },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: months },
        yAxis: { type: 'value' },
        series: [
          { name: '销量', type: 'line', data: sales },
          { name: '利润', type: 'line', data: profits }
        ]
      };
    
    case 'bar':
      return {
        title: { text: '柱状图示例' },
        tooltip: { trigger: 'axis' },
        legend: { data: ['销量', '利润'] },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: months },
        yAxis: { type: 'value' },
        series: [
          { name: '销量', type: 'bar', data: sales },
          { name: '利润', type: 'bar', data: profits }
        ]
      };
    
    case 'pie':
      return {
        title: { text: '饼图示例' },
        tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
        legend: { orient: 'vertical', left: 10, data: months },
        series: [
          {
            name: '销售数据',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: { show: false },
            emphasis: {
              label: { show: true, fontSize: '16', fontWeight: 'bold' }
            },
            labelLine: { show: false },
            data: months.map((month, index) => ({ value: sales[index], name: month }))
          }
        ]
      };
      
    case 'scatter':
      return {
        title: { text: '散点图示例' },
        tooltip: {},
        xAxis: {},
        yAxis: {},
        series: [{
          symbolSize: 20,
          data: [
            [10.0, 8.04],
            [8.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [11.0, 8.33],
            [14.0, 9.96],
            [6.0, 7.24],
            [4.0, 4.26],
            [12.0, 10.84],
            [7.0, 4.82],
            [5.0, 5.68]
          ],
          type: 'scatter'
        }]
      };
    
    case 'radar':
      return {
        title: { text: '雷达图示例' },
        tooltip: {},
        radar: {
          indicator: [
            { name: '销售', max: 6500 },
            { name: '管理', max: 16000 },
            { name: '技术', max: 30000 },
            { name: '客服', max: 38000 },
            { name: '发展', max: 52000 },
            { name: '市场', max: 25000 }
          ]
        },
        series: [{
          name: '预算 vs 开销',
          type: 'radar',
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: '预算'
            },
            {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: '开销'
            }
          ]
        }]
      };
    
    case 'funnel':
      return {
        title: { text: '漏斗图示例' },
        tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c}%' },
        legend: { data: ['展现', '点击', '访问', '咨询', '订单'] },
        series: [
          {
            name: '转化率',
            type: 'funnel',
            left: '10%',
            width: '80%',
            label: { formatter: '{b}: {c}%' },
            data: [
              { value: 100, name: '展现' },
              { value: 80, name: '点击' },
              { value: 60, name: '访问' },
              { value: 40, name: '咨询' },
              { value: 20, name: '订单' }
            ]
          }
        ]
      };
    
    case 'gauge':
      return {
        title: { text: '仪表盘示例' },
        tooltip: { formatter: '{a} <br/>{b} : {c}%' },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: [{ value: 50, name: '完成率' }]
          }
        ]
      };
      
    default:
      return {
        title: { text: '请选择图表类型' }
      };
  }
};

const H5ChartExample: React.FC = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [chartType, setChartType] = useState('line');
  const [option, setOption] = useState(getChartOption('line'));
  const [renderer, setRenderer] = useState<'canvas' | 'svg'>('canvas');
  const chartRef = useRef<EChartsRef>(null);
  
  // 切换主题
  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };
  
  // 切换渲染器
  const toggleRenderer = () => {
    setRenderer(renderer === 'canvas' ? 'svg' : 'canvas');
  };
  
  // 更新图表类型
  const handleChartTypeChange = (e) => {
    const typeIndex = e.detail.value;
    const selectedType = chartTypes[typeIndex].value;
    setChartType(selectedType);
    setOption(getChartOption(selectedType));
  };
  
  // 随机更新数据
  const refreshData = () => {
    const newOption = JSON.parse(JSON.stringify(option));
    
    // 根据图表类型更新数据
    if (chartType === 'line' || chartType === 'bar') {
      newOption.series.forEach(series => {
        series.data = Array(7).fill(0).map(() => Math.floor(Math.random() * 300) + 50);
      });
    } else if (chartType === 'pie') {
      newOption.series[0].data.forEach(item => {
        item.value = Math.floor(Math.random() * 300) + 50;
      });
    } else if (chartType === 'gauge') {
      newOption.series[0].data[0].value = Math.floor(Math.random() * 100);
    }
    
    setOption(newOption);
  };
  
  // 处理图表点击事件
  const handleChartClick = (params) => {
    Taro.showToast({
      title: `点击了: ${params.seriesName || ''} ${params.name || ''} (${params.value || ''})`
    });
  };
  
  // 导出图表图片
  const exportChart = async () => {
    if (!chartRef.current) return;
    
    const dataUrl = chartRef.current.getDataURL(formatDataURLOptions({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: theme === lightTheme ? '#ffffff' : '#333333'
    }));
    
    if (dataUrl) {
      const fileName = `${chartType}-chart-${Date.now()}.png`;
      const success = await saveAsImage(dataUrl, fileName);
      
      if (success) {
        Taro.showToast({
          title: '图表已保存',
          icon: 'success'
        });
      } else {
        Taro.showToast({
          title: '保存失败',
          icon: 'error'
        });
      }
    }
  };
  
  // 显示加载状态
  const [isLoading, setIsLoading] = useState(false);
  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };

  return (
    <View className='demo-container'>
      <Text className='demo-title'>Taro ECharts H5组件示例</Text>
      
      <View className='control-panel'>
        <Picker mode='selector' range={chartTypes} rangeKey='label' onChange={handleChartTypeChange}>
          <View className='picker-view'>
            <Text className='picker-label'>图表类型: </Text>
            <Text className='picker-value'>{chartTypes.find(item => item.value === chartType)?.label}</Text>
          </View>
        </Picker>
      </View>
      
      <View className='chart-wrapper'>
        <ECharts
          ref={chartRef}
          option={option}
          theme={theme}
          renderer={renderer}
          showLoading={isLoading}
          onEvents={{
            click: handleChartClick
          }}
          onInit={(instance) => console.log('图表已初始化')}
          onRendered={() => console.log('图表渲染完成')}
        />
      </View>
      
      <View className='button-group'>
        <Button onClick={toggleTheme} className='action-button'>
          {theme === lightTheme ? '暗色主题' : '亮色主题'}
        </Button>
        <Button onClick={refreshData} className='action-button'>
          刷新数据
        </Button>
        <Button onClick={toggleRenderer} className='action-button'>
          {renderer === 'canvas' ? 'SVG渲染' : 'Canvas渲染'}
        </Button>
        <Button onClick={exportChart} className='action-button'>
          导出图片
        </Button>
        <Button onClick={toggleLoading} className='action-button'>
          {isLoading ? '隐藏加载' : '显示加载'}
        </Button>
      </View>
      
      <View className='chart-info'>
        <Text className='info-text'>渲染模式: {renderer}</Text>
        <Text className='info-text'>主题: {theme === lightTheme ? '亮色' : '暗色'}</Text>
        <Text className='info-text'>图表类型: {chartTypes.find(item => item.value === chartType)?.label}</Text>
      </View>
    </View>
  );
};

export default H5ChartExample; 