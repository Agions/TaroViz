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

// 微信小程序全局对象
declare namespace WechatMiniprogram {
  interface Wx {
    getSystemInfoSync: () => any;
    createSelectorQuery: () => any;
    qy?: any; // 企业微信
    [key: string]: any;
  }
}
declare const wx: WechatMiniprogram.Wx;

// 支付宝小程序全局对象
declare const my: {
  getSystemInfoSync: () => any;
  createSelectorQuery: () => any;
  [key: string]: any;
};

// 百度小程序全局对象
declare const swan: {
  getSystemInfoSync: () => any;
  createSelectorQuery: () => any;
  [key: string]: any;
};

// 字节跳动小程序全局对象
declare const tt: {
  getSystemInfoSync: () => any;
  createSelectorQuery: () => any;
  env?: {
    appName?: string;
    [key: string]: any;
  };
  [key: string]: any;
};

// QQ小程序全局对象
declare const qq: {
  getSystemInfoSync: () => any;
  createSelectorQuery: () => any;
  [key: string]: any;
};

// 京东小程序全局对象
declare const jd: {
  getSystemInfoSync: () => any;
  createSelectorQuery: () => any;
  [key: string]: any;
};

// 钉钉小程序全局对象
declare const dd: {
  getSystemInfoSync: () => any;
  createSelectorQuery: () => any;
  [key: string]: any;
};

// ECharts for 小程序
declare module 'echarts-for-weapp';

// React Native 特有声明
declare namespace JSX {
  interface IntrinsicAttributes {
    [key: string]: any;
  }
} 