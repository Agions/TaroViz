/**
 * @version v1.5.0
 */

import React from 'react';
import { render } from '@testing-library/react';
import WordCloudChart from '../index';

describe('WordCloudChart', () => {
  it('renders without crashing', () => {
    const { container } = render(<WordCloudChart />);
    expect(container).toBeTruthy();
  });

  it('renders with custom width and height', () => {
    const { container } = render(<WordCloudChart width={600} height={400} />);
    // BaseChartWrapper renders a fragment with a hidden accessibility table (first child)
    // and the actual chart div (last child), so we query the last child for styles
    const chartDiv = container.lastChild;
    expect(chartDiv).toHaveStyle({ width: '600px', height: '400px' });
  });

  it('renders with word data', () => {
    const option = {
      series: [
        {
          type: 'wordCloud' as const,
          data: [
            { name: 'JavaScript', value: 10000 },
            { name: 'TypeScript', value: 8000 },
            { name: 'React', value: 6000 },
          ],
        },
      ],
    } as any;
    const { container } = render(<WordCloudChart option={option} />);
    expect(container).toBeTruthy();
  });
});
