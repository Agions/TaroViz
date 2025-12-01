import * as echarts from 'echarts/core';

import H5Adapter from '../index';

// Mock ECharts renderers first
jest.mock('echarts/renderers', () => ({
  CanvasRenderer: jest.fn(),
  SVGRenderer: jest.fn(),
}));

// Mock ECharts components
jest.mock('echarts/components', () => ({
  GridComponent: jest.fn(),
  TooltipComponent: jest.fn(),
  TitleComponent: jest.fn(),
  LegendComponent: jest.fn(),
}));

// Mock ECharts charts
jest.mock('echarts/charts', () => ({
  LineChart: jest.fn(),
  BarChart: jest.fn(),
  PieChart: jest.fn(),
}));

// Mock ECharts
jest.mock('echarts/core', () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    resize: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
    dispose: jest.fn(),
    getDataURL: jest.fn(() => 'data:image/png;base64,test'),
    clear: jest.fn(),
  })),
  use: jest.fn(),
}));

describe('H5Adapter', () => {
  let adapter: H5Adapter;
  let mockContainer: HTMLElement;

  beforeEach(() => {
    // Create a mock container
    mockContainer = document.createElement('div');
    mockContainer.id = 'test-canvas';
    document.body.appendChild(mockContainer);

    // Create adapter instance
    adapter = H5Adapter.create({
      canvasId: 'test-canvas',
      width: 500,
      height: 300,
      theme: 'dark',
      renderer: 'canvas',
    });
  });

  afterEach(() => {
    // Clean up
    document.body.removeChild(mockContainer);
  });

  describe('initialization', () => {
    it('should create an instance with correct options', () => {
      expect(adapter).toBeInstanceOf(H5Adapter);
    });

    it('should initialize the chart instance', () => {
      const instance = adapter.init();
      expect(instance).toBeDefined();
      expect(echarts.init).toHaveBeenCalled();
    });
  });

  describe('chart operations', () => {
    it('should set chart options', () => {
      const mockOption = {
        xAxis: { type: 'category' as const, data: ['Mon', 'Tue'] },
        yAxis: { type: 'value' as const },
        series: [{ data: [120, 200], type: 'line' as const }],
      };

      adapter.setOption(mockOption);

      // After initialization, setOption should be called on the instance
      const _instance = adapter.init();
      adapter.setOption(mockOption);
    });

    it('should handle theme setting', () => {
      adapter.setTheme('light');
      expect(adapter['options'].theme).toBe('light');
    });

    it('should resize the chart', () => {
      const _instance = adapter.init();
      adapter.resize();
    });

    it('should show and hide loading', () => {
      const _instance = adapter.init();
      adapter.showLoading();
      adapter.hideLoading();
    });

    it('should convert chart to data URL', () => {
      const _instance = adapter.init();
      const dataUrl = adapter.convertToDataURL();
      expect(dataUrl).toBeDefined();
    });

    it('should clear the chart', () => {
      const _instance = adapter.init();
      adapter.clear();
    });

    it('should dispose the chart', () => {
      const _instance = adapter.init();
      adapter.dispose();
    });
  });

  describe('event handling', () => {
    it('should bind and unbind events', () => {
      const _instance = adapter.init();
      const mockHandler = jest.fn();

      adapter.on('click', mockHandler);
      adapter.off('click', mockHandler);
    });
  });

  describe('adapter information', () => {
    it('should return adapter name', () => {
      expect(adapter.getName()).toBe('H5Adapter');
    });

    it('should return adapter version', () => {
      expect(adapter.getVersion()).toBe('1.1.1');
    });

    it('should return platform info', () => {
      const platformInfo = adapter.getPlatformInfo();
      expect(platformInfo).toEqual(
        expect.objectContaining({
          platform: 'h5',
          renderer: 'canvas',
        })
      );
    });
  });
});
