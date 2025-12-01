/**
 * TaroViz 国际化工具
 * 提供日期、时间、数字、货币等格式化功能
 */

/**
 * 本地化配置选项
 */
export interface LocaleOptions {
  /**
   * 语言标签，如 'zh-CN', 'en-US', 'de-DE' 等
   */
  locale?: string;
  /**
   * 时区，如 'Asia/Shanghai', 'America/New_York' 等
   */
  timeZone?: string;
}

/**
 * 日期格式化选项
 */
export interface DateFormatOptions extends LocaleOptions {
  /**
   * 日期样式：'full', 'long', 'medium', 'short' 或自定义格式
   */
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  /**
   * 时间样式：'full', 'long', 'medium', 'short' 或自定义格式
   */
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
  /**
   * 是否包含年
   */
  year?: 'numeric' | '2-digit';
  /**
   * 是否包含月
   */
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  /**
   * 是否包含日
   */
  day?: 'numeric' | '2-digit';
  /**
   * 是否包含小时
   */
  hour?: 'numeric' | '2-digit';
  /**
   * 是否包含分钟
   */
  minute?: 'numeric' | '2-digit';
  /**
   * 是否包含秒
   */
  second?: 'numeric' | '2-digit';
  /**
   * 是否包含毫秒
   */
  fractionalSecondDigits?: 0 | 1 | 2 | 3;
  /**
   * 是否包含星期
   */
  weekday?: 'long' | 'short' | 'narrow';
  /**
   * 时间格式：'12hour' 或 '24hour'
   */
  hour12?: boolean;
}

/**
 * 货币格式化选项
 */
export interface CurrencyFormatOptions extends LocaleOptions {
  /**
   * 货币代码，如 'CNY', 'USD', 'EUR' 等
   */
  currency: string;
  /**
   * 货币显示样式：'symbol', 'narrowSymbol', 'code', 'name'
   */
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
  /**
   * 小数位数
   */
  digits?: number;
  /**
   * 是否使用分组分隔符
   */
  useGrouping?: boolean;
}

/**
 * 百分比格式化选项
 */
export interface PercentFormatOptions extends LocaleOptions {
  /**
   * 小数位数
   */
  digits?: number;
  /**
   * 是否使用分组分隔符
   */
  useGrouping?: boolean;
}

/**
 * 数字格式化选项
 */
export interface NumberFormatOptions extends LocaleOptions {
  /**
   * 小数位数
   */
  digits?: number;
  /**
   * 是否使用分组分隔符
   */
  useGrouping?: boolean;
  /**
   * 最小整数位数
   */
  minimumIntegerDigits?: number;
  /**
   * 最小小数位数
   */
  minimumFractionDigits?: number;
  /**
   * 最大小数位数
   */
  maximumFractionDigits?: number;
}

/**
 * 格式化日期时间
 * @param date 日期对象或时间戳
 * @param options 格式化选项
 * @returns 格式化后的日期时间字符串
 */
export function formatDateTime(
  date: Date | number | string,
  options: DateFormatOptions = {}
): string {
  const { locale = 'zh-CN', timeZone = 'Asia/Shanghai', ...formatOptions } = options;

  // 确保date是Date对象
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale, {
    timeZone,
    ...formatOptions,
  }).format(dateObj);
}

/**
 * 格式化日期
 * @param date 日期对象或时间戳
 * @param options 格式化选项
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | number | string, options: DateFormatOptions = {}): string {
  return formatDateTime(date, {
    ...options,
    timeStyle: undefined,
    hour: undefined,
    minute: undefined,
    second: undefined,
    fractionalSecondDigits: undefined,
  });
}

/**
 * 格式化时间
 * @param date 日期对象或时间戳
 * @param options 格式化选项
 * @returns 格式化后的时间字符串
 */
export function formatTime(date: Date | number | string, options: DateFormatOptions = {}): string {
  // 确保至少显示小时和分钟
  const timeOptions = {
    ...options,
    dateStyle: undefined,
    year: undefined,
    month: undefined,
    day: undefined,
    weekday: undefined,
    hour: options.hour || '2-digit',
    minute: options.minute || '2-digit',
  };

  return formatDateTime(date, timeOptions);
}

/**
 * 格式化货币
 * @param value 数值
 * @param options 格式化选项
 * @returns 格式化后的货币字符串
 */
export function formatCurrency(value: number, options: CurrencyFormatOptions): string {
  const {
    locale = 'zh-CN',
    currency,
    currencyDisplay = 'symbol',
    digits = 2,
    useGrouping = true,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping,
  }).format(value);
}

/**
 * 格式化百分比
 * @param value 数值（0-1之间）
 * @param options 格式化选项
 * @returns 格式化后的百分比字符串
 */
export function formatPercent(value: number, options: PercentFormatOptions = {}): string {
  const { locale = 'zh-CN', digits = 2, useGrouping = true } = options;

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping,
  }).format(value);
}

/**
 * 格式化数字
 * @param value 数值
 * @param options 格式化选项
 * @returns 格式化后的数字字符串
 */
export function formatNumber(value: number, options: NumberFormatOptions = {}): string {
  const { locale = 'zh-CN', digits = 2, useGrouping = true, ...formatOptions } = options;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping,
    ...formatOptions,
  }).format(value);
}

/**
 * 获取支持的语言列表
 * @returns 支持的语言列表
 */
export function getSupportedLocales(): string[] {
  return Intl.NumberFormat.supportedLocalesOf([
    'zh-CN',
    'zh-TW',
    'en-US',
    'en-GB',
    'ja-JP',
    'ko-KR',
    'fr-FR',
    'de-DE',
    'es-ES',
    'it-IT',
    'pt-BR',
    'ru-RU',
    'ar-SA',
    'hi-IN',
    'th-TH',
    'vi-VN',
    'id-ID',
    'ms-MY',
  ]);
}

/**
 * 获取当前系统语言
 * @returns 当前系统语言
 */
export function getSystemLocale(): string {
  if (typeof window !== 'undefined') {
    return window.navigator.language || 'zh-CN';
  }
  return 'zh-CN';
}

/**
 * 获取当前系统时区
 * @returns 当前系统时区
 */
export function getSystemTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * 本地化工具类
 */
export class Localization {
  private locale: string;
  private timeZone: string;

  /**
   * 构造函数
   * @param options 本地化配置
   */
  constructor(options: LocaleOptions = {}) {
    this.locale = options.locale || getSystemLocale();
    this.timeZone = options.timeZone || getSystemTimeZone();
  }

  /**
   * 设置语言
   * @param locale 语言标签
   */
  setLocale(locale: string): void {
    this.locale = locale;
  }

  /**
   * 获取当前语言
   * @returns 当前语言标签
   */
  getLocale(): string {
    return this.locale;
  }

  /**
   * 设置时区
   * @param timeZone 时区
   */
  setTimeZone(timeZone: string): void {
    this.timeZone = timeZone;
  }

  /**
   * 获取当前时区
   * @returns 当前时区
   */
  getTimeZone(): string {
    return this.timeZone;
  }

  /**
   * 格式化日期时间
   * @param date 日期对象或时间戳
   * @param options 格式化选项
   * @returns 格式化后的日期时间字符串
   */
  formatDateTime(
    date: Date | number | string,
    options: Omit<DateFormatOptions, 'locale' | 'timeZone'> = {}
  ): string {
    return formatDateTime(date, {
      ...options,
      locale: this.locale,
      timeZone: this.timeZone,
    });
  }

  /**
   * 格式化日期
   * @param date 日期对象或时间戳
   * @param options 格式化选项
   * @returns 格式化后的日期字符串
   */
  formatDate(
    date: Date | number | string,
    options: Omit<DateFormatOptions, 'locale' | 'timeZone'> = {}
  ): string {
    return formatDate(date, {
      ...options,
      locale: this.locale,
      timeZone: this.timeZone,
    });
  }

  /**
   * 格式化时间
   * @param date 日期对象或时间戳
   * @param options 格式化选项
   * @returns 格式化后的时间字符串
   */
  formatTime(
    date: Date | number | string,
    options: Omit<DateFormatOptions, 'locale' | 'timeZone'> = {}
  ): string {
    return formatTime(date, {
      ...options,
      locale: this.locale,
      timeZone: this.timeZone,
    });
  }

  /**
   * 格式化货币
   * @param value 数值
   * @param options 格式化选项
   * @returns 格式化后的货币字符串
   */
  formatCurrency(value: number, options: Omit<CurrencyFormatOptions, 'locale'>): string {
    return formatCurrency(value, {
      ...options,
      locale: this.locale,
    });
  }

  /**
   * 格式化百分比
   * @param value 数值
   * @param options 格式化选项
   * @returns 格式化后的百分比字符串
   */
  formatPercent(value: number, options: Omit<PercentFormatOptions, 'locale'> = {}): string {
    return formatPercent(value, {
      ...options,
      locale: this.locale,
    });
  }

  /**
   * 格式化数字
   * @param value 数值
   * @param options 格式化选项
   * @returns 格式化后的数字字符串
   */
  formatNumber(value: number, options: Omit<NumberFormatOptions, 'locale'> = {}): string {
    return formatNumber(value, {
      ...options,
      locale: this.locale,
    });
  }
}

// 默认本地化实例
export const defaultLocalization = new Localization();

// 导出所有格式化函数
export default {
  formatDateTime,
  formatDate,
  formatTime,
  formatCurrency,
  formatPercent,
  formatNumber,
  getSupportedLocales,
  getSystemLocale,
  getSystemTimeZone,
  Localization,
  defaultLocalization,
};
