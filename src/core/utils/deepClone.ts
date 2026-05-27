/**
 * Hand-written deep clone utility for ECharts option objects.
 * Handles all JS types, circular references, and preserves function references.
 */
export function deepClone<T>(value: T, seen?: WeakMap<object, unknown>): T {
  // primitives, null, undefined
  if (value === null || value === undefined) return value;
  if (typeof value !== 'object' && typeof value !== 'function') return value;
  // preserve function references
  if (typeof value === 'function') return value;

  // circular reference handling
  if (!seen) seen = new WeakMap();
  if (seen.has(value as object)) return seen.get(value as object) as T;

  // Date
  if (value instanceof Date) {
    const d = new Date(value.getTime());
    seen.set(value as object, d);
    return d as unknown as T;
  }

  // RegExp
  if (value instanceof RegExp) {
    const r = new RegExp(value.source, value.flags);
    seen.set(value as object, r);
    return r as unknown as T;
  }

  // Map
  if (value instanceof Map) {
    const m = new Map();
    seen.set(value as object, m);
    value.forEach((v, k) => {
      m.set(deepClone(k, seen), deepClone(v, seen));
    });
    return m as unknown as T;
  }

  // Set
  if (value instanceof Set) {
    const s = new Set();
    seen.set(value as object, s);
    value.forEach((v) => {
      s.add(deepClone(v, seen));
    });
    return s as unknown as T;
  }

  // Array
  if (Array.isArray(value)) {
    const arr: unknown[] = [];
    seen.set(value as object, arr);
    for (let i = 0; i < value.length; i++) {
      arr[i] = deepClone(value[i], seen);
    }
    return arr as unknown as T;
  }

  // Plain object
  const clone = {} as Record<string, unknown>;
  seen.set(value as object, clone);
  for (const key of Object.keys(value as object)) {
    clone[key] = deepClone((value as Record<string, unknown>)[key], seen);
  }
  return clone as T;
}

/**
 * Deep merge source into target. Returns a new object.
 * Arrays are replaced, not merged. Objects are merged recursively.
 */
export function deepMerge<T extends Record<string, unknown>, U extends Record<string, unknown>>(
  target: T,
  source: U,
): T & U {
  const result: Record<string, unknown> = {};

  // Copy all target keys
  for (const key of Object.keys(target)) {
    result[key] = deepClone(target[key]);
  }

  // Merge source keys
  for (const key of Object.keys(source)) {
    const tVal = result[key];
    const sVal = source[key];

    if (
      tVal !== null &&
      tVal !== undefined &&
      sVal !== null &&
      sVal !== undefined &&
      typeof tVal === 'object' &&
      typeof sVal === 'object' &&
      !Array.isArray(tVal) &&
      !Array.isArray(sVal) &&
      !(tVal instanceof Date) &&
      !(tVal instanceof RegExp) &&
      !(tVal instanceof Map) &&
      !(tVal instanceof Set) &&
      !(sVal instanceof Date) &&
      !(sVal instanceof RegExp) &&
      !(sVal instanceof Map) &&
      !(sVal instanceof Set)
    ) {
      result[key] = deepMerge(
        tVal as Record<string, unknown>,
        sVal as Record<string, unknown>,
      );
    } else {
      result[key] = deepClone(sVal);
    }
  }

  return result as T & U;
}
