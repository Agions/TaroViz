/**
 * 生成唯一标识符
 * 用于生成图表ID等需要唯一标识的场景
 * @returns 唯一标识符字符串
 */
export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
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