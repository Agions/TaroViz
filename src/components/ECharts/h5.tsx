/**
 * Taro ECharts H5版本
 * 为H5环境提供ECharts图表组件
 */
import { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import H5Adapter from './adapters/h5';
import { lightTheme } from './theme';

// 导入样式
import './styles/h5.scss';

// 导入类型
import { EChartsProps } from './types/props';
import { EChartsRef } from './types';
import { H5AdapterOptions } from './types/platform';
import { DataURLOption, LoadingOption } from './types/common';

// H5环境的ECharts组件
const H5ECharts = forwardRef<EChartsRef, EChartsProps>((props, ref) => {
  const {
    option,
    width = '100%',
    height = '300px',
    theme = lightTheme,
    disableTouch = false,
    renderer = 'canvas',
    devicePixelRatio,
    className = '',
    style = {},
    canvasId = 'echarts-canvas',
    notMerge = false,
    lazyUpdate = false,
    showLoading = false,
    loadingOption,
    onInit,
    onChartReady,
    onEvents = {},
    onOptionChanged,
    onRendered,
    onResize,
    ...rest
  } = props;

  // 创建容器引用
  const containerRef = useRef<any>(null);
  // 创建适配器引用
  const adapterRef = useRef<H5Adapter | null>(null);
  // 图表实例
  const [chartInstance, setChartInstance] = useState<any>(null);

  // 初始化适配器
  useEffect(() => {
    // 创建适配器选项
    const adapterOptions: H5AdapterOptions = {
      containerRef,
      theme: theme as any,
      renderer,
      devicePixelRatio,
      disableTouch,
      canvasId: 'echarts-canvas',
      width,
      height,
      onInit: (instance) => {
        setChartInstance(instance);
        if (onInit) {
          onInit(instance);
        }
      },
      h5Options: {
        onEvents
      } as any
    };

    // 创建适配器实例
    adapterRef.current = new H5Adapter(adapterOptions);

    return () => {
      // 组件卸载时销毁图表
      if (adapterRef.current) {
        adapterRef.current.dispose();
        adapterRef.current = null;
      }
    };
  }, []);

  // 监听配置变化，更新图表
  useEffect(() => {
    if (adapterRef.current && option) {
      adapterRef.current.setOption(option, notMerge);

      if (onOptionChanged) {
        onOptionChanged(option);
      }
    }
  }, [option, notMerge]);

  // 监听图表就绪事件
  useEffect(() => {
    if (chartInstance && onChartReady) {
      onChartReady(chartInstance);
    }
  }, [chartInstance, onChartReady]);

  // 监听渲染完成事件
  useEffect(() => {
    if (chartInstance && onRendered) {
      const handleRendered = () => {
        onRendered();
      };

      chartInstance.on('rendered', handleRendered);

      return () => {
        chartInstance.off('rendered', handleRendered);
      };
    }
  }, [chartInstance, onRendered]);

  // 监听尺寸变化
  useEffect(() => {
    if (adapterRef.current) {
      adapterRef.current.resize();

      if (chartInstance && onResize) {
        // 获取容器实际尺寸
        const container = containerRef.current;
        if (container) {
          const { clientWidth, clientHeight } = container;
          onResize(clientWidth, clientHeight);
        }
      }
    }
  }, [width, height, chartInstance, onResize]);

  // 显示/隐藏加载动画
  useEffect(() => {
    if (chartInstance) {
      if (showLoading) {
        chartInstance.showLoading(loadingOption);
      } else {
        chartInstance.hideLoading();
      }
    }
  }, [chartInstance, showLoading, loadingOption]);

  // 绑定事件处理函数
  useEffect(() => {
    if (chartInstance && onEvents) {
      // 先清除已有事件
      Object.keys(onEvents).forEach(eventName => {
        chartInstance.off(eventName);
      });

      // 重新绑定事件
      Object.keys(onEvents).forEach(eventName => {
        chartInstance.on(eventName, onEvents[eventName]);
      });
    }
  }, [chartInstance, onEvents]);

  // 监听窗口尺寸变化，自动调整图表大小
  useEffect(() => {
    const handleResize = () => {
      if (adapterRef.current) {
        adapterRef.current.resize();
      }
    };

    // 添加窗口尺寸变化监听
    Taro.eventCenter.on('__taroWindowResize', handleResize);

    return () => {
      // 移除监听
      Taro.eventCenter.off('__taroWindowResize', handleResize);
    };
  }, []);

  // 提供组件实例方法
  useImperativeHandle(ref, () => ({
    // 获取ECharts实例
    getEchartsInstance: () => chartInstance,

    // 设置图表配置
    setOption: (newOption, notMerge = false) => {
      if (adapterRef.current) {
        adapterRef.current.setOption(newOption, notMerge);
      }
    },

    // 调整图表大小
    resize: () => {
      if (adapterRef.current) {
        adapterRef.current.resize();
      }
    },

    // 触发图表行为
    dispatchAction: (payload) => {
      if (chartInstance) {
        chartInstance.dispatchAction(payload);
      }
    },

    // 转换为图片
    convertToDataURL: (opts?: DataURLOption) => {
      if (adapterRef.current) {
        return adapterRef.current.convertToDataURL(opts);
      }
      return undefined;
    },

    // 清空图表
    clear: () => {
      if (chartInstance) {
        chartInstance.clear();
      }
    },

    // 销毁图表实例
    dispose: () => {
      if (adapterRef.current) {
        adapterRef.current.dispose();
      }
    },

    // 显示加载动画
    showLoading: (opts?: LoadingOption) => {
      if (chartInstance) {
        chartInstance.showLoading(opts);
      }
    },

    // 隐藏加载动画
    hideLoading: () => {
      if (chartInstance) {
        chartInstance.hideLoading();
      }
    },

    // 获取图表图片
    getDataURL: (opts?: DataURLOption) => {
      if (adapterRef.current) {
        return adapterRef.current.getDataURL(opts);
      }
      return undefined;
    }
  }), [chartInstance]);

  // 计算合并样式
  const mergedStyle = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  // 主容器类名
  const containerClass = `echarts-for-taro ${className}`.trim();

  return (
    <View className={containerClass} style={mergedStyle} {...rest}>
      {adapterRef.current?.render()}
    </View>
  );
});

// 设置组件名称
H5ECharts.displayName = 'H5ECharts';

export default H5ECharts;
