import { EventEmitter } from './eventEmitter';
import type { LinkageOptions, LinkageInstance, LinkageEvent, LinkageGroupMap } from './types';

// 存储所有联动组
const linkageGroups: LinkageGroupMap = new Map();

/**
 * 创建图表联动组
 * @param groupId 联动组ID
 * @param options 联动选项
 * @returns 联动实例
 */
export function createLinkage(groupId: string, options: LinkageOptions = {}): LinkageInstance {
  if (linkageGroups.has(groupId)) {
    return linkageGroups.get(groupId) as LinkageInstance;
  }

  const emitter = new EventEmitter();
  const chartRefs = new Set<string>();

  const linkage: LinkageInstance = {
    groupId,
    options: {
      // 默认联动设置
      syncTooltip: options.syncTooltip ?? true,
      syncHighlight: options.syncHighlight ?? true,
      syncLegendSelect: options.syncLegendSelect ?? true,
      syncDataZoom: options.syncDataZoom ?? true,
      syncSelect: options.syncSelect ?? true,
      ...options
    },
    registerChart(chartId: string, chartInstance: any) {
      chartRefs.add(chartId);
      return () => {
        chartRefs.delete(chartId);
        // 当组内没有图表时销毁联动组
        if (chartRefs.size === 0) {
          linkageGroups.delete(groupId);
        }
      };
    },
    trigger(event: LinkageEvent, params: any, sourceChartId?: string) {
      // 触发联动事件
      emitter.emit(event, {
        event,
        params,
        sourceChartId
      });
    },
    on(event: LinkageEvent, callback: (data: any) => void) {
      return emitter.on(event, callback);
    },
    off(event: LinkageEvent, callback?: (data: any) => void) {
      emitter.off(event, callback);
    },
    dispose() {
      emitter.clear();
      chartRefs.clear();
      linkageGroups.delete(groupId);
    }
  };

  // 保存联动组实例
  linkageGroups.set(groupId, linkage);
  
  return linkage;
}

/**
 * 获取联动组实例
 * @param groupId 联动组ID
 */
export function getLinkage(groupId: string): LinkageInstance | undefined {
  return linkageGroups.get(groupId);
}

/**
 * 移除联动组
 * @param groupId 联动组ID
 */
export function removeLinkage(groupId: string): void {
  const linkage = linkageGroups.get(groupId);
  if (linkage) {
    linkage.dispose();
  }
}

/**
 * 获取所有联动组
 */
export function getAllLinkages(): LinkageInstance[] {
  return Array.from(linkageGroups.values());
} 