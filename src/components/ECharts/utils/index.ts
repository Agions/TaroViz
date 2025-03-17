/**
 * Taro ECharts 工具函数
 */
import Taro from '@tarojs/taro';
import { DataURLOption } from '../types/common';

/**
 * 保存图表为图片
 * @param dataUrl 图表的DataURL
 * @param fileName 保存的文件名
 * @returns 保存成功返回true，失败返回false
 */
export const saveAsImage = async (dataUrl: string, fileName: string = 'chart-export.png'): Promise<boolean> => {
  if (!dataUrl || typeof dataUrl !== 'string') {
    console.error('Invalid dataURL provided');
    return false;
  }
  
  try {
    // 在H5环境下
    if (process.env.TARO_ENV === 'h5') {
      // 创建下载链接
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } 
    
    // 其他环境可能需要先将DataURL转为临时文件
    const tempFilePath = await dataUrlToTempFilePath(dataUrl);
    if (!tempFilePath) return false;
    
    // 保存图片到相册
    try {
      await Taro.saveImageToPhotosAlbum({
        filePath: tempFilePath
      });
      return true;
    } catch (err) {
      console.error('Failed to save image to photos album:', err);
      
      // 用户可能拒绝了授权，尝试打开设置页面
      if (err.errMsg && err.errMsg.indexOf('auth') > -1) {
        const res = await Taro.showModal({
          title: '提示',
          content: '需要您授权保存图片到相册',
          confirmText: '去授权',
          cancelText: '取消'
        });
        
        if (res.confirm) {
          await Taro.openSetting();
        }
      }
      return false;
    }
  } catch (error) {
    console.error('Failed to save image:', error);
    return false;
  }
};

/**
 * 将DataURL转换为临时文件路径
 * @param dataUrl 图表的DataURL
 * @returns 临时文件路径
 */
export const dataUrlToTempFilePath = async (dataUrl: string): Promise<string | null> => {
  if (process.env.TARO_ENV === 'h5') {
    return dataUrl; // H5环境直接返回
  }
  
  try {
    // 将base64转为临时文件
    let base64Data = dataUrl.split(',')[1];
    if (!base64Data) {
      console.error('Invalid DataURL format');
      return null;
    }
    
    // 小程序环境
    const res = await Taro.base64ToArrayBuffer(base64Data);
    const fsm = Taro.getFileSystemManager();
    const timestamp = new Date().getTime();
    const tempFilePath = `${Taro.env.USER_DATA_PATH}/chart_${timestamp}.png`;
    
    await new Promise<void>((resolve, reject) => {
      fsm.writeFile({
        filePath: tempFilePath,
        data: res,
        encoding: 'binary',
        success: () => resolve(),
        fail: (err) => reject(err)
      });
    });
    
    return tempFilePath;
  } catch (error) {
    console.error('Failed to convert DataURL to temp file:', error);
    return null;
  }
};

/**
 * 格式化DataURL选项
 * @param options 原始选项
 * @returns 处理后的选项
 */
export const formatDataURLOptions = (options?: DataURLOption): DataURLOption => {
  return {
    type: options?.type || 'png',
    pixelRatio: options?.pixelRatio || window.devicePixelRatio,
    backgroundColor: options?.backgroundColor || 'transparent',
    excludeComponents: options?.excludeComponents || []
  };
};

/**
 * 获取设备信息
 * @returns 设备信息
 */
export const getDeviceInfo = async () => {
  try {
    return await Taro.getSystemInfo();
  } catch (error) {
    console.error('Failed to get system info:', error);
    return null;
  }
};

/**
 * 创建图片下载任务
 * @param dataUrl 图表的DataURL
 * @param options 下载选项
 * @returns 下载任务ID
 */
export const createDownloadTask = (dataUrl: string, options?: { fileName?: string }): string => {
  if (process.env.TARO_ENV !== 'h5') {
    console.warn('Download task is only supported in H5 environment');
    return '';
  }
  
  // 创建一个唯一的任务ID
  const taskId = `download_${Date.now()}`;
  
  try {
    // 创建下载链接，但不立即点击
    const link = document.createElement('a');
    link.download = options?.fileName || 'chart-export.png';
    link.href = dataUrl;
    link.id = taskId;
    document.body.appendChild(link);
    
    // 存储任务信息
    window.__TARO_ECHARTS_DOWNLOAD_TASKS = window.__TARO_ECHARTS_DOWNLOAD_TASKS || {};
    window.__TARO_ECHARTS_DOWNLOAD_TASKS[taskId] = {
      link,
      dataUrl,
      fileName: link.download,
      createdAt: new Date()
    };
    
    return taskId;
  } catch (error) {
    console.error('Failed to create download task:', error);
    return '';
  }
};

/**
 * 执行下载任务
 * @param taskId 下载任务ID
 * @returns 是否成功
 */
export const executeDownloadTask = (taskId: string): boolean => {
  if (process.env.TARO_ENV !== 'h5' || !taskId) {
    return false;
  }
  
  try {
    const tasks = window.__TARO_ECHARTS_DOWNLOAD_TASKS || {};
    const task = tasks[taskId];
    if (!task || !task.link) return false;
    
    // 执行下载
    task.link.click();
    
    // 清理DOM
    setTimeout(() => {
      if (task.link.parentNode) {
        document.body.removeChild(task.link);
      }
      delete tasks[taskId];
    }, 100);
    
    return true;
  } catch (error) {
    console.error('Failed to execute download task:', error);
    return false;
  }
};

// 声明全局类型
declare global {
  interface Window {
    __TARO_ECHARTS_DOWNLOAD_TASKS?: Record<string, {
      link: HTMLAnchorElement;
      dataUrl: string;
      fileName: string;
      createdAt: Date;
    }>;
  }
} 