import { deepMerge, debounce, throttle } from '../index';

describe('Common Utils', () => {
  describe('deepMerge', () => {
    it('should merge two objects deeply', () => {
      const target = { a: 1, b: { c: 2 } };
      const source = { b: { d: 3 }, e: 4 };
      const result = deepMerge(target, source);

      expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 });
    });

    it('should return the target object when source is empty', () => {
      const target = { a: 1, b: { c: 2 } };
      const source = {};
      const result = deepMerge(target, source);

      expect(result).toEqual(target);
    });
  });

  describe('debounce', () => {
    it('should debounce a function call', done => {
      let count = 0;
      const debouncedFn = debounce(() => {
        count++;
        done();
      }, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(count).toBe(0);
    });
  });

  describe('throttle', () => {
    it('should throttle a function call', () => {
      let count = 0;
      const throttledFn = throttle(() => {
        count++;
      }, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      expect(count).toBe(1);
    });
  });
});
