import { getTheme, registerTheme, defaultTheme, darkTheme, getThemeByName } from '../index';

describe('Theme System', () => {
  describe('getTheme', () => {
    it('should return defaultTheme when no options are provided', () => {
      const result = getTheme();
      expect(result).toEqual(defaultTheme);
    });

    it('should return darkTheme when darkMode is true', () => {
      const result = getTheme({ darkMode: true });
      expect(result.darkMode).toBe(true);
      expect(result.theme).toBe('dark');
      expect(result.backgroundColor).toBe('#1a1a2e');
    });

    it('should merge custom options with defaultTheme', () => {
      const customColors = ['#ff0000', '#00ff00', '#0000ff'];
      const result = getTheme({ colors: customColors, textColor: '#666' });

      expect(result).toEqual({
        ...defaultTheme,
        colors: customColors,
        textColor: '#666',
      });
    });

    it('should merge custom options with darkTheme when darkMode is true', () => {
      const customFont = 'Arial, sans-serif';
      const result = getTheme({ darkMode: true, fontFamily: customFont });

      expect(result).toEqual({
        ...darkTheme,
        fontFamily: customFont,
      });
    });

    it('should accept custom theme object', () => {
      const customTheme = { backgroundColor: '#f0f0f0', textColor: '#333' };
      const result = getTheme({ theme: customTheme });

      expect(result.theme).toEqual(customTheme);
    });

    it('should accept builtin theme name as string', () => {
      const result = getTheme({ theme: 'vintage' });

      expect(result.theme).toBe('vintage');
    });
  });

  describe('registerTheme', () => {
    it('should register a theme', () => {
      registerTheme('custom-theme', { backgroundColor: '#123' });
      const result = getThemeByName('custom-theme');
      expect(result?.backgroundColor).toBe('#123');
    });
  });

  describe('defaultTheme', () => {
    it('should have correct default values', () => {
      expect(defaultTheme).toHaveProperty('theme', 'default');
      expect(defaultTheme).toHaveProperty('darkMode', false);
      expect(defaultTheme).toHaveProperty('colors');
      expect(Array.isArray(defaultTheme.colors)).toBe(true);
      expect(defaultTheme.colors).toHaveLength(9);
      expect(defaultTheme).toHaveProperty('backgroundColor', '#ffffff');
      expect(defaultTheme).toHaveProperty('textColor', '#333333');
      expect(defaultTheme).toHaveProperty('fontFamily');
    });
  });

  describe('darkTheme', () => {
    it('should have correct dark mode values', () => {
      expect(darkTheme).toHaveProperty('theme', 'dark');
      expect(darkTheme).toHaveProperty('darkMode', true);
      expect(darkTheme).toHaveProperty('colors');
      expect(Array.isArray(darkTheme.colors)).toBe(true);
      expect(darkTheme.colors).toHaveLength(9);
      expect(darkTheme).toHaveProperty('backgroundColor', '#1a1a2e');
      expect(darkTheme).toHaveProperty('textColor', '#e8e8e8');
      expect(darkTheme).toHaveProperty('fontFamily');
    });
  });
});
