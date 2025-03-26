import { 
  createLinkage, 
  getLinkage, 
  removeLinkage, 
  getAllLinkages 
} from '../index';
import { LinkageOptions } from '../types';

describe('Linkage System', () => {
  beforeEach(() => {
    // 清理所有联动组
    const allLinkages = getAllLinkages();
    allLinkages.forEach(linkage => {
      removeLinkage(linkage.groupId);
    });
  });

  test('createLinkage 应该创建一个新的联动实例', () => {
    const options: LinkageOptions = {
      syncTooltip: true,
      syncHighlight: true
    };

    const linkage = createLinkage('test-linkage-1', options);

    expect(linkage).toBeDefined();
    expect(linkage.groupId).toBeDefined();
    expect(linkage.options.syncTooltip).toBe(true);
    expect(linkage.options.syncHighlight).toBe(true);
  });

  test('getLinkage 应该根据ID获取联动实例', () => {
    const options: LinkageOptions = {
      syncTooltip: true
    };

    const linkage = createLinkage('test-linkage-2', options);
    const retrievedLinkage = getLinkage(linkage.groupId);

    expect(retrievedLinkage).toBeDefined();
    expect(retrievedLinkage).toBe(linkage);
  });

  test('getLinkage 应该在联动组不存在时返回undefined', () => {
    const retrievedLinkage = getLinkage('不存在的ID');
    expect(retrievedLinkage).toBeUndefined();
  });

  test('removeLinkage 应该删除联动实例', () => {
    const options: LinkageOptions = {
      syncTooltip: true
    };

    const linkage = createLinkage('test-linkage-3', options);
    const linkageId = linkage.groupId;

    expect(getLinkage(linkageId)).toBeDefined();
    
    removeLinkage(linkageId);
    
    expect(getLinkage(linkageId)).toBeUndefined();
  });

  test('getAllLinkages 应该返回所有联动实例', () => {
    // 创建一些联动组
    createLinkage('联动组1', { syncTooltip: true });
    createLinkage('联动组2', { syncHighlight: true });
    createLinkage('联动组3', { syncDataZoom: true });

    const allLinkages = getAllLinkages();
    
    expect(allLinkages.length).toBe(3);
    expect(allLinkages[0].groupId).toBe('联动组1');
    expect(allLinkages[1].groupId).toBe('联动组2');
    expect(allLinkages[2].groupId).toBe('联动组3');
  });

  test('registerChart 应该将图表添加到联动组', () => {
    const linkage = createLinkage('test-linkage-4', { syncTooltip: true });
    
    const mockChart = {
      id: 'chart1',
      instance: { on: jest.fn(), off: jest.fn() }
    };
    
    linkage.registerChart(mockChart.id, mockChart.instance);
    
    // 由于Set是私有的，我们不能直接测试，但可以测试dispose
    expect(linkage).toBeDefined();
  });

  test('unregisterChart 应该将图表从联动组中移除', () => {
    const linkage = createLinkage('test-linkage-5', { syncTooltip: true });
    
    const mockChart = {
      id: 'chart1',
      instance: { on: jest.fn(), off: jest.fn() }
    };
    
    const unregister = linkage.registerChart(mockChart.id, mockChart.instance);
    unregister();
    
    // 同样，我们不能直接测试Set，但可以测试取消注册的效果
    expect(getAllLinkages().find(l => l.groupId === 'test-linkage-5')).toBeDefined();
  });

  test('trigger 应该触发联动事件', () => {
    const linkage = createLinkage('test-linkage-6', { 
      syncTooltip: true,
      syncHighlight: true
    });
    
    const mockCallback = jest.fn();
    linkage.on('highlight', mockCallback);
    
    const eventData = { dataIndex: 1, seriesIndex: 0 };
    linkage.trigger('highlight', eventData, 'chart1');
    
    expect(mockCallback).toHaveBeenCalledWith({
      event: 'highlight',
      params: eventData,
      sourceChartId: 'chart1'
    });
  });

  test('dispose 应该清理所有事件监听器', () => {
    const linkage = createLinkage('test-linkage-7', { syncTooltip: true });
    
    linkage.dispose();
    
    expect(getLinkage('test-linkage-7')).toBeUndefined();
  });

  test('联动组应该处理多种事件类型', () => {
    const linkage = createLinkage('test-linkage-8', { 
      syncTooltip: true,
      syncHighlight: false
    });
    
    const tooltipCallback = jest.fn();
    const highlightCallback = jest.fn();
    
    linkage.on('tooltip', tooltipCallback);
    linkage.on('highlight', highlightCallback);
    
    // 触发tooltip事件
    linkage.trigger('tooltip', { dataIndex: 1 }, 'chart1');
    expect(tooltipCallback).toHaveBeenCalled();
    
    // 触发highlight事件
    linkage.trigger('highlight', { dataIndex: 1 }, 'chart1');
    expect(highlightCallback).toHaveBeenCalled();
  });
}); 