/**
 * 简单的事件发射器实现
 */
export class EventEmitter {
  private events: Map<string, Set<(data: any) => void>>;

  constructor() {
    this.events = new Map();
  }

  /**
   * 注册事件监听器
   * @param event 事件名称
   * @param callback 回调函数
   * @returns 取消监听函数
   */
  on(event: string, callback: (data: any) => void): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    const callbacks = this.events.get(event) as Set<(data: any) => void>;
    callbacks.add(callback);

    // 返回取消监听函数
    return () => {
      this.off(event, callback);
    };
  }

  /**
   * 取消事件监听
   * @param event 事件名称
   * @param callback 回调函数(可选)，如果不提供则移除所有该事件的监听器
   */
  off(event: string, callback?: (data: any) => void): void {
    if (!this.events.has(event)) {
      return;
    }

    const callbacks = this.events.get(event) as Set<(data: any) => void>;
    
    if (callback) {
      callbacks.delete(callback);
    } else {
      this.events.delete(event);
    }
  }

  /**
   * 触发事件
   * @param event 事件名称
   * @param data 事件数据
   */
  emit(event: string, data: any): void {
    if (!this.events.has(event)) {
      return;
    }

    const callbacks = this.events.get(event) as Set<(data: any) => void>;
    callbacks.forEach(callback => {
      try {
        callback(data);
      } catch (err) {
        console.error(`Error in event listener for "${event}":`, err);
      }
    });
  }

  /**
   * 只监听一次事件
   * @param event 事件名称
   * @param callback 回调函数
   * @returns 取消监听函数
   */
  once(event: string, callback: (data: any) => void): () => void {
    const wrappedCallback = (data: any) => {
      this.off(event, wrappedCallback);
      callback(data);
    };

    return this.on(event, wrappedCallback);
  }

  /**
   * 清空所有事件监听器
   */
  clear(): void {
    this.events.clear();
  }
  
  /**
   * 移除所有监听器
   * @param event 事件名称(可选)，如果不提供则移除所有事件的监听器
   */
  removeAllListeners(event?: string): void {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
} 