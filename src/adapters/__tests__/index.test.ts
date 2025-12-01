import { PlatformType } from '../../core';
import { detectPlatform, getEnv, getAdapter } from '../index';

// Mock dependencies
jest.mock('../h5', () => ({
  default: {
    create: jest.fn(() => ({
      init: jest.fn(),
      setOption: jest.fn(),
      resize: jest.fn(),
      dispose: jest.fn(),
    })),
  },
}));

jest.mock('../weapp', () => ({
  default: {
    create: jest.fn(() => ({
      init: jest.fn(),
      setOption: jest.fn(),
      resize: jest.fn(),
      dispose: jest.fn(),
    })),
  },
}));

describe('Adapter Functions', () => {
  describe('getEnv', () => {
    it('should return h5 for browser environment', () => {
      const env = getEnv();
      expect(env).toBe('h5');
    });
  });

  describe('getAdapter', () => {
    it('should return adapter instance for browser environment', () => {
      const adapter = getAdapter({});
      expect(adapter).toBeDefined();
      expect(typeof adapter.init).toBe('function');
      expect(typeof adapter.setOption).toBe('function');
    });

    it('should return adapter instance with custom options', () => {
      const mockOptions = {
        width: 500,
        height: 300,
        theme: 'dark',
        renderer: 'canvas' as const,
      };

      const adapter = getAdapter(mockOptions);
      expect(adapter).toBeDefined();
      expect(typeof adapter.init).toBe('function');
    });
  });

  describe('detectPlatform', () => {
    it('should return H5 by default', () => {
      const platform = detectPlatform();
      expect(platform).toBe(PlatformType.H5);
    });
  });

  describe('Cross-Platform Compatibility', () => {
    it('should have consistent interface across all platforms', () => {
      const adapter = getAdapter({});

      // 确保所有平台的适配器都有相同的方法接口
      const requiredMethods = ['init', 'setOption', 'resize', 'dispose'];

      requiredMethods.forEach(method => {
        expect(typeof adapter[method as keyof typeof adapter]).toBe('function');
      });
    });

    it('should handle different option types across platforms', () => {
      // 测试不同类型的选项
      const testOptions = [
        { width: 500, height: 300 },
        { theme: 'dark' },
        { renderer: 'canvas' as const },
        { renderer: 'svg' as const },
      ];

      testOptions.forEach(options => {
        const adapter = getAdapter(options);
        expect(adapter).toBeDefined();
      });
    });
  });
});
