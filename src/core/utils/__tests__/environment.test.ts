import { getEnvironment } from '../index';

describe('Cross-Platform Compatibility', () => {
  describe('Environment Detection', () => {
    it('should detect client environment correctly in Jest', () => {
      const env = getEnvironment();
      // In Jest test environment with jsdom, it should be client-side
      expect(env.isServer).toBe(false);
      expect(env.isClient).toBe(true);
    });

    it('should detect web environment when window is available', () => {
      // Mock window object for web environment
      const originalWindow = global.window;
      // Use any type assertion to bypass TypeScript checks for testing
      global.window = {} as any;

      // Mock wx and my objects as undefined to simulate web environment
      Object.defineProperty(global.window, 'wx', { value: undefined, writable: true });
      Object.defineProperty(global.window, 'my', { value: undefined, writable: true });

      const env = getEnvironment();
      expect(env.isWeb).toBe(true);
      expect(env.isWeapp).toBe(false);
      expect(env.isAlipay).toBe(false);

      // Restore original window object
      global.window = originalWindow;
    });

    it('should detect WeChat Mini Program environment correctly', () => {
      // Mock window object with wx for WeChat Mini Program environment
      const originalWindow = global.window;
      // Use any type assertion to bypass TypeScript checks for testing
      global.window = {} as any;

      Object.defineProperty(global.window, 'wx', {
        value: {
          getSystemInfoSync: jest.fn(),
        },
        writable: true,
      });
      Object.defineProperty(global.window, 'my', { value: undefined, writable: true });

      const env = getEnvironment();
      expect(env.isWeapp).toBe(true);
      expect(env.isWeb).toBe(false);
      expect(env.isAlipay).toBe(false);

      // Restore original window object
      global.window = originalWindow;
    });

    it('should detect Alipay Mini Program environment correctly', () => {
      // Mock window object with my for Alipay Mini Program environment
      const originalWindow = global.window;
      // Use any type assertion to bypass TypeScript checks for testing
      global.window = {} as any;

      Object.defineProperty(global.window, 'wx', { value: undefined, writable: true });
      Object.defineProperty(global.window, 'my', {
        value: {
          getSystemInfoSync: jest.fn(),
        },
        writable: true,
      });

      const env = getEnvironment();
      expect(env.isAlipay).toBe(true);
      expect(env.isWeb).toBe(false);
      expect(env.isWeapp).toBe(false);

      // Restore original window object
      global.window = originalWindow;
    });

    it('should return consistent environment object structure', () => {
      const env = getEnvironment();

      expect(env).toHaveProperty('isServer');
      expect(env).toHaveProperty('isClient');
      expect(env).toHaveProperty('isWeapp');
      expect(env).toHaveProperty('isAlipay');
      expect(env).toHaveProperty('isWeb');

      // All properties should be boolean values
      expect(typeof env.isServer).toBe('boolean');
      expect(typeof env.isClient).toBe('boolean');
      expect(typeof env.isWeapp).toBe('boolean');
      expect(typeof env.isAlipay).toBe('boolean');
      expect(typeof env.isWeb).toBe('boolean');
    });
  });
});
