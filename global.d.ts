declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd' | 'harmony';
    [key: string]: any;
  }
}

// ECharts for 小程序
declare module 'echarts-for-weapp';

// React Native 特有声明
declare namespace JSX {
  interface IntrinsicAttributes {
    [key: string]: any;
  }
} 