/**
 * 生成唯一标识符
 * 用于生成图表ID等需要唯一标识的场景
 * @returns 唯一标识符字符串
 */
export function uuid(): string {
  // 使用 crypto API 生成加密安全的 UUID
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  
  // 回退：使用 Math.random() + 时间戳混合
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomPart}-${Math.random().toString(36).substring(2, 10)}`;
}

/**
 * 生成简短的唯一标识符
 * 适用于图表ID等不需要完整UUID的场景
 * @returns 简短的唯一标识符
 */
export function shortId(): string {
  return Math.random().toString(36).substring(2, 10);
}

/**
 * 生成带有前缀的唯一标识符
 * @param prefix 前缀字符串
 * @returns 带前缀的唯一标识符
 */
export function prefixedId(prefix: string): string {
  return `${prefix}-${shortId()}`;
}
