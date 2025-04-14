/**
 * 全局平台类型声明
 */

// 微信小程序全局对象
declare namespace WechatMiniprogram {
  interface Wx {
    getSystemInfoSync: () => any;
    createSelectorQuery: () => any;
    createCanvasContext: (canvasId: string) => any;
    canvasToTempFilePath: (options: any) => void;
    [key: string]: any;
  }
}

// 微信小程序全局变量
declare const wx: WechatMiniprogram.Wx;

// 支付宝小程序全局对象
interface IMy {
  getSystemInfoSync: () => any;
  createSelectorQuery: () => {
    select: (selector: string) => {
      boundingClientRect: () => {
        exec: (callback: (res: any[]) => void) => void;
      };
    };
  };
  createCanvasContext: (canvasId: string) => any;
  canvasToTempFilePath: (options: any) => void;
  [key: string]: any;
}

// 支付宝小程序全局变量
declare const my: IMy;

// 百度小程序全局对象
interface ISwan {
  getSystemInfoSync: () => any;
  createSelectorQuery: () => any;
  createCanvasContext: (canvasId: string) => any;
  [key: string]: any;
}

// 百度小程序全局变量
declare const swan: ISwan;

// 字节跳动小程序全局对象
interface ITt {
  getSystemInfoSync: () => any;
  createSelectorQuery: () => any;
  createCanvasContext: (canvasId: string) => any;
  [key: string]: any;
}

// 字节跳动小程序全局变量
declare const tt: ITt;

// QQ小程序全局对象
interface IQq {
  getSystemInfoSync: () => any;
  createSelectorQuery: () => any;
  createCanvasContext: (canvasId: string) => any;
  [key: string]: any;
}

// QQ小程序全局变量
declare const qq: IQq;

// 京东小程序全局对象
interface IJd {
  getSystemInfoSync: () => any;
  createSelectorQuery: () => any;
  createCanvasContext: (canvasId: string) => any;
  [key: string]: any;
}

// 京东小程序全局变量
declare const jd: IJd;

// 钉钉小程序全局对象
interface IDd {
  getSystemInfoSync: () => any;
  createSelectorQuery: () => any;
  createCanvasContext: (canvasId: string) => any;
  [key: string]: any;
}

// 钉钉小程序全局变量
declare const dd: IDd;

// 自定义类型定义进行补充 