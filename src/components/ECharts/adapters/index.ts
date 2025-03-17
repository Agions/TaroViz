import { PlatformType } from '../types/common';
import H5Adapter from './h5';
import WeappAdapter from './weapp';
import AlipayAdapter from './alipay';
import HarmonyAdapter from './harmony';

// 根据当前平台返回对应的适配器
export const getAdapter = () => {
  const env = process.env.TARO_ENV;
  switch (env) {
    case PlatformType.WEAPP:
      return WeappAdapter;
    case PlatformType.ALIPAY:
      return AlipayAdapter;
    case PlatformType.HARMONY:
      return HarmonyAdapter;
    case PlatformType.H5:
    default:
      return H5Adapter;
  }
};

export { H5Adapter, WeappAdapter, AlipayAdapter, HarmonyAdapter };
