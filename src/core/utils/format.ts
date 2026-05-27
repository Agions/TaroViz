/**
 * 格式化数值
 * @param value 要格式化的数值
 * @param digits 小数位数
 * @param options 配置选项
 * @returns 格式化后的字符串
 */
export function formatNumber(
  value: number,
  digits: number = 2,
  options: {
    useGrouping?: boolean;
    locale?: string;
  } = {}
): string {
  const { useGrouping = true, locale = 'zh-CN' } = options;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping,
  }).format(value);
}

/**
 * 获取颜色的对比色
 * @param color 十六进制颜色值
 * @returns 对比色
 */
export function getContrastColor(color: string): string {
  // 移除#前缀
  const hex = color.replace('#', '');

  // 转换为RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // 计算亮度
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // 根据亮度返回黑色或白色
  return brightness > 128 ? '#000000' : '#FFFFFF';
}
