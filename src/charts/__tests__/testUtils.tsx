/**
 * TaroViz 图表测试工具函数
 * 消除各图表组件测试文件中的重复测试逻辑
 *
 * 使用方式：
 * 1. 测试文件顶层写：jest.mock('../common/BaseChartWrapper');
 *    Jest 会自动使用 src/charts/common/__mocks__/BaseChartWrapper.tsx
 * 2. 图表特定 mock：jest.mock('echarts/charts', () => ({ XxxChart: jest.fn() }));
 * 3. import { runStandardChartTests } from '../../__tests__/testUtils';
 */

import { render } from '@testing-library/react';
import React from 'react';

/**
 * 标准图表测试用例
 * 所有基础图表共享的测试逻辑
 */
export function runStandardChartTests(
  ChartComponent: React.ComponentType<any>,
  chartType: string,
  mockOption: Record<string, unknown>,
): void {
  describe(`${chartType} Component`, () => {
    it('should render correctly with default props', () => {
      const { getByTestId } = render(
        React.createElement(ChartComponent, { option: mockOption } as any),
      );

      const chartWrapper = getByTestId('base-chart-wrapper');
      expect(chartWrapper).toBeInTheDocument();
      expect(chartWrapper).toHaveClass(`taroviz-${chartType}`);
    });

    it('should pass the correct option to BaseChartWrapper', () => {
      const { getByTestId } = render(
        React.createElement(ChartComponent, { option: mockOption } as any),
      );

      const chartOption = getByTestId('chart-option');
      expect(JSON.parse(chartOption.textContent || '')).toEqual(mockOption);
    });

    it('should render with custom width and height', () => {
      const customWidth = '500px';
      const customHeight = '400px';

      const { getByTestId } = render(
        React.createElement(ChartComponent, {
          option: mockOption,
          width: customWidth,
          height: customHeight,
        } as any),
      );

      const chartWrapper = getByTestId('base-chart-wrapper');
      expect(chartWrapper).toHaveStyle(`width: ${customWidth}`);
      expect(chartWrapper).toHaveStyle(`height: ${customHeight}`);
    });

    it('should render with custom className', () => {
      const customClass = `custom-${chartType}`;

      const { getByTestId } = render(
        React.createElement(ChartComponent, {
          option: mockOption,
          className: customClass,
        } as any),
      );

      const chartWrapper = getByTestId('base-chart-wrapper');
      expect(chartWrapper).toHaveClass(customClass);
    });

    it('should render with loading state', () => {
      const { getByTestId } = render(
        React.createElement(ChartComponent, {
          option: mockOption,
          loading: true,
        } as any),
      );

      const chartWrapper = getByTestId('base-chart-wrapper');
      expect(chartWrapper).toBeInTheDocument();
    });
  });
}
