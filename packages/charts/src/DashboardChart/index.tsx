import { View } from '@tarojs/components';
import { EChartsOption } from '@agions/taroviz-core/types';
import React, { useEffect, useState } from 'react';

// 导入其他基础图表组件
import BarChart from '../BarChart';
import GaugeChart from '../GaugeChart';
import LineChart from '../LineChart';
import PieChart from '../PieChart';

export interface ChartConfig {
  /**
   * 图表类型
   */
  type: 'line' | 'bar' | 'pie' | 'gauge' | 'custom';

  /**
   * 图表配置项
   */
  option: EChartsOption;

  /**
   * 宽度
   */
  width?: number | string;

  /**
   * 高度
   */
  height?: number | string;

  /**
   * 网格布局位置
   */
  gridArea?: string;

  /**
   * 样式
   */
  style?: React.CSSProperties;

  /**
   * 类名
   */
  className?: string;

  /**
   * 自定义渲染函数
   */
  render?: () => React.ReactNode;

  /**
   * 唯一标识
   */
  key: string;
}

export interface DashboardChartProps {
  /**
   * 仪表板布局
   */
  layout?: {
    /**
     * 网格模板列
     */
    gridTemplateColumns?: string;

    /**
     * 网格模板行
     */
    gridTemplateRows?: string;

    /**
     * 网格模板区域
     */
    gridTemplateAreas?: string;

    /**
     * 网格间隙
     */
    gap?: string;
  };

  /**
   * 图表配置列表
   */
  charts: ChartConfig[];

  /**
   * 样式
   */
  style?: React.CSSProperties;

  /**
   * 类名
   */
  className?: string;

  /**
   * 主题
   */
  theme?: string | object;

  /**
   * 是否自动调整大小
   */
  autoResize?: boolean;

  /**
   * 是否显示加载动画
   */
  loading?: boolean;

  /**
   * 渲染器类型
   */
  renderer?: 'canvas' | 'svg';
}

/**
 * 仪表板组件
 * 可以在一个页面中展示多个图表
 */
const DashboardChart: React.FC<DashboardChartProps> = ({
  layout = {
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
    gap: '16px',
  },
  charts,
  style = {},
  className = '',
  theme,
  autoResize = true,
  loading = false,
  renderer = 'canvas',
}) => {
  // 映射图表类型到组件
  const renderChart = (config: ChartConfig) => {
    if (config.type === 'custom' && config.render) {
      return config.render();
    }

    const commonProps = {
      option: config.option,
      width: config.width || '100%',
      height: config.height || '100%',
      theme,
      autoResize,
      loading,
      renderer,
      style: {
        ...(config.style || {}),
        gridArea: config.gridArea,
      },
      className: config.className || '',
      key: config.key,
    };

    switch (config.type) {
      case 'line':
        return <LineChart {...commonProps} />;
      case 'bar':
        return <BarChart {...commonProps} />;
      case 'pie':
        return <PieChart {...commonProps} />;
      case 'gauge':
        return <GaugeChart {...commonProps} />;
      default:
        return null;
    }
  };

  // 合并样式
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: layout.gridTemplateColumns,
    gridTemplateRows: layout.gridTemplateRows,
    gridTemplateAreas: layout.gridTemplateAreas,
    gap: layout.gap,
    ...style,
  };

  return (
    <View className={`taroviz-dashboard-chart ${className}`} style={containerStyle}>
      {charts.map((chartConfig) => renderChart(chartConfig))}
    </View>
  );
};

export default DashboardChart;
