import { deepClone, deepMerge } from '../deepClone';

describe('deepClone', () => {
  // Primitives
  it('clones primitives', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(true)).toBe(true);
    expect(deepClone(false)).toBe(false);
    expect(deepClone(0)).toBe(0);
    expect(deepClone(-1)).toBe(-1);
    expect(deepClone(3.14)).toBe(3.14);
  });

  it('handles null and undefined', () => {
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
  });

  // Objects
  it('clones plain objects', () => {
    const obj = { a: 1, b: 'two', c: true };
    const clone = deepClone(obj);
    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
  });

  it('clones nested objects', () => {
    const obj = { a: { b: { c: { d: 42 } } } };
    const clone = deepClone(obj);
    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
    expect(clone.a).not.toBe(obj.a);
    expect(clone.a.b).not.toBe(obj.a.b);
  });

  // Arrays
  it('clones arrays', () => {
    const arr = [1, 2, 3, [4, 5]];
    const clone = deepClone(arr);
    expect(clone).toEqual(arr);
    expect(clone).not.toBe(arr);
    expect(clone[3]).not.toBe(arr[3]);
  });

  it('clones arrays of objects', () => {
    const arr = [{ a: 1 }, { b: 2 }];
    const clone = deepClone(arr);
    expect(clone).toEqual(arr);
    expect(clone[0]).not.toBe(arr[0]);
  });

  // Date
  it('clones Date objects', () => {
    const date = new Date('2024-01-15');
    const clone = deepClone(date);
    expect(clone).toEqual(date);
    expect(clone).not.toBe(date);
    expect(clone.getTime()).toBe(date.getTime());
  });

  // RegExp
  it('clones RegExp objects', () => {
    const re = /foo/gi;
    const clone = deepClone(re);
    expect(clone.source).toBe('foo');
    expect(clone.flags).toBe('gi');
    expect(clone).not.toBe(re);
  });

  // Functions
  it('preserves function references', () => {
    const fn = (x: number) => x * 2;
    expect(deepClone(fn)).toBe(fn);
  });

  it('preserves nested function references', () => {
    const fn = () => 'hello';
    const obj = { formatter: fn, nested: { callback: fn } };
    const clone = deepClone(obj);
    expect(clone.formatter).toBe(fn);
    expect(clone.nested.callback).toBe(fn);
    expect(clone).not.toBe(obj);
    expect(clone.nested).not.toBe(obj.nested);
  });

  // Map
  it('clones Map objects', () => {
    const map = new Map<string, number>([
      ['a', 1],
      ['b', 2],
    ]);
    const clone = deepClone(map);
    expect(clone).not.toBe(map);
    expect(clone.get('a')).toBe(1);
    expect(clone.get('b')).toBe(2);
    expect(clone.size).toBe(2);
  });

  it('clones Map with object keys and values', () => {
    const key = { id: 1 };
    const val = { name: 'test' };
    const map = new Map([[key, val]]);
    const clone = deepClone(map);
    expect(clone).not.toBe(map);
    // Keys are cloned, so we can't look up with the original key
    const clonedEntries = Array.from(clone.entries());
    expect(clonedEntries).toHaveLength(1);
    expect(clonedEntries[0][0]).toEqual(key);
    expect(clonedEntries[0][0]).not.toBe(key);
    expect(clonedEntries[0][1]).toEqual(val);
    expect(clonedEntries[0][1]).not.toBe(val);
  });

  // Set
  it('clones Set objects', () => {
    const set = new Set([1, 2, 3]);
    const clone = deepClone(set);
    expect(clone).not.toBe(set);
    expect(clone.size).toBe(3);
    expect(clone.has(1)).toBe(true);
    expect(clone.has(2)).toBe(true);
    expect(clone.has(3)).toBe(true);
  });

  it('clones Set with object values', () => {
    const obj = { a: 1 };
    const set = new Set([obj]);
    const clone = deepClone(set);
    const clonedValues = Array.from(clone.values());
    expect(clonedValues[0]).toEqual(obj);
    expect(clonedValues[0]).not.toBe(obj);
  });

  // Circular references
  it('handles circular references in objects', () => {
    const obj: Record<string, unknown> = { a: 1 };
    obj.self = obj;
    const clone = deepClone(obj);
    expect(clone.a).toBe(1);
    expect(clone.self).toBe(clone);
    expect(clone).not.toBe(obj);
  });

  it('handles circular references in arrays', () => {
    const arr: unknown[] = [1, 2];
    arr.push(arr);
    const clone = deepClone(arr);
    expect(clone[0]).toBe(1);
    expect(clone[1]).toBe(2);
    expect(clone[2]).toBe(clone);
    expect(clone).not.toBe(arr);
  });

  it('handles cross-reference between objects', () => {
    const shared = { value: 42 };
    const obj = { a: shared, b: shared };
    const clone = deepClone(obj);
    expect(clone.a).toEqual(shared);
    expect(clone.b).toEqual(shared);
    // Both references should point to the same clone
    expect(clone.a).toBe(clone.b);
    expect(clone.a).not.toBe(shared);
  });

  // ECharts-like option objects
  it('clones ECharts-like option objects', () => {
    const formatter = (params: { value: number }) => `${params.value}%`;
    const options = {
      title: {
        text: 'Sales',
        subtext: '2024',
      },
      tooltip: {
        trigger: 'axis' as const,
        formatter,
      },
      xAxis: {
        type: 'category' as const,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      },
      yAxis: {
        type: 'value' as const,
      },
      series: [
        {
          name: 'Sales',
          type: 'line' as const,
          data: [150, 230, 224, 218, 135],
          label: {
            show: true,
            formatter: (params: { value: number }) => `${params.value}`,
          },
        },
      ],
    };

    const clone = deepClone(options);

    // Structure equality
    expect(clone).toEqual(options);
    // Deep copy
    expect(clone).not.toBe(options);
    expect(clone.title).not.toBe(options.title);
    expect(clone.series).not.toBe(options.series);
    expect(clone.series[0]).not.toBe(options.series[0]);
    // Function preserved
    expect(clone.tooltip.formatter).toBe(formatter);
    expect(clone.series[0].label.formatter).toBe(options.series[0].label.formatter);
  });

  // Mixed types
  it('clones complex mixed structures', () => {
    const obj = {
      str: 'hello',
      num: 42,
      bool: true,
      nil: null,
      undef: undefined,
      date: new Date('2024-06-01'),
      regex: /test/gi,
      arr: [1, [2, 3], { a: 4 }],
      fn: () => 'test',
      map: new Map([['key', { nested: true }]]),
      set: new Set([{ x: 1 }, { x: 2 }]),
      nested: {
        deep: {
          deeper: {
            value: 'bottom',
          },
        },
      },
    };

    const clone = deepClone(obj);

    expect(clone.str).toBe('hello');
    expect(clone.num).toBe(42);
    expect(clone.bool).toBe(true);
    expect(clone.nil).toBe(null);
    expect(clone.undef).toBe(undefined);
    expect(clone.date).toEqual(obj.date);
    expect(clone.date).not.toBe(obj.date);
    expect(clone.regex.source).toBe('test');
    expect(clone.regex).not.toBe(obj.regex);
    expect(clone.arr).toEqual([1, [2, 3], { a: 4 }]);
    expect(clone.arr).not.toBe(obj.arr);
    expect(clone.fn).toBe(obj.fn);
    expect(clone.map).not.toBe(obj.map);
    expect(clone.set).not.toBe(obj.set);
    expect(clone.nested.deep.deeper.value).toBe('bottom');
    expect(clone.nested).not.toBe(obj.nested);
  });
});

describe('deepMerge', () => {
  it('merges flat objects', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const result = deepMerge(target, source);
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('merges nested objects recursively', () => {
    const target = { a: { x: 1, y: 2 }, b: 1 };
    const source = { a: { y: 3, z: 4 } };
    const result = deepMerge(target, source);
    expect(result).toEqual({ a: { x: 1, y: 3, z: 4 }, b: 1 });
  });

  it('replaces arrays instead of merging them', () => {
    const target = { arr: [1, 2, 3] };
    const source = { arr: [4, 5] };
    const result = deepMerge(target, source);
    expect(result.arr).toEqual([4, 5]);
  });

  it('replaces primitives with source values', () => {
    const target = { a: 1, b: 'old' };
    const source = { a: 2, b: 'new' };
    const result = deepMerge(target, source);
    expect(result).toEqual({ a: 2, b: 'new' });
  });

  it('preserves function references from source', () => {
    const fn = () => 'hello';
    const target = { a: 1 };
    const source = { formatter: fn };
    const result = deepMerge(target, source);
    expect(result.formatter).toBe(fn);
  });

  it('does not mutate target or source', () => {
    const target = { a: { x: 1 } };
    const source = { a: { y: 2 } };
    deepMerge(target, source);
    expect(target).toEqual({ a: { x: 1 } });
    expect(source).toEqual({ a: { y: 2 } });
  });

  it('merges ECharts-like option objects', () => {
    const target = {
      title: { text: 'Chart' },
      tooltip: { trigger: 'axis' as const },
      series: [{ type: 'line' as const, data: [1, 2, 3] }],
    };
    const source = {
      title: { subtext: 'Sub' },
      tooltip: { formatter: (p: { value: number }) => `${p.value}%` },
    };
    const result = deepMerge(target, source);
    expect(result.title).toEqual({ text: 'Chart', subtext: 'Sub' });
    expect(result.tooltip.trigger).toBe('axis');
    expect(typeof result.tooltip.formatter).toBe('function');
    expect(result.series).toEqual([{ type: 'line', data: [1, 2, 3] }]);
  });
});
