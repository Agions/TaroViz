/**
 * RadarChart 组件测试
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RadarChart from '../index';

// 使用正确的 mock 方式，参考 parallel 图表的测试
jest.mock('../../common/BaseChartWrapper');
jest.mock('echarts/charts', () => ({ RadarChart: jest.fn() }));

describe('RadarChart', () => {
  const mockIndicators = [
    { name: '速度', max: 100 },
    { name: '力量', max: 100 },
    { name: '技巧', max: 100 },
    { name: '耐力', max: 100 },
    { name: '敏捷', max: 100 },
  ];

  const mockData = [
    {
      name: '角色 A',
      value: [80, 70, 90, 60, 85],
    },
    {
      name: '角色 B',
      value: [60, 85, 75, 90, 70],
    },
  ];

  it('应该渲染雷达图组件', () => {
    render(
      <RadarChart
        indicators={mockIndicators}
        data={mockData}
        width={400}
        height={400}
      />
    );

    expect(screen.getByTestId('base-chart-wrapper')).toBeInTheDocument();
  });

  it('应该传递正确的 option 到 BaseChart', () => {
    render(
      <RadarChart
        indicators={mockIndicators}
        data={mockData}
        width={400}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.radar).toBeDefined();
    expect(option.radar.indicator).toHaveLength(5);
    expect(option.series).toHaveLength(2);
    expect(option.series[0].type).toBe('radar');
  });

  it('应该支持自定义 startAngle', () => {
    render(
      <RadarChart
        indicators={mockIndicators}
        data={mockData}
        startAngle={0}
        width={400}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.radar.startAngle).toBe(0);
  });

  it('应该支持 areaStyle 配置', () => {
    render(
      <RadarChart
        indicators={mockIndicators}
        data={mockData}
        areaStyle={{
          color: '#ff0000',
          opacity: 0.5,
        }}
        width={400}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series[0].areaStyle).toBeDefined();
    expect(option.series[0].areaStyle.color).toBe('#ff0000');
    expect(option.series[0].areaStyle.opacity).toBe(0.5);
  });

  it('应该支持 label 配置', () => {
    render(
      <RadarChart
        indicators={mockIndicators}
        data={mockData}
        label={{
          show: true,
          position: 'inside',
        }}
        width={400}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series[0].label.show).toBe(true);
    expect(option.series[0].label.position).toBe('inside');
  });

  it('应该支持 optionMerge 自定义配置', () => {
    const customTitle = { title: { text: '自定义标题', left: 'center' } };

    render(
      <RadarChart
        indicators={mockIndicators}
        data={mockData}
        optionMerge={customTitle}
        width={400}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.title).toEqual(customTitle.title);
  });

  it('当 indicators 为空时应该返回 null', () => {
    const { container } = render(
      <RadarChart
        indicators={[]}
        data={mockData}
        width={400}
        height={400}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('当 data 为空时应该返回 null', () => {
    const { container } = render(
      <RadarChart
        indicators={mockIndicators}
        data={[]}
        width={400}
        height={400}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('应该支持多个数据系列对比', () => {
    const multiData = [
      { name: '系列 1', value: [80, 70, 90, 60, 85] },
      { name: '系列 2', value: [60, 85, 75, 90, 70] },
      { name: '系列 3', value: [90, 60, 80, 75, 80] },
    ];

    render(
      <RadarChart
        indicators={mockIndicators}
        data={multiData}
        width={400}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series).toHaveLength(3);
    expect(option.legend.data).toHaveLength(3);
  });

  it('应该支持自定义 lineStyle', () => {
    render(
      <RadarChart
        indicators={mockIndicators}
        data={mockData}
        lineStyle={{
          width: 3,
          type: 'dashed',
          color: '#ff0000',
        }}
        width={400}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.series[0].lineStyle.width).toBe(3);
    expect(option.series[0].lineStyle.type).toBe('dashed');
  });

  it('应该支持 centerCircle 配置', () => {
    render(
      <RadarChart
        indicators={mockIndicators}
        data={mockData}
        centerCircle={true}
        centerCircleSize={0.3}
        width={400}
        height={400}
      />
    );

    const baseChartWrapper = screen.getByTestId('base-chart-wrapper');
    const optionElement = baseChartWrapper.querySelector('[data-testid="chart-option"]');
    const option = JSON.parse(optionElement?.textContent || '{}');

    expect(option.radar.centerCircle).toBe(true);
    expect(option.radar.centerCircleSize).toBe(0.3);
  });
});
