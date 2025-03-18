import Taro from '@tarojs/taro'
import H5Adapter from './h5'
import WeappAdapter from './weapp'
import AlipayAdapter from './alipay'
import HarmonyAdapter from './harmony'
import { Adapter } from '../types'

/**
 * 获取适配器
 * @returns 适配器
 */
export const getAdapter = () => {
  // 根据环境选择适配器
  switch (Taro.getEnv()) {
    case Taro.ENV_TYPE.WEB:
      return new H5Adapter({} as any)
    case Taro.ENV_TYPE.WEAPP:
      return new WeappAdapter({} as any)
    case Taro.ENV_TYPE.ALIPAY:
      return new AlipayAdapter({}  as any)
    // 检查Harmony环境类型是否存在
    case (Taro.ENV_TYPE as any).HARMONY:
      return new HarmonyAdapter({}  as any)
    default:
      // 默认返回H5适配器
      return new H5Adapter({}  as any)
  }
}

export default getAdapter
