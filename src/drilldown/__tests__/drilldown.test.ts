// @ts-nocheck - 由于是测试文件，对类型检查要求较宽松
import { createDrillDown, DrillDownManager } from '../index';
import { DrillDownLevel, DrillAction } from '../index';
import type { EChartsOption } from 'echarts';

describe('DrillDown System', () => {
  let drilldownManager: DrillDownManager;
  
  const mockInitialOption = {
    title: { text: '总体销售数据' },
    series: [{
      type: 'pie',
      data: [
        { name: '华北', value: 1000 },
        { name: '华东', value: 1200 },
        { name: '华南', value: 800 },
        { name: '西部', value: 600 }
      ]
    }]
  };
  
  const mockLevels: DrillDownLevel[] = [
    {
      name: '区域',
      option: mockInitialOption
    },
    {
      name: '省份',
      getOption: (params) => {
        const region = params.name;
        
        // 模拟数据查询
        const provinceData: Record<string, any[]> = {
          '华北': [
            { name: '北京', value: 400 },
            { name: '天津', value: 300 },
            { name: '河北', value: 300 }
          ],
          '华东': [
            { name: '上海', value: 500 },
            { name: '江苏', value: 400 },
            { name: '浙江', value: 300 }
          ],
          '华南': [
            { name: '广东', value: 500 },
            { name: '广西', value: 300 }
          ],
          '西部': [
            { name: '四川', value: 400 },
            { name: '陕西', value: 200 }
          ]
        };
        
        return {
          title: { text: `${region}销售数据` },
          series: [{
            type: 'pie',
            data: provinceData[region] || []
          }]
        };
      }
    },
    {
      name: '城市',
      getOption: (params) => {
        const province = params.name;
        
        // 模拟数据查询
        const cityData: Record<string, any[]> = {
          '北京': [
            { name: '朝阳区', value: 200 },
            { name: '海淀区', value: 200 }
          ],
          '上海': [
            { name: '浦东新区', value: 300 },
            { name: '静安区', value: 200 }
          ],
          '广东': [
            { name: '广州', value: 300 },
            { name: '深圳', value: 200 }
          ]
        };
        
        return {
          title: { text: `${province}销售数据` },
          series: [{
            type: 'pie',
            data: cityData[province] || []
          }]
        };
      }
    }
  ];
  
  beforeEach(() => {
    drilldownManager = createDrillDown({
      levels: mockLevels,
      triggerEvent: 'click'
    });
  });
  
  test('createDrillDown 应该创建一个钻取管理器实例', () => {
    expect(drilldownManager).toBeDefined();
    expect(drilldownManager.getCurrentLevel()).toBe(0);
    expect(drilldownManager.getCurrentOption()).toEqual(mockInitialOption);
  });
  
  test('drillDown 应该钻取到下一级', () => {
    const mockChartInstance = {
      setOption: jest.fn(),
      clear: jest.fn()
    };
    
    drilldownManager.bindChart(mockChartInstance as any);
    
    // 初始状态
    expect(drilldownManager.getCurrentLevel()).toBe(0);
    
    // 钻取到华东地区
    drilldownManager.drillDown({
      type: DrillAction.DRILL_DOWN,
      name: '华东',
      seriesIndex: 0,
      dataIndex: 1
    });
    
    // 检查级别是否改变
    expect(drilldownManager.getCurrentLevel()).toBe(1);
    
    // 检查选项是否正确生成
    const newOption = drilldownManager.getCurrentOption();
    expect(newOption.title.text).toBe('华东销售数据');
    expect(newOption.series[0].data).toHaveLength(3);
    expect(newOption.series[0].data[0].name).toBe('上海');
    
    // 确认图表更新
    expect(mockChartInstance.setOption).toHaveBeenCalledWith(newOption, true);
  });
  
  test('drillUp 应该钻取回上一级', () => {
    const mockChartInstance = {
      setOption: jest.fn(),
      clear: jest.fn()
    };
    
    drilldownManager.bindChart(mockChartInstance as any);
    
    // 先钻取到华东地区
    drilldownManager.drillDown({
      type: DrillAction.DRILL_DOWN,
      name: '华东',
      seriesIndex: 0,
      dataIndex: 1
    });
    
    // 再钻取到上海
    drilldownManager.drillDown({
      type: DrillAction.DRILL_DOWN,
      name: '上海',
      seriesIndex: 0,
      dataIndex: 0
    });
    
    expect(drilldownManager.getCurrentLevel()).toBe(2);
    
    // 现在钻取回上一级（省份级别）
    drilldownManager.drillDown({
      type: DrillAction.DRILL_UP
    });
    
    expect(drilldownManager.getCurrentLevel()).toBe(1);
    expect(drilldownManager.getCurrentOption().title.text).toBe('华东销售数据');
    
    // 再次钻取回顶级
    drilldownManager.drillDown({
      type: DrillAction.DRILL_UP
    });
    
    expect(drilldownManager.getCurrentLevel()).toBe(0);
    expect(drilldownManager.getCurrentOption()).toEqual(mockInitialOption);
  });
  
  test('drillTo 应该钻取到指定级别', () => {
    const mockChartInstance = {
      setOption: jest.fn(),
      clear: jest.fn()
    };
    
    drilldownManager.bindChart(mockChartInstance as any);
    
    // 先钻取到华东地区
    drilldownManager.drillDown({
      type: DrillAction.DRILL_DOWN,
      name: '华东',
      seriesIndex: 0,
      dataIndex: 1
    });
    
    // 再钻取到上海
    drilldownManager.drillDown({
      type: DrillAction.DRILL_DOWN,
      name: '上海',
      seriesIndex: 0,
      dataIndex: 0
    });
    
    expect(drilldownManager.getCurrentLevel()).toBe(2);
    
    // 直接回到顶级
    drilldownManager.drillDown({
      type: DrillAction.DRILL_TO,
      level: 0
    });
    
    expect(drilldownManager.getCurrentLevel()).toBe(0);
    expect(drilldownManager.getCurrentOption()).toEqual(mockInitialOption);
  });
  
  test('drillReset 应该重置钻取状态', () => {
    const mockChartInstance = {
      setOption: jest.fn(),
      clear: jest.fn()
    };
    
    drilldownManager.bindChart(mockChartInstance as any);
    
    // 先钻取到华东地区
    drilldownManager.drillDown({
      type: DrillAction.DRILL_DOWN,
      name: '华东',
      seriesIndex: 0,
      dataIndex: 1
    });
    
    // 重置钻取状态
    drilldownManager.reset();
    
    expect(drilldownManager.getCurrentLevel()).toBe(0);
    expect(drilldownManager.getCurrentOption()).toEqual(mockInitialOption);
    expect(mockChartInstance.setOption).toHaveBeenCalledWith(mockInitialOption, true);
  });
  
  test('触发事件处理', () => {
    const mockChartInstance = {
      setOption: jest.fn(),
      clear: jest.fn(),
      on: jest.fn(),
      off: jest.fn()
    };
    
    drilldownManager.bindChart(mockChartInstance as any);
    
    // 确认事件监听被注册
    expect(mockChartInstance.on).toHaveBeenCalledWith('click', expect.any(Function));
    
    // 模拟点击事件的处理
    const eventHandler = mockChartInstance.on.mock.calls[0][1];
    eventHandler({
      name: '华东',
      seriesIndex: 0,
      dataIndex: 1
    });
    
    // 确认钻取发生
    expect(drilldownManager.getCurrentLevel()).toBe(1);
    
    // 解绑图表后，应该移除事件监听
    drilldownManager.unbindChart();
    expect(mockChartInstance.off).toHaveBeenCalled();
  });
  
  test('updateParams 应该更新钻取参数', () => {
    // 初始钻取到华东
    drilldownManager.drillDown({
      type: DrillAction.DRILL_DOWN,
      name: '华东',
      seriesIndex: 0,
      dataIndex: 1
    });
    
    expect(drilldownManager.getDrillContext().path).toEqual(['华东']);
    
    // 更新钻取参数
    drilldownManager.updateParams({ region: '华东', category: '消费品' });
    
    expect(drilldownManager.getDrillContext().params).toEqual({ 
      region: '华东', 
      category: '消费品' 
    });
  });
  
  test('getDrillPath 应该返回正确的钻取路径', () => {
    // 钻取至华东
    drilldownManager.drillDown({
      type: DrillAction.DRILL_DOWN,
      name: '华东',
      seriesIndex: 0,
      dataIndex: 1
    });
    
    // 再钻取至上海
    drilldownManager.drillDown({
      type: DrillAction.DRILL_DOWN,
      name: '上海',
      seriesIndex: 0,
      dataIndex: 0
    });
    
    const path = drilldownManager.getDrillContext().path;
    expect(path).toEqual(['华东', '上海']);
  });
}); 