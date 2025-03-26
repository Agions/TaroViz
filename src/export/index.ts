import type { EChartsOption } from 'echarts';
import Taro from '@tarojs/taro';

/**
 * 导出选项
 */
export interface ExportOptions {
  // 文件名
  filename?: string;
  // 图片类型: 'png' | 'jpg' | 'svg'
  type?: 'png' | 'jpg' | 'svg';
  // 像素比
  pixelRatio?: number;
  // 背景色
  backgroundColor?: string;
  // 是否显示水印
  watermark?: boolean;
  // 水印文本
  watermarkText?: string;
  // 水印图片URL
  watermarkImage?: string;
  // 水印样式
  watermarkStyle?: {
    font?: string;
    color?: string;
    opacity?: number;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  };
  // 导出尺寸
  width?: number;
  height?: number;
  // 是否显示加载指示器
  showLoading?: boolean;
  // 成功回调
  onSuccess?: (result: any) => void;
  // 失败回调
  onError?: (error: Error) => void;
}

/**
 * 导出图表为图片
 * @param chartInstance 图表实例
 * @param options 导出选项
 * @returns Promise<string> dataURL或文件路径
 */
export function exportChart(chartInstance: any, options: ExportOptions = {}): Promise<string> {
  const {
    filename = `chart-${Date.now()}`,
    type = 'png',
    pixelRatio = 2,
    backgroundColor = '#fff',
    watermark = false,
    watermarkText = 'TaroViz',
    watermarkImage = '',
    watermarkStyle = {},
    width,
    height,
    showLoading = true,
    onSuccess,
    onError
  } = options;

  // 获取环境
  const env = Taro.getEnv();

  return new Promise((resolve, reject) => {
    try {
      // 显示加载指示器
      if (showLoading) {
        Taro.showLoading({ title: '导出中...' });
      }

      if (env === Taro.ENV_TYPE.WEB) {
        // 在Web环境处理导出
        let dataURL: string;

        // 获取canvas元素
        let canvas:any = chartInstance.getRenderedCanvas({
          pixelRatio,
          backgroundColor
        });

        // 处理可能的尺寸调整
        if (width && height) {
          const newCanvas = document.createElement('canvas');
          newCanvas.width = width;
          newCanvas.height = height;
          const ctx = newCanvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(
              canvas,
              0, 0, canvas.width, canvas.height,
              0, 0, width, height
            );
            canvas = newCanvas;
          }
        }

        // 添加水印
        if (watermark) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            addWatermark(
              ctx, 
              canvas.width, 
              canvas.height, 
              watermarkText, 
              watermarkImage, 
              watermarkStyle
            );
          }
        }

        // 获取DataURL
        dataURL = canvas.toDataURL(`image/${type === 'svg' ? 'svg+xml' : type}`, 1.0);

        // 触发下载
        if (typeof document !== 'undefined') {
          const link = document.createElement('a');
          link.download = `${filename}.${type}`;
          link.href = dataURL;
          link.click();
        }

        // 成功回调
        if (onSuccess) {
          onSuccess(dataURL);
        }

        if (showLoading) {
          Taro.hideLoading();
        }

        resolve(dataURL);
      } else {
        // 在小程序环境处理导出
        
        // 获取渲染上下文和canvas节点信息
        const canvasId = chartInstance.getCanvasId();
        if (!canvasId) {
          throw new Error('无法获取canvasId');
        }
        
        // 使用canvasToTempFilePath导出图片
        const canvasNode = Taro.createSelectorQuery()
          .select(`#${canvasId}`)
          .fields({ node: true, size: true })
          .exec();
        
        if (!canvasNode || !canvasNode[0] || !canvasNode[0].node) {
          throw new Error('无法获取Canvas节点');
        }
        
        const canvas = canvasNode[0].node;
        const cWidth = width || canvasNode[0].width;
        const cHeight = height || canvasNode[0].height;
        
        // 如果需要水印，先在canvas上绘制水印
        if (watermark) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            addWatermark(
              ctx,
              cWidth,
              cHeight,
              watermarkText,
              watermarkImage,
              watermarkStyle
            );
          }
        }
        
        // 导出到临时文件
        Taro.canvasToTempFilePath({
          canvasId,
          x: 0,
          y: 0,
          width: cWidth,
          height: cHeight,
          destWidth: cWidth * pixelRatio,
          destHeight: cHeight * pixelRatio,
          fileType: type === 'svg' ? 'png' : type,
          quality: 1,
          success: function(res) {
            if (showLoading) {
              Taro.hideLoading();
            }
            
            // 成功回调
            if (onSuccess) {
              onSuccess(res.tempFilePath);
            }
            
            resolve(res.tempFilePath);
          },
          fail: function(err) {
            if (showLoading) {
              Taro.hideLoading();
            }
            
            const error = new Error(`导出失败: ${err.errMsg}`);
            
            // 失败回调
            if (onError) {
              onError(error);
            }
            
            reject(error);
          }
        }, chartInstance.$scope);
      }
    } catch (err) {
      if (showLoading) {
        Taro.hideLoading();
      }
      
      const error = err instanceof Error ? err : new Error('导出过程中发生错误');
      
      // 失败回调
      if (onError) {
        onError(error);
      }
      
      reject(error);
    }
  });
}

/**
 * 导出图表数据为CSV
 * @param chartInstance 图表实例
 * @param options 导出选项
 */
export function exportCSV(chartInstance: any, options: ExportOptions = {}): Promise<string> {
  const {
    filename = `chart-data-${Date.now()}.csv`,
    showLoading = true,
    onSuccess,
    onError
  } = options;

  return new Promise((resolve, reject) => {
    try {
      if (showLoading) {
        Taro.showLoading({ title: '导出中...' });
      }

      // 获取图表配置
      const option = chartInstance.getOption();
      
      // 解析数据
      const result = parseChartData(option);
      
      // 转换为CSV
      const csv = convertToCSV(result);
      
      // 获取环境
      const env = Taro.getEnv();
      
      if (env === Taro.ENV_TYPE.WEB) {
        // Web环境：创建下载链接
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        
        URL.revokeObjectURL(url);
        
        if (showLoading) {
          Taro.hideLoading();
        }
        
        if (onSuccess) {
          onSuccess(csv);
        }
        
        resolve(csv);
      } else {
        // 小程序环境：保存到本地文件系统
        const fs = Taro.getFileSystemManager();
        const filePath = `${Taro.env.USER_DATA_PATH}/${filename}`;
        
        fs.writeFile({
          filePath,
          data: csv,
          encoding: 'utf8',
          success: function() {
            if (showLoading) {
              Taro.hideLoading();
            }
            
            if (onSuccess) {
              onSuccess(filePath);
            }
            
            resolve(filePath);
            
            // 保存成功后，提示用户
            Taro.showModal({
              title: '导出成功',
              content: `数据已保存到: ${filePath}`,
              showCancel: false
            });
          },
          fail: function(err) {
            if (showLoading) {
              Taro.hideLoading();
            }
            
            const error = new Error(`导出CSV失败: ${err.errMsg}`);
            
            if (onError) {
              onError(error);
            }
            
            reject(error);
          }
        });
      }
    } catch (err) {
      if (showLoading) {
        Taro.hideLoading();
      }
      
      const error = err instanceof Error ? err : new Error('导出CSV过程中发生错误');
      
      if (onError) {
        onError(error);
      }
      
      reject(error);
    }
  });
}

/**
 * 添加水印到canvas
 */
function addWatermark(
  ctx: any,
  width: number,
  height: number,
  text: string,
  image: string,
  style: any
): void {
  // 保存当前上下文状态
  ctx.save();
  
  // 根据位置计算坐标
  let x = 10;
  let y = 10;
  
  switch (style.position) {
    case 'top-right':
      x = width - 100;
      y = 10;
      break;
    case 'bottom-left':
      x = 10;
      y = height - 10;
      break;
    case 'bottom-right':
      x = width - 100;
      y = height - 10;
      break;
    case 'center':
      x = width / 2;
      y = height / 2;
      break;
    default:
      // default is top-left
      break;
  }
  
  // 设置透明度
  ctx.globalAlpha = style.opacity || 0.2;
  
  if (image) {
    // 如果有图片水印
    const watermarkImg = new Image();
    watermarkImg.src = image;
    watermarkImg.onload = () => {
      ctx.drawImage(watermarkImg, x, y, 80, 80);
      ctx.restore();
    };
  } else {
    // 文字水印
    ctx.font = style.font || '14px Arial';
    ctx.fillStyle = style.color || '#999';
    ctx.fillText(text, x, y);
    ctx.restore();
  }
}

/**
 * 解析图表数据
 */
function parseChartData(option: EChartsOption): any {
  const result: any = {};
  
  // 获取数据系列
  if (option.series) {
    const series = Array.isArray(option.series) ? option.series : [option.series];
    
    // 获取类别数据
    let categories: string[] = [];
    
    if (option.xAxis) {
      const xAxis:any = Array.isArray(option.xAxis) ? option.xAxis[0] : option.xAxis;
      if (xAxis && xAxis.data) {
        categories = xAxis.data as string[];
      }
    }
    
    // 处理每个系列
    series.forEach((item, index) => {
      const seriesName = item.name || `系列${index + 1}`;
      
      if (item.type === 'pie') {
        // 饼图数据处理
        result[seriesName] = (item.data || []).map((d: any) => ({
          name: d.name,
          value: d.value
        }));
      } else {
        // 其他图表类型
        const seriesData = Array.isArray(item.data) ? item.data : [];
        
        result[seriesName] = seriesData.map((value: any, idx: number) => {
          const category = categories[idx] || `项目${idx + 1}`;
          
          if (typeof value === 'object' && value !== null) {
            return {
              category,
              ...value
            };
          }
          
          return {
            category,
            value
          };
        });
      }
    });
  }
  
  return result;
}

/**
 * 转换数据为CSV格式
 */
function convertToCSV(data: any): string {
  let csv = '';
  
  // 处理每个系列
  Object.keys(data).forEach(seriesName => {
    // 添加系列名称作为标题
    csv += `"${seriesName}"\n`;
    
    const seriesData = data[seriesName];
    
    if (seriesData.length === 0) {
      csv += '无数据\n\n';
      return;
    }
    
    // 获取列名
    const columns = Object.keys(seriesData[0]);
    
    // 添加列头
    csv += columns.map(col => `"${col}"`).join(',') + '\n';
    
    // 添加数据行
    seriesData.forEach((row: any) => {
      const rowValues = columns.map(col => {
        const value = row[col];
        // 处理包含逗号的字符串
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      });
      
      csv += rowValues.join(',') + '\n';
    });
    
    // 添加空行分隔不同系列
    csv += '\n';
  });
  
  return csv;
} 