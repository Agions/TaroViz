import type { EChartsOption } from 'echarts';
import Taro from '@tarojs/taro';

/**
 * 响应式断点定义
 */
export interface BreakPoint {
  // 最小宽度
  minWidth?: number;
  // 最大宽度
  maxWidth?: number;
  // 最小高度
  minHeight?: number;
  // 最大高度
  maxHeight?: number;
  // 屏幕方向: 'portrait', 'landscape'
  orientation?: 'portrait' | 'landscape';
  // 设备类型: 'mobile', 'tablet', 'desktop'
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  // 平台类型: 'h5', 'weapp', 'alipay', 'harmony'
  platform?: 'h5' | 'weapp' | 'alipay' | 'harmony';
}

/**
 * 响应式配置规则
 */
export interface ResponsiveRule {
  // 匹配断点
  query: BreakPoint;
  // 图表配置
  option: Partial<EChartsOption>;
}

/**
 * 全局响应式规则
 */
let globalResponsiveRules: ResponsiveRule[] = [];

/**
 * 配置全局响应式规则
 * @param rules 响应式规则数组
 */
export function configResponsive(rules: ResponsiveRule[]): void {
  globalResponsiveRules = rules;
}

/**
 * 添加响应式规则
 * @param rule 新规则
 */
export function addResponsiveRule(rule: ResponsiveRule): void {
  globalResponsiveRules.push(rule);
}

/**
 * 清除响应式规则
 */
export function clearResponsiveRules(): void {
  globalResponsiveRules = [];
}

/**
 * 获取设备信息
 */
function getDeviceInfo(): {
  width: number;
  height: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  orientation: 'portrait' | 'landscape';
  platform: 'h5' | 'weapp' | 'alipay' | 'harmony';
} {
  // 获取系统信息
  const systemInfo = Taro.getSystemInfoSync();
  
  // 获取窗口宽高
  const { windowWidth = 375, windowHeight = 667 } = systemInfo;
  
  // 识别设备类型
  let deviceType: 'mobile' | 'tablet' | 'desktop' = 'mobile';
  if (windowWidth >= 1024) {
    deviceType = 'desktop';
  } else if (windowWidth >= 768) {
    deviceType = 'tablet';
  }
  
  // 识别屏幕方向
  const orientation = windowWidth > windowHeight ? 'landscape' : 'portrait';
  
  // 识别平台
  const env = Taro.getEnv();
  let platform: 'h5' | 'weapp' | 'alipay' | 'harmony' = 'h5';
  
  if (env === Taro.ENV_TYPE.WEAPP) {
    platform = 'weapp';
  } else if (env === Taro.ENV_TYPE.ALIPAY) {
    platform = 'alipay';
  } else if (env === Taro.ENV_TYPE.HARMONY) {
    platform = 'harmony';
  }
  
  return {
    width: windowWidth,
    height: windowHeight,
    deviceType,
    orientation,
    platform
  };
}

/**
 * 判断当前设备是否匹配断点
 * @param breakpoint 断点定义
 * @returns 是否匹配
 */
function matchesBreakpoint(breakpoint: BreakPoint): boolean {
  const {
    width,
    height,
    deviceType,
    orientation,
    platform
  } = getDeviceInfo();
  
  // 检查宽度范围
  if (breakpoint.minWidth !== undefined && width < breakpoint.minWidth) {
    return false;
  }
  
  if (breakpoint.maxWidth !== undefined && width > breakpoint.maxWidth) {
    return false;
  }
  
  // 检查高度范围
  if (breakpoint.minHeight !== undefined && height < breakpoint.minHeight) {
    return false;
  }
  
  if (breakpoint.maxHeight !== undefined && height > breakpoint.maxHeight) {
    return false;
  }
  
  // 检查方向
  if (breakpoint.orientation !== undefined && orientation !== breakpoint.orientation) {
    return false;
  }
  
  // 检查设备类型
  if (breakpoint.deviceType !== undefined && deviceType !== breakpoint.deviceType) {
    return false;
  }
  
  // 检查平台
  if (breakpoint.platform !== undefined && platform !== breakpoint.platform) {
    return false;
  }
  
  // 所有条件都匹配
  return true;
}

/**
 * 深度合并对象
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的对象
 */
function deepMerge(target: any, source: any): any {
  const result = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          result[key] = source[key];
        } else {
          result[key] = deepMerge(target[key], source[key]);
        }
      } else if (Array.isArray(source[key])) {
        result[key] = source[key];
      } else {
        result[key] = source[key];
      }
    });
  }
  
  return result;
}

/**
 * 判断是否为对象
 */
function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * 应用响应式规则到图表选项
 * @param baseOption 基础图表选项
 * @param rules 响应式规则，默认使用全局规则
 * @returns 应用规则后的图表选项
 */
export function applyResponsiveRules(
  baseOption: EChartsOption,
  rules: ResponsiveRule[] = globalResponsiveRules
): EChartsOption {
  // 创建选项副本
  let result = JSON.parse(JSON.stringify(baseOption));
  
  // 应用匹配的规则
  rules.forEach(rule => {
    if (matchesBreakpoint(rule.query)) {
      result = deepMerge(result, rule.option);
    }
  });
  
  return result;
}

/**
 * 自动应用响应式布局
 * @param option 图表选项
 * @returns 应用了自动布局的图表选项
 */
export function autoResponsiveLayout(option: EChartsOption): EChartsOption {
  const { width, height, deviceType, orientation } = getDeviceInfo();
  const result = JSON.parse(JSON.stringify(option));
  
  // 根据屏幕尺寸优化布局
  if (deviceType === 'mobile' || width < 500) {
    // 移动设备优化
    
    // 优化网格
    if (result.grid) {
      const grid = Array.isArray(result.grid) ? result.grid[0] : result.grid;
      grid.left = '5%';
      grid.right = '5%';
      grid.bottom = 70;
      grid.containLabel = true;
    }
    
    // 优化图例
    if (result.legend) {
      const legend = Array.isArray(result.legend) ? result.legend[0] : result.legend;
      legend.orient = 'horizontal';
      legend.top = 'bottom';
      legend.padding = [5, 10];
      legend.itemGap = 10;
      
      // 如果图例项多，使用分页模式
      if (legend.data && legend.data.length > 5) {
        legend.type = 'scroll';
        legend.pageButtonPosition = 'end';
      }
    }
    
    // 优化标题
    if (result.title) {
      const title = Array.isArray(result.title) ? result.title[0] : result.title;
      title.top = 5;
      title.left = 'center';
      title.textStyle = {
        ...title.textStyle,
        fontSize: 14
      };
    }
    
    // 优化X轴标签
    if (result.xAxis) {
      const xAxes = Array.isArray(result.xAxis) ? result.xAxis : [result.xAxis];
      xAxes.forEach(axis => {
        if (axis && axis.axisLabel) {
          axis.axisLabel.rotate = 45;
          axis.axisLabel.hideOverlap = true;
        }
      });
    }
    
    // 饼图特殊处理
    if (result.series) {
      const series = Array.isArray(result.series) ? result.series : [result.series];
      series.forEach(item => {
        if (item.type === 'pie' || item.type === 'donut') {
          item.radius = ['30%', '70%'];
          item.center = ['50%', '50%'];
          
          // 优化标签位置
          if (item.label) {
            item.label.position = 'outside';
            item.label.formatter = '{b}\n{d}%';
          }
        }
      });
    }
    
    // 如果是竖屏，调整图表高度
    if (orientation === 'portrait') {
      if (result.grid) {
        const grid = Array.isArray(result.grid) ? result.grid[0] : result.grid;
        grid.top = 40;
      }
    }
  } else if (deviceType === 'tablet' || (width >= 500 && width < 1024)) {
    // 平板设备优化
    
    // 优化网格
    if (result.grid) {
      const grid = Array.isArray(result.grid) ? result.grid[0] : result.grid;
      grid.left = '8%';
      grid.right = '8%';
      grid.bottom = 60;
      grid.containLabel = true;
    }
    
    // 优化图例
    if (result.legend) {
      const legend = Array.isArray(result.legend) ? result.legend[0] : result.legend;
      
      // 横屏时图例放右侧，竖屏时放底部
      if (orientation === 'landscape') {
        legend.orient = 'vertical';
        legend.right = 10;
        legend.top = 'center';
      } else {
        legend.orient = 'horizontal';
        legend.bottom = 10;
        legend.left = 'center';
      }
    }
  } else {
    // 桌面设备优化
    
    // 优化网格
    if (result.grid) {
      const grid = Array.isArray(result.grid) ? result.grid[0] : result.grid;
      grid.left = '10%';
      grid.right = '10%';
      grid.bottom = 60;
      grid.top = 60;
      grid.containLabel = true;
    }
    
    // 优化图例
    if (result.legend) {
      const legend = Array.isArray(result.legend) ? result.legend[0] : result.legend;
      legend.orient = 'horizontal';
      legend.top = 'top';
      legend.left = 'center';
      legend.padding = [5, 10];
    }
  }
  
  return result;
} 