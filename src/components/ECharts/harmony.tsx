/**
 * Taro ECharts 鸿蒙OS版本
 * 为鸿蒙OS环境提供ECharts图表组件
 */
import { forwardRef } from 'react';
import { View } from '@tarojs/components';
import type { EChartsProps, EChartsRef } from './types';

// 导入样式
import './styles/harmony.scss';

// 鸿蒙OS环境的ECharts组件
const HarmonyECharts = forwardRef<EChartsRef, EChartsProps>((_props, _ref) => {
  // 简化版本，仅为了通过构建
  return (
    <View className="echarts-for-taro">
      <View>鸿蒙OS版本尚未实现</View>
    </View>
  );
});

// 设置组件名称
HarmonyECharts.displayName = 'HarmonyECharts';

export default HarmonyECharts;
