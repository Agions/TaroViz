import React, { useState } from 'react';
import { View, Button, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Chart } from '../../components/Chart';
import type { EChartsOption } from 'echarts';
import './index.scss';

const BarChart: React.FC = () => {
  const [chartType, setChartType] = useState<string>('bar');
  const chartTypes = ['bar', 'bar-stack', 'bar-horizontal'];
  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number>(0);

  // 基础柱状图配置
  const getBarOption = (): EChartsOption => {
    const baseOption = {
      title: {
        text: '柱状图示例',
        left: 'center'
      } as any,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      } as any,
      legend: {
        bottom: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '15%',
        containLabel: true
      }
    };

    // 根据选择的图表类型返回不同配置
    if (chartType === 'bar') {
      return {
        ...baseOption,
        xAxis: {
          type: 'category',
          data: ['一季度', '二季度', '三季度', '四季度']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '2022年',
            type: 'bar',
            data: [120, 180, 150, 170]
          },
          {
            name: '2023年',
            type: 'bar',
            data: [180, 200, 190, 210]
          }
        ]
      } as EChartsOption;
    } else if (chartType === 'bar-stack') {
      return {
        ...baseOption,
        title: {
          text: '堆叠柱状图示例',
          left: 'center'
        } as any,
        xAxis: {
          type: 'category',
          data: ['一季度', '二季度', '三季度', '四季度']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '产品A',
            type: 'bar',
            stack: 'total',
            data: [120, 132, 101, 134]
          },
          {
            name: '产品B',
            type: 'bar',
            stack: 'total',
            data: [80, 72, 91, 84]
          },
          {
            name: '产品C',
            type: 'bar',
            stack: 'total',
            data: [30, 42, 31, 44]
          }
        ]
      } as EChartsOption;
    } else if (chartType === 'bar-horizontal') {
      return {
        ...baseOption,
        title: {
          text: '横向柱状图示例',
          left: 'center'
        } as any,
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['产品A', '产品B', '产品C', '产品D', '产品E']
        },
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [120, 200, 150, 80, 70]
          }
        ]
      } as EChartsOption;
    }

    // 默认返回基础柱状图配置
    return {
      ...baseOption,
      xAxis: {
        type: 'category',
        data: ['一季度', '二季度', '三季度', '四季度']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '数据',
          type: 'bar',
          data: [120, 150, 180, 200]
        }
      ]
    } as EChartsOption;
  };

  // 处理图表类型变化
  const handleTypeChange = (e: any) => {
    const index = parseInt(e.detail.value);
    setSelectedTypeIndex(index);
    setChartType(chartTypes[index]);
  };

  return (
    <View className='bar-chart-page'>
      <View className='chart-container'>
        <Chart option={getBarOption()} />
      </View>

      <View className='controls'>
        <View className='type-selector'>
          <Picker mode='selector' range={['基础柱状图', '堆叠柱状图', '横向柱状图']}
            value={selectedTypeIndex} onChange={handleTypeChange}>
            <View className='picker-view'>
              切换图表类型
            </View>
          </Picker>
        </View>

        <Button onClick={() => Taro.navigateBack()}>返回</Button>
      </View>
    </View>
  );
};

export default BarChart;
