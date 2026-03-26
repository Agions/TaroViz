/**
 * @version v1.5.0
 */

import { renderHook } from '@testing-library/react';
import { useDataTransform, useTableTransform, useTimeSeriesTransform } from '../useDataTransform';

describe('useDataTransform', () => {
  describe('useDataTransform - line/bar chart', () => {
    it('transforms simple line chart data', () => {
      const { result } = renderHook(() =>
        useDataTransform({
          data: {
            categories: ['周一', '周二', '周三'],
            series: [
              { name: '销量', value: 120 },
              { name: '销量', value: 200 },
              { name: '销量', value: 150 },
            ],
          },
          chartType: 'line',
          mapping: { xField: 'name', yField: 'value' },
        })
      );

      expect(result.current.xAxis).toBeTruthy();
      expect(result.current.series).toBeTruthy();
    });

    it('transforms bar chart data with series', () => {
      const { result } = renderHook(() =>
        useDataTransform({
          data: {
            categories: ['周一', '周二', '周三'],
            series: [
              { name: 'A', value: 100 },
              { name: 'A', value: 200 },
              { name: 'A', value: 150 },
            ],
          },
          chartType: 'bar',
          mapping: { xField: 'name', yField: 'value', seriesField: 'name' },
        })
      );

      // All data points have name='A', so they should be grouped into 1 series
      expect(result.current.series).toHaveLength(1);
      const series = result.current.series as unknown as Array<{ data: unknown[] }>;
      expect(series[0].data).toHaveLength(3);
    });
  });

  describe('useDataTransform - pie chart', () => {
    it('transforms pie chart data', () => {
      const { result } = renderHook(() =>
        useDataTransform({
          data: {
            series: [
              { name: '直接访问', value: 335 },
              { name: '邮件营销', value: 310 },
            ],
          },
          chartType: 'pie',
          mapping: { nameField: 'name', valueField: 'value' },
        })
      );

      expect(result.current.series).toBeTruthy();
      const series = result.current.series as unknown as Array<{ data: unknown[] }>;
      expect(series[0].data).toHaveLength(2);
    });
  });

  describe('useDataTransform - scatter chart', () => {
    it('transforms scatter chart data', () => {
      const { result } = renderHook(() =>
        useDataTransform({
          data: {
            series: [
              { x: 10, y: 20, size: 5 },
              { x: 30, y: 40, size: 10 },
            ],
          },
          chartType: 'scatter',
          mapping: { xField: 'x', yField: 'y', sizeField: 'size' },
        })
      );

      expect(result.current.series).toBeTruthy();
    });
  });

  describe('useTableTransform', () => {
    it('transforms table data to bar chart config', () => {
      const { result } = renderHook(() =>
        useTableTransform({
          data: [
            { month: '一月', sales: 1200, profit: 300 },
            { month: '二月', sales: 2000, profit: 500 },
          ],
          columns: [
            { field: 'month', label: '月份' },
            { field: 'sales', label: '销量' },
          ],
        })
      );

      expect(result.current.xAxis).toBeTruthy();
      expect(result.current.series).toBeTruthy();
    });

    it('handles empty data', () => {
      const { result } = renderHook(() =>
        useTableTransform({
          data: [],
        })
      );

      expect(result.current).toEqual({});
    });
  });

  describe('useTimeSeriesTransform', () => {
    it('transforms time series data', () => {
      const { result } = renderHook(() =>
        useTimeSeriesTransform({
          data: [
            { date: '2024-01-01', value: 100 },
            { date: '2024-01-02', value: 200 },
            { date: '2024-01-03', value: 150 },
          ],
          dateField: 'date',
          valueField: 'value',
          period: 'day',
        })
      );

      expect(result.current.xAxis).toBeTruthy();
      expect(result.current.series).toBeTruthy();
    });

    it('handles grouped time series', () => {
      const { result } = renderHook(() =>
        useTimeSeriesTransform({
          data: [
            { date: '2024-01-01', value: 100, category: 'A' },
            { date: '2024-01-01', value: 150, category: 'B' },
          ],
          dateField: 'date',
          valueField: 'value',
          groupField: 'category',
          period: 'day',
        })
      );

      expect(result.current.series).toHaveLength(2);
    });
  });
});
