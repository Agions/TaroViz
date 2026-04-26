/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ParallelChart from '../index';

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

// Mock ECharts components
jest.mock('echarts/components', () => ({
  GridComponent: jest.fn(),
  TooltipComponent: jest.fn(),
  TitleComponent: jest.fn(),
  LegendComponent: jest.fn(),
}));

// Mock BaseChartWrapper
jest.mock('../../common/BaseChartWrapper', () => ({
  __esModule: true,
  default: (props: any) => (
    <div
      data-testid="parallel-chart"
      className={`taroviz-parallel ${props.className || ''}`}
      style={{ width: props.width || '100%', height: props.height || 300, ...props.style }}
    >
      <div data-testid="chart-option">{JSON.stringify(props.option)}</div>
    </div>
  ),
}));

describe('ParallelChart', () => {
  const basicOption = {
    title: { text: '平行坐标图测试' },
    parallel: {
      left: '5%',
      right: '10%',
      bottom: '10%',
      top: '20%',
      height: '50%',
    },
    parallelAxisDefault: {
      type: 'value' as const,
      name: '指标',
    },
    series: [
      {
        type: 'parallel' as const,
        lineStyle: { width: 2, opacity: 0.5 },
        data: [
          [1, 55, 9, 56, 0.46, 2, 35],
          [2, 25, 11, 21, 0.65, 2, 33],
          [3, 56, 7, 63, 0.92, 3, 45],
        ],
      },
    ],
  };

  describe('Basic Rendering', () => {
    it('should render without crashing', () => {
      render(<ParallelChart option={basicOption} />);
      expect(screen.getByTestId('parallel-chart')).toBeInTheDocument();
    });

    it('should render with custom width and height', () => {
      render(<ParallelChart option={basicOption} width={600} height={500} />);
      expect(screen.getByTestId('parallel-chart')).toBeInTheDocument();
    });

    it('should have correct display name', () => {
      expect(ParallelChart.displayName).toBe('ParallelChart');
    });

    it('should pass option to wrapper', () => {
      render(<ParallelChart option={basicOption} />);
      expect(screen.getByTestId('chart-option')).toHaveTextContent('平行坐标图测试');
    });
  });

  describe('Props', () => {
    it('should accept className prop', () => {
      render(<ParallelChart option={basicOption} className="test-class" />);
      expect(screen.getByTestId('parallel-chart')).toHaveClass('test-class');
    });

    it('should accept style prop', () => {
      const style = { padding: '10px' };
      render(<ParallelChart option={basicOption} style={style} />);
      expect(screen.getByTestId('parallel-chart')).toBeInTheDocument();
    });

    it('should accept loading prop', () => {
      render(<ParallelChart option={basicOption} loading={true} />);
      expect(screen.getByTestId('parallel-chart')).toBeInTheDocument();
    });

    it('should accept theme prop', () => {
      render(<ParallelChart option={basicOption} theme="dark" />);
      expect(screen.getByTestId('parallel-chart')).toBeInTheDocument();
    });
  });

  describe('Chart Options', () => {
    it('should render with expandable axis', () => {
      const expandableOption = {
        ...basicOption,
        parallel: {
          ...basicOption.parallel,
          axisExpandable: true,
          axisExpandCenter: 3,
          axisExpandCount: 3,
        },
      };
      render(<ParallelChart option={expandableOption} />);
      expect(screen.getByTestId('parallel-chart')).toBeInTheDocument();
    });

    it('should render with custom lineStyle', () => {
      const customLineOption = {
        ...basicOption,
        series: [
          {
            type: 'parallel' as const,
            lineStyle: { width: 3, color: '#1890ff', opacity: 0.8 },
            data: [[1, 55, 9, 56, 0.46, 2, 35]],
          },
        ],
      };
      render(<ParallelChart option={customLineOption} />);
      expect(screen.getByTestId('parallel-chart')).toBeInTheDocument();
    });

    it('should render with category axis', () => {
      const categoryOption = {
        title: { text: '分类轴测试' },
        parallel: { left: '5%', right: '10%', bottom: '10%', top: '20%' },
        parallelAxisDefault: {
          type: 'category' as const,
          data: ['A', 'B', 'C', 'D', 'E'],
          name: '分类',
        },
        series: [
          {
            type: 'parallel' as const,
            data: [
              ['A', 55, 9, 56, 0.46, 2, 35],
              ['B', 25, 11, 21, 0.65, 2, 33],
            ],
          },
        ],
      };
      render(<ParallelChart option={categoryOption} />);
      expect(screen.getByTestId('parallel-chart')).toBeInTheDocument();
    });
  });
});
