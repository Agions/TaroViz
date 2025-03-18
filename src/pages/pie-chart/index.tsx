import React, { useState } from 'react';
import { View, Button, Switch, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Chart } from '../../components/Chart';
import type { EChartsOption } from 'echarts';
import './index.scss';

const PieChart: React.FC = () => {
  const [isDonut, setIsDonut] = useState<boolean>(false);
  const [showLegend, setShowLegend] = useState<boolean>(true);

  // 饼图数据
  const pieData = [
    { value: 1048, name: '搜索引擎' },
    { value: 735, name: '直接访问' },
    { value: 580, name: '邮件营销' },
    { value: 484, name: '联盟广告' },
    { value: 300, name: '视频广告' }
  ];

  // 饼图配置
  const getPieOption = (): EChartsOption => {
    return {
      title: {
        text: isDonut ? '环形图示例' : '饼图示例',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      } as any,
      legend: {
        show: showLegend,
        orient: 'horizontal',
        bottom: 10,
        data: pieData.map(item => item.name)
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: isDonut ? ['40%', '70%'] : '70%',
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}: {d}%'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: pieData
        }
      ]
    };
  };

  return (
    <View className='pie-chart-page'>
      <View className='chart-container'>
        <Chart option={getPieOption()} />
      </View>

      <View className='controls'>
        <View className='control-item'>
          <Text>环形图:</Text>
          <Switch checked={isDonut} onChange={(e) => setIsDonut(e.detail.value)} />
        </View>

        <View className='control-item'>
          <Text>显示图例:</Text>
          <Switch checked={showLegend} onChange={(e) => setShowLegend(e.detail.value)} />
        </View>

        <Button onClick={() => Taro.navigateBack()}>返回</Button>
      </View>
    </View>
  );
};

export default PieChart;
