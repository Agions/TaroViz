/**
 * SankeyChart 组件测试
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SankeyChart from '../index';

// 使用正确的 mock 方式，参考 parallel 图表的测试
jest.mock('../../common/BaseChartWrapper');
jest.mock('echarts/charts', () => ({ SankeyChart: jest.fn() }));

describe('SankeyChart', () => {
  const mockNodes = [
    { name: '节点 A' },
    { name: '节点 B' },
    { name: '节点 C' },
    { name: '节点 D' },
  ];

  const mockLinks = [
    { source: '节点 A', target: '节点 B', value: 10 },
    { source: '节点 A', target: '节点 C', value: 20 },
    { source: '节点 B', target: '节点 D', value: 15 },
    { source: '节点 C', target: '节点 D', value: 25 },
  ];

  it('应该渲染桑基图组件', () => {
    render(<SankeyChart nodes={mockNodes} links={mockLinks} width={800} height={400} />);

    expect(screen.getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });

  it('应该传递正确的 option 到 BaseChart', () => {
    render(<SankeyChart nodes={mockNodes} links={mockLinks} width={800} height={400} />);

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series).toBeDefined();
    expect(option.series.type).toBe('sankey');
    expect(option.series.data).toEqual(mockNodes);
    expect(option.series.links).toEqual(mockLinks);
  });

  it('当 nodes 为空时应该返回 null', () => {
    const { container } = render(
      <SankeyChart nodes={[]} links={mockLinks} width={800} height={400} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('当 links 为空时应该返回 null', () => {
    const { container } = render(
      <SankeyChart nodes={mockNodes} links={[]} width={800} height={400} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('应该支持自定义 orient', () => {
    render(
      <SankeyChart nodes={mockNodes} links={mockLinks} orient="vertical" width={800} height={400} />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series.orient).toBe('vertical');
  });

  it('应该支持自定义 nodeAlign', () => {
    render(
      <SankeyChart
        nodes={mockNodes}
        links={mockLinks}
        nodeAlign="center"
        width={800}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series.nodeAlign).toBe('center');
  });

  it('应该支持自定义 nodeGap', () => {
    render(
      <SankeyChart nodes={mockNodes} links={mockLinks} nodeGap={15} width={800} height={400} />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series.nodeGap).toBe(15);
  });

  it('应该支持 optionMerge 自定义配置', () => {
    const customTitle = { title: { text: '桑基图标题', left: 'center' } };

    render(
      <SankeyChart
        nodes={mockNodes}
        links={mockLinks}
        optionMerge={customTitle}
        width={800}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.title).toEqual(customTitle.title);
  });
});
