/**
 * 手写深拷贝工具函数
 * 支持所有 JavaScript 类型，处理循环引用，保留函数引用
 *
 * 不使用 JSON.parse/stringify、structuredClone 或任何第三方库
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyValue = any;

/**
 * 深拷贝一个值
 * - 原始类型直接返回
 * - 函数返回原引用（不拷贝）
 * - Date / RegExp / Map / Set 正确克隆
 * - 处理循环引用
 * - 普通对象和数组递归深拷贝
 *
 * @param value 要拷贝的值
 * @returns 深拷贝后的值
 */
export function deepClone<T>(value: T): T {
  return _deepClone(value, new WeakMap());
}

function _deepClone<T>(value: T, seen: WeakMap<object, unknown>): T {
  // null / undefined
  if (value === null || value === undefined) {
    return value;
  }

  // 原始类型（string, number, boolean, symbol, bigint）
  if (typeof value !== 'object') {
    // typeof 'function' 也需要处理 —— 函数直接返回引用
    return value;
  }

  // 从这里开始 value 一定是 object（含 function、array 等）

  // 循环引用检测
  if (seen.has(value as object)) {
    return seen.get(value as object) as T;
  }

  // Date
  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  // RegExp
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T;
  }

  // Map
  if (value instanceof Map) {
    const mapClone = new Map();
    seen.set(value as object, mapClone);
    value.forEach((v, k) => {
      mapClone.set(_deepClone(k, seen), _deepClone(v, seen));
    });
    return mapClone as T;
  }

  // Set
  if (value instanceof Set) {
    const setClone = new Set();
    seen.set(value as object, setClone);
    value.forEach((v) => {
      setClone.add(_deepClone(v, seen));
    });
    return setClone as T;
  }

  // Array
  if (Array.isArray(value)) {
    const arrClone: unknown[] = [];
    seen.set(value, arrClone);
    for (let i = 0; i < value.length; i++) {
      arrClone[i] = _deepClone(value[i], seen);
    }
    return arrClone as T;
  }

  // ArrayBuffer
  if (value instanceof ArrayBuffer) {
    return value.slice(0) as T;
  }

  // TypedArray (Uint8Array, Float32Array, etc.)
  if (ArrayBuffer.isView(value)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const TypedArrayConstructor = (value as any).constructor;
    return new TypedArrayConstructor(value as ArrayBufferView) as T;
  }

  // 普通对象 —— 包括 ECharts option 这类复杂嵌套对象
  const objClone: Record<string, unknown> = Object.create(Object.getPrototypeOf(value));
  seen.set(value as object, objClone);

  // 拷贝所有自有属性（包括不可枚举的和 Symbol 键的）
  const keys = Reflect.ownKeys(value as object);
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(value as object, key);
    if (descriptor) {
      if ('value' in descriptor) {
        Object.defineProperty(objClone, key, {
          ...descriptor,
          value: _deepClone(descriptor.value, seen),
        });
      } else {
        // getter / setter —— 直接拷贝描述符
        Object.defineProperty(objClone, key, descriptor);
      }
    }
  }

  return objClone as T;
}

/**
 * 深度合并对象（source 的属性合并到 target）
 * - 不修改 target 和 source，返回新对象
 * - 递归合并嵌套对象
 * - 数组直接替换（不做合并）
 * - 函数直接替换
 *
 * @param target 目标对象
 * @param source 源对象
 * @returns 合并后的新对象
 */
export function deepMerge<T extends Record<string, unknown>, S extends Record<string, unknown>>(
  target: T,
  source: S
): T & S {
  const result: Record<string, unknown> = deepClone(target);

  for (const key of Object.keys(source)) {
    const targetVal = result[key];
    const sourceVal = (source as Record<string, unknown>)[key];

    if (
      isPlainObject(targetVal) &&
      isPlainObject(sourceVal)
    ) {
      result[key] = deepMerge(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>
      );
    } else {
      result[key] = deepClone(sourceVal);
    }
  }

  return result as T & S;
}

/**
 * 判断一个值是否是纯对象（plain object）
 * 排除 null、数组、Date、RegExp 等
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
