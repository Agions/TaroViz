import React, { useState } from 'react';
import { View, Button, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import ECharts from '../../components/ECharts';
import './index.scss';

const CustomChart: React.FC = () => {
  const [chartData, setChartData] = useState([
    { value: 40, name: '数据1' },
    { value: 38, name: '数据2' },
    { value: 32, name: '数据3' },
    { value: 30, name: '数据4' },
    { value: 28, name: '数据5' },
    { value: 26, name: '数据6' },
    { value: 22, name: '数据7' },
    { value: 18, name: '数据8' }
  ]);

  const [inputValue, setInputValue] = useState<string>('');
  const [inputName, setInputName] = useState<string>('');

  // 仪表盘配置
  const getOption = () => {
    return {
      title: {
        text: '自定义仪表盘图',
        left: 'center'
      },
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: '指标完成度',
          type: 'gauge',
          detail: { formatter: '{value}%' },
          data: [{ value: 50, name: '完成率' }],
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.3, '#ff6e76'],
                [0.7, '#fddd60'],
                [1, '#7cffb2']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            distance: -30,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 2
            }
          },
          splitLine: {
            distance: -30,
            length: 30,
            lineStyle: {
              color: '#fff',
              width: 4
            }
          },
          axisLabel: {
            color: 'auto',
            distance: 40,
            fontSize: 14
          }
        },
        {
          name: '数据分布',
          type: 'pie',
          radius: ['20%', '30%'],
          center: ['75%', '75%'],
          data: chartData,
          label: {
            show: false
          },
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
  };

  // 添加数据
  const addData = () => {
    if (!inputValue || !inputName) {
      Taro.showToast({
        title: '请输入数据和名称',
        icon: 'none'
      });
      return;
    }

    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      Taro.showToast({
        title: '请输入有效数字',
        icon: 'none'
      });
      return;
    }

    const newData = [...chartData, { value: numValue, name: inputName }];
    setChartData(newData);
    setInputValue('');
    setInputName('');

    Taro.showToast({
      title: '数据已添加',
      icon: 'success'
    });
  };

  // 重置数据
  const resetData = () => {
    setChartData([
      { value: 40, name: '数据1' },
      { value: 38, name: '数据2' },
      { value: 32, name: '数据3' },
      { value: 30, name: '数据4' },
      { value: 28, name: '数据5' },
      { value: 26, name: '数据6' },
      { value: 22, name: '数据7' },
      { value: 18, name: '数据8' }
    ]);

    Taro.showToast({
      title: '数据已重置',
      icon: 'success'
    });
  };

  return (
    <View className='custom-chart-page'>
      <View className='chart-container'>
        <ECharts option={getOption()} />
      </View>

      <View className='data-input'>
        <View className='input-group'>
          <Text>数据值:</Text>
          <Input
            type='number'
            placeholder='请输入数值'
            value={inputValue}
            onInput={(e) => setInputValue(e.detail.value)}
          />
        </View>

        <View className='input-group'>
          <Text>名称:</Text>
          <Input
            type='text'
            placeholder='请输入名称'
            value={inputName}
            onInput={(e) => setInputName(e.detail.value)}
          />
        </View>
      </View>

      <View className='controls'>
        <Button type='primary' onClick={addData}>添加数据</Button>
        <Button onClick={resetData}>重置数据</Button>
        <Button onClick={() => Taro.navigateBack()}>返回</Button>
      </View>
    </View>
  );
};

export default CustomChart;
