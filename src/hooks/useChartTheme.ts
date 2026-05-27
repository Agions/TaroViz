/**
 * useChartTheme - 图表主题相关 Hooks
 * 提供主题解析和主题切换功能
 */
import { useState, useMemo, useCallback } from 'react';
import { getThemeByName } from '../themes';

/**
 * 使用图表主题
 * @param theme 主题名称或配置
 * @param darkMode 是否为暗色模式
 * @returns 处理后的主题
 */
export function useChartTheme(theme: string | Record<string, unknown>, darkMode = false) {
  return useMemo(() => {
    if (typeof theme === 'string') {
      // 如果是字符串，尝试获取内置主题配置
      try {
        const builtinTheme = getThemeByName(theme);
        return builtinTheme || (darkMode ? 'dark' : theme);
      } catch {
        return darkMode ? 'dark' : theme;
      }
    }
    return theme;
  }, [theme, darkMode]);
}

/**
 * 使用主题切换
 * @param initialTheme 初始主题
 * @returns [当前主题, 切换主题函数]
 */
export function useThemeSwitcher(initialTheme = 'default') {
  const [theme, setTheme] = useState<string | Record<string, unknown>>(initialTheme);
  const [isDark, setIsDark] = useState(false);

  const switchTheme = useCallback((newTheme: string | Record<string, unknown>) => {
    setTheme(newTheme);
    if (typeof newTheme === 'string') {
      setIsDark(newTheme === 'dark' || newTheme.includes('dark'));
    }
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark((prev) => !prev);
    setTheme((prev) => (prev === 'dark' ? 'default' : 'dark'));
  }, []);

  return { theme, isDark, switchTheme, toggleDark, setTheme };
}
