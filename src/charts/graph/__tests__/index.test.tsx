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
    expect(container.firstChild).toHaveClass('test-graph');
  });

  it('renders with custom width and height', () => {
    const { container } = render(<GraphChart width={500} height={400} />);
    expect(container.firstChild).toHaveStyle({ width: '500px', height: '400px' });
  });

  it('renders with basic option', () => {
    const option = {
      series: [{
        type: 'graph',
        nodes: [
          { id: '1', name: 'Node 1' },
          { id: '2', name: 'Node 2' },
        ],
        links: [
          { source: '1', target: '2' },
        ],
      }],
    };
    const { container } = render(<GraphChart option={option} />);
    expect(container).toBeTruthy();
  });
});
