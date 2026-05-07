/**
 * HeatmapChart 组件测试
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeatmapChart from '../index';

// 使用正确的 mock 方式，参考 parallel 图表的测试
jest.mock('../../common/BaseChartWrapper');
jest.mock('echarts/charts', () => ({ HeatmapChart: jest.fn() }));

describe('HeatmapChart', () => {
  const mockXData = ['周一', '周二', '周三', '周四', '周五'];
  const mockYData = ['A', 'B', 'C', 'D'];
  const mockData = [
    { x: 0, y: 0, value: 10 },
    { x: 1, y: 0, value: 20 },
    { x: 2, y: 0, value: 30 },
    { x: 3, y: 0, value: 40 },
    { x: 4, y: 0, value: 50 },
    { x: 0, y: 1, value: 15 },
    { x: 1, y: 1, value: 25 },
    { x: 2, y: 1, value: 35 },
    { x: 3, y: 1, value: 45 },
    { x: 4, y: 1, value: 55 },
  ];

  it('应该渲染热力图组件', () => {
    render(
      <HeatmapChart
        xData={mockXData}
        yData={mockYData}
        data={mockData}
        width={600}
        height={400}
      />
    );

    expect(screen.getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });

  it('应该传递正确的 option 到 BaseChart', () => {
    render(
      <HeatmapChart
        xData={mockXData}
        yData={mockYData}
        data={mockData}
        width={600}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.xAxis).toBeDefined();
    expect(option.xAxis.data).toEqual(mockXData);
    expect(option.yAxis).toBeDefined();
    expect(option.yAxis.data).toEqual(mockYData);
    expect(option.series).toBeDefined();
    expect(option.series.type).toBe('heatmap');
  });

  it('当 xData 为空时应该返回 null', () => {
    const { container } = render(
      <HeatmapChart
        xData={[]}
        yData={mockYData}
        data={mockData}
        width={600}
        height={400}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('当 yData 为空时应该返回 null', () => {
    const { container } = render(
      <HeatmapChart
        xData={mockXData}
        yData={[]}
        data={mockData}
        width={600}
        height={400}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('当 data 为空时应该返回 null', () => {
    const { container } = render(
      <HeatmapChart
        xData={mockXData}
        yData={mockYData}
        data={[]}
        width={600}
        height={400}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('应该支持自定义 visualMap', () => {
    render(
      <HeatmapChart
        xData={mockXData}
        yData={mockYData}
        data={mockData}
        visualMap={{
          min: 5,
          max: 60,
          orient: 'vertical',
          right: 10,
          top: 'center',
        }}
        width={600}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.visualMap.min).toBe(5);
    expect(option.visualMap.max).toBe(60);
    expect(option.visualMap.orient).toBe('vertical');
  });

  it('应该支持 optionMerge 自定义配置', () => {
    const customTitle = { title: { text: '热力图标题', left: 'center' } };

    render(
      <HeatmapChart
        xData={mockXData}
        yData={mockYData}
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

  it('应该正确转换数据格式', () => {
    render(
      <HeatmapChart
        xData={mockXData}
        yData={mockYData}
        data={mockData}
        width={600}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    // 验证数据被正确转换为 [x, y, value] 格式
    expect(option.series.data[0]).toEqual([0, 0, 10]);
    expect(option.series.data[4]).toEqual([4, 0, 50]);
  });
});
