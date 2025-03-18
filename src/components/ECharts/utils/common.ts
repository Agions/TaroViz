import Taro from '@tarojs/taro'

/**
 * 获取设备像素比
 */
export const getPixelRatio = (): number => {
  try {
    return Taro.getSystemInfoSync().pixelRatio || 1
  } catch (e) {
    console.error('获取设备像素比失败', e)
    return 1
  }
}

/**
 * 判断当前环境
 */
export const getCurrentEnv = (): string => {
  return process.env.TARO_ENV || 'h5'
}

/**
 * 生成唯一ID
 */
export const generateId = (prefix: string = 'taroviz'): string => {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

/**
 * 防抖函数
 */
export const debounce = (fn: Function, delay: number): Function => {
  let timer: NodeJS.Timeout | null = null
  return function(...args: any[]) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

/**
 * 节流函数
 */
export const throttle = (fn: Function, delay: number): Function => {
  let lastTime = 0
  return function(...args: any[]) {
    const now = Date.now()
    if (now - lastTime > delay) {
      fn.apply(this, args)
      lastTime = now
    }
  }
}

/**
 * 深拷贝对象
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as any
  }

  if (obj instanceof Object) {
    const copy: Record<string, any> = {}
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone((obj as Record<string, any>)[key])
    })
    return copy as T
  }

  return obj
}

/**
 * 获取Canvas上下文
 */
export const getCanvasContext = (canvasId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const query = Taro.createSelectorQuery()
      query
        .select(`#${canvasId}`)
        .fields({ node: true, size: true })
        .exec((res) => {
          if (!res || !res[0] || !res[0].node) {
            reject(new Error('获取Canvas节点失败'))
            return
          }

          const canvas = res[0].node
          const ctx = canvas.getContext('2d')
          resolve({ canvas, ctx, width: res[0].width, height: res[0].height })
        })
    } catch (e) {
      reject(e)
    }
  })
}
