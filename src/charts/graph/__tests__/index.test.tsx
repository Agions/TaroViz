/**
 * @version v1.5.0
 */

import React from 'react';
import { render } from '@testing-library/react';
import GraphChart from '../index';

describe('GraphChart', () => {
  it('renders without crashing', () => {
    const { container } = render(<GraphChart />);
    expect(container).toBeTruthy();
  });

  it('renders with custom className', () => {
    const { container } = render(<GraphChart className="test-graph" />);
    // BaseChartWrapper renders a fragment with a hidden accessibility table (first child)
    // and the actual chart div (last child), so we query the last child for className
    const chartDiv = container.lastChild;
    expect(chartDiv).toHaveClass('test-graph');
  });

  it('renders with custom width and height', () => {
    const { container } = render(<GraphChart width={500} height={400} />);
    // BaseChartWrapper renders a fragment with a hidden accessibility table (first child)
    // and the actual chart div (last child), so we query the last child for styles
    const chartDiv = container.lastChild;
    expect(chartDiv).toHaveStyle({ width: '500px', height: '400px' });
  });

  it('renders with basic option', () => {
    const option = {
      series: [
        {
          type: 'graph' as const,
          nodes: [
            { id: '1', name: 'Node 1' },
            { id: '2', name: 'Node 2' },
          ],
          links: [{ source: '1', target: '2' }],
        },
      ],
    };
    const { container } = render(<GraphChart option={option} />);
    expect(container).toBeTruthy();
  });
});
