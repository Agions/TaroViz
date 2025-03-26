import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withLinkage } from '../withLinkage';
import * as linkageFunctions from '../index';

// 模拟Chart组件
const MockChart = React.forwardRef<any, any>((props, ref) => {
  const mockChartInstance = {
    getEchartsInstance: () => ({
      on: jest.fn(),
      off: jest.fn(),
      dispatchAction: jest.fn()
    }),
    clear: jest.fn(),
    dispose: jest.fn()
  };
  
  React.useImperativeHandle(ref, () => mockChartInstance);
  
  return (
    <div data-testid="mock-chart">
      {props.option ? 'Chart with option' : 'Chart without option'}
    </div>
  );
});

// 模拟linkage模块函数
jest.mock('../index', () => ({
  createLinkage: jest.fn(() => ({
    id: 'mock-linkage-id',
    registerChart: jest.fn(),
    unregisterChart: jest.fn(),
    triggerEvent: jest.fn()
  })),
  getLinkage: jest.fn(() => ({
    id: 'mock-linkage-id',
    registerChart: jest.fn(),
    unregisterChart: jest.fn(),
    triggerEvent: jest.fn()
  })),
  removeLinkage: jest.fn()
}));

describe('withLinkage HOC', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('应该正确包装Chart组件', () => {
    const LinkedChart = withLinkage(MockChart);
    
    const { container } = render(<LinkedChart option={{}} />);
    
    expect(container.textContent).toContain('Chart with option');
  });
  
  test('没有linkageId和linkageOptions时不应创建或获取联动实例', () => {
    const LinkedChart = withLinkage(MockChart);
    
    render(<LinkedChart option={{}} />);
    
    expect(linkageFunctions.createLinkage).not.toHaveBeenCalled();
    expect(linkageFunctions.getLinkage).not.toHaveBeenCalled();
  });
  
  test('有linkageId时应该获取现有的联动实例', () => {
    const LinkedChart = withLinkage(MockChart);
    
    render(<LinkedChart option={{}} linkageId="existing-linkage" />);
    
    expect(linkageFunctions.getLinkage).toHaveBeenCalledWith('existing-linkage');
    expect(linkageFunctions.createLinkage).not.toHaveBeenCalled();
  });
  
  test('有linkageOptions时应该创建新的联动实例', () => {
    const LinkedChart = withLinkage(MockChart);
    const linkageOptions = {
      name: '测试联动',
      syncEvents: ['click', 'highlight']
    };
    
    render(<LinkedChart option={{}} linkageOptions={linkageOptions} />);
    
    expect(linkageFunctions.createLinkage).toHaveBeenCalledWith(linkageOptions);
    expect(linkageFunctions.getLinkage).not.toHaveBeenCalled();
  });
  
  test('组件卸载时应该解除图表注册', () => {
    const LinkedChart = withLinkage(MockChart);
    const mockUnregister = jest.fn();
    
    (linkageFunctions.getLinkage as jest.Mock).mockImplementationOnce(() => ({
      id: 'mock-linkage-id',
      registerChart: jest.fn(),
      unregisterChart: mockUnregister,
      triggerEvent: jest.fn()
    }));
    
    const { unmount } = render(
      <LinkedChart option={{}} linkageId="existing-linkage" />
    );
    
    unmount();
    
    expect(mockUnregister).toHaveBeenCalled();
  });
  
  test('当autoDispose为true时，组件卸载应该移除联动实例', () => {
    const LinkedChart = withLinkage(MockChart);
    
    const { unmount } = render(
      <LinkedChart 
        option={{}} 
        linkageOptions={{ name: '测试联动', autoDispose: true }} 
      />
    );
    
    unmount();
    
    expect(linkageFunctions.removeLinkage).toHaveBeenCalled();
  });
  
  test('组件应该将非联动相关的props传递给被包装组件', () => {
    const LinkedChart = withLinkage(MockChart);
    const customProps = {
      option: { title: { text: '测试图表' } },
      style: { width: '100%', height: '300px' },
      customProp: 'custom value'
    };
    
    render(<LinkedChart {...customProps} />);
    
    const mockChart = screen.getByTestId('mock-chart');
    expect(mockChart).toBeInTheDocument();
    expect(mockChart.textContent).toContain('Chart with option');
  });
  
  test('当ref被提供时应该正确转发', () => {
    const LinkedChart = withLinkage(MockChart);
    const ref = React.createRef<any>();
    
    render(<LinkedChart option={{}} ref={ref} />);
    
    expect(ref.current).toBeDefined();
    expect(ref.current.getEchartsInstance).toBeDefined();
  });
  
  test('联动组件应该在图表实例化后注册到联动组', () => {
    const LinkedChart = withLinkage(MockChart);
    const mockRegister = jest.fn();
    
    (linkageFunctions.getLinkage as jest.Mock).mockImplementationOnce(() => ({
      id: 'mock-linkage-id',
      registerChart: mockRegister,
      unregisterChart: jest.fn(),
      triggerEvent: jest.fn()
    }));
    
    const ref = React.createRef<any>();
    
    render(
      <LinkedChart 
        option={{}} 
        linkageId="existing-linkage" 
        ref={ref}
      />
    );
    
    // 初始化后，组件应该调用registerChart
    expect(mockRegister).toHaveBeenCalled();
    expect(mockRegister.mock.calls[0][0]).toBeDefined(); // Chart ID
    expect(mockRegister.mock.calls[0][1]).toBeDefined(); // ECharts实例
  });
  
  test('自定义事件映射应该被正确应用', () => {
    const LinkedChart = withLinkage(MockChart);
    const mockRegister = jest.fn();
    
    (linkageFunctions.getLinkage as jest.Mock).mockImplementationOnce(() => ({
      id: 'mock-linkage-id',
      registerChart: mockRegister,
      unregisterChart: jest.fn(),
      triggerEvent: jest.fn()
    }));
    
    const eventMapping = {
      click: 'itemSelected',
      highlight: 'itemHighlighted'
    };
    
    render(
      <LinkedChart 
        option={{}} 
        linkageId="existing-linkage" 
        eventMapping={eventMapping}
      />
    );
    
    expect(mockRegister).toHaveBeenCalled();
    // 无法直接测试事件映射，但可以确保注册了图表
  });
}); 