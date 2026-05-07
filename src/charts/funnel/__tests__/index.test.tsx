/**
 * FunnelChart 组件测试
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FunnelChart from '../index';

// 使用正确的 mock 方式，参考 parallel 图表的测试
jest.mock('../../common/BaseChartWrapper');
jest.mock('echarts/charts', () => ({ FunnelChart: jest.fn() }));

describe('FunnelChart', () => {
  const mockData = [
    { value: 100, name: '访问' },
    { value: 80, name: '咨询' },
    { value: 60, name: '订单' },
    { value: 40, name: '成交' },
    { value: 20, name: '退款' },
  ];

  it('应该渲染漏斗图组件', () => {
    render(
      <FunnelChart
        data={mockData}
        width={600}
        height={400}
      />
    );

    expect(screen.getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });

  it('应该传递正确的 option 到 BaseChart', () => {
    render(
      <FunnelChart
        data={mockData}
        width={600}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series).toBeDefined();
    expect(option.series.type).toBe('funnel');
    expect(option.series.data).toEqual(mockData);
    expect(option.series.sort).toBe('descending');
  });

  it('当 data 为空时应该返回 null', () => {
    const { container } = render(
      <FunnelChart
        data={[]}
        width={600}
        height={400}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('应该支持自定义 sort 排序', () => {
    render(
      <FunnelChart
        data={mockData}
        sort="ascending"
        width={600}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series.sort).toBe('ascending');
  });

  it('应该支持自定义 align 对齐', () => {
    render(
      <FunnelChart
        data={mockData}
        align="center"
        width={600}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series.align).toBe('center');
  });

  it('应该支持自定义 gap 间隙', () => {
    render(
      <FunnelChart
        data={mockData}
        gap={10}
        width={600}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series.gap).toBe(10);
  });

  it('应该支持自定义 min/max 高度', () => {
    render(
      <FunnelChart
        data={mockData}
        min={10}
        max={120}
        width={600}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series.min).toBe(10);
    expect(option.series.max).toBe(120);
  });

  it('应该支持 optionMerge 自定义配置', () => {
    const customTitle = { title: { text: '漏斗图标题', left: 'center' } };

    render(
      <FunnelChart
        data={mockData}
        optionMerge={customTitle}
        width={600}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.title).toEqual(customTitle.title);
  });
});
