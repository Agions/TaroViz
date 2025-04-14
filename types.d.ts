/**
 * TaroViz 全局类型声明
 * 为所有子包和主包提供类型定义
 */

/**
 * 核心包类型定义
 */
declare module '@agions/core' {
  export * from '@agions/core/src/types';
  export * from '@agions/core/src/utils';
  export const name: string;
  export const version: string;
  export const BaseChart: React.ComponentType<any>;
}

declare module '@agions/core/types' {
  export * from '@agions/core/src/types';
}

declare module '@agions/core/utils' {
  export * from '@agions/core/src/utils';
}

/**
 * 适配器包类型定义
 */
declare module '@agions/adapters' {
  import { AdapterOptions, Platform, Adapter as CoreAdapter } from '@agions/core/types';
  
  export interface AdapterConfig extends AdapterOptions {}
  export type Adapter = CoreAdapter;
  export type PlatformType = Platform;
  
  export const version: string;
  export function getEnv(): Record<string, any>;
  export function detectPlatform(): PlatformType;
  export function getAdapter(config: AdapterConfig): Adapter;
  
  export class H5Adapter implements Adapter {
    constructor(config: AdapterConfig);
    init(): any;
    getInstance(): any;
    setOption(option: any, opts?: any): void;
    getWidth(): number;
    getHeight(): number;
    getDom(): HTMLElement | null;
    resize(opts?: any): void;
    dispatchAction(payload: any): void;
    convertToDataURL(opts?: any): string | undefined;
    clear(): void;
    getDataURL(opts?: any): string | undefined;
    on(eventName: string, handler: any, context?: object): void;
    off(eventName: string, handler?: Function): void;
    showLoading(opts?: object): void;
    hideLoading(): void;
    dispose(): void;
    render(): JSX.Element;
  }
  
  export class WeappAdapter implements Adapter {
    constructor(config: AdapterConfig);
    init(): any;
    getInstance(): any;
    setOption(option: any, opts?: any): void;
    getWidth(): number;
    getHeight(): number;
    getDom(): HTMLElement | null;
    resize(opts?: any): void;
    dispatchAction(payload: any): void;
    convertToDataURL(opts?: any): string | undefined;
    clear(): void;
    getDataURL(opts?: any): string | undefined;
    on(eventName: string, handler: any, context?: object): void;
    off(eventName: string, handler?: Function): void;
    showLoading(opts?: object): void;
    hideLoading(): void;
    dispose(): void;
    render(): JSX.Element;
  }
  
  export class AlipayAdapter implements Adapter {
    constructor(config: AdapterConfig);
    init(): any;
    getInstance(): any;
    setOption(option: any, opts?: any): void;
    getWidth(): number;
    getHeight(): number;
    getDom(): HTMLElement | null;
    resize(opts?: any): void;
    dispatchAction(payload: any): void;
    convertToDataURL(opts?: any): string | undefined;
    clear(): void;
    getDataURL(opts?: any): string | undefined;
    on(eventName: string, handler: any, context?: object): void;
    off(eventName: string, handler?: Function): void;
    showLoading(opts?: object): void;
    hideLoading(): void;
    dispose(): void;
    render(): JSX.Element;
  }
  
  export class SwanAdapter implements Adapter {
    constructor(config: AdapterConfig);
    init(): any;
    getInstance(): any;
    setOption(option: any, opts?: any): void;
    getWidth(): number;
    getHeight(): number;
    getDom(): HTMLElement | null;
    resize(opts?: any): void;
    dispatchAction(payload: any): void;
    convertToDataURL(opts?: any): string | undefined;
    clear(): void;
    getDataURL(opts?: any): string | undefined;
    on(eventName: string, handler: any, context?: object): void;
    off(eventName: string, handler?: Function): void;
    showLoading(opts?: object): void;
    hideLoading(): void;
    dispose(): void;
    render(): JSX.Element;
  }
  
  export class HarmonyAdapter implements Adapter {
    constructor(config: AdapterConfig);
    init(): any;
    getInstance(): any;
    setOption(option: any, opts?: any): void;
    getWidth(): number;
    getHeight(): number;
    getDom(): HTMLElement | null;
    resize(opts?: any): void;
    dispatchAction(payload: any): void;
    convertToDataURL(opts?: any): string | undefined;
    clear(): void;
    getDataURL(opts?: any): string | undefined;
    on(eventName: string, handler: any, context?: object): void;
    off(eventName: string, handler?: Function): void;
    showLoading(opts?: object): void;
    hideLoading(): void;
    dispose(): void;
    render(): JSX.Element;
  }
}

/**
 * 适配器子包类型定义
 */
declare module '@agions/adapters/h5' {
  import { H5Adapter } from '@agions/adapters';
  const adapter: typeof H5Adapter;
  export default adapter;
}

declare module '@agions/adapters/weapp' {
  import { WeappAdapter } from '@agions/adapters';
  const adapter: typeof WeappAdapter;
  export default adapter;
}

declare module '@agions/adapters/alipay' {
  import { AlipayAdapter } from '@agions/adapters';
  const adapter: typeof AlipayAdapter;
  export default adapter;
}

declare module '@agions/adapters/swan' {
  import { SwanAdapter } from '@agions/adapters';
  const adapter: typeof SwanAdapter;
  export default adapter;
}

declare module '@agions/adapters/harmony' {
  import { HarmonyAdapter } from '@agions/adapters';
  const adapter: typeof HarmonyAdapter;
  export default adapter;
}

/**
 * 主题包类型定义
 */
declare module '@agions/themes' {
  export * from '@agions/themes/src';
  export const version: string;
}

/**
 * 数据处理包类型定义
 */
declare module '@agions/data' {
  export * from '@agions/data/src';
  export const version: string;
}

/**
 * Hooks包类型定义
 */
declare module '@agions/hooks' {
  import React from 'react';
  
  export interface ChartOptions {
    [key: string]: any;
  }
  
  export interface ChartInstance {
    setOption: (option: any, notMerge?: boolean) => void;
    resize: () => void;
    on: (event: string, handler: Function) => void;
    off: (event: string, handler?: Function) => void;
    showLoading: (opts?: any) => void;
    hideLoading: () => void;
    dispose: () => void;
    [key: string]: any;
  }
  
  export function useChart(chartRef: React.RefObject<HTMLElement>): [ChartInstance | null, React.Dispatch<React.SetStateAction<ChartInstance | null>>];
  export function useOption(instance: ChartInstance | null, option: any, notMerge?: boolean): void;
  export function useResize(instance: ChartInstance | null, deps?: React.DependencyList): void;
  export function useEvents(instance: ChartInstance | null, events: Record<string, Function>): void;
  export function useLoading(instance: ChartInstance | null, loading: boolean, loadingOptions?: object): void;
  export function useChartTheme(instance: ChartInstance | null, theme: string | object): void;
  export function useChartData(data: any, transformer?: (data: any) => any): any;
  
  export const version: string;
  
  const HooksExport: {
    useChart: typeof useChart;
    useOption: typeof useOption;
    useResize: typeof useResize;
    useEvents: typeof useEvents;
    useLoading: typeof useLoading;
    useChartTheme: typeof useChartTheme;
    useChartData: typeof useChartData;
  };
  
  export default HooksExport;
}

/**
 * 图表组件包类型定义
 */
declare module '@agions/charts' {
  export * from '@agions/charts/src';
  export const version: string;
}

/**
 * 完整导出包类型定义
 */
declare module '@agions' {
  import * as CoreLib from '@agions/core';
  import * as AdaptersLib from '@agions/adapters';
  import * as ChartsLib from '@agions/charts';
  import * as ThemesLib from '@agions/themes';
  import * as DataLib from '@agions/data';
  import * as HooksLib from '@agions/hooks';
  import { LineChart, BarChart, PieChart, RadarChart, ScatterChart, HeatmapChart } from '@agions/charts';
  import { 
    useChart, 
    useOption, 
    useResize, 
    useEvents, 
    useLoading, 
    useChartTheme, 
    useChartData 
  } from '@agions/hooks';
  
  // 命名空间导出
  export const Core: typeof CoreLib;
  export const Adapters: typeof AdaptersLib;
  export const Charts: typeof ChartsLib;
  export const Themes: typeof ThemesLib;
  export const Data: typeof DataLib;
  export const Hooks: typeof HooksLib;
  
  // 适配器导出
  export const H5Adapter: React.ComponentType<any>;
  export const WeappAdapter: React.ComponentType<any>;
  export const AlipayAdapter: React.ComponentType<any>;
  export const SwanAdapter: React.ComponentType<any>;
  export const HarmonyAdapter: React.ComponentType<any>;
  
  // 核心类型导出
  export const BaseChart: React.ComponentType<any>;
  export const coreVersion: string;
  
  // 适配器核心功能导出
  export const getAdapter: typeof AdaptersLib.getAdapter;
  export const getEnv: typeof AdaptersLib.getEnv;
  export const detectPlatform: typeof AdaptersLib.detectPlatform;
  export const adaptersVersion: string;
  
  // 图表组件导出
  export { LineChart, BarChart, PieChart, RadarChart, ScatterChart, HeatmapChart };
  
  // Hooks导出
  export { 
    useChart, 
    useOption, 
    useResize, 
    useEvents, 
    useLoading, 
    useChartTheme, 
    useChartData 
  };
  
  // 包信息
  export const name: string;
  export const version: string;
  
  // 定义默认导出类型
  export interface DefaultExport {
    Core: typeof CoreLib;
    Adapters: typeof AdaptersLib;
    Charts: typeof ChartsLib;
    Themes: typeof ThemesLib;
    Data: typeof DataLib;
    Hooks: typeof HooksLib;
    getAdapter: typeof AdaptersLib.getAdapter;
    H5Adapter: React.ComponentType<any>;
    WeappAdapter: React.ComponentType<any>;
  }
  
  // 默认导出
  const defaultExport: DefaultExport;
  export default defaultExport;
}

// 声明echarts-for-react模块
declare module 'echarts-for-react/lib/core' {
  import { EChartsOption } from 'echarts';
  import React from 'react';
  
  interface ReactEChartsProps {
    option: EChartsOption;
    notMerge?: boolean;
    lazyUpdate?: boolean;
    style?: React.CSSProperties;
    className?: string;
    theme?: string | object;
    onChartReady?: (instance: any) => void;
    onEvents?: Record<string, Function>;
    opts?: {
      devicePixelRatio?: number;
      renderer?: 'canvas' | 'svg';
      width?: number | string;
      height?: number | string;
      locale?: string;
    };
    [key: string]: any;
  }
  
  export default class ReactEChartsCore extends React.Component<ReactEChartsProps> {
    getEchartsInstance(): any;
  }
} 