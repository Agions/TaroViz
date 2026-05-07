/**
 * WordCloudChart 组件测试
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WordCloudChart from '../index';

// 使用正确的 mock 方式，参考 parallel 图表的测试
jest.mock('../../common/BaseChartWrapper');
jest.mock('echarts/charts', () => ({ WordCloudChart: jest.fn() }));

describe('WordCloudChart', () => {
  const mockData = [
    { name: 'JavaScript', value: 100 },
    { name: 'TypeScript', value: 80 },
    { name: 'React', value: 60 },
    { name: 'Vue', value: 50 },
    { name: 'Node.js', value: 40 },
    { name: 'Python', value: 30 },
    { name: 'Go', value: 20 },
  ];

  it('应该渲染词云图组件', () => {
    render(<WordCloudChart wordCloudData={mockData} width={800} height={400} />);

    expect(screen.getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });

  it('应该传递正确的 option 到 BaseChart', () => {
    render(<WordCloudChart wordCloudData={mockData} width={800} height={400} />);

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series).toBeDefined();
    expect(option.series.type).toBe('wordCloud');
    expect(option.series.data).toEqual(mockData);
    expect(option.series.shape).toBe('circle');
  });

  it('当 wordCloudData 为空时应该返回 null', () => {
    const { container } = render(<WordCloudChart wordCloudData={[]} width={800} height={400} />);

    expect(container.firstChild).toBeNull();
  });

  it('应该支持自定义 shape', () => {
    render(<WordCloudChart wordCloudData={mockData} shape="star" width={800} height={400} />);

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series.shape).toBe('star');
  });

  it('应该支持自定义 sizeRange', () => {
    render(
      <WordCloudChart wordCloudData={mockData} sizeRange={[15, 80]} width={800} height={400} />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series.sizeRange).toEqual([15, 80]);
  });

  it('应该支持自定义 rotationRange', () => {
    render(
      <WordCloudChart wordCloudData={mockData} rotationRange={[-45, 45]} width={800} height={400} />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series.rotationRange).toEqual([-45, 45]);
  });

  it('应该支持自定义 gridSize', () => {
    render(<WordCloudChart wordCloudData={mockData} gridSize={10} width={800} height={400} />);

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series.gridSize).toBe(10);
  });

  it('应该支持 optionMerge 自定义配置', () => {
    const customTitle = { title: { text: '词云图标题', left: 'center' } };

    render(
      <WordCloudChart wordCloudData={mockData} optionMerge={customTitle} width={800} height={400} />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.title).toEqual(customTitle.title);
  });
});
