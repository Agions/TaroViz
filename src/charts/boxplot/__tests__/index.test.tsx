/**
 * BoxplotChart 组件测试
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import BoxplotChart from '../index';

// 自动使用 src/charts/common/__mocks__/BaseChartWrapper.tsx
jest.mock('../../common/BaseChartWrapper');
jest.mock('echarts/charts', () => ({ BoxplotChart: jest.fn() }));

const basicOption = {
  title: { text: '箱线图测试' },
  xAxis: { type: 'category' as const, data: ['A', 'B', 'C'] },
  yAxis: { type: 'value' as const },
  series: [
    {
      type: 'boxplot' as const,
      data: [
        [850, 940, 980, 1050, 1130],
        [920, 1000, 1050, 1150, 1200],
        [780, 850, 920, 1050, 1150],
      ],
    },
  ],
};

describe('BoxplotChart', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<BoxplotChart option={basicOption} />);
    expect(getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });

  it('should have correct display name', () => {
    expect(BoxplotChart.displayName).toBe('BoxplotChart');
  });

  it('should accept className prop', () => {
    const { getByTestId } = render(<BoxplotChart option={basicOption} className="test-class" />);
    expect(getByTestId('base-chart-wrapper')).toHaveClass('test-class');
  });

  it('should accept loading prop', () => {
    const { getByTestId } = render(<BoxplotChart option={basicOption} loading={true} />);
    expect(getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });

  it('should render with multiple data series', () => {
    const multiOption = {
      ...basicOption,
      series: [
        { type: 'boxplot' as const, name: '2024', data: [[850, 940, 980, 1050, 1130]] },
        { type: 'boxplot' as const, name: '2025', data: [[920, 1000, 1050, 1150, 1200]] },
      ],
    };
    const { getByTestId } = render(<BoxplotChart option={multiOption} />);
    expect(getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });

  it('should render with custom itemStyle', () => {
    const optionWithStyle = {
      ...basicOption,
      series: [
        {
          type: 'boxplot' as const,
          data: [[850, 940, 980, 1050, 1130]],
          itemStyle: { color: '#1890ff', borderColor: '#000' },
        },
      ],
    };
    const { getByTestId } = render(<BoxplotChart option={optionWithStyle} />);
    expect(getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });
});
