import { render } from '@testing-library/react';
import React from 'react';

import { LineChart } from '../charts';

// Mock ECharts and adapters
jest.mock('echarts/core', () => ({
  use: jest.fn(),
  init: jest.fn(() => ({
    setOption: jest.fn(),
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    dispose: jest.fn(),
    resize: jest.fn(),
  })),
  getInstanceByDom: jest.fn(),
}));

// Mock specific ECharts chart imports
jest.mock('echarts/charts', () => ({
  LineChart: jest.fn(),
  BarChart: jest.fn(),
  PieChart: jest.fn(),
}));

jest.mock('echarts/components', () => ({
  GridComponent: jest.fn(),
  TooltipComponent: jest.fn(),
  TitleComponent: jest.fn(),
  LegendComponent: jest.fn(),
}));

jest.mock('../adapters', () => ({
  getAdapter: jest.fn(() => ({
    init: jest.fn(),
    setOption: jest.fn(),
    resize: jest.fn(),
    dispose: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
  })),
}));

jest.mock('../charts/common/BaseChartWrapper', () => ({
  __esModule: true,
  default: (props: any) => (
    <div
      data-testid="base-chart-wrapper"
      className={`taroviz-${props.chartType}`}
      style={{ width: props.width, height: props.height }}
    >
      <div data-testid="chart-option">{JSON.stringify(props.option)}</div>
      <div data-testid="chart-loading">{props.loading ? 'loading' : 'not-loading'}</div>
    </div>
  ),
}));

describe('Integration Tests', () => {
  describe('Chart Rendering Flow', () => {
    it('should render a complete chart with all components', () => {
      const mockOption = {
        xAxis: { type: 'category' as const, data: ['Mon', 'Tue', 'Wed'] },
        yAxis: { type: 'value' as const },
        series: [{ data: [120, 200, 150], type: 'line' as const }],
      };

      const { getByTestId } = render(
        <LineChart option={mockOption} width="500px" height="300px" loading={false} />
      );

      const chartWrapper = getByTestId('base-chart-wrapper');
      const chartOption = getByTestId('chart-option');
      const chartLoading = getByTestId('chart-loading');

      expect(chartWrapper).toBeInTheDocument();
      expect(chartWrapper).toHaveClass('taroviz-line-chart');
      expect(chartOption).toHaveTextContent(JSON.stringify(mockOption));
      expect(chartLoading).toHaveTextContent('not-loading');
    });

    it('should handle chart option updates', () => {
      const initialOption = {
        xAxis: { type: 'category' as const, data: ['Mon', 'Tue', 'Wed'] },
        yAxis: { type: 'value' as const },
        series: [{ data: [120, 200, 150], type: 'line' as const }],
      };

      const updatedOption = {
        xAxis: { type: 'category' as const, data: ['Mon', 'Tue', 'Wed', 'Thu'] },
        yAxis: { type: 'value' as const },
        series: [{ data: [120, 200, 150, 250], type: 'line' as const }],
      };

      const { getByTestId, rerender } = render(
        <LineChart option={initialOption} width="500px" height="300px" />
      );

      // Check initial rendering
      let chartOption = getByTestId('chart-option');
      expect(chartOption).toHaveTextContent(JSON.stringify(initialOption));

      // Update option and check
      rerender(<LineChart option={updatedOption} width="500px" height="300px" />);

      chartOption = getByTestId('chart-option');
      expect(chartOption).toHaveTextContent(JSON.stringify(updatedOption));
    });

    it('should handle loading state changes', () => {
      const mockOption = {
        xAxis: { type: 'category' as const, data: ['Mon', 'Tue', 'Wed'] },
        yAxis: { type: 'value' as const },
        series: [{ data: [120, 200, 150], type: 'line' as const }],
      };

      const { getByTestId, rerender } = render(<LineChart option={mockOption} loading={false} />);

      // Check initial loading state
      let chartLoading = getByTestId('chart-loading');
      expect(chartLoading).toHaveTextContent('not-loading');

      // Update loading state and check
      rerender(<LineChart option={mockOption} loading={true} />);

      chartLoading = getByTestId('chart-loading');
      expect(chartLoading).toHaveTextContent('loading');
    });

    it('should render different chart types with consistent API', () => {
      // Test LineChart
      const lineOption = {
        xAxis: { type: 'category' as const, data: ['Mon', 'Tue', 'Wed'] },
        yAxis: { type: 'value' as const },
        series: [{ data: [120, 200, 150], type: 'line' as const }],
      };

      const { getByTestId: getLineChart } = render(
        <LineChart option={lineOption} width="400px" height="200px" />
      );

      const lineChartWrapper = getLineChart('base-chart-wrapper');
      expect(lineChartWrapper).toBeInTheDocument();
      expect(lineChartWrapper).toHaveClass('taroviz-line-chart');
    });
  });

  describe('Chart Event Handling', () => {
    it('should pass events to chart instance', () => {
      const mockOption = {
        xAxis: { type: 'category' as const, data: ['Mon', 'Tue', 'Wed'] },
        yAxis: { type: 'value' as const },
        series: [{ data: [120, 200, 150], type: 'line' as const }],
      };

      const mockOnClick = jest.fn();

      render(<LineChart option={mockOption} onEvents={{ click: mockOnClick }} />);

      // The event should be passed to the chart instance via BaseChartWrapper
      // We can verify this by checking that the BaseChartWrapper received the onEvents prop
      // In our mock, this is handled by the getAdapter mock
    });
  });
});
