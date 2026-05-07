/**
 * GraphChart 组件测试
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GraphChart from '../index';

// 使用正确的 mock 方式，参考 parallel 图表的测试
jest.mock('../../common/BaseChartWrapper');
jest.mock('echarts/charts', () => ({ GraphChart: jest.fn() }));

describe('GraphChart', () => {
  const mockNodes = [
    { id: '1', name: '节点 A', value: 10 },
    { id: '2', name: '节点 B', value: 20 },
    { id: '3', name: '节点 C', value: 30 },
    { id: '4', name: '节点 D', value: 40 },
  ];

  const mockLinks = [
    { source: '1', target: '2', value: 5 },
    { source: '2', target: '3', value: 8 },
    { source: '3', target: '4', value: 12 },
  ];

  it('应该渲染关系图组件', () => {
    render(<GraphChart nodes={mockNodes} links={mockLinks} width={600} height={400} />);

    expect(screen.getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });

  it('应该传递正确的 option 到 BaseChart', () => {
    render(<GraphChart nodes={mockNodes} links={mockLinks} width={600} height={400} />);

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series).toBeDefined();
    expect(option.series.type).toBe('graph');
    expect(option.series.data).toEqual(mockNodes);
    expect(option.series.links).toEqual(mockLinks);
  });

  it('当 nodes 为空时应该返回 null', () => {
    const { container } = render(
      <GraphChart nodes={[]} links={mockLinks} width={600} height={400} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('应该支持自定义 layout', () => {
    render(
      <GraphChart nodes={mockNodes} links={mockLinks} layout="circular" width={600} height={400} />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series.layout).toBe('circular');
  });

  it('应该支持自定义 force 配置', () => {
    render(
      <GraphChart
        nodes={mockNodes}
        links={mockLinks}
        layout="force"
        force={{ repulsion: 200, edgeLength: 100 }}
        width={600}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series.force).toEqual({ repulsion: 200, edgeLength: 100 });
  });

  it('应该支持 draggable 配置', () => {
    render(
      <GraphChart nodes={mockNodes} links={mockLinks} draggable={true} width={600} height={400} />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series.draggable).toBe(true);
  });

  it('应该支持 optionMerge 自定义配置', () => {
    const customTitle = { title: { text: '关系图标题', left: 'center' } };

    render(
      <GraphChart
        nodes={mockNodes}
        links={mockLinks}
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
