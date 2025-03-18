import React, { useState } from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Chart } from '../../components/Chart';
import type { EChartsOption } from 'echarts';
import './index.scss';

const LineChart: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  // 折线图配置
  const option: EChartsOption = {
    title: {
      text: '折线图示例',
      left: 'center'
    } as any,
    tooltip: {
      trigger: 'axis'
    } as any,
    legend: {
      data: ['销量', '利润'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '销量',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210],
        smooth: true
      },
      {
        name: '利润',
        type: 'line',
        data: [220, 182, 191, 234, 290, 330, 310],
        smooth: true
      }
    ]
  };

  // 刷新图表数据
  const refreshData = () => {
    setLoading(true);
    // 模拟数据加载
    setTimeout(() => {
      setLoading(false);
      Taro.showToast({
        title: '数据已更新',
        icon: 'success',
        duration: 2000
      });
    }, 1000);
  };

  return (
    <View className='line-chart-page'>
      <View className='chart-container'>
        <Chart option={option} loading={loading} />
      </View>

      <View className='controls'>
        <Button type='primary' onClick={refreshData}>刷新数据</Button>
        <Button onClick={() => Taro.navigateBack()}>返回</Button>
      </View>
    </View>
  );
};

export default LineChart;
