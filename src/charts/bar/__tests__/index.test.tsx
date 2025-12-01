import { render } from '@testing-library/react';
import React from 'react';

import BarChart from '../index';

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
  BarChart: jest.fn(),
}));

jest.mock('echarts/components', () => ({
  GridComponent: jest.fn(),
  TooltipComponent: jest.fn(),
  TitleComponent: jest.fn(),
  LegendComponent: jest.fn(),
}));

jest.mock('../../common/BaseChartWrapper', () => ({
  __esModule: true,
  default: (props: any) => (
    <div
      data-testid="base-chart-wrapper"
      className={`taroviz-${props.chartType} ${props.className || ''}`}
      style={{ width: props.width, height: props.height }}
    >
      <div data-testid="chart-option">{JSON.stringify(props.option)}</div>
    </div>
  ),
}));

describe('BarChart Component', () => {
  const mockOption = {
    xAxis: {
      type: 'category' as const,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value' as const,
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'bar' as const,
      },
    ],
  };

  it('should render correctly with default props', () => {
    const { getByTestId } = render(<BarChart option={mockOption} />);

    const chartWrapper = getByTestId('base-chart-wrapper');
    expect(chartWrapper).toBeInTheDocument();
    expect(chartWrapper).toHaveClass('taroviz-bar-chart');
  });

  it('should pass the correct option to BaseChartWrapper', () => {
    const { getByTestId } = render(<BarChart option={mockOption} />);

    const chartOption = getByTestId('chart-option');
    expect(JSON.parse(chartOption.textContent || '')).toEqual(mockOption);
  });

  it('should render with custom width and height', () => {
    const customWidth = '600px';
    const customHeight = '450px';

    const { getByTestId } = render(
      <BarChart option={mockOption} width={customWidth} height={customHeight} />
    );

    const chartWrapper = getByTestId('base-chart-wrapper');
    expect(chartWrapper).toHaveStyle(`width: ${customWidth}`);
    expect(chartWrapper).toHaveStyle(`height: ${customHeight}`);
  });

  it('should render with custom className', () => {
    const customClass = 'custom-bar-chart';

    const { getByTestId } = render(<BarChart option={mockOption} className={customClass} />);

    const chartWrapper = getByTestId('base-chart-wrapper');
    expect(chartWrapper).toHaveClass(customClass);
  });

  it('should render with loading state', () => {
    const { getByTestId } = render(<BarChart option={mockOption} loading={true} />);

    const chartWrapper = getByTestId('base-chart-wrapper');
    expect(chartWrapper).toBeInTheDocument();
  });

  it('should render with svg renderer', () => {
    const { getByTestId } = render(<BarChart option={mockOption} renderer="svg" />);

    const chartWrapper = getByTestId('base-chart-wrapper');
    expect(chartWrapper).toBeInTheDocument();
  });
});
