import {
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
} from '../i18n';

describe('Internationalization Utilities', () => {
  const testDate = new Date('2023-10-15T14:30:45.123Z');

  describe('formatDateTime', () => {
    it('should format date time with default options', () => {
      const result = formatDateTime(testDate);
      expect(typeof result).toBe('string');
      expect(result).not.toBe('');
    });

    it('should format date time with different locales', () => {
      const enResult = formatDateTime(testDate, { locale: 'en-US' });
      const zhResult = formatDateTime(testDate, { locale: 'zh-CN' });
      const deResult = formatDateTime(testDate, { locale: 'de-DE' });

      expect(typeof enResult).toBe('string');
      expect(typeof zhResult).toBe('string');
      expect(typeof deResult).toBe('string');
      expect(enResult).not.toBe(zhResult);
      expect(enResult).not.toBe(deResult);
    });

    it('should format date time with custom styles', () => {
      const fullResult = formatDateTime(testDate, { dateStyle: 'full', timeStyle: 'full' });
      const shortResult = formatDateTime(testDate, { dateStyle: 'short', timeStyle: 'short' });

      expect(typeof fullResult).toBe('string');
      expect(typeof shortResult).toBe('string');
      expect(fullResult.length).toBeGreaterThan(shortResult.length);
    });
  });

  describe('formatDate', () => {
    it('should format date with default options', () => {
      const result = formatDate(testDate);
      expect(typeof result).toBe('string');
      expect(result).not.toBe('');
    });

    it('should format date with different locales', () => {
      const enResult = formatDate(testDate, { locale: 'en-US' });
      const zhResult = formatDate(testDate, { locale: 'zh-CN' });

      expect(typeof enResult).toBe('string');
      expect(typeof zhResult).toBe('string');
      expect(enResult).not.toBe(zhResult);
    });
  });

  describe('formatTime', () => {
    it('should format time with default options', () => {
      const result = formatTime(testDate);
      expect(typeof result).toBe('string');
      expect(result).not.toBe('');
    });

    it('should format time with different locales', () => {
      const enResult = formatTime(testDate, { locale: 'en-US' });
      const zhResult = formatTime(testDate, { locale: 'zh-CN' });

      expect(typeof enResult).toBe('string');
      expect(typeof zhResult).toBe('string');
      expect(enResult).not.toBe(zhResult);
    });

    it('should format time with 12-hour format', () => {
      const result = formatTime(testDate, { locale: 'en-US', hour12: true });
      expect(typeof result).toBe('string');
      expect(result).toMatch(/AM|PM/i);
    });
  });

  describe('formatCurrency', () => {
    it('should format currency with default options', () => {
      const result = formatCurrency(1234.56, { currency: 'CNY' });
      expect(typeof result).toBe('string');
      expect(result).not.toBe('');
    });

    it('should format currency with different currencies', () => {
      const cnyResult = formatCurrency(1234.56, { currency: 'CNY' });
      const usdResult = formatCurrency(1234.56, { currency: 'USD' });
      const eurResult = formatCurrency(1234.56, { currency: 'EUR' });

      expect(typeof cnyResult).toBe('string');
      expect(typeof usdResult).toBe('string');
      expect(typeof eurResult).toBe('string');
      expect(cnyResult).not.toBe(usdResult);
      expect(cnyResult).not.toBe(eurResult);
    });

    it('should format currency with different locales', () => {
      const enResult = formatCurrency(1234.56, { currency: 'USD', locale: 'en-US' });
      const deResult = formatCurrency(1234.56, { currency: 'EUR', locale: 'de-DE' });

      expect(typeof enResult).toBe('string');
      expect(typeof deResult).toBe('string');
      expect(enResult).not.toBe(deResult);
    });
  });

  describe('formatPercent', () => {
    it('should format percent with default options', () => {
      const result = formatPercent(0.75);
      expect(typeof result).toBe('string');
      expect(result).not.toBe('');
    });

    it('should format percent with different locales', () => {
      const enResult = formatPercent(0.75, { locale: 'en-US' });
      const deResult = formatPercent(0.75, { locale: 'de-DE' });

      expect(typeof enResult).toBe('string');
      expect(typeof deResult).toBe('string');
      expect(enResult).not.toBe(deResult);
    });

    it('should format percent with custom decimal digits', () => {
      const result = formatPercent(0.75123, { digits: 3 });
      expect(typeof result).toBe('string');
    });
  });

  describe('formatNumber', () => {
    it('should format number with default options', () => {
      const result = formatNumber(1234.5678);
      expect(typeof result).toBe('string');
      expect(result).not.toBe('');
    });

    it('should format number with different locales', () => {
      const enResult = formatNumber(1234.5678, { locale: 'en-US' });
      const deResult = formatNumber(1234.5678, { locale: 'de-DE' });

      expect(typeof enResult).toBe('string');
      expect(typeof deResult).toBe('string');
      expect(enResult).not.toBe(deResult);
    });

    it('should format number with custom decimal digits', () => {
      const result = formatNumber(1234.5678, { digits: 3 });
      expect(typeof result).toBe('string');
    });

    it('should format number without grouping', () => {
      const result = formatNumber(1234.5678, { useGrouping: false });
      expect(typeof result).toBe('string');
    });
  });

  describe('getSupportedLocales', () => {
    it('should return an array of supported locales', () => {
      const locales = getSupportedLocales();
      expect(Array.isArray(locales)).toBe(true);
      expect(locales.length).toBeGreaterThan(0);
    });
  });

  describe('getSystemLocale', () => {
    it('should return a string', () => {
      const locale = getSystemLocale();
      expect(typeof locale).toBe('string');
      expect(locale).not.toBe('');
    });
  });

  describe('getSystemTimeZone', () => {
    it('should return a string', () => {
      const timeZone = getSystemTimeZone();
      expect(typeof timeZone).toBe('string');
      expect(timeZone).not.toBe('');
    });
  });

  describe('Localization class', () => {
    it('should create an instance with default options', () => {
      const localization = new Localization();
      expect(localization).toBeInstanceOf(Localization);
    });

    it('should create an instance with custom options', () => {
      const localization = new Localization({ locale: 'en-US', timeZone: 'America/New_York' });
      expect(localization).toBeInstanceOf(Localization);
    });

    it('should get and set locale', () => {
      const localization = new Localization();
      const initialLocale = localization.getLocale();

      localization.setLocale('fr-FR');
      expect(localization.getLocale()).toBe('fr-FR');
      expect(localization.getLocale()).not.toBe(initialLocale);
    });

    it('should get and set timeZone', () => {
      const localization = new Localization();
      const initialTimeZone = localization.getTimeZone();

      localization.setTimeZone('Europe/London');
      expect(localization.getTimeZone()).toBe('Europe/London');
      expect(localization.getTimeZone()).not.toBe(initialTimeZone);
    });

    it('should format date time using instance methods', () => {
      const localization = new Localization({ locale: 'en-US' });
      const result = localization.formatDateTime(testDate);
      expect(typeof result).toBe('string');
      expect(result).not.toBe('');
    });

    it('should format currency using instance methods', () => {
      const localization = new Localization({ locale: 'en-US' });
      const result = localization.formatCurrency(1234.56, { currency: 'USD' });
      expect(typeof result).toBe('string');
      expect(result).not.toBe('');
    });
  });

  describe('defaultLocalization', () => {
    it('should be an instance of Localization', () => {
      expect(defaultLocalization).toBeInstanceOf(Localization);
    });

    it('should have format methods', () => {
      expect(typeof defaultLocalization.formatDateTime).toBe('function');
      expect(typeof defaultLocalization.formatDate).toBe('function');
      expect(typeof defaultLocalization.formatTime).toBe('function');
      expect(typeof defaultLocalization.formatCurrency).toBe('function');
      expect(typeof defaultLocalization.formatPercent).toBe('function');
      expect(typeof defaultLocalization.formatNumber).toBe('function');
    });
  });
});
