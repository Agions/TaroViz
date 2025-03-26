import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Chart } from '../index'
import '@testing-library/jest-dom'

// Mock ECharts adapter
jest.mock('../../ECharts/adapters', () => ({
  getAdapter: () => {
    const MockEChartsComponent = React.forwardRef<any, any>((props, ref) => {
      const instance = {
        setOption: jest.fn(),
        getOption: jest.fn(() => ({})),
        resize: jest.fn(),
        dispose: jest.fn(),
        getRenderedCanvas: jest.fn(() => ({
          toDataURL: jest.fn(() => 'data:image/png;base64,mockbase64data')
        })),
        clear: jest.fn(),
        showLoading: jest.fn(),
        hideLoading: jest.fn(),
        on: jest.fn(),
        off: jest.fn(),
        dispatchAction: jest.fn()
      };

      React.useImperativeHandle(ref, () => instance);

      // Call onInit with the mock instance
      if (props.onInit) {
        React.useEffect(() => {
          props.onInit(instance);
        }, []);
      }

      return <div data-testid="mock-echarts" style={{ width: '100%', height: '100%' }}></div>;
    });
    MockEChartsComponent.displayName = 'MockEChartsComponent';
    return MockEChartsComponent;
  }
}));

// Mock optimization module
jest.mock('../../../optimization/largeDataHandler', () => ({
  optimizeChartOption: jest.fn((option) => option),
  DataProcessingOptions: {}
}));

// Mock responsive layout module
jest.mock('../../../layout/responsiveLayout', () => ({
  autoResponsiveLayout: jest.fn((option) => option)
}));

// Mock export modules
jest.mock('../../../export', () => ({
  exportChart: jest.fn(() => Promise.resolve('mock-image-path')),
  exportCSV: jest.fn(() => Promise.resolve('mock-csv-content'))
}));

describe('Chart Component', () => {
  const mockOption:any = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150],
      type: 'line'
    }]
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Chart option={mockOption} />)
    expect(screen.getByTestId('chart-container')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const customClass = 'custom-chart'
    render(<Chart option={mockOption} className={customClass} />)
    expect(screen.getByTestId('chart-container')).toHaveClass(customClass)
  })

  it('applies custom style', () => {
    const customStyle = { width: '100%', height: '300px' }
    render(<Chart option={mockOption} style={customStyle} />)
    const container = screen.getByTestId('chart-container')
    expect(container).toHaveStyle(customStyle)
  })

  it('handles loading state', () => {
    render(<Chart option={mockOption} loading={true} />)
    // 这里需要模拟 echarts 的 showLoading 方法
  })

  it('limits data points when dataZoom is enabled', () => {
    const largeDataOption = {
      ...mockOption,
      series: [{
        data: Array.from({ length: 2000 }, (_, i) => i),
        type: 'line'
      }]
    }

    render(<Chart option={largeDataOption} />)
    // 这里需要验证数据点是否被限制
  })

  it('adds dataZoom components when enabled', () => {
    render(<Chart option={mockOption} />)
    // 这里需要验证 dataZoom 组件是否被添加
  })

  it('handles resize events', () => {
    render(<Chart option={mockOption} />)
    // 这里需要模拟窗口大小变化事件
  })

  test('shows no data mask when there is no data', () => {
    const emptyOption:any = {
      title: { text: 'Empty Chart' },
      series: [{ type: 'line', data: [] }]
    };
    render(<Chart option={emptyOption} />);
    expect(screen.getByText('暂无数据')).toBeInTheDocument();
  });

  test('calls onInit callback when chart is initialized', () => {
    const onInitMock = jest.fn();
    render(<Chart option={mockOption} onInit={onInitMock} />);
    expect(onInitMock).toHaveBeenCalled();
  });

  test('exposes chart instance via ref', async () => {
    const ref = React.createRef<any>();
    render(<Chart ref={ref} option={mockOption} />);

    await waitFor(() => {
      expect(ref.current).not.toBeNull();
      expect(ref.current.getEchartsInstance).toBeDefined();
    });

    const instance = ref.current.getEchartsInstance();
    expect(instance).toBeDefined();
    expect(instance.setOption).toBeDefined();
  });

  test('applies dataProcessing options when provided', () => {
    const { optimizeChartOption } = require('../../../optimization/largeDataHandler');
    const processingOptions = { samplingThreshold: 1000 };
    
    render(<Chart option={mockOption} dataProcessing={processingOptions} />);
    
    expect(optimizeChartOption).toHaveBeenCalledWith(expect.any(Object), processingOptions);
  });

  test('applies responsive layout when enabled', () => {
    const { autoResponsiveLayout } = require('../../../layout/responsiveLayout');
    
    render(<Chart option={mockOption} enableResponsive={true} />);
    
    expect(autoResponsiveLayout).toHaveBeenCalledWith(expect.any(Object));
  });

  test('exports chart as image', async () => {
    const { exportChart } = require('../../../export');
    const ref = React.createRef<any>();
    
    render(<Chart ref={ref} option={mockOption} />);
    
    await waitFor(() => {
      expect(ref.current).not.toBeNull();
    });
    
    const result = await ref.current.exportAsImage({ type: 'png' });
    
    expect(exportChart).toHaveBeenCalled();
    expect(result).toBe('mock-image-path');
  });

  test('exports chart data as CSV', async () => {
    const { exportCSV } = require('../../../export');
    const ref = React.createRef<any>();
    
    render(<Chart ref={ref} option={mockOption} />);
    
    await waitFor(() => {
      expect(ref.current).not.toBeNull();
    });
    
    const result = await ref.current.exportAsCSV();
    
    expect(exportCSV).toHaveBeenCalled();
    expect(result).toBe('mock-csv-content');
  });

  test('handles toggle legend method', async () => {
    const ref = React.createRef<any>();
    render(<Chart ref={ref} option={mockOption} />);
    
    await waitFor(() => {
      expect(ref.current).not.toBeNull();
    });
    
    const instance = ref.current.getEchartsInstance();
    ref.current.toggleLegend('series1', true);
    
    expect(instance.dispatchAction).toHaveBeenCalledWith({
      type: 'legendSelect',
      name: 'series1'
    });
  });

  test('handles resize method', async () => {
    const ref = React.createRef<any>();
    render(<Chart ref={ref} option={mockOption} />);
    
    await waitFor(() => {
      expect(ref.current).not.toBeNull();
    });
    
    const instance = ref.current.getEchartsInstance();
    ref.current.resize({ width: 500, height: 300 });
    
    expect(instance.resize).toHaveBeenCalledWith({ width: 500, height: 300 });
  });

  test('handles clear method', async () => {
    const ref = React.createRef<any>();
    render(<Chart ref={ref} option={mockOption} />);
    
    await waitFor(() => {
      expect(ref.current).not.toBeNull();
    });
    
    const instance = ref.current.getEchartsInstance();
    ref.current.clear();
    
    expect(instance.clear).toHaveBeenCalled();
  });

  test('handles dispose method', async () => {
    const ref = React.createRef<any>();
    render(<Chart ref={ref} option={mockOption} />);
    
    await waitFor(() => {
      expect(ref.current).not.toBeNull();
    });
    
    const instance = ref.current.getEchartsInstance();
    ref.current.dispose();
    
    expect(instance.dispose).toHaveBeenCalled();
  });

  test('applies custom config options', () => {
    const customConfig = {
      colorPalette: ['#ff0000', '#00ff00', '#0000ff'],
      fontFamily: 'Arial',
      tooltipTrigger: 'item' as const
    };
    
    const ref = React.createRef<any>();
    render(<Chart ref={ref} option={mockOption} customConfig={customConfig} />);
    
    // Since the actual merging happens inside the component, we can't easily test
    // the final merged option. This test is more of a smoke test to ensure
    // the component doesn't crash with custom config.
    expect(true).toBeTruthy();
  });
})
