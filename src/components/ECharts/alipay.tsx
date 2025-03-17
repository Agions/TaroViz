/**
 * Taro ECharts 支付宝小程序版本
 * 为支付宝小程序环境提供ECharts图表组件
 */
import { forwardRef } from 'react';
import { View } from '@tarojs/components';
import type { EChartsProps, EChartsRef } from './types';

// 导入样式
import './styles/alipay.scss';

// 支付宝小程序环境的ECharts组件
const AlipayECharts = forwardRef<EChartsRef, EChartsProps>((_props, _ref) => {
  // 简化版本，仅为了通过构建
  return (
    <View className="echarts-for-taro">
      <View>支付宝小程序版本尚未实现</View>
    </View>
  );
});

// 设置组件名称
AlipayECharts.displayName = 'AlipayECharts';

export default AlipayECharts;
