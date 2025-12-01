import { render } from '@testing-library/react';
import React from 'react';

import PieChart from '../index';

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
  PieChart: jest.fn(),
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

describe('PieChart Component', () => {
  const mockOption = {
    series: [
      {
        type: 'pie' as const,
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
      },
    ],
  };

  it('should render correctly with default props', () => {
    const { getByTestId } = render(<PieChart option={mockOption} />);

    const chartWrapper = getByTestId('base-chart-wrapper');
    expect(chartWrapper).toBeInTheDocument();
    expect(chartWrapper).toHaveClass('taroviz-pie-chart');
  });

  it('should pass the correct option to BaseChartWrapper', () => {
    const { getByTestId } = render(<PieChart option={mockOption} />);

    const chartOption = getByTestId('chart-option');
    expect(JSON.parse(chartOption.textContent || '')).toEqual(mockOption);
  });

  it('should render with custom width and height', () => {
    const customWidth = '400px';
    const customHeight = '400px';

    const { getByTestId } = render(
      <PieChart option={mockOption} width={customWidth} height={customHeight} />
    );

    const chartWrapper = getByTestId('base-chart-wrapper');
    expect(chartWrapper).toHaveStyle(`width: ${customWidth}`);
    expect(chartWrapper).toHaveStyle(`height: ${customHeight}`);
  });

  it('should render with custom className', () => {
    const customClass = 'custom-pie-chart';

    const { getByTestId } = render(<PieChart option={mockOption} className={customClass} />);

    const chartWrapper = getByTestId('base-chart-wrapper');
    expect(chartWrapper).toHaveClass(customClass);
  });

  it('should render with loading state', () => {
    const { getByTestId } = render(<PieChart option={mockOption} loading={true} />);

    const chartWrapper = getByTestId('base-chart-wrapper');
    expect(chartWrapper).toBeInTheDocument();
  });

  it('should render with theme', () => {
    const { getByTestId } = render(<PieChart option={mockOption} theme="dark" />);

    const chartWrapper = getByTestId('base-chart-wrapper');
    expect(chartWrapper).toBeInTheDocument();
  });
});
