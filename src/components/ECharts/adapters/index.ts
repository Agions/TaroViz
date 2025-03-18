import H5Adapter from './h5'
import WeappAdapter from './weapp'
import AlipayAdapter from './alipay'
import HarmonyAdapter from './harmony'
import { Adapter } from '../types'
import Taro from '@tarojs/taro'

// 获取适配器
export const getAdapter = (): Adapter => {
  const env = Taro.getEnv()

  switch (env) {
    case Taro.ENV_TYPE.WEB:
      return H5Adapter
    case Taro.ENV_TYPE.WEAPP:
      return WeappAdapter
    case Taro.ENV_TYPE.ALIPAY:
      return AlipayAdapter
    case Taro.ENV_TYPE.HARMONY:
      return HarmonyAdapter
    default:
      // 默认使用 H5 适配器
      return H5Adapter
  }
}

export default getAdapter
