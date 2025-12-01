/**
 * TaroViz 调试工具核心实现
 */

import { DebugInfo, DebugPanelEventType } from './types';

/**
 * 调试管理器类
 */
class DebugManager {
  private static instance: DebugManager;
  private debugInfo: DebugInfo = {};
  private isEnabled: boolean = false;
  private eventHandlers: Map<string, Set<(event: any) => void>> = new Map();
  private maxEvents: number = 100;
  private maxErrors: number = 50;

  /**
   * 私有构造函数
   */
  private constructor() {
    // 初始化调试信息
    this.debugInfo = {
      instance: {},
      config: {},
      data: {
        series: [],
        totalDataCount: 0,
        currentDataCount: 0,
      },
      performance: {},
      events: [],
      errors: [],
    };
  }

  /**
   * 获取调试管理器实例
   */
  public static getInstance(): DebugManager {
    if (!DebugManager.instance) {
      DebugManager.instance = new DebugManager();
    }
    return DebugManager.instance;
  }

  /**
   * 初始化调试器
   */
  public init(): void {
    this.isEnabled = true;
  }

  /**
   * 启用调试
   */
  public enable(): void {
    this.isEnabled = true;
  }

  /**
   * 禁用调试
   */
  public disable(): void {
    this.isEnabled = false;
  }

  /**
   * 获取调试状态
   */
  public getStatus(): boolean {
    return this.isEnabled;
  }

  /**
   * 获取调试信息
   */
  public getDebugInfo(): DebugInfo {
    return this.debugInfo;
  }

  /**
   * 更新调试信息
   */
  public updateDebugInfo(info: Partial<DebugInfo>): void {
    if (!this.isEnabled) {
      return;
    }

    this.debugInfo = {
      ...this.debugInfo,
      ...info,
    };

    this.emitEvent(DebugPanelEventType.INFO_UPDATE, { info });
  }

  /**
   * 更新实例信息
   */
  public updateInstanceInfo(instance: DebugInfo['instance']): void {
    this.updateDebugInfo({ instance });
  }

  /**
   * 更新配置信息
   */
  public updateConfig(config: any): void {
    this.updateDebugInfo({ config });
  }

  /**
   * 更新数据信息
   */
  public updateData(data: DebugInfo['data']): void {
    this.updateDebugInfo({ data });
  }

  /**
   * 更新性能信息
   */
  public updatePerformance(performance: DebugInfo['performance']): void {
    this.updateDebugInfo({ performance });
  }

  /**
   * 添加事件记录
   */
  public addEvent(type: string, params: any): void {
    if (!this.isEnabled) {
      return;
    }

    const event = {
      type,
      timestamp: Date.now(),
      params,
    };

    // 限制事件数量
    if (this.debugInfo.events && this.debugInfo.events.length >= this.maxEvents) {
      this.debugInfo.events.shift();
    }

    this.debugInfo.events = [...(this.debugInfo.events || []), event];
    this.emitEvent(DebugPanelEventType.INFO_UPDATE, { info: this.debugInfo });
  }

  /**
   * 添加错误记录
   */
  public addError(type: string, message: string, stack?: string): void {
    if (!this.isEnabled) {
      return;
    }

    const error = {
      type,
      message,
      stack,
      timestamp: Date.now(),
    };

    // 限制错误数量
    if (this.debugInfo.errors && this.debugInfo.errors.length >= this.maxErrors) {
      this.debugInfo.errors.shift();
    }

    this.debugInfo.errors = [...(this.debugInfo.errors || []), error];
    this.emitEvent(DebugPanelEventType.INFO_UPDATE, { info: this.debugInfo });
  }

  /**
   * 清空调试信息
   */
  public clear(): void {
    this.debugInfo = {
      instance: {},
      config: {},
      data: {
        series: [],
        totalDataCount: 0,
        currentDataCount: 0,
      },
      performance: {},
      events: [],
      errors: [],
    };
    this.emitEvent(DebugPanelEventType.INFO_UPDATE, { info: this.debugInfo });
  }

  /**
   * 绑定事件
   */
  public on(eventType: string, handler: (event: any) => void): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, new Set());
    }
    this.eventHandlers.get(eventType)?.add(handler);
  }

  /**
   * 解绑事件
   */
  public off(eventType: string, handler?: (event: any) => void): void {
    if (!handler) {
      this.eventHandlers.delete(eventType);
      return;
    }
    this.eventHandlers.get(eventType)?.delete(handler);
  }

  /**
   * 触发事件
   */
  private emitEvent(eventType: string, data: any): void {
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(data);
        } catch (error) {
          console.error(`Error in debug event handler:`, error);
        }
      });
    }
  }

  /**
   * 设置最大事件数量
   */
  public setMaxEvents(max: number): void {
    this.maxEvents = max;
  }

  /**
   * 设置最大错误数量
   */
  public setMaxErrors(max: number): void {
    this.maxErrors = max;
  }
}

// 创建调试管理器实例
const debugManager = DebugManager.getInstance();

/**
 * 初始化调试器
 */
export function initDebugger(): void {
  debugManager.init();
}

/**
 * 获取调试信息
 */
export function getDebugInfo(): DebugInfo {
  return debugManager.getDebugInfo();
}

/**
 * 更新调试信息
 */
export function updateDebugInfo(info: Partial<DebugInfo>): void {
  debugManager.updateDebugInfo(info);
}

/**
 * 添加调试事件
 */
export function addDebugEvent(type: string, params: any): void {
  debugManager.addEvent(type, params);
}

/**
 * 添加调试错误
 */
export function addDebugError(type: string, message: string, stack?: string): void {
  debugManager.addError(type, message, stack);
}

/**
 * 清空调试信息
 */
export function clearDebugInfo(): void {
  debugManager.clear();
}

/**
 * 启用调试
 */
export function enableDebugging(): void {
  debugManager.enable();
}

/**
 * 禁用调试
 */
export function disableDebugging(): void {
  debugManager.disable();
}

/**
 * 获取调试状态
 */
export function isDebuggingEnabled(): boolean {
  return debugManager.getStatus();
}

/**
 * 绑定调试事件
 */
export function onDebugEvent(eventType: string, handler: (event: any) => void): void {
  debugManager.on(eventType, handler);
}

/**
 * 解绑调试事件
 */
export function offDebugEvent(eventType: string, handler?: (event: any) => void): void {
  debugManager.off(eventType, handler);
}
