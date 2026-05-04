/**
 * BaseChartWrapper 自动 mock
 * 放在 __mocks__ 目录中，测试文件只需写 jest.mock('../common/BaseChartWrapper') 即可自动加载本 mock
 */
import React from 'react';

const MockBaseChartWrapper = (props: Record<string, unknown>) => (
  <div
    data-testid="base-chart-wrapper"
    className={`taroviz-${props.chartType as string} ${(props.className as string) || ''}`}
    style={{ width: props.width as string, height: props.height as string }}
  >
    <div data-testid="chart-option">{JSON.stringify(props.option)}</div>
  </div>
);

export default MockBaseChartWrapper;
