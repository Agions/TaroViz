/**
 * UUID生成工具
 */

/**
 * 生成随机UUID v4
 * @returns UUID字符串
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * 生成短ID
 * @param length ID长度，默认为8
 * @param chars 可选的字符集
 * @returns 生成的短ID
 */
export function generateShortId(length = 8, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
  // 参数验证
  if (length <= 0) length = 8;
  if (length > 36) length = 36; // 设置最大长度限制
  
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
} 