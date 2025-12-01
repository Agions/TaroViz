import { renderHook } from '@testing-library/react';
import React from 'react';

import {
  useChart,
  useOption,
  useResize,
  useEvents,
  useLoading,
  useChartTheme,
  useChartData,
} from '../index';

// Mock dependencies
jest.mock('../../adapters', () => ({
  getAdapter: jest.fn(() => ({
    setComponent: jest.fn(),
    setOption: jest.fn(),
    resize: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
    dispose: jest.fn(),
  })),
}));

describe('React Hooks', () => {
  describe('useChart', () => {
    it('should initialize chart instance when ref is available', () => {
      const chartRef = { current: document.createElement('div') };

      const { result, rerender } = renderHook(
        (ref: React.RefObject<HTMLElement>) => useChart(ref),
        { initialProps: chartRef }
      );

      rerender(chartRef);

      expect(result.current[0]).not.toBeNull();
    });

    it('should return null when ref is not available', () => {
      const chartRef = { current: null };

      const { result } = renderHook((ref: React.RefObject<HTMLElement>) => useChart(ref), {
        initialProps: chartRef,
      });

      expect(result.current[0]).toBeNull();
    });
  });

  describe('useOption', () => {
    it('should call setOption when instance and option are provided', () => {
      const mockInstance = {
        setOption: jest.fn(),
      };

      const option = { xAxis: { type: 'category' }, yAxis: { type: 'value' }, series: [] };

      renderHook(
        ({ instance, option }: { instance: any; option: any }) => useOption(instance, option),
        {
          initialProps: { instance: mockInstance, option },
        }
      );

      expect(mockInstance.setOption).toHaveBeenCalledWith(option);
    });

    it('should not call setOption when instance is null', () => {
      const mockInstance = {
        setOption: jest.fn(),
      };

      const option = { xAxis: { type: 'category' }, yAxis: { type: 'value' }, series: [] };

      renderHook(
        ({ instance, option }: { instance: any; option: any }) => useOption(instance, option),
        {
          initialProps: { instance: null, option },
        }
      );

      expect(mockInstance.setOption).not.toHaveBeenCalled();
    });
  });

  describe('useResize', () => {
    it('should add resize event listener when instance is provided', () => {
      const mockInstance = {
        resize: jest.fn(),
      };

      // Create spies and save original methods
      const originalAddEventListener = window.addEventListener;
      const originalRemoveEventListener = window.removeEventListener;
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      const { unmount } = renderHook((instance: any) => useResize(instance), {
        initialProps: mockInstance,
      });

      expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

      // Restore original methods to ensure test isolation
      window.addEventListener = originalAddEventListener;
      window.removeEventListener = originalRemoveEventListener;
    });

    it('should not add resize event listener when instance is null', () => {
      // Create spies and save original methods
      const originalAddEventListener = window.addEventListener;
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

      // Render the hook with null instance
      renderHook((instance: any) => useResize(instance), { initialProps: null });

      // Check that the event listener was not added
      expect(addEventListenerSpy).not.toHaveBeenCalledWith('resize', expect.any(Function));

      // Restore original method to ensure test isolation
      window.addEventListener = originalAddEventListener;
    });
  });

  describe('useEvents', () => {
    it('should bind events when instance and events are provided', () => {
      const mockInstance = {
        on: jest.fn(),
        off: jest.fn(),
      };

      const events = {
        click: jest.fn(),
        mouseover: jest.fn(),
      };

      const { unmount } = renderHook(
        ({ instance, events }: { instance: any; events: any }) => useEvents(instance, events),
        {
          initialProps: { instance: mockInstance, events },
        }
      );

      expect(mockInstance.on).toHaveBeenCalledTimes(2);
      expect(mockInstance.on).toHaveBeenCalledWith('click', events.click);
      expect(mockInstance.on).toHaveBeenCalledWith('mouseover', events.mouseover);

      unmount();

      expect(mockInstance.off).toHaveBeenCalledTimes(2);
    });

    it('should not bind events when instance is null', () => {
      const mockInstance = {
        on: jest.fn(),
      };

      const events = {
        click: jest.fn(),
      };

      renderHook(
        ({ instance, events }: { instance: any; events: any }) => useEvents(instance, events),
        {
          initialProps: { instance: null, events },
        }
      );

      expect(mockInstance.on).not.toHaveBeenCalled();
    });
  });

  describe('useLoading', () => {
    it('should call showLoading when loading is true', () => {
      const mockInstance = {
        showLoading: jest.fn(),
        hideLoading: jest.fn(),
      };

      renderHook(
        ({ instance, loading }: { instance: any; loading: boolean }) =>
          useLoading(instance, loading),
        {
          initialProps: { instance: mockInstance, loading: true },
        }
      );

      expect(mockInstance.showLoading).toHaveBeenCalled();
      expect(mockInstance.hideLoading).not.toHaveBeenCalled();
    });

    it('should call hideLoading when loading is false', () => {
      const mockInstance = {
        showLoading: jest.fn(),
        hideLoading: jest.fn(),
      };

      renderHook(
        ({ instance, loading }: { instance: any; loading: boolean }) =>
          useLoading(instance, loading),
        {
          initialProps: { instance: mockInstance, loading: false },
        }
      );

      expect(mockInstance.hideLoading).toHaveBeenCalled();
      expect(mockInstance.showLoading).not.toHaveBeenCalled();
    });

    it('should not call loading methods when instance is null', () => {
      const mockInstance = {
        showLoading: jest.fn(),
        hideLoading: jest.fn(),
      };

      renderHook(
        ({ instance, loading }: { instance: any; loading: boolean }) =>
          useLoading(instance, loading),
        {
          initialProps: { instance: null, loading: true },
        }
      );

      expect(mockInstance.showLoading).not.toHaveBeenCalled();
      expect(mockInstance.hideLoading).not.toHaveBeenCalled();
    });
  });

  describe('useChartTheme', () => {
    it('should return dark theme when darkMode is true', () => {
      const { result } = renderHook(
        ({ theme, darkMode }: { theme: string; darkMode: boolean }) =>
          useChartTheme(theme, darkMode),
        {
          initialProps: { theme: 'default', darkMode: true },
        }
      );

      expect(result.current).toBe('dark');
    });

    it('should return original theme when darkMode is false', () => {
      const { result } = renderHook(
        ({ theme, darkMode }: { theme: string; darkMode: boolean }) =>
          useChartTheme(theme, darkMode),
        {
          initialProps: { theme: 'default', darkMode: false },
        }
      );

      expect(result.current).toBe('default');
    });

    it('should return theme object when theme is an object', () => {
      const customTheme = { backgroundColor: '#000' };

      const { result } = renderHook(
        ({ theme, darkMode }: { theme: Record<string, any>; darkMode: boolean }) =>
          useChartTheme(theme, darkMode),
        {
          initialProps: { theme: customTheme, darkMode: true },
        }
      );

      expect(result.current).toBe(customTheme);
    });
  });

  describe('useChartData', () => {
    it('should return transformed data when data is provided', () => {
      const data = [
        { name: 'A', value: 10 },
        { name: 'B', value: 20 },
      ];
      const transformer = jest.fn((d: any[]) => ({
        series: [{ data: d.map((item: any) => item.value) }],
      }));

      const { result } = renderHook(
        ({ data, transformer }: { data: any[]; transformer: (data: any[]) => any }) =>
          useChartData(data, transformer),
        {
          initialProps: { data, transformer },
        }
      );

      expect(transformer).toHaveBeenCalledWith(data);
      expect(result.current).toEqual({
        series: [{ data: [10, 20] }],
      });
    });

    it('should return empty series when data is empty', () => {
      const data: any[] = [];
      const transformer = jest.fn();

      const { result } = renderHook(
        ({ data, transformer }: { data: any[]; transformer: (data: any[]) => any }) =>
          useChartData(data, transformer),
        {
          initialProps: { data, transformer },
        }
      );

      expect(transformer).not.toHaveBeenCalled();
      expect(result.current).toEqual({ series: [] });
    });

    it('should return empty series when data is null', () => {
      const data = null as any;
      const transformer = jest.fn();

      const { result } = renderHook(
        ({ data, transformer }: { data: any[] | null; transformer: (data: any[]) => any }) =>
          useChartData(data, transformer),
        {
          initialProps: { data, transformer },
        }
      );

      expect(transformer).not.toHaveBeenCalled();
      expect(result.current).toEqual({ series: [] });
    });
  });
});
