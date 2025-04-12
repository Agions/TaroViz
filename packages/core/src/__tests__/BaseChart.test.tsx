import { render, screen } from '@testing-library/react';
import React from 'react';

import { BaseChart } from '../components/BaseChart';

describe('BaseChart', () => {
  it('renders without crashing', () => {
    render(
      <BaseChart
        width={300}
        height={200}
        option={{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [120, 200, 150, 80, 70],
              type: 'line',
            },
          ],
        }}
      />
    );

    expect(screen.getByTestId('base-chart')).toBeInTheDocument();
  });

  it('updates when props change', () => {
    const { rerender } = render(
      <BaseChart
        width={300}
        height={200}
        option={{
          series: [
            {
              data: [120, 200],
              type: 'line',
            },
          ],
        }}
      />
    );

    rerender(
      <BaseChart
        width={300}
        height={200}
        option={{
          series: [
            {
              data: [150, 250],
              type: 'line',
            },
          ],
        }}
      />
    );

    expect(screen.getByTestId('base-chart')).toBeInTheDocument();
  });

  it('handles theme changes', () => {
    const { rerender } = render(
      <BaseChart
        width={300}
        height={200}
        theme="light"
        option={{
          series: [
            {
              data: [120, 200],
              type: 'line',
            },
          ],
        }}
      />
    );

    rerender(
      <BaseChart
        width={300}
        height={200}
        theme="dark"
        option={{
          series: [
            {
              data: [120, 200],
              type: 'line',
            },
          ],
        }}
      />
    );

    expect(screen.getByTestId('base-chart')).toBeInTheDocument();
  });

  it('handles resize', () => {
    render(
      <BaseChart
        width={300}
        height={200}
        option={{
          series: [
            {
              data: [120, 200],
              type: 'line',
            },
          ],
        }}
      />
    );

    global.dispatchEvent(new Event('resize'));
    expect(screen.getByTestId('base-chart')).toBeInTheDocument();
  });
});
