/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BoxplotChart from '../index';

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
      data-testid="boxplot-chart"
      className={`taroviz-boxplot ${props.className || ''}`}
      style={{ width: props.width || '100%', height: props.height || 300, ...props.style }}
    >
      <div data-testid="chart-option">{JSON.stringify(props.option)}</div>
    </div>
  ),
}));

describe('BoxplotChart', () => {
  const basicOption = {
    title: { text: '箱线图测试' },
    xAxis: { type: 'category' as const, data: ['A', 'B', 'C'] },
    yAxis: { type: 'value' as const },
    series: [{
      type: 'boxplot' as const,
      data: [
        [850, 940, 980, 1050, 1130],
        [920, 1000, 1050, 1150, 1200],
        [780, 850, 920, 1050, 1150],
      ],
    }],
  };

  describe('Basic Rendering', () => {
    it('should render without crashing', () => {
      render(<BoxplotChart option={basicOption} />);
      expect(screen.getByTestId('boxplot-chart')).toBeInTheDocument();
    });

    it('should render with custom width and height', () => {
      render(<BoxplotChart option={basicOption} width={600} height={500} />);
      expect(screen.getByTestId('boxplot-chart')).toBeInTheDocument();
    });

    it('should have correct display name', () => {
      expect(BoxplotChart.displayName).toBe('BoxplotChart');
    });

    it('should pass option to wrapper', () => {
      render(<BoxplotChart option={basicOption} />);
      expect(screen.getByTestId('chart-option')).toHaveTextContent('箱线图测试');
    });
  });

  describe('Props', () => {
    it('should accept className prop', () => {
      render(<BoxplotChart option={basicOption} className="test-class" />);
      expect(screen.getByTestId('boxplot-chart')).toHaveClass('test-class');
    });

    it('should accept style prop', () => {
      const style = { padding: '10px' };
      render(<BoxplotChart option={basicOption} style={style} />);
      expect(screen.getByTestId('boxplot-chart')).toBeInTheDocument();
    });

    it('should accept loading prop', () => {
      render(<BoxplotChart option={basicOption} loading={true} />);
      expect(screen.getByTestId('boxplot-chart')).toBeInTheDocument();
    });

    it('should accept theme prop', () => {
      render(<BoxplotChart option={basicOption} theme="dark" />);
      expect(screen.getByTestId('boxplot-chart')).toBeInTheDocument();
    });
  });

  describe('Chart Options', () => {
    it('should render with multiple data series', () => {
      const multiOption = {
        ...basicOption,
        series: [
          { type: 'boxplot' as const, name: '2024', data: [[850, 940, 980, 1050, 1130]] },
          { type: 'boxplot' as const, name: '2025', data: [[920, 1000, 1050, 1150, 1200]] },
        ],
      };
      render(<BoxplotChart option={multiOption} />);
      expect(screen.getByTestId('boxplot-chart')).toBeInTheDocument();
    });

    it('should render with custom itemStyle', () => {
      const optionWithStyle = {
        ...basicOption,
        series: [{
          type: 'boxplot' as const,
          data: [[850, 940, 980, 1050, 1130]],
          itemStyle: { color: '#1890ff', borderColor: '#000' },
        }],
      };
      render(<BoxplotChart option={optionWithStyle} />);
      expect(screen.getByTestId('boxplot-chart')).toBeInTheDocument();
    });
  });
});
