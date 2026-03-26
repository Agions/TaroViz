/**
 * @version v1.5.0
 */

import React from 'react';
import { render } from '@testing-library/react';
import CandlestickChart from '../index';

describe('CandlestickChart', () => {
  it('renders without crashing', () => {
    const { container } = render(<CandlestickChart />);
    expect(container).toBeTruthy();
  });

  it('renders with custom width and height', () => {
    const { container } = render(<CandlestickChart width={500} height={400} />);
    expect(container.firstChild).toHaveStyle({ width: '500px', height: '400px' });
  });

  it('renders with stock data', () => {
    const option = {
      xAxis: { data: ['2024-01', '2024-02', '2024-03'] },
      series: [{
        type: 'candlestick',
        data: [
          [20, 30, 15, 35],  // [open, close, lowest, highest]
          [25, 35, 20, 40],
          [30, 25, 20, 35],
        ],
      }],
    };
    const { container } = render(<CandlestickChart option={option} />);
    expect(container).toBeTruthy();
  });
});
