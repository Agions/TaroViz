import React from 'react';
import { View, Text, Navigator } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';

const Index: React.FC = () => {
  return (
    <View className='index-page'>
      <View className='header'>
        <Text className='title'>Taro ECharts 示例</Text>
      </View>

      <View className='charts-list'>
        <Navigator url='/pages/line-chart/index' className='chart-item'>
          <Text>折线图</Text>
        </Navigator>

        <Navigator url='/pages/bar-chart/index' className='chart-item'>
          <Text>柱状图</Text>
        </Navigator>

        <Navigator url='/pages/pie-chart/index' className='chart-item'>
          <Text>饼图</Text>
        </Navigator>

        <Navigator url='/pages/custom-chart/index' className='chart-item'>
          <Text>自定义图表</Text>
        </Navigator>
      </View>
    </View>
  );
};

export default Index;
