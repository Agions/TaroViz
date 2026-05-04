/**
 * 主题编辑器共享状态管理 Hook
 * 提取 ThemeEditor 和 EnhancedThemeEditor 的公共状态逻辑
 */
import { useState, useEffect, useCallback } from 'react';
import type { ThemeOptions } from '../../themes';
import { getRegisteredThemes, registerTheme, switchTheme } from '../../themes';

export interface UseThemeEditorStateOptions {
  selectedTheme?: string;
  enableLivePreview?: boolean;
  onThemeChange?: (theme: ThemeOptions) => void;
}

export interface UseThemeEditorStateReturn {
  /** 当前主题 */
  currentTheme: ThemeOptions;
  /** 已注册的主题列表 */
  registeredThemes: ThemeOptions[];
  /** 颜色列表 */
  colors: string[];
  /** 背景色 */
  backgroundColor: string;
  /** 文本颜色 */
  textColor: string;
  /** 深色模式 */
  darkMode: boolean;
  /** 是否处于编辑模式 */
  isEditing: boolean;
  /** 新主题名称 */
  newThemeName: string;
  /** 设置当前主题 */
  setCurrentTheme: (theme: ThemeOptions) => void;
  /** 更新主题（部分更新） */
  updateTheme: (updates: Partial<ThemeOptions>) => void;
  /** 处理颜色变化 */
  handleColorChange: (index: number, color: string) => void;
  /** 添加颜色 */
  handleAddColor: () => void;
  /** 删除颜色 */
  handleRemoveColor: (index: number) => void;
  /** 开始编辑新主题 */
  handleStartEdit: () => void;
  /** 设置新主题名称 */
  setNewThemeName: (name: string) => void;
  /** 保存主题 */
  saveTheme: () => ThemeOptions;
  /** 取消编辑 */
  cancelEdit: () => void;
}

/** 带有必填字段的默认主题 */
const DEFAULT_THEME: Required<Pick<ThemeOptions, 'colors' | 'backgroundColor' | 'textColor' | 'darkMode'>> = {
  colors: ['#1890ff'],
  backgroundColor: '#ffffff',
  textColor: '#333333',
  darkMode: false,
};

/**
 * 主题编辑器状态管理 Hook
 */
export function useThemeEditorState(
  options: UseThemeEditorStateOptions = {}
): UseThemeEditorStateReturn {
  const { selectedTheme, enableLivePreview = true, onThemeChange } = options;

  const registeredThemes = getRegisteredThemes();

  // 计算初始主题
  const getInitialTheme = useCallback((): ThemeOptions => {
    if (selectedTheme) {
      const theme = registeredThemes.find((t) => t.name === selectedTheme);
      if (theme) return theme;
    }
    return registeredThemes[0] || DEFAULT_THEME;
  }, [selectedTheme, registeredThemes]);

  const [currentTheme, setCurrentThemeState] = useState<ThemeOptions>(getInitialTheme);
  const [newThemeName, setNewThemeName] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // 派生状态
  const colors: string[] = currentTheme.colors || DEFAULT_THEME.colors;
  const backgroundColor: string = currentTheme.backgroundColor || DEFAULT_THEME.backgroundColor;
  const textColor: string = currentTheme.textColor || DEFAULT_THEME.textColor;
  const darkMode: boolean = currentTheme.darkMode ?? DEFAULT_THEME.darkMode;

  // 当外部 selectedTheme 变化时同步
  useEffect(() => {
    if (selectedTheme) {
      const theme = registeredThemes.find((t) => t.name === selectedTheme);
      if (theme) {
        setCurrentThemeState(theme);
      }
    }
  }, [selectedTheme, registeredThemes]);

  // 设置当前主题并触发回调
  const setCurrentTheme = useCallback(
    (theme: ThemeOptions) => {
      setCurrentThemeState(theme);
      if (enableLivePreview) {
        switchTheme(theme);
      }
      onThemeChange?.(theme);
    },
    [enableLivePreview, onThemeChange]
  );

  // 更新主题（部分更新）
  const updateTheme = useCallback(
    (updates: Partial<ThemeOptions>) => {
      const updated = { ...currentTheme, ...updates };
      setCurrentThemeState(updated);
      if (enableLivePreview) {
        switchTheme(updated);
      }
      onThemeChange?.(updated);
    },
    [currentTheme, enableLivePreview, onThemeChange]
  );

  // 处理颜色变化
  const handleColorChange = useCallback(
    (index: number, color: string) => {
      const newColors = [...colors];
      newColors[index] = color;
      updateTheme({ colors: newColors });
    },
    [colors, updateTheme]
  );

  // 添加颜色
  const handleAddColor = useCallback(() => {
    updateTheme({ colors: [...colors, '#000000'] });
  }, [colors, updateTheme]);

  // 删除颜色
  const handleRemoveColor = useCallback(
    (index: number) => {
      if (colors.length <= 1) return;
      const newColors = colors.filter((_, i) => i !== index);
      updateTheme({ colors: newColors });
    },
    [colors, updateTheme]
  );

  // 开始编辑新主题
  const handleStartEdit = useCallback(() => {
    setIsEditing(true);
    setNewThemeName('');
  }, []);

  // 取消编辑
  const cancelEdit = useCallback(() => {
    setIsEditing(false);
    setNewThemeName('');
  }, []);

  // 保存主题
  const saveTheme = useCallback((): ThemeOptions => {
    const name = isEditing && newThemeName ? newThemeName : currentTheme.name || 'custom';
    const themeToSave: ThemeOptions = {
      ...currentTheme,
      name,
      colors,
      backgroundColor,
      textColor,
      darkMode,
    };

    registerTheme(name, themeToSave);
    setIsEditing(false);
    setNewThemeName('');

    return themeToSave;
  }, [isEditing, newThemeName, currentTheme, colors, backgroundColor, textColor, darkMode]);

  return {
    currentTheme,
    registeredThemes,
    colors,
    backgroundColor,
    textColor,
    darkMode,
    isEditing,
    newThemeName,
    setCurrentTheme,
    updateTheme,
    handleColorChange,
    handleAddColor,
    handleRemoveColor,
    handleStartEdit,
    setNewThemeName,
    saveTheme,
    cancelEdit,
  };
}
