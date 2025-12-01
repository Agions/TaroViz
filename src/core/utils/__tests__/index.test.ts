import {
  deepMerge,
  debounce,
  throttle,
  getEnvironment,
  formatNumber,
  getContrastColor,
  uuid,
  shortId,
  prefixedId,
} from '../index';

describe('Data Processing Utilities', () => {
  describe('deepMerge', () => {
    it('should merge two objects', () => {
      const target = { a: 1, b: { c: 2 } };
      const source = { b: { d: 3 }, e: 4 };
      const result = deepMerge(target, source);

      expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 });
    });

    it('should overwrite primitive values', () => {
      const target = { a: 1, b: 'original' };
      const source = { a: 2, b: 'updated' };
      const result = deepMerge(target, source);

      expect(result).toEqual({ a: 2, b: 'updated' });
    });

    it('should preserve nested objects when source has no matching key', () => {
      const target = { a: { b: { c: 1 } } };
      const source = { d: 2 };
      const result = deepMerge(target, source);

      expect(result).toEqual({ a: { b: { c: 1 } }, d: 2 });
    });

    it('should return target when source is empty', () => {
      const target = { a: 1, b: 2 };
      const source = {};
      const result = deepMerge(target, source);

      expect(result).toEqual(target);
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();

    it('should delay execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(50);
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(50);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should reset timer when called again before delay', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      jest.advanceTimersByTime(50);
      debouncedFn();
      jest.advanceTimersByTime(50);
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(50);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments correctly', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('arg1', 2, { key: 'value' });
      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledWith('arg1', 2, { key: 'value' });
    });
  });

  describe('throttle', () => {
    jest.useFakeTimers();

    it('should limit execution to once per interval', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should pass arguments correctly', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn('arg1', 2);
      expect(mockFn).toHaveBeenCalledWith('arg1', 2);
    });

    it('should execute immediately on first call', () => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('getEnvironment', () => {
    it('should detect environment correctly', () => {
      const env = getEnvironment();

      // In Jest test environment, it should be server-side
      expect(env).toHaveProperty('isServer');
      expect(env).toHaveProperty('isClient');
      expect(env).toHaveProperty('isWeapp');
      expect(env).toHaveProperty('isAlipay');
      expect(env).toHaveProperty('isWeb');
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with default options', () => {
      expect(formatNumber(1234.5678)).toBe('1,234.57');
    });

    it('should format numbers with custom decimal digits', () => {
      expect(formatNumber(1234.5678, 0)).toBe('1,235');
      expect(formatNumber(1234.5678, 4)).toBe('1,234.5678');
    });

    it('should format numbers without grouping', () => {
      expect(formatNumber(1234.5678, 2, { useGrouping: false })).toBe('1234.57');
    });

    it('should format numbers with different locales', () => {
      // US locale uses commas for thousands and dots for decimals
      expect(formatNumber(1234.5678, 2, { locale: 'en-US' })).toBe('1,234.57');

      // German locale uses dots for thousands and commas for decimals
      expect(formatNumber(1234.5678, 2, { locale: 'de-DE' })).toBe('1.234,57');
    });

    it('should handle zero correctly', () => {
      expect(formatNumber(0)).toBe('0.00');
      expect(formatNumber(0, 0)).toBe('0');
    });

    it('should handle negative numbers correctly', () => {
      expect(formatNumber(-1234.5678)).toBe('-1,234.57');
    });
  });

  describe('getContrastColor', () => {
    it('should return white for dark colors', () => {
      expect(getContrastColor('#000000')).toBe('#FFFFFF');
      expect(getContrastColor('#333333')).toBe('#FFFFFF');
      expect(getContrastColor('#1a1a1a')).toBe('#FFFFFF');
    });

    it('should return black for light colors', () => {
      expect(getContrastColor('#FFFFFF')).toBe('#000000');
      expect(getContrastColor('#EEEEEE')).toBe('#000000');
      expect(getContrastColor('#f0f0f0')).toBe('#000000');
    });

    it('should handle hex colors without # prefix', () => {
      expect(getContrastColor('000000')).toBe('#FFFFFF');
      expect(getContrastColor('FFFFFF')).toBe('#000000');
    });

    it('should handle medium colors', () => {
      // Test a color right at the threshold (128 brightness returns white)
      expect(getContrastColor('#808080')).toBe('#FFFFFF');
      // Test a slightly brighter color that should return black
      expect(getContrastColor('#818181')).toBe('#000000');
    });
  });

  describe('UUID Generation', () => {
    it('should generate unique UUIDs', () => {
      const id1 = uuid();
      const id2 = uuid();
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });

    it('should generate short IDs', () => {
      const id1 = shortId();
      const id2 = shortId();
      expect(id1).not.toBe(id2);
      expect(id1.length).toBe(8);
      expect(id1).toMatch(/^[0-9a-z]{8}$/);
    });

    it('should generate prefixed IDs', () => {
      const prefix = 'chart';
      const id = prefixedId(prefix);
      expect(id).toMatch(new RegExp(`^${prefix}-`));
      expect(id).toMatch(/^chart-[0-9a-z]{8}$/);
    });
  });
});
