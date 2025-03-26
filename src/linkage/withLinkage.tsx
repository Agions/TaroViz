import React, { useRef, useEffect, useMemo, useState, ComponentType } from 'react';
import type { EChartsOption } from 'echarts';

import { getLinkage } from './index';
import type { ChartLinkageProps, LinkageEvent, ChartLinkConfig } from './types';
import { generateUUID } from '../utils/uuid';

// 将 ECharts 事件名映射到联动事件
const defaultEventMap: Record<string, LinkageEvent> = {
  'mouseover': 'highlight',
  'legendselectchanged': 'legendSelect',
  'datazoom': 'dataZoom',
  'click': 'click',
  'dblclick': 'dblclick',
  'brushselected': 'brush',
  'visualmap': 'visualMap',
  'restore': 'restore',
  'selectchanged': 'select'
};

// 联动事件处理映射
const actionMap: Record<LinkageEvent, (chart: any, params: any) => void> = {
  tooltip: (chart, params) => {
    chart.dispatchAction({
      type: 'showTip',
      ...params
    });
  },
  highlight: (chart, params) => {
    chart.dispatchAction({
      type: 'highlight',
      ...params
    });
  },
  legendSelect: (chart, params) => {
    const { selected, name } = params;
    if (name) {
      chart.dispatchAction({
        type: selected ? 'legendSelect' : 'legendUnSelect',
        name
      });
    } else if (selected) {
      Object.keys(selected).forEach(key => {
        chart.dispatchAction({
          type: selected[key] ? 'legendSelect' : 'legendUnSelect',
          name: key
        });
      });
    }
  },
  dataZoom: (chart, params) => {
    chart.dispatchAction({
      type: 'dataZoom',
      ...params
    });
  },
  select: (chart, params) => {
    chart.dispatchAction({
      type: 'select',
      ...params
    });
  },
  brush: (chart, params) => {
    chart.dispatchAction({
      type: 'brush',
      ...params
    });
  },
  restore: (chart) => {
    chart.dispatchAction({
      type: 'restore'
    });
  },
  click: (chart, params) => {
    // 不直接触发点击事件，因为这会创建循环
    chart.dispatchAction({
      type: 'highlight',
      ...params
    });
  },
  dblclick: (chart, params) => {
    // 同上，不直接触发双击事件
    chart.dispatchAction({
      type: 'highlight',
      ...params
    });
  },
  visualMap: (chart, params) => {
    chart.dispatchAction({
      type: 'selectDataRange',
      ...params
    });
  },
  drill: (chart, params) => {
    // 下钻需要特殊处理，通常是修改配置选项
    if (params.option) {
      chart.setOption(params.option);
    }
  },
  custom: (chart, params) => {
    // 自定义事件由用户自行处理
    if (params.action && typeof params.action === 'function') {
      params.action(chart, params);
    }
  }
};

/**
 * 创建联动高阶组件
 * @param ChartComponent 图表组件
 * @returns 具有联动功能的组件
 */
export function withLinkage<P extends object>(
  ChartComponent: React.ComponentType<P>
): React.FC<P & ChartLinkageProps> {
  return (props: P & ChartLinkageProps) => {
    const { linkage, linkConfig, chartId: propChartId, ...restProps } = props;
    
    // 生成唯一图表ID
    const chartId = useMemo(() => propChartId || generateUUID(), [propChartId]);
    const chartInstanceRef = useRef<any>(null);
    const unregisterRef = useRef<() => void | undefined>();
    const eventListenersRef = useRef<Array<() => void>>([]);
    
    // 获取联动实例
    const linkageInstance = useMemo(() => {
      if (!linkage) return undefined;
      
      if (typeof linkage === 'string') {
        return getLinkage(linkage);
      }
      
      return linkage;
    }, [linkage]);
    
    // 处理联动配置
    const config = useMemo<ChartLinkConfig>(() => ({
      target: ['tooltip', 'highlight', 'legendSelect', 'dataZoom', 'select'],
      broadcast: ['click', 'highlight', 'legendSelect', 'dataZoom'],
      ...linkConfig
    }), [linkConfig]);
    
    // 初始化联动
    useEffect(() => {
      if (!linkageInstance || !chartInstanceRef.current) return;
      
      // 清理旧的事件监听器
      eventListenersRef.current.forEach(unsubscribe => unsubscribe());
      eventListenersRef.current = [];
      
      // 注册图表到联动组
      unregisterRef.current = linkageInstance.registerChart(
        chartId,
        chartInstanceRef.current
      );
      
      // 订阅需要监听的联动事件
      if (config.target && config.target.length) {
        config.target.forEach(event => {
          // 检查是否在禁用列表中
          if (config.disabled && config.disabled.includes(event)) return;
          
          const handler = (data: any) => {
            // 忽略自己触发的事件
            if (data.sourceChartId === chartId) return;
            
            // 应用数据映射
            const params = config.dataMapper 
              ? config.dataMapper(event, data.params)
              : data.params;
            
            // 通过action map分发动作
            if (actionMap[event]) {
              actionMap[event](chartInstanceRef.current, params);
            }
          };
          
          const unsubscribe = linkageInstance.on(event, handler);
          eventListenersRef.current.push(unsubscribe);
        });
      }
      
      return () => {
        // 清理事件监听器
        eventListenersRef.current.forEach(unsubscribe => unsubscribe());
        eventListenersRef.current = [];
        
        // 取消图表注册
        if (unregisterRef.current) {
          unregisterRef.current();
          unregisterRef.current = undefined;
        }
      };
    }, [linkageInstance, chartId, config]);
    
    // 处理图表初始化
    const handleChartInit = (chart: any) => {
      chartInstanceRef.current = chart;
      
      if (linkageInstance && config.broadcast && config.broadcast.length) {
        // 注册要广播的事件
        const eventMap = {
          ...defaultEventMap,
          ...(config.eventMap || {})
        };
        
        Object.keys(eventMap).forEach(echartEvent => {
          const linkEvent = eventMap[echartEvent];
          
          // 检查是否需要广播此事件
          if (
            !config.broadcast?.includes(linkEvent) || 
            (config.disabled && config.disabled.includes(linkEvent))
          ) {
            return;
          }
          
          // 注册ECharts事件处理函数
          chart.on(echartEvent, (params: any) => {
            linkageInstance.trigger(linkEvent, params, chartId);
          });
        });
      }
      
      // 调用原始的onInit
      if ((props as any).onInit) {
        (props as any).onInit(chart);
      }
    };
    
    return (
      <ChartComponent
        {...(restProps as P)}
        onInit={handleChartInit}
      />
    );
  };
} 