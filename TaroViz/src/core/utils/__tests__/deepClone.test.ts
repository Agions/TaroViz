import { deepClone, deepMerge } from '../deepClone';

describe('deepClone', () => {
  // ========== 原始类型 ==========
  describe('primitives', () => {
    it('should clone null', () => {
      expect(deepClone(null)).toBe(null);
    });

    it('should clone undefined', () => {
      expect(deepClone(undefined)).toBe(undefined);
    });

    it('should clone numbers', () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone(0)).toBe(0);
      expect(deepClone(-1)).toBe(-1);
      expect(deepClone(3.14)).toBe(3.14);
      expect(deepClone(Infinity)).toBe(Infinity);
      expect(deepClone(NaN)).toBeNaN();
    });

    it('should clone strings', () => {
      expect(deepClone('hello')).toBe('hello');
      expect(deepClone('')).toBe('');
    });

    it('should clone booleans', () => {
      expect(deepClone(true)).toBe(true);
      expect(deepClone(false)).toBe(false);
    });

    it('should clone bigint', () => {
      expect(deepClone(BigInt(123))).toBe(BigInt(123));
    });

    it('should clone symbol by reference', () => {
      const s = Symbol('test');
      expect(deepClone(s)).toBe(s);
    });
  });

  // ========== 函数 ==========
  describe('functions', () => {
    it('should return the same function reference', () => {
      const fn = (x: number) => x * 2;
      expect(deepClone(fn)).toBe(fn);
    });

    it('should preserve function in object', () => {
      const formatter = (params: { name: string }) => params.name;
      const obj = { formatter, name: 'test' };
      const cloned = deepClone(obj);
      expect(cloned.formatter).toBe(formatter);
      expect(cloned.name).toBe('test');
    });
  });

  // ========== Date ==========
  describe('Date', () => {
    it('should clone Date', () => {
      const date = new Date('2026-01-01');
      const cloned = deepClone(date);
      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
      expect(cloned.getTime()).toBe(date.getTime());
    });
  });

  // ========== RegExp ==========
  describe('RegExp', () => {
    it('should clone RegExp', () => {
      const re = /hello/gi;
      const cloned = deepClone(re);
      expect(cloned).not.toBe(re);
      expect(cloned.source).toBe('hello');
      expect(cloned.flags).toBe('gi');
    });
  });

  // ========== Map ==========
  describe('Map', () => {
    it('should clone Map with primitive keys', () => {
      const map = new Map([['a', 1], ['b', 2]]);
      const cloned = deepClone(map);
      expect(cloned).not.toBe(map);
      expect(cloned.get('a')).toBe(1);
      expect(cloned.size).toBe(2);
    });

    it('should clone Map with object keys', () => {
      const key = { id: 1 };
      const map = new Map([[key, 'value']]);
      const cloned = deepClone(map);
      const clonedKey = [...cloned.keys()][0];
      expect(clonedKey).not.toBe(key);
      expect(clonedKey).toEqual(key);
    });
  });

  // ========== Set ==========
  describe('Set', () => {
    it('should clone Set', () => {
      const set = new Set([1, 2, 3]);
      const cloned = deepClone(set);
      expect(cloned).not.toBe(set);
      expect(cloned.size).toBe(3);
      expect([...cloned]).toEqual([1, 2, 3]);
    });

    it('should deep clone objects inside Set', () => {
      const obj = { x: 1 };
      const set = new Set([obj]);
      const cloned = deepClone(set);
      const clonedObj = [...cloned][0];
      expect(clonedObj).not.toBe(obj);
      expect(clonedObj).toEqual(obj);
    });
  });

  // ========== 数组 ==========
  describe('arrays', () => {
    it('should clone simple arrays', () => {
      const arr = [1, 2, 3];
      const cloned = deepClone(arr);
      expect(cloned).not.toBe(arr);
      expect(cloned).toEqual([1, 2, 3]);
    });

    it('should clone nested arrays', () => {
      const arr = [[1, 2], [3, [4, 5]]];
      const cloned = deepClone(arr);
      expect(cloned).not.toBe(arr);
      expect(cloned[0]).not.toBe(arr[0]);
      expect(cloned).toEqual(arr);
    });

    it('should clone arrays with mixed types', () => {
      const arr = [1, 'two', null, { three: 3 }, [4]];
      const cloned = deepClone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned[3]).not.toBe(arr[3]);
    });
  });

  // ========== 普通对象 ==========
  describe('plain objects', () => {
    it('should clone simple objects', () => {
      const obj = { a: 1, b: 'hello', c: true };
      const cloned = deepClone(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned).toEqual(obj);
    });

    it('should clone nested objects', () => {
      const obj = { a: { b: { c: 1 } } };
      const cloned = deepClone(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.a).not.toBe(obj.a);
      expect(cloned.a.b).not.toBe(obj.a.b);
      expect(cloned.a.b.c).toBe(1);
    });

    it('should handle empty objects', () => {
      expect(deepClone({})).toEqual({});
    });

    it('should preserve prototype chain', () => {
      class MyClass {
        value = 42;
      }
      const obj = new MyClass();
      const cloned = deepClone(obj);
      expect(cloned).toBeInstanceOf(MyClass);
      expect(cloned.value).toBe(42);
    });
  });

  // ========== 循环引用 ==========
  describe('circular references', () => {
    it('should handle self-referencing object', () => {
      const obj: Record<string, unknown> = { name: 'root' };
      obj.self = obj;
      const cloned = deepClone(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.self).toBe(cloned);
      expect(cloned.name).toBe('root');
    });

    it('should handle mutual references', () => {
      const a: Record<string, unknown> = { name: 'a' };
      const b: Record<string, unknown> = { name: 'b' };
      a.ref = b;
      b.ref = a;
      const clonedA = deepClone(a);
      expect(clonedA).not.toBe(a);
      expect(clonedA.ref).not.toBe(b);
      expect((clonedA.ref as Record<string, unknown>).ref).toBe(clonedA);
    });
  });

  // ========== ECharts option 样式对象 ==========
  describe('ECharts-like options', () => {
    it('should clone a complete ECharts option with formatter functions', () => {
      const formatter = (params: { name: string; value: number }) =>
        `<b>${params.name}</b>: ${params.value}`;

      const option = {
        title: { text: 'Sales', subtext: '2026' },
        tooltip: { trigger: 'item' as const, formatter },
        xAxis: {
          type: 'category' as const,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        },
        yAxis: { type: 'value' as const },
        series: [
          {
            name: 'Sales',
            type: 'bar' as const,
            data: [120, 200, 150, 80, 70],
            emphasis: {
              itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' },
            },
          },
        ],
      };

      const cloned = deepClone(option);

      // 结构相等
      expect(cloned).toEqual(option);

      // 但是新引用
      expect(cloned).not.toBe(option);
      expect(cloned.series).not.toBe(option.series);
      expect(cloned.series[0]).not.toBe(option.series[0]);
      expect(cloned.series[0].data).not.toBe(option.series[0].data);

      // formatter 函数是同一个引用
      expect(cloned.tooltip.formatter).toBe(formatter);
    });

    it('should clone option with null/undefined values', () => {
      const option = {
        title: null,
        subtitle: undefined,
        series: [{ data: [1, 2, 3] }],
      };
      const cloned = deepClone(option);
      expect(cloned.title).toBe(null);
      expect(cloned.subtitle).toBe(undefined);
      expect(cloned.series[0].data).toEqual([1, 2, 3]);
      expect(cloned.series[0].data).not.toBe(option.series[0].data);
    });
  });

  // ========== 边界情况 ==========
  describe('edge cases', () => {
    it('should handle deeply nested objects without stack overflow', () => {
      // 创建一个 1000 层深的对象
      let obj: Record<string, unknown> = { value: 'leaf' };
      for (let i = 0; i < 1000; i++) {
        obj = { child: obj };
      }
      const cloned = deepClone(obj);
      // 验证最深层
      let current: unknown = cloned;
      for (let i = 0; i < 1000; i++) {
        current = (current as Record<string, unknown>).child;
      }
      expect((current as Record<string, unknown>).value).toBe('leaf');
    });

    it('should handle empty values gracefully', () => {
      expect(deepClone(0)).toBe(0);
      expect(deepClone('')).toBe('');
      expect(deepClone(false)).toBe(false);
      expect(deepClone(null)).toBe(null);
    });

    it('should not copy non-enumerable properties by default but does via Reflect', () => {
      const obj = {};
      Object.defineProperty(obj, 'hidden', {
        value: 42,
        enumerable: false,
        writable: true,
        configurable: true,
      });
      const cloned = deepClone(obj);
      // Reflect.ownKeys copies non-enumerable too
      expect((cloned as Record<string, unknown>).hidden).toBe(42);
    });
  });
});

describe('deepMerge', () => {
  it('should merge simple objects', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const result = deepMerge(target, source);
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
    // 原始对象不变
    expect(target).toEqual({ a: 1, b: 2 });
  });

  it('should merge nested objects deeply', () => {
    const target = {
      tooltip: { trigger: 'item' },
      series: [{ type: 'bar' }],
    };
    const source = {
      tooltip: { formatter: '{b}: {c}' },
      title: { text: 'Hello' },
    };
    const result = deepMerge(target, source);
    expect(result.tooltip.trigger).toBe('item');
    expect(result.tooltip.formatter).toBe('{b}: {c}');
    expect(result.title.text).toBe('Hello');
  });

  it('should replace arrays instead of merging', () => {
    const target = { data: [1, 2, 3] };
    const source = { data: [4, 5] };
    const result = deepMerge(target, source);
    expect(result.data).toEqual([4, 5]);
  });

  it('should not mutate source', () => {
    const source = { nested: { val: 1 } };
    const target = { nested: { val: 2 } };
    deepMerge(target, source);
    expect(source.nested.val).toBe(1);
  });
});
