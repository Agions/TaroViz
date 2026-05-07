/**
 * TreeChart 测试
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TreeChart from '../index';

// Mock BaseChartWrapper
jest.mock('../../common/BaseChartWrapper');

describe('TreeChart', () => {
  const mockData = {
    name: 'root',
    children: [
      {
        name: 'child1',
        children: [{ name: 'grandchild1' }, { name: 'grandchild2' }],
      },
      {
        name: 'child2',
      },
    ],
  };

  const mockProps = {
    data: [mockData],
    width: 600,
    height: 400,
  };

  it('should render without crashing', () => {
    render(<TreeChart {...mockProps} />);
    expect(screen.getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });

  it('should render with correct orientation', () => {
    render(<TreeChart {...mockProps} orient="horizontal" />);
    expect(screen.getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });

  it('should handle different layout types', () => {
    render(<TreeChart {...mockProps} layout="orthogonal" />);
    expect(screen.getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });

  it('should handle node gap', () => {
    render(<TreeChart {...mockProps} nodeGap={20} />);
    expect(screen.getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });

  it('should handle initial tree depth', () => {
    render(<TreeChart {...mockProps} initialTreeDepth={2} />);
    expect(screen.getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });

  it('should handle label position', () => {
    render(<TreeChart {...mockProps} labelPosition="left" />);
    expect(screen.getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });

  it('should handle line curveness', () => {
    render(<TreeChart {...mockProps} lineCurveness={0.5} />);
    expect(screen.getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });

  it('should handle symbol size', () => {
    render(<TreeChart {...mockProps} symbolSize={10} />);
    expect(screen.getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });
});
